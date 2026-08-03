---
id: 019fc496-bf42-7ae8-bf84-9455b3df54bd
name: audit-global-instructions-for-facet-migration
created_at: 2026-08-02T22:27:21.538Z
desc: "Classify global Pi instructions before moving appropriate persistent behavior into facets."
tags:
  - facets
  - global-config
  - audit
status: done
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

### Migration map

| Global instruction group | Classification | Rationale / destination |
| --- | --- | --- |
| Caveman wording, brevity, structure, vocabulary, examples, normal-code boundary | style | Extract compact `caveman`; persistent communication behavior only. |
| Caveman mode override and auto-clarity rules | global operational rule | User override and safety/confusion handling remain outside a facet. |
| Ponytail YAGNI ladder, small-diff preference, root-cause fixes, quality boundaries | role | Extract compact `ponytail`; implementation judgment only. |
| Ponytail explicit stop/normal-mode override | global operational rule | User override remains outside a facet. |
| Reusable project tools policy | global operational rule | Tool/file-placement policy, not agent stance. |
| Unrequested-work, commit, discussion, divergence, question, and cleanup rules | global operational rule | Scope control and interaction policy must apply regardless of selected facets. |
| Attendant task query/lifecycle rule | skill workflow | Keep in `task-lifecycle`; operational enforcement stays global. |
| Post-task instruction audit | global operational rule | Process safeguard, not persistent persona behavior. |

### Candidate global resources

**`caveman` style**

- Lead with result, action, or decision.
- Use terse, concrete language; fragments and abbreviations are fine.
- Remove filler and repetition; retain technical substance.
- Use short structure, exact technical terms, and arrows for causality.
- Expand only for security, irreversible confirmation, or user confusion.

**`ponytail` role**

- Prefer no change, reuse, platform features, installed dependencies, then smallest correct diff.
- Trace actual flow; fix root cause once at shared boundary.
- Avoid abstractions, dependencies, boilerplate, and speculative refactors.
- Preserve security, accessibility, input validation, error handling, and explicit requirements.
- Leave proportionate runnable validation for non-trivial logic.

**Default preset**

- User-facing name: unresolved.
- Composition only: `ponytail + decisive + caveman`.
- No duplicated component bodies; project presets retain override precedence.

### Settings audit

- Retain all current `settings.json` fields as global configuration: package sources, model/provider, theme, thinking, compaction, and display settings are not facets.
- Existing package entries remain unchanged.
- After public Pi-research release: add its verified package identifier to global `packages`; do not pre-install, pin an unpublished source, or change project settings.

- Task record only; no global AGENTS, settings, or facet files changed.

## Checks

- `attendant validate --no-correct`: passed before record creation.
- Read `~/.pi/agent/AGENTS.md` and `~/.pi/agent/settings.json`.

## Review / next slice

- Approved: 2026-08-02. Migration map complete; no configuration changes made.
- Follow-up implementation needs separate scoped task.

## Notes

- Avoid turning global operational discipline into always-on behavioral facets.
