---
id: 019fd3a9-e522-7dc6-812d-1d42ea763e0d
name: wrap-tui-menu-navigation
created_at: 2026-08-05T20:42:34.000Z
desc: "Make TUI menus wrap selection: pressing Up on the first item selects the last item, where supported by the underlying TUI API."
tags:
  - tui
  - navigation
  - usability
status: done
priority: medium
---

## Scope

### Desired outcome

- TUI menus wrap around: pressing Up on the first item jumps to the last item.

### In scope

- Determine whether the Pi extension selector API supports configured wrap-around navigation.

### Out of scope

- Replacing project menus with custom TUI components or otherwise diverging from Pi's standard `ctx.ui.select()` flow.
- Modifying Pi internals or upstream behavior.
- Other navigation or menu-behavior changes.

### Existing behavior to preserve

- Existing menu selection, activation, and key behavior apart from the requested wrap-around behavior.

### Acceptance

- Confirm whether the standard Pi extension selector supports configured wrapping.
- If it does not, close this item without implementation.

## Open questions

- None.

## Decisions

- 2026-08-05: Do not fight Pi internals or replace the standard menu flow solely to add wrapping.
- 2026-08-05: Revisit only if Pi exposes wrapping as a configuration of the standard extension selection UI.

## Plan

- Inspected all project-owned menus and the installed Pi TUI implementation.

## Implemented so far

- No implementation: the task was closed by decision.

## Checks

- `extensions/facets.ts` uses `ctx.ui.select()` for the main, axis, and preset menus.
- Installed Pi's `ExtensionSelectorComponent` clamps Up/Down selection at list boundaries and exposes no wrapping option.
- Pi's lower-level `SelectList` wraps, but adopting it would require a custom project selector flow.

## Review / next slice

- Closed: no project change is warranted.
- Revisit only if Pi adds a wrap configuration to `ctx.ui.select()`.

## Notes

- Former task scope: `draft`.

- No matching tracked task found. Related completed navigation work: `records/tasks/improve-mode-command-navigation.md`.
