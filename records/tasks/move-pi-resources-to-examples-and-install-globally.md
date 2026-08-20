---
id: 01a01cd1-0f25-73a6-8d43-532ffe314eaf
name: move-pi-resources-to-examples-and-install-globally
created_at: 2026-08-20T01:37:38.085Z
desc: Move bundled Pi facets, prompts, and skills into an example directory;
  update the installer to copy all of them to global Pi scope; update README
  setup and usage guidance.
tags: []
status: done
priority: medium
---

## Scope

### Desired outcome

- Bundled Pi facets, prompts, and skills live in `examples/pi-resources/`, and `pi-facets install` copies them all into the global Pi folder with README instructions that match.

### In scope

- Relocate bundled facets, prompts, and skills into an example folder.
- Update installer paths and behavior to copy every bundled resource to global Pi scope.
- Update README installation and usage documentation.
- Add an Unreleased CHANGELOG entry.
- Update affected tests.

### Out of scope

- Project-local installation behavior: the installer becomes global-only.
- Changes to the resources' content beyond path-related references.

### Existing behavior to preserve

- Preserve explicit no-overwrite behavior unless a resource-specific replacement policy is agreed.
- Existing installed user resources must not be removed or overwritten unintentionally.

### Acceptance

- A clean test fixture receives facets, prompts, and skills at `~/.pi/agent/{facets,prompts,skills}` after `pi-facets install`.
- `--scope` is removed; `--force` replaces only conflicting bundled resources.
- README documents the example source layout and global installation command.
- CHANGELOG records the global-only resource installer and resource relocation.
- Existing relevant tests pass.

## Open questions

- None.

## Decisions

- 2026-08-20: Move resources to `examples/pi-resources/{facets,prompts,skills}`.
- 2026-08-20: `pi-facets install [--force]` installs only into global Pi scope; remove `--scope`.
- 2026-08-20: Preflight conflicts across all resource types; `--force` replaces only matching bundled files.

## Plan

1. Move facets, prompts, and skills to `examples/pi-resources/{facets,prompts,skills}`; preserve `.pi/settings.json` and project Attendant data in place.
2. Update package discovery and installer to copy the three resource roots into `~/.pi/agent`.
3. Update installer tests and README examples.
4. Run checks and test the CLI behavior in a temporary home directory.

## Implemented so far

- Moved all bundled facets, prompts, and skills into `examples/pi-resources/`.
- Changed `pi-facets install` to global-only and to copy all three resource roots.
- Removed automatic package skill loading so examples are installed explicitly.
- Updated README and affected resource, installer, and facet-discovery tests.
- Updated README to include prompts and clarify global resource installation.
- Added an Unreleased CHANGELOG entry for the resource relocation and global-only installer.

## Checks

- Duplicate search found no matching task.
- User approved global-only installer design.
- `npm run check`: passed.
- `npm test`: 36 passed.
- `git diff --check`: passed.
- `npm pack --dry-run`: includes all resources under `examples/pi-resources/`.
- Documentation diff reviewed; `npm test`: 36 passed.

## Review / next slice

- Ready for review: approved 2026-08-20; resource relocation, installer, README, CHANGELOG, and checks complete.
- Likely next slice/task: none.

## Notes

- Former task scope: `agreed`.

- This intentionally breaks `--scope project`; README must make the global-only change clear.
- Relocation can break package discovery, tests, and path assumptions.
