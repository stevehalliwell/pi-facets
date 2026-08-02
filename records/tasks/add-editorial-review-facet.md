---
id: 019fc47b-df7e-79c0-bca6-eb9e75e81d8d
name: add-editorial-review-facet
created_at: 2026-08-02T21:58:00.319Z
desc: "Add a long-form editorial-review role and preset, distinct from marketing web-copy review."
tags:
  - facets
  - editorial
  - presets
status: todo
scope: agreed
---

## Scope

### Desired outcome

- Pi can apply a dedicated long-form editorial-review preset that edits a supplied draft while preserving author intent and voice, then explains material changes.

### In scope

- Define one role facet for long-form editorial judgment: voice, narrative structure, pacing, clarity, grammar, and phrasing.
- Define one `editorial-review` preset.
- Default to full editorial control over supplied text: structure, voice, meaning, phrasing, and channel fit; summarize material changes afterward.
- Ask target channel for each draft: owned site, Medium, Substack, or channel-neutral.
- Adapt or replace title, opening, structure, links, CTA, positioning language, and reader context for supplied target channel.
- Correct factual claims only against supplied sources; flag uncertain or unsupported claims.

### Out of scope

- Broader web-copy positioning, audience, proof, and conversion strategy beyond supplied long-form article.
- Full-article rewrites or generated first drafts; defer to separate `ghostwriter` task.
- Implementing a publishing integration or content-management workflow.

### Existing behavior to preserve

- Existing role files remain single-axis.
- Presets reference components; they do not duplicate role behavior.
- User retains final review and publishing approval; full editorial rewrite is authorized within supplied article.

### Acceptance

- Role Markdown validates with required frontmatter and contains editorial-review behavior only.
- Preset resolves role, authority, and style components.
- Applied preset makes full editorial revisions rather than defaulting to review-only.
- Applied preset asks for target channel when not supplied, adapts agreed channel elements including CTA and positioning language, and reports material edits with reasons.
- Applied preset corrects factual claims only from supplied sources and flags uncertain claims.
- `npm run check` and relevant tests pass.

## Open questions

- None.

## Decisions

- 2026-08-02: Separate marketing web-copy work from long-form editorial work.
- 2026-08-02: Editorial review has full article-level control over supplied drafts and summarizes material changes.
- 2026-08-02: Ask target channel per draft and freely adapt title, opening, structure, links, CTA, positioning language, and reader context.
- 2026-08-02: Correct factual claims only against supplied sources; flag uncertainty.
- 2026-08-02: Use existing `critical` style.
- 2026-08-02: `ghostwriter` is a separate future task.

## Plan

- Add `editorial-reviewer` role and `editorial-review` preset using `recommend-and-proceed` and `critical`.
- Add or update focused tests if component discovery/validation coverage needs it.
- Add or update focused tests if component discovery/validation coverage needs it.
- Run project checks.

## Implemented so far

- Task record created; no implementation changes.

## Checks

- `attendant validate --no-correct`: passed before record creation.

## Review / next slice

- Ready for review: no; implementation has not started.
- Likely next slice/task: implement editorial role and preset.

## Notes

- Future task: define `ghostwriter` role/preset.
- Avoid merging editorial craft judgment with marketing strategy.
