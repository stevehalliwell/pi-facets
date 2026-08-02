---
id: 019fc496-bf42-7ae8-bf84-9455b3df54bd
name: audit-global-instructions-for-facet-migration
created_at: 2026-08-02T22:27:21.538Z
desc: "Classify global Pi instructions before moving appropriate persistent behavior into facets."
tags:
  - facets
  - global-config
  - audit
status: todo
scope: agreed
---

## Scope

### Desired outcome

- A reviewed migration map that classifies every global Pi instruction and proposes only appropriate global facets, presets, skill references, or retained operational rules.

### In scope

- Audit `~/.pi/agent/AGENTS.md` and relevant global settings.
- Classify each instruction as role, authority, style, skill workflow, global operational rule, project context, or remove/merge candidate.
- Propose compact global `caveman` style, `ponytail` role, and unnamed default preset with `decisive` authority.
- Identify later package/settings changes needed to load public research extension without making them.

### Out of scope

- Editing global AGENTS, settings, or facet files.
- Installing unpublished packages.
- Rewriting project-local instructions.
- Publishing research extension or package.

### Existing behavior to preserve

- Preserve rules that are operational rather than behavioral.
- Do not move workflow detail into facets or duplicate facts across resources.
- Global settings apply across projects; retain explicit project override behavior.

### Acceptance

- Every global instruction has one classification and rationale.
- Proposed facets remain single-axis and compact.
- Proposed presets reference components rather than duplicate bodies.
- Operational/tool rules remain outside facets.
- No global configuration changes occur during audit.

## Open questions

- User-facing default-preset name.

## Decisions

- 2026-08-02: Audit before deciding migration depth.
- 2026-08-02: Audit occurs before Pi-research changes; later global implementation may follow its public release.
- 2026-08-02: Extract clean `caveman` style and `ponytail` role components; retain operational/task/tool rules in global AGENTS.
- 2026-08-02: Default preset composes `ponytail`, `decisive`, and `caveman`; user-facing name deferred.
- 2026-08-02: Decisive authority escalates ambiguity affecting behavior, risk, scope, acceptance, or user-visible defaults.

## Plan

- Inventory and classify global instructions with rationale.
- Draft compact `caveman` and `ponytail` candidates plus unnamed default preset.
- Present migration map for approval.
- Create follow-up implementation task only after approval.

## Implemented so far

- Task record created; no audit changes made.

## Checks

- `attendant validate --no-correct`: passed before record creation.

## Review / next slice

- Ready for review: no; audit has not started.
- Likely next slice/task: run audit, then refine approved migration implementation.

## Notes

- Avoid turning global operational discipline into always-on behavioral facets.
