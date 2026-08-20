---
id: 019fd435-9d6b-78db-91f8-d75f8084d99e
name: investigate-ghostwriter-preset-removal
created_at: 2026-08-05T23:15:11.339Z
desc: "Decide whether the project ghostwriter preset and workflow should remain shipped."
tags:
  - presets
  - skills
  - workflow
status: done
priority: medium
depends_on: null
---

## Scope

### Desired outcome

- Produce an evidence-backed retain-or-remove recommendation for the project `ghostwriter` preset and `ghostwriting` skill; any resource change requires a later explicit decision.

### In scope

- Compare source-bounded original drafting and substantial rewrites with `editorial-review` supplied-draft revision.
- Assess user-facing distinction, documented product intent, maintainer preference, resource footprint, and removal consequences.
- Recommend retain or remove; if removal is recommended, define a bounded follow-up cleanup task.

### Out of scope

- Removing or changing resources before a decision.

### Existing behavior to preserve

- `editorial-review` remains for supplied-draft revision; `ghostwriter` remains available until a removal decision is agreed.

### Acceptance

- A report separates inspected evidence from recommendation and states retain or remove with rationale.
- The report names the user-facing trigger and workflow boundary that distinguishes ghostwriting from editorial review, or explains why it is insufficient.
- Any removal consequence is bounded across preset, skill, role, style, documentation, and tests; no resource changes occur.
- The maintainer explicitly decides whether to retain or remove before any cleanup starts.

## Open questions

- Should the project retain original source-bounded long-form drafting as a distinct workflow, or remove it despite its separate revision boundary?

## Decisions

- 2026-08-06: Maintainer requested investigation; do not assume retention solely from the documented distinction.
- 2026-08-06: Maintainer chose removal of project resources only; do not create a Pi-global replacement.

## Plan

1. Inspect ghostwriter and editorial-review preset, facet, style, and skill boundaries.
2. Publish a report-only retain-or-remove recommendation with removal impact.
3. Obtain maintainer decision; capture any cleanup as separate agreed work.

## Implemented so far

- Audit found no duplicate workflow: ghostwriting creates or substantially rewrites source-bounded prose, while editorial review revises supplied drafts.
- Refinement identified the decision criteria and report-only boundary; no resource files changed.

### Report

- **Evidence:** `ghostwriting` serves original source-bounded drafts and substantial rewrites; `editorial-review` serves supplied-draft revision. The dedicated preset, role, style, and skill otherwise add four project resources plus documentation and test coverage.
- **Recommendation:** remove the project ghostwriter workflow. Its distinct boundary is real, but maintainer preference is to remove it for now rather than retain the dedicated resource footprint.
- **Decision:** maintainer chose project-only removal with no Pi-global replacement. Cleanup is separately tracked by `remove-project-ghostwriter-resources`.

## Checks

- Inspected the two presets, paired skills, ghostwriter role, and prose-craft style.
- No runtime check needed for report-only work; evidence is the inspected project resources and recorded maintainer decision.

## Review / next slice

- Ready for review: complete; maintainer approved the report and project-only removal on 2026-08-06.
- Likely next slice/task: implement `remove-project-ghostwriter-resources`.

## Notes

- Former task scope: `agreed`.

- Removal would affect preset, skill, role, style, docs, and tests; do not begin cleanup without agreement.
