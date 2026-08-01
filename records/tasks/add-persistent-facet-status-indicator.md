---
id: 019fbbff-7a16-706f-b893-fdfc36cfb5a6
name: add-persistent-facet-status-indicator
created_at: 2026-08-01T06:25:10.166Z
desc: "Show compact persistent active-facet state in Pi UI."
tags: []
status: todo
scope: draft
---

## Scope

### Desired outcome

- Pi visibly shows active persistent facet state without adding response/token noise.

### In scope

- Show active preset name only when a preset is active.
- Otherwise show one compact line for role, authority, and style.
- Keep `/facets` as detailed inspection and change control.

### Out of scope

- Persistent skill/workflow state.
- New facet editor or automatic switching.
- Adding candidate `initiative` axis.

### Existing behavior to preserve

- Explicit `/facets` controls and session persistence.
- No persistent UI indicator when no active facets, unless agreed otherwise.

### Acceptance

- Active preset renders its name in persistent UI.
- Custom composition renders role, authority, and style compactly.
- State updates after selection, clearing, restoration, and branch navigation.
- UI failure does not break facet selection or prompt composition.

## Open questions

- Which Pi TUI API/location provides stable status rendering?
- What should indicator show when no facets are active?

## Decisions

- Skills do not appear in persistent status.
- Preset identity is primary user-facing state.

## Plan

- Inspect Pi TUI status APIs.
- Define compact rendering and empty-state behavior.
- Implement with focused state/update tests.

## Implemented so far

- None.

## Checks

- Not started.

## Review / next slice

- Ready for review: no; scope remains draft.
- Likely next slice/task: refine TUI integration and empty-state behavior.

## Notes

- Must reduce confusion, not create persistent UI clutter.
