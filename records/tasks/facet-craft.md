---
id: 019fc4d0-2a9b-7109-bdb5-96dcbdcce60a
name: define-resource-boundaries-before-facet-craft
created_at: 2026-08-02T23:30:04.572Z
desc: "Define canonical facet, preset, skill, and prompt boundaries before implementing reusable facet-craft audit skill."
tags:
  - facets
  - skills
  - prompts
  - presets
  - architecture
status: done
priority: medium
---

## Scope

### Desired outcome

- A reviewed canonical resource-boundary contract at `docs/resource-boundaries.md`, making future `facet-craft` findings consistent and giving authors affirmative and negative examples for facets, presets, and skills.

### In scope

- Write `docs/resource-boundaries.md` from resolved rules and cited existing sources.
- Link it from `README.md` as author guidance.
- Define where stance ends and process begins.
- Define role, authority, style, preset, and skill responsibilities and permitted references.
- Retain existing prompt guidance without adding prompt-audit rules in this scope.
- Record supported preset-to-skill association behavior.
- Define requirements for later report-only `facet-craft` audit skill; do not implement it.

### Out of scope

- Implementing `facet-craft`, new facets, preset invocation behavior, or extension changes.
- Editing existing resources to comply before rules are agreed.
- Arbitrary global line caps.
- Prompt-content checking or new prompt contract work.
- Automatic facet inference, switching, or tool restriction.

### Existing behavior to preserve

- Facets are persistent role, authority, and style dimensions.
- Skills are temporary task workflows and output contracts.
- Prompts are short, non-mutating request frames.
- Explicit facet selection remains user-controlled.
- Existing preset frontmatter composes one role, authority, and style; it does not currently invoke skills or prompts.

### Acceptance

- `docs/resource-boundaries.md` cites current sources, captures resolved facet/preset/skill rules, and provides affirmative/negative guidance and examples for each.
- `README.md` links to contract as author guidance.
- Contract identifies normative rules versus non-binding heuristics.
- Contract specifies overlap findings and severity sufficiently for a later audit skill.
- Preset-to-skill behavior includes explicit selection, user confirmation, target validation, and no default/restored/non-interactive launch.
- Follow-up `facet-craft` implementation task can be scoped from contract without reopening these decisions.

## Existing sources

- `README.md`
  - Facets: persistent role, authority, style.
  - Skills: on-demand workflows and output contracts; do not copy them into compact facets.
  - Prompts: short, non-mutating request frames; do not select or mutate facets.
  - Project facts belong outside facets/skills; references hold detailed supporting material.
- `AGENTS.md`
  - Keep facet files single-axis; do not duplicate skill workflow or project facts.
- `docs/product-discovery.md`
  - Facets guide reasoning and collaboration; skills define procedure; neither becomes catch-all.
  - Skills do not appear in persistent facet status; explicit user choice overrides defaults.
- `docs/facet-grid.md`
  - Presets compose role + authority + style; prompts frame requests; skills remain workflow source of truth.
- `/Users/stevehalliwell/.pi/agent/skills/skill-craft/SKILL.md`
  - Skill frontmatter is routing surface; skills need concrete triggers, ordered checkable steps, narrow scope, workflow-local references, and only split around roughly 1,000 words when load/noise warrants it.

## Open questions

- None. Prompt-content checking remains intentionally deferred.

## Resolved guidance

### 1. Canonical resource classifier — resolved

- Rule: Each instruction has one canonical home; `facet-craft` checks this taxonomy.

| Resource | Holds | Does not hold |
| --- | --- | --- |
| Facet | Persistent role, authority, or style stance | Process, gates, task steps, repo facts |
| Preset | Named facet composition; approved association metadata | Duplicated component bodies or workflow |
| Skill | Temporary process, gates, checks, and output contract | Persistent stance or repo facts |
| Prompt | Short user-request frame | State mutation, workflow, persistent behavior |
| Project context | Repo/product facts | Reusable general guidance |
| Reference | Detailed reusable standards or evidence | Duplicated workflow/rules |

- Affirmative guideline: Put persistent reasoning stance in a facet; composition/entry-point metadata in a preset; ordered temporary process and output contract in a skill; a short one-request framing aid in a prompt; repo facts in project context; detailed standards/evidence in references.
- Negative guideline: Do not put task steps in a facet, behavioral rules in a prompt, durable repo facts in a skill, or duplicate detailed standards across all resources.
- Example: “Challenge unsupported assumptions” belongs in a `critical` style; “collect sources, compare options, return recommendation” belongs in a research skill.

### 2. Stance versus process — resolved

- Rule: Process always lives in skills because per-turn process injection is wrong.
- Affirmative guideline: Facets express persistent decision lens, default decision authority, or communication style only. Ordered steps, branches, gates, checks, tool procedure, and output contract live in skills.
- Negative guideline: A role facet must not say “first inspect X, then run Y, finally write Z,” even if process fits its named domain. Presets and prompts must not carry workflow sequence or gates.
- Example: `art-director` may require evidence-led alternatives before recommendation; `website-art-direction` skill defines evidence collection, audit sections, comparison, approval gate, and output.

### 3. Axis boundaries and facet overlap — resolved

- Rule: Axis boundaries are hard and exclusive: role owns expertise, perspective, and domain priorities; authority owns decision/approval default; style owns response form, tone, and density.
- Affirmative guideline: A facet may name another axis only to avoid conflict, not restate its behavior.
- Negative guideline: Do not encode “ask before changing public behavior” in role/style when authority owns it; do not encode domain expertise in authority; do not use style to decide scope.
- Example: “Prioritise accessibility” is web-platform role; “pause for user-visible defaults” is authority; “use compact headings” is style.

### 4. Facet and preset compactness — resolved

- Rule: Use semantic compactness test; no numeric line or word cap.
- Affirmative guideline: Facets/presets contain only behavior that earns per-turn context cost; prefer concise, non-sequenced bullets and component references. Warn when content repeats another resource, carries process, mixes axes, or supplies non-essential detail.
- Negative guideline: Do not impose arbitrary universal line caps or move necessary guardrails solely to meet a count.
- Example: A preset names role/authority/style and one usage sentence; it does not restate three component bodies or skill workflow.

### 5. Prompt contract — deferred

- Rule for this task: Do not add prompt-content checking or new prompt contract rules now.
- Existing guidance remains: prompts are short, non-mutating request frames and do not select or mutate facets.
- Revisit when prompt use creates demonstrated overlap, routing, or authoring friction.

### 6. Overlap, references, and audit severity — resolved

- Rule: Short named cross-references are allowed; each directive has one canonical home.
- Severity: hard violation = wrong resource/axis ownership or conflicting duplicate; warning = redundant same-purpose directive even if consistent; advisory = similar wording/idea without duplicated behavior.
- Affirmative guideline: Allow short named references across resources; keep each rule/procedure canonical in one home. Classify hard boundary violations separately from redundancy and advisory compactness/writing improvements.
- Negative guideline: Do not report every shared phrase as overlap or prescribe changes without evidence of conflicting ownership/cost.
- Example: Preset text “Use with implementation skill” is permitted reference; copying implementation workflow steps into preset is hard violation.

### 7. Preset-associated skills or prompts — resolved

- Skill rule: After explicit preset selection, apply facets then ask whether user wants to run its associated skill. On confirmation, extension sends `/skill:<name>` through `pi.sendUserMessage`; declining leaves preset active without running skill. Default/restored/non-interactive selection never prompts or launches it.
- Prompt rule: Presets do not associate prompts in first version. Prompts remain standalone request frames.
- Affirmative guideline: Skill association is optional metadata. It guides temporary workflow without copying workflow into preset/facets. Validate target availability and report missing target clearly.
- Negative guideline: Do not silently start a skill, prompt, or tool; do not prompt for default/restored/non-interactive selection; do not override explicit active skill/facets; do not make facet selection a tool-call gate.
- Example: Selecting `technical-review` may ask “Run `technical-review` now?”; `/decision-brief <topic>` remains standalone.

## Decisions

- Default audit input is all facet, skill, and prompt resources; user may narrow it.
- Initial `facet-craft` intent is report-only; resource changes require a separate task.
- 2026-08-02: Reopened task before implementation.
- 2026-08-02: Process is skill-only. Per-turn facet injection contains stance, not ordered workflow.
- 2026-08-02: Adopt six-part canonical resource taxonomy as author guidance and future `facet-craft` audit basis.
- 2026-08-02: Facet axes have hard, exclusive boundaries: role = perspective, authority = decision rights, style = expression.
- 2026-08-03: Explicit selection of a preset with associated skill applies facets, then asks user before launching skill. Recorded in `records/decisions/preset-skill-confirmation.md`.
- 2026-08-03: Presets do not associate prompts in first version; prompts remain standalone request frames.
- 2026-08-03: Audit overlap levels: hard ownership/conflict violation, warning for redundant directive, advisory for non-duplicating similarity.
- 2026-08-03: Facet/preset compactness uses semantic per-turn usefulness, not numeric limits.
- 2026-08-03: Defer prompt-content checking; retain existing prompt guidance only.
- 2026-08-03: Canonical guidance lives in `docs/resource-boundaries.md`, linked from `README.md`; future `facet-craft` references it.

## Plan

1. Write canonical contract at `docs/resource-boundaries.md` from resolved guidance.
2. Link contract from `README.md`.
3. Validate Markdown/link changes.
4. Create/refine follow-up report-only `facet-craft` implementation task from contract.

## Implemented so far

- Original audit-skill task reframed around prerequisite boundary contract.
- Added `docs/resource-boundaries.md` with canonical ownership, axis, compactness, association, and audit-severity guidance.
- Linked contract from `README.md`.
- Created agreed follow-up `add-report-only-facet-craft-skill` task.

## Checks

- `attendant validate --no-correct --strict`: passed after task update.
- `git diff --check`: passed.
- Confirmed `README.md` and `docs/resource-boundaries.md` paths exist.

## Review / next slice

- Approved 2026-08-03. Follow-up audit-skill task is separately tracked.

## Notes

- Former task scope: `agreed`.

- Preset-to-skill/prompt association is a material product/extension behavior decision; discuss before implementing.
