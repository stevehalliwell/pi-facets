---
id: 019fbbff-7a27-793b-b4d1-655a7c85e7a6
name: add-web-platform-specialist-facet
created_at: 2026-08-01T06:25:10.183Z
desc: "Add web-platform specialist role and optional preset for standards-aware web work."
tags: []
status: done
priority: medium
---

## Scope

### Desired outcome

- User can select web-platform specialist stance through a reusable `web-implementation` preset or individual role selection.

### In scope

- Add headingless, list-first `web-platform-specialist` role component.
- Role covers current native standards, semantics/accessibility, responsive behavior, compatibility, performance, SEO/GEO, browser capability, authoritative-source verification, and material trade-off alternatives.
- Add `web-implementation` preset: `web-platform-specialist + recommend-and-proceed + concise`.
- Update package-resource test, facet grid, and relevant README/resource docs.
- Document role-selection examples: web implementation/review uses web-platform specialist; copy/messaging uses marketing strategist first.

### Out of scope

- Web implementation workflow, delivery audit procedure, Lighthouse target, browser matrix, or research-artifact capture.
- Automatic facet switching/routing, `initiative` axis, component metadata, or authority/style component changes.

### Existing behavior to preserve

- Marketing strategist remains first suggestion for website messaging/copy requests, including SEO/GEO concerns.
- Project/global component shadowing, explicit user overrides, and existing component discovery remain unchanged.
- Role stays single-axis; workflow and authority rules remain elsewhere.

### Acceptance

- Valid headingless `web-platform-specialist` role loads through discovery and `/facets`.
- `web-implementation` resolves agreed three-axis composition.
- Role wording distinguishes web-platform expertise from generic dev-peer and marketing-strategist boundaries.
- Facet grid and package-resource coverage include new role/preset.
- Focused discovery/preset tests pass; project/global shadowing remains intact.

## Open questions

- None.

## Decisions

- Web-platform specialist role is for implementation/review; marketing strategist remains first for messaging/copy.
- Routine standards-compliant web details may proceed from high-level direction.
- Material quality or compatibility conflict requires flag-and-propose behavior.
- Preset composition: web-platform-specialist, recommend-and-proceed, concise.

## Plan

1. Add role and preset Markdown using compact source convention.
2. Update facet grid and package resource expectations.
3. Add focused composition/discovery coverage.
4. Run full checks.

## Implemented so far

- Added headingless, list-first `web-platform-specialist` role covering standards, accessibility, responsive behavior, compatibility, performance, SEO/GEO, verification, and material trade-offs.
- Added `web-implementation` preset: `web-platform-specialist + recommend-and-proceed + concise`.
- Updated facet grid, package resources, and focused composition coverage.

## Checks

- Focused: `npm test -- --run test/package.test.ts` — 7 tests pass.
- Full: `npm test` — 15 tests pass; `npm run check` and `git diff --check` pass.

## Review / next slice

- User approved web-platform specialist role and preset on 2026-08-02; task complete.
- Next candidate: `add-web-implementation-delivery-workflow`.

## Notes

- Former task scope: `agreed`.

- Delivery/audit behavior belongs in `add-web-implementation-delivery-workflow`.
