---
id: 019fca1e-4c3c-7bfb-b03e-d498e9133f37
name: add-storybrand-skill-with-source-references
created_at: 2026-08-04T00:13:31.068Z
desc: "Move StoryBrand workshop and content-alignment skills to global Pi scope because they are unrelated to pi-facets."
tags: []
status: done
scope: agreed
---

## Scope

### Desired outcome

- Move StoryBrand workshop and content-alignment skills from pi-facets into global Pi scope.

### Confirmed behavior

- Use curated public URLs plus user-supplied local material only.
- Do not copy third-party PDFs or transcripts into repo without explicit reuse permission.
- Ask for output path before artifact creation; user may choose chat-only output.
- User-provided local sources must record source path, origin or permission note, and claim boundaries.
- StoryBrand supports any user-requested content type; it is one method usable alongside `website-messaging`, not a website-only handoff.

### In scope

- Global skills: `~/.pi/agent/skills/storybrand/SKILL.md` and `~/.pi/agent/skills/storybrand-review/SKILL.md`.
- Shared global reference: `~/.pi/agent/skills/storybrand-references/references/storybrand-framework.md`.
- Preserve workshop, content-alignment, source/claim, and artifact-output behavior already implemented.

### Out of scope

- pi-facets package skills, facets, presets, extension, tests, and documentation.

### Plan

1. Move skills and shared reference to global Pi scope.
2. Update relative references.
3. Confirm project no longer contains StoryBrand skill resources. **Next slice.**

## Implemented so far

- Moved `storybrand` and `storybrand-review` to `~/.pi/agent/skills/`.
- Moved shared reference to `~/.pi/agent/skills/storybrand-references/references/`.
- Updated both global skills to resolve shared reference at new location.

## Review / next slice

- Approved complete by user 2026-08-04. Global skills are outside pi-facets; project StoryBrand resources removed.

### Acceptance

- Workshop produces/refines all seven BrandScript sections from supplied inputs.
- Review skill identifies script/content gaps; it can steer, rewrite, or generate requested content against a supplied script.
- Missing script directs user to workshop; missing evidence becomes explicit assumptions or questions; claims are never invented.
- Output path is requested before writing; no file for chat-only output.
- Public refs remain URLs; local material is used only when user supplies it with provenance and claim boundaries.
- `npm run check` and focused tests pass.
