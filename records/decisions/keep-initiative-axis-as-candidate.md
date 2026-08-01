---
id: 019fbbc8-ae79-7f1f-a1f6-758abcf58ef7
name: keep-initiative-axis-as-candidate
created_at: 2026-08-01T05:25:19.097Z
desc: ""
tags: []
status: accepted
revisit_triggers:
  - initiative-axis-evidence
  - cross-domain-action-scope-friction
---

## Context

Frontend and implementation discussions exposed recurring friction when Pi goes beyond a literal request: broad test runs during live CSS iteration, scope expansion, unsolicited cleanup, or autonomous investigation. Existing axes do not cleanly express this behavior. Role is perspective, style is communication, and authority is decision ownership.

## Decision

Keep `initiative` as a candidate fourth facet axis. Do not add persistent state, components, presets, status UI, or suggestion behavior yet. Use workflow guidance and existing authority contracts while gathering further evidence.

## Options considered

- Workflow policy only: smallest present model; weak reusable/manual control outside a selected workflow.
- Expand authority: avoids a fourth axis; conflates approval ownership with action breadth.
- New `initiative` axis now: directly expresses how far Pi goes beyond literal request; adds state, UI, persistence, preset, and suggestion complexity.
- Defer entirely: no model cost; leaves repeated action-scope friction unaddressed.

## Trade-offs / consequences

- Current behavior stays simpler but may require repeated workflow-specific guidance.
- Future evidence must distinguish initiative from task workflow and decision authority.
- Candidate semantics are constrained, pragmatic, and autonomous: how broadly Pi investigates, changes, cleans up, and validates before seeking direction.

## Affected areas

- Facet component schema and discovery.
- Preset composition, session persistence, status indicator, and mismatch suggestions.
- Implementation and frontend/visual iteration workflows.

## Guardrails

- `initiative` would guide behavior only; it must not gate tools or change execution permissions.
- Preserve role as perspective, authority as decision ownership, and style as communication.
- Do not implement a new axis from a single workflow example.

## Revisit trigger

- `initiative-axis-evidence`: recurring examples across distinct workflows show need for manual action-breadth control.
- `cross-domain-action-scope-friction`: existing authority and skill guidance cannot prevent over- or under-action without conflation.
