---
id: 019fbbff-7a16-706f-b893-fdfc36cfb5a6
name: add-persistent-facet-status-indicator
created_at: 2026-08-01T06:25:10.166Z
desc: "Show compact persistent active-facet state in Pi UI."
tags: []
status: todo
scope: agreed
---

## Scope

### Desired outcome

- Pi TUI footer visibly shows current facet composition without response/token noise or footer replacement.

### In scope

- Use `ctx.ui.setStatus("pi-facets", text)`; do not use custom footer/widget.
- Matching role/authority/style composition shows preset name, regardless of how axes were selected.
- Non-matching composition shows `facets: role=<name> · authority=<name> · style=<name>`, omitting unset axes.
- Preset composition shows `facets: <preset>`.
- Use accent `facets:` label with muted values.
- Hide indicator when no facets are active.
- Update on session start, session tree navigation, set/clear axis, clear all, and preset application; clear on shutdown.
- Restrict visible status to TUI; preserve non-TUI behavior.
- Update product discovery preset-identity wording and add focused status formatter/lifecycle tests.

### Out of scope

- Persistent skill/workflow state, click actions, editor, automatic switching, or `initiative` axis.
- Custom footer replacement, widget/overlay UI, or extra transcript entries.

### Existing behavior to preserve

- `/facets` remains detailed inspection and change control.
- Existing state restoration and matching-preset semantics remain unchanged.
- UI failure does not break facet selection or prompt composition.

### Acceptance

- TUI footer shows matching preset as `facets: <preset>`.
- TUI footer shows non-matching axes in agreed compact labeled format.
- No active facets clears `pi-facets` status.
- Status is correct after selection, clearing, session restore, and tree navigation.
- Print/JSON modes have no visible status side effect.
- Focused tests cover formatter output, preset match, partial/custom state, empty state, and lifecycle update calls.
- Product discovery documents matching-composition preset identity.

## Open questions

- None.

## Decisions

- Footer status API is `setStatus`; do not replace Pi footer.
- Matching composition, not selection provenance, defines active preset identity.
- Empty facet state hides indicator.
- Skills never appear in persistent status.

## Plan

1. Add status formatter/update helper using existing `currentPreset()` matching semantics.
2. Invoke helper at state restoration and mutation boundaries; clear on shutdown.
3. Add TUI-context mocks and focused status tests.
4. Update product discovery wording.
5. Run focused and full checks.

## Implemented so far

- Task refinement only; no implementation changes.

## Checks

- Refinement confirmed by user on 2026-08-01.

## Review / next slice

- Ready for review: no; ready to select for implementation.
- Likely next slice/task: mark `doing`, then add formatter and session/mutation update coverage.

## Notes

- Footer status is orientation aid, not interactive control.
