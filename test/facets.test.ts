import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import {
	composeFacetPrompt,
	discoverDefaultPreset,
	discoverFacetPresets,
	discoverFacets,
	estimateTokens,
	facetWarnings,
	formatFacetStatus,
	registerFacetExtension,
	type FacetPreset,
} from "../extensions/facets.js";

const temporaryDirectories: string[] = [];
afterEach(async () => Promise.all(temporaryDirectories.splice(0).map((path) => rm(path, { recursive: true, force: true }))));

async function root(): Promise<string> {
	const path = await mkdtemp(join(tmpdir(), "pi-facets-"));
	temporaryDirectories.push(path);
	return path;
}

async function facet(root: string, directory: "roles" | "authority" | "style", name: string, body = "Body"): Promise<void> {
	await mkdir(join(root, directory), { recursive: true });
	await writeFile(join(root, directory, `${name}.md`), `---\nname: ${name}\naxis: ${directory === "roles" ? "role" : directory}\ndescription: ${name}\n---\n\n${body}\n`);
}

async function activation(root: string, directory: "roles" | "authority" | "style", name: string, body: string): Promise<void> {
	await mkdir(join(root, directory), { recursive: true });
	await writeFile(join(root, directory, `${name}.activation.md`), body);
}

async function preset(root: string, name: string, skill?: string): Promise<void> {
	await mkdir(root, { recursive: true });
	await writeFile(join(root, `${name}.md`), `---\nname: ${name}\ndescription: ${name}\nrole: dev-peer\nauthority: advisory\nstyle: concise${skill ? `\nskill: ${skill}` : ""}\n---\n`);
}

async function defaultPreset(root: string, content: string): Promise<void> {
	await mkdir(root, { recursive: true });
	await writeFile(join(root, "default.md"), content);
}

describe("facet discovery", () => {
	it("uses trusted project facets before global facets", async () => {
		const global = await root();
		const project = join(await root(), ".pi", "facets");
		await facet(global, "roles", "dev-peer", "Global body");
		await facet(global, "roles", "global-only");
		await facet(project, "roles", "dev-peer", "Project body");
		const trusted = discoverFacets(global, project, true);
		expect(trusted.components.get("role:dev-peer")?.source).toBe("project");
		expect(trusted.components.get("role:dev-peer")?.body).toBe("Project body");
		expect(trusted.components.get("role:global-only")?.source).toBe("global");
		const untrusted = discoverFacets(global, project, false);
		expect(untrusted.components.get("role:dev-peer")?.body).toBe("Global body");
	});

	it("reads valid sibling activation files and reports invalid ones", async () => {
		const global = await root();
		await facet(global, "roles", "dev-peer");
		await activation(global, "roles", "dev-peer", "Set up once.");
		await activation(global, "roles", "orphan", "Orphan.");
		await facet(global, "authority", "empty");
		await activation(global, "authority", "empty", " \n");
		const discovery = discoverFacets(global);
		expect(discovery.components.get("role:dev-peer")?.activation).toBe("Set up once.");
		expect(discovery.diagnostics).toEqual(expect.arrayContaining([
			expect.objectContaining({ path: join(global, "roles", "orphan.activation.md"), message: expect.stringContaining('no valid role facet named "orphan"') }),
			expect.objectContaining({ path: join(global, "authority", "empty.activation.md"), message: expect.stringContaining("Markdown body must be non-empty") }),
		]));
	});

	it("loads bundled activation files without diagnostics", () => {
		const discovery = discoverFacets(resolve(".pi", "facets"));
		expect(discovery.diagnostics).toEqual([]);
		expect(discovery.components.get("role:dev-peer")?.activation).toContain("Full mode: enforce ladder.");
		expect(discovery.components.get("style:concise")?.activation).toContain("Respond terse like smart caveman.");
	});

	it("discovers project presets before global presets", async () => {
		const global = await root();
		const project = join(await root(), ".pi", "facets");
		for (const directory of ["roles", "authority", "style"] as const) {
			await facet(global, directory, directory === "roles" ? "dev-peer" : directory === "authority" ? "advisory" : "concise");
		}
		await preset(join(global, "presets"), "review");
		await preset(join(project, "presets"), "review");
		const components = discoverFacets(global, project, true).components;
		const result = discoverFacetPresets(join(global, "presets"), join(project, "presets"), components, true);
		expect(result.presets.get("review")?.source).toBe("project");
	});

	it("parses optional valid skill associations and rejects invalid names", async () => {
		const global = await root();
		const project = await root();
		for (const directory of ["roles", "authority", "style"] as const) {
			await facet(global, directory, directory === "roles" ? "dev-peer" : directory === "authority" ? "advisory" : "concise");
		}
		await preset(join(global, "presets"), "with-skill", "paired-skill");
		await preset(join(project, "presets"), "invalid-skill", "Paired Skill");
		const components = discoverFacets(global).components;
		const result = discoverFacetPresets(join(global, "presets"), join(project, "presets"), components, true);
		expect(result.presets.get("with-skill")?.skill).toBe("paired-skill");
		expect(result.presets.has("invalid-skill")).toBe(false);
		expect(result.diagnostics).toEqual(expect.arrayContaining([
			expect.objectContaining({ message: expect.stringContaining("frontmatter `skill` must be a valid Pi skill name") }),
		]));
	});

	it("resolves trusted project default preset before global fallback", async () => {
		const global = await root();
		const project = await root();
		const presets = new Map<string, FacetPreset>([
			["global", {} as FacetPreset],
			["project", {} as FacetPreset],
		]);
		await defaultPreset(global, "---\npreset: global\n---\n");
		await defaultPreset(project, "---\npreset: project\n---\n");
		expect(discoverDefaultPreset(global, project, presets, true)).toBe("project");
		await defaultPreset(project, "---\npreset: missing\n---\n");
		expect(discoverDefaultPreset(global, project, presets, true)).toBe("global");
		expect(discoverDefaultPreset(global, project, presets, false)).toBe("global");
		await defaultPreset(global, "---\npreset: missing\n---\n");
		expect(discoverDefaultPreset(global, project, presets, true)).toBeUndefined();
	});

	it("composes selected facets in compact axis order", async () => {
		const global = await root();
		await facet(global, "roles", "dev-peer", "- Trace paths.");
		await facet(global, "authority", "advisory", "- Ask first.");
		await facet(global, "style", "concise", "- Lead with result.");
		const discovery = discoverFacets(global);
		expect(composeFacetPrompt("Base", { style: "concise", role: "dev-peer", authority: "advisory" }, discovery)).toBe(
			"Base\n\n## Active facets\n\n**role: dev-peer**\n- Trace paths.\n\n**authority: advisory**\n- Ask first.\n\n**style: concise**\n- Lead with result.\n\n**Facet alignment**\n- Clear conflict? Load `facet-alignment`.",
		);
		expect(composeFacetPrompt("Base", {}, discovery)).toBe("Base");
	});

	it("formats preset and partial facet status", () => {
		const presets = new Map<string, FacetPreset>([["review", { name: "review", role: "dev-peer", authority: "advisory", style: "concise" } as FacetPreset]]);
		expect(formatFacetStatus({ role: "dev-peer", authority: "advisory", style: "concise" }, presets)).toBe("facets: review");
		expect(formatFacetStatus({ role: "dev-peer", style: "concise" }, presets)).toBe("facets: role=dev-peer · style=concise");
		expect(formatFacetStatus({}, presets)).toBeUndefined();
	});

	it("warns about source format and active token budgets", async () => {
		const global = await root();
		await facet(global, "roles", "dev-peer", "# Heading\n\nText");
		await facet(global, "authority", "advisory", "x".repeat(1001));
		await facet(global, "style", "concise", "x".repeat(1001));
		const discovery = discoverFacets(global);
		expect(discovery.diagnostics.map((diagnostic) => diagnostic.message)).toContain(
			"component format warning: body starts with a H1; use list-first Markdown to avoid a nested heading",
		);
		expect(estimateTokens("12345")).toBe(2);
		expect(facetWarnings({ role: "dev-peer", authority: "advisory", style: "concise" }, discovery)).toEqual(
			expect.arrayContaining([
				expect.stringContaining("role/dev-peer: body starts with a H1"),
				expect.stringContaining("authority/advisory: estimated 251 tokens exceeds 200-token component budget"),
				expect.stringContaining("active facet composition: estimated"),
			]),
		);
	});
});

describe("facet menu", () => {
	it("applies defaults transiently without overriding explicit clear", async () => {
		const global = await root();
		const project = await root();
		await facet(global, "roles", "dev-peer", "- Trace paths.");
		await facet(global, "authority", "advisory", "- Ask first.");
		await facet(global, "style", "concise", "- Lead with result.");
		await preset(join(global, "presets"), "default");
		await defaultPreset(global, "---\npreset: default\n---\n");
		const handlers = new Map<string, (event: any, ctx: any) => Promise<any>>();
		const entries: any[] = [];
		const statuses: Array<[string, string | undefined]> = [];
		const pi = {
			on(name: string, handler: any) { handlers.set(name, handler); },
			registerCommand() {},
			registerEntryRenderer() {},
			appendEntry(customType: string, data: unknown) { entries.push({ type: "custom", customType, data }); },
		} as unknown as ExtensionAPI;
		const ctx: any = {
			mode: "tui", cwd: project, isProjectTrusted: () => true,
			ui: { notify() {}, select: async () => undefined, setStatus: (key: string, text: string | undefined) => statuses.push([key, text]), theme: { fg: (_: string, text: string) => text } },
			sessionManager: { getBranch: () => entries },
		};
		registerFacetExtension(pi, global);
		await handlers.get("session_start")!({}, ctx);
		expect(entries).toEqual([]);
		expect(statuses.at(-1)).toEqual(["pi-facets", "facets: default"]);
		expect((await handlers.get("before_agent_start")!({ systemPrompt: "Base" }, ctx))?.systemPrompt).toContain("**role: dev-peer**");
		entries.push({
			type: "custom",
			customType: "pi-facets.facet-change",
			data: {
				version: 1,
				action: "clear",
				before: { role: null, authority: null, style: null },
				after: { role: null, authority: null, style: null },
			},
		});
		await handlers.get("session_tree")!({}, ctx);
		expect(statuses.at(-1)).toEqual(["pi-facets", undefined]);
		expect(await handlers.get("before_agent_start")!({ systemPrompt: "Base" }, ctx)).toBeUndefined();
		await handlers.get("session_shutdown")!({}, ctx);
		expect(statuses.at(-1)).toEqual(["pi-facets", undefined]);
	});

	it("injects activation content once for restoration and changed facets", async () => {
		const global = await root();
		const project = await root();
		await facet(global, "roles", "dev-peer", "- Persistent role.");
		await facet(global, "roles", "maintainer", "- Persistent maintainer.");
		await facet(global, "authority", "advisory", "- Persistent advisory.");
		await facet(global, "authority", "decide", "- Persistent decide.");
		await facet(global, "style", "concise", "- Persistent style.");
		await activation(global, "roles", "dev-peer", "ROLE DEV-PEER");
		await activation(global, "roles", "maintainer", "ROLE MAINTAINER");
		await activation(global, "authority", "advisory", "AUTH ADVISORY");
		await activation(global, "authority", "decide", "AUTH DECIDE");
		await activation(global, "style", "concise", "STYLE CONCISE");
		await preset(join(global, "presets"), "default");
		await preset(join(global, "presets"), "partial");
		await writeFile(join(global, "presets", "partial.md"), "---\nname: partial\ndescription: partial\nrole: maintainer\nauthority: decide\nstyle: concise\n---\n");
		await defaultPreset(global, "---\npreset: default\n---\n");
		const handlers = new Map<string, (event: any, ctx: any) => Promise<any>>();
		const commands = new Map<string, { handler: (args: string, ctx: any) => Promise<void> }>();
		const entries: any[] = [];
		let choices: Array<string | undefined> = [];
		const pi = {
			on(name: string, handler: any) { handlers.set(name, handler); },
			registerCommand(name: string, command: any) { commands.set(name, command); },
			registerEntryRenderer() {},
			appendEntry(customType: string, data: unknown) { entries.push({ type: "custom", customType, data }); },
		} as unknown as ExtensionAPI;
		const ctx: any = {
			mode: "tui", cwd: project, isProjectTrusted: () => true,
			ui: { notify() {}, select: async () => choices.shift(), setStatus() {}, theme: { fg: (_: string, text: string) => text } },
			sessionManager: { getBranch: () => entries },
		};
		registerFacetExtension(pi, global);
		await handlers.get("session_start")!({}, ctx);
		let prompt = (await handlers.get("before_agent_start")!({ systemPrompt: "Base" }, ctx))?.systemPrompt;
		expect(prompt).toContain("ROLE DEV-PEER");
		expect(prompt).toContain("AUTH ADVISORY");
		expect(prompt).toContain("STYLE CONCISE");
		expect((await handlers.get("before_agent_start")!({ systemPrompt: "Base" }, ctx))?.systemPrompt).not.toContain("ROLE DEV-PEER");

		choices = ["Role — dev-peer [global]", "maintainer — maintainer [global]", undefined];
		await commands.get("facets")!.handler("", ctx);
		prompt = (await handlers.get("before_agent_start")!({ systemPrompt: "Base" }, ctx))?.systemPrompt;
		expect(prompt).toContain("ROLE MAINTAINER");
		expect(prompt).not.toContain("AUTH ADVISORY");

		choices = ["Presets — (none)", "partial — partial [global]"];
		await commands.get("facets")!.handler("", ctx);
		prompt = (await handlers.get("before_agent_start")!({ systemPrompt: "Base" }, ctx))?.systemPrompt;
		expect(prompt).toContain("AUTH DECIDE");
		expect(prompt).not.toContain("ROLE MAINTAINER");

		choices = ["Clear all facets"];
		await commands.get("facets")!.handler("", ctx);
		choices = ["Role — (none)", "maintainer — maintainer [global]", undefined];
		await commands.get("facets")!.handler("", ctx);
		expect((await handlers.get("before_agent_start")!({ systemPrompt: "Base" }, ctx))?.systemPrompt).toContain("ROLE MAINTAINER");
		choices = ["Role — maintainer [global]", "maintainer — maintainer [global]", undefined];
		await commands.get("facets")!.handler("", ctx);
		expect((await handlers.get("before_agent_start")!({ systemPrompt: "Base" }, ctx))?.systemPrompt).not.toContain("ROLE MAINTAINER");

		await handlers.get("session_tree")!({}, ctx);
		expect((await handlers.get("before_agent_start")!({ systemPrompt: "Base" }, ctx))?.systemPrompt).toContain("ROLE MAINTAINER");
	});

	it("applies a preset when its associated skill is unavailable", async () => {
		const global = await root();
		const project = await root();
		for (const directory of ["roles", "authority", "style"] as const) {
			await facet(global, directory, directory === "roles" ? "dev-peer" : directory === "authority" ? "advisory" : "concise");
		}
		await preset(join(global, "presets"), "paired", "paired-skill");
		const commands = new Map<string, { handler: (args: string, ctx: any) => Promise<void> }>();
		const entries: any[] = [];
		const notifications: string[] = [];
		const choices = ["Presets — (none)", "paired — paired [skill: paired-skill] [global]"];
		const pi = {
			on() {},
			getCommands: () => [],
			registerCommand(name: string, command: any) { commands.set(name, command); },
			registerEntryRenderer() {},
			appendEntry(customType: string, data: unknown) { entries.push({ type: "custom", customType, data }); },
		} as unknown as ExtensionAPI;
		const ctx: any = {
			mode: "tui", cwd: project, isProjectTrusted: () => true,
			ui: { notify: (message: string) => notifications.push(message), select: async () => choices.shift(), setStatus() {}, theme: { fg: (_: string, text: string) => text } },
			sessionManager: { getBranch: () => entries },
		};
		registerFacetExtension(pi, global);
		await commands.get("facets")!.handler("", ctx);
		expect(entries.at(-1).data.action).toBe("apply-preset");
		expect(notifications).toContain('Associated skill "paired-skill" is unavailable. Add or enable it, then select this preset again.');
	});

	it("launches an available associated skill only after confirmation", async () => {
		const global = await root();
		const project = await root();
		for (const directory of ["roles", "authority", "style"] as const) {
			await facet(global, directory, directory === "roles" ? "dev-peer" : directory === "authority" ? "advisory" : "concise");
		}
		await preset(join(global, "presets"), "paired", "paired-skill");
		const commands = new Map<string, { handler: (args: string, ctx: any) => Promise<void> }>();
		const entries: any[] = [];
		const messages: string[] = [];
		const choices = ["Presets — (none)", "paired — paired [skill: paired-skill] [global]"];
		const pi = {
			on() {},
			getCommands: () => [{ name: "skill:paired-skill", source: "skill" }],
			registerCommand(name: string, command: any) { commands.set(name, command); },
			registerEntryRenderer() {},
			appendEntry(customType: string, data: unknown) { entries.push({ type: "custom", customType, data }); },
			sendUserMessage(message: string) { messages.push(message); },
		} as unknown as ExtensionAPI;
		const ctx: any = {
			mode: "tui", cwd: project, isProjectTrusted: () => true,
			ui: { notify() {}, select: async () => choices.shift(), confirm: async () => true, setStatus() {}, theme: { fg: (_: string, text: string) => text } },
			sessionManager: { getBranch: () => entries },
		};
		registerFacetExtension(pi, global);
		await commands.get("facets")!.handler("", ctx);
		expect(messages).toEqual(["/skill:paired-skill"]);
	});

	it("keeps an available associated skill idle when confirmation is declined", async () => {
		const global = await root();
		const project = await root();
		for (const directory of ["roles", "authority", "style"] as const) {
			await facet(global, directory, directory === "roles" ? "dev-peer" : directory === "authority" ? "advisory" : "concise");
		}
		await preset(join(global, "presets"), "paired", "paired-skill");
		const commands = new Map<string, { handler: (args: string, ctx: any) => Promise<void> }>();
		const entries: any[] = [];
		const messages: string[] = [];
		const choices = ["Presets — (none)", "paired — paired [skill: paired-skill] [global]"];
		const pi = {
			on() {},
			getCommands: () => [{ name: "skill:paired-skill", source: "skill" }],
			registerCommand(name: string, command: any) { commands.set(name, command); },
			registerEntryRenderer() {},
			appendEntry(customType: string, data: unknown) { entries.push({ type: "custom", customType, data }); },
			sendUserMessage(message: string) { messages.push(message); },
		} as unknown as ExtensionAPI;
		const ctx: any = {
			mode: "tui", cwd: project, isProjectTrusted: () => true,
			ui: { notify() {}, select: async () => choices.shift(), confirm: async () => false, setStatus() {}, theme: { fg: (_: string, text: string) => text} },
			sessionManager: { getBranch: () => entries },
		};
		registerFacetExtension(pi, global);
		await commands.get("facets")!.handler("", ctx);
		expect(entries.at(-1).data.action).toBe("apply-preset");
		expect(messages).toEqual([]);
	});

	it("shows project selections and returns to menu after an axis selection", async () => {
		const global = await root();
		const project = await root();
		const projectFacets = join(project, ".pi", "facets");
		await facet(projectFacets, "roles", "dev-peer");
		const commands = new Map<string, { handler: (args: string, ctx: any) => Promise<void> }>();
		const handlers = new Map<string, (event: unknown, ctx: any) => Promise<void>>();
		const entries: any[] = [];
		const titles: string[] = [];
		const choices = ["Role — (none)", "dev-peer — dev-peer [project]", undefined];
		const pi = {
			on(name: string, handler: any) { handlers.set(name, handler); },
			registerCommand(name: string, command: any) { commands.set(name, command); },
			registerEntryRenderer() {},
			appendEntry(customType: string, data: unknown) { entries.push({ type: "custom", customType, data }); },
		} as unknown as ExtensionAPI;
		const ctx: any = {
			mode: "tui", cwd: project, isProjectTrusted: () => true,
			ui: { notify() {}, select: async (title: string) => { titles.push(title); return choices.shift(); }, setStatus() {}, theme: { fg: (_: string, text: string) => text } },
			sessionManager: { getBranch: () => entries },
		};
		registerFacetExtension(pi, global);
		await handlers.get("session_start")!({}, ctx);
		await commands.get("facets")!.handler("", ctx);
		expect(titles).toEqual(["Facets", "Select role facet", "Facets"]);
		expect(entries.at(-1).data.after.role).toEqual({ name: "dev-peer", source: "project" });
	});
});
