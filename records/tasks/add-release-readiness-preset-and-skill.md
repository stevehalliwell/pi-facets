---
id: 019fc23c-f379-7a8c-a21d-bbf5b32aec0a
name: add-release-readiness-preset-and-skill
created_at: 2026-08-02T11:30:02.233Z
desc: "Add release-readiness preset and skill to derive user-facing and developer-facing documentation updates from Git history, draft CHANGELOG entries, then present edits for user confirmation."
tags: []
status: done
priority: medium
---

## Scope

### Desired outcome

- A `release-readiness` preset and skill support pre-release documentation preparation from repository evidence.

### In scope

- Find changes since release baseline in Git history.
- Identify user-facing features and developer-facing usage changes.
- Update README and draft CHANGELOG changes for next major or minor release.
- State identified changes, make documentation edits, then wait for user to confirm or commit.

### Out of scope

- Publishing, tagging, version-bumping, deployment, automated release tooling, or committing without a user request.

### Existing behavior to preserve

- Facets remain single-axis; skills own workflow.
- Explicit user approval remains required for commits.

### Acceptance

- `release-readiness` preset resolves to `release-steward`, `recommend-and-proceed`, and `structured`.
- Skill baseline precedence is Git tag, released CHANGELOG version, then version-file history; unknown baseline asks user.
- Skill identifies user-facing and developer-facing changes, asks for release target when unspecified, updates README and CHANGELOG, and awaits user confirmation.
- Skill never publishes, tags, version-bumps, deploys, or commits without explicit user request.
- Package resource, workflow, TypeScript, and formatting checks pass.

## Open questions

- None. Release target is chosen per skill invocation.

## Decisions

- 2026-08-02: Workflow must identify changes, state them to user, update README and CHANGELOG, then wait for user confirmation or commit request.

## Plan

1. Add role, preset, and skill with agreed baseline and edit workflow.
2. Add package resource/workflow checks and resource-grid documentation.
3. Run focused and full checks; use current repository as manual scenario.

## Implemented so far

- Added `release-steward` role, `release-readiness` preset, and Git-evidence documentation workflow.
- Added baseline precedence: Git tag, released CHANGELOG version, then version-file introducing commit.
- Added package resource/workflow test coverage and README, CHANGELOG, and facet-grid documentation.
- Exercised baseline discovery in this repo: no tags or released CHANGELOG heading; `package.json` version `0.1.0` resolves to commit `df864a3`.
- Applied manual scenario target `0.2.0`: added evidence-backed 0.2.0 CHANGELOG sections, a 0.1.0 baseline section, and README release-preparation usage.

## Checks

- Focused: `npm test -- --run test/package.test.ts` — 11 tests pass.
- Full: `npm test` — 19 tests pass; `npm run check` and `git diff --check` pass.
- Manual 0.2.0 scenario docs pass the same full checks.
- Package load: `pi --approve --no-session --no-tools --mode json -p "Reply exactly: OK"` — `OK`.

## Review / next slice

- User approved release-readiness task on 2026-08-02; role, preset, skill, 0.2.0 scenario docs, and checks complete.
- Likely next slice/task: commit only on explicit user request.

## Notes

- Former task scope: `agreed`.

- Current repository has no Git tag and only an `Unreleased` CHANGELOG section; manual scenario correctly stops for release target rather than inventing one.
