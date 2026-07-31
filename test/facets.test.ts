import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import {
	composeFacetPrompt,
	discoverFacets,
	discoverFacetPresets,
	registerFacetExtension,
	type FacetState,
} from "../extensions/facets.js";

type Handler = (...args: any[]) => unknown;

const temporaryDirectories: string[] = [];

afterEach(async () => {
	await Promise.all(temporaryDirectories.splice(0).map((directory) => rm(directory, { recursive: true, force: true })));
});

async function createRoot(): Promise<string> {
	const directory = await mkdtemp(join(tmpdir(), "pi-facets-facet-"));
	temporaryDirectories.push(directory);
	return directory;
}

async function writeFacet(
	root: string,
	directory: string,
	name: string,
	body: string,
	description = "Test facet",
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

	registerFacetExtension(pi, packageRoot, globalRoot);
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

describe("facet discovery", () => {
	it("validates components and gives package definitions precedence", async () => {
		const packageRoot = await createRoot();
		const globalRoot = await createRoot();
		await writeFacet(packageRoot, "roles", "shared", "Package body");
		await writeFacet(globalRoot, "roles", "shared", "Global body");
		await writeFacet(globalRoot, "roles", "fallback", "Fallback body");
		await mkdir(join(globalRoot, "style"), { recursive: true });
		await writeFile(join(globalRoot, "style", "broken.md"), "---\nname: broken\naxis: role\n---\n");

		const result = discoverFacets(packageRoot, globalRoot);

		expect(result.components.get("role:shared")?.body).toBe("Package body");
		expect(result.components.get("role:fallback")?.source).toBe("global");
		expect(result.components.has("style:broken")).toBe(false);
		expect(result.diagnostics.some((diagnostic) => diagnostic.path.endsWith("broken.md"))).toBe(true);
	});

	it("discovers trusted project components with project/package/global precedence", async () => {
		const packageRoot = await createRoot();
		const globalRoot = await createRoot();
		const projectFacetsRoot = join(await createRoot(), ".pi", "facets");
		await writeFacet(packageRoot, "roles", "shared", "Package body");
		await writeFacet(packageRoot, "roles", "package-only", "Package-only body");
		await writeFacet(globalRoot, "roles", "shared", "Global body");
		await writeFacet(globalRoot, "roles", "global-only", "Global-only body");
		await writeFacet(projectFacetsRoot, "roles", "shared", "Project body");
		await writeFacet(projectFacetsRoot, "roles", "project-only", "Project-only body");
		await mkdir(join(projectFacetsRoot, "style"), { recursive: true });
		await writeFile(
			join(projectFacetsRoot, "style", "broken.md"),
			"---\nname: broken\naxis: role\ndescription: Broken facet\n---\n\nBody\n",
		);

		const trusted = discoverFacets(packageRoot, globalRoot, projectFacetsRoot, true);
		expect(trusted.components.get("role:shared")?.source).toBe("project");
		expect(trusted.components.get("role:package-only")?.source).toBe("package");
		expect(trusted.components.get("role:global-only")?.source).toBe("global");
		expect(trusted.components.get("role:project-only")?.source).toBe("project");
		expect(trusted.diagnostics.some((diagnostic) => diagnostic.path.endsWith("broken.md"))).toBe(true);

		const untrusted = discoverFacets(packageRoot, globalRoot, projectFacetsRoot, false);
		expect(untrusted.components.get("role:shared")?.source).toBe("package");
		expect(untrusted.components.has("role:project-only")).toBe(false);
		expect(untrusted.diagnostics.some((diagnostic) => diagnostic.path.endsWith("broken.md"))).toBe(false);
	});

	it("composes active component bodies without changing an empty prompt", async () => {
		const packageRoot = await createRoot();
		const globalRoot = await createRoot();
		await writeFacet(packageRoot, "roles", "dev-peer", "Trace code paths.");
		await writeFacet(packageRoot, "style", "concise", "Use short bullets.");
		const discovery = discoverFacets(packageRoot, globalRoot);
		const state: FacetState = { role: "dev-peer", style: "concise" };

		expect(composeFacetPrompt("Base prompt", {}, discovery)).toBe("Base prompt");
		expect(composeFacetPrompt("Base prompt", state, discovery)).toContain(
			"## Active facets\n\n### role: dev-peer\n\nTrace code paths.",
		);
		expect(composeFacetPrompt("Base prompt", state, discovery)).toContain("### style: concise");
	});
});

describe("preset discovery", () => {
	it("discovers shipped package presets with valid component references", async () => {
		const globalRoot = await createRoot();
		const packageRoot = resolve("facets");
		const discovery = discoverFacets(packageRoot, globalRoot);
		const result = discoverFacetPresets(
			join(packageRoot, "presets"),
			join(globalRoot, "presets"),
			join(await createRoot(), ".pi", "facets", "presets"),
			discovery.components,
			true,
		);

		expect(discovery.diagnostics).toEqual([]);
		expect(result.diagnostics).toEqual([]);
		expect([...result.presets.keys()].sort()).toEqual([
			"backlog-refinement",
			"delivery-planning",
			"implementation-review",
			"messaging-strategy",
			"research-exploration",
		]);
		expect([...result.presets.values()].every((preset) => preset.source === "package")).toBe(true);
	});

	it("discovers Markdown presets with project precedence, validation, and trust gating", async () => {
		const packageRoot = await createRoot();
		const globalRoot = await createRoot();
		const projectRoot = await createRoot();
		for (const [directory, name] of [
			["roles", "product-owner"],
			["authority", "recommend-and-proceed"],
			["style", "critical"],
		] as const) {
			await writeFacet(packageRoot, directory, name, `${directory} body`);
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
		await writePreset(join(globalRoot, "presets"), "package-only", {
			role: "product-owner",
			authority: "recommend-and-proceed",
			style: "critical",
		}, "Global fallback");
		await writePreset(join(globalRoot, "presets"), "invalid-package", {
			role: "product-owner",
			authority: "recommend-and-proceed",
			style: "critical",
		});
		await writePreset(join(packageRoot, "presets"), "package-only", {
			role: "product-owner",
			authority: "recommend-and-proceed",
			style: "critical",
		}, "Package preset");
		await writePreset(join(packageRoot, "presets"), "invalid-package", {
			role: "missing-role",
			authority: "recommend-and-proceed",
			style: "critical",
		});
		const projectPresets = join(projectRoot, ".pi", "facets", "presets");
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

		const facets = discoverFacets(packageRoot, globalRoot);
		const result = discoverFacetPresets(
			join(packageRoot, "presets"),
			join(globalRoot, "presets"),
			projectPresets,
			facets.components,
			true,
		);
		expect(result.presets.get("review")?.source).toBe("project");
		expect(result.presets.get("review")?.notes).toBe("Project notes");
		expect(result.presets.get("package-only")?.source).toBe("package");
		expect(result.presets.get("package-only")?.description).toBe("Package preset");
		expect(result.presets.has("invalid-package")).toBe(false);
		expect(result.presets.has("shadowed")).toBe(false);
		expect(result.diagnostics.some((diagnostic) => diagnostic.path.endsWith("shadowed.md"))).toBe(true);

		const untrusted = discoverFacetPresets(
			join(packageRoot, "presets"),
			join(globalRoot, "presets"),
			projectPresets,
			facets.components,
			false,
		);
		expect(untrusted.presets.get("review")?.source).toBe("global");
	});
});

describe("facet extension", () => {
	it("switches, persists, restores by branch, and clears active facets", async () => {
		const packageRoot = await createRoot();
		const globalRoot = await createRoot();
		await writeFacet(packageRoot, "roles", "product-owner", "Prioritise outcomes.");
		await writeFacet(packageRoot, "roles", "dev-peer", "Trace code paths.");
		const harness = createHarness(packageRoot, globalRoot);

		await handlersFor(harness.handlers, "session_start")({}, harness.context);
		expect(harness.renderers.has("pi-facets.facet-change")).toBe(true);
		expect(harness.commands.has("facets")).toBe(true);
		expect(harness.commands.has("mode")).toBe(false);
		await harness.commands.get("facets")!.handler("role product-owner", harness.context);
		await harness.commands.get("facets")!.handler("role dev-peer", harness.context);
		expect(harness.entries[0].customType).toBe("pi-facets.facet-change");
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

		await harness.commands.get("facets")!.handler("clear", harness.context);
		expect(harness.entries[2].data.action).toBe("clear");
		expect(harness.entries[2].data.before.role).toEqual({ name: "product-owner", source: "package" });
		expect(harness.entries[2].data.after).toEqual({ role: null, authority: null, style: null });
		result = (await beforeAgentStart({ systemPrompt: "Base prompt" }, harness.context)) as
			| { systemPrompt?: string }
			| undefined;
		expect(result).toBeUndefined();
		expect(harness.entries).toHaveLength(3);
		expect(harness.notifications.some((message) => message.includes("Active facets cleared."))).toBe(true);
	});

	it("switches all axes, shows sources, handles errors, and supports selector boundaries", async () => {
		const packageRoot = await createRoot();
		const globalRoot = await createRoot();
		await writeFacet(packageRoot, "roles", "dev-peer", "Trace code paths.");
		await writeFacet(packageRoot, "authority", "advisory", "Present options.");
		await writeFacet(packageRoot, "style", "concise", "Use short bullets.", "Short style");
		await mkdir(join(globalRoot, "roles"), { recursive: true });
		await writeFile(
			join(globalRoot, "roles", "broken.md"),
			"---\nname: broken\naxis: style\ndescription: Broken facet\n---\n\nBody\n",
		);
		const harness = createHarness(packageRoot, globalRoot);

		await handlersFor(harness.handlers, "session_start")({}, harness.context);
		expect(harness.notifications.some((message) => message.includes("broken.md") && message.includes("axis"))).toBe(true);

		await harness.commands.get("facets")!.handler("role missing", harness.context);
		expect(harness.notifications.some((message) => message.includes("Available: dev-peer"))).toBe(true);

		harness.context.mode = "tui";
		harness.setSelectedOption("dev-peer — Test facet [package]");
		await harness.commands.get("facets")!.handler("role", harness.context);
		expect(harness.notifications.some((message) => message.includes("Facet role set to dev-peer."))).toBe(true);

		await harness.commands.get("facets")!.handler("authority advisory", harness.context);
		await harness.commands.get("facets")!.handler("style concise", harness.context);

		harness.setSelectedOption("style: concise — Short style [package] [current]");
		await harness.commands.get("facets")!.handler("", harness.context);
		const shown = harness.notifications.find((message) => message.startsWith("Current facets:"));
		expect(shown).toContain("role: dev-peer [package]");
		expect(shown).toContain("authority: advisory [package]");
		expect(shown).toContain("style: concise [package]");
		expect(harness.notifications.some((message) => message.includes("Facet style set to concise."))).toBe(true);

		harness.context.mode = "print";
		await harness.commands.get("facets")!.handler("role", harness.context);
		expect(harness.notifications.some((message) => message.includes("Available role facets:") && message.includes("[current]"))).toBe(true);

		await harness.commands.get("facets")!.handler("show", harness.context);
		await harness.commands.get("facets")!.handler("presets", harness.context);
		expect(harness.notifications.filter((message) => message.includes("Usage:")).length).toBeGreaterThanOrEqual(2);

		const entriesBeforeHelp = harness.entries.length;
		await harness.commands.get("facets")!.handler("help", harness.context);
		const help = harness.notifications.find((message) => message.startsWith("Facet commands:"));
		expect(help).toContain("/facets role <name> — set role");
		expect(help).toContain("/facets preset show <name> — inspect preset");
		expect(harness.entries).toHaveLength(entriesBeforeHelp);
	});

	it("loads project components and reports project source", async () => {
		const packageRoot = await createRoot();
		const globalRoot = await createRoot();
		const projectRoot = await createRoot();
		const projectFacetsRoot = join(projectRoot, ".pi", "facets");
		await writeFacet(projectFacetsRoot, "roles", "local-role", "Project-local body.");
		const harness = createHarness(packageRoot, globalRoot, [], { cwd: projectRoot });

		await handlersFor(harness.handlers, "session_start")({}, harness.context);
		await harness.commands.get("facets")!.handler("role local-role", harness.context);
		await harness.commands.get("facets")!.handler("", harness.context);

		const shown = harness.notifications.find((message) => message.startsWith("Current facets:"));
		expect(shown).toContain("role: local-role [project]");
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
		await writeFacet(packageRoot, "roles", "product-owner", "Prioritise outcomes.");
		await writeFacet(packageRoot, "roles", "dev-peer", "Trace code paths.");
		await writeFacet(packageRoot, "authority", "recommend-and-proceed", "Recommend then proceed.");
		await writeFacet(packageRoot, "style", "critical", "Challenge assumptions.");
		await writePreset(
			join(projectRoot, ".pi", "facets", "presets"),
			"review",
			{ role: "product-owner", authority: "recommend-and-proceed", style: "critical" },
			"Review preset",
			"Inspection-only notes.",
		);
		const harness = createHarness(packageRoot, globalRoot, [], { cwd: projectRoot });

		await handlersFor(harness.handlers, "session_start")({}, harness.context);
		await harness.commands.get("facets")!.handler("preset review", harness.context);
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

		harness.context.mode = "tui";
		harness.setSelectedOption("review — Review preset [project] [current]");
		await harness.commands.get("facets")!.handler("preset", harness.context);
		expect(harness.notifications.some((message) => message.includes("Current preset: review"))).toBe(true);
		expect(harness.notifications.some((message) => message.includes("Facet preset review applied."))).toBe(true);
		expect(harness.entries).toHaveLength(2);

		harness.context.mode = "print";
		await harness.commands.get("facets")!.handler("preset show review", harness.context);
		const inspected = harness.notifications.find((message) => message.startsWith("Facet preset: review"));
		expect(inspected).toContain("source: project");
		expect(inspected).toContain("Inspection-only notes.");
		expect(harness.entries).toHaveLength(2);

		await harness.commands.get("facets")!.handler("presets", harness.context);
		expect(harness.notifications.some((message) => message.includes("Usage:") && message.includes("/facets preset"))).toBe(true);

		await harness.commands.get("facets")!.handler("role dev-peer", harness.context);
		result = (await beforeAgentStart({ systemPrompt: "Base prompt" }, harness.context)) as
			| { systemPrompt?: string }
			| undefined;
		expect(result?.systemPrompt).toContain("Trace code paths.");
		expect(result?.systemPrompt).not.toContain("Prioritise outcomes.");

		harness.context.mode = "tui";
		harness.setSelectedOption("review — Review preset [project]");
		await harness.commands.get("facets")!.handler("preset", harness.context);
		expect(harness.notifications.some((message) => message.includes("Facet preset review applied."))).toBe(true);

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
		await writeFacet(packageRoot, "roles", "product-owner", "Prioritise outcomes.");

		const first = createHarness(packageRoot, globalRoot);
		await handlersFor(first.handlers, "session_start")({}, first.context);
		await first.commands.get("facets")!.handler("role product-owner", first.context);

		const resumed = createHarness(packageRoot, globalRoot, first.entries);
		await handlersFor(resumed.handlers, "session_start")({}, resumed.context);
		const result = (await handlersFor(resumed.handlers, "before_agent_start")(
			{ systemPrompt: "Base prompt" },
			resumed.context,
		)) as { systemPrompt?: string } | undefined;
		expect(result?.systemPrompt).toContain("Base prompt");
		expect(result?.systemPrompt).toContain("Prioritise outcomes.");
	});

	it("restores facet-state entries", async () => {
		const packageRoot = await createRoot();
		const globalRoot = await createRoot();
		await writeFacet(packageRoot, "roles", "product-owner", "Prioritise outcomes.");
		const legacyEntries = [
			{
				type: "custom",
				customType: "pi-facets.facet-state",
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
