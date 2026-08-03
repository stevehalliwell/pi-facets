---
id: 019fc54f-4d6f-7804-ad8c-752cd0c97a54
name: preset-skill-confirmation
created_at: 2026-08-03T01:48:14.000Z
desc: "Prompt after explicit preset selection before launching associated skill."
tags:
  - presets
  - skills
  - interaction
status: accepted
revisit_triggers:
  - preset-skill-friction
  - synthetic-user-message-provenance
  - noninteractive-preset-selection
---

## Context

Presets currently apply role, authority, and style only. Some presets should guide users into a paired temporary skill without injecting workflow into persistent facet context.

## Decision

When user explicitly selects a preset that declares an associated skill, Pi applies preset facets, then asks whether to run named skill now. If user confirms, extension calls `pi.sendUserMessage("/skill:<name>")`. If declined, preset remains active and no skill runs.

Default presets, restored session state, and non-interactive preset application never prompt or launch a skill automatically.

## Options considered

- Composite command: rejected. Adds separate command instead of improving preset selection flow.
- Automatic launch on preset selection: rejected. Starts temporary workflow without confirmation and creates default-preset/session-restore side effects.
- Confirmed launch after explicit selection: chosen. Preserves user control while letting presets guide paired workflow.

## Consequences

- Skill launch appears as an extension-originated user message in transcript after explicit confirmation.
- Preset association requires validated skill discovery and actionable missing-skill error behavior.
- Prompt association is out of first version. Prompts remain standalone request frames.

## Guardrails

- Preset selection applies facets before confirmation.
- No workflow procedure is copied into facets or presets.
- Presets do not associate prompts in first version.
- User can decline without changing active preset.
- No tool restrictions or automatic facet inference are introduced.

## Revisit triggers

- `preset-skill-friction`: confirmation or launch flow creates repeat friction.
- `synthetic-user-message-provenance`: transcript attribution proves confusing or harmful.
- `noninteractive-preset-selection`: JSON, print, RPC, default, or restored selection behavior needs a different model.
