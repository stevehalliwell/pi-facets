---
id: 019fb799-4858-71b6-8dd4-8acdcfe3e1ac
name: rename-mode-internals-to-facets
created_at: 2026-07-31T09:55:03.896Z
desc: ""
tags: []
status: accepted
revisit_triggers:
  - legacy-session-recovery
  - facet-terminology-inconsistency
---

## Context

The public command and storage paths now use `facets`, but implementation identifiers, extension filename, user-facing labels, and serialized event IDs still use `mode`. User chose consistent internal terminology.

## Decision

Rename pi-facets internals to `facet` terminology:

- `extensions/mode.ts` → `extensions/facets.ts`;
- `test/mode.test.ts` → `test/facets.test.ts`;
- `Mode*` types/functions/constants → `Facet*` equivalents;
- user-facing mode labels → facet labels;
- `pi-facets.mode-state` → `pi-facets.facet-state`;
- `pi-facets.mode-change` → `pi-facets.facet-change`.

Keep Pi API `ctx.mode` unchanged; it describes runtime transport mode, not pi-facets terminology.

## Options considered

- Full internal rename with hard event-ID rename: chosen. Consistent terminology, smallest long-term vocabulary.
- Rename code names but preserve old event IDs: rejected. Leaves serialized implementation terminology inconsistent.
- Read old IDs and write new IDs: rejected for now. Adds migration compatibility not requested.

## Trade-offs / consequences

- Existing sessions using old event IDs will not restore facet state after rename.
- Existing custom transcript entries with old IDs will not use new renderer.
- Imports, tests, docs, and package metadata require synchronized updates.
- Pi transport `ctx.mode` remains an unavoidable unrelated term.

## Affected areas

- Extension source, tests, and package resources.
- Prompt composition labels and runtime notifications.
- Session custom-entry IDs and restoration logic.
- README, implementation brief, and task/decision references.

## Guardrails

- Do not rename Pi API fields such as `ctx.mode` or CLI `--mode`.
- Preserve facet discovery, precedence, selection, preset, and prompt-composition semantics.
- Do not add legacy event-ID compatibility unless separately revisited.

## Revisit trigger

- Reopen if legacy session recovery becomes required or remaining project terminology is inconsistent.
