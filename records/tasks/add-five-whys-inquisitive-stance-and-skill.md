---
id: 019fc53e-2154-77d2-9f8f-fe77d5ed0731
name: add-five-whys-inquisitive-stance-and-skill
created_at: 2026-08-03T01:30:11.156Z
desc: "Add an inquisitive Five Whys stance facet and reusable Five Whys skill with a supporting reference document."
tags:
  - facets
  - skills
  - five-whys
  - inquiry
status: done
scope: agreed
depends_on:
  - support-preset-skill-associations
---

## Scope

### Desired outcome

- Pi can adopt `inquiry-guide` role plus `inquisitive` style, then invoke reusable Five Whys workflow backed by compact reference material.

### In scope

- Add `inquiry-guide` role for inquiry reasoning priorities.
- Add `inquisitive` style for focused, open, non-leading question-led replies.
- Add reusable Five Whys skill for iterative cause diagnosis and purpose/intent discovery across product, design, games, narrative, and technical work.
- Add `five-whys` preset: `inquiry-guide + advisory + inquisitive`, associated with Five Whys skill.
- Add a skill-local reference document explaining method, broad applications, and limits without citations.

### Out of scope

- A prompt template carrying the Five Whys process.
- Treating Five Whys only as technical root-cause analysis.
- Citation or source-research work for reference material.

### Existing behavior to preserve

- Facets stay compact and persistent; skills own repeatable workflows; prompt templates stay short request frames.
- Role, authority, and style have hard exclusive boundaries; iterative loops, steps, branches, gates, and stop conditions remain skill-only.
- Associated-skill launch requires explicit preset selection and user confirmation.
- Five Whys supports design, games, narrative, product, and technical inquiry.

### Acceptance

- `inquiry-guide` role and `inquisitive` style validate and remain within their exclusive axis boundaries.
- `five-whys` preset resolves `inquiry-guide + advisory + inquisitive` and its associated skill after dependency completion.
- Skill triggers from explicit cause/purpose inquiry; asks one highest-value question at a time, supports adaptive branching/depth, and stops safely.
- Final synthesis returns map, hypotheses, evidence gaps, and next action/open question.
- Reference gives concise practical method guidance without citations.
- `npm run check` and proportionate discovery/validation checks pass.

## Open questions

- None for Five Whys resources. Preset-skill association implementation is tracked separately.

## Decisions

- 2026-08-03: Five Whys is a reusable process and purpose, not sufficiently represented by a prompt.
- 2026-08-03: Supporting detail belongs in skill-local reference; prompts must remain compact.
- 2026-08-03: Add both `inquiry-guide` role and `inquisitive` style. Role owns inquiry reasoning priorities; style owns question-led expression; skill owns Five Whys process and its loops.
- 2026-08-03: Five Whys supports both cause diagnosis and purpose/intent discovery across product, design, games, narrative, and technical contexts.
- 2026-08-03: “Five” is adaptive; skill branches, respects user limits, identifies evidence gaps, and stops at actionable insight or diminishing value. It must not coerce or assign blame.
- 2026-08-03: Skill asks one highest-value question at a time, waits for user response, tracks inquiry state, then returns map, hypotheses, evidence gaps, and next action/open question.
- 2026-08-03: Reference is concise practical guidance without citations or source research.

## Plan

- Define compact role/style behavior within agreed axis boundaries.
- Define skill process, output contract, and reference sources.
- Implement role, style, skill, and reference after scope approval.
- Add final preset association after `support-preset-skill-associations` completes.

## Implemented so far

- Added compact `inquiry-guide` role and `inquisitive` style within axis boundaries.
- Added package-resource coverage for both facet files.
- Added `five-whys` skill with adaptive, evidence-aware one-question-at-a-time workflow.
- Added concise method reference covering use, evidence discipline, branches, and safe stopping.
- Added `five-whys` preset: `inquiry-guide + advisory + inquisitive`, associated with Five Whys skill.

## Checks

- `attendant validate --no-correct`: passed before record creation.
- `npm test -- test/package.test.ts`: passed (11 tests) during earlier slice.
- `npm test`: passed (24 tests) after final preset.
- `npm run check`: passed.
- `node /Users/stevehalliwell/.pi/agent/skills/skill-craft/validate-frontmatter.mjs .pi/skills/five-whys/SKILL.md`: passed.
- `node /Users/stevehalliwell/.pi/agent/skills/skill-craft/md-words.mjs .pi/skills/five-whys/SKILL.md`: 387 words.

## Review / next slice

- Approved 2026-08-03.

## Notes

- Five Whys allows branching, evidence limits, and fewer or more than five steps.
