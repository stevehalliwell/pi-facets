---
id: 019fc5f9-3858-79e7-9cc0-671233da0df4
name: associate-matching-preset-skills
created_at: 2026-08-03T04:54:32.280Z
desc: ""
tags: []
status: done
scope: agreed
---

## Scope

### Desired outcome

- Every project preset with a matching project skill declares that skill through `skill` frontmatter.

### In scope

- Inventory project presets and project skills.
- Add matching `skill` fields to preset frontmatter.
- Show an associated skill in each preset TUI label.
- Remove preset-body skill references once `skill` frontmatter and TUI labels expose association.
- Add short non-workflow use-case notes to preset bodies.
- Update facet-craft and canonical resource-boundary guidance.
- Preserve existing component composition and optional-prompt behavior.

### Out of scope

- New skills, presets, facets, or prompt associations.
- Associations where no matching skill exists.

### Existing behavior to preserve

- Explicit interactive selection applies facets before offering associated skill launch.
- Default, restored, RPC, JSON, print, and other non-interactive selection never launch skills.

### Acceptance

- Each matching preset/skill pair has matching `skill` frontmatter.
- Non-matching presets retain no invented association.
- Preset TUI labels include associated skill names.
- Associated preset bodies do not repeat skill association and retain a short use-case note.
- Facet-craft and resource-boundary guidance require `skill` frontmatter for preset/skill association.
- Package validation passes.

## Open questions

- None.

## Decisions

- 2026-08-03: User requested matching preset skills be listed in frontmatter.

## Plan

1. Compare preset names and supported paired workflows with project skills.
2. Add missing `skill` fields.
3. Add associated skill name to preset TUI labels.
4. Remove redundant preset-body skill references; add short use-case notes; update authoring/audit guidance.
5. Validate resource discovery and package checks.

## Implemented so far

- Added `skill` frontmatter to `backlog-refinement`, `editorial-review`, `ghostwriter`, `implementation-partner`, `messaging-strategy`, `release-readiness`, `technical-review`, `visual-direction`, and `web-implementation` presets.
- Kept `five-whys` existing association; left `delivery-planning` and `research-exploration` unassociated because no matching project skill exists.
- Added association coverage to `test/package.test.ts`.
- Added `[skill: <name>]` to associated preset TUI labels in `extensions/facets.ts`.
- Updated associated-preset TUI tests.
- Removed redundant skill references from `backlog-refinement`, `implementation-partner`, `messaging-strategy`, and `release-readiness` preset bodies.
- Updated `docs/resource-boundaries.md` and `.pi/skills/facet-craft/SKILL.md`: preset/skill association belongs only in `skill` frontmatter.
- Added test coverage rejecting preset-body skill references for associated presets.
- Added short use-case notes to `backlog-refinement`, `implementation-partner`, `messaging-strategy`, and `release-readiness` preset bodies.
- Clarified canonical preset bodies may carry short use-case notes.
- Added test coverage requiring a non-empty body for paired presets.

## Checks

- `npm run check` passed.
- `npm test -- test/package.test.ts` passed (13 tests).
- `npm test -- test/facets.test.ts test/package.test.ts` passed (25 tests) after use-case-note updates.
- `pi --approve --no-session --no-tools --mode json -p "Reply exactly: OK"` returned `OK`.

## Review / next slice

- User approved preset/skill association and use-case-note changes.
- Likely next task: assess facet compaction, removal, renaming, and merging.

## Notes

- `preset-skill-confirmation` governs launch behavior.
