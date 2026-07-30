---
status: accepted
revisit_triggers:
  - preset-semantics
  - preset-scope-resolution
id: 019fb0ab-f7c4-7ea6-ab7d-7aa7e0b34fe1
name: composable-named-presets
created_at: 2026-07-30T01:38:07.940Z
desc: ""
tags: []
---

## Context

pi-facets is being designed around composable role, authority, and style components. User confirmed that shorthand named sets of those components are desirable at both global and project scopes, then selected named compositions as the first implementation shape.

## Decision

Support named mode presets as a thin composition layer over individual components. Presets should be available from global configuration and project-local configuration. First implementation treats each preset as a named component-reference mapping selected explicitly through the mode commands.

## Options considered

- Require users to select each axis manually: rejected as the only interaction; useful for direct overrides but insufficient for repeatable setups.
- Store complete duplicated mode text in presets: rejected; creates drift and weakens composability.
- Store named references to components: chosen; keeps presets small and extensible.

## Trade-offs / consequences

- Preset discovery needs global/project scope resolution and collision rules.
- Preset selection must coexist with direct axis selection.
- Presets add configuration validation and persistence behavior.
- First implementation needs explicit preset selection/inspection, but not active-profile semantics.

## Affected areas

- Mode extension commands and session state.
- Global and project configuration layout.
- Mode component discovery and validation.
- Tests and documentation.

## Guardrails

- Presets reference components; do not duplicate component content.
- First implementation uses named compositions with explicit select/show/list behavior.
- Do not add nested presets, inheritance, aliases, or versioned registry behavior initially.
- Presets do not infer behavior, change models, or restrict tool calls.
- Direct user selection remains available as an override path.

## Revisit trigger

- Preset scope, precedence, or composition creates demonstrated maintenance or usability problems.
