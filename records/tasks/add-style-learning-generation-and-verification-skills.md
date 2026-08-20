---
id: 019fca31-ac20-7691-8f59-2e8bc449a3d6
name: add-style-learning-generation-and-verification-skills
created_at: 2026-08-04T00:34:40.800Z
desc: "Move generic style-learning, generation, and verification skills to global Pi scope because they are unrelated to pi-facets."
tags: []
status: done
priority: medium
---

## Scope

### Desired outcome

- Move generic `style-learner`, `style-verifier`, and `style-doc-generator` skills into global Pi scope.

### Confirmed behavior

- Resolve `<name>` profile from `.pi/style-profiles/<name>.md`, then `~/.pi/style-profiles/<name>.md`.
- `style-doc-generator` creates new Markdown docs and rewrites existing ones while preserving stated meaning.
- `style-verifier` reports grounded findings without edits by default. Explicit apply mode may change deterministic anti-pattern matches only.
- Learner requires a default minimum corpus of 1,000 words and three representative excerpts; ask user when inputs do not meet this.

### In scope

- Global skill paths: `~/.pi/agent/skills/style-learner/`, `style-doc-generator/`, and `style-verifier/`.
- Shared global reference: `~/.pi/agent/skills/style-profile-references/references/style-profiles.md`.
- Preserve existing profile, generation, verification, provenance, and heuristic-metric behavior.

### Out of scope

- pi-facets package skills, facets, presets, extension, tests, and documentation.

### Reference

- Claude Night Market Scribe plugin: https://github.com/athola/claude-night-market/tree/main/plugins/scribe
- Relevant source skills: `style-learner`, `voice-review`, and `doc-generator`.

### Plan

1. Move skills and shared reference to global Pi scope.
2. Update relative references.
3. Confirm pi-facets has no style skill resources. **Next slice.**

## Implemented so far

- Moved all three skills to `~/.pi/agent/skills/`.
- Moved shared reference to `~/.pi/agent/skills/style-profile-references/references/`.
- Updated global skill links to shared reference.

## Review / next slice

- Approved complete by user 2026-08-04. Global skills are outside pi-facets; project style skill resources removed.

### Acceptance

- Learner creates usable profile from supplied exemplars; identifies insufficient corpus or context.
- All skills use project-first, global-second profile resolution and give actionable missing-profile error.
- Generator creates or rewrites Markdown according to profile and preserves stated meaning on rewrites.
- Default verifier never edits target; every finding is grounded in target text.
- Apply mode changes only exact anti-pattern matches and shows changes.
- `npm run check` and tests pass.

## Notes

- Former task scope: `agreed`.
