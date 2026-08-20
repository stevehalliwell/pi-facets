---
id: 019fbc05-4386-70d7-8bd5-9ee5e26501b4
name: reconsider-tool-call-restrictions
created_at: 2026-08-01T06:31:29.414Z
desc: "Review whether Facets should ever restrict or gate Pi tool calls."
tags: []
status: done
priority: medium
---

## Scope

### Desired outcome

- Decide whether existing no-tool-gating policy remains correct or should be changed for evidenced use cases.

### In scope

- Review user safety, Pi permission model, project configuration, implementation cost, and observed failure cases.
- Compare behavioral guidance with enforceable restrictions.

### Out of scope

- Adding restrictions before a superseding accepted decision.
- Replacing Pi/project permission configuration without evidence.

### Existing behavior to preserve

- pi-facets does not limit, gate, or enforce tool calls.
- Explicit facet behavior remains prompt guidance, not permission control.

### Acceptance

- Decision records retain, revise, or skip tool-gating direction.
- Any change defines threat model, user controls, failure behavior, and compatibility impact.

## Open questions

- What concrete harm cannot be addressed by existing Pi/project permissions or workflow guidance?
- Would facet-driven gating create confusing hidden execution differences?

## Decisions

- Superseded/closed on 2026-08-01 by accepted `do-not-limit-tool-calling` decision and current facet boundary: tool permissions remain Pi/project configuration.

## Plan

- Gather concrete safety or workflow failures.
- Run security-aware trade-off review before any implementation task.

## Implemented so far

- Review closed; no implementation authorized.

## Checks

- User confirmed task is defunct on 2026-08-01.

## Review / next slice

- Ready for review: completed; no facet tool-gating work remains.
- Likely next slice/task: none.

## Notes

- Former task scope: `draft`.

- Draft review task; does not authorize tool restrictions.
