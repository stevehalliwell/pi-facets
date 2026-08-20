---
id: 019fbbff-7a31-7a66-9e5d-80325a991895
name: add-threejs-performance-workflow
created_at: 2026-08-01T06:25:10.193Z
desc: "Add performance-aware Three.js visual iteration workflow."
tags: []
status: done
priority: medium
depends_on:
  - tasks/add-okf-research-artifact-capture
---

## Scope

### Desired outcome

- `threejs-performance` skill protects full performance budget while supporting fast, reversible visual iteration.

### In scope

- Add `threejs-performance` skill for explicit Three.js/render performance work; generic implementation retains slices, cleanup, and reporting.
- Before assessing/optimizing absent project target, ask full budget: target device/browser/GPU class, FPS, resolution/device pixel ratio, representative scene/interaction complexity, memory, and network/load constraints.
- Cover frame time, memory, draw calls, shader/texture cost, render passes/post-processing, resize/pixel ratio, animation frequency, and scene population.
- Flag before change only when request likely materially increases per-frame work or memory.
- Propose focused measurement or lower-cost approach before profiling or altering requested visual direction.
- If profiler/benchmark tooling is absent, propose smallest setup and wait before dependencies/project changes.
- Keep visual experiments small and reversible; do not substitute generic test suites for render evidence.
- Verify uncertain Three.js/browser guidance with authoritative sources and save OKF artifacts through dependency.

### Out of scope

- Generic broad test-suite execution, profiler/benchmark implementation, automatic delivery gate, or profiler setup without approval.
- New Three.js role/preset unless later evidence shows generic dev-peer insufficient.

### Existing behavior to preserve

- Agent waits for approval before profiling or changing requested visual direction due to performance concern.
- Live visual iteration remains proportionate and user-directed.
- Explicit performance concern, not all frontend work, triggers this workflow.

### Acceptance

- `threejs-performance` skill trigger distinguishes explicit render/performance work from generic frontend changes.
- Missing performance target asks full agreed budget before assessment/optimization.
- Material-risk examples identify concrete render-cost reason and propose focused evidence/lower-cost option before action.
- Missing profiler/benchmark produces setup proposal, not installation/change.
- Routine visual changes do not trigger generic tests or performance chatter.
- Uncertain technical claim follows authoritative research and OKF capture contract.
- Package/docs and focused trigger/workflow checks pass.

## Open questions

- None.

## Decisions

- Skill name is `threejs-performance`.
- Performance assessment requires full budget, not unstated baseline.
- Material risk flags/proposes before measurement or visual trade-off.
- Missing tooling proposes setup and waits for approval.

## Plan

1. Refine/implement dependent OKF artifact task.
2. Review generic implementation skill and project skill conventions.
3. Draft threejs-performance trigger, budget, risk, and measurement sections.
4. Add package/docs and focused workflow checks.
5. Run full checks and manual render-risk scenarios.

## Implemented so far

- Added `threejs-performance` skill with full-budget, render-cost, material-risk, reversible-iteration, tooling, and OKF guidance.

## Checks

- Skill frontmatter validates; full suite (17 tests), typecheck, and diff check pass.

## Review / next slice

- User approved Three.js performance workflow on 2026-08-02; task complete.

## Notes

- Former task scope: `agreed`.

- Performance-aware workflow remains distinct from persistent facet pending initiative/role evidence.
