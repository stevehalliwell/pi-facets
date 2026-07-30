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

function handlersFor(handlers: Map<string, Handler[]>, event: string): Handler {
	const handler = handlers.get(event)?.[0];
	if (!handler) throw new Error(`Missing handler: ${event}`);
	return handler;
}

function createHarness(packageRoot: string, globalRoot: string, initialEntries: any[] = []) {
	const handlers = new Map<string, Handler[]>();
	const commands = new Map<string, { handler: Handler }>();
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
			select: async () => selectedOption,
		},
		sessionManager: { getBranch: () => branch },
	};

	registerModeExtension(pi, packageRoot, globalRoot);
	return {
		handlers,
		commands,
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
		const harness = createHarness(packageRoot, globalRoot);

		await handlersFor(harness.handlers, "session_start")({}, harness.context);
		await harness.commands.get("mode")!.handler("role product-owner", harness.context);
		await harness.commands.get("mode")!.handler("role dev-peer", harness.context);

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
});
