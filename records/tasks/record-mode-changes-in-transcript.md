---
id: 019fb0b1-5e8a-73d7-bb9e-6ef1be276216
name: record-mode-changes-in-transcript
created_at: 2026-07-30T01:44:01.930Z
desc: ""
tags: []
status: todo
scope: draft
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

- Mode changes appear in transcript in correct order.
- A resumed session can reconstruct relevant mode history/state.
- Slash-tree navigation retains mode-change context.
- Clear and replacement events are distinguishable.

## Open questions

- Pi transcript event API and supported custom event shape.
- Whether component refs are stored as stable names, scoped paths, or both.
- Exact project/global source metadata representation.

## Decisions

- Mode changes must be recorded in transcript.
- Use compact structured events, not full mode snapshots.
- Persistent UI display is not required for now.

## Plan

- Review Pi transcript/session APIs and examples.
- Define minimal structured event payload.
- Emit events from mode state transitions.
- Verify payload ordering and slash-tree visibility.
- Add ordering and resume checks.

## Implemented so far

- Task captured from deferred-question review.

## Checks

- Not started.

## Review / next slice

- Ready for review: no; scope remains draft.
- Likely next slice/task: inspect supported transcript event API.

## Notes

- Keep payload compact and inspectable; do not duplicate full mode files in every event.
