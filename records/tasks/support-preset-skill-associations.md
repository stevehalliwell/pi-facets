---
id: 019fc582-e1eb-7252-9bb5-c1e01691d886
name: support-preset-skill-associations
created_at: 2026-08-03T02:45:16.907Z
desc: "Allow explicitly selected facet presets to declare associated skills and offer confirmed skill launch."
tags:
  - facets
  - presets
  - skills
  - extension
status: done
scope: agreed
---

## Scope

### Desired outcome

- An explicitly selected preset may declare an associated skill; after applying facets, Pi asks whether to run it and launches it only after confirmation.

### In scope

- Extend preset parsing/validation for optional associated-skill metadata.
- Validate target skill discovery with actionable missing-skill errors.
- Add explicit-selection confirmation flow that calls `pi.sendUserMessage("/skill:<name>")` on approval.
- Preserve preset application if user declines.
- Ensure default presets, restored session state, and non-interactive selection never prompt or launch skills.

### Out of scope

- Preset-associated prompts.
- Automatic skill launch without confirmation.
- Workflow instructions in facet/preset Markdown.
- Tool restrictions, automatic facet inference, or model switching.

### Existing behavior to preserve

- Presets currently compose role, authority, and style and remain explicit user overrides.
- Skills load through Pi’s normal `/skill:` expansion.
- Existing presets without associated skill remain valid and unchanged.

### Acceptance

- Optional `skill` frontmatter accepts one valid Pi skill name; existing presets without it remain valid.
- Explicit TUI selection applies preset facets first.
- Available associated skill triggers confirmation; approval sends `/skill:<name>` through `pi.sendUserMessage`, declining leaves preset active.
- Unavailable associated skill applies facets, shows actionable error, and does not prompt/launch.
- RPC, JSON, print, default, and restored paths never prompt or launch associated skill.
- Launch uses user message only; no additional custom transcript entry or custom skill loading.
- Focused parser/selection tests plus `npm run check` pass.

## Open questions

- None.

## Decisions

- 2026-08-03: Explicit selection applies preset then asks before launching associated skill; default/restored/non-interactive selection never launches. See `records/decisions/preset-skill-confirmation.md`.
- 2026-08-03: Prompt association is out of first version.
- 2026-08-03: Use optional preset `skill` field containing one Pi skill name.
- 2026-08-03: Missing associated skill does not invalidate facet selection; apply facets, show actionable error, skip confirmation and launch.
- 2026-08-03: Confirmation is TUI-only. RPC, JSON, print, default, and restored paths never launch skill.
- 2026-08-03: Confirmed skill launch uses user message only; no extra extension audit entry or custom skill loading.

## Plan

1. Extend preset type/parser for optional `skill` field and syntax validation.
2. Resolve available skills at explicit selection.
3. Implement TUI confirmation and confirmed `pi.sendUserMessage` launch.
4. Add focused parser/selection/mode tests; run project checks.

## Implemented so far

- Added optional `skill` to preset model/parser with Pi skill-name syntax validation.
- Added focused parser coverage for valid and invalid associated skill names.
- Explicit TUI selection now resolves associated skill command availability after applying preset; missing targets show actionable error without undoing facet state.
- Available associated skills now use TUI confirmation; approval sends `/skill:<name>` through `pi.sendUserMessage`, declining leaves preset active.

## Checks

- `attendant validate --no-correct --strict`: passed after record creation.
- `npm test -- test/facets.test.ts`: passed (12 tests).
- `npm run check`: passed.

## Review / next slice

- Approved 2026-08-03. Next dependent task: `add-five-whys-inquisitive-stance-and-skill`.

## Notes

- Blocks paired Five Whys preset integration.
