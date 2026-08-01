---
id: 019fbc05-4372-7c58-b1a2-03bfade4315b
name: evaluate-persistent-skill-status
created_at: 2026-08-01T06:31:29.394Z
desc: "Review whether active skills need persistent UI status."
tags: []
status: todo
scope: draft
---

## Scope

### Desired outcome

- Decide whether active workflow/skill state should appear persistently in Pi UI or be skipped.

### In scope

- Evaluate user value, state semantics, display location, and token/friction cost.
- Compare persistent skill state with current facet-only status indicator direction.

### Out of scope

- Implementing skill lifecycle/state tracking before agreement.
- Changing facet status indicator scope.

### Existing behavior to preserve

- Current discovery decision: persistent indicator shows facets/preset, not skills.
- Skills remain independently invokable workflows.

### Acceptance

- Decision records implement, defer with trigger, or skip.
- If implemented, defines active/exit lifecycle and UI behavior.

## Open questions

- What counts as active skill across model-routed and explicit invocations?
- Does display improve orientation enough to justify another mode indicator?

## Decisions

- No persistent skill status is currently required.

## Plan

- Gather confusion examples from real skill use.
- Compare UI/state costs with on-demand skill reporting.

## Implemented so far

- None.

## Checks

- Not started.

## Review / next slice

- Ready for review: no; requires user evidence.
- Likely next slice/task: revisit after status indicator use.

## Notes

- Draft review task; avoid creating competing persistent state without demonstrated value.
