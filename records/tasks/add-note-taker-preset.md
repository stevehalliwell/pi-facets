---
id: 019fd3d2-ebf8-74d6-ab76-4b702456daa8
name: add-note-taker-preset
created_at: 2026-08-05T21:26:51.076Z
desc: "Add a note-taker facet preset."
tags:
  - facets
  - presets
  - notes
status: done
priority: medium
---

## Desired outcome

- Add a session-only note-taker preset and skill for faithful non-task capture without persistent writes or implementation.

## Scope

### In scope

- Add a `note-taker` role that preserves supplied meaning and distinguishes observations, decisions, and follow-ups without turning notes into work.
- Add a local `note-taking` skill that acknowledges and structures notes in the current session only.
- Add a `note-taker` preset: `note-taker + recommend-and-proceed + concise`, associated with `note-taking`.
- Flag potential task or decision follow-up without recording it unless the user explicitly switches workflows.
- Add required resource coverage and facet-grid documentation.

### Out of scope

- Writing files, task records, handoffs, or Attendant collections.
- Implementing suggested work or replacing explicit backlog capture.

### Existing behavior to preserve

- `backlog-capture` remains the explicit workflow for durable draft task records.
- Notes remain session-only unless the user explicitly selects another workflow.

## Acceptance

- Selecting `note-taker` presents the agreed composition and offers session-only note capture.
- The workflow returns a concise structured note without persistent writes or implementation.
- Potential tasks and decisions remain unrecorded unless the user explicitly switches workflows.
- Package resource coverage and facet-grid documentation reflect the new resources.

## Open questions

- None.

## Plan

1. Add the note-taker role and local note-taking skill.
2. Add the note-taker preset and associate the skill.
3. Add package/resource coverage and facet-grid documentation; run focused validation.

## Implemented so far

- Task refined and approved on 2026-08-05.
- Added `.pi/facets/roles/note-taker.md` with session-only, faithful-capture stance.
- Added `.pi/skills/note-taking/SKILL.md` with explicit session-only mode lifecycle, structured-note output, and no-persistence boundary.
- Added `.pi/facets/presets/note-taker.md` with `note-taker + recommend-and-proceed + concise` and `note-taking` association.
- Added facet-grid documentation and package resource/composition/association coverage.

## Checks

- Verified role, skill, and preset presence and required frontmatter fields.
- `npm test -- test/package.test.ts` passed (15 tests).
- Skill-craft helper scripts are not present in this repository; no project-local frontmatter validator was available.

## Review / next slice

- Ready for review: complete; maintainer approved session-only capture and preset integration on 2026-08-06.
- Next slice: select another agreed task.

## Notes

- Former task scope: `agreed`.

- Captured from maintainer request during preset/workflow audit.
