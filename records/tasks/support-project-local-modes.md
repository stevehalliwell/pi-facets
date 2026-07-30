---
id: 019fb0b0-e39d-7d3c-8c8b-605aac367aad
name: support-project-local-modes
created_at: 2026-07-30T01:43:30.461Z
desc: ""
tags: []
status: done
scope: agreed
depends_on:
  - tasks/implement-mode-extension
---

## Scope

### Desired outcome

Allow projects to define mode components local to their repository while retaining global components.

### In scope

- Discover project-local role, authority, and style definitions under project `.pi/modes/`.
- Keep global definitions available as defaults.
- Project-local components shadow same-named global components; unmatched components fall back to global.
- Do not merge component files.
- Validate local components with the same single-axis contract.
- Make active source scope inspectable through mode queries.

### Out of scope

- Project-local tool restrictions.
- Automatic mode inference.
- Preset implementation beyond resolving project-local components.
- Persistent UI indicators.

### Existing behavior to preserve

- Global mode components continue working outside projects.
- Explicit component selection remains deterministic.
- Tool calling remains unrestricted.

### Acceptance

- Trusted project components are discovered from `<cwd>/.pi/modes/{roles,authority,style}/*.md`.
- Resolution is deterministic: project > package > global; files are never merged.
- Project-only, fallback, same-name collision, malformed local file, and untrusted-project cases are covered by tests.
- Invalid trusted local components produce actionable diagnostics.
- `/mode show` reports `project` source and path for active local components.
- README documents local layout, precedence, and trust behavior.

## Open questions

- None for this implementation slice.

## Decisions

- Project-local modes are required direction.
- Project components shadow same-named package and global components; unmatched names fall back package, then global.
- Project root is current `ctx.cwd`; do not search parent directories.
- Untrusted projects skip local component discovery without loading local Markdown; package/global modes remain available.
- Extend component source metadata to `project | package | global`; preserve names-only persisted state and report missing references when resolution changes.

## Plan

- Extend `discoverModes` and refresh flow to accept trusted project component root.
- Reuse existing Markdown parser and single-axis validation.
- Extend source/ref validation and `/mode show` output for `project`.
- Add focused discovery, trust, diagnostics, and source-display tests.
- Update README after implementation and checks pass.

## Implemented so far

- Task captured from deferred-question review.
- Refinement agreed: path, precedence, trust gating, discovery boundary, and acceptance checks.
- Added trusted current-cwd project component discovery.
- Added project > package > global resolution precedence.
- Added project source reporting, trust gating, diagnostics, and fallback tests.
- Documented project-local mode layout and resolution behavior in `README.md`.

## Checks

- `npm test` — 12 tests passed.
- `npm run check` — passed.

## Review / next slice

- Approved and complete.
- Next: refine next pivotal draft task.

## Notes

- Keep global/project source boundaries explicit in `/mode show` or equivalent query output.
