---
id: 019fb997-926e-7e22-9b56-a9cdb71c2767
name: configure-default-starting-facet-preset
created_at: 2026-07-31T19:12:26.222Z
desc: "Configure project-scoped default starting facet preset with global fallback for new Pi sessions."
tags: []
status: todo
scope: agreed
---

## Scope

### Desired outcome

- Untouched sessions resolve configured default preset transiently from trusted project scope, then global scope, then no facets.

### In scope

- Read one root-level Markdown config: `<root>/facets/default.md`.
- Config has one required frontmatter field: `preset`; direct-axis defaults are unsupported.
- Resolve project config first, then global config; either may reference any resolved preset, including global preset.
- Scan current branch for existing facet-state/change history.
- Any explicit history, including clear, restores and overrides config default.
- No facet history resolves current default in memory; do not append transcript entry.
- Reapply current default when untouched session starts, resumes, reloads, or forks.
- Invalid/missing project config silently falls through to global; invalid/missing global results in no facets.
- Document configuration and add focused tests.

### Out of scope

- Automatic facet inference, model switching, direct-axis defaults, or default-preset UI editor.
- Recording default application as facet transcript event.
- Warnings/diagnostics for invalid default config.

### Existing behavior to preserve

- Explicit session selections and clears override defaults across resume/fork/tree navigation.
- Project facet discovery precedes global fallback.
- Explicit `/facets` controls and missing-reference warnings remain unchanged.

### Acceptance

- Valid project config wins over valid global config.
- Project config may select a resolved global preset.
- Missing or invalid project config silently falls through to valid global config.
- Missing or invalid global config yields no facets.
- Default application writes no facet change/state transcript entry.
- Explicit set and explicit clear prevent default reapplication on resume/fork/tree navigation.
- Untouched session re-resolves current default on start, resume, reload, and fork.
- Focused tests cover config parsing, precedence, invalid fallback, trust boundary, transient state, and history override.
- README documents both config roots, format, transient behavior, and precedence.

## Open questions

- None.

## Decisions

- Config path is `<root>/facets/default.md`.
- Config field is preset-only: `preset: <name>`.
- Defaults are transient and do not create transcript entries.
- No explicit facet history re-resolves current default on resume/fork; explicit history always wins.
- Invalid defaults fail silently to next fallback.

## Plan

1. Add default-config parser/discovery with silent error handling.
2. Distinguish no facet history from explicit empty state.
3. Resolve runtime default during session restoration/navigation without recording state.
4. Add focused tests for precedence and lifecycle.
5. Document config in README and run full checks.

## Implemented so far

- Task refinement only; no implementation changes.

## Checks

- Refinement confirmed by user on 2026-08-01.

## Review / next slice

- Ready for review: no; ready to select for implementation.
- Likely next slice/task: mark `doing`, then inspect session event paths and add config parser tests.

## Notes

- Transient defaults deliberately allow config changes to affect sessions with no explicit facet history.
