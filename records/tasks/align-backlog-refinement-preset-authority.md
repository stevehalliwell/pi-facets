---
id: 019fbc08-6f6f-7a08-9c26-f64aa4225992
name: align-backlog-refinement-preset-authority
created_at: 2026-08-01T06:34:57.263Z
desc: "Align backlog-refinement preset authority with discussion-only workflow."
tags: []
status: todo
scope: draft
---

## Scope

### Desired outcome

- Backlog-refinement preset consistently supports discussion, scoping, prioritization, and task shaping without implementation assumptions.

### In scope

- Review current `recommend-and-proceed` authority against desired advisory behavior.
- Update preset component references and documentation if agreement confirms mismatch.
- Confirm role/style remain appropriate.

### Out of scope

- Rewriting backlog-refinement skill procedure.
- Changing task lifecycle or implementation authorization.
- Adding automatic routing.

### Existing behavior to preserve

- Backlog refinement does not modify implementation files.
- Recommendations do not authorize product or implementation decisions.

### Acceptance

- Selected authority matches agreed backlog discussion behavior.
- Preset and skill documentation do not imply implementation authorization.
- Focused preset/discovery tests pass.

## Open questions

- Is `advisory` sufficient, or should authority components be refined first?

## Decisions

- Discovery preference: product-owner, advisory, exploratory.

## Plan

- Compare current preset and authority component wording.
- Make smallest agreed reference/content update.
- Run focused checks.

## Implemented so far

- None.

## Checks

- Not started.

## Review / next slice

- Ready for review: no; scope remains draft.
- Likely next slice/task: confirm authority component selection.

## Notes

- Small configuration task; do not broaden into generic workflow redesign.
