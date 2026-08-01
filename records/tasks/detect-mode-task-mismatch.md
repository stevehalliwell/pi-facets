---
id: 019fb0b1-1e26-75e6-8126-b2c818c474de
name: detect-mode-task-mismatch
created_at: 2026-07-30T01:43:45.446Z
desc: ""
tags: []
status: todo
scope: draft
depends_on:
  - tasks/implement-mode-extension
  - tasks/create-initial-skills
---

## Scope

### Desired outcome

Detect when a request appears misaligned with active mode settings and surface that mismatch instead of silently proceeding as if alignment exists.

### In scope

- Define what active role, authority, and style settings can constrain or signal.
- Detect likely mismatch between request and current mode configuration.
- Surface mismatch before substantive response when explicit intent plus project/task context gives high confidence.
- Explain one highest-impact misaligned axis and why.
- Suggest smallest axis change first; preserve other facets.
- Passive notice leaves user to use `/facets`; targeted change proposal uses `ask_user_question`.
- Never silently switch.
- Preserve explicit user override ability.
- Keep behavior compatible with independently invoked skills.

### Out of scope

- Automatic tool restrictions.
- Silent mode switching.
- Replacing skill routing or workflow-phase decisions.
- Broad intent classification without a mode-relevance reason.

### Existing behavior to preserve

- User can explicitly select or clear modes.
- Modes guide behavior; skills own task procedures.
- Tool calls remain unrestricted.

### Acceptance

- Representative aligned and misaligned requests are identified in tests or manual checks.
- Mismatch signal explains one relevant axis, reason, and smallest proposed change.
- Explicit intent plus context, not topic alone, meets suggestion threshold.
- Passive and targeted suggestion paths behave as agreed.
- It does not silently switch facets.
- False-positive handling and explicit overrides are documented.

## Open questions

- What counts as mismatch for each current axis?
- Should detection happen in extension, global routing guidance, or a dedicated skill?
- How should it interact with a future `initiative` axis, if adopted?

## Decisions

- Automatic mismatch detection is desired.
- Mismatch response is clarify-first.
- Detection must not silently change facets or restrict tools.
- Suggestions require explicit intent plus context; topic-only inference is insufficient.

## Plan

- Review Pi routing/skill invocation capabilities.
- Define examples and response contract.
- Implement conservative detection at the chosen boundary.
- Add false-positive and explicit-override checks.

## Implemented so far

- Task captured from deferred-question review.

## Checks

- Not started.

## Review / next slice

- Ready for review: no; scope remains draft.
- Likely next slice/task: define mismatch examples and response behavior.

## Notes

- “Trip up” is intentionally treated as a visible mismatch signal, not an automatic mode change.
