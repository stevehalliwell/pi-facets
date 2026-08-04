---
id: 019fca31-ac20-7691-8f59-2e8bc449a3d6
name: add-style-learning-generation-and-verification-skills
created_at: 2026-08-04T00:34:40.800Z
desc: "Add one task covering style-learner, style-verifier, and style-doc-generator skills, informed by Claude Night Market Scribe."
tags: []
status: todo
scope: agreed
---

## Scope

### Desired outcome

- Add project-native `style-learner`, `style-verifier`, and `style-doc-generator` skills. They learn reusable writing profiles, generate or rewrite Markdown docs with one, and verify profile conformance.

### Confirmed behavior

- Resolve `<name>` profile from `.pi/style-profiles/<name>.md`, then `~/.pi/style-profiles/<name>.md`.
- `style-doc-generator` creates new Markdown docs and rewrites existing ones while preserving stated meaning.
- `style-verifier` reports grounded findings without edits by default. Explicit apply mode may change deterministic anti-pattern matches only.
- Learner requires a default minimum corpus of 1,000 words and three representative excerpts; ask user when inputs do not meet this.

### In scope

- One `SKILL.md` workflow for each named skill.
- Versionable Markdown profile format: voice, vocabulary, sentence and structural preferences, punctuation, anti-patterns, metrics, quoted excerpts, and sources.
- Generator request frame: target, audience, thesis, and selected profile.
- Verifier findings with target location or verbatim anchor, violated profile rule, evidence, severity, and suggested correction.
- Small fixture/profile validation checks per skill.

### Out of scope

- Profile registry, selection UI, automatic invocation, non-Markdown generation, and imported Night Market Scribe dependencies or metrics tooling.
- Long-form source-bounded drafting (`ghostwriting`) and editorial-only work (`editorial-review`).

### Reference

- Claude Night Market Scribe plugin: https://github.com/athola/claude-night-market/tree/main/plugins/scribe
- Relevant source skills: `style-learner`, `voice-review`, and `doc-generator`.

### Plan

1. Define shared profile resolution and format in skill instructions.
2. Add learner, generator, and verifier workflows with boundaries above.
3. Add focused fixtures/checks; run project validation.

### Acceptance

- Learner creates usable profile from supplied exemplars; identifies insufficient corpus or context.
- All skills use project-first, global-second profile resolution and give actionable missing-profile error.
- Generator creates or rewrites Markdown according to profile and preserves stated meaning on rewrites.
- Default verifier never edits target; every finding is grounded in target text.
- Apply mode changes only exact anti-pattern matches and shows changes.
- `npm run check` and tests pass.
