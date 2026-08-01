---
id: 019fbc08-6f5e-7b75-b749-476a0f7651b6
name: add-generic-implementation-workflow-preset
created_at: 2026-08-01T06:34:57.246Z
desc: "Add senior-dev-peer implementation workflow and matching preset."
tags: []
status: todo
scope: draft
---

## Scope

### Desired outcome

- Pi supports a repeatable implementation stance distinct from pre-implementation review.

### In scope

- Define senior-dev-peer implementation workflow/preset.
- Trace real paths, implement agreed scope, and flag material risks/assumptions.
- Recommend smallest credible validation; do not run broad suites by habit.
- Identify cleanup candidates for removals/replacements and ask cleanup scope.

### Out of scope

- Web-specific or Three.js-specific delivery rules.
- Automatic facet switching.
- New `initiative` axis.

### Existing behavior to preserve

- Explicit user approval remains required for material behavior, scope, security, data, or public API decisions.
- Existing implementation-review preset remains available unless replacement is agreed.

### Acceptance

- Workflow clearly distinguishes implementation from review/refinement.
- Preset composition reflects senior dev peer and appropriate authority/style.
- Low-risk visual tweak recommends proportionate validation rather than broad tests.
- Removal/replacement behavior surfaces cleanup scope before broad deletion.

## Open questions

- Should existing `implementation-review` be renamed, retained, or split from implementation preset?
- What generic validation rules work across codebases without duplicating domain skills?

## Decisions

- Preferred stance: senior development peer.

## Plan

- Compare current implementation-review preset and project instructions.
- Define workflow boundary and preset composition.
- Add focused tests/docs after scope agreement.

## Implemented so far

- None.

## Checks

- Not started.

## Review / next slice

- Ready for review: no; scope remains draft.
- Likely next slice/task: refine validation and cleanup thresholds.

## Notes

- This task addresses recurring scope/validation friction across domains.
