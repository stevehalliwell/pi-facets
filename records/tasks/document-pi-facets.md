---
id: 019fb0a1-1c08-76a7-9fb1-392db51dfc04
name: document-pi-facets
created_at: 2026-07-30T01:26:16.328Z
desc: ""
tags: []
status: todo
scope: draft
depends_on:
  - tasks/implement-mode-extension
  - tasks/create-mode-components
  - tasks/create-initial-skills
  - tasks/setup-pi-extension-package-requirements
---

## Scope

### Desired outcome

Document first-milestone usage and extension points so a new role or skill can be added without changing extension code.

### In scope

- Explain modes, skills, project context, and references; state that pi-facets does not restrict tool calls.
- Document `/mode` commands and active-state behavior.
- Document mode file format and component discovery.
- Document skill layout and discriminative descriptions.
- Record first-milestone exclusions and deferred questions.
- Keep human README and agent guidance aligned with implementation.

### Out of scope

- Detailed framework/reference documentation.
- User-facing docs for deferred presets, inference, model switching, or tool-call restrictions.
- Handoff/status notes without real implementation progress.

### Existing behavior to preserve

- Global `AGENTS.md` stays short; detailed behavior remains in modes/skills.
- Project facts remain outside global skills and modes.

### Acceptance

- README documents setup, usage, layout, and current status.
- New role and skill instructions are clear and do not require extension-code edits.
- Documentation matches implemented commands and first-milestone boundaries.

## Open questions

- Final install/test commands are TBD until package/toolchain setup.
- Documentation location for Pi-specific extension API details is TBD.

## Decisions

- Keep implementation brief as design context.
- Skip handoff until real implementation status exists.

## Plan

- Review and update `README.md` and `AGENTS.md` after package setup works.
- Add concise contributor guidance for modes and skills.
- Verify examples against tests.

## Implemented so far

- Task captured from implementation brief.

## Checks

- Not started.

## Review / next slice

- Ready for review: no; scope remains draft.
- Likely next slice/task: document exact runtime setup after implementation begins.

## Notes

- Avoid duplicating mode/skill content in README.
