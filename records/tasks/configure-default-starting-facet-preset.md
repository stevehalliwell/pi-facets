---
id: 019fb997-926e-7e22-9b56-a9cdb71c2767
name: configure-default-starting-facet-preset
created_at: 2026-07-31T19:12:26.222Z
desc: "Configure project-scoped default starting facet preset with global fallback for new Pi sessions."
tags: []
status: todo
scope: draft
---

## Scope

### Desired outcome

- New sessions apply configured default facet preset.

### In scope

- Read default preset config from trusted project scope, then global fallback.
- Apply resolved preset when a new session starts.

### Out of scope

- Automatic facet inference or model switching.

### Existing behavior to preserve

- Explicit session selections override default behavior.
- Project facet discovery precedes global fallback.

### Acceptance

- Valid project default wins over valid global default.
- Missing or invalid project default silently falls through to valid global default.
- Missing or invalid global default starts with no facets.
- Explicit facet selection remains effective.

## Open questions

- Config file format and supported preset-reference syntax.

## Decisions

- New-session resolution is project default → global default → no facets.
- Invalid configuration falls through silently; status shows resulting state.

## Notes

- Captured future work; implementation not authorized.
