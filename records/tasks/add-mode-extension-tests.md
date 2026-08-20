---
id: 019fb0a0-13b7-7848-aa83-0666ac47080d
name: add-mode-extension-tests
created_at: 2026-07-30T01:25:08.663Z
desc: ""
tags: []
status: done
priority: medium
depends_on:
  - tasks/implement-mode-extension
  - tasks/create-mode-components
---

## Scope

### Desired outcome

Complete focused automated coverage for first-milestone mode-extension behavior without relying on user-global configuration or network-backed Pi sessions.

### In scope

- Extend `test/mode.test.ts` using existing Vitest setup and fake extension context.
- Cover explicit role, authority, and style command switching.
- Cover same-axis replacement across command selection.
- Cover `/mode show` active refs and resolved source paths.
- Cover unknown component errors with available alternatives.
- Assert malformed component diagnostics include actionable reasons.
- Cover bare `/mode` rejection outside TUI.
- Cover TUI selector selection through fake `ui.select` behavior.
- Cover state restoration directly on `session_start`, in addition to tree restoration.
- Preserve base prompt behavior and no-active-mode no-patch behavior.
- Run focused and full test checks.

### Out of scope

- Network/model-backed Pi integration tests.
- TUI rendering snapshots or terminal interaction tests.
- Automatic mode inference.
- Project-local modes, presets, transcript behavior, or skills.
- Deferred mode features not implemented by the extension.

### Existing behavior to preserve

- Tests use supported Pi extension APIs at the mocked extension boundary.
- Tests remain deterministic and isolated from user-global mode files.
- Existing discovery, composition, replacement, persistence, branch-restore, and clear coverage remains valid.

### Acceptance

- Role, authority, and style switching have focused assertions.
- Same-axis replacement, clear, session restore, and tree restore remain covered.
- `/mode show` assertions verify active names and source paths.
- Unknown refs and malformed files assert actionable diagnostic content.
- Bare `/mode` non-TUI behavior and TUI selection are covered.
- Base prompt remains preserved; empty active state returns no system-prompt patch.
- `npm run check`, `npm test -- test/mode.test.ts`, and full `npm test` pass.

## Open questions

- Keep output assertions semantic/substr-based rather than exact snapshots unless formatting becomes a compatibility contract.

## Decisions

- Use Vitest already declared by package setup.
- Extend the existing fake extension harness; do not add a new test dependency or full interactive harness.
- Test behavior at the extension API boundary; retain one Pi JSON startup smoke check outside the focused suite.

## Plan

- Add reusable fake-context helpers for commands, notifications, selector results, branch entries, and prompt hooks.
- Add focused cases for each remaining acceptance item.
- Run typecheck, focused mode tests, full test suite, and existing Pi smoke check.

## Implemented so far

- Task captured from implementation brief.
- Existing suite added with discovery, malformed exclusion, package precedence, prompt composition, role replacement, custom-entry persistence, branch restoration, and clear coverage.
- Refinement narrowed work to remaining acceptance gaps.
- Added all-axis switching, `/mode show`, unknown-ref, diagnostic-reason, selector-boundary, and direct session-start restoration coverage.

## Checks

- `npm run check` — passed.
- `npm test -- test/mode.test.ts` — passed: 5 tests.
- `npm test` — passed: 7 tests.
- `git diff --check` — passed; Git reported expected line-ending warnings for Markdown/test files.

## Review / next slice

- User review approved; test task complete.
- Next slice: continue with next pending project task.

## Notes

- Former task scope: `agreed`.

- Do not duplicate full Pi interactive runtime setup for behavior already isolated by the extension API contract.
