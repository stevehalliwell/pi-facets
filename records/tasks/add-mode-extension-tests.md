---
id: 019fb0a0-13b7-7848-aa83-0666ac47080d
name: add-mode-extension-tests
created_at: 2026-07-30T01:25:08.663Z
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

Protect first-milestone mode behavior with basic automated tests.

### In scope

- Review Pi extension/testing documentation and examples before selecting the harness.
- Mode loading from valid Markdown files.
- Role, authority, and style switching.
- Same-axis replacement.
- Clearing all active components.
- Session state persistence and restoration.
- Prompt composition/injection.
- Missing or malformed component errors.

### Out of scope

- Automatic mode inference.
- Model/tool profile behavior.
- Full skill workflow tests.
- UI/status/footer testing unless required by extension API.

### Existing behavior to preserve

- Tests use supported Pi extension APIs and do not require network access.
- Tests remain deterministic and isolated from the user’s global mode state.

### Acceptance

- Basic tests cover loading, switching, clearing, and restoration.
- Error cases assert actionable messages.
- Test command and prerequisites are documented after toolchain exists.

## Open questions

- Test runner and extension harness are TBD until Pi package setup is inspected.

## Decisions

- Test first-milestone required behavior, not deferred options.

## Plan

- Review Pi extension/testing documentation and examples.
- Select supported test harness.
- Add focused fixtures for valid/invalid modes.
- Implement required behavior assertions.
- Run focused and full test checks.

## Implemented so far

- Task captured from implementation brief.

## Checks

- Not started.

## Review / next slice

- Ready for review: no; scope remains draft.
- Likely next slice/task: agree test harness after extension shape is known.

## Notes

- Keep tests independent of local user configuration.
