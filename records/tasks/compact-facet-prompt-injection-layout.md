---
id: 019fba1e-cbda-7c9e-9c60-bf24b95565c0
name: compact-facet-prompt-injection-layout
created_at: 2026-07-31T21:40:08.282Z
desc: "Make injected active-facet prompt context more compact and consistently ordered Markdown."
tags: []
status: done
scope: agreed
---

## Scope

### Desired outcome

- Active facets inject compact, consistently ordered Markdown with visible source-format and estimated-token warnings.

### In scope

- Compose fixed layout:

  ```md
  ## Active facets

  **role: <name>**
  - ...

  **authority: <name>**
  - ...

  **style: <name>**
  - ...
  ```

- Keep role → authority → style order; omit unset axes and preset alias.
- Remove leading H1 from shipped package facet components; bodies start directly with list items.
- Update README component example/convention.
- Preserve external component content/injection, but warn for leading H1 or body not in compact list form.
- Estimate tokens as `ceil(character count / 4)`.
- Warn when active component exceeds 200 estimated tokens or active composition exceeds 500.
- Report format/size warnings on discovery, restore, selection, or state change; never per agent turn.
- Add focused tests for layout, warnings, and estimates.

### Out of scope

- Changing facet semantics, component instructions, selection behavior, skills, automatic routing, or token enforcement.
- Rewriting, stripping, or rejecting external component content.
- Subjective warnings for semantic overlap or instruction quality.

### Existing behavior to preserve

- All selected role, authority, and style instructions remain present exactly once.
- Existing session selection, persistence, explicit `/facets` controls, component discovery, and precedence remain unchanged.
- Existing malformed frontmatter, duplicates, and missing references remain errors.

### Acceptance

- Composed prompt uses agreed heading, bold labels, and fixed axis order with no duplicated package H1.
- Unset axes are omitted; no preset alias is injected.
- All shipped facet bodies are headingless list-first Markdown; README matches convention.
- External leading H1/non-list components remain usable and inject unchanged, with actionable warning.
- Estimated-token warnings fire above 200 per active component or 500 active total and do not fire per agent turn.
- Existing instructions, selection, persistence, and discovery behavior remain intact.
- Focused tests cover layout, source warnings, size warnings, and no-active-facet behavior.

## Open questions

- None.

## Decisions

- Use bold axis/name labels under `## Active facets`.
- Source convention applies to shipped package components; external content is warned then preserved.
- Token estimate is approximate `ceil(character count / 4)` with 200 per-component and 500 active-total warning budgets.
- Warning timing is selection/restoration/state change, not each agent turn.

## Plan

1. Locate composition, discovery diagnostics, and state-change paths.
2. Update shipped component bodies and README convention.
3. Implement compact renderer and warning helpers.
4. Add focused layout/warning tests.
5. Run full checks and inspect representative prompt output.

## Implemented so far

- Render active facets as headingless, fixed role → authority → style sections with bold axis/name labels.
- Warn without altering external component bodies for leading H1, non-list-first format, components over 200 estimated tokens, and active compositions over 500.
- Report active warnings on restore and state changes, never prompt injection; made shipped bodies list-first and headingless.
- Updated README convention and focused tests.

## Checks

- Focused: `npm test -- --run test/facets.test.ts` — pass.
- Full: `npm test` and `npm run check` — pass.
- `git diff --check` — pass.

## Review / next slice

- User approved compact prompt output on 2026-08-02; task complete.
- Next candidate: `add-generic-implementation-workflow-preset`.

## Notes

- Warnings inform user; they never alter active state or external component instructions.
