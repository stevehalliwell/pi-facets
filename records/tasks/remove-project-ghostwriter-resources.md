---
id: 019fd4cd-5b04-703d-928d-bb85ad8f5a46
name: remove-project-ghostwriter-resources
created_at: 2026-08-06T02:00:55.812Z
desc: "Remove project ghostwriter resources without a Pi-global replacement."
tags:
  - presets
  - skills
  - cleanup
status: done
priority: medium
depends_on:
  - investigate-ghostwriter-preset-removal
---

## Scope

### Desired outcome

- The project no longer ships the ghostwriter workflow or its dedicated facet resources; no Pi-global replacement is created.

### In scope

- Remove the `ghostwriter` preset, `ghostwriting` skill, `ghostwriter` role, and `prose-craft` style.
- Remove project documentation, test, and package references to the removed resources.

### Out of scope

- Creating a Pi-global replacement.
- Changing editorial-review behavior or other long-form workflows.

### Existing behavior to preserve

- `editorial-review` remains available for supplied-draft revision.
- Unrelated presets, roles, styles, skills, and explicit facet overrides remain unchanged.

### Acceptance

- No project ghostwriter preset, skill, role, or prose-craft style remains.
- Project documentation, tests, and package resource coverage no longer list the removed resources.
- Focused resource-discovery and package checks pass.

## Open questions

- None.

## Decisions

- 2026-08-06: Maintainer chose removal of project resources only; do not create a Pi-global replacement.

## Plan

1. Complete the report-only investigation record.
2. Remove dedicated resources and their project references.
3. Run focused resource-discovery and package checks.

## Implemented so far

- Removed `.pi/facets/presets/ghostwriter.md`, `.pi/facets/roles/ghostwriter.md`, `.pi/facets/style/prose-craft.md`, and `.pi/skills/ghostwriting/`.
- Removed Ghostwriting and dedicated resource-list entries from `docs/facet-grid.md`.
- Removed ghostwriting resource and association coverage from `test/package.test.ts`.

## Checks

- Confirmed all four project resources are absent and no live ghostwriter, ghostwriting, or prose-craft references remain in project source, docs, tests, or package manifest.
- `npm test -- test/package.test.ts` passed (17 tests).

## Review / next slice

- Ready for review: complete; maintainer approved project-only cleanup on 2026-08-06.
- Likely next slice/task: select another agreed task.

## Notes

- Former task scope: `agreed`.

- Removal is reversible through version control but intentionally does not retain a global copy.
