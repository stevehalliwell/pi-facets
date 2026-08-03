---
id: 019fc5aa-5067-7217-aaca-27bf20e1c1d5
name: add-report-only-facet-craft-skill
created_at: 2026-08-03T03:28:21.095Z
desc: "Add report-only facet-craft skill that audits resource ownership, overlap, and compactness against canonical boundaries."
tags:
  - facets
  - skills
  - audit
  - authoring
status: done
scope: agreed
depends_on:
  - define-resource-boundaries-before-facet-craft
---

## Scope

### Desired outcome

- Pi provides reusable `facet-craft` skill that produces evidence-backed, report-only audit of selected facet resources against `docs/resource-boundaries.md`.

### In scope

- Add trigger-rich `facet-craft` skill with input collection, inspection, classification, and report workflow.
- Audit all project facet, preset, skill, and prompt resources by default; allow user to narrow target resources.
- Report hard violations, warnings, and advisories using contract severity definitions.
- Distinguish observations from recommendations; cite file paths and exact excerpt or location for findings.
- State no findings when evidence does not support one.

### Out of scope

- Editing audited resources, automatic remediation, or enforcement/tool gating.
- New facet, preset, prompt, or extension behavior.
- Reopening resource-boundary or preset-skill-association decisions.

### Existing behavior to preserve

- Facets remain persistent single-axis stance; skills own temporary process; prompts are short non-mutating request frames.
- Audit reports do not mutate resources or select/change active facets.
- `docs/resource-boundaries.md` is canonical; recorded decisions supersede it if conflict arises.

### Acceptance

- Skill validates with required frontmatter and Pi discovers it.
- Default run audits project facets, presets, skills, and prompts; user may narrow scope before inspection.
- Output contains scope/input limits, evidence-backed findings grouped by hard violation/warning/advisory, non-findings where useful, and prioritized follow-up options.
- Findings identify canonical home and explain boundary or duplication evidence without treating shared terms alone as overlap.
- Skill never edits resources; remediation remains separate approved work.
- Proportionate discovery check and `npm run check` pass.

## Open questions

- None.

## Decisions

- 2026-08-03: Contract-driven report-only audit. Default input is all facet, preset, skill, and prompt resources; users may narrow it.
- 2026-08-03: Hard = wrong ownership/axis or conflicting duplicate; warning = redundant directive; advisory = non-duplicating similarity.
- 2026-08-03: Resource changes require separate task. See `docs/resource-boundaries.md`.

## Plan

1. Inspect local skill conventions and resource layout.
2. Add minimal `facet-craft` workflow referencing canonical contract.
3. Run discovery and TypeScript checks.

## Implemented so far

- Task created from completed resource-boundary contract.
- Added report-only `facet-craft` skill with default/narrow scope selection, evidence collection, severity classification, non-findings, and separate follow-up options.
- Added package-resource coverage.

## Checks

- `node /Users/stevehalliwell/.pi/agent/skills/skill-craft/validate-frontmatter.mjs .pi/skills/facet-craft/SKILL.md`: passed.
- `node /Users/stevehalliwell/.pi/agent/skills/skill-craft/md-words.mjs .pi/skills/facet-craft/SKILL.md`: 345 words.
- Confirmed skill-local link target: `docs/resource-boundaries.md`.
- `npm test`: passed (24 tests).
- `npm run check`: passed.

## Review / next slice

- Approved 2026-08-03.

## Notes

- Depends on `define-resource-boundaries-before-facet-craft`; do not start until contract task reaches review.
