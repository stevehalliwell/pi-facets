---
id: 019fc48d-4df5-7700-9b78-3364847a73bd
name: discover-website-art-direction
created_at: 2026-08-02T22:17:02.709Z
desc: "Use evidence to assess current website identity and recommend a website art direction."
tags:
  - website
  - design
  - discovery
status: blocked
scope: agreed
depends_on:
  - add-visual-direction-facet
---

## Scope

### Desired outcome

- A decision-ready website art-direction brief: current-state audit, 2–3 evidence-led visual directions, one recommendation, and implementation principles.

### In scope

- Review current website visual identity.
- Assess audience and positioning context.
- Compare relevant competitor visual patterns.
- Incorporate user visual preferences and references.
- Develop 2–3 distinct website visual directions.
- Recommend one direction and define implementation principles.

### Out of scope

- Implementing website redesign.
- Full brand identity, logo, social, or collateral redesign.
- Changing positioning or marketing strategy.
- Treating the recommendation as authorization to alter the site.

### Existing behavior to preserve

- Depends on `add-visual-direction-facet`.
- Preserve explicit user choice between evolving existing identity and a new direction.
- Separate evidence, visual hypotheses, and recommendation.

### Acceptance

- Audit identifies current visual strengths, inconsistencies, and constraints.
- Evidence covers site, positioning/audience, competitors, and user preferences.
- At least two alternatives are compared against stated criteria.
- Recommendation includes reusable implementation principles for typography, color, spacing, imagery, and hierarchy.
- User approves a direction before redesign implementation begins.

## Open questions

- Runtime inputs: live/staging URLs, core pages, positioning/audience source materials, competitors, and visual references.
- Decision criteria for selecting a direction.

## Decisions

- 2026-08-02: Website only for first art-direction scope.
- 2026-08-02: Use a full evidence set, not current-site or inspiration-only review.
- 2026-08-02: Deliver audit plus directions, not a single assumed recommendation.
- 2026-08-02: Ask for live and staging sites plus inspiration; proceed from available evidence while stating limits.

## Plan

- Ask for runtime evidence inputs and state any limits.
- Conduct evidence review.
- Develop alternatives and recommendation.
- Get user direction approval before implementation task.

## Implemented so far

- Task record created; no discovery work started.

## Checks

- `attendant validate --no-correct`: passed before record creation.

## Review / next slice

- Ready for review: no; task is blocked only on `add-visual-direction-facet`.
- Likely next slice/task: provide available website/evidence inputs when discovery begins.

## Notes

- Do not use visual preference alone as strategic evidence.
- Do not begin redesign before direction approval.
