---
id: 019fca17-b040-7080-9d31-a79abdb7c472
name: review-facets-and-presets-for-activation-files
created_at: 2026-08-04T00:06:00.358Z
desc: "Review every existing facet and preset for need for optional one-time activation Markdown; identify needed additions or alterations. Concise/Caveman and implementation/Ponytail known candidates."
tags: []
status: done
scope: agreed
---

## Scope

### Desired outcome

- Review all existing facets and presets for useful one-time context, then add only selected sibling activation files while preserving compact per-turn facet bodies.

### Review findings

- Audited 23 facets and 15 presets. No activation files exist.
- Presets are composition-only and cannot own activation content.
- Selected candidates:
  - `style/concise`: one-time Caveman communication detail.
  - `roles/dev-peer`: one-time Ponytail engineering priorities; this role is used by `implementation-partner`.
- No additional safe candidates found. Other potential additions would duplicate persistent stance or put repeatable workflow, source/tool rules, or output contracts into an activation file; those belong in skills or references.

### In scope

- Add `.pi/facets/style/concise.activation.md`: source-derived full Caveman guidance for terse phrasing, fragments, technical fidelity, standard acronyms only, no causal arrows, and clarity exceptions.
- Add `.pi/facets/roles/dev-peer.activation.md`: YAGNI ladder, trace real flow/root cause, small diffs, avoid speculative abstractions, preserve security/accessibility/validation, and proportionate checks.
- Add focused tests for valid discovery and one-time activation behavior.

### Out of scope

- Changes to global `AGENTS.md`.
- Activation files for presets or any other facet.
- Moving repeatable workflows or required source/tool rules from skills or references.

### Existing behavior to preserve

- Facet bodies inject on every turn.
- Activation content injects only once when matching facet becomes active or restored.
- Explicit facet overrides and preset composition remain unchanged.

### Plan

1. Add two activation Markdown siblings without frontmatter.
2. Add focused discovery/lifecycle tests.
3. Run project validation.

## Implemented so far

- Added reduced full-mode Caveman activation guidance in `style/concise.activation.md`.
- Added reduced full-mode Ponytail activation guidance in `roles/dev-peer.activation.md`.
- Added bundled-resource discovery coverage; existing lifecycle coverage exercises one-time injection and persistent body injection.

## Decisions

- Source reviewed from `JuliusBrussee/caveman` commit `7066cc8` and `DietrichGebert/ponytail` commit `16f2980`.
- Caveman source rejects invented abbreviations and causal arrows. User approved the source-derived full-mode activation text 2026-08-04; global instructions remain out of scope.
- User requested full source bodies in both activation files before task-specific reduction or reconciliation, then approved reduced full-mode text.

## Checks

- `npm test -- --run test/facets.test.ts` — 15 pass.
- `npm test -- --run test/package.test.ts -t "ships agreed facet"` — pass.
- `npm run check` — pass.
- `git diff --check` — pass.

## Review / next slice

- Approved complete by user 2026-08-04.

### Acceptance

- Both valid sibling files load without diagnostics.
- Each injects once only when its matching facet becomes active or restored.
- Persistent facet bodies continue injecting per turn.
- `npm run check` and focused tests pass.
