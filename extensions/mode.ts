import { existsSync, readdirSync, readFileSync } from "node:fs";
import { basename, dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
	CONFIG_DIR_NAME,
	getAgentDir,
	parseFrontmatter,
	type ExtensionAPI,
	type ExtensionContext,
} from "@earendil-works/pi-coding-agent";
import { Box, Text } from "@earendil-works/pi-tui";

export type Axis = "role" | "authority" | "style";
export type ModeSource = "project" | "package" | "global";

export interface ModeComponent {
	name: string;
	axis: Axis;
	description: string;
	body: string;
	source: ModeSource;
	path: string;
}

export type PresetSource = "global" | "project";

export interface ModePreset {
	name: string;
	description: string;
	role: string;
	authority: string;
	style: string;
	notes: string;
	source: PresetSource;
	path: string;
}

export interface ModeDiagnostic {
	path: string;
	message: string;
}

export interface ModeDiscovery {
	components: Map<string, ModeComponent>;
	diagnostics: ModeDiagnostic[];
}

export type ModeState = Partial<Record<Axis, string>>;
export type ModeAction = "set-axis" | "apply-preset" | "clear";
export type ModeRef = { name: string; source: ModeSource | "missing" };
export type ModeSnapshot = Record<Axis, ModeRef | null>;

export interface ModeChangeEvent {
	version: 1;
	action: ModeAction;
	before: ModeSnapshot;
	after: ModeSnapshot;
	axis?: Axis;
	preset?: { name: string; source: PresetSource };
}

const AXES: readonly Axis[] = ["role", "authority", "style"];
const AXIS_DIRECTORIES: Record<Axis, string> = {
	role: "roles",
	authority: "authority",
	style: "style",
};
const MODE_STATE_ENTRY = "pi-facets.mode-state";
const MODE_CHANGE_ENTRY = "pi-facets.mode-change";
const PACKAGE_MODES_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "modes");

function componentKey(axis: Axis, name: string): string {
	return `${axis}:${name}`;
}

function isAxis(value: unknown): value is Axis {
	return typeof value === "string" && AXES.includes(value as Axis);
}

function readSource(root: string, source: ModeSource): { components: Map<string, ModeComponent>; diagnostics: ModeDiagnostic[] } {
	const components = new Map<string, ModeComponent>();
	const diagnostics: ModeDiagnostic[] = [];

	for (const axis of AXES) {
		const directory = join(root, AXIS_DIRECTORIES[axis]);
		if (!existsSync(directory)) continue;

		let entries;
		try {
			entries = readdirSync(directory, { withFileTypes: true });
		} catch (error) {
			diagnostics.push({ path: directory, message: `cannot read directory: ${errorMessage(error)}` });
			continue;
		}

		for (const entry of entries) {
			if (!entry.isFile() || extname(entry.name) !== ".md") continue;
			const path = join(directory, entry.name);
			let content: string;
			try {
				content = readFileSync(path, "utf8");
			} catch (error) {
				diagnostics.push({ path, message: `cannot read file: ${errorMessage(error)}` });
				continue;
			}

			try {
				const parsed = parseFrontmatter<Record<string, unknown>>(content);
				const name = parsed.frontmatter.name;
				const declaredAxis = parsed.frontmatter.axis;
				const description = parsed.frontmatter.description;
				const filename = basename(entry.name, ".md");

				if (typeof name !== "string" || !name.trim()) throw new Error("frontmatter `name` must be non-empty");
				if (name !== filename) throw new Error(`frontmatter ` + "`name` must match filename stem");
				if (declaredAxis !== axis) throw new Error(`frontmatter ` + "`axis` must be `" + axis + "`");
				if (typeof description !== "string" || !description.trim()) {
					throw new Error("frontmatter `description` must be non-empty");
				}
				if (!parsed.body.trim()) throw new Error("Markdown body must be non-empty");

				const key = componentKey(axis, name);
				if (components.has(key)) {
					const previous = components.get(key)!;
					components.delete(key);
					diagnostics.push({
						path,
						message: `duplicate ${axis}/${name}; also defined at ${previous.path}`,
					});
					continue;
				}

				components.set(key, {
					name,
					axis,
					description: description.trim(),
					body: parsed.body.trim(),
					source,
					path,
				});
			} catch (error) {
				diagnostics.push({ path, message: `invalid component: ${errorMessage(error)}` });
			}
		}
	}

	return { components, diagnostics };
}

export function discoverModes(
	packageRoot: string,
	globalRoot: string,
	projectRoot?: string,
	projectTrusted = true,
): ModeDiscovery {
	const results = [
		...(projectRoot && projectTrusted ? [readSource(projectRoot, "project")] : []),
		readSource(packageRoot, "package"),
		readSource(globalRoot, "global"),
	];
	const components = new Map<string, ModeComponent>();

	for (const result of results) {
		for (const [key, component] of result.components) {
			if (!components.has(key)) components.set(key, component);
		}
	}

	return {
		components,
		diagnostics: results.flatMap((result) => result.diagnostics),
	};
}

const PRESET_FIELDS = new Set(["name", "description", "role", "authority", "style"]);

function availableComponentNames(components: Map<string, ModeComponent>, axis: Axis): string {
	const names = [...components.values()]
		.filter((component) => component.axis === axis)
		.map((component) => component.name)
		.sort((a, b) => a.localeCompare(b));
	return names.length ? names.join(", ") : "(none)";
}

function readPresetSource(
	root: string,
	source: PresetSource,
	components: Map<string, ModeComponent>,
): { presets: Map<string, ModePreset>; claimed: Set<string>; diagnostics: ModeDiagnostic[] } {
	const presets = new Map<string, ModePreset>();
	const claimed = new Set<string>();
	const diagnostics: ModeDiagnostic[] = [];
	if (!existsSync(root)) return { presets, claimed, diagnostics };

	let entries;
	try {
		entries = readdirSync(root, { withFileTypes: true });
	} catch (error) {
		diagnostics.push({ path: root, message: `cannot read directory: ${errorMessage(error)}` });
		return { presets, claimed, diagnostics };
	}

	for (const entry of entries) {
		if (!entry.isFile() || extname(entry.name) !== ".md") continue;
		const path = join(root, entry.name);
		let nameHint: string | undefined;
		try {
			const content = readFileSync(path, "utf8");
			const parsed = parseFrontmatter<Record<string, unknown>>(content);
			const filename = basename(entry.name, ".md");
			const name = parsed.frontmatter.name;
			nameHint = typeof name === "string" && name.trim() ? name : undefined;

			if (Object.keys(parsed.frontmatter).some((field) => !PRESET_FIELDS.has(field))) {
				const unknown = Object.keys(parsed.frontmatter).filter((field) => !PRESET_FIELDS.has(field));
				throw new Error(`unknown frontmatter field(s): ${unknown.join(", ")}`);
			}
			if (typeof name !== "string" || !name.trim()) throw new Error("frontmatter `name` must be non-empty");
			if (name !== filename) throw new Error("frontmatter `name` must match filename stem");

			const description = parsed.frontmatter.description;
			if (typeof description !== "string" || !description.trim()) {
				throw new Error("frontmatter `description` must be non-empty");
			}

			const refs = {} as Record<Axis, string>;
			for (const axis of AXES) {
				const value = parsed.frontmatter[axis];
				if (typeof value !== "string" || !value.trim()) {
					throw new Error(`frontmatter \`${axis}\` must be non-empty`);
				}
				if (!components.has(componentKey(axis, value))) {
					throw new Error(
						`unknown ${axis} component "${value}" (available: ${availableComponentNames(components, axis)})`,
					);
				}
				refs[axis] = value;
			}

			if (claimed.has(name)) {
				presets.delete(name);
				diagnostics.push({ path, message: `duplicate preset ${name}` });
				continue;
			}
			claimed.add(name);
			presets.set(name, {
				name,
				description: description.trim(),
				role: refs.role,
				authority: refs.authority,
				style: refs.style,
				notes: parsed.body.trim(),
				source,
				path,
			});
		} catch (error) {
			if (nameHint) {
				claimed.add(nameHint);
				presets.delete(nameHint);
			}
			diagnostics.push({ path, message: `invalid preset: ${errorMessage(error)}` });
		}
	}

	return { presets, claimed, diagnostics };
}

export function discoverPresets(
	globalRoot: string,
	projectRoot: string,
	components: Map<string, ModeComponent>,
	projectTrusted: boolean,
): { presets: Map<string, ModePreset>; diagnostics: ModeDiagnostic[] } {
	const globalResult = readPresetSource(globalRoot, "global", components);
	const projectResult = projectTrusted
		? readPresetSource(projectRoot, "project", components)
		: { presets: new Map<string, ModePreset>(), claimed: new Set<string>(), diagnostics: [] };
	const presets = new Map(globalResult.presets);

	for (const name of projectResult.claimed) presets.delete(name);
	for (const [name, preset] of projectResult.presets) presets.set(name, preset);

	return {
		presets,
		diagnostics: [...globalResult.diagnostics, ...projectResult.diagnostics],
	};
}

export function sortedPresets(presets: Map<string, ModePreset>): ModePreset[] {
	return [...presets.values()].sort((a, b) => a.name.localeCompare(b.name));
}

export function sortedComponents(discovery: ModeDiscovery): ModeComponent[] {
	return [...discovery.components.values()].sort(
		(a, b) => AXES.indexOf(a.axis) - AXES.indexOf(b.axis) || a.name.localeCompare(b.name),
	);
}

export function resolveModeState(
	state: ModeState,
	discovery: ModeDiscovery,
): { components: Partial<Record<Axis, ModeComponent>>; missing: Array<{ axis: Axis; name: string }> } {
	const components: Partial<Record<Axis, ModeComponent>> = {};
	const missing: Array<{ axis: Axis; name: string }> = [];

	for (const axis of AXES) {
		const name = state[axis];
		if (!name) continue;
		const component = discovery.components.get(componentKey(axis, name));
		if (component) components[axis] = component;
		else missing.push({ axis, name });
	}

	return { components, missing };
}

export function composeModePrompt(systemPrompt: string, state: ModeState, discovery: ModeDiscovery): string {
	const resolved = resolveModeState(state, discovery);
	const components = AXES.map((axis) => resolved.components[axis]).filter(
		(component): component is ModeComponent => component !== undefined,
	);
	if (components.length === 0) return systemPrompt;

	const sections = components.map((component) => `### ${component.axis}: ${component.name}\n\n${component.body}`);
	return `${systemPrompt}\n\n## Active mode\n\n${sections.join("\n\n")}`;
}

function errorMessage(error: unknown): string {
	return error instanceof Error ? error.message : String(error);
}

function snapshotState(state: ModeState, discovery: ModeDiscovery): ModeSnapshot {
	const snapshot = {} as ModeSnapshot;
	for (const axis of AXES) {
		const name = state[axis];
		if (!name) {
			snapshot[axis] = null;
			continue;
		}
		const component = discovery.components.get(componentKey(axis, name));
		snapshot[axis] = { name, source: component?.source ?? "missing" };
	}
	return snapshot;
}

function stateFromSnapshot(snapshot: ModeSnapshot): ModeState {
	const state: ModeState = {};
	for (const axis of AXES) {
		const ref = snapshot[axis];
		if (ref) state[axis] = ref.name;
	}
	return state;
}

function isModeRef(value: unknown): value is ModeRef {
	if (!value || typeof value !== "object") return false;
	const ref = value as { name?: unknown; source?: unknown };
	return (
		typeof ref.name === "string" &&
		(ref.source === "project" || ref.source === "package" || ref.source === "global" || ref.source === "missing")
	);
}

function isModeSnapshot(value: unknown): value is ModeSnapshot {
	if (!value || typeof value !== "object") return false;
	const snapshot = value as Record<string, unknown>;
	return AXES.every((axis) => snapshot[axis] === null || isModeRef(snapshot[axis]));
}

function isModeChangeEvent(value: unknown): value is ModeChangeEvent {
	if (!value || typeof value !== "object") return false;
	const event = value as Record<string, unknown>;
	if (event.version !== 1 || !["set-axis", "apply-preset", "clear"].includes(String(event.action))) return false;
	if (!isModeSnapshot(event.before) || !isModeSnapshot(event.after)) return false;
	if (event.action === "set-axis" ? !isAxis(event.axis) : event.axis !== undefined) return false;
	if (event.action === "apply-preset") {
		if (!event.preset || typeof event.preset !== "object") return false;
		const preset = event.preset as { name?: unknown; source?: unknown };
		if (typeof preset.name !== "string" || (preset.source !== "global" && preset.source !== "project")) return false;
	} else if (event.preset !== undefined) {
		return false;
	}
	return true;
}

function isModeState(value: unknown): value is ModeState {
	if (!value || typeof value !== "object") return false;
	return Object.entries(value).every(([axis, name]) => isAxis(axis) && typeof name === "string");
}

function restoreState(ctx: ExtensionContext): ModeState {
	let state: ModeState = {};
	for (const entry of ctx.sessionManager.getBranch()) {
		if (entry.type !== "custom") continue;
		if (entry.customType === MODE_STATE_ENTRY) {
			const data = entry.data as { version?: unknown; state?: unknown } | undefined;
			if (data?.version === 1 && isModeState(data.state)) state = { ...data.state };
		}
		if (entry.customType === MODE_CHANGE_ENTRY && isModeChangeEvent(entry.data)) {
			state = stateFromSnapshot(entry.data.after);
		}
	}
	return state;
}

function formatRef(ref: ModeRef | null): string {
	return ref ? `${ref.name} [${ref.source}]` : "(none)";
}

function formatSnapshot(snapshot: ModeSnapshot): string {
	return AXES.map((axis) => `${axis}: ${formatRef(snapshot[axis])}`).join("; ");
}

function formatAvailable(discovery: ModeDiscovery, axis?: Axis): string {
	const components = sortedComponents(discovery).filter((component) => !axis || component.axis === axis);
	return components.length ? components.map((component) => component.name).join(", ") : "(none)";
}

function formatDiagnostics(diagnostics: ModeDiagnostic[]): string {
	return diagnostics.map((diagnostic) => `- ${diagnostic.path}: ${diagnostic.message}`).join("\n");
}

function formatPresetAvailable(presets: Map<string, ModePreset>): string {
	const values = sortedPresets(presets);
	return values.length ? values.map((preset) => `${preset.name} [${preset.source}]`).join(", ") : "(none)";
}

export function registerModeExtension(
	pi: ExtensionAPI,
	packageRoot = PACKAGE_MODES_ROOT,
	globalRoot = join(getAgentDir(), "modes"),
): void {
	pi.registerEntryRenderer<ModeChangeEvent>(MODE_CHANGE_ENTRY, (entry, { expanded }, theme) => {
		const box = new Box(1, 1, (text) => theme.bg("customMessageBg", text));
		const data = entry.data;
		if (!isModeChangeEvent(data)) {
			box.addChild(new Text(theme.fg("error", "[mode] invalid mode-change entry"), 0, 0));
			return box;
		}

		let summary: string;
		if (data.action === "set-axis") {
			const axis = data.axis;
			if (!axis) {
				box.addChild(new Text(theme.fg("error", "[mode] invalid set-axis entry"), 0, 0));
				return box;
			}
			summary = `[mode] ${axis}: ${formatRef(data.before[axis])} -> ${formatRef(data.after[axis])}`;
		} else if (data.action === "apply-preset") {
			summary = `[mode] preset ${data.preset?.name ?? "(unknown)"} applied`;
		} else {
			summary = "[mode] cleared";
		}
		box.addChild(new Text(theme.fg("accent", summary), 0, 0));
		if (expanded) {
			box.addChild(new Text(theme.fg("dim", `before: ${formatSnapshot(data.before)}`), 0, 0));
			box.addChild(new Text(theme.fg("dim", `after: ${formatSnapshot(data.after)}`), 0, 0));
			if (data.preset) {
				box.addChild(new Text(theme.fg("dim", `preset: ${data.preset.name} [${data.preset.source}]`), 0, 0));
			}
		}
		return box;
	});

	let discovery: ModeDiscovery = { components: new Map(), diagnostics: [] };
	let presets: Map<string, ModePreset> = new Map();
	let state: ModeState = {};

	function refresh(ctx: ExtensionContext): void {
		const projectModesRoot = join(ctx.cwd, CONFIG_DIR_NAME, "modes");
		const projectTrusted = ctx.isProjectTrusted();
		discovery = discoverModes(packageRoot, globalRoot, projectModesRoot, projectTrusted);
		const projectPresetRoot = join(projectModesRoot, "presets");
		const result = discoverPresets(join(globalRoot, "presets"), projectPresetRoot, discovery.components, projectTrusted);
		presets = result.presets;
		const diagnostics = [...discovery.diagnostics, ...result.diagnostics];
		if (diagnostics.length) {
			ctx.ui.notify(`Mode discovery diagnostics:\n${formatDiagnostics(diagnostics)}`, "warning");
		}
	}

	function reportMissing(ctx: ExtensionContext): void {
		const missing = resolveModeState(state, discovery).missing;
		if (!missing.length) return;
		const details = missing
			.map(({ axis, name }) => `${axis}/${name} (available: ${formatAvailable(discovery, axis)})`)
			.join("; ");
		ctx.ui.notify(`Active mode reference unavailable: ${details}. Choose a replacement.`, "error");
	}

	function ensureDiscovery(ctx: ExtensionContext): void {
		if (discovery.components.size === 0 && discovery.diagnostics.length === 0) refresh(ctx);
	}

	function recordChange(
		action: ModeAction,
		before: ModeState,
		after: ModeState,
		options: { axis?: Axis; preset?: { name: string; source: PresetSource } } = {},
	): void {
		const event: ModeChangeEvent = {
			version: 1,
			action,
			before: snapshotState(before, discovery),
			after: snapshotState(after, discovery),
		};
		if (options.axis) event.axis = options.axis;
		if (options.preset) event.preset = options.preset;
		pi.appendEntry<ModeChangeEvent>(MODE_CHANGE_ENTRY, event);
	}

	function showState(ctx: ExtensionContext): void {
		const lines = ["Active mode:"];
		const resolved = resolveModeState(state, discovery);
		for (const axis of AXES) {
			const name = state[axis];
			const component = resolved.components[axis];
			if (component) lines.push(`${axis}: ${component.name} [${component.source}] ${component.path}`);
			else if (name) lines.push(`${axis}: ${name} [missing]`);
			else lines.push(`${axis}: (none)`);
		}
		ctx.ui.notify(lines.join("\n"), resolved.missing.length ? "warning" : "info");
	}

	async function selectMode(ctx: ExtensionContext): Promise<void> {
		if (ctx.mode !== "tui") {
			ctx.ui.notify("/mode selector requires interactive TUI; use /mode role|authority|style <name>.", "error");
			return;
		}
		const components = sortedComponents(discovery);
		if (!components.length) {
			ctx.ui.notify("No valid mode components discovered.", "error");
			return;
		}
		const labels = components.map(
			(component) => `${component.axis}: ${component.name} — ${component.description}`,
		);
		const selected = await ctx.ui.select("Select mode component", labels);
		if (!selected) return;
		const index = labels.indexOf(selected);
		const component = components[index];
		if (!component) return;
		const before = { ...state };
		const after = { ...state, [component.axis]: component.name };
		state = after;
		recordChange("set-axis", before, after, { axis: component.axis });
		ctx.ui.notify(`Mode ${component.axis} set to ${component.name}.`, "info");
	}

	function applyPreset(name: string, ctx: ExtensionContext): void {
		const preset = presets.get(name);
		if (!preset) {
			ctx.ui.notify(`Unknown mode preset "${name}". Available: ${formatPresetAvailable(presets)}.`, "error");
			return;
		}
		const before = { ...state };
		const after = { role: preset.role, authority: preset.authority, style: preset.style };
		state = after;
		recordChange("apply-preset", before, after, { preset: { name: preset.name, source: preset.source } });
		ctx.ui.notify(`Mode preset ${name} applied.`, "info");
	}

	async function selectPreset(ctx: ExtensionContext): Promise<void> {
		if (ctx.mode !== "tui") {
			ctx.ui.notify("/mode preset selector requires interactive TUI; use /mode preset <name>.", "error");
			return;
		}
		const values = sortedPresets(presets);
		if (!values.length) {
			ctx.ui.notify("No valid mode presets discovered.", "error");
			return;
		}
		const labels = values.map(
			(preset) => `${preset.name} — ${preset.description} [${preset.source}]`,
		);
		const selected = await ctx.ui.select("Select mode preset", labels);
		if (!selected) return;
		const preset = values[labels.indexOf(selected)];
		if (preset) applyPreset(preset.name, ctx);
	}

	function listPresets(ctx: ExtensionContext): void {
		const values = sortedPresets(presets);
		const lines = values.length
			? values.map((preset) => `${preset.name} [${preset.source}] ${preset.path}`)
			: ["(none)"];
		ctx.ui.notify(`Mode presets:\n${lines.join("\n")}`, values.length ? "info" : "warning");
	}

	function showPreset(name: string, ctx: ExtensionContext): void {
		const preset = presets.get(name);
		if (!preset) {
			ctx.ui.notify(`Unknown mode preset "${name}". Available: ${formatPresetAvailable(presets)}.`, "error");
			return;
		}
		const lines = [
			`Mode preset: ${preset.name}`,
			`description: ${preset.description}`,
			`source: ${preset.source}`,
			`path: ${preset.path}`,
			`role: ${preset.role}`,
			`authority: ${preset.authority}`,
			`style: ${preset.style}`,
		];
		if (preset.notes) lines.push(`notes:\n${preset.notes}`);
		ctx.ui.notify(lines.join("\n"), "info");
	}

	function selectAxis(axis: Axis, name: string, ctx: ExtensionContext): void {
		const component = discovery.components.get(componentKey(axis, name));
		if (!component) {
			ctx.ui.notify(
				`Unknown ${axis} mode "${name}". Available: ${formatAvailable(discovery, axis)}.`,
				"error",
			);
			return;
		}
		const before = { ...state };
		const after = { ...state, [axis]: name };
		state = after;
		recordChange("set-axis", before, after, { axis });
		ctx.ui.notify(`Mode ${axis} set to ${name}.`, "info");
	}

	pi.registerCommand("mode", {
		description: "Select and inspect composable role, authority, and style modes",
		handler: async (args, ctx) => {
			ensureDiscovery(ctx);
			const tokens = args.trim().split(/\s+/).filter(Boolean);
			if (tokens.length === 0) {
				await selectMode(ctx);
				return;
			}
			const command = tokens[0];
			if (command === "show" && tokens.length === 1) {
				showState(ctx);
				return;
			}
			if (command === "clear" && tokens.length === 1) {
				const before = { ...state };
				const after: ModeState = {};
				state = after;
				recordChange("clear", before, after);
				ctx.ui.notify("Active mode cleared.", "info");
				return;
			}
			if (command === "presets" && tokens.length === 1) {
				listPresets(ctx);
				return;
			}
			if (command === "preset" && tokens.length === 1) {
				await selectPreset(ctx);
				return;
			}
			if (command === "preset" && tokens.length === 2) {
				applyPreset(tokens[1], ctx);
				return;
			}
			if (command === "preset" && tokens[1] === "show" && tokens.length === 3) {
				showPreset(tokens[2], ctx);
				return;
			}
			if (isAxis(command) && tokens.length === 2) {
				selectAxis(command, tokens[1], ctx);
				return;
			}
			ctx.ui.notify(
				"Usage: /mode | /mode show | /mode clear | /mode presets | /mode preset [<name>|show <name>] | /mode role <name> | /mode authority <name> | /mode style <name>",
				"error",
			);
		},
	});

	pi.on("session_start", async (_event, ctx) => {
		refresh(ctx);
		state = restoreState(ctx);
		reportMissing(ctx);
	});

	pi.on("session_tree", async (_event, ctx) => {
		refresh(ctx);
		state = restoreState(ctx);
		reportMissing(ctx);
	});

	pi.on("before_agent_start", async (event) => {
		const prompt = composeModePrompt(event.systemPrompt, state, discovery);
		return prompt === event.systemPrompt ? undefined : { systemPrompt: prompt };
	});
}

export default function modeExtension(pi: ExtensionAPI): void {
	registerModeExtension(pi);
}
