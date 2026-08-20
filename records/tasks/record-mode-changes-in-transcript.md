---
id: 019fb0b1-5e8a-73d7-bb9e-6ef1be276216
name: record-mode-changes-in-transcript
created_at: 2026-07-30T01:44:01.930Z
desc: ""
tags: []
status: done
priority: medium
depends_on:
  - tasks/implement-mode-extension
  - tasks/implement-named-mode-presets
---

## Scope

### Desired outcome

Record mode changes in the Pi transcript so resumed sessions and slash-tree navigation retain mode history.

### In scope

- Emit compact structured transcript events for mode selection, axis replacement, preset selection, and clear.
- Record action, before/after component refs, source scope, and relevant preset name.
- Record enough state to understand the composed mode at each change without copying full Markdown.
- Preserve event ordering relative to agent runs.
- Restore mode state consistently when a session resumes.
- Add tests or manual checks for slash-tree/session navigation behavior.

### Out of scope

- Persistent status-line or footer display.
- Recording every prompt with a full mode copy.
- Tool-call permission events.
- Workflow-phase events owned by skills.

### Existing behavior to preserve

- `/mode show` remains available for current state queries.
- Session resume restores active mode state.
- Transcript remains usable without requiring a persistent UI indicator.

### Acceptance

- Each successful axis replacement appends one `pi-facets.mode-change` custom entry with `action: set-axis`, axis, complete before/after refs, and `{name, source}` metadata.
- Each successful preset application appends one event with `action: apply-preset`, complete resolved refs, and preset `{name, source}`.
- Clear appends one event with `action: clear` and all-null after refs.
- New events restore mode state from `after`; legacy `pi-facets.mode-state` entries remain readable.
- Events render as compact TUI transcript entries with expanded before/after detail and remain outside LLM context.
- Failed selections, inspection commands, discovery, and session restore append no events.
- Event ordering follows successful mode transitions; `/tree` and resumed sessions restore the active branch correctly.
- `npm run check`, focused mode tests, and full tests pass.

## Open questions

- None blocking implementation. Renderer wording can follow tests.
- Future project-local component source values may extend current `package`/`global` metadata.

## Decisions

- Use one `pi-facets.mode-change` custom entry per successful transition for both visible history and new-format state restoration.
- Preserve legacy `pi-facets.mode-state` restore compatibility.
- Store complete before/after axis snapshots with refs `{name, source}`; omit paths and Markdown bodies.
- Use actions `set-axis`, `apply-preset`, and `clear`; include axis only for `set-axis` and preset `{name, source}` only for `apply-preset`.
- Register a compact/expanded TUI entry renderer; custom entries never enter LLM context.
- Do not emit events for failed commands, inspection, discovery, or restoration.
- Persistent footer/status display remains out of scope.

## Plan

- Add typed event payload, ref snapshots, validation, and legacy restore handling in `extensions/mode.ts`.
- Replace new state persistence writes with one mode-change event per successful transition.
- Register compact/expanded renderer using Pi custom-entry APIs.
- Add tests for axis replacement, preset, clear, invalid/no-op paths, ordering, renderer registration, prompt exclusion, resume, and `/tree` branch restoration.
- Run `npm run check`, focused mode tests, and full `npm test`.

## Implemented so far

- Added typed `pi-facets.mode-change` custom entries with complete before/after axis snapshots.
- New entries restore state; legacy `pi-facets.mode-state` entries remain supported.
- Added compact/expanded TUI entry renderer; events stay outside LLM context.
- Recorded axis replacement, preset application, and clear actions with source metadata.
- Added tests for payloads, renderer registration, preset/clear events, prompt exclusion, branch/session restore, and legacy state restore.
- Added official `@earendil-works/pi-tui` peer/dev dependency for renderer support.

## Checks

- `npm run check` — passed.
- `npm test` — passed: 10 tests.
- `npm test -- test/mode.test.ts` — passed: 8 tests.
- `git diff --check` — passed; Git reported expected line-ending warnings for modified files.
- `pi --approve --no-session --no-tools --mode json -p "Reply exactly: OK"` — passed; extension/package loaded without startup errors.

## Review / next slice

- User review approved; task complete.
- Next: select and refine next deferred task.

## Notes

- Former task scope: `agreed`.

- Keep payload compact and inspectable; do not duplicate full mode files in every event.
