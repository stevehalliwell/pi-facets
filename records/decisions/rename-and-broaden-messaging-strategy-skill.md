---
id: 019fd4cf-4585-76af-bdf2-74ffebd79e2a
name: rename-and-broaden-messaging-strategy-skill
created_at: 2026-08-06T02:03:01.381Z
desc: "Rename website-messaging to messaging-strategy and broaden it beyond websites."
tags:
  - skills
  - presets
  - messaging
status: accepted
revisit_triggers:
  - messaging-scope
  - skill-compatibility
---

## Context

The `messaging-strategy` preset promises general customer-facing positioning and messaging, but it currently launches the website-specific `website-messaging` skill. The maintainer chose broader support rather than narrowing preset copy.

## Decision

Rename `website-messaging` to `messaging-strategy`, update the preset association, and broaden the workflow from website pages to general customer-facing messaging while retaining website messaging as a supported case.

## Options considered

- Rename and broaden: chosen. Aligns preset and command names with general scope; changes the project skill command.
- Broaden in place: retained existing command compatibility but left a misleading website-specific name.
- Add a separate general skill: retained a narrow website skill but added overlapping resources and maintenance.

## Trade-offs / consequences

- `/skill:website-messaging` is no longer the project command; project references, tests, and documentation must be updated.
- The revised workflow must not expand into website implementation, visual design, autonomous research, or ungrounded positioning claims.

## Affected areas

- `.pi/skills/website-messaging/` renamed and revised.
- `messaging-strategy` preset association, package resource coverage, documentation, and tests.
- Web-implementation cross-reference.

## Guardrails

- Preserve intent branching, evidence-aware messaging, and user choice before final copy.
- Support general customer-facing artifacts while retaining website messaging as one case.
- Keep implementation, design, deployment, and unsupported claims outside the skill.

## Revisit trigger

- `messaging-scope`: general scope becomes too broad or needs splitting.
- `skill-compatibility`: project command rename breaks an expected integration or established usage.
