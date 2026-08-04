---
id: 019fce18-0000-7000-8000-000000000001
name: add-backlog-capture-preset-and-skill
created_at: 2026-08-04T00:00:00.000Z
desc: "Add brief draft-only backlog capture preset and workflow."
tags: []
status: done
scope: agreed
---

## Scope

### Desired outcome

- Pi offers a concise preset for quickly recording draft backlog items without refining them.

### In scope

- Add `backlog-capture` preset and associated skill.
- Add facet-grid and focused package-test coverage.

### Out of scope

- Change backlog refinement, task lifecycle, or existing facet components.

### Existing behavior to preserve

- Backlog refinement remains implementation-readiness work.
- Captured tasks remain `todo` / `draft` until refined.

### Acceptance

- Preset resolves `product-owner + recommend-and-proceed + concise` and associates `backlog-capture` skill.
- Skill captures minimal faithful task details and defers refinement.
- Focused checks pass.

## Open questions

- None.

## Decisions

- Keep capture distinct from `backlog-refinement`; user confirmed 2026-08-04.

## Plan

1. Add preset and skill.
2. Update grid and package coverage.
3. Run focused checks.

## Implemented so far

- Added `backlog-capture` preset: `product-owner + recommend-and-proceed + concise`.
- Added draft-only capture workflow; it supports multiple distinct items and defers refinement.
- Added facet-grid entry and package composition/resource coverage.

## Checks

- `npm run check` — pass.
- Preset/skill frontmatter parse — pass.
- `npm test -- --run test/package.test.ts` — 13 pass; 1 unrelated failure: user-modified `.pi/settings.json` is commented JSON, so `JSON.parse` fails.
- `git diff --check` — pass.

## Review / next slice

- Approved complete by user 2026-08-04.
- `.pi/settings.json` remains user-modified and out of scope.

## Notes

- Attendant CLI unavailable from agent tool root; Markdown record remains source of truth.
