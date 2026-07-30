---
id: 019fb0ae-e94b-75a0-8c84-5252ae97b2f5
name: deferred-mode-behavior-direction
created_at: 2026-07-30T01:41:20.843Z
desc: ""
tags: []
status: accepted
revisit_triggers:
  - preset-semantics
  - mode-mismatch-response
  - project-mode-resolution
---

## Context

The initial implementation brief listed several deferred behavior questions. User reviewed them and clarified project direction. Initial preset semantics and mismatch response are now agreed; exact implementation contracts remain task-level open questions.

## Decision

- Support project-local mode definitions under project `.pi/modes/`.
- Project-local components shadow same-named global components; unmatched components fall back to global. Do not merge component files.
- Add automatic detection when a request appears misaligned with active mode settings; explain mismatch, suggest a likely mode or override, and clarify before proceeding.
- Do not enforce execution authority through tool profiles or tool-call restrictions.
- Do not show active mode persistently in the UI for now; keep it queryable.
- Treat workflow phase as a skills concern, not a mode axis.
- Record mode changes in the transcript so session navigation, including slash-tree behavior, retains mode history through compact structured events.

## Options considered

- Project-local modes: accepted over global-only configuration because projects need local behavior.
- Local/global resolution: project `.pi/modes/` shadows same-named global components with global fallback.
- Persistent UI display: deferred; queryability is sufficient for now.
- Workflow phase as mode axis: rejected; skills own workflow progression.
- Tool profiles: rejected; Pi tool behavior remains unchanged.
- Transcript omission: rejected; mode history matters for session navigation and context.
- Full Markdown snapshots: deferred; compact structured events are sufficient initially.

## Trade-offs / consequences

- Mode resolution must distinguish global and project-local definitions, with local shadowing and global fallback.
- Mismatch detection needs a transparent response contract and conservative classification.
- Transcript events become part of mode-change behavior; payloads retain action, before/after refs, source scope, and relevant preset name.
- Users can inspect state on demand rather than relying on persistent UI.

## Affected areas

- Mode extension discovery, state, commands, and transcript integration.
- Project-local configuration layout.
- Skills and mode-routing behavior.
- Tests and documentation.

## Guardrails

- Do not silently change active mode based on mismatch detection.
- On mismatch, clarify before proceeding; user chooses mode change, override, or clarification.
- Do not add tool-call restrictions.
- Keep workflow-phase state inside skills.
- Preserve query commands for active mode inspection.
- Keep transcript payloads compact; do not duplicate full mode Markdown.

## Revisit trigger

- `preset-semantics`: preset identity, scope, precedence, or composition needs a different model.
- `mode-mismatch-response`: detection produces noisy, confusing, or unsafe behavior.
- `project-mode-resolution`: global/project discovery or local-shadow precedence causes maintenance issues.
