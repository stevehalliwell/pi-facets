---
id: 019fc48d-4df5-7700-9b78-3364847a73bd
name: add-website-art-direction-workflow
created_at: 2026-08-02T22:17:02.709Z
desc: "Add reusable website art-direction skill to guide evidence-led audits, alternatives, recommendations, and implementation principles in any repository."
tags:
  - website
  - design
  - skills
status: todo
scope: agreed
---

## Scope

### Desired outcome

- Pi can invoke a reusable `website-art-direction` skill that produces a decision-ready art-direction brief for any supplied website without embedding site-specific facts.

### In scope

- Add one workflow skill that collects live/staging URLs, core pages, positioning/audience material, competitors, visual references, and selection criteria.
- Proceed from available evidence while stating input limits.
- Define sequence: evidence review, current-state audit, 2–3 distinct directions, comparison, recommendation, and implementation principles.
- Separate observations, hypotheses, and recommendations.
- Require user approval before redesign implementation begins.
- Use existing `visual-direction` preset as recommended context; do not duplicate its persistent role, authority, or style behavior.

### Out of scope

- Performing art-direction discovery for a particular website.
- Website redesign or browser implementation.
- Full brand identity, logo, social, or collateral redesign.
- Marketing positioning decisions.
- Automatic research or uncited factual claims.
- New facet components or preset changes unless workflow gap proves one necessary.

### Existing behavior to preserve

- `visual-direction` remains reusable: `art-director + advisory + exploratory`.
- Facets stay single-axis; skills own repeatable workflow and output contract.
- User chooses direction; recommendation is not implementation authorization.
- Competitors are benchmarks for audience-fit patterns, not assumed direction.

### Acceptance

- `website-art-direction` skill validates with required frontmatter and is discoverable by Pi.
- Skill works from supplied inputs in any repository; no site-specific URLs, brands, or assumptions appear in it.
- Skill requests or records missing evidence and states resulting limits.
- Skill produces audit, 2–3 alternatives, comparison criteria, recommendation, and reusable principles for typography, color, spacing, imagery, and hierarchy.
- Skill distinguishes observations, design hypotheses, and recommendation.
- Skill stops for user direction approval before implementation.
- `npm run check` and proportionate validation pass.

## Open questions

- None.

## Decisions

- Repurposed from site-specific discovery to reusable workflow capability.
- Existing `visual-direction` preset supplies persistent art-direction judgment; new skill supplies execution sequence and output contract.
- First scope creates no site-specific audit, redesign, or new facet resources.

## Plan

1. Read existing skill conventions and `visual-direction` resources.
2. Add smallest reusable `website-art-direction` skill.
3. Run skill/resource discovery checks and project validation.

## Implemented so far

- Task repurposed; no workflow files added.

## Checks

- `attendant validate --no-correct --strict`: passed after task update.

## Review / next slice

- Ready for implementation: yes.

## Notes

- A prompt is not in first scope; add only if repeated invocation framing creates friction.
