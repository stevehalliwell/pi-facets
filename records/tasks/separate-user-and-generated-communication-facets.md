---
id: 019fb11d-134d-7981-8778-7819833bcd2f
name: separate-user-and-generated-communication-facets
created_at: 2026-07-30T03:41:40.557Z
desc: ""
tags: []
status: done
priority: medium
---

## Scope

### Desired outcome

Define whether pi-facets should distinguish communication addressed to the user from communication appearing in generated text, with independent facet control where useful.

### In scope

- Identify the boundary between user-facing interaction and generated text.
- Explore independently configurable facets for those communication targets.
- Define how explicit facet selection affects each target.
- Preserve composability with existing role, authority, and style facets.

### Out of scope

- Implementing the distinction before behavior and technical shape are agreed.
- Choosing specific communication facets without user agreement.
- Changing existing mode behavior as part of task capture.

### Existing behavior to preserve

- Existing role, authority, and style facets remain usable.
- Communication-target choices must not silently override explicit facet selections.

### Acceptance

- [TBD: agreed definitions for user communication and generated text]
- [TBD: agreed independent facet model and precedence behavior]
- [TBD: observable checks for each supported communication target]

## Open questions

- Which outputs count as communication with the user versus generated text?
- Which facets should be independently controllable for each target?
- Can one facet apply to both targets, or must every facet declare its target?
- How should conflicting target-specific and shared selections resolve?
- Where should target-specific state and component definitions live?

## Decisions

- Capture as future work; keep `status: todo` and `scope: draft` until refined.
- Treat independent control as a possibility to evaluate, not an implementation commitment.
- Defer target-specific facets until concrete communication-target pain or artifact-style conflict appears; user reconfirmed on 2026-08-01. See `records/decisions/defer-communication-target-facets.md`.

## Plan

- Refine terminology, target boundaries, candidate facets, precedence, and acceptance examples.
- Choose the smallest compatible representation after behavior is agreed.
- Implement only after task scope is confirmed.

## Implemented so far

- Future task captured from user request.

## Checks

- No implementation checks; record capture only.

## Review / next slice

- Ready for review: completed; user kept this work deferred on 2026-08-01.
- Revisit only when `communication-target-pain` or `artifact-style-conflict` occurs.

## Notes

- Former task scope: `draft`.

- Avoid conflating how the agent talks to the user with style constraints for text generated on the user's behalf.
