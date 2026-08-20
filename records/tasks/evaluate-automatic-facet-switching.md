---
id: 019fbc05-438f-7c73-a65e-26f1dce540e9
name: evaluate-automatic-facet-switching
created_at: 2026-08-01T06:31:29.423Z
desc: "Review whether Pi should ever automatically switch persistent facets."
tags: []
status: done
priority: medium
---

## Scope

### Desired outcome

- Decide whether automatic facet switching should remain prohibited, have constrained use cases, or be skipped permanently.

### In scope

- Review real mismatch/transition evidence, false-positive cost, persistence consequences, and override UX.
- Compare automatic switching with current suggest-then-switch design.

### Out of scope

- Implementing auto-switching before a new accepted decision.
- Replacing explicit `/facets` controls.

### Existing behavior to preserve

- Current facets persist until explicit user change.
- Mismatch detection never silently switches state.

### Acceptance

- Decision records retain prohibition, defines narrow approved cases, or skips feature.
- Any approved case has explicit confidence, visibility, reversal, and test requirements.

## Open questions

- Would any real task transition justify silent persistent state mutation?
- Can confirmation UX remain low-friction enough without auto-switching?

## Decisions

- Superseded on 2026-08-01 by `detect-facet-task-mismatch`: mismatch behavior warns and asks; automatic switching remains excluded.

## Plan

- Gather false-positive and transition-friction evidence from mismatch feature use.
- Run trade-off review before implementation.

## Implemented so far

- Evaluation closed as superseded; no implementation authorized.

## Checks

- User confirmed task is defunct on 2026-08-01.

## Review / next slice

- Ready for review: completed; superseded by explicit mismatch flow.
- Likely next slice/task: none.

## Notes

- Former task scope: `draft`.

- Draft review task; does not supersede no-silent-switch guardrail.
