import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { composeFacetPrompt, discoverFacetPresets, discoverFacets, estimateTokens, facetWarnings, registerFacetExtension } from "../extensions/facets.js";

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

async function preset(root: string, name: string): Promise<void> {
	await mkdir(root, { recursive: true });
	await writeFile(join(root, `${name}.md`), `---\nname: ${name}\ndescription: ${name}\nrole: dev-peer\nauthority: advisory\nstyle: concise\n---\n`);
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

	it("composes selected facets in compact axis order", async () => {
		const global = await root();
		await facet(global, "roles", "dev-peer", "- Trace paths.");
		await facet(global, "authority", "advisory", "- Ask first.");
		await facet(global, "style", "concise", "- Lead with result.");
		const discovery = discoverFacets(global);
		expect(composeFacetPrompt("Base", { style: "concise", role: "dev-peer", authority: "advisory" }, discovery)).toBe(
			"Base\n\n## Active facets\n\n**role: dev-peer**\n- Trace paths.\n\n**authority: advisory**\n- Ask first.\n\n**style: concise**\n- Lead with result.",
		);
		expect(composeFacetPrompt("Base", {}, discovery)).toBe("Base");
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
			ui: { notify() {}, select: async (title: string) => { titles.push(title); return choices.shift(); } },
			sessionManager: { getBranch: () => entries },
		};
		registerFacetExtension(pi, global);
		await handlers.get("session_start")!({}, ctx);
		await commands.get("facets")!.handler("", ctx);
		expect(titles).toEqual(["Facets", "Select role facet", "Facets"]);
		expect(entries.at(-1).data.after.role).toEqual({ name: "dev-peer", source: "project" });
	});
});
