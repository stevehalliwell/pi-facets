---
id: 019fd3d2-ebf8-702d-989b-f097da6fddc0
name: add-tweaking-preset
created_at: 2026-08-05T21:26:51.076Z
desc: "Add a tweaking facet preset."
tags:
  - facets
  - presets
  - tweaking
status: done
scope: agreed
---

## Desired outcome

- Add a distinct tweaking preset for rapid, careful, low-risk visual and code-layout changes, using a project-local iteration workflow.

## Scope

### In scope

- Add an `iterative` style facet for concise delta-and-next-tweak responses.
- Add a `tweaking` preset: `dev-peer + recommend-and-proceed + iterative`, associated with local `iteration`.
- Copy the global iteration skill to `.pi/skills/iteration/SKILL.md` and adjust its workflow for direct small edits, no per-change test/lint churn except obvious-breakage checks, and an invitation for the next tweak.
- Add required resource coverage and facet-grid documentation.

### Out of scope

- Changing `implementation-partner`, extension preset-state behavior, or the general testing policy.
- Material, multi-area, or risky changes that should leave iteration and use normal implementation work.

### Existing behavior to preserve

- `implementation-partner` remains task-slice and focused-validation first.
- Iteration exits when the requested work is no longer minor or local.

## Acceptance

- Selecting `tweaking` presents a composition distinct from `implementation-partner` and offers the local iteration workflow.
- Iteration applies a sequence of small website-visual or code-layout changes without planning or testing every change, while escalating material risk.
- `implementation-partner` behavior remains unchanged.
- Package resource coverage and documentation reflect the added resources.

## Open questions

- None.

## Plan

1. Add the local iteration skill with the agreed tweak-loop boundary.
2. Add the iterative style and tweaking preset, associating the local skill.
3. Add package/resource coverage and facet-grid documentation; run focused validation.

## Implemented so far

- Task refined and approved on 2026-08-05.
- Slice 1: added project-local `.pi/skills/iteration/SKILL.md`, copied from the global workflow and revised for direct careful edits, no default per-tweak tests/linters, minimal questions, explicit next-tweak invitation, and escalation for material risk.
- Slice 2: added `.pi/facets/style/iterative.md` for concise delta-and-next-tweak communication, plus `.pi/facets/presets/tweaking.md` (`dev-peer + recommend-and-proceed + iterative`) associated with `iteration`.
- Slice 3: documented tweaking in `docs/facet-grid.md` and added package resource and composition/association coverage.

## Checks

- Parsed `.pi/skills/iteration/SKILL.md` with Pi `parseFrontmatter`; valid `iteration` name and description.
- `npm test -- test/facets.test.ts` passed (15 tests).
- `npm test -- test/facets.test.ts test/package.test.ts` passed (30 tests).
- `git diff --check` passed.

## Review / next slice

- User approved on 2026-08-05; task complete.
- Next: refine `records/tasks/review-implementation-partner-after-tweaking.md` before changing `implementation-partner`.

## Notes

- Captured from maintainer request during preset/workflow audit.
- Follow-up after this task reaches review: `records/tasks/review-implementation-partner-after-tweaking.md`.
