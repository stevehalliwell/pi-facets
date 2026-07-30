---
id: 019fb0a0-0ba5-75bb-a254-8b74966c1c09
name: create-initial-skills
created_at: 2026-07-30T01:25:06.597Z
desc: ""
tags: []
status: todo
scope: draft
depends_on: []
---

## Scope

### Desired outcome

Add four independently invokable stub skills covering the initial workflow categories.

### In scope

- `skills/backlog-refinement/SKILL.md`.
- `skills/competitor-analysis/SKILL.md`.
- `skills/website-messaging/SKILL.md`.
- `skills/technical-review/SKILL.md`.
- Review Pi skill documentation and existing skill conventions before writing files.
- Give each skill a short discriminative trigger, workflow boundary, and expected deliverable.
- Keep framework-specific references deferred unless required by a skill.

### Out of scope

- Full workflow implementation or framework reference libraries.
- Mode definitions, project facts, or tool-policy duplication.
- Website implementation/review skills.

### Existing behavior to preserve

- Skills remain task-specific processes, not persistent personas.
- Rare/specialized workflows may remain manual-only.

### Acceptance

- Four valid independently invokable skill files exist.
- Descriptions distinguish workflows with minimal overlap.
- Each skill states what it does not cover where confusion is likely.
- No skill duplicates mode content or project context.

## Open questions

- Exact Pi skill metadata and invocation conventions require confirmation from runtime docs.
- Whether website-messaging references belong in first implementation slice.

## Decisions

- Start with stubs; add detailed references only when workflow use proves need.

## Plan

- Review Pi skill documentation and examples.
- Confirm Pi skill format.
- Write four minimal SKILL.md files.
- Check automatic/manual invocation behavior.

## Implemented so far

- Task captured from implementation brief.

## Checks

- Not started.

## Review / next slice

- Ready for review: no; scope remains draft.
- Likely next slice/task: agree skill metadata and stub depth.

## Notes

- Keep skill descriptions short and discriminative.
