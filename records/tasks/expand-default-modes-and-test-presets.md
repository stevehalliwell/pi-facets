---
id: 019fb247-2cee-7686-9883-a573981a2a07
name: expand-default-modes-and-test-presets
created_at: 2026-07-30T09:07:16.846Z
desc: ""
tags: []
status: done
priority: medium
depends_on: []
---

## Scope

### Desired outcome

Ship representative package examples across role, authority, style, presets, and prompt templates so intended facet composition is visible and testable.

### In scope

- Add roles `marketing-strategist`, `researcher`, and `delivery-lead`.
- Add styles `exploratory`, `explanatory`, and `structured`.
- Retain existing authority set; add no authority component.
- Add package presets:
  - `implementation-review`: `dev-peer` + `advisory` + `critical`.
  - `backlog-refinement`: `product-owner` + `recommend-and-proceed` + `concise`.
  - `messaging-strategy`: `marketing-strategist` + `recommend-and-proceed` + `explanatory`.
  - `research-exploration`: `researcher` + `advisory` + `exploratory`.
  - `delivery-planning`: `delivery-lead` + `decisive` + `structured`.
- Add prompt templates `explore-options` and `decision-brief` as package resources.
- Register package prompt resources in `package.json`.
- Extend preset discovery to support `modes/presets/` with project → package → global precedence.
- Add focused discovery, precedence, application, prompt-resource, and documentation checks.

### Out of scope

- New facet axes or changes to role, authority, or style semantics.
- Automatic mode inference or prompt-triggered facet mutation.
- Replacing skills with prompt templates.
- Broad prompt-template workflows or duplicated skill content.

### Existing behavior to preserve

- Existing mode component discovery, precedence, selection, persistence, and prompt injection.

### Acceptance

- All agreed role, style, preset, and prompt-template resources exist with valid frontmatter/content.
- Package presets are discovered with source `package`; project overrides package; package overrides global.
- Invalid package preset references produce diagnostics without silently applying the preset.
- Each agreed preset applies all three referenced components atomically.
- `/explore-options <topic>` and `/decision-brief <topic>` are discoverable prompt templates with argument expansion.
- Prompt templates do not change active facet state.
- README and facet-grid examples list shipped resources and boundaries.
- `npm run check`, focused tests, full tests, and `git diff --check` pass.

## Open questions

- None.

## Decisions

- Ship package examples, not test-only fixtures.
- Add package preset precedence project → package → global.
- Ship two short, non-mutating prompt templates.
- See `records/decisions/ship-package-mode-examples.md`.

## Plan

- Add agreed role and style Markdown components.
- Add package presets and package-preset discovery precedence.
- Add prompt templates and package manifest registration.
- Extend tests, README, and facet-grid examples.
- Run acceptance checks.

## Implemented so far

- Scope agreed; implementation complete.
- Added package role/style examples, presets, prompt templates, discovery precedence, tests, and docs.

## Checks

- `npm run check` — passed.
- `npm test` — passed: 15 tests.
- `npm test -- test/package.test.ts` — passed.
- `git diff --check` — passed.
- Attendant validation pending after task update.

## Review / next slice

- User approved implementation.
- Ready for review: yes; implementation complete and approved.
- No remaining slice.

## Notes

- Former task scope: `agreed`.

- Keep prompt templates short and non-duplicative; skills remain workflow source of truth.
