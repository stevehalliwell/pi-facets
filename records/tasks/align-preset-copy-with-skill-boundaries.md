---
id: 019fd435-9d85-7865-b95a-430a1c8a18fd
name: align-preset-copy-with-skill-boundaries
created_at: 2026-08-05T23:15:11.365Z
desc: "Align editorial-review preset copy with its supplied-source skill boundary."
tags:
  - presets
  - documentation
  - skills
  - editorial
status: done
scope: agreed
depends_on: null
---

## Scope

### Desired outcome

- `editorial-review` preset copy accurately sets expectations for supplied-source claim handling.

### In scope

- Revise `editorial-review` wording so it does not promise factual-source checks beyond supplied sources and unsupported-claim flagging.

### Out of scope

- Changing editorial-review skill behavior.
- Messaging-strategy skill scope, association, or copy; tracked separately in `rename-and-broaden-messaging-strategy-skill`.

### Existing behavior to preserve

- Preset bodies remain short use-case notes and do not duplicate workflow.

### Acceptance

- Approved preset wording accurately reflects supplied-source claim handling without duplicating skill workflow.

## Open questions

- None.

## Decisions

- 2026-08-06: Messaging strategy will be tracked separately: rename and broaden the paired skill, per `rename-and-broaden-messaging-strategy-skill`.
- 2026-08-06: Maintainer approved “supplied-source claim handling” for the editorial-review use-case note.

## Plan

1. Replace the editorial-review use-case note with the approved wording.
2. Confirm the skill boundary remains unchanged and run focused validation.

## Implemented so far

- Audit found two wording boundaries; split the independent messaging scope change into a separate agreed task.
- Updated the editorial-review use-case note with the maintainer-approved “supplied-source claim handling” wording.

## Checks

- Confirmed the approved wording is present and the prior “factual-source checks” claim is absent from the preset.
- `npm test -- test/package.test.ts` passed (17 tests).

## Review / next slice

- Ready for review: complete; maintainer approved the focused copy change on 2026-08-06.
- Likely next slice/task: select another agreed task; messaging strategy remains separately tracked.

## Notes

- This is a documentation/preset-copy gap, not evidence for a new skill.
