---
id: 019fb0a0-0ba5-75bb-a254-8b74966c1c09
name: create-initial-skills
created_at: 2026-07-30T01:25:06.597Z
desc: ""
tags: []
status: done
priority: medium
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

- Four valid independently invokable skill files exist at the declared paths.
- Each skill uses valid Pi frontmatter with quoted, trigger-rich `description` and lowercase hyphenated `name`.
- Automatic discovery and explicit `/skill:name` invocation remain available.
- Each skill has ordered workflow steps with observable completion criteria, concise output shape, and clear positive boundaries.
- Descriptions distinguish workflows with minimal overlap.
- No skill duplicates mode content, project facts, tool policy, or Attendant lifecycle.
- Framework-specific references remain deferred.
- Skill-craft frontmatter/word-count checks, `npm test`, and `npm run check` pass.

## Open questions

- None for this implementation slice.

## Decisions

- Implement four self-contained workflows; target under 1,000 words per `SKILL.md`.
- Split into additional files only when branch-specific workflow or reference content earns separate loading; no split is planned initially.
- Keep skills model-invokable and command-invokable; do not set `disable-model-invocation`.
- Use skill-craft guidance for rich trigger descriptions, completion criteria, information hierarchy, pruning, and validation.
- Defer StoryBrand, positioning, and other framework references.

## Plan

- Create `backlog-refinement`, `competitor-analysis`, `website-messaging`, and `technical-review` skill files.
- Define each workflow's trigger, boundaries, ordered procedure, completion checks, and output contract.
- Validate frontmatter, word counts, relative links, package discovery, and project tests.

## Implemented so far

- Task captured from implementation brief.
- Refinement agreed: workflow depth, invocation, split policy, boundaries, references, and acceptance checks.
- Added four self-contained, model-invokable and command-invokable skills.
- Added trigger-rich descriptions, ordered workflows, completion criteria, output shapes, and scope boundaries.
- Deferred framework references; no extra files needed.

## Checks

- Skill-craft frontmatter validation passed for all four skills.
- Skill-craft word counts: backlog 320, competitor 285, messaging 301, technical 313.
- `npm test` — 12 tests passed.
- `npm run check` — passed.

## Review / next slice

- Approved and complete.
- Next: refine next pivotal draft task.

## Notes

- Former task scope: `agreed`.

- Keep skill descriptions short and discriminative.
