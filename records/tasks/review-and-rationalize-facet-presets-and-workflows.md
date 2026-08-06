---
id: 019fd3a8-84b1-730f-ab2e-633fffd40bce
name: review-and-rationalize-facet-presets-and-workflows
created_at: 2026-08-05T20:40:50.000Z
desc: "Review existing facet presets; remove unused ones, correct missing or incorrect skill associations, and identify workflow gaps needing presets or skills."
tags:
  - facets
  - presets
  - skills
  - workflow
status: done
scope: agreed
---

## Scope

### Desired outcome

- Produce an evidence-backed, report-only audit of every existing facet preset's user-facing alignment, purpose, workflow association, overlap, and gaps; recommend separate follow-up work for any approved changes.

### In scope

- Inventory all existing facet presets, their composed facets, their use-case descriptions, and their skill associations.
- Assess whether each preset presents a coherent, non-misleading collaboration stance for its stated purpose.
- Assess association validity, overlap/redundancy, and workflow gaps.
- Give explicit keep, revise, remove, or investigate recommendations for `five-whys`, `delivery-planning`, and `ghostwriter`.
- Identify whether each gap calls for a new preset, a new skill, documentation, or no action.
- Capture proposed changes as separately reviewable follow-up tasks; do not make resource changes in this task.

### Out of scope

- Editing or removing presets; changing associations; adding facets, presets, or skills; modifying extension behavior or tests.
- Adding usage telemetry or treating missing telemetry as evidence that a preset is unused.

### Existing behavior to preserve

- Explicit facet overrides and existing preset/skill launch behavior unless a later agreed change says otherwise.

### Acceptance

- A report inventories all current presets and records a keep, revise, remove, or investigate recommendation with rationale for each.
- The report evaluates user-facing alignment, stated purpose, skill association, overlap/redundancy, and workflow coverage.
- `five-whys`, `delivery-planning`, and `ghostwriter` receive explicit recommendations that incorporate maintainer usage and preference.
- Each workflow gap is classified as a new preset, new skill, documentation, or no action.
- No facet, preset, skill, extension, or test file changes.

## Open questions

- None. The audit may surface follow-up decisions, but it does not authorize changes.

## Decisions

- 2026-08-05: “Unused” is determined by documented product intent, user-facing alignment, and maintainer usage/preference—not absence of telemetry.
- 2026-08-05: This task is report-only; changes require separately agreed follow-up tasks.
- 2026-08-06: Maintainer preference: remove the project `five-whys` preset; retain the workflow as a Pi-global skill rather than shipping it with this project.
- 2026-08-06: Maintainer preference: remove the unassociated project `delivery-planning` preset. There is no associated project skill to remove.
- 2026-08-06: Maintainer preference: investigate removal of `ghostwriter`; do not assume it is retained solely from its documented distinction from editorial review.

## Plan

1. Inventory preset composition, descriptions, and skill associations.
2. Compare each preset against resource-boundary rules and intended user-facing alignment.
3. Assess overlap, candidates for removal, association correctness, and workflow gaps.
4. Publish an evidence-backed report with recommendations and separately bounded follow-up tasks.

## Implemented so far

- Inventory and final report complete: 14 current presets, including the user-approved uncommitted `tweaking` preset. Twelve declare a skill; only `delivery-planning` and `research-exploration` do not.
- Every preset composes one existing role, authority, and style. All declared skills resolve locally. Preset bodies are short use-case notes and do not duplicate workflow or association metadata.
- Captured four separate follow-ups: `remove-project-five-whys-preset`, `remove-delivery-planning-preset`, `investigate-ghostwriter-preset-removal`, and `align-preset-copy-with-skill-boundaries`.

## Audit report

| Preset | Association and fit | Recommendation |
| --- | --- | --- |
| `backlog-capture` | `backlog-capture`; rapid faithful capture before later refinement. | Keep. Complements, rather than duplicates, refinement. |
| `backlog-refinement` | `backlog-refinement`; turns an existing idea into bounded work. | Keep. Sequential with capture. |
| `delivery-planning` | No skill; maintainer does not want it retained. | Remove. Follow-up: `remove-delivery-planning-preset`. |
| `editorial-review` | `editorial-review`; supplied-draft revision is coherent. Its copy overstates factual-source checking beyond supplied-source handling. | Revise copy after scope decision. Follow-up: `align-preset-copy-with-skill-boundaries`. |
| `five-whys` | `five-whys`; evidence-aware, non-blaming diagnosis is coherent, but maintainer wants it outside this project. | Remove project preset and retain workflow globally. Follow-up: `remove-project-five-whys-preset`. |
| `ghostwriter` | `ghostwriting`; original source-bounded drafting is distinct from revision, but maintainer requested a removal review. | Investigate. Follow-up: `investigate-ghostwriter-preset-removal`. |
| `implementation-partner` | `implementation`; agreed work and focused validation align. | Keep. Follows technical review where needed. |
| `messaging-strategy` | `website-messaging`; preset's broad customer-facing wording exceeds website-specific skill scope. | Revise copy or agree a skill-scope change. Follow-up: `align-preset-copy-with-skill-boundaries`. |
| `release-readiness` | `release-readiness`; release documentation reconciliation aligns. | Keep. |
| `research-exploration` | No skill; facet composition supports exploratory evidence gathering without a repeatable workflow requirement. | Keep; no action. |
| `technical-review` | `technical-review`; pre-implementation feasibility and risk review align. | Keep. Precedes implementation, not duplicate. |
| `tweaking` | `iteration`; tight, low-risk adjustment loop aligns. | Keep. Complements slice-based implementation. |
| `visual-direction` | `website-art-direction`; evidence-led website art direction aligns. | Keep. |
| `web-implementation` | `web-implementation`; standards-aware browser work aligns. | Keep. Layers on implementation when web constraints apply. |

### Coverage and overlap

- No hard resource-boundary violations or redundant workflows found. `backlog-capture` then `backlog-refinement`, `technical-review` then `implementation`, and `implementation` with `web-implementation` are sequential or layered.
- No new project skill is justified. The two wording boundaries need copy/scope refinement; the two removals are maintainer-directed; ghostwriter needs a decision.

## Checks

- Current filesystem inventory matches `docs/facet-grid.md`: 14 preset files and 14 listed presets, including `tweaking`.
- Verified each declared association against local skill discovery; 12 resolve.
- No runtime or package check needed: this slice changes only Attendant task records. Earlier baseline check: `npm test -- test/package.test.ts` passed (14 tests).

## Review / next slice

- Ready for review: complete; maintainer approved the audit on 2026-08-06.
- Next: select an agreed removal task; draft investigations require refinement first.

## Notes

- Related completed work: `records/tasks/associate-matching-preset-skills.md` and `records/tasks/align-facet-components-with-resource-boundaries.md`.
- Maintainer proposed new preset candidates remain separately tracked: `records/tasks/add-note-taker-preset.md`, `records/tasks/add-brainstorming-preset.md`, and `records/tasks/add-tweaking-preset.md`.
