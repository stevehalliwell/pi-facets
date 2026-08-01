---
id: 019fb61f-309f-76c2-9ef2-4de5d47ee159
name: rename-mode-command-to-facets
created_at: 2026-07-31T03:02:05.215Z
desc: ""
tags: []
status: done
scope: agreed
depends_on: []
---

## Scope

### Desired outcome

Make `/facets` canonical pi-facets slash command for selecting and inspecting role, authority, style, and preset state.

### In scope

- Register extension command as `/facets`.
- Update command help, usage errors, notifications, README, and implementation brief.
- Reject `/mode` as removed command.
- Rename package, project, and global mode-storage folders to `facets`.
- Rename extension/test files and internal facet identifiers.
- Rename persisted event IDs to `pi-facets.facet-state` and `pi-facets.facet-change`.
- Update focused command, storage-path, and event tests.

### Out of scope

- Renaming Pi API `ctx.mode` or CLI `--mode`.
- Adding legacy event-ID compatibility.
- Changing component discovery, persistence, restoration, prompt composition, or preset semantics.
- Adding `/mode` compatibility alias or automatic migration.

### Existing behavior to preserve

- `/facets` retains current subcommands and semantics.
- Components load from package `facets/`, project `.pi/facets/`, and global `~/.pi/agent/facets/` paths.
- Presets apply all three axes atomically from corresponding `facets/presets/` paths.
- New `pi-facets.facet-*` entries survive session restore and branch navigation.
- Explicit commands remain usable outside TUI; selectors remain TUI-only.

### Acceptance

- `/facets`, `/facets clear`, `/facets role [<name>]`, `/facets authority [<name>]`, `/facets style [<name>]`, and `/facets preset [<name>|show <name>]` behave as current equivalents.
- `/mode` is not registered or documented and produces normal unknown-command behavior.
- Help, usage errors, README, and implementation brief contain `/facets`, not `/mode` command examples.
- Package, project, and global storage docs and code use `facets` paths; preset subfolders follow.
- Tests cover canonical command registration, representative subcommands, removed `/mode` behavior, storage-path resolution, and new facet event IDs.
- Old `pi-facets.mode-*` entries are not restored under hard-rename policy.
- `npm run check`, focused facet tests, full tests, and `git diff --check` pass.

## Open questions

- None.

## Decisions

- Use `/facets` as canonical command; remove `/mode` without alias. See `records/decisions/use-facets-command-keyword.md`.
- Rename internal terminology and event IDs to `facet`; preserve facet behavior and state shape. See `records/decisions/rename-mode-internals-to-facets.md`.
- Hard-rename event IDs; do not restore old `pi-facets.mode-*` entries.

## Plan

- Rename registration, source file, internal identifiers, event IDs, and command-local strings.
- Rename package storage folder and update package/project/global path resolution.
- Update focused tests and public docs.
- Run acceptance checks.

## Implemented so far

- Renamed registered extension command from `mode` to `facets`.
- Updated command help, selector errors, usage errors, README, and implementation brief.
- Updated facet tests; asserted `/facets` registration and absence of `mode` registration.
- Renamed internal types, functions, labels, extension/test files, and prompt section terminology to `facet`.
- Renamed event IDs to `pi-facets.facet-state` and `pi-facets.facet-change`.
- Renamed package storage folder `modes/` to `facets/`.
- Updated project/global discovery roots, preset paths, tests, README, implementation brief, and package description.

## Checks

- `npm run check` — passed.
- `npm test -- --run test/facets.test.ts` — passed: 10 tests.
- `npm test` — passed: 12 tests.
- `git diff --check` — passed.
- `rg` active sources for old facet terminology — only Pi `ctx.mode`, CLI `--mode`, and intentional removed-command assertions remain.
- `rg` storage references confirms package/project/global paths use `facets`.

## Review / next slice

- Ready for review: completed; user approved on 2026-08-01.
- Likely next slice/task: none.

## Notes

- Hard event-ID rename intentionally invalidates restoration of old `pi-facets.mode-*` entries.
