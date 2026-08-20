import { execFile } from "node:child_process";
import { access, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { promisify } from "node:util";
import { afterEach, describe, expect, it } from "vitest";

const execute = promisify(execFile);
const script = resolve("scripts/install.mjs");
const temporaryDirectories: string[] = [];

afterEach(async () => Promise.all(temporaryDirectories.splice(0).map((path) => rm(path, { recursive: true, force: true }))));

async function temporaryDirectory(): Promise<string> {
	const path = await mkdtemp(join(tmpdir(), "pi-facets-install-"));
	temporaryDirectories.push(path);
	return path;
}

function install(args: string[], cwd: string, home?: string) {
	return execute(process.execPath, [script, "install", ...args], {
		cwd,
		env: { ...process.env, ...(home ? { HOME: home, USERPROFILE: home } : {}) },
	});
}

describe("pi-facets install", () => {
	it("copies bundled facets, prompts, and skills into global scope", async () => {
		const home = await temporaryDirectory();
		await install([], await temporaryDirectory(), home);

		const resources = join(home, ".pi", "agent");
		await expect(access(join(resources, "facets", "style", "concise.md"))).resolves.toBeUndefined();
		await expect(access(join(resources, "prompts", "explore-options.md"))).resolves.toBeUndefined();
		await expect(access(join(resources, "skills", "implementation", "SKILL.md"))).resolves.toBeUndefined();
	});

	it("reports conflicts without changes and replaces only bundled files with --force", async () => {
		const home = await temporaryDirectory();
		const resources = join(home, ".pi", "agent");
		const conflict = join(resources, "facets", "roles", "dev-peer.md");
		await mkdir(join(resources, "facets", "roles"), { recursive: true });
		await writeFile(conflict, "custom", "utf8");
		await writeFile(join(resources, "facets", "roles", "keep.md"), "keep", "utf8");

		await expect(install([], await temporaryDirectory(), home)).rejects.toMatchObject({
			code: 1,
			stderr: expect.stringContaining(join("facets", "roles", "dev-peer.md")),
		});
		expect(await readFile(conflict, "utf8")).toBe("custom");
		await expect(access(join(resources, "skills", "implementation", "SKILL.md"))).rejects.toThrow();

		await install(["--force"], await temporaryDirectory(), home);
		expect(await readFile(conflict, "utf8")).not.toBe("custom");
		expect(await readFile(join(resources, "facets", "roles", "keep.md"), "utf8")).toBe("keep");
	});

	it("validates arguments and shows help", async () => {
		const project = await temporaryDirectory();
		await expect(install(["--scope", "global"], project)).rejects.toMatchObject({
			code: 1,
			stderr: expect.stringContaining("Unknown argument `--scope`"),
		});
		const result = await install(["--help"], project);
		expect(result.stdout).toContain("Usage: pi-facets install");
	});
});
