---
id: 019fbbff-7a43-767a-878c-aa60c734228e
name: add-web-implementation-delivery-workflow
created_at: 2026-08-01T06:25:10.212Z
desc: "Add standards-aware web implementation and pre-delivery quality workflow."
tags: []
status: todo
scope: draft
---

## Scope

### Desired outcome

- Web implementation workflow supports rapid iteration while enforcing a pre-delivery quality review and remediation pass.

### In scope

- Define baseline: target 100 Lighthouse scores and major desktop/mobile/tablet browsers released within last two years.
- Cover accessibility, SEO/GEO, responsiveness, platform capability, and performance.
- Collect routine concerns during build; flag direct material conflicts immediately with alternatives.
- Before delivery, propose consolidated Lighthouse, browser, accessibility, and discoverability audit.
- Remediate issues within task outcome; pause on behavior, visual, scope, external-dependency, or unsatisfiable-target trade-offs.
- Verify uncertain modern web guidance using authoritative current sources and save OKF artifacts.

### Out of scope

- Running broad test suites after every visual change.
- Automatic facet switching or persistent skill status.
- Defining project-specific browser matrix beyond baseline.

### Existing behavior to preserve

- Live low-risk visual iteration uses proportionate validation.
- User decides material product and quality trade-offs.
- Website messaging workflow remains separate.

### Acceptance

- Skill clearly differentiates build iteration, material conflict, and delivery-review phases.
- It requires browser/quality review before delivery, not after every change.
- It directs source verification and OKF capture for uncertain platform claims.
- Tests/docs cover trigger boundary and key workflow rules.

## Open questions

- What exactly constitutes a delivery/review boundary in Pi conversation and task lifecycle?
- Which authoritative-source and OKF conventions should be referenced?

## Decisions

- Routine quality observations wait for review pass.
- Direct material quality conflict is flagged and proposed immediately.
- Pre-delivery review fixes all remediable issues within task outcome.

## Plan

- Inspect existing skill patterns and project OKF conventions.
- Draft workflow and trigger description.
- Add tests/docs after agreement.

## Implemented so far

- None.

## Checks

- Not started.

## Review / next slice

- Ready for review: no; scope remains draft.
- Likely next slice/task: refine delivery-boundary and source-storage contracts.

## Notes

- 100 Lighthouse is delivery target, not permission for indiscriminate audit runs.
