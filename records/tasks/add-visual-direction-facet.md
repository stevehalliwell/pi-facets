---
id: 019fc48c-f800-7ac5-adb1-85a9dc9a5238
name: add-visual-direction-facet
created_at: 2026-08-02T22:16:40.705Z
desc: "Add an evidence-led website art-direction role and visual-direction preset."
tags:
  - facets
  - design
  - presets
status: todo
scope: agreed
---

## Scope

### Desired outcome

- Pi can apply a visual-direction preset that evaluates website visual expression against evidence and develops alternatives before recommending an art direction.

### In scope

- Add an `art-director` role facet for website visual direction.
- Add a `visual-direction` preset using `art-director`, `advisory`, and `exploratory`.
- Ask for live and staging URLs, core marketing page paths, visual inspiration/references, positioning/audience material, and relevant competitors.
- Assess available current-site, audience/positioning, competitor, and user-preference evidence.
- Benchmark proven competitor patterns where they fit audience needs.
- Surface trade-offs when user preference conflicts with audience or positioning evidence; leave choice with user.
- Direct output toward an audit, multiple visual directions, recommendation, and implementation principles.

### Out of scope

- Logo, social, collateral, and full brand-system redesign.
- Browser implementation, accessibility, performance, and responsive delivery; retain under web implementation.
- Marketing positioning decisions; retain under marketing strategy.
- Executing visual-direction discovery itself.

### Existing behavior to preserve

- Role files remain single-axis.
- Presets reference components; they do not duplicate role behavior.
- Present alternatives and leave art-direction selection with user.

### Acceptance

- Role Markdown validates with required frontmatter and contains visual-direction behavior only.
- Preset resolves role, authority, and style components.
- Applied preset asks for live/staging URLs, core pages, inspiration, positioning/audience material, and competitors.
- Applied preset proceeds when evidence is missing, clearly stating resulting limits.
- Applied preset distinguishes observations from design hypotheses, surfaces preference-vs-evidence trade-offs, and recommends only after alternatives.
- Applied preset uses competitors as benchmarks for audience-fit patterns, not as assumed direction.
- `npm run check` and relevant tests pass.

## Open questions

- None.

## Decisions

- 2026-08-02: First scope is website art direction, not full brand identity.
- 2026-08-02: Use current-site, positioning/audience, competitor, and user-preference evidence.
- 2026-08-02: New direction should be chosen after discovery, not assumed to evolve or replace current identity.
- 2026-08-02: Discovery output is audit, 2–3 directions, recommendation, and implementation principles.
- 2026-08-02: Surface conflicts between visual preference and strategy evidence; user decides.
- 2026-08-02: Benchmark proven competitor patterns when they fit audience needs.
- 2026-08-02: Ask for live and staging sites plus inspiration and other evidence; proceed with missing inputs only after stating limits.

## Plan

- Add art-director role and visual-direction preset Markdown.
- Add or update focused tests if component discovery/validation coverage needs it.
- Run project checks.

## Implemented so far

- Task record created; no implementation changes.

## Checks

- `attendant validate --no-correct`: passed before record creation.

## Review / next slice

- Ready for review: no; implementation has not started.
- Likely next slice/task: run website art-direction discovery.

## Notes

- Do not treat subjective taste as evidence or prematurely choose a direction.
