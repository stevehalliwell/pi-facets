---
id: 019fc967-228a-7215-81ca-2455f14a3c67
name: document-facet-activation-instructions
created_at: 2026-08-03T20:53:27.306Z
desc: "Document facet activation instruction files, their intended use, and relevant skill guidance."
tags: []
status: done
priority: medium
---

## Scope

### Desired outcome

- Authors can place broader one-time facet goals, rules, and operating context in an activation file without bloating per-turn facet prompts.
- `facet-craft` audits activation files as facet resources.

### In scope

- User-facing documentation for optional sibling `<facet-name>.activation.md` files.
- Guidance for choosing activation-only context versus persistent facet bodies and skills.
- `facet-craft` inventory and ownership guidance for activation files.

### Out of scope

- Changing activation runtime behavior.
- Moving existing global instructions into activation files.
- Editing skills other than `facet-craft`.

### Existing behavior to preserve

- Persistent facet bodies remain compact, per-turn instructions.
- Activation files are optional sibling Markdown files, injected once on activation/restoration.
- Skills own temporary, repeatable task workflow.

### Acceptance

- `README.md` shows activation-file naming and one-time lifecycle.
- `docs/resource-boundaries.md` distinguishes broad one-time facet goals/rules from persistent facet bodies and skill workflow.
- `.pi/skills/facet-craft/SKILL.md` inventories and evaluates activation siblings during audits.
- Guidance includes a Ponytail-style planning/execution context example without moving current instructions.

## Decisions

- Activation files may contain broader facet-specific goals, rules, and operating context that shape initial planning or execution but do not need per-turn repetition.
- Persistent compact stance remains in facet bodies; repeatable process remains in skills.

## Plan

- Update README authoring example and use guidance.
- Extend resource-boundary contract and audit guidance.
- Update `facet-craft` inventory and ownership checks.

## Implemented so far

- Captured and refined documentation scope.
- Added README authoring guidance for sibling activation files, lifecycle, and choosing activation context versus persistent body/skill content.
- Extended resource boundaries with activation-file ownership, broad planning/execution context, and Ponytail example.
- Updated `facet-craft` to inventory and audit activation siblings.

## Checks

- `attendant_validate --no-correct --strict` — pass before implementation.
- `git diff --check` — pass.
- `npm run check` — pass.

## Review / next slice

- Completed: authoring docs and `facet-craft` guidance.
- User approved; task complete.

## Notes

- Former task scope: `agreed`.
