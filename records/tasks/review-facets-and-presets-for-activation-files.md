---
id: 019fca17-b040-7080-9d31-a79abdb7c472
name: review-facets-and-presets-for-activation-files
created_at: 2026-08-04T00:06:00.358Z
desc: "Review every existing facet and preset for need for optional one-time activation Markdown; identify needed additions or alterations. Concise/Caveman and implementation/Ponytail known candidates."
tags: []
status: todo
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

- Add `.pi/facets/style/concise.activation.md`: terse phrasing, fragments/abbreviations, technical substance, arrows, and exceptions for security, irreversible actions, or user confusion.
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

### Acceptance

- Both valid sibling files load without diagnostics.
- Each injects once only when its matching facet becomes active or restored.
- Persistent facet bodies continue injecting per turn.
- `npm run check` and focused tests pass.
