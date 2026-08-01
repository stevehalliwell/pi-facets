---
id: 019fbc08-6f5e-7b75-b749-476a0f7651b6
name: add-generic-implementation-workflow-preset
created_at: 2026-08-01T06:34:57.246Z
desc: "Add senior-dev-peer implementation workflow and matching preset."
tags: []
status: todo
scope: agreed
---

## Scope

### Desired outcome

- Pi supports repeatable implementation partnership distinct from pre-code technical review.

### In scope

- Hard-rename `implementation-review` preset to `technical-review`; remove old name with no alias.
- Add `implementation-partner` preset: `dev-peer`, `recommend-and-proceed`, `concise`.
- Add on-demand `implementation` skill.
- Skill traces enough to avoid wrong edit, then acts immediately from agreed scope.
- If task lacks slices, write proposed slices to task plan, state first slice, and wait for approval before edits.
- If slices exist, implement one reviewable slice per turn; report completed slice, non-obvious inspection path, and next slice.
- Recommend smallest credible validation; do not run broad suites by habit.
- For removal/replacement, identify cleanup candidates and ask cleanup scope before broad deletion.
- Update preset references, docs, focused tests, and hard-rename expectations.

### Out of scope

- Web-specific or Three.js-specific quality rules.
- Automatic facet switching, `initiative` axis, tool gating, or model switching.
- Rewriting task lifecycle.

### Existing behavior to preserve

- Explicit user approval remains required for material behavior, scope, security, data, public API, or compatibility decisions.
- Existing missing-reference warning handles stale persisted preset references.
- Facets remain compact per-turn context; implementation procedure remains skill content.

### Acceptance

- `technical-review` remains a distinct pre-code review preset; `implementation-review` no longer resolves.
- `implementation-partner` resolves to agreed three-axis composition.
- `implementation` skill defines agreed execution, slicing, validation, cleanup, and reporting behavior.
- Missing-slice scenario writes/states plan and waits for approval; agreed-slice scenario progresses one slice per turn.
- Low-risk visual tweak recommends proportionate validation rather than broad tests.
- Removal/replacement behavior surfaces cleanup scope before broad deletion.
- Preset discovery/composition, hard-rename behavior, and skill presence have focused checks.

## Open questions

- None.

## Decisions

- Use distinct names: `technical-review` for pre-code judgment; `implementation-partner` for execution collaboration.
- Hard rename `implementation-review` with no alias.
- Use `implementation` as skill name.
- Implementation-partner composition is `dev-peer + recommend-and-proceed + concise`.
- Task without slices requires plan update and approval before first edit.

## Plan

1. Locate preset references, tests, and current skill conventions.
2. Rename preset and update references under hard-rename policy.
3. Add implementation-partner preset and implementation skill.
4. Add focused checks for preset resolution, old-name failure, and skill discovery.
5. Run project checks and manual workflow scenarios.

## Implemented so far

- Task refinement only; no implementation changes.

## Checks

- Refinement confirmed by user on 2026-08-01.

## Review / next slice

- Ready for review: no; ready to select for implementation.
- Likely next slice/task: mark `doing`, then inspect affected presets, skill layout, docs, and tests.

## Notes

- This task addresses recurring scope/validation friction across domains.
