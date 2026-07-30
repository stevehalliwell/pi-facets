---
id: 019fb0b0-e39d-7d3c-8c8b-605aac367aad
name: support-project-local-modes
created_at: 2026-07-30T01:43:30.461Z
desc: ""
tags: []
status: todo
scope: draft
depends_on:
  - tasks/implement-mode-extension
---

## Scope

### Desired outcome

Allow projects to define mode components local to their repository while retaining global components.

### In scope

- Discover project-local role, authority, and style definitions under project `.pi/modes/`.
- Keep global definitions available as defaults.
- Project-local components shadow same-named global components; unmatched components fall back to global.
- Do not merge component files.
- Validate local components with the same single-axis contract.
- Make active source scope inspectable through mode queries.

### Out of scope

- Project-local tool restrictions.
- Automatic mode inference.
- Preset implementation beyond resolving project-local components.
- Persistent UI indicators.

### Existing behavior to preserve

- Global mode components continue working outside projects.
- Explicit component selection remains deterministic.
- Tool calling remains unrestricted.

### Acceptance

- Project-local components are discovered without extension-code changes.
- Resolution behavior is documented and tested for global-only, project-only, and collision cases.
- Invalid local components produce actionable errors.

## Open questions

- Exact project directory and supported search boundaries.
- Exact search boundaries and behavior when project root cannot be identified.
- Trust/security behavior for repository-provided Markdown.

## Decisions

- Project-local modes are required direction.
- Project-local components shadow same-named global components with global fallback.

## Plan

- Review Pi project instruction/config discovery conventions.
- Propose local layout and precedence.
- Implement discovery and validation after agreement.
- Add focused resolution tests.

## Implemented so far

- Task captured from deferred-question review.

## Checks

- Not started.

## Review / next slice

- Ready for review: no; scope remains draft.
- Likely next slice/task: agree project-local layout and precedence.

## Notes

- Keep global/project source boundaries explicit in `/mode show` or equivalent query output.
