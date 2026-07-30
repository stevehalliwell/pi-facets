---
id: 019fb0a2-b50c-72b7-8101-e45bb21f6bd0
name: setup-pi-extension-package-requirements
created_at: 2026-07-30T01:28:01.036Z
desc: "Set up Pi package metadata, local package loading, and development checks for pi-facets."
tags: []
status: done
scope: agreed
depends_on: []
---

## Scope

### Desired outcome

Establish package and runtime requirements needed to develop, test, and load the pi-facets Pi extension.

### In scope

- Review relevant Pi documentation and extension examples.
- Inspect supported Pi extension APIs and package conventions.
- Define required runtime and development dependencies.
- Add the minimal package manifest and TypeScript/module configuration required by the extension.
- Add reproducible setup and test scripts once toolchain is known.
- Document required Node/Pi versions and installation steps.

### Out of scope

- Implementing `/mode` behavior.
- Adding mode components or skills.
- Choosing unrelated build tooling or production deployment configuration.

### Existing behavior to preserve

- Use Pi-supported extension packaging and loading conventions.
- Keep dependency set minimal; avoid adding packages when platform or stdlib supports requirement.

### Acceptance

- Extension package requirements are identified and documented.
- Minimal package/config files allow extension development and test commands to run.
- Human-facing setup and test commands are recorded in `README.md`.
- `AGENTS.md` routes agents to `README.md` and contains only agent-specific rules after package setup is working.
- Dependency choices include compatible versions and rationale where non-obvious.

## Open questions

- Which Pi package/API should be declared, and at what version range?
- Node version and module format: ESM, CommonJS, or Pi-specific convention?
- TypeScript compiler, test runner, and type definitions required?
- Should package be installable globally, linked into Pi, or loaded from a local workspace?

## Decisions

- Start with smallest package surface compatible with Pi extension APIs.
- Pi loads TypeScript extensions through jiti; no extension build step needed.
- Use ESM package metadata with Pi conventional resource directories.
- Keep `@earendil-works/pi-coding-agent` as a peer dependency; pin matching local dev types only.
- Use project `.pi/settings.json` with local package path so this repo loads itself during tests.

## Plan

- Review relevant Pi documentation and extension examples first.
- Inspect installed Pi extension package conventions.
- Propose package manifest, scripts, and version constraints.
- Confirm choices, then add config and run setup/test checks.
- Review `README.md` and `AGENTS.md` against working package commands and conventions.

## Implemented so far

- Added ESM `package.json` with `pi` resource manifest, peer/runtime boundary, and pinned development tools.
- Added `package-lock.json`, `tsconfig.json`, and package self-check in `test/package.test.ts`.
- Added `.pi/settings.json` loading repository root (`..`) as project-local Pi package.
- Updated README with human-facing setup/check instructions.
- Reduced AGENTS.md to README routing, agent-only context/rules, and protected paths.
- Updated CHANGELOG and `.gitignore`.

## Checks

- `npm install` — passed; npm reported one dev-tree high advisory.
- `npm run check` — passed.
- `npm test` — passed: 2 tests.
- `npm test -- test/package.test.ts` — passed: 2 tests.
- `npm audit --omit=dev --audit-level=high` — passed: 0 runtime vulnerabilities.
- `pi --approve --no-session --no-tools --mode json -p "Reply exactly: OK"` — passed; project package settings loaded without startup errors.

## Review / next slice

- Approved complete; package/toolchain setup is done.
- Next slice/task: implement mode components, then mode extension.

## Notes

- This task should unblock extension implementation and mode-extension tests.
