---
id: 019fca18-a9e5-7d5a-963a-3a4b68a2a52b
name: install-facets-into-global-or-project-scope
created_at: 2026-08-04T00:07:24.649Z
desc: "Provide post-install mechanism to copy bundled facets from this repository into either global Pi scope or project-local Pi scope."
tags: []
status: todo
scope: agreed
---

## Scope

### Desired outcome

- After package installation, user can copy provided facet resources into global Pi or current project scope through a package CLI.

### Confirmed behavior

- Command: `pi-facets install --scope project|global [--force]`.
- `project` target: `<cwd>/.pi/facets`; `global` target: `~/.pi/agent/facets`.
- Copy roles, authority, style facets, activation siblings, and presets only.
- Skills and extension remain package-provided; do not copy them.
- Default never overwrites. List relative-path conflicts and exit nonzero.
- `--force` replaces conflicting bundled files only.

### In scope

- Small Node CLI registered through `package.json` `bin`.
- Validate flags; provide actionable invalid-argument errors and `--help`.
- Create absent destination directories.
- Update README installation/use guidance.
- Add temp-directory tests for both targets, conflict handling, `--force`, and invalid args.

### Out of scope

- Publishing package, copying skills/prompts/references/extensions/`AGENTS.md`, merge/update semantics beyond skip or replace, Pi package-loading configuration, default presets, and active facet state.

### Existing behavior to preserve

- Project facets override same-named global facets.
- Facet activation files remain sibling resources.
- Existing destination files are untouched unless caller passes `--force`.

### Plan

1. Register and implement CLI with safe copy semantics.
2. Add focused filesystem/argument tests.
3. Document use; run checks.

### Acceptance

- CLI works from installed package context and copies correct tree to both targets.
- Activation files copy with matching facets.
- Existing files remain unchanged without `--force`; command lists conflicts and exits nonzero.
- `--force` replaces only conflicting bundled paths.
- `npm run check` and tests pass.
