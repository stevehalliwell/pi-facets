---
id: 019fb0b1-1e26-75e6-8126-b2c818c474de
name: detect-facet-task-mismatch
created_at: 2026-07-30T01:43:45.446Z
desc: "Surface clear request/facet misalignment before substantive work."
tags: []
status: done
priority: medium
depends_on:
  - tasks/implement-mode-extension
  - tasks/create-initial-skills
---

## Scope

### Desired outcome

- Active facets provide lightweight steering that surfaces a clear request/facet mismatch before substantive work, without classifier infrastructure or repetitive chatter.

### In scope

- Add compact `Facet alignment` cue to injected context only when one or more facets are active: `Clear conflict → load \`facet-alignment\`.`
- Add model-invocable `facet-alignment` skill. It handles clear explicit request/facet conflicts before substantive work.
- Skill preserves active facets as user overrides, asks whether to continue or change facets, points no-target cases to `/facets`, and offers one clear smallest axis with `ask_user_question`.
- Otherwise proceed silently; topic alone and ordinary task progression do not trigger a notice.

### Out of scope

- Extension classifier, facet metadata schema, external model call, or automatic facet switching.
- Automatic tool restrictions.
- Replacing other skill routing or workflow-phase decisions.
- Deterministic testing of model semantic judgment.

### Existing behavior to preserve

- Explicit `/facets` selection and clearing remain user overrides.
- Facets guide behavior; skills own task procedures.
- Tool calls remain unrestricted.
- Active facet instructions remain compact per-turn prompt context.

### Acceptance

- Compact cue appears only when one or more active facets exist; no-active prompt remains unchanged.
- `facet-alignment` skill has model-invocable conflict triggers and complete preserve/continue/change process.
- Skill offers continue-under-current-facets or facet change; smallest targeted change uses `ask_user_question`; no target points to `/facets`.
- No automatic state change, tool restriction, classifier, or metadata is added.
- Focused tests cover prompt inclusion/absence, skill resource, and existing explicit override mechanics.
- Manual scenarios cover backlog refinement → implementation, implementation → backlog refinement, clear mismatch, and aligned request.

## Open questions

- None.

## Decisions

- Model judgment guided by compact active-facet cue and on-demand skill is sufficient first implementation.
- Threshold stays deliberately conservative and fuzzy: trigger only when facets do not align “at all” with explicit new request.
- Skill asks whether user wants to ignore conflict and continue, giving chance to change facets.
- No target uses `/facets`; a clear smallest target may use `ask_user_question`.

## Plan

1. Replace long prompt policy with compact conditional cue.
2. Add `facet-alignment` skill with model-invocable triggers and conflict-resolution workflow.
3. Add prompt-state and resource tests; document manual semantic scenarios.
4. Run focused and full checks.

## Implemented so far

- Task shape revised with user approval: long conflict policy moves from per-turn prompt into on-demand `facet-alignment` skill.
- Replaced long prompt policy with `Clear conflict? Load \`facet-alignment\`.` cue.
- Added model-invocable `facet-alignment` skill with conflict threshold, continue/change decision, smallest-axis targeting, and explicit override preservation.
- Updated README and package resource checks; no automatic state, classifier, metadata, or tool behavior added.

## Checks

- Skill frontmatter: `node /Users/stevehalliwell/.pi/agent/skills/skill-craft/validate-frontmatter.mjs .pi/skills/facet-alignment/SKILL.md` — pass; 216 body words.
- Focused: `npm test -- --run test/facets.test.ts test/package.test.ts` — 11 tests pass.
- Full: `npm test` — 11 tests pass; `npm run check` and `git diff --check` pass.
- Package smoke: `pi --approve --no-session --no-tools --mode json -p "Reply exactly: OK"` — returned `OK`.

## Review / next slice

- User approved facet-alignment skill workflow on 2026-08-02; task complete.
- Next candidate: `configure-default-starting-facet-preset`.

## Notes

- Former task scope: `agreed`.

- Prompt injection technically occurs each agent start; mismatch behavior must not.
