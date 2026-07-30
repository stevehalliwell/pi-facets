import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import {
	composeModePrompt,
	discoverModes,
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

async function writeMode(root: string, directory: string, name: string, body: string, description = "Test mode"): Promise<void> {
	const targetDirectory = join(root, directory);
	await mkdir(targetDirectory, { recursive: true });
	await writeFile(
		join(targetDirectory, `${name}.md`),
		`---\nname: ${name}\naxis: ${directory === "roles" ? "role" : directory}\ndescription: ${description}\n---\n\n${body}\n`,
	);
}

function handlersFor(handlers: Map<string, Handler[]>, event: string): Handler {
	const handler = handlers.get(event)?.[0];
	if (!handler) throw new Error(`Missing handler: ${event}`);
	return handler;
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

describe("mode extension", () => {
	it("switches, persists, restores by branch, and clears active modes", async () => {
		const packageRoot = await createRoot();
		const globalRoot = await createRoot();
		await writeMode(packageRoot, "roles", "product-owner", "Prioritise outcomes.");
		await writeMode(packageRoot, "roles", "dev-peer", "Trace code paths.");

		const handlers = new Map<string, Handler[]>();
		const commands = new Map<string, { handler: Handler }>();
		const entries: any[] = [];
		let branch: any[] = entries;
		const notifications: string[] = [];
		const pi = {
			on(event: string, handler: Handler) {
				handlers.set(event, [...(handlers.get(event) ?? []), handler]);
			},
			registerCommand(name: string, options: { handler: Handler }) {
				commands.set(name, options);
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
			ui: {
				notify(message: string) {
					notifications.push(message);
				},
				select: async () => undefined,
			},
			sessionManager: { getBranch: () => branch },
		};

		registerModeExtension(pi, packageRoot, globalRoot);
		await handlersFor(handlers, "session_start")({}, context);
		await commands.get("mode")!.handler("role product-owner", context);
		await commands.get("mode")!.handler("role dev-peer", context);

		const beforeAgentStart = handlersFor(handlers, "before_agent_start");
		let result = (await beforeAgentStart({ systemPrompt: "Base prompt" }, context)) as
			| { systemPrompt?: string }
			| undefined;
		expect(result?.systemPrompt).toContain("Trace code paths.");
		expect(entries).toHaveLength(2);

		branch = entries.slice(0, 1);
		await handlersFor(handlers, "session_tree")({}, context);
		result = (await beforeAgentStart({ systemPrompt: "Base prompt" }, context)) as
			| { systemPrompt?: string }
			| undefined;
		expect(result?.systemPrompt).toContain("Prioritise outcomes.");
		expect(result?.systemPrompt).not.toContain("Trace code paths.");

		await commands.get("mode")!.handler("clear", context);
		result = (await beforeAgentStart({ systemPrompt: "Base prompt" }, context)) as
			| { systemPrompt?: string }
			| undefined;
		expect(result).toBeUndefined();
		expect(entries).toHaveLength(3);
		expect(notifications.some((message) => message.includes("Active mode cleared."))).toBe(true);
	});
});
