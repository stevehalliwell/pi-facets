---
id: 019fbc08-6f80-7b9e-8a4a-b12fc7204bcb
name: add-website-messaging-intent-branches
created_at: 2026-08-01T06:34:57.280Z
desc: "Add intent-specific branches to website messaging workflow."
tags: []
status: todo
scope: agreed
---

## Scope

### Desired outcome

- Website-messaging workflow starts with response shape matching explicit review or suggested-copy-tweak intent.

### In scope

- Explicit review/audit/assess request → inventory and diagnose audience/page goal, message gaps, proof, hierarchy, claim gaps, and decisions; wait for direction without unrequested rewrite.
- Supplied wording plus tweak/rewrite/alternative request → present 2–3 viable directions with candidate wording, trade-offs, and recommendation; wait for choice before final copy.
- Ambiguous request → ask whether user wants diagnosis or copy direction before analysis.
- Missing audience/proof → proceed with clearly labelled assumptions.
- Preserve marketing strategist as first role for copy/messaging requests, including SEO/GEO relevance.
- Update workflow trigger, branch steps, output shapes, examples, and focused checks.

### Out of scope

- Web-platform implementation/delivery workflow, SEO/GEO technical audit, research-artifact capture, or automatic facet switching.
- Inventing claims, positioning, evidence, or final copy without user direction.

### Existing behavior to preserve

- Website messaging stays separate from HTML, CSS, CMS, analytics, and deployment.
- User/legal/product approval remains required for claims.
- Existing messaging-strategy preset composition remains unchanged.

### Acceptance

- Skill trigger/output clearly branches review, suggested tweak, and ambiguous intent.
- Review output stops after diagnosis and high-impact decisions/next options.
- Suggested-tweak output contains 2–3 candidate directions with wording/trade-offs and waits for selection before final copy.
- Ambiguous input asks intent before analysis.
- Assumptions are visible where inputs are absent; claim safeguards remain intact.
- Focused examples/tests cover all branches.

## Open questions

- None.

## Decisions

- Website review begins with diagnosis and waits for direction.
- Suggested tweaks begin with option comparison plus candidate wording.
- Ambiguous request asks intent rather than guessing branch.

## Plan

1. Revise website-messaging trigger and workflow branch structure.
2. Define branch-specific output shapes/examples.
3. Add focused skill/documentation checks.
4. Run full checks.

## Implemented so far

- Task refinement only; no implementation changes.

## Checks

- Refinement confirmed by user on 2026-08-01.

## Review / next slice

- Ready for review: no; ready to select for implementation.
- Likely next slice/task: mark `doing`, then edit skill branch triggers and outputs.

## Notes

- Keep task workflow-specific; role/preset changes belong elsewhere.
