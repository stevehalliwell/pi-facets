---
id: 019fc652-9829-756a-8cf4-ea93575a1a5b
name: inject-one-time-facet-activation-instructions
created_at: 2026-08-03T06:32:09.513Z
desc: "Let facets declare activation-only instructions injected when first selected, not on every agent turn."
tags: []
status: done
priority: medium
---

## Scope

### Desired outcome

- Facets can provide activation-only instructions injected separately from persistent per-turn instructions.
- Large setup guidance stays out of repeated facet context.

### In scope

- Optional sibling activation file: `<facet-name>.activation.md` beside its valid facet file.
- Activation lifecycle: emit once on initial/restored active state in a branch session; emit only newly active or replaced facets after explicit axis/preset changes.
- Preserve persistent facet instruction composition separately from activation-only content.
- Validation, diagnostics, and focused tests for activation files and lifecycle behavior.

### Out of scope

- Moving Ponytail or Caveman from global `AGENTS.md`.
- Automatic facet inference or switching.
- Reworking skill lifecycle or unrelated global project instructions.

### Existing behavior to preserve

- Active role, authority, and style facet bodies inject each turn.
- Explicit facet overrides, selection persistence, presets, and invalid-file errors remain unchanged.

### Acceptance

- A valid `<facet-name>.activation.md` injects once when its facet first becomes active, including restored active state in a new branch session.
- Persistent facet bodies continue injecting on every agent turn; activation content does not.
- Direct axis changes and preset changes inject activation content for changed facets only; unchanged axes and no-op reselection do not repeat it.
- Missing activation files are valid. Invalid/unreadable activation files produce actionable diagnostics without disabling valid persistent facet behavior.
- Focused tests cover initial/default restoration, resumed branch, axis replacement, partial preset change, clear/reselect, and invalid activation files.

## Decisions

- Activation-only content uses optional sibling files, not frontmatter or body headings. Reason: expected activation guidance is substantially longer than persistent per-turn instructions.
- Branch-session restoration emits activation content once for active facets; it never repeats on every agent turn.

## Plan

- Extend facet discovery and validation for sibling activation files.
- Track emitted activation facets separately from persistent state.
- Compose activation content at lifecycle transitions; retain current per-turn composition path.
- Add focused lifecycle/discovery tests.

## Implemented so far

- Captured and refined scope.
- Added optional sibling `<facet-name>.activation.md` discovery. Valid non-empty Markdown is stored separately on its matching component; component discovery skips these files. Orphaned or empty activation files yield diagnostics without disabling valid facet bodies.
- Added one-time activation prompt section. Initial/restored state queues active facet activation content; direct and preset transitions queue changed axes only. Pending content clears after next agent start.
- Added tests for initial/default restoration, branch restoration, direct replacement, partial preset changes, clear/reselect, no-op reselection, and invalid activation files.

## Checks

- `attendant_validate --no-correct --strict` — pass; no diagnostics.
- `npm run check` — pass.
- `npx vitest run test/facets.test.ts` — pass (14 tests).
- `npm test` — blocked by pre-existing `.pi/settings.json` JSON comments: `SyntaxError: Unexpected token '/'`; facet tests pass.
- `npm test -- --runInBand` — not run: Vitest rejects Jest-only `--runInBand` option.

## Review / next slice

- Completed: sibling activation discovery, lifecycle prompt injection, and focused tests.
- User approved; task complete.

## Notes

- Former task scope: `agreed`.
