---
id: 019fca1e-4c3c-7bfb-b03e-d498e9133f37
name: add-storybrand-skill-with-source-references
created_at: 2026-08-04T00:13:31.068Z
desc: "Add StoryBrand skill backed by curated reference media, potentially including YouTube transcripts and PDFs."
tags: []
status: todo
scope: agreed
---

## Scope

### Desired outcome

- Add standalone `storybrand` brand-script workshop skill. It creates a source-aware structured StoryBrand draft, assumptions, and source references; finished website copy remains `website-messaging` work.

### Confirmed behavior

- Use curated public URLs plus user-supplied local material only.
- Do not copy third-party PDFs or transcripts into repo without explicit reuse permission.
- Ask for output path before artifact creation; user may choose chat-only output.
- User-provided local sources must record source path, origin or permission note, and claim boundaries.

### In scope

- Add `.pi/skills/storybrand/SKILL.md`.
- Gather offer, audience, desired action, evidence, and constraints; label absent inputs as assumptions or questions.
- Produce seven-part BrandScript: character; external, internal, philosophical problem; guide empathy and authority; plan; direct and transitional CTA; failure stakes; success outcome.
- Include sources, confirmed facts, assumptions, unresolved choices, and `website-messaging` handoff in requested artifacts.
- Curated URL references:
  - https://storybrand.com/learn-the-framework/
  - https://storybrand.com/storybrand-clarify-your-message-new/
  - https://storybrand.com/downloads/intro-to-sb/Introduction-to-StoryBrand.pdf

### Out of scope

- Finished page copy, visual design, campaign build, automatic file creation, profile or artifact registry, local copies of third-party media, and claims of StoryBrand certification or endorsement.

### Plan

1. Add source-aware workshop instructions and BrandScript output shape.
2. Add source/claim-boundary handling and path-confirmation behavior.
3. Add focused fixture/check; run project validation.

### Acceptance

- Workshop produces all seven sections from supplied inputs.
- Missing evidence becomes explicit assumptions or questions; claims are never invented.
- Output path is requested before writing; no file for chat-only output.
- Public refs remain URLs; local material is used only when user supplies it.
- Handoff identifies `website-messaging` when page copy is next.
- `npm run check` and tests pass.
