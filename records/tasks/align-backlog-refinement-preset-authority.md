---
id: 019fbc08-6f6f-7a08-9c26-f64aa4225992
name: align-backlog-refinement-preset-authority
created_at: 2026-08-01T06:34:57.263Z
desc: "Align backlog-refinement preset authority with discussion-only workflow."
tags: []
status: todo
scope: agreed
---

## Scope

### Desired outcome

- Backlog-refinement preset consistently supports discussion, scoping, prioritization, and task shaping without implementation assumptions.

### In scope

- Change preset authority from `recommend-and-proceed` to `advisory`.
- Change preset style from `concise` to `exploratory`.
- Retain `product-owner` role.
- Update `docs/facet-grid.md` to match.
- Add focused composition assertion only if current package tests do not cover shipped preset contents.

### Out of scope

- Rewriting backlog-refinement skill procedure.
- Changing task lifecycle or implementation authorization.
- Component wording changes, preset rename, automatic routing, or facet-model changes.

### Existing behavior to preserve

- Backlog refinement does not modify implementation files.
- Recommendations do not authorize product or implementation decisions.
- Historical records remain historical; do not rewrite them to match current composition.

### Acceptance

- `/facets preset backlog-refinement` resolves `product-owner + advisory + exploratory`.
- `docs/facet-grid.md` matches preset composition.
- Focused package/preset checks pass.

## Open questions

- None.

## Decisions

- Backlog refinement uses product-owner, advisory, exploratory composition.
- This is a minimal preset/documentation correction; skill procedure remains unchanged.

## Plan

1. Update preset frontmatter.
2. Update facet grid.
3. Inspect existing package tests; add narrow composition assertion only if needed.
4. Run focused and full checks.

## Implemented so far

- Task refinement only; no implementation changes.

## Checks

- Refinement confirmed by user on 2026-08-01.

## Review / next slice

- Ready for review: no; ready to select for implementation.
- Likely next slice/task: mark `doing`, then update preset and grid.

## Notes

- Small configuration task; do not broaden into generic workflow redesign.
