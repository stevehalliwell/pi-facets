---
id: 019fb1f0-c18b-77d3-9be1-3282c1ef2045
name: defer-communication-target-facets
created_at: 2026-07-30T07:32:53.259Z
desc: ""
tags: []
status: accepted
revisit_triggers:
  - communication-target-pain
  - artifact-style-conflict
---

## Context

The project could distinguish how the agent talks with the user from style applied to generated artifacts. Current modes inject one composed system prompt, while skills already own task-specific output contracts. No concrete communication-target conflict has appeared yet.

## Decision

Defer communication-target facets until a real pain point demonstrates that skill output contracts and existing modes cannot express the need. Do not add target-specific state, component metadata, or precedence rules now.

## Options considered

- Skills own artifact requirements while modes govern user interaction: smallest compatible model; accepted as the current boundary.
- Target-specific facet state: more expressive, but adds persistence, schema, precedence, and prompt complexity before evidence.
- Target metadata on components: explicit, but expands every component's contract and composition behavior before a use case exists.
- Defer: preserves current architecture and lets observed pain define the contract. Accepted.

## Trade-offs / consequences

- Users cannot persist separate interaction and artifact facet selections yet.
- Skills remain the place for generated-text output contracts.
- A future change can be shaped from concrete examples instead of speculative target semantics.

## Affected areas

- `records/tasks/separate-user-and-generated-communication-facets.md` remains draft work.
- Existing role, authority, style, and skill behavior remains unchanged.

## Guardrails

- Do not silently make artifact text inherit or override interaction facets beyond current prompt behavior.
- Preserve independent explicit role, authority, and style selection.
- Reopen only when a concrete communication-target conflict or repeated artifact-style friction appears.

## Revisit trigger

- `communication-target-pain`: a real task cannot express needed interaction/artifact differences.
- `artifact-style-conflict`: repeated output conflicts show existing skill and mode boundaries are insufficient.
