---
id: 019fba1e-cbda-7c9e-9c60-bf24b95565c0
name: compact-facet-prompt-injection-layout
created_at: 2026-07-31T21:40:08.282Z
desc: "Make injected active-facet prompt context more compact and consistently ordered Markdown."
tags: []
status: todo
scope: draft
---

## Scope

### Desired outcome

- Active-facet instructions inject in compact, consistently ordered Markdown while preserving their meaning.

### In scope

- Review current composed active-facet injection layout.
- Define compact representation and Markdown ordering.
- Update prompt composition and focused tests after scope agreement.

### Out of scope

- Changing facet semantics, component content, selection behavior, skills, or automatic routing.

### Existing behavior to preserve

- All selected role, authority, and style instructions remain present.
- Existing session selection, persistence, and explicit `/facets` controls remain unchanged.

### Acceptance

- [TBD: exact compact layout and ordering]
- Composed prompt contains each active component exactly once in agreed order.
- Focused tests cover rendered prompt shape.

## Open questions

- What exact headings, hierarchy, and axis order should the injected Markdown use?
- Is compactness measured by token count, visual scanability, or both?

## Decisions

- Capture only. User requested future consideration; implementation not authorized.

## Plan

- Refine target prompt shape from real injection examples.
- Locate composition code and tests.
- Implement agreed layout; run focused and full checks.

## Implemented so far

- None.

## Checks

- Attendant validation passed before capture.

## Review / next slice

- Ready for review: no; draft capture only.
- Likely next slice/task: refine desired injection layout when prioritized.

## Notes

- Keep component Markdown source-of-truth; layout change must not duplicate or omit instructions.
