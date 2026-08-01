---
id: 019fbbff-7a31-7a66-9e5d-80325a991895
name: add-threejs-performance-workflow
created_at: 2026-08-01T06:25:10.193Z
desc: "Add performance-aware Three.js visual iteration workflow."
tags: []
status: todo
scope: draft
---

## Scope

### Desired outcome

- Three.js work protects performance while supporting fast, live visual iteration.

### In scope

- Cover frame time, memory, draw calls, shader/texture cost, resize behavior, and device constraints.
- Flag visual requests likely to add material render cost.
- Propose focused measurement or lower-cost approach before profiling or changing visual direction.
- Ask for performance target when project context lacks one.
- Keep visual experiments small and reversible.

### Out of scope

- Generic broad test-suite execution.
- Implementing a profiler or benchmark framework.
- New Three.js role unless evidence shows generic dev-peer insufficient.

### Existing behavior to preserve

- Agent waits for approval before profiling or changing requested visual direction due to performance concern.
- Live visual iteration remains proportionate and user-directed.

### Acceptance

- Skill trigger distinguishes Three.js/render work from generic frontend changes.
- Workflow names concrete render-cost concerns and performance-target question.
- It recommends focused evidence rather than generic tests.
- Tests/docs cover core rules.

## Open questions

- Which existing project/profile tooling should workflow use when available?
- How should it distinguish material render risk from routine visual change?

## Decisions

- Agent flags and proposes before performance measurement or visual trade-off.
- Missing performance target requires question rather than unstated assumption.

## Plan

- Inspect available Three.js/project workflow patterns.
- Draft skill and source/reference boundary.
- Add focused tests/docs after agreement.

## Implemented so far

- None.

## Checks

- Not started.

## Review / next slice

- Ready for review: no; scope remains draft.
- Likely next slice/task: refine material-risk threshold and tooling integration.

## Notes

- Performance-aware workflow is distinct from a persistent facet unless evidence later supports it.
