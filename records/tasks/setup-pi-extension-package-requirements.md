---
id: 019fb0a2-b50c-72b7-8101-e45bb21f6bd0
name: setup-pi-extension-package-requirements
created_at: 2026-07-30T01:28:01.036Z
desc: ""
tags: []
status: todo
scope: draft
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
- Required setup/test commands are recorded in `README.md` and `AGENTS.md`.
- `README.md` and `AGENTS.md` are reviewed and corrected after package setup is working.
- Dependency choices include compatible versions and rationale where non-obvious.

## Open questions

- Which Pi package/API should be declared, and at what version range?
- Node version and module format: ESM, CommonJS, or Pi-specific convention?
- TypeScript compiler, test runner, and type definitions required?
- Should package be installable globally, linked into Pi, or loaded from a local workspace?

## Decisions

- Start with smallest package surface compatible with Pi extension APIs.
- Do not install or commit dependencies until package/toolchain choices are confirmed.

## Plan

- Review relevant Pi documentation and extension examples first.
- Inspect installed Pi extension package conventions.
- Propose package manifest, scripts, and version constraints.
- Confirm choices, then add config and run setup/test checks.
- Review `README.md` and `AGENTS.md` against working package commands and conventions.

## Implemented so far

- Task captured from user request.

## Checks

- Not started.

## Review / next slice

- Ready for review: no; scope remains draft.
- Likely next slice/task: inspect Pi extension package requirements and propose exact config.

## Notes

- This task should unblock extension implementation and mode-extension tests.
