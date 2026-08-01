---
id: 019fbc05-437d-7822-b495-f614b19d05ed
name: evaluate-facet-model-switching
created_at: 2026-08-01T06:31:29.405Z
desc: "Review whether facet selections should influence Pi model choice."
tags: []
status: todo
scope: draft
---

## Scope

### Desired outcome

- Decide whether model switching belongs in Facets, should remain external Pi configuration, or should be skipped.

### In scope

- Review outcome benefit, cost/latency, provider availability, explicit user control, session persistence, and failure behavior.
- Compare role/workflow prompt guidance with model selection.

### Out of scope

- Implementing automatic model switching before agreement.
- Changing provider credentials, billing, or Pi-wide model configuration.

### Existing behavior to preserve

- Facets currently do not switch models.
- User can select Pi model through existing Pi controls.

### Acceptance

- Decision records implement, defer with evidence trigger, or skip.
- Any approved design defines selection precedence, visibility, fallback, and explicit override.

## Open questions

- Which recurring workflows demonstrably need different model capability/cost profiles?
- Would model changes increase surprise, token cost, or session inconsistency?

## Decisions

- Model switching is deferred pending evidence or concrete need.

## Plan

- Gather comparative workflow evidence and user pain.
- Run trade-off review before implementation.

## Implemented so far

- None.

## Checks

- Not started.

## Review / next slice

- Ready for review: no; no concrete use case captured.
- Likely next slice/task: revisit when a workflow requires different model profile.

## Notes

- Draft review task; separate from Pi-level model configuration.
