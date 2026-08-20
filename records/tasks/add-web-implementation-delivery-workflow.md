---
id: 019fbbff-7a43-767a-878c-aa60c734228e
name: add-web-implementation-delivery-workflow
created_at: 2026-08-01T06:25:10.212Z
desc: "Add standards-aware web implementation and pre-delivery quality workflow."
tags: []
status: done
priority: medium
depends_on:
  - tasks/add-okf-research-artifact-capture
---

## Scope

### Desired outcome

- `web-implementation` skill supports standards-aware web implementation with explicit user-triggered delivery review and remediation.

### In scope

- Add `web-implementation` skill for web code/build/delivery requests; keep website messaging and technical review separate.
- Layer web constraints on generic implementation workflow without duplicating slicing, validation, or cleanup procedure.
- During build, use major desktop/mobile/tablet browser support within last two years.
- Cover accessibility, SEO/GEO, responsiveness, platform capability, and performance.
- Collect routine quality concerns during build; flag direct material conflicts immediately with compliant alternatives.
- Only explicit delivery language starts delivery review.
- Delivery review identifies changed deliverable pages and targets 100 in all applicable Lighthouse categories: Performance, Accessibility, Best Practices, SEO.
- Review relevant browser, accessibility, and discoverability requirements; fix all remediable issues within task outcome.
- Pause on behavior, visual, scope, external-dependency, or unsatisfiable-target trade-off.
- Verify uncertain modern web guidance with authoritative current sources and save OKF v0.2 artifacts.
- If OKF bundle root is unknown, ask user for it; supplied root initializes/saves artifacts through dependent OKF workflow.
- If audit tooling is absent, propose smallest setup and wait before installation/project change.

### Out of scope

- Broad suites/audits during routine implementation slices.
- Automatic facet switching, persistent skill status, project-specific browser matrix, or audit-tool installation without approval.
- Research artifact schema/location design; owned by dependent OKF task.

### Existing behavior to preserve

- Live low-risk visual iteration uses proportionate validation.
- User decides material product and quality trade-offs.
- Website messaging remains separate; marketing strategist stays first for copy.
- Generic implementation skill owns task slices, validation proportionality, and cleanup semantics.

### Acceptance

- Skill trigger distinguishes web implementation/delivery from messaging and technical review.
- Build phase names web constraints without routine audit interruption.
- Explicit delivery language, and only it, enters delivery review.
- Delivery review targets 100 for all applicable Lighthouse categories on changed deliverable pages.
- Workflow fixes remediable issues and pauses correctly on material blockers/trade-offs.
- Uncertain standards claim requires authoritative research and OKF artifact capture; unknown bundle root asks user before saving.
- Missing audit tooling produces setup proposal, not installation/change.
- Package resource/docs and focused trigger/workflow checks pass.

## Open questions

- None.

## Decisions

- Skill name is `web-implementation`, paired with same-named preset.
- Delivery review starts only from explicit delivery words.
- Lighthouse target is 100 across all applicable categories.
- Unknown OKF bundle root asks user; supplied root initializes/saves through dependent workflow. Missing audit tooling proposes setup.

## Plan

1. Refine dependent OKF configuration/capture task.
2. Review generic implementation skill and project skill conventions.
3. Draft web-implementation trigger, build, and delivery sections.
4. Add package/docs and focused workflow checks.
5. Run full checks and manual delivery scenario.

## Implemented so far

- Added model-invocable `web-implementation` skill layered on generic implementation workflow.
- Build covers browser support, accessibility, responsiveness, SEO/GEO, performance, material conflicts, and OKF-backed uncertain guidance.
- Delivery review triggers only from explicit delivery language; requires 100 in every applicable Lighthouse category, safe audit-tool setup, remediation, and explicit trade-off pauses.
- Updated README and package workflow coverage.

## Checks

- Skill frontmatter validator passes.
- Focused: `npm test -- --run test/package.test.ts` — 9 tests pass.
- Full: `npm test` — 17 tests pass; `npm run check` and `git diff --check` pass.

## Review / next slice

- User approved web implementation delivery workflow on 2026-08-02; task complete.
- Next candidate: `add-threejs-performance-workflow`.

## Notes

- Former task scope: `agreed`.

- 100 Lighthouse is explicit delivery target, not permission for indiscriminate audit runs.
