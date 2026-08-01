---
id: 019fbc05-438f-7c73-a65e-26f1dce540e9
name: evaluate-automatic-facet-switching
created_at: 2026-08-01T06:31:29.423Z
desc: "Review whether Pi should ever automatically switch persistent facets."
tags: []
status: todo
scope: draft
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

- Automatic switching is currently out of scope; suggestion and explicit confirmation are preferred.

## Plan

- Gather false-positive and transition-friction evidence from mismatch feature use.
- Run trade-off review before implementation.

## Implemented so far

- None.

## Checks

- Not started.

## Review / next slice

- Ready for review: no; requires observed usage.
- Likely next slice/task: revisit after mismatch suggestions are tested.

## Notes

- Draft review task; does not supersede no-silent-switch guardrail.
