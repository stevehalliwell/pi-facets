---
id: 019fd3ea-6e05-7ce4-95f0-c536293f1cd2
name: revise-backlog-refinement-continuation-guidance
created_at: 2026-08-05T21:53:04.034Z
desc: "Revise backlog-refinement guidance to continue refining backlog items until none remain, then ask the user to change facets; never implement work."
tags:
  - skills
  - backlog
  - refinement
status: done
priority: medium
---

## Desired outcome

- Backlog refinement continues through every eligible backlog item; when none remain, it asks the user to choose a different facet/workflow. It never implements work itself.

## Scope

### In scope

- Define eligible work as tasks with `status: todo` and `scope: draft`.
- Select the oldest eligible item first and refine one item at a time.
- After user agreement, set the item to `scope: agreed`, retain `status: todo`, and continue to the next eligible item.
- Stop for a material decision, blocked item, or explicit user pause.
- When no eligible items remain, state that backlog refinement is complete and ask the user to choose a different facet/workflow through `/facets`.

### Out of scope

- Implementing refined tasks, changing a task to `doing`, or changing facets automatically.
- Adding task-priority fields or changing task-lifecycle status definitions.

### Existing behavior to preserve

- Backlog refinement remains discussion and task-shaping work under the product-owner, advisory, exploratory preset.
- User approval remains required before an item becomes `agreed`.

## Acceptance

- The skill identifies `todo`/`draft` tasks as its eligible backlog and processes them oldest first, one at a time.
- It continues after an agreed item without implementing it.
- It exits only for the stated stop conditions or an empty eligible backlog.
- On an empty eligible backlog, it explicitly asks the user to use `/facets` to select what happens next.
- The skill contains no implementation path.

## Open questions

- None.

## Plan

1. Revise the skill workflow and mode lifecycle for continuous refinement.
2. Validate frontmatter, size, links, and focused package resources.

## Implemented so far

- Rewrote `.pi/skills/backlog-refinement/SKILL.md` for continuous oldest-first processing of `todo`/`draft` tasks.
- Added explicit entry, agreement, continuation, stop, and `/facets` empty-backlog exit behavior.
- Added focused package coverage for eligible status/scope, agreement transition, continuation, `/facets` exit, and no-implementation boundary.

## Checks

- Verified required skill frontmatter and workflow phrases.
- `npm test -- test/package.test.ts` passed (17 tests).
- Skill-craft helper scripts are not present in this repository; no project-local frontmatter validator was available.

## Review / next slice

- Ready for review: complete; maintainer approved continuous refinement and no-implementation boundaries on 2026-08-06.
- Next slice: refine a draft task before any further implementation.

## Notes

- Former task scope: `agreed`.

- Captured at maintainer request after `add-tweaking-preset`.
