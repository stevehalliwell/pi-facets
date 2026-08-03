---
name: facet-craft
description: "Use to audit facets, presets, skills, or prompts for resource-boundary violations, axis overlap, duplicated directives, prompt-context compactness, or authoring drift. Produce evidence-backed report only; do not edit resources, enforce rules, or change active facets."
---

# Facet craft

Audit resource ownership against [resource boundaries](../../../docs/resource-boundaries.md) without changing resources.

## Workflow

1. Anchor audit. State current work resumes after report. Ask user whether to audit all project facets, presets, skills, and prompts (default), or name narrower targets. State report-only boundary. Done when target scope and non-mutation constraint are explicit.
2. Load contract and inventory. Read `docs/resource-boundaries.md`; enumerate selected resources and their source paths. State inaccessible inputs and resulting limits. Done when audit input is reproducible.
3. Inspect ownership. Compare each directive against canonical resource home and, for facets, hard role/authority/style boundaries. Require preset/skill association in `skill` frontmatter, not preset body text. Collect exact excerpt or location for each possible finding. Done when findings have evidence.
4. Classify overlap. Mark **hard violation** only for wrong ownership/axis or conflicting duplicate; **warning** for redundant same-purpose directive; **advisory** for non-duplicating similarity or compactness improvement. Do not treat shared phrases alone as overlap. Done when severity matches contract.
5. Report. Separate observed evidence from recommendations. Include supported non-findings where they clarify audit result. Prioritise follow-up options, each as separate approved work; do not edit or prescribe unsupported changes. Done when user can choose next action.

## Output shape

```text
Facet craft audit: <scope>

Inputs and limits:
- <resources inspected, omissions>

Hard violations:
- <path: location> — <canonical-home conflict and excerpt>

Warnings:
- <path: location> — <redundant directive evidence>

Advisories:
- <path: location> — <compactness or similarity evidence>

Non-findings:
- <checked rule with no supported finding>

Follow-up options:
1. <separate reviewable task>
2. <separate reviewable task>

Next:
- <ask user whether to create, refine, or discuss follow-up>
```

## Rules

- Default scope: all project facet, preset, skill, and prompt resources; user may narrow before inspection.
- `docs/resource-boundaries.md` is canonical; recorded decisions supersede it when conflict is evidenced.
- Cite file path plus exact excerpt or location for every finding.
- Report only: never edit resources, mutate facets, launch skills, or gate tool calls.
- Preserve short cross-references outside preset/skill association; flag duplicated preset-body skill references as wrong ownership.
- Prompt-content auditing remains deferred. Report only current prompt contract violations: state mutation or workflow.
