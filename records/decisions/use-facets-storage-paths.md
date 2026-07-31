---
id: 019fb728-c635-7571-8797-e0e787192b90
name: use-facets-storage-paths
created_at: 2026-07-31T07:52:10.549Z
desc: ""
tags: []
status: accepted
revisit_triggers:
  - storage-path-compatibility
  - facet-folder-usability
---

## Context

The public command is now `/facets`, but storage still uses `modes/` paths. User wants shipped and configured files to use the product term consistently.

## Decision

Rename storage folders:

- package `modes/` → `facets/`;
- project `.pi/modes/` → `.pi/facets/`;
- global `~/.pi/agent/modes/` → `~/.pi/agent/facets/`;
- preset subfolders follow the same rename.

This decision covers storage paths only. Internal terminology and event IDs are governed separately by `records/decisions/rename-mode-internals-to-facets.md`.

## Options considered

- Rename all storage paths only: chosen. Aligns user-visible file layout with `/facets` while limiting migration scope.
- Rename all internal identifiers too: deferred. Larger churn without current user value.
- Keep `modes/` paths: rejected. Leaves public command and file layout inconsistent.

## Trade-offs / consequences

- Existing project/global files under `modes/` need manual relocation or compatibility handling; no automatic migration is included in this slice.
- Path-resolution code, fixtures, docs, and package layout change.
- Persisted session state remains compatible because state keys and event IDs do not change.

## Affected areas

- Package `facets/` directory.
- Project/global discovery roots and preset roots.
- Tests, README, implementation brief, and task records.

## Guardrails

- Preserve component precedence and trusted-project behavior.
- Preserve preset precedence and application semantics.
- Do not couple storage-path behavior to internal terminology or event-ID migration.
- Do not add migration aliases unless separately requested.

## Revisit trigger

- Reopen if users need automatic migration from existing `modes/` directories or `facets` paths conflict with another convention.
