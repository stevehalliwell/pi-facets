---
name: backlog-refinement
description: "Use when clarifying, fleshing out, scoping, splitting, prioritizing, sequencing, or removing a backlog item before implementation. Use when requirements are vague, acceptance is missing, a task may be oversized, or dependencies are unclear. Produce an implementation-ready task shape; do not implement the task."
---

# Backlog refinement

Turn one backlog item into an independently reviewable, implementation-ready task without silently inventing product decisions.

## Workflow

1. Anchor the item. Read the current task and state its desired outcome, user or business value, and current status. Done when the item has one clear outcome.
2. Inspect context. Check related records, existing behavior, dependencies, and adjacent work. Separate confirmed facts from assumptions. Done when relevant constraints and preserved behavior are listed.
3. Shape the boundary. Define in scope, out of scope, affected flows, likely implementation path, and split points. Keep one independently reviewable outcome per task. Done when an implementer can identify what changes and what does not.
4. Define acceptance. Write observable behavior checks, edge cases, and required validation. Prefer examples over vague quality words. Done when completion can be judged without reconstructing this discussion.
5. Resolve decisions. Label recommendations and open questions. Ask for decisions that change behavior, scope, compatibility, or acceptance. Done when unresolved choices are explicit and no TBD is treated as permission to choose.
6. Summarize the refined task. Provide outcome, boundaries, technical shape, ruled-out alternatives, acceptance, risks, and next slice. Done when the user can confirm or correct the shape.

## Output shape

```text
Task refinement: <name>

Confirmed:
- <facts and preserved behavior>

Proposed:
- <implementation shape and recommendation>

Open:
- <decisions required, or None>

Acceptance:
- <observable checks>

Need from you: confirm, correct, or choose <decision>.
```

After agreement, state whether the task is ready for implementation, blocked on a decision, or needs a separate trade-off review.

## Rules

- Refine one task at a time.
- Preserve unresolved product behavior as an open question.
- Split work when acceptance, ownership, or implementation path would otherwise be ambiguous.
- Keep prioritization recommendations separate from implementation authorization.
- Use a broader trade-off review for cross-feature architecture, public API, migration, security, or cost decisions.
- Do not edit implementation files during refinement.
