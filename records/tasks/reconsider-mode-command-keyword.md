---
id: 019fb2b0-212c-74ea-b575-95fb7fb4954d
name: reconsider-mode-command-keyword
created_at: 2026-07-30T11:01:55.117Z
desc: ""
tags: []
status: done
priority: medium
depends_on: []
---

## Scope

### Desired outcome

Decide stable public slash command keyword for pi-facets facet controls.

### In scope

- Assess broad-name collision risk.
- Compare `/mode`, `/facets`, `/profile`, and `/persona`.
- Decide canonical keyword and compatibility behavior.
- Record durable decision and create implementation task.

### Out of scope

- Implementing command rename; tracked by `tasks/rename-mode-command-to-facets`.

### Existing behavior to preserve

- Current mode selection, persistence, preset, and help behavior until decision is made.

### Acceptance

- Accepted decision recorded at `records/decisions/use-facets-command-keyword.md`.
- Canonical keyword and compatibility behavior are explicit.
- Implementation follow-up exists at `records/tasks/rename-mode-command-to-facets.md`.

## Open questions

- None.

## Decisions

- Use `/facets` as canonical command.
- Remove `/mode` without compatibility alias.
- Preserve internal mode terminology and persisted mode behavior.

## Plan

- Compare terminology and collision costs.
- Record durable decision.
- Create agreed implementation follow-up.

## Implemented so far

- Reviewed current command surface and Pi command collision behavior.
- Recorded decision and created implementation task.

## Checks

- Decision/task records validated after sync.

## Review / next slice

- Ready for review: yes; keyword decision complete.
- Likely next slice/task: `tasks/rename-mode-command-to-facets`.

## Notes

- Former task scope: `agreed`.

- `/mode` is not currently a built-in Pi command, but broad names can collide with extension commands. `/facets` is more distinctive.
