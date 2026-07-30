---
id: 019fb09f-fbf7-7d7f-bb86-e22a0c7a5161
name: implement-mode-extension
created_at: 2026-07-30T01:25:02.583Z
desc: ""
tags: []
status: done
scope: agreed
depends_on: []
---

## Scope

### Desired outcome

Provide thin stateful `/mode` extension that composes selected role, authority, and style Markdown into each Pi agent run.

### In scope

- Review relevant Pi extension documentation and examples before implementation.
- Implement `extensions/mode.ts` using supported Pi extension APIs.
- Discover package `modes/` plus global `getAgentDir()/modes/` components.
- Resolve same axis/name duplicates with package definitions taking precedence; global definitions fill missing names.
- Validate Markdown components with strict frontmatter: `name`, `axis`, `description`, matching filename stem, and non-empty body.
- Report malformed files with diagnostics and exclude them from valid discovery.
- Implement required commands: `/mode`, `/mode show`, `/mode clear`, `/mode role <name>`, `/mode authority <name>`, `/mode style <name>`.
- Use TUI selector for bare `/mode`; reject bare `/mode` in non-interactive modes with an actionable error.
- Replace prior component on same axis.
- Inject one labeled composed-mode section through `before_agent_start`, preserving the existing system prompt.
- Persist compact axis/name state through `pi.appendEntry()` custom entries; restore from the current branch on `session_start` and `session_tree`.
- Report actionable missing or invalid references with source path and valid alternatives.
- Add isolated tests using fixture component roots, independent of user-global mode files.

### Out of scope

- Automatic mode inference or suggestions.
- Model switching.
- Tool-call restriction, gating, permission enforcement, or tool profiles.
- Project-local mode overrides; separate task `support-project-local-modes` owns `.pi/modes/`.
- Named presets; separate task `implement-named-mode-presets` owns preset discovery and commands.
- Persistent status/footer UI.
- Dedicated human-readable transcript event history/rendering; custom state entries are used only for branch-correct restoration.

### Existing behavior to preserve

- Pi global working agreement and project context remain separate from mode content.
- Explicit user mode overrides always work.

### Acceptance

- Package and global components are discovered; package definitions win cross-source duplicates.
- Valid files satisfy the frontmatter/body contract; malformed files are excluded and reported with path/reason.
- All required commands work; same-axis selection replaces the prior component.
- Bare `/mode` opens a TUI selector; non-interactive use returns an actionable error.
- `/mode show` reports active axis/name refs and resolved source paths.
- `/mode clear` removes all active refs and persists empty state.
- Composed instructions inject before every agent run without replacing the existing system prompt.
- State survives session resume and follows the selected branch after tree navigation.
- Missing or invalid refs fail clearly and list valid alternatives.
- `npm run check`, focused mode tests, and full `npm test` pass.

## Open questions

- Exact user-facing formatting for selector, `/mode show`, and diagnostics can be finalized during implementation without changing behavior.
- Dedicated transcript event payload remains owned by `record-mode-changes-in-transcript`.

## Decisions

- Keep extension thin; store behavior in Markdown components.
- Package `modes/` and global `getAgentDir()/modes/` are first-slice sources.
- Package definitions win same axis/name duplicates; global definitions fill missing names.
- Persist axis/name refs as `pi-facets.mode-state` custom entries; do not copy Markdown into session state.
- Reconstruct state from current branch on `session_start` and `session_tree`.
- Bare `/mode` is TUI-only; explicit axis commands support non-interactive use.
- Malformed files are diagnosed and excluded, not silently ignored or fatal to extension load.
- Omit shorthand `/mode <name>` from first slice.
- First milestone excludes automatic inference.
- Tool calling remains unrestricted; extension does not enforce tool permissions.

## Plan

- Implement component discovery for package/global roots with deterministic precedence.
- Implement strict Markdown parsing and diagnostics using Node/TypeScript only.
- Implement branch-aware state, required commands, selector, and prompt composition.
- Add focused fixtures/tests for valid and malformed components, precedence, replacement, clear, restore, tree navigation, injection, and errors.
- Run manual Pi smoke check, `npm run check`, focused tests, and full `npm test`.

## Implemented so far

- Task captured from implementation brief.
- Refined against installed Pi 0.83 extension/session APIs.
- Agreed package/global discovery, package precedence, TUI selector boundary, validation behavior, and branch-aware custom-entry persistence.
- Added `extensions/mode.ts` with discovery, validation, commands, prompt composition, and branch-aware session state.
- Added eight first-milestone mode components under `modes/`.
- Added focused discovery, composition, command, persistence, branch restore, and clear tests.

## Checks

- `npm run check` — passed.
- `npm test` — passed: 5 tests.
- `npm test -- test/mode.test.ts` — passed: 3 tests.
- `git diff --check` — passed; Git reported expected line-ending warning for the Markdown task record.
- `pi --approve --no-session --no-tools --mode json -p "Reply exactly: OK"` — passed; extension/package loaded without startup errors.

## Review / next slice

- User review approved; implementation complete.
- Deferred follow-ups: project-local modes, presets, transcript event history, mismatch detection, and documentation.

## Notes

- Keep mode files single-axis; do not duplicate skill workflows or project facts.
