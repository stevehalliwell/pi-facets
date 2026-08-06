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
	it("copies bundled facets into project scope", async () => {
		const project = await temporaryDirectory();
		await install(["--scope", "project"], project);

		const facets = join(project, ".pi", "facets");
		await expect(access(join(facets, "roles", "dev-peer.md"))).resolves.toBeUndefined();
		await expect(access(join(facets, "presets", "implementation-partner.md"))).resolves.toBeUndefined();
		await expect(access(join(facets, "skills"))).rejects.toThrow();
	});

	it("copies bundled facets into global scope", async () => {
		const home = await temporaryDirectory();
		await install(["--scope", "global"], await temporaryDirectory(), home);

		await expect(access(join(home, ".pi", "agent", "facets", "style", "concise.md"))).resolves.toBeUndefined();
	});

	it("reports conflicts without changes and replaces only bundled files with --force", async () => {
		const project = await temporaryDirectory();
		const facets = join(project, ".pi", "facets");
		const conflict = join(facets, "roles", "dev-peer.md");
		await mkdir(join(facets, "roles"), { recursive: true });
		await writeFile(conflict, "custom", "utf8");
		await writeFile(join(facets, "roles", "keep.md"), "keep", "utf8");

		await expect(install(["--scope", "project"], project)).rejects.toMatchObject({
			code: 1,
			stderr: expect.stringContaining(join("roles", "dev-peer.md")),
		});
		expect(await readFile(conflict, "utf8")).toBe("custom");
		await expect(access(join(facets, "style", "concise.md"))).rejects.toThrow();

		await install(["--scope", "project", "--force"], project);
		expect(await readFile(conflict, "utf8")).not.toBe("custom");
		expect(await readFile(join(facets, "roles", "keep.md"), "utf8")).toBe("keep");
	});

	it("validates arguments and shows help", async () => {
		const project = await temporaryDirectory();
		await expect(install(["--scope", "workspace"], project)).rejects.toMatchObject({
			code: 1,
			stderr: expect.stringContaining("must be `project` or `global`"),
		});
		const result = await install(["--help"], project);
		expect(result.stdout).toContain("Usage: pi-facets install");
	});
});
