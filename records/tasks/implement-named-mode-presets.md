---
id: 019fb0ab-92e6-7113-955f-4db8a28b7f6e
name: implement-named-mode-presets
created_at: 2026-07-30T01:37:42.118Z
desc: ""
tags: []
status: done
scope: agreed
depends_on:
  - tasks/implement-mode-extension
  - tasks/create-mode-components
---

## Scope

### Desired outcome

Allow users to select named shorthand compositions of mode components at global and project scopes.

### In scope

- Define named presets that reference role, authority, and style components.
- Support globally available presets.
- Support project-local presets.
- Add explicit preset listing, selection (`/mode preset <name>`), inspection, and clearing behavior to the mode experience.
- Resolve presets into the same composable component state used by direct axis selection.
- Keep preset definitions declarative and free of duplicated component content.

### Out of scope

- Automatic preset inference or suggestions.
- Preset-specific model selection or tool-call restrictions.
- Duplicating mode Markdown inside preset definitions.
- Preset inheritance, aliases, versioning, or arbitrary nested composition.

### Existing behavior to preserve

- Direct role, authority, and style selection remains available.
- Explicit direct component selection can replace the corresponding preset component.
- Global and project configuration remain distinguishable.

### Acceptance

- A named preset is one Markdown file under `modes/presets/` with frontmatter refs for `name`, `description`, `role`, `authority`, and `style`; optional body is inspection-only notes.
- Global presets load from `~/.pi/agent/modes/presets/`; project presets load from `<cwd>/.pi/modes/presets/` only when project trust is active.
- Project presets shadow same-name global presets; invalid project definitions do not fall back silently.
- Presets require all three axis refs and resolve against currently discovered package/global components.
- `/mode preset <name>` replaces all three ordinary mode-state refs; direct axis selection edits those refs; no preset identity or override layer persists.
- `/mode preset` offers presets in TUI; `/mode presets` lists names/sources; `/mode preset show <name>` inspects without activation; `/mode show` reports materialized components.
- Invalid or missing preset/component refs produce actionable path, axis, name, and available-alternative diagnostics.
- Preset notes and definitions never inject behavior; only referenced component bodies are composed into the system prompt.
- Adding a preset requires Markdown only, not extension-code changes.

## Open questions

- None blocking implementation. Documentation wording can follow tests.
- Project-local component references remain owned by `support-project-local-modes`.

## Decisions

- Presets are shareable Markdown records, not JSON config.
- Use `~/.pi/agent/modes/presets/*.md` for global records and `<cwd>/.pi/modes/presets/*.md` for project records.
- Project same-name records shadow global records; merge no fields and do not silently fall back when shadowing record is invalid.
- Record frontmatter declares `name`, `description`, `role`, `authority`, and `style`; filename stem must match `name`; body is optional human notes shown only by inspection.
- Require complete role/authority/style refs; applying a preset replaces all three ordinary mode-state refs.
- Direct axis selection edits ordinary state; do not persist preset identity or add an override layer.
- Resolve refs against current package/global component discovery; project-local component refs belong to `support-project-local-modes`.
- Presets are explicit named compositions, not active profiles, nested registries, duplicated behavior, or prompt-instruction sources.
- Project preset discovery honors `ctx.isProjectTrusted()`.

## Plan

- Extend mode discovery with global/project Markdown preset records using Pi `getAgentDir()`, `CONFIG_DIR_NAME`, `ctx.cwd`, and project-trust checks.
- Validate frontmatter, filename/name agreement, complete axis refs, optional notes body, duplicate names, and component references.
- Add deterministic list/show/apply command paths plus TUI selection; preserve non-TUI explicit commands.
- Materialize selected refs into existing branch-aware mode state and keep prompt composition component-only.
- Add focused tests for parsing, precedence, trust gating, invalid shadowing, list/show/apply, replacement, persistence, and prompt behavior.
- Run `npm run check`, focused mode tests, and full `npm test`.

## Implemented so far

- Added global/project Markdown preset discovery under `modes/presets/` with project-trust gating and project shadow precedence.
- Added strict preset validation for frontmatter, filename, complete axis refs, component references, duplicates, and optional inspection notes.
- Added `/mode presets`, `/mode preset`, `/mode preset <name>`, and `/mode preset show <name>`.
- Preset application materializes ordinary branch-aware mode state; notes never enter composed prompts.
- Added discovery, precedence, trust, invalid-shadowing, command, TUI, materialization, and prompt tests.

## Checks

- `npm run check` — passed.
- `npm test` — passed: 9 tests.
- `npm test -- test/mode.test.ts` — passed: 7 tests.
- `git diff --check` — passed; Git reported expected line-ending warnings for modified Markdown/TypeScript files.
- `pi --approve --no-session --no-tools --mode json -p "Reply exactly: OK"` — passed; extension/package loaded without startup errors.

## Review / next slice

- User review approved; task complete.
- Next: select and refine next deferred task.

## Notes

- Keep preset layer thin; component files remain behavioral source of truth.
- JSON config rejected in favor of shareable Markdown records.
- Preset body never becomes prompt content.
