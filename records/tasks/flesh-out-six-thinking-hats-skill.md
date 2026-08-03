---
id: 019fc531-0825-7cfb-afbe-0d27458b6402
name: flesh-out-six-thinking-hats-skill
created_at: 2026-08-03T01:15:52.741Z
desc: "Define a reusable Six Thinking Hats skill for structured creative, design, and decision exploration without making hats persistent facets."
tags:
  - skills
  - facets
  - brainstorming
  - decision-making
status: done
scope: agreed
---

## Scope

### Desired outcome

- Pi has reusable Six Thinking Hats skill for temporary, user-selected multi-perspective exploration before creative, design, or decision conclusion.

### In scope

- Add one reusable Six Thinking Hats skill with agreed trigger, lens selection, sequencing, guardrails, and synthesis output.
- Recommend existing `pragmatic-collaborator + advisory + structured` composition; do not change active facets.
- No prompt template.

### Out of scope

- Adding six persistent role facets.
- New facets, presets, or prompt templates.
- Routine ideation, fact research, or adversarial critique workflows.

### Existing behavior to preserve

- Facets remain compact, persistent role/authority/style components; skills own temporary workflows.
- Skill recommends facets but does not select or mutate them.

### Acceptance

- Skill frontmatter is trigger-rich and Pi discovers it.
- Skill runs only for deliberate multi-perspective exploration before creative, design, or decision conclusion.
- Skill explains six lenses, asks user to select relevant hats, and uses process/synthesis to frame and close every run.
- User may order selected hats; otherwise skill uses facts → feelings → benefits → risks → alternatives → synthesis.
- Lens outputs remain distinct, label evidence/assumptions/unknowns, and do not make material decision without user.
- Final output includes framing, selected-hat sections, convergences, tensions, options/experiments, unknowns, and explicit next-step question.
- Skill recommends `pragmatic-collaborator + advisory + structured` without selecting it.
- `npm run check` and proportionate skill discovery/validation checks pass.

## Open questions

- None.

## Decisions

- 2026-08-03: Six Thinking Hats belongs as temporary workflow, not persistent facets.
- 2026-08-03: Trigger only for deliberately separated multi-perspective exploration before creative, design, or decision conclusion; not routine brainstorming, research, or adversarial critique.
- 2026-08-03: Skill outlines facts/evidence, feelings/intuition, risks/cautions, benefits/value, alternatives/creative options, and process/synthesis; user selects lenses per exploration.
- 2026-08-03: Process/synthesis always facilitates framing and final combination, even when user does not select it.
- 2026-08-03: User may override selected-hat order; default runs facts, feelings, benefits, risks, alternatives, then synthesis.
- 2026-08-03: Keep lenses distinct and evidence-aware; synthesis surfaces tensions but does not make material decision without user.
- 2026-08-03: Final response includes framing, selected-hat sections, convergences, tensions, options/experiments, unknowns, and explicit next-step question.
- 2026-08-03: Ship skill only; no prompt template.
- 2026-08-03: Recommend existing `pragmatic-collaborator + advisory + structured` composition; do not add/select a new preset.

## Plan

1. Add trigger-rich `six-thinking-hats` skill using agreed workflow and output contract.
2. Run skill discovery plus project checks.
3. Review implementation; do not add new facets, preset, or prompt.

## Implemented so far

- Added `six-thinking-hats` skill with user lens selection, default sequencing, distinct lens outputs, and process/synthesis close.
- Added package-resource coverage.

## Checks

- `attendant validate --no-correct`: passed before record creation.
- `node /Users/stevehalliwell/.pi/agent/skills/skill-craft/validate-frontmatter.mjs .pi/skills/six-thinking-hats/SKILL.md`: passed.
- `node /Users/stevehalliwell/.pi/agent/skills/skill-craft/md-words.mjs .pi/skills/six-thinking-hats/SKILL.md`: 369 words.
- `npm test`: passed (24 tests).
- `npm run check`: passed.

## Review / next slice

- Approved 2026-08-03.

## Notes

- Future work; do not implement from this capture alone.
