---
id: 019fdd8a-0039-7ffd-b626-bab004505965
name: support-facet-none-and-default-settings
created_at: 2026-08-07T18:43:56.601Z
desc: "Support two currently unsupported facet configuration cases: an explicit 'none' value in preset facet elements, and facet-element settings in default.md rather than only a preset."
tags: []
status: done
priority: medium
---

## Scope

### Desired outcome

- Support partial preset and default facet compositions, including explicit `none` and per-axis overrides of a default preset.

### In scope

- Preset axes may be named facet references, `none`, or omitted; omitted means none.
- `default.md` may specify a `preset`, direct axis settings, or both.
- A direct axis setting in `default.md` overrides that axis from its configured preset; `none` removes it.
- Documentation and focused tests for syntax, normalization, precedence, and invalid configuration.

### Out of scope

- New facet axes, automatic inference, a default-config editor, and changes to explicit session-history behavior.
- Changing existing complete preset/default configuration semantics.

### Existing behavior to preserve

- Existing complete presets and preset-only defaults continue to resolve unchanged.
- Default state remains transient; explicit set-axis, preset application, and clear history override defaults.
- Invalid/missing project defaults silently fall through to global; invalid/missing global defaults yield no facets.

### Acceptance

- A preset may select any subset of axes; omitted axes and `none` yield no active facet for that axis.
- A default may use direct axes without a preset, with omitted axes yielding none.
- A default may use a preset plus direct axes, and each direct axis overrides the preset value; `none` removes that preset axis.
- Existing complete presets and preset-only defaults retain their behavior.
- Invalid configurations preserve the existing silent project-to-global fallback.
- Focused tests cover partial presets/defaults, overrides, `none`, invalid references/combinations, precedence, and explicit-history override.

## Open questions

- None.

## Decisions

- Omitted preset/default axes mean none.
- `default.md` direct axis settings override the same axes supplied by `preset`; this includes `none`.
- User confirmed refinement on 2026-08-07.

## Plan

1. Represent partial preset/default compositions and normalize `none` to an absent axis.
2. Extend default parsing/resolution to merge a preset with direct axis overrides.
3. Preserve current default precedence and explicit-history behavior.
4. Add focused tests and document the configuration forms.

## Implemented so far

- Implemented partial preset axes: named facets are optional; `none` and omissions remove the axis.
- Implemented default compositions: direct axes alone, a preset alone, or preset plus per-axis overrides; `none` removes a preset axis.
- Kept project-to-global fallback and explicit-history behavior unchanged.
- Added focused parser/resolution tests for partial presets, direct defaults, overrides, `none`, trust, and fallback.
- Documented partial presets and global/project default composition, overrides, `none`, and fallback behavior in the README.

## Checks

- `npm test -- --run test/facets.test.ts` — 16 tests pass after the final documentation update.
- `npm run check` — passes after the final documentation update.
- `git diff --check` — passes after the final documentation update.

## Review / next slice

- User approved the completed implementation on 2026-08-07.
- Likely next slice/task: none.

## Notes

- Former task scope: `agreed`.

- Default parser/result types must distinguish invalid configuration from a valid empty composition so fallback behavior remains correct.
