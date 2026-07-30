---
status: accepted
revisit_triggers: []
id: 019fb0a8-c0f6-7f98-bfd0-7c0691df5c49
name: do-not-limit-tool-calling
created_at: 2026-07-30T01:34:37.301Z
desc: ""
tags: []
---

## Context

The initial ChatGPT-produced implementation brief includes tool policy and execution-authority concepts. User clarified that pi-facets should not limit tool calling.

## Decision

pi-facets does not limit, gate, or enforce tool calls. It uses Pi's existing tool availability and permission behavior unchanged.

## Options considered

- Add extension-enforced tool profiles: rejected; unnecessary scope and unwanted restriction.
- Leave tool behavior to Pi: chosen; keeps pi-facets focused on composable modes and skills.

## Trade-offs / consequences

- Execution authority is not a pi-facets behavior axis.
- Any future tool restriction requires explicit user agreement and a new decision.
- Brief references to tool policy are treated as exploratory design context only.

## Affected areas

- Mode extension composition.
- Mode component content.
- README and project guidance.
- First-milestone task boundaries.

## Guardrails

- Do not add tool-call gating, permission checks, or tool profiles implicitly.
- Preserve normal Pi tool behavior.

## Revisit trigger

- User explicitly requests tool restrictions or permission profiles.
