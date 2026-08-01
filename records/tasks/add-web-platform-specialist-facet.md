---
id: 019fbbff-7a27-793b-b4d1-655a7c85e7a6
name: add-web-platform-specialist-facet
created_at: 2026-08-01T06:25:10.183Z
desc: "Add web-platform specialist role and optional preset for standards-aware web work."
tags: []
status: todo
scope: draft
---

## Scope

### Desired outcome

- User can select or receive a suggestion for a web-platform specialist stance during web implementation or quality review.

### In scope

- Add single-axis role component for current browser standards, accessibility, responsive behavior, compatibility, SEO/GEO, and performance.
- Add matching preset if existing authority/style components express agreed behavior.
- Define role-selection examples for web implementation/review versus website messaging.

### Out of scope

- Web implementation workflow or delivery audit procedure.
- Automatic facet switching.
- New `initiative` axis.

### Existing behavior to preserve

- Marketing strategist remains first suggestion for website messaging/copy requests, including SEO/GEO concerns.
- Project/global component shadowing and explicit user overrides remain unchanged.

### Acceptance

- Valid role Markdown loads through existing discovery and `/facets` controls.
- Role instructions distinguish platform expertise from generic dev-peer behavior.
- Web implementation/review can suggest this role; copy/messaging does not displace marketing strategist by topic alone.
- Focused discovery/preset tests pass.

## Open questions

- Is a preset needed now, and which existing style best fits it?
- Does role suggestion belong to mismatch detection task or skill routing guidance?

## Decisions

- For routine standards-compliant web details, agent may act confidently from high-level direction.
- Material quality or compatibility conflict requires flag-and-propose behavior.

## Plan

- Draft role component and candidate preset.
- Review against existing dev-peer and marketing-strategist boundaries.
- Add focused tests/docs after scope agreement.

## Implemented so far

- None.

## Checks

- Not started.

## Review / next slice

- Ready for review: no; scope remains draft.
- Likely next slice/task: decide preset composition and role-routing boundary.

## Notes

- Role provides perspective; delivery procedure belongs in separate workflow task.
