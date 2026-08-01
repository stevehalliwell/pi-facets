---
id: 019fbc08-6f6f-7a08-9c26-f64aa4225992
name: align-backlog-refinement-preset-authority
created_at: 2026-08-01T06:34:57.263Z
desc: "Align backlog-refinement preset authority with discussion-only workflow."
tags: []
status: done
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

- Updated `backlog-refinement` to `product-owner + advisory + exploratory`.
- Updated facet grid and added narrow shipped-preset composition assertion.

## Checks

- Focused: `npm test -- --run test/package.test.ts` — 6 tests pass.
- Full: `npm test` — 11 tests pass; `npm run check` and `git diff --check` pass.

## Review / next slice

- User approved backlog-refinement preset alignment on 2026-08-02; task complete.
- Next candidate: `detect-facet-task-mismatch`.

## Notes

- Small configuration task; do not broaden into generic workflow redesign.
