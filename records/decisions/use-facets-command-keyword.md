---
id: 019fb61e-a3ae-74d5-aa9a-afcd79e83d91
name: use-facets-command-keyword
created_at: 2026-07-31T03:01:29.134Z
desc: ""
tags: []
status: accepted
revisit_triggers:
  - facets-command-collision
  - command-keyword-usability
---

## Context

`/mode` is current pi-facets slash command. It controls independent role, authority, style, and preset selections. User concern: `mode` is broad and could collide with an unrelated extension or future Pi command.

Pi currently has no built-in `/mode`, but duplicate extension command names are retained with numeric suffixes such as `/name:1` and `/name:2`.

## Decision

Use `/facets` as canonical pi-facets slash command. Remove `/mode`; do not retain a compatibility alias.

This decision covers public command naming only. Internal mode terminology, persisted state, transcript event names, component axes, and preset semantics remain unchanged.

## Options considered

- `/facets`: chosen. Unique, matches product architecture, and describes multi-axis controls; less familiar than `mode`.
- `/mode`: rejected. Familiar, but broad and more collision-prone.
- `/profile`: rejected. Suggests complete preset rather than independently selectable facets.
- `/persona`: rejected. Overemphasises role and misrepresents authority/style controls.
- `/facets` with `/mode` alias: rejected. Preserves compatibility but leaves broad command in the public surface and adds duplicate documentation/autocomplete.

## Trade-offs / consequences

- Existing `/mode` invocations stop working after implementation.
- Documentation, help text, tests, and command registration must use `/facets`.
- Persisted mode state remains compatible because command name is not part of stored state.
- Future command collisions remain possible, but the chosen name has narrower ownership intent.

## Affected areas

- `extensions/mode.ts` command registration, usage messages, and help text.
- Tests covering command invocation and rejected commands.
- `README.md` and implementation brief command examples.
- `records/tasks/reconsider-mode-command-keyword.md` and follow-up implementation task.

## Guardrails

- The command rename is complete; internal terminology is governed separately by `records/decisions/rename-mode-internals-to-facets.md`.
- Storage-folder naming is governed separately by `records/decisions/use-facets-storage-paths.md`.
- Do not add a `/mode` alias or automatic command migration.
- Preserve component selection, preset behavior, persistence, restoration, and prompt composition.

## Revisit trigger

- Reopen if `/facets` collides with another command or users find keyword unclear/unusable.
