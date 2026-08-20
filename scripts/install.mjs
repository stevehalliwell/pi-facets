#!/usr/bin/env node

import { cp, lstat, mkdir, readdir } from "node:fs/promises";
import { homedir } from "node:os";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const RESOURCE_DIRECTORIES = ["facets", "prompts", "skills"];
const sourceRoot = join(dirname(fileURLToPath(import.meta.url)), "..", "examples", "pi-resources");

function usage() {
	return `Usage: pi-facets install [--force]

Copy bundled facets, prompts, and skills into global Pi scope.

Options:
  --force  Replace conflicting bundled files
  --help    Show this help`;
}

function fail(message) {
	console.error(`pi-facets: ${message}`);
	console.error(`Run \`pi-facets install --help\` for usage.`);
	process.exitCode = 1;
}

function parseArgs(args) {
	let force = false;
	for (const argument of args) {
		if (argument === "--help") return { help: true };
		if (argument === "--force") {
			force = true;
			continue;
		}
		throw new Error(`Unknown argument \`${argument}\`.`);
	}
	return { force };
}

async function filesIn(directory) {
	const entries = await readdir(directory, { withFileTypes: true });
	const files = [];
	for (const entry of entries) {
		const path = join(directory, entry.name);
		if (entry.isDirectory()) files.push(...await filesIn(path));
		else if (entry.isFile()) files.push(path);
	}
	return files;
}

async function exists(path) {
	try {
		await lstat(path);
		return true;
	} catch (error) {
		if (error.code === "ENOENT") return false;
		throw error;
	}
}

async function install({ force }) {
	const targetRoot = join(homedir(), ".pi", "agent");
	const sources = (await Promise.all(RESOURCE_DIRECTORIES.map((directory) => filesIn(join(sourceRoot, directory))))).flat();
	const conflicts = [];
	for (const source of sources) {
		const target = join(targetRoot, relative(sourceRoot, source));
		if (await exists(target)) conflicts.push(relative(sourceRoot, source));
	}
	if (conflicts.length && !force) {
		console.error("pi-facets: existing files were not changed:");
		for (const path of conflicts) console.error(`  ${path}`);
		process.exitCode = 1;
		return;
	}
	for (const source of sources) {
		const target = join(targetRoot, relative(sourceRoot, source));
		await mkdir(dirname(target), { recursive: true });
		await cp(source, target, { force: true });
	}
	console.log(`Installed ${sources.length} Pi resources in ${targetRoot}`);
}

try {
	const command = process.argv[2];
	if (command !== "install") {
		if (command === "--help" || command === undefined) console.log(usage());
		else fail(`Unknown command \`${command}\`.`);
	} else {
		const options = parseArgs(process.argv.slice(3));
		if (options.help) console.log(usage());
		else await install(options);
	}
} catch (error) {
	fail(error instanceof Error ? error.message : String(error));
}
