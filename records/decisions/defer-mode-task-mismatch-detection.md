---
id: 019fb1ed-f8bf-7f94-9986-965b5415fe19
name: defer-mode-task-mismatch-detection
created_at: 2026-07-30T07:29:50.783Z
desc: ""
tags: []
status: accepted
revisit_triggers:
  - mode-mismatch-observed
  - mode-routing-friction
---

## Context

The project direction includes surfacing rare cases where a request does not make sense under the active role, authority, or style facets. No real-world mismatch examples have been observed yet. Designing automatic detection now would require choosing classifier boundaries, mode metadata, and interruption behavior without evidence.

## Decision

Defer mode/task mismatch detection until observed usage provides concrete mismatch examples. Keep the captured task `todo/draft`; do not implement a classifier, prompt injection, dedicated skill, or clarification gate now.

## Options considered

- Prompt-guided assessment: smallest implementation, but behavior and false-positive thresholds remain unvalidated.
- Extension classifier with mode constraints: stronger automatic signal, but adds schema and heuristic complexity before examples exist.
- Dedicated mismatch skill: reusable workflow, but model-routed detection would not be guaranteed.
- Defer: preserves current simple mode behavior and lets real cases define the contract. Accepted.

## Trade-offs / consequences

- No automatic mismatch warning exists yet.
- Existing modes continue guiding behavior without a new interruption path.
- Future implementation can use observed examples to define detection confidence, affected axes, and response shape.

## Affected areas

- `records/tasks/detect-mode-task-mismatch.md` remains draft work.
- Future mode routing, extension behavior, or skill workflow may be revisited after evidence appears.

## Guardrails

- Do not silently change active mode.
- Do not add tool-call restrictions as part of future mismatch work.
- Reopen only with concrete mismatch examples or repeated routing friction.

## Revisit trigger

- `mode-mismatch-observed`: a real request is misaligned with active facets and the current behavior is inadequate.
- `mode-routing-friction`: repeated user confusion or interruption need shows a missing contract.
