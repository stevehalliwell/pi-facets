---
id: 019fd3d2-ebf8-705c-ad34-cb4b19f06360
name: add-brainstorming-preset
created_at: 2026-08-05T21:26:51.076Z
desc: "Add a brainstorming facet preset."
tags:
  - facets
  - presets
  - brainstorming
status: done
scope: agreed
---

## Desired outcome

- Add an exploratory, advisory brainstorming preset and a local skill that takes ideas through association, expansion, and contraction/refinement without making material decisions or implementing work.

## Scope

### In scope

- Add a `brainstorming` preset: `pragmatic-collaborator + advisory + exploratory`, associated with a local `brainstorming` skill.
- Add a brainstorming workflow with visible association, idea-expansion, and contraction/refinement phases.
- Gather goal, constraints, audience/context, and selection criteria only when they materially affect ideation.
- Return distinct idea groups, trade-offs, and user-owned next-step candidates.
- Add required resource coverage and facet-grid documentation.

### Out of scope

- Selecting a material direction, implementing work, or treating generated ideas as evidence.
- Replacing research, Six Thinking Hats, or another workflow when its narrower purpose fits.

### Existing behavior to preserve

- `research-exploration` remains evidence/investigation-first.
- `six-thinking-hats` remains deliberate, multi-perspective exploration rather than routine brainstorming.
- Material decisions remain user-owned.

## Acceptance

- Selecting `brainstorming` presents `pragmatic-collaborator + advisory + exploratory` and offers the local workflow.
- The workflow visibly separates association, expansion, and contraction/refinement.
- Output identifies ideas, trade-offs, and next-step candidates without selecting a material direction or implementing work.
- Package resource coverage and facet-grid documentation reflect the new resources.

## Open questions

- None.

## Plan

1. Add the local brainstorming skill with association, expansion, and contraction/refinement phases.
2. Add the brainstorming preset and associate the skill.
3. Add package/resource coverage and facet-grid documentation; run focused validation.

## Implemented so far

- Task refined and approved on 2026-08-05.
- Added `.pi/skills/brainstorming/SKILL.md` with explicit association, expansion, contraction/refinement, and user-owned exit phases.
- Added `.pi/facets/presets/brainstorming.md` with `pragmatic-collaborator + advisory + exploratory` and `brainstorming` association.
- Added facet-grid documentation and package resource/composition/association coverage.

## Checks

- Verified required preset frontmatter and associated resource references.
- `npm test -- test/package.test.ts` passed (16 tests).
- Skill-craft helper scripts are not present in this repository; no project-local frontmatter validator was available.

## Review / next slice

- Ready for review: complete; maintainer approved workflow boundaries and preset integration on 2026-08-06.
- Next slice: select another agreed task.

## Notes

- Captured from maintainer request during preset/workflow audit.
