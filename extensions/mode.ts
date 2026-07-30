import { existsSync, readdirSync, readFileSync } from "node:fs";
import { basename, dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
	getAgentDir,
	parseFrontmatter,
	type ExtensionAPI,
	type ExtensionContext,
} from "@earendil-works/pi-coding-agent";

export type Axis = "role" | "authority" | "style";
export type ModeSource = "package" | "global";

export interface ModeComponent {
	name: string;
	axis: Axis;
	description: string;
	body: string;
	source: ModeSource;
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

const AXES: readonly Axis[] = ["role", "authority", "style"];
const AXIS_DIRECTORIES: Record<Axis, string> = {
	role: "roles",
	authority: "authority",
	style: "style",
};
const MODE_STATE_ENTRY = "pi-facets.mode-state";
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

export function discoverModes(packageRoot: string, globalRoot: string): ModeDiscovery {
	const packageResult = readSource(packageRoot, "package");
	const globalResult = readSource(globalRoot, "global");
	const components = new Map(packageResult.components);

	for (const [key, component] of globalResult.components) {
		if (!components.has(key)) components.set(key, component);
	}

	return {
		components,
		diagnostics: [...packageResult.diagnostics, ...globalResult.diagnostics],
	};
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

function isModeState(value: unknown): value is ModeState {
	if (!value || typeof value !== "object") return false;
	return Object.entries(value).every(([axis, name]) => isAxis(axis) && typeof name === "string");
}

function restoreState(ctx: ExtensionContext): ModeState {
	let state: ModeState = {};
	for (const entry of ctx.sessionManager.getBranch()) {
		if (entry.type !== "custom" || entry.customType !== MODE_STATE_ENTRY) continue;
		const data = entry.data as { version?: unknown; state?: unknown } | undefined;
		if (data?.version === 1 && isModeState(data.state)) state = { ...data.state };
	}
	return state;
}

function formatAvailable(discovery: ModeDiscovery, axis?: Axis): string {
	const components = sortedComponents(discovery).filter((component) => !axis || component.axis === axis);
	return components.length ? components.map((component) => component.name).join(", ") : "(none)";
}

function formatDiagnostics(diagnostics: ModeDiagnostic[]): string {
	return diagnostics.map((diagnostic) => `- ${diagnostic.path}: ${diagnostic.message}`).join("\n");
}

export function registerModeExtension(
	pi: ExtensionAPI,
	packageRoot = PACKAGE_MODES_ROOT,
	globalRoot = join(getAgentDir(), "modes"),
): void {
	let discovery: ModeDiscovery = { components: new Map(), diagnostics: [] };
	let state: ModeState = {};

	function refresh(ctx: ExtensionContext): void {
		discovery = discoverModes(packageRoot, globalRoot);
		if (discovery.diagnostics.length) {
			ctx.ui.notify(`Mode discovery diagnostics:\n${formatDiagnostics(discovery.diagnostics)}`, "warning");
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

	function persist(): void {
		pi.appendEntry(MODE_STATE_ENTRY, { version: 1, state: { ...state } });
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
		state = { ...state, [component.axis]: component.name };
		persist();
		ctx.ui.notify(`Mode ${component.axis} set to ${component.name}.`, "info");
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
		state = { ...state, [axis]: name };
		persist();
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
				state = {};
				persist();
				ctx.ui.notify("Active mode cleared.", "info");
				return;
			}
			if (isAxis(command) && tokens.length === 2) {
				selectAxis(command, tokens[1], ctx);
				return;
			}
			ctx.ui.notify(
				"Usage: /mode | /mode show | /mode clear | /mode role <name> | /mode authority <name> | /mode style <name>",
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
