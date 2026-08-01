---
id: 019fb0b1-1e26-75e6-8126-b2c818c474de
name: detect-facet-task-mismatch
created_at: 2026-07-30T01:43:45.446Z
desc: "Surface clear request/facet misalignment before substantive work."
tags: []
status: todo
scope: agreed
depends_on:
  - tasks/implement-mode-extension
  - tasks/create-initial-skills
---

## Scope

### Desired outcome

- Active facets provide lightweight steering that surfaces a clear request/facet mismatch before substantive work, without classifier infrastructure or repetitive chatter.

### In scope

- Add one compact alignment instruction to injected facet context only when one or more facets are active.
- On clear conflict with explicit new request, report concern and ask whether to ignore/continue under current facets or change them.
- If no concrete target is identified, direct user to `/facets`.
- If one smallest axis change is clear, use `ask_user_question` to propose it.
- Otherwise proceed silently; topic alone and ordinary task progression do not trigger a notice.
- Rename record from `detect-mode-task-mismatch` to `detect-facet-task-mismatch` and update durable path reference.

### Out of scope

- Extension classifier, facet metadata schema, external model call, or dedicated mismatch skill.
- Automatic tool restrictions or silent facet switching.
- Replacing skill routing or workflow-phase decisions.
- Deterministic testing of model semantic judgment.

### Existing behavior to preserve

- Explicit `/facets` selection and clearing remain user overrides.
- Facets guide behavior; skills own task procedures.
- Tool calls remain unrestricted.
- Active facet instructions remain compact per-turn prompt context.

### Acceptance

- Alignment instruction appears only when one or more active facets exist.
- Instruction requires clear explicit-request conflict before warning; normal aligned work remains silent.
- Warning occurs before substantive work and offers continue-under-current-facets or facet change.
- Targeted change proposes one smallest axis; no target points to `/facets`.
- No automatic state change, tool restriction, classifier, or metadata is added.
- Focused tests cover prompt inclusion/absence and existing explicit override mechanics.
- Manual scenarios cover backlog refinement → implementation, implementation → backlog refinement, clear mismatch, and aligned request.

## Open questions

- None.

## Decisions

- Model judgment guided by compact active-facet instruction is sufficient first implementation.
- Threshold stays deliberately conservative and fuzzy: agent says facets do not align “at all” with explicit new request.
- Mismatch report asks whether user wants to ignore it and continue, giving chance to change facets.
- No target uses `/facets`; a clear smallest target may use `ask_user_question`.

## Plan

1. Locate compact facet-prompt composition and focused tests.
2. Add conditional alignment wording.
3. Rename task record and update durable reference.
4. Add prompt-state tests; document manual behavior scenarios.
5. Run focused and full checks.

## Implemented so far

- Task refinement only; no extension changes.

## Checks

- Refinement confirmed by user on 2026-08-01.

## Review / next slice

- Ready for review: no; ready to select for implementation.
- Likely next slice/task: mark `doing`, then implement compact conditional prompt guidance.

## Notes

- Prompt injection technically occurs each agent start; mismatch behavior must not.
