#!/usr/bin/env node

import { cp, lstat, mkdir, readdir } from "node:fs/promises";
import { homedir } from "node:os";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const RESOURCE_DIRECTORIES = ["roles", "authority", "style", "presets"];
const sourceRoot = join(dirname(fileURLToPath(import.meta.url)), "..", ".pi", "facets");

function usage() {
	return `Usage: pi-facets install --scope project|global [--force]

Copy bundled facets and presets into Pi global or current-project scope.

Options:
  --scope <project|global>  Destination scope (required)
  --force                   Replace conflicting bundled files
  --help                    Show this help`;
}

function fail(message) {
	console.error(`pi-facets: ${message}`);
	console.error(`Run \`pi-facets install --help\` for usage.`);
	process.exitCode = 1;
}

function parseArgs(args) {
	let scope;
	let force = false;
	for (let index = 0; index < args.length; index += 1) {
		const argument = args[index];
		if (argument === "--help") return { help: true };
		if (argument === "--force") {
			force = true;
			continue;
		}
		if (argument === "--scope") {
			scope = args[index + 1];
			index += 1;
			continue;
		}
		throw new Error(`Unknown argument \`${argument}\`.`);
	}
	if (scope !== "project" && scope !== "global") {
		throw new Error("`--scope` must be `project` or `global`.");
	}
	return { scope, force };
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

async function install({ scope, force }) {
	const targetRoot = scope === "project"
		? join(process.cwd(), ".pi", "facets")
		: join(homedir(), ".pi", "agent", "facets");
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
	console.log(`Installed ${sources.length} facet resources in ${targetRoot}`);
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
