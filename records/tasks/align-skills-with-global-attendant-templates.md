---
id: 01a01cc4-d855-7ea0-888e-c0182fd46d6b
name: align-skills-with-global-attendant-templates
created_at: 2026-08-20T01:24:17.622Z
desc: Align project task templates, schema, and task-aware skills with updated
  global Pi Attendant templates.
tags: []
status: done
scope: agreed
---

## Scope

### Desired outcome

- Project task-aware skills support current global Pi Attendant capture, refinement, and ready-state conventions while remaining compatible with this project's declared legacy schema.

### In scope

- Update task-state instructions in project backlog capture, backlog refinement, and implementation skills.
- Validate changed skill frontmatter and repository checks.

### Out of scope

- Migrate existing task records or replace this project's Attendant schema/templates.
- Change global Pi skills or templates.

### Existing behavior to preserve

- This project currently declares `todo`/`scope: draft|agreed`; skills must retain that fallback.
- Prefer global `needs-refinement` then `todo` workflow where that status exists.

### Acceptance

- No task-aware project skill hard-codes the retired `todo` plus `scope: draft` capture flow as its only behavior.
- Changed skills pass frontmatter validation and repository checks.

## Refinement needed

- None; global templates define the preferred states and current schema supplies a clear compatibility fallback.

## Open questions

- [None]

## Decisions

- 2026-08-20: Keep project schema and historical records unchanged; make skills schema-aware rather than migrating local Attendant data.

## Plan

1. Update state handling in three task-aware skills.
2. Validate frontmatter and run repository checks.
3. Review diff and mark ready for review.

## Implemented so far

- Updated `.pi/skills/backlog-capture/SKILL.md` for `needs-refinement` capture with legacy fallback.
- Updated `.pi/skills/backlog-refinement/SKILL.md` for preferred and legacy state transitions.
- Updated `.pi/skills/implementation/SKILL.md` for schema-aware readiness.
- Updated matching package test assertions.

## Checks

- `node C:/Users/steve/.pi/agent/skills/skill-craft/validate-frontmatter.mjs` for all three changed skills: passed.
- `npm run check`: passed.
- `npm test`: 37 passed.
- `git diff --check`: passed.

## Review / next slice

- Ready for review: approved 2026-08-20; schema-aware skill transitions and test coverage updated.
- Likely next slice/task: none.

## Notes

- Existing projects can declare different task states; each skill must read the schema before using status-dependent logic.
