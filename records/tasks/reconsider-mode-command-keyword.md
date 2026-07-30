---
id: 019fb2b0-212c-74ea-b575-95fb7fb4954d
name: reconsider-mode-command-keyword
created_at: 2026-07-30T11:01:55.117Z
desc: ""
tags: []
status: todo
scope: draft
depends_on: []
---

## Scope

### Desired outcome

- Decide whether `mode` remains the command keyword or should be replaced with a less contentious name.

### In scope

- Identify concerns with `mode` terminology.
- Compare candidate replacement keywords and compatibility costs.
- Recommend a keyword or explicitly retain `mode`.
- Define migration/alias behavior if keyword changes.

### Out of scope

- Changing command keyword or docs before decision is agreed.

### Existing behavior to preserve

- Current mode selection, persistence, preset, and help behavior until decision is made.

### Acceptance

- Agreed keyword decision recorded.
- If changed, migration and compatibility behavior defined.

## Open questions

- What makes `mode` contentious: ambiguity, existing Pi terminology, user mental model, or another concern?
- Which replacement keywords are acceptable?
- Should `/mode` remain as compatibility alias if renamed?

## Decisions

- None yet; draft pending terminology review.

## Plan

- Review candidate terminology and trade-offs.
- Ask user to select/confirm direction.
- Record durable decision before implementation.

## Implemented so far

- Future todo captured from user request.

## Checks

- Not started.

## Review / next slice

- Ready for review: no; terminology decision required.
- Likely next slice/task: terminology/trade-off review.

## Notes

- Do not rename command until decision is agreed.
