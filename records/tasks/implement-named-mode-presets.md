---
id: 019fb0ab-92e6-7113-955f-4db8a28b7f6e
name: implement-named-mode-presets
created_at: 2026-07-30T01:37:42.118Z
desc: ""
tags: []
status: todo
scope: draft
depends_on:
  - tasks/implement-mode-extension
  - tasks/create-mode-components
---

## Scope

### Desired outcome

Allow users to select named shorthand compositions of mode components at global and project scopes.

### In scope

- Define named presets that reference role, authority, and style components.
- Support globally available presets.
- Support project-local presets.
- Add explicit preset listing, selection (`/mode preset <name>`), inspection, and clearing behavior to the mode experience.
- Resolve presets into the same composable component state used by direct axis selection.
- Keep preset definitions declarative and free of duplicated component content.

### Out of scope

- Automatic preset inference or suggestions.
- Preset-specific model selection or tool-call restrictions.
- Duplicating mode Markdown inside preset definitions.
- Preset inheritance, aliases, versioning, or arbitrary nested composition.

### Existing behavior to preserve

- Direct role, authority, and style selection remains available.
- Explicit direct component selection can replace the corresponding preset component.
- Global and project configuration remain distinguishable.

### Acceptance

- A named preset maps component references without duplicating component content.
- Global presets work across projects; project presets apply only in their project.
- Explicit preset selection reports the resolved components.
- Presets can be listed and inspected without activating them.
- Invalid or missing preset/component references produce actionable errors.
- Adding a preset requires configuration/Markdown only, not extension-code changes.

## Open questions

- Exact global and project file locations.
- Preset file format and metadata contract.
- Project-over-global name collision and precedence rules.
- Whether partial presets are allowed.
- Session persistence: store preset name, resolved components, or both.

## Decisions

- Named presets are desired shorthand over composable components.
- Presets must work at global and project scopes.
- Presets reference components rather than duplicate their contents.
- First implementation uses explicit named compositions, not active profiles or nested registries.

## Plan

- Review Pi config/extension conventions for global and project discovery.
- Propose preset schema and precedence rules.
- Confirm scope behavior, then implement discovery, resolution, commands, and persistence.
- Add focused tests for global/project resolution and invalid references.

## Implemented so far

- Task captured from user direction.

## Checks

- Not started.

## Review / next slice

- Ready for review: no; scope remains draft.
- Likely next slice/task: agree preset schema, locations, and precedence.

## Notes

- Keep preset layer thin; component files remain behavioral source of truth.
