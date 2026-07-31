---
id: 019fb655-2867-7015-baee-0cfbb0aee5c1
name: ship-package-mode-examples
created_at: 2026-07-31T04:01:02.055Z
desc: ""
tags: []
status: accepted
revisit_triggers:
  - package-example-maintenance
  - preset-discovery-friction
  - prompt-sample-duplication
---

## Context

The package currently ships three roles, three authorities, and two styles. It ships no presets or prompt templates. Components support project → package → global precedence; presets currently support only project/global sources.

The task needs representative package examples for manual use, discovery tests, and facet-grid documentation.

## Decision

Ship representative package examples:

- Roles: existing `dev-peer`, `pragmatic-collaborator`, `product-owner`, plus `marketing-strategist`, `researcher`, and `delivery-lead`.
- Authorities: existing `advisory`, `recommend-and-proceed`, and `decisive`; add none.
- Styles: existing `concise` and `critical`, plus `exploratory`, `explanatory`, and `structured`.
- Presets: `implementation-review`, `backlog-refinement`, `messaging-strategy`, `research-exploration`, and `delivery-planning`.
- Prompt templates: `explore-options` and `decision-brief`.

Add package preset discovery under `modes/presets/` with precedence project → package → global, matching component precedence. Prompt templates remain one-shot framing inputs and do not mutate facets.

## Options considered

- Ship package examples: chosen. Makes supported composition visible and testable; requires package-preset discovery and prompt-resource registration.
- Test fixtures only: rejected. Does not demonstrate intended user-facing defaults.
- Components/prompts only with global/project presets: rejected. Splits package examples across discovery models and hides supported preset compositions.

## Trade-offs / consequences

- Extension must add package preset source handling and tests.
- Package gains more default resources and maintenance surface.
- Prompt templates may overlap with skills if their content grows too broad.
- Project presets continue overriding package presets; package presets override global presets.

## Affected areas

- `modes/` role, style, and preset Markdown.
- `prompts/` package resources and `package.json` manifest.
- `extensions/mode.ts` preset discovery/source metadata.
- Mode and preset tests, README, and facet-grid examples.

## Guardrails

- Preserve existing component, preset, state, persistence, and prompt-composition behavior.
- Do not add automatic inference, prompt-triggered facet mutation, or new facet axes.
- Prompt templates frame or launch work; skills remain workflow source of truth.
- Keep sample templates short, argument-aware, and non-duplicative.

## Revisit trigger

- Reopen if examples become hard to maintain, package preset precedence causes friction, or prompt samples duplicate skills without distinct value.
