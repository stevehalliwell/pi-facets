---
id: 019fb09f-fbf7-7d7f-bb86-e22a0c7a5161
name: implement-mode-extension
created_at: 2026-07-30T01:25:02.583Z
desc: ""
tags: []
status: todo
scope: draft
depends_on: []
---

## Scope

### Desired outcome

Provide thin stateful `/mode` extension that composes selected role, authority, and style Markdown into each Pi agent run.

### In scope

- Review relevant Pi extension documentation and examples before implementation.
- Implement required commands: `/mode`, `/mode show`, `/mode clear`, `/mode role <name>`, `/mode authority <name>`, `/mode style <name>`.
- Load and validate mode components.
- Replace prior component on same axis.
- Inject composed instructions before each agent run.
- Persist and restore mode state through Pi session lifecycle.
- Report actionable missing/malformed-file errors.

### Out of scope

- Automatic mode inference or suggestions.
- Model switching.
- Tool-call restriction, gating, permission enforcement, or tool profiles.
- Project-local modes, presets, status UI, or transcript logging.

### Existing behavior to preserve

- Pi global working agreement and project context remain separate from mode content.
- Explicit user mode overrides always work.

### Acceptance

- All required commands work.
- `/mode` lists available components.
- `/mode show` reports composed active state.
- `/mode clear` returns to global defaults.
- Composed instructions inject before every agent run.
- State survives session resume.
- Invalid references fail clearly.

## Open questions

- Exact Pi extension API and source layout require confirmation from the installed Pi runtime.
- Whether shorthand `/mode <role>` is included in first slice.

## Decisions

- Keep extension thin; store behavior in Markdown components.
- First milestone excludes automatic inference.
- Tool calling remains unrestricted; extension does not enforce tool permissions.

## Plan

- Review relevant Pi extension lifecycle documentation and examples.
- Implement state, component discovery, parsing, commands, and prompt injection.
- Add manual smoke check before tests.

## Implemented so far

- Task captured from implementation brief.

## Checks

- Not started.

## Review / next slice

- Ready for review: no; scope remains draft.
- Likely next slice/task: agree exact extension API and file layout.

## Notes

- Keep mode files single-axis; do not duplicate skill workflows or project facts.
