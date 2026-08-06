---
id: 019fd4cf-ebec-7edf-9eb3-60c753279f90
name: rename-and-broaden-messaging-strategy-skill
created_at: 2026-08-06T02:03:43.980Z
desc: "Rename website-messaging to messaging-strategy and broaden its customer-facing messaging workflow."
tags:
  - skills
  - presets
  - messaging
status: done
scope: agreed
depends_on: null
---

## Scope

### Desired outcome

- The `messaging-strategy` preset launches a same-named skill for general customer-facing messaging, with website messaging retained as one supported case.

### In scope

- Rename `.pi/skills/website-messaging/` and its skill frontmatter to `messaging-strategy`.
- Broaden trigger language, framing, outputs, and rules from website pages to customer-facing messaging artifacts.
- Update preset association, cross-references, documentation, package coverage, and focused tests.

### Out of scope

- Website implementation, visual design, deployment, autonomous research, or unsupported positioning claims.
- Keeping `/skill:website-messaging` as a project compatibility alias.

### Existing behavior to preserve

- Explicit intent branches: diagnosis for review/audit requests and copy directions for supplied wording.
- Evidence-aware claims, user choice before final copy, and website messaging as a supported case.

### Acceptance

- `messaging-strategy` preset associates with a local `messaging-strategy` skill.
- The skill clearly supports general customer-facing messaging and website messaging without claiming implementation or research scope.
- No project `website-messaging` skill or reference remains.
- Focused resource-discovery and package tests pass.

## Open questions

- None.

## Decisions

- 2026-08-06: `rename-and-broaden-messaging-strategy-skill` accepted. See `records/decisions/rename-and-broaden-messaging-strategy-skill.md`.

## Plan

1. Rename and revise the skill while preserving intent branches and guardrails.
2. Update preset association and all project references.
3. Run focused resource-discovery and package tests.

## Implemented so far

- Renamed `.pi/skills/website-messaging/` to `.pi/skills/messaging-strategy/` and changed its frontmatter name.
- Broadened triggers, context, review output, and rules to customer-facing messaging while retaining website messaging as a supported case.
- Updated the messaging-strategy preset association, web-implementation cross-reference, package resource coverage, and intent-branch test.

## Checks

- Confirmed the new skill exists, the prior project skill path is absent, and no live project `website-messaging` reference remains.
- `npm test -- test/package.test.ts` passed (17 tests).

## Review / next slice

- Ready for review: complete; maintainer approved the renamed command and expanded messaging boundary on 2026-08-06.
- Likely next slice/task: select another agreed task.

## Notes

- The public project command changes from `/skill:website-messaging` to `/skill:messaging-strategy`.
