---
id: 019fc483-4412-7096-99e4-4b15235b9306
name: add-ghostwriter-facet
created_at: 2026-08-02T22:06:04.818Z
desc: "Add a source-bounded long-form ghostwriter role and preset for original drafts and substantial rewrites."
tags:
  - facets
  - ghostwriting
  - presets
status: review
scope: agreed
---

## Scope

### Desired outcome

- Pi can apply a dedicated ghostwriter preset to create or substantially rewrite a long-form article from a complete brief and supplied source material.

### In scope

- Define one `ghostwriter` role for long-form articles, blogs, essays, newsletters, explainers, and thought leadership.
- Define reusable `prose-craft` style.
- Define one `ghostwriter` preset using `recommend-and-proceed` and `prose-craft`.
- Support original-draft, substantial-rewrite, and research-bundle-to-essay input modes.
- Before full drafting, request missing audience, goal, target channel, desired voice, or source material.
- Use supplied source material only; flag unsupported claims.
- Ask per request whether output needs draft-only, brief notes, detailed rationale, or a claim ledger.
- Treat voice fidelity, original expression, reader flow, and strategic impact as brief-selected priorities.
- If no priority is supplied, return three short directions with differentiated outlines/openings; expand selected direction into full prose.

### Out of scope

- Editorial polishing of a supplied draft; retain under `editorial-review`.
- Marketing web copy, conversion strategy, and CTA/positioning work.
- Autonomous web research or uncited factual claims.
- Publishing, distribution, or CMS integration.

### Existing behavior to preserve

- Role and style files remain single-axis.
- Presets reference components and do not duplicate role or style behavior.
- Artifact voice follows user brief; session conversation style does not override it.
- User retains publishing approval.

### Acceptance

- Role and `prose-craft` Markdown validate with required frontmatter and confine behavior to their respective axes.
- Preset resolves `ghostwriter`, `recommend-and-proceed`, and `prose-craft` components.
- Applied preset distinguishes original draft, rewrite, and research-synthesis inputs.
- Applied preset asks for incomplete brief fields before full prose.
- Applied preset does not introduce unsupported claims and flags evidence gaps.
- Applied preset asks for desired companion output per request.
- Applied preset uses supplied writing priority or returns three short directions when priority is absent.
- `npm run check` and relevant tests pass.

## Open questions

- None.

## Decisions

- 2026-08-02: First scope optimizes long-form articles, not marketing web copy or technical writing.
- 2026-08-02: Support original draft and substantial rewrite modes, including research-bundle synthesis.
- 2026-08-02: Use supplied sources only and flag unsupported claims.
- 2026-08-02: Ask for incomplete brief fields before drafting.
- 2026-08-02: Ask per request which companion output is wanted.
- 2026-08-02: Add reusable `prose-craft` style; ghostwriter is its first preset use.
- 2026-08-02: Missing writing priority yields three short, differentiated directions before full drafting.
- 2026-08-02: Keep ghostwriting separate from editorial review.

## Plan

- Add ghostwriter role, prose-craft style, and ghostwriter preset Markdown.
- Add or update focused tests if component discovery/validation coverage needs it.
- Run project checks.

## Implemented so far

- Added `ghostwriter` role for source-bounded original drafts, substantial rewrites, and research-bundle essays.
- Added reusable `prose-craft` style for artifact voice, flow, and long-form reader impact.
- Added `ghostwriter` preset: `ghostwriter + recommend-and-proceed + prose-craft`.
- No static Markdown coverage added; pi-facets validates components and presets during discovery.

## Checks

- `attendant validate --no-correct`: passed before record creation.
- `npm run check`: passed.
- `npm test -- test/facets.test.ts`: passed (8 tests).
- `git diff --check`: passed.

## Review / next slice

- Ready for review: yes; role, style, and preset implementation complete.
- After approval: choose next agreed task.

## Notes

- Avoid broadening first version into marketing copy or autonomous research.
- Coordinate naming and boundaries with editorial-review task.
