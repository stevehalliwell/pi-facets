import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import {
	composeModePrompt,
	discoverModes,
	discoverPresets,
	registerModeExtension,
	type ModeState,
} from "../extensions/mode.js";

type Handler = (...args: any[]) => unknown;

const temporaryDirectories: string[] = [];

afterEach(async () => {
	await Promise.all(temporaryDirectories.splice(0).map((directory) => rm(directory, { recursive: true, force: true })));
});

async function createRoot(): Promise<string> {
	const directory = await mkdtemp(join(tmpdir(), "pi-facets-mode-"));
	temporaryDirectories.push(directory);
	return directory;
}

async function writeMode(
	root: string,
	directory: string,
	name: string,
	body: string,
	description = "Test mode",
): Promise<void> {
	const targetDirectory = join(root, directory);
	await mkdir(targetDirectory, { recursive: true });
	await writeFile(
		join(targetDirectory, `${name}.md`),
		`---\nname: ${name}\naxis: ${directory === "roles" ? "role" : directory}\ndescription: ${description}\n---\n\n${body}\n`,
	);
}

async function writePreset(
	root: string,
	name: string,
	refs: { role: string; authority: string; style: string },
	description = "Test preset",
	notes = "Preset notes",
): Promise<void> {
	await mkdir(root, { recursive: true });
	await writeFile(
		join(root, `${name}.md`),
		`---\nname: ${name}\ndescription: ${description}\nrole: ${refs.role}\nauthority: ${refs.authority}\nstyle: ${refs.style}\n---\n\n${notes}\n`,
	);
}

function handlersFor(handlers: Map<string, Handler[]>, event: string): Handler {
	const handler = handlers.get(event)?.[0];
	if (!handler) throw new Error(`Missing handler: ${event}`);
	return handler;
}

function createHarness(
	packageRoot: string,
	globalRoot: string,
	initialEntries: any[] = [],
	options: { cwd?: string; trusted?: boolean } = {},
) {
	const handlers = new Map<string, Handler[]>();
	const commands = new Map<string, { handler: Handler }>();
	const renderers = new Map<string, unknown>();
	const entries: any[] = [...initialEntries];
	let branch: any[] = entries;
	let selectedOption: string | undefined;
	const notifications: string[] = [];
	const pi = {
		on(event: string, handler: Handler) {
			handlers.set(event, [...(handlers.get(event) ?? []), handler]);
		},
		registerCommand(name: string, options: { handler: Handler }) {
			commands.set(name, options);
		},
		registerEntryRenderer(customType: string, renderer: unknown) {
			renderers.set(customType, renderer);
		},
		appendEntry(customType: string, data: unknown) {
			const entry = { type: "custom", customType, data };
			entries.push(entry);
			branch = entries;
		},
	} as unknown as ExtensionAPI;
	const context: any = {
		mode: "print",
		hasUI: false,
		cwd: options.cwd ?? globalRoot,
		isProjectTrusted: () => options.trusted ?? true,
		ui: {
			notify(message: string) {
				notifications.push(message);
			},
			select: async () => selectedOption,
		},
		sessionManager: { getBranch: () => branch },
	};

	registerModeExtension(pi, packageRoot, globalRoot);
	return {
		handlers,
		commands,
		renderers,
		entries,
		notifications,
		context,
		setSelectedOption(value: string | undefined) {
			selectedOption = value;
		},
		setBranch(value: any[]) {
			branch = value;
		},
	};
}

describe("mode discovery", () => {
	it("validates components and gives package definitions precedence", async () => {
		const packageRoot = await createRoot();
		const globalRoot = await createRoot();
		await writeMode(packageRoot, "roles", "shared", "Package body");
		await writeMode(globalRoot, "roles", "shared", "Global body");
		await writeMode(globalRoot, "roles", "fallback", "Fallback body");
		await mkdir(join(globalRoot, "style"), { recursive: true });
		await writeFile(join(globalRoot, "style", "broken.md"), "---\nname: broken\naxis: role\n---\n");

		const result = discoverModes(packageRoot, globalRoot);

		expect(result.components.get("role:shared")?.body).toBe("Package body");
		expect(result.components.get("role:fallback")?.source).toBe("global");
		expect(result.components.has("style:broken")).toBe(false);
		expect(result.diagnostics.some((diagnostic) => diagnostic.path.endsWith("broken.md"))).toBe(true);
	});

	it("discovers trusted project components with project/package/global precedence", async () => {
		const packageRoot = await createRoot();
		const globalRoot = await createRoot();
		const projectModesRoot = join(await createRoot(), ".pi", "modes");
		await writeMode(packageRoot, "roles", "shared", "Package body");
		await writeMode(packageRoot, "roles", "package-only", "Package-only body");
		await writeMode(globalRoot, "roles", "shared", "Global body");
		await writeMode(globalRoot, "roles", "global-only", "Global-only body");
		await writeMode(projectModesRoot, "roles", "shared", "Project body");
		await writeMode(projectModesRoot, "roles", "project-only", "Project-only body");
		await mkdir(join(projectModesRoot, "style"), { recursive: true });
		await writeFile(
			join(projectModesRoot, "style", "broken.md"),
			"---\nname: broken\naxis: role\ndescription: Broken mode\n---\n\nBody\n",
		);

		const trusted = discoverModes(packageRoot, globalRoot, projectModesRoot, true);
		expect(trusted.components.get("role:shared")?.source).toBe("project");
		expect(trusted.components.get("role:package-only")?.source).toBe("package");
		expect(trusted.components.get("role:global-only")?.source).toBe("global");
		expect(trusted.components.get("role:project-only")?.source).toBe("project");
		expect(trusted.diagnostics.some((diagnostic) => diagnostic.path.endsWith("broken.md"))).toBe(true);

		const untrusted = discoverModes(packageRoot, globalRoot, projectModesRoot, false);
		expect(untrusted.components.get("role:shared")?.source).toBe("package");
		expect(untrusted.components.has("role:project-only")).toBe(false);
		expect(untrusted.diagnostics.some((diagnostic) => diagnostic.path.endsWith("broken.md"))).toBe(false);
	});

	it("composes active component bodies without changing an empty prompt", async () => {
		const packageRoot = await createRoot();
		const globalRoot = await createRoot();
		await writeMode(packageRoot, "roles", "dev-peer", "Trace code paths.");
		await writeMode(packageRoot, "style", "concise", "Use short bullets.");
		const discovery = discoverModes(packageRoot, globalRoot);
		const state: ModeState = { role: "dev-peer", style: "concise" };

		expect(composeModePrompt("Base prompt", {}, discovery)).toBe("Base prompt");
		expect(composeModePrompt("Base prompt", state, discovery)).toContain(
			"## Active mode\n\n### role: dev-peer\n\nTrace code paths.",
		);
		expect(composeModePrompt("Base prompt", state, discovery)).toContain("### style: concise");
	});
});

describe("preset discovery", () => {
	it("discovers Markdown presets with project precedence, validation, and trust gating", async () => {
		const packageRoot = await createRoot();
		const globalRoot = await createRoot();
		const projectRoot = await createRoot();
		for (const [directory, name] of [
			["roles", "product-owner"],
			["authority", "recommend-and-proceed"],
			["style", "critical"],
		] as const) {
			await writeMode(packageRoot, directory, name, `${directory} body`);
		}

		await writePreset(join(globalRoot, "presets"), "review", {
			role: "product-owner",
			authority: "recommend-and-proceed",
			style: "critical",
		}, "Global review");
		await writePreset(join(globalRoot, "presets"), "shadowed", {
			role: "product-owner",
			authority: "recommend-and-proceed",
			style: "critical",
		});
		const projectPresets = join(projectRoot, ".pi", "modes", "presets");
		await writePreset(projectPresets, "review", {
			role: "product-owner",
			authority: "recommend-and-proceed",
			style: "critical",
		}, "Project review", "Project notes");
		await writePreset(projectPresets, "shadowed", {
			role: "missing-role",
			authority: "recommend-and-proceed",
			style: "critical",
		});

		const modes = discoverModes(packageRoot, globalRoot);
		const result = discoverPresets(join(globalRoot, "presets"), projectPresets, modes.components, true);
		expect(result.presets.get("review")?.source).toBe("project");
		expect(result.presets.get("review")?.notes).toBe("Project notes");
		expect(result.presets.has("shadowed")).toBe(false);
		expect(result.diagnostics.some((diagnostic) => diagnostic.path.endsWith("shadowed.md"))).toBe(true);

		const untrusted = discoverPresets(join(globalRoot, "presets"), projectPresets, modes.components, false);
		expect(untrusted.presets.get("review")?.source).toBe("global");
	});
});

describe("mode extension", () => {
	it("switches, persists, restores by branch, and clears active modes", async () => {
		const packageRoot = await createRoot();
		const globalRoot = await createRoot();
		await writeMode(packageRoot, "roles", "product-owner", "Prioritise outcomes.");
		await writeMode(packageRoot, "roles", "dev-peer", "Trace code paths.");
		const harness = createHarness(packageRoot, globalRoot);

		await handlersFor(harness.handlers, "session_start")({}, harness.context);
		expect(harness.renderers.has("pi-facets.mode-change")).toBe(true);
		await harness.commands.get("mode")!.handler("role product-owner", harness.context);
		await harness.commands.get("mode")!.handler("role dev-peer", harness.context);
		expect(harness.entries[0].customType).toBe("pi-facets.mode-change");
		expect(harness.entries[0].data.action).toBe("set-axis");
		expect(harness.entries[0].data.axis).toBe("role");
		expect(harness.entries[0].data.before.role).toBeNull();
		expect(harness.entries[0].data.after.role).toEqual({ name: "product-owner", source: "package" });
		expect(harness.entries[1].data.before.role).toEqual({ name: "product-owner", source: "package" });
		expect(harness.entries[1].data.after.role).toEqual({ name: "dev-peer", source: "package" });

		const beforeAgentStart = handlersFor(harness.handlers, "before_agent_start");
		let result = (await beforeAgentStart({ systemPrompt: "Base prompt" }, harness.context)) as
			| { systemPrompt?: string }
			| undefined;
		expect(result?.systemPrompt).toContain("Trace code paths.");
		expect(harness.entries).toHaveLength(2);

		harness.setBranch(harness.entries.slice(0, 1));
		await handlersFor(harness.handlers, "session_tree")({}, harness.context);
		result = (await beforeAgentStart({ systemPrompt: "Base prompt" }, harness.context)) as
			| { systemPrompt?: string }
			| undefined;
		expect(result?.systemPrompt).toContain("Prioritise outcomes.");
		expect(result?.systemPrompt).not.toContain("Trace code paths.");

		await harness.commands.get("mode")!.handler("clear", harness.context);
		expect(harness.entries[2].data.action).toBe("clear");
		expect(harness.entries[2].data.before.role).toEqual({ name: "product-owner", source: "package" });
		expect(harness.entries[2].data.after).toEqual({ role: null, authority: null, style: null });
		result = (await beforeAgentStart({ systemPrompt: "Base prompt" }, harness.context)) as
			| { systemPrompt?: string }
			| undefined;
		expect(result).toBeUndefined();
		expect(harness.entries).toHaveLength(3);
		expect(harness.notifications.some((message) => message.includes("Active mode cleared."))).toBe(true);
	});

	it("switches all axes, shows sources, handles errors, and supports selector boundaries", async () => {
		const packageRoot = await createRoot();
		const globalRoot = await createRoot();
		await writeMode(packageRoot, "roles", "dev-peer", "Trace code paths.");
		await writeMode(packageRoot, "authority", "advisory", "Present options.");
		await writeMode(packageRoot, "style", "concise", "Use short bullets.", "Short style");
		await mkdir(join(globalRoot, "roles"), { recursive: true });
		await writeFile(
			join(globalRoot, "roles", "broken.md"),
			"---\nname: broken\naxis: style\ndescription: Broken mode\n---\n\nBody\n",
		);
		const harness = createHarness(packageRoot, globalRoot);

		await handlersFor(harness.handlers, "session_start")({}, harness.context);
		expect(harness.notifications.some((message) => message.includes("broken.md") && message.includes("axis"))).toBe(true);

		await harness.commands.get("mode")!.handler("role missing", harness.context);
		expect(harness.notifications.some((message) => message.includes("Available: dev-peer"))).toBe(true);
		await harness.commands.get("mode")!.handler("role dev-peer", harness.context);
		await harness.commands.get("mode")!.handler("authority advisory", harness.context);
		await harness.commands.get("mode")!.handler("style concise", harness.context);
		await harness.commands.get("mode")!.handler("show", harness.context);

		const shown = harness.notifications.find((message) => message.startsWith("Active mode:"));
		expect(shown).toContain("role: dev-peer [package]");
		expect(shown).toContain(join(packageRoot, "roles", "dev-peer.md"));
		expect(shown).toContain("authority: advisory [package]");
		expect(shown).toContain("style: concise [package]");

		harness.context.mode = "tui";
		harness.setSelectedOption("style: concise — Short style");
		await harness.commands.get("mode")!.handler("", harness.context);
		expect(harness.notifications.some((message) => message.includes("Mode style set to concise."))).toBe(true);

		harness.context.mode = "print";
		await harness.commands.get("mode")!.handler("", harness.context);
		expect(
			harness.notifications.some((message) => message.includes("/mode selector requires interactive TUI")),
		).toBe(true);
	});

	it("loads project components and reports project source", async () => {
		const packageRoot = await createRoot();
		const globalRoot = await createRoot();
		const projectRoot = await createRoot();
		const projectModesRoot = join(projectRoot, ".pi", "modes");
		await writeMode(projectModesRoot, "roles", "local-role", "Project-local body.");
		const harness = createHarness(packageRoot, globalRoot, [], { cwd: projectRoot });

		await handlersFor(harness.handlers, "session_start")({}, harness.context);
		await harness.commands.get("mode")!.handler("role local-role", harness.context);
		await harness.commands.get("mode")!.handler("show", harness.context);

		const shown = harness.notifications.find((message) => message.startsWith("Active mode:"));
		expect(shown).toContain("role: local-role [project]");
		expect(shown).toContain(join(projectModesRoot, "roles", "local-role.md"));
		const result = (await handlersFor(harness.handlers, "before_agent_start")(
			{ systemPrompt: "Base prompt" },
			harness.context,
		)) as { systemPrompt?: string } | undefined;
		expect(result?.systemPrompt).toContain("Project-local body.");
	});

	it("applies, inspects, lists, selects, and materializes presets", async () => {
		const packageRoot = await createRoot();
		const globalRoot = await createRoot();
		const projectRoot = await createRoot();
		await writeMode(packageRoot, "roles", "product-owner", "Prioritise outcomes.");
		await writeMode(packageRoot, "roles", "dev-peer", "Trace code paths.");
		await writeMode(packageRoot, "authority", "recommend-and-proceed", "Recommend then proceed.");
		await writeMode(packageRoot, "style", "critical", "Challenge assumptions.");
		await writePreset(
			join(projectRoot, ".pi", "modes", "presets"),
			"review",
			{ role: "product-owner", authority: "recommend-and-proceed", style: "critical" },
			"Review preset",
			"Inspection-only notes.",
		);
		const harness = createHarness(packageRoot, globalRoot, [], { cwd: projectRoot });

		await handlersFor(harness.handlers, "session_start")({}, harness.context);
		await harness.commands.get("mode")!.handler("preset review", harness.context);
		expect(harness.entries[0].data.action).toBe("apply-preset");
		expect(harness.entries[0].data.preset).toEqual({ name: "review", source: "project" });
		expect(harness.entries[0].data.after).toEqual({
			role: { name: "product-owner", source: "package" },
			authority: { name: "recommend-and-proceed", source: "package" },
			style: { name: "critical", source: "package" },
		});
		const beforeAgentStart = handlersFor(harness.handlers, "before_agent_start");
		let result = (await beforeAgentStart({ systemPrompt: "Base prompt" }, harness.context)) as
			| { systemPrompt?: string }
			| undefined;
		expect(result?.systemPrompt).toContain("Prioritise outcomes.");
		expect(result?.systemPrompt).toContain("Recommend then proceed.");
		expect(result?.systemPrompt).toContain("Challenge assumptions.");
		expect(result?.systemPrompt).not.toContain("Inspection-only notes.");
		expect(harness.entries).toHaveLength(1);

		await harness.commands.get("mode")!.handler("preset show review", harness.context);
		const inspected = harness.notifications.find((message) => message.startsWith("Mode preset: review"));
		expect(inspected).toContain("source: project");
		expect(inspected).toContain("Inspection-only notes.");
		expect(harness.entries).toHaveLength(1);

		await harness.commands.get("mode")!.handler("presets", harness.context);
		expect(harness.notifications.some((message) => message.includes("review [project]") && message.includes("presets"))).toBe(true);

		await harness.commands.get("mode")!.handler("role dev-peer", harness.context);
		result = (await beforeAgentStart({ systemPrompt: "Base prompt" }, harness.context)) as
			| { systemPrompt?: string }
			| undefined;
		expect(result?.systemPrompt).toContain("Trace code paths.");
		expect(result?.systemPrompt).not.toContain("Prioritise outcomes.");

		harness.context.mode = "tui";
		harness.setSelectedOption("review — Review preset [project]");
		await harness.commands.get("mode")!.handler("preset", harness.context);
		expect(harness.notifications.some((message) => message.includes("Mode preset review applied."))).toBe(true);

		const resumed = createHarness(packageRoot, globalRoot, harness.entries, { cwd: projectRoot });
		await handlersFor(resumed.handlers, "session_start")({}, resumed.context);
		const resumedResult = (await handlersFor(resumed.handlers, "before_agent_start")(
			{ systemPrompt: "Base prompt" },
			resumed.context,
		)) as { systemPrompt?: string } | undefined;
		expect(resumedResult?.systemPrompt).toContain("Prioritise outcomes.");
		expect(resumedResult?.systemPrompt).toContain("Challenge assumptions.");
	});

	it("restores state directly on session_start", async () => {
		const packageRoot = await createRoot();
		const globalRoot = await createRoot();
		await writeMode(packageRoot, "roles", "product-owner", "Prioritise outcomes.");

		const first = createHarness(packageRoot, globalRoot);
		await handlersFor(first.handlers, "session_start")({}, first.context);
		await first.commands.get("mode")!.handler("role product-owner", first.context);

		const resumed = createHarness(packageRoot, globalRoot, first.entries);
		await handlersFor(resumed.handlers, "session_start")({}, resumed.context);
		const result = (await handlersFor(resumed.handlers, "before_agent_start")(
			{ systemPrompt: "Base prompt" },
			resumed.context,
		)) as { systemPrompt?: string } | undefined;
		expect(result?.systemPrompt).toContain("Base prompt");
		expect(result?.systemPrompt).toContain("Prioritise outcomes.");
	});

	it("restores legacy mode-state entries", async () => {
		const packageRoot = await createRoot();
		const globalRoot = await createRoot();
		await writeMode(packageRoot, "roles", "product-owner", "Prioritise outcomes.");
		const legacyEntries = [
			{
				type: "custom",
				customType: "pi-facets.mode-state",
				data: { version: 1, state: { role: "product-owner" } },
			},
		];
		const harness = createHarness(packageRoot, globalRoot, legacyEntries);
		await handlersFor(harness.handlers, "session_start")({}, harness.context);
		const legacyResult = (await handlersFor(harness.handlers, "before_agent_start")(
			{ systemPrompt: "Base prompt" },
			harness.context,
		)) as { systemPrompt?: string } | undefined;
		expect(legacyResult?.systemPrompt).toContain("Prioritise outcomes.");
	});
});
