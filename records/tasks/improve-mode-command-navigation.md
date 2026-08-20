---
id: 019fb239-d261-72be-8b45-31975a01352d
name: improve-mode-command-navigation
created_at: 2026-07-30T08:52:41.697Z
desc: ""
tags: []
status: done
priority: medium
depends_on: []
---

## Scope

### Desired outcome

- Make `/mode` navigation reveal current state directly and make facet/preset selection discoverable through TUI lists.

### In scope

- Bare `/mode` displays current role, authority, and style, then opens TUI component selection when interactive.
- Bare `/mode role`, `/mode authority`, and `/mode style` open available-component TUI lists and mark the current selection.
- Bare `/mode preset` opens a TUI preset list and marks the current preset when identifiable.
- Remove `/mode show` and `/mode presets` commands.
- Preserve explicit `/mode <axis> <name>`, `/mode clear`, and `/mode preset <name>` behavior.
- Add focused command tests.

### Out of scope

- Changing mode discovery, persistence, prompt composition, or preset file format.
- Adding new mode components or presets.

### Existing behavior to preserve

- Selecting a component replaces only its axis and persists a mode-change entry.
- Bare selectors remain TUI-only; explicit commands remain usable outside TUI.
- Presets continue to apply all three axes atomically.

### Acceptance

- `/mode` reports current state, including `(none)`, before opening its TUI selector.
- Bare axis commands show only that axis's available components with current item marked.
- `/mode preset` opens selector with current preset marked when active state matches one.
- `/mode show` and `/mode presets` are rejected as removed commands.
- TypeScript check and all tests pass.

## Open questions

- None.

## Decisions

- Use one selector per axis for bare axis commands; do not require an extra axis-selection screen.
- Display current state through the existing notification channel before opening `/mode` or `/mode preset` selectors.
- Infer active preset by exact role/authority/style match; manually selected components have no preset marker unless they match.

## Plan

- Refactor command handlers and selector helpers.
- Update/add harness assertions for notifications and selected labels.
- Run focused/full checks.

## Implemented so far

- Updated `extensions/mode.ts`: bare `/mode` reports current state; bare axis commands select/list axis choices; selectors mark current components and presets; removed `/mode show` and `/mode presets`.
- Updated `test/mode.test.ts` for current-state output, axis selectors/listing, current markers, preset markers, and removed commands.
- Updated `README.md` and implementation brief command docs.
- Added `/mode help` with complete command list; verified it does not mutate mode state.

## Checks

- `npm run check` — passed.
- `npm test -- --run test/mode.test.ts` — passed: 10 tests.
- `npm test` — passed: 12 tests.
- `git diff --check` — passed.

## Review / next slice

- Ready for review: yes; command UX changes complete.
- Likely next slice/task: user review in interactive Pi TUI.

## Notes

- Former task scope: `agreed`.

- Keep removed command names out of public usage text.
