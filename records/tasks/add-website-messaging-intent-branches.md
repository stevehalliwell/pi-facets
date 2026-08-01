---
id: 019fbc08-6f80-7b9e-8a4a-b12fc7204bcb
name: add-website-messaging-intent-branches
created_at: 2026-08-01T06:34:57.280Z
desc: "Add intent-specific branches to website messaging workflow."
tags: []
status: todo
scope: draft
---

## Scope

### Desired outcome

- Website-messaging workflow starts with response shape matching request intent.

### In scope

- Website review → diagnosis first: audience, message gaps, proof, hierarchy, and decisions.
- Suggested copy tweaks → compare viable directions and trade-offs before final wording.
- Missing audience/proof → proceed with clearly labelled assumptions.
- Preserve marketing strategist as first role for copy/messaging requests, including SEO/GEO relevance.

### Out of scope

- Web-platform implementation/delivery workflow.
- Inventing claims, positioning, or evidence.
- Automatic facet switching.

### Existing behavior to preserve

- Website messaging stays separate from HTML, CSS, CMS, analytics, and deployment.
- User/legal/product approval remains required for claims.

### Acceptance

- Skill trigger/output clearly branches by review versus suggested-tweak intent.
- Assumptions are visible where inputs are absent.
- Examples/tests cover both branches and preserve claim safeguards.

## Open questions

- Should options comparison occur before or alongside candidate rewrite for suggested tweaks?
- What wording reliably distinguishes review from tweak intent?

## Decisions

- Website review begins with diagnosis.
- Suggested tweaks begin with option comparison.

## Plan

- Review current website-messaging skill output contract.
- Add intent branches and examples.
- Run focused skill/documentation checks.

## Implemented so far

- None.

## Checks

- Not started.

## Review / next slice

- Ready for review: no; scope remains draft.
- Likely next slice/task: refine trigger examples.

## Notes

- Keep task workflow-specific; role/preset changes belong elsewhere.
