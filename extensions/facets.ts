import { existsSync, readdirSync, readFileSync } from "node:fs";
import { basename, extname, join } from "node:path";
import {
	CONFIG_DIR_NAME,
	getAgentDir,
	parseFrontmatter,
	type ExtensionAPI,
	type ExtensionContext,
} from "@earendil-works/pi-coding-agent";
import { Box, Text } from "@earendil-works/pi-tui";

export type Axis = "role" | "authority" | "style";
export type FacetSource = "project" | "global";

export interface FacetComponent {
	name: string;
	axis: Axis;
	description: string;
	body: string;
	source: FacetSource;
	path: string;
}

export type PresetSource = FacetSource;

export interface FacetPreset {
	name: string;
	description: string;
	role: string;
	authority: string;
	style: string;
	notes: string;
	source: PresetSource;
	path: string;
}

export interface FacetDiagnostic {
	path: string;
	message: string;
}

export interface FacetDiscovery {
	components: Map<string, FacetComponent>;
	diagnostics: FacetDiagnostic[];
}

export type FacetState = Partial<Record<Axis, string>>;
export type FacetAction = "set-axis" | "apply-preset" | "clear";
export type FacetRef = { name: string; source: FacetSource | "missing" };
export type FacetSnapshot = Record<Axis, FacetRef | null>;

export interface FacetChangeEvent {
	version: 1;
	action: FacetAction;
	before: FacetSnapshot;
	after: FacetSnapshot;
	axis?: Axis;
	preset?: { name: string; source: PresetSource };
}

const AXES: readonly Axis[] = ["role", "authority", "style"];
const AXIS_DIRECTORIES: Record<Axis, string> = {
	role: "roles",
	authority: "authority",
	style: "style",
};
const FACET_STATE_ENTRY = "pi-facets.facet-state";
const FACET_CHANGE_ENTRY = "pi-facets.facet-change";

function componentKey(axis: Axis, name: string): string {
	return `${axis}:${name}`;
}

function isAxis(value: unknown): value is Axis {
	return typeof value === "string" && AXES.includes(value as Axis);
}

function componentFormatWarnings(component: FacetComponent): string[] {
	const warnings: string[] = [];
	if (/^#\s+/.test(component.body)) warnings.push("body starts with a H1; use list-first Markdown to avoid a nested heading");
	if (!/^[-*+]\s+/.test(component.body)) warnings.push("body is not list-first Markdown; use list items for compact active-facet context");
	return warnings;
}

function readSource(root: string, source: FacetSource): { components: Map<string, FacetComponent>; diagnostics: FacetDiagnostic[] } {
	const components = new Map<string, FacetComponent>();
	const diagnostics: FacetDiagnostic[] = [];

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

				const component: FacetComponent = {
					name,
					axis,
					description: description.trim(),
					body: parsed.body.trim(),
					source,
					path,
				};
				for (const warning of componentFormatWarnings(component)) {
					diagnostics.push({ path, message: `component format warning: ${warning}` });
				}

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

				components.set(key, component);
			} catch (error) {
				diagnostics.push({ path, message: `invalid component: ${errorMessage(error)}` });
			}
		}
	}

	return { components, diagnostics };
}

export function discoverFacets(globalRoot: string, projectRoot?: string, projectTrusted = true): FacetDiscovery {
	const results = [
		...(projectRoot && projectTrusted ? [readSource(projectRoot, "project")] : []),
		readSource(globalRoot, "global"),
	];
	const components = new Map<string, FacetComponent>();

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

function availableComponentNames(components: Map<string, FacetComponent>, axis: Axis): string {
	const names = [...components.values()]
		.filter((component) => component.axis === axis)
		.map((component) => component.name)
		.sort((a, b) => a.localeCompare(b));
	return names.length ? names.join(", ") : "(none)";
}

function readPresetSource(
	root: string,
	source: PresetSource,
	components: Map<string, FacetComponent>,
): { presets: Map<string, FacetPreset>; claimed: Set<string>; diagnostics: FacetDiagnostic[] } {
	const presets = new Map<string, FacetPreset>();
	const claimed = new Set<string>();
	const diagnostics: FacetDiagnostic[] = [];
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

export function discoverFacetPresets(
	globalRoot: string,
	projectRoot: string,
	components: Map<string, FacetComponent>,
	projectTrusted: boolean,
): { presets: Map<string, FacetPreset>; diagnostics: FacetDiagnostic[] } {
	const sources = [
		...(projectTrusted ? [readPresetSource(projectRoot, "project", components)] : []),
		readPresetSource(globalRoot, "global", components),
	];
	const presets = new Map<string, FacetPreset>();
	const claimed = new Set<string>();

	for (const source of sources) {
		for (const name of source.claimed) {
			if (claimed.has(name)) continue;
			claimed.add(name);
			const preset = source.presets.get(name);
			if (preset) presets.set(name, preset);
		}
	}

	return {
		presets,
		diagnostics: sources.flatMap((source) => source.diagnostics),
	};
}

function readDefaultPreset(root: string, presets: Map<string, FacetPreset>): string | undefined {
	const path = join(root, "default.md");
	if (!existsSync(path)) return undefined;
	try {
		const parsed = parseFrontmatter<Record<string, unknown>>(readFileSync(path, "utf8"));
		if (Object.keys(parsed.frontmatter).length !== 1 || typeof parsed.frontmatter.preset !== "string") return undefined;
		const preset = parsed.frontmatter.preset.trim();
		return presets.has(preset) ? preset : undefined;
	} catch {
		return undefined;
	}
}

export function discoverDefaultPreset(
	globalRoot: string,
	projectRoot: string,
	presets: Map<string, FacetPreset>,
	projectTrusted: boolean,
): string | undefined {
	return (projectTrusted ? readDefaultPreset(projectRoot, presets) : undefined) ?? readDefaultPreset(globalRoot, presets);
}

export function sortedPresets(presets: Map<string, FacetPreset>): FacetPreset[] {
	return [...presets.values()].sort((a, b) => a.name.localeCompare(b.name));
}

export function sortedComponents(discovery: FacetDiscovery): FacetComponent[] {
	return [...discovery.components.values()].sort(
		(a, b) => AXES.indexOf(a.axis) - AXES.indexOf(b.axis) || a.name.localeCompare(b.name),
	);
}

export function resolveFacetState(
	state: FacetState,
	discovery: FacetDiscovery,
): { components: Partial<Record<Axis, FacetComponent>>; missing: Array<{ axis: Axis; name: string }> } {
	const components: Partial<Record<Axis, FacetComponent>> = {};
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

function activeFacetComponents(state: FacetState, discovery: FacetDiscovery): FacetComponent[] {
	const resolved = resolveFacetState(state, discovery);
	return AXES.map((axis) => resolved.components[axis]).filter(
		(component): component is FacetComponent => component !== undefined,
	);
}

function activeFacetContext(components: FacetComponent[]): string {
	const sections = components.map((component) => `**${component.axis}: ${component.name}**\n${component.body}`);
	sections.push("**Facet alignment**\n- Clear conflict? Load `facet-alignment`.");
	return `## Active facets\n\n${sections.join("\n\n")}`;
}

export function estimateTokens(text: string): number {
	return Math.ceil(text.length / 4);
}

export function facetWarnings(state: FacetState, discovery: FacetDiscovery): string[] {
	const components = activeFacetComponents(state, discovery);
	const warnings = components.flatMap((component) => [
		...discovery.diagnostics
			.filter((diagnostic) => diagnostic.path === component.path && diagnostic.message.startsWith("component format warning:"))
			.map((diagnostic) => `${component.axis}/${component.name}: ${diagnostic.message.replace("component format warning: ", "")}`),
		...(estimateTokens(component.body) > 200
			? [`${component.axis}/${component.name}: estimated ${estimateTokens(component.body)} tokens exceeds 200-token component budget`]
			: []),
	]);
	if (components.length && estimateTokens(activeFacetContext(components)) > 500) {
		warnings.push(`active facet composition: estimated ${estimateTokens(activeFacetContext(components))} tokens exceeds 500-token budget`);
	}
	return warnings;
}

export function composeFacetPrompt(systemPrompt: string, state: FacetState, discovery: FacetDiscovery): string {
	const components = activeFacetComponents(state, discovery);
	if (components.length === 0) return systemPrompt;
	return `${systemPrompt}\n\n${activeFacetContext(components)}`;
}

function errorMessage(error: unknown): string {
	return error instanceof Error ? error.message : String(error);
}

function snapshotState(state: FacetState, discovery: FacetDiscovery): FacetSnapshot {
	const snapshot = {} as FacetSnapshot;
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

function facetStateFromSnapshot(snapshot: FacetSnapshot): FacetState {
	const state: FacetState = {};
	for (const axis of AXES) {
		const ref = snapshot[axis];
		if (ref) state[axis] = ref.name;
	}
	return state;
}

function isFacetRef(value: unknown): value is FacetRef {
	if (!value || typeof value !== "object") return false;
	const ref = value as { name?: unknown; source?: unknown };
	return (
		typeof ref.name === "string" &&
		(ref.source === "project" || ref.source === "global" || ref.source === "missing")
	);
}

function isFacetSnapshot(value: unknown): value is FacetSnapshot {
	if (!value || typeof value !== "object") return false;
	const snapshot = value as Record<string, unknown>;
	return AXES.every((axis) => snapshot[axis] === null || isFacetRef(snapshot[axis]));
}

function isFacetChangeEvent(value: unknown): value is FacetChangeEvent {
	if (!value || typeof value !== "object") return false;
	const event = value as Record<string, unknown>;
	if (event.version !== 1 || !["set-axis", "apply-preset", "clear"].includes(String(event.action))) return false;
	if (!isFacetSnapshot(event.before) || !isFacetSnapshot(event.after)) return false;
	if (event.action === "set-axis" ? !isAxis(event.axis) : event.axis !== undefined) return false;
	if (event.action === "apply-preset") {
		if (!event.preset || typeof event.preset !== "object") return false;
		const preset = event.preset as { name?: unknown; source?: unknown };
		if (
			typeof preset.name !== "string" ||
			(preset.source !== "global" && preset.source !== "project")
		) return false;
	} else if (event.preset !== undefined) {
		return false;
	}
	return true;
}

function isFacetState(value: unknown): value is FacetState {
	if (!value || typeof value !== "object") return false;
	return Object.entries(value).every(([axis, name]) => isAxis(axis) && typeof name === "string");
}

function restoreState(ctx: ExtensionContext): FacetState | undefined {
	let state: FacetState | undefined;
	for (const entry of ctx.sessionManager.getBranch()) {
		if (entry.type !== "custom") continue;
		if (entry.customType === FACET_STATE_ENTRY) {
			const data = entry.data as { version?: unknown; state?: unknown } | undefined;
			if (data?.version === 1 && isFacetState(data.state)) state = { ...data.state };
		}
		if (entry.customType === FACET_CHANGE_ENTRY && isFacetChangeEvent(entry.data)) {
			state = facetStateFromSnapshot(entry.data.after);
		}
	}
	return state;
}

function formatRef(ref: FacetRef | null): string {
	return ref ? `${ref.name} [${ref.source}]` : "(none)";
}

function formatSnapshot(snapshot: FacetSnapshot): string {
	return AXES.map((axis) => `${axis}: ${formatRef(snapshot[axis])}`).join("; ");
}

function formatAvailable(discovery: FacetDiscovery, axis?: Axis): string {
	const components = sortedComponents(discovery).filter((component) => !axis || component.axis === axis);
	return components.length ? components.map((component) => component.name).join(", ") : "(none)";
}

function formatDiagnostics(diagnostics: FacetDiagnostic[]): string {
	return diagnostics.map((diagnostic) => `- ${diagnostic.path}: ${diagnostic.message}`).join("\n");
}

function formatPresetAvailable(presets: Map<string, FacetPreset>): string {
	const values = sortedPresets(presets);
	return values.length ? values.map((preset) => `${preset.name} [${preset.source}]`).join(", ") : "(none)";
}

export function registerFacetExtension(pi: ExtensionAPI, globalRoot = join(getAgentDir(), "facets")): void {
	pi.registerEntryRenderer<FacetChangeEvent>(FACET_CHANGE_ENTRY, (entry, { expanded }, theme) => {
		const box = new Box(1, 1, (text) => theme.bg("customMessageBg", text));
		const data = entry.data;
		if (!isFacetChangeEvent(data)) {
			box.addChild(new Text(theme.fg("error", "[facets] invalid facet-change entry"), 0, 0));
			return box;
		}

		let summary: string;
		if (data.action === "set-axis") {
			const axis = data.axis;
			if (!axis) {
				box.addChild(new Text(theme.fg("error", "[facets] invalid set-axis entry"), 0, 0));
				return box;
			}
			summary = `[facets] ${axis}: ${formatRef(data.before[axis])} -> ${formatRef(data.after[axis])}`;
		} else if (data.action === "apply-preset") {
			summary = `[facets] preset ${data.preset?.name ?? "(unknown)"} applied`;
		} else {
			summary = "[facets] cleared";
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

	let discovery: FacetDiscovery = { components: new Map(), diagnostics: [] };
	let presets: Map<string, FacetPreset> = new Map();
	let state: FacetState = {};

	function refresh(ctx: ExtensionContext): void {
		const projectFacetsRoot = join(ctx.cwd, CONFIG_DIR_NAME, "facets");
		const projectTrusted = ctx.isProjectTrusted();
		discovery = discoverFacets(globalRoot, projectFacetsRoot, projectTrusted);
		const projectPresetRoot = join(projectFacetsRoot, "presets");
		const result = discoverFacetPresets(
			join(globalRoot, "presets"),
			projectPresetRoot,
			discovery.components,
			projectTrusted,
		);
		presets = result.presets;
		const diagnostics = [...discovery.diagnostics, ...result.diagnostics];
		if (diagnostics.length) {
			ctx.ui.notify(`Facet discovery diagnostics:\n${formatDiagnostics(diagnostics)}`, "warning");
		}
	}

	function restoreOrDefault(ctx: ExtensionContext): FacetState {
		const restored = restoreState(ctx);
		if (restored) return restored;
		const projectRoot = join(ctx.cwd, CONFIG_DIR_NAME, "facets");
		const presetName = discoverDefaultPreset(globalRoot, projectRoot, presets, ctx.isProjectTrusted());
		const preset = presetName ? presets.get(presetName) : undefined;
		return preset ? { role: preset.role, authority: preset.authority, style: preset.style } : {};
	}

	function reportMissing(ctx: ExtensionContext): void {
		const missing = resolveFacetState(state, discovery).missing;
		if (!missing.length) return;
		const details = missing
			.map(({ axis, name }) => `${axis}/${name} (available: ${formatAvailable(discovery, axis)})`)
			.join("; ");
		ctx.ui.notify(`Active facet reference unavailable: ${details}. Choose a replacement.`, "error");
	}

	function reportFacetWarnings(ctx: ExtensionContext): void {
		const warnings = facetWarnings(state, discovery);
		if (warnings.length) ctx.ui.notify(`Active facet warnings:\n${warnings.map((warning) => `- ${warning}`).join("\n")}`, "warning");
	}

	function ensureDiscovery(ctx: ExtensionContext): void {
		if (discovery.components.size === 0 && discovery.diagnostics.length === 0) refresh(ctx);
	}

	function recordChange(
		action: FacetAction,
		before: FacetState,
		after: FacetState,
		options: { axis?: Axis; preset?: { name: string; source: PresetSource } } = {},
	): void {
		const event: FacetChangeEvent = {
			version: 1,
			action,
			before: snapshotState(before, discovery),
			after: snapshotState(after, discovery),
		};
		if (options.axis) event.axis = options.axis;
		if (options.preset) event.preset = options.preset;
		pi.appendEntry<FacetChangeEvent>(FACET_CHANGE_ENTRY, event);
	}

	function showCurrentState(ctx: ExtensionContext): void {
		const lines = ["Current facets:"];
		const resolved = resolveFacetState(state, discovery);
		for (const axis of AXES) {
			const name = state[axis];
			const component = resolved.components[axis];
			if (component) lines.push(`${axis}: ${component.name} [${component.source}]`);
			else if (name) lines.push(`${axis}: ${name} [missing]`);
			else lines.push(`${axis}: (none)`);
		}
		ctx.ui.notify(lines.join("\n"), resolved.missing.length ? "warning" : "info");
	}

	function setAxis(axis: Axis, name: string, ctx: ExtensionContext): void {
		const before = { ...state };
		const after = { ...state, [axis]: name };
		state = after;
		recordChange("set-axis", before, after, { axis });
		ctx.ui.notify(`Facet ${axis} set to ${name}.`, "info");
		reportFacetWarnings(ctx);
	}

	function clearFacets(ctx: ExtensionContext): void {
		const before = { ...state };
		const after: FacetState = {};
		state = after;
		recordChange("clear", before, after);
		ctx.ui.notify("Active facets cleared.", "info");
	}

	function clearAxis(axis: Axis, ctx: ExtensionContext): void {
		const before = { ...state };
		const after = { ...state };
		delete after[axis];
		state = after;
		recordChange("set-axis", before, after, { axis });
		ctx.ui.notify(`Facet ${axis} cleared.`, "info");
	}

	function componentLabel(component: FacetComponent): string {
		const current = state[component.axis] === component.name ? " [current]" : "";
		return `${component.name} — ${component.description} [${component.source}]${current}`;
	}

	async function selectFacets(ctx: ExtensionContext): Promise<void> {
		if (ctx.mode !== "tui") {
			showCurrentState(ctx);
			return;
		}
		for (;;) {
			const snapshot = snapshotState(state, discovery);
			const options = [
				`Presets — ${currentPreset()?.name ?? "(none)"}`,
				`Role — ${formatRef(snapshot.role)}`,
				`Authority — ${formatRef(snapshot.authority)}`,
				`Style — ${formatRef(snapshot.style)}`,
				"Clear all facets",
			];
			const selected = await ctx.ui.select("Facets", options);
			switch (options.indexOf(selected ?? "")) {
				case 0:
					if ((await selectPreset(ctx)) === "back") continue;
					return;
				case 1:
					if ((await selectAxis("role", ctx)) === "cancel") return;
					continue;
				case 2:
					if ((await selectAxis("authority", ctx)) === "cancel") return;
					continue;
				case 3:
					if ((await selectAxis("style", ctx)) === "cancel") return;
					continue;
				case 4:
					clearFacets(ctx);
					return;
				default:
					return;
			}
		}
	}

	async function selectAxis(axis: Axis, ctx: ExtensionContext): Promise<"back" | "selected" | "cancel"> {
		const components = sortedComponents(discovery).filter((component) => component.axis === axis);
		const labels = components.map(componentLabel);
		const selected = await ctx.ui.select(`Select ${axis} facet`, [...labels, "(none)", "Back"]);
		if (selected === undefined) return "cancel";
		if (selected === "Back") return "back";
		if (selected === "(none)") clearAxis(axis, ctx);
		const component = components[labels.indexOf(selected)];
		if (component) setAxis(axis, component.name, ctx);
		return "selected";
	}

	function applyPreset(name: string, ctx: ExtensionContext): void {
		const preset = presets.get(name);
		if (!preset) {
			ctx.ui.notify(`Unknown facet preset "${name}". Available: ${formatPresetAvailable(presets)}.`, "error");
			return;
		}
		const before = { ...state };
		const after = { role: preset.role, authority: preset.authority, style: preset.style };
		state = after;
		recordChange("apply-preset", before, after, { preset: { name: preset.name, source: preset.source } });
		ctx.ui.notify(`Facet preset ${name} applied.`, "info");
		reportFacetWarnings(ctx);
	}

	function currentPreset(): FacetPreset | undefined {
		return [...presets.values()].find(
			(preset) =>
				state.role === preset.role && state.authority === preset.authority && state.style === preset.style,
		);
	}

	function presetLabel(preset: FacetPreset): string {
		return `${preset.name} — ${preset.description} [${preset.source}]${currentPreset() === preset ? " [current]" : ""}`;
	}

	async function selectPreset(ctx: ExtensionContext): Promise<"back" | "done"> {
		const values = sortedPresets(presets);
		const labels = values.map(presetLabel);
		const selected = await ctx.ui.select("Select facet preset", [...labels, "(none)", "Back"]);
		if (selected === "Back") return "back";
		if (selected === "(none)") clearFacets(ctx);
		const preset = values[labels.indexOf(selected ?? "")];
		if (preset) applyPreset(preset.name, ctx);
		return "done";
	}

	pi.registerCommand("facets", {
		description: "Select and inspect composable role, authority, and style facets",
		handler: async (args, ctx) => {
			ensureDiscovery(ctx);
			if (args.trim()) {
				ctx.ui.notify("Usage: /facets", "error");
				return;
			}
			await selectFacets(ctx);
		},
	});

	pi.on("session_start", async (_event, ctx) => {
		refresh(ctx);
		state = restoreOrDefault(ctx);
		reportMissing(ctx);
		reportFacetWarnings(ctx);
	});

	pi.on("session_tree", async (_event, ctx) => {
		refresh(ctx);
		state = restoreOrDefault(ctx);
		reportMissing(ctx);
		reportFacetWarnings(ctx);
	});

	pi.on("before_agent_start", async (event) => {
		const prompt = composeFacetPrompt(event.systemPrompt, state, discovery);
		return prompt === event.systemPrompt ? undefined : { systemPrompt: prompt };
	});
}

export default function facetsExtension(pi: ExtensionAPI): void {
	registerFacetExtension(pi);
}
