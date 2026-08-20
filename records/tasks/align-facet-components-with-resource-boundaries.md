---
id: 019fc5d8-c468-7bb6-a1ae-0bf9a02f9eb4
name: align-facet-components-with-resource-boundaries
created_at: 2026-08-03T04:19:05.448Z
desc: "Align facet components with clarified role, authority, and style ownership; then re-audit all facet resources."
tags:
  - facets
  - authoring
  - audit
  - resource-boundaries
status: done
priority: medium
depends_on: null
---

## Scope

### Desired outcome

- Project facet components align with clarified `docs/resource-boundaries.md`: roles provide persistent domain perspective, working attitude, interests, priorities, judgment standards, and risks; authority provides decision defaults; style provides response form.
- A post-change `facet-craft` audit covers all project facets, presets, skills, and prompts.

### In scope

- Identify workflow, required-input, deliverable, source-rule, and completion-check directives in listed facet components; map each to an existing skill or add a narrowly scoped skill where no suitable workflow exists.
- Remove mapped workflow from `.pi/facets/roles/art-director.md`, `.pi/facets/roles/editorial-reviewer.md`, `.pi/facets/roles/ghostwriter.md`, `.pi/facets/roles/release-steward.md`, and `.pi/facets/roles/web-platform-specialist.md`; retain their persistent expertise stance.
- Remove artifact-target behavior from `.pi/facets/style/prose-craft.md`; preserve required artifact behavior in relevant skills, per `defer-communication-target-facets`.
- Reframe/remove reply-form directives from `.pi/facets/authority/decisive.md` and `.pi/facets/authority/recommend-and-proceed.md` without changing axis ownership.
- Correct poor but ownership-valid phrasing, including workflow-adjacent wording in `.pi/facets/roles/dev-peer.md` and `.pi/facets/roles/researcher.md`; present revised wording for user review.
- Run report-only full-resource `facet-craft` audit after edits; correct confirmed preset workflow/behavior duplicates before final review.
- Defer facet compaction, deletion, renaming, and role merging to follow-up work after this task.

### Out of scope

- Extension behavior, facet discovery, preset/skill launch behavior, tool policy, or new facet axes.
- Broad workflow redesign beyond narrowly scoped skills needed to own process removed from facets.
- Automatic remediation or enforcement of future audit findings.

### Existing behavior to preserve

- Explicit role, authority, and style selection and preset composition.
- Facets remain compact persistent context; skills remain temporary workflow owners.
- No tool-call limits, gates, or automatic facet switching.

### Acceptance

- Listed components contain no repeatable task sequence, required input, tool/source rule, gate, deliverable, completion check, artifact-target behavior, or cross-axis directive.
- Each removed workflow maps to an existing skill, a newly added narrow skill, or an explicit intentional removal.
- Revised roles retain a concrete persistent expertise lens; compaction, deletion, renaming, and merging remain deferred.
- Revised wording receives user review before task completion.
- Full `facet-craft` audit reports scope, inputs/limits, evidence, severity, non-findings, and separate follow-up options.
- Confirmed preset workflow/behavior duplicates are removed or moved to their canonical role/skill home.
- Relevant package/documentation validation passes.

## Open questions

- Whether full audit finds preset, skill, or prompt violations requiring separate work.

## Decisions

- 2026-08-03: `docs/resource-boundaries.md` permits compact action-oriented role heuristics, but repeatable sequence, required input, gate, tool/source rule, deliverable, or completion check belongs in a skill.
- 2026-08-03: Roles own domain interests and priorities; authority owns decision defaults; style owns response form.
- Accepted `defer-communication-target-facets`: artifact requirements belong in skills until concrete communication-target pain warrants new state.

## Plan

1. Map workflow directives to existing skills; add narrow editorial/ghostwriting skills where no fit exists.
2. Revise listed facets to persistent stance only; correct ownership-valid phrasing.
3. Present wording changes for user review.
4. Validate discovery and focused package checks.
5. Run report-only full-resource `facet-craft` audit; correct confirmed preset workflow/behavior duplicates.
6. Revalidate and present final review.

## Implemented so far

- Task captured from 2026-08-03 facet-only audit.
- Added `editorial-review` skill for supplied long-form revision, channel adaptation, supplied-source claim handling, and material-change rationale.
- Added `ghostwriting` skill for source-bounded long-form drafting and substantial rewrites.
- Added both skills to README and package resource-existence coverage.
- Rewrote listed role facets as persistent expertise lenses; removed workflow, required-input, source-rule, deliverable, and completion-check directives.
- Removed reply-form directives from `decisive` and `recommend-and-proceed`; removed artifact-target behavior from `prose-craft`.
- Rephrased workflow-adjacent `dev-peer` and `researcher` directives as risk/judgment heuristics.
- 2026-08-03: User approved revised facet wording.
- Completed report-only full-resource `facet-craft` audit; found three preset workflow/behavior duplicates.
- Removed workflow/behavior duplicates from `backlog-refinement`, `implementation-partner`, and `messaging-strategy` preset bodies; each now contains only a short named skill reference.

## Checks

- 2026-08-03: `attendant validate --no-correct` passed before record creation.
- 2026-08-03: `npm test -- test/package.test.ts` passed (12 tests).
- 2026-08-03: `npm run check` passed.
- 2026-08-03: `pi --approve --no-session --no-tools --mode json -p "Reply exactly: OK"` returned `OK` before and after preset cleanup.

## Review / next slice

- User approved completed facet and preset corrections.
- Deferred follow-up: assess facet compaction, removal, renaming, and merging after preset-skill association work.

## Notes

- Former task scope: `agreed`.

- Source audit found hard violations in eight facet components and advisory workflow-adjacent wording in two role components.
- Full audit is a post-change check, not permission to modify findings outside this task.
