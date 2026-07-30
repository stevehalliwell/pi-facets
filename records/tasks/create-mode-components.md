---
id: 019fb0a0-0475-7485-9e82-98a4f30c5853
name: create-mode-components
created_at: 2026-07-30T01:25:04.757Z
desc: ""
tags: []
status: todo
scope: draft
depends_on: []
---

## Scope

### Desired outcome

Create first-milestone Markdown mode components consumed by the `/mode` extension.

### In scope

- Roles: `pragmatic-collaborator`, `product-owner`, `dev-peer`.
- Authority: `advisory`, `recommend-and-proceed`, `decisive`.
- Style: `concise`, `critical`.
- Use declarative frontmatter with one axis per file.
- Keep definitions small and composable.

### Out of scope

- `marketing-strategist`, `exploratory`, or other proposed future components.
- Presets, automatic selection, project-local overrides, or tool-permission components.
- Detailed workflow procedures or business/project facts.

### Existing behavior to preserve

- Each component must stay focused on its declared axis and avoid overriding workflow instructions.
- Components remain independently selectable by axis.

### Acceptance

- Eight expected files exist under `modes/roles/`, `modes/authority/`, and `modes/style/`.
- Frontmatter names and axes are valid.
- Each file gives useful behavior without duplicating skills.
- Extension can discover components without code changes for each new file.

## Open questions

- Exact validation rules for Markdown frontmatter depend on extension implementation.

## Decisions

- Use Markdown files as source of truth.
- Build only first-milestone components from brief.

## Plan

- Define frontmatter contract.
- Write eight component files.
- Validate discovery and composition through extension tests.

## Implemented so far

- Task captured from implementation brief.

## Checks

- Not started.

## Review / next slice

- Ready for review: no; scope remains draft.
- Likely next slice/task: agree component wording and frontmatter contract.

## Notes

- New components should require no extension-code changes.
