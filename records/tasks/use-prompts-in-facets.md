---
id: 019fb54d-0f56-72f2-b0b3-234b4937aac7
name: use-prompts-in-facets
created_at: 2026-07-30T23:12:34.134Z
desc: ""
tags: []
status: done
scope: agreed
---

## Scope

### Desired outcome

Define how Pi prompt templates fit pi-facets without turning them into persistent facets.

### In scope

- Map prompt templates against role, authority, style, workflow, output-contract, context, and policy concerns.
- Add representative sample items to the comparison grid, including prompt-template examples.
- Decide whether any prompt templates belong in the package and define their boundary if so.
- Keep prompt templates outside persistent facet state unless evidence supports a different model.

### Out of scope

- Unrelated mode, skill, or extension changes.

### Existing behavior to preserve

- Existing mode, skill, and project-context boundaries.

### Acceptance

- Prompt-template responsibilities and non-responsibilities are explicit.
- Prompt templates are defined as one-shot workflow/framing inputs, not persistent facet state.
- Prompt sample/resource work is assigned to `tasks/expand-default-modes-and-test-presets`.

## Open questions

- None for this boundary decision.

## Decisions

- Pi prompt templates fit outside persistent role, authority, and style facets.
- Prompt templates may frame or launch workflows; skills remain workflow source of truth.
- Prompt templates must not silently select, override, or mutate facets.
- Prompt samples belong in the default-resource expansion task, not this task.

## Plan

- Inspect Pi prompt-template behavior and current facet composition points.
- Map prompt templates against the facet grid.
- Record boundary and transfer sample/resource work to the expansion task.

## Implemented so far

- Confirmed Pi feature is prompt templates invoked as `/name`; no built-in `/prompts` command.
- Defined prompt-template boundary and moved sample/resource scope to the expansion task.

## Checks

- Attendant validation passed after record update.

## Review / next slice

- Ready for review: yes; boundary decision complete.
- Likely next slice/task: `tasks/expand-default-modes-and-test-presets`.

## Notes

- Pi feature is prompt templates invoked as `/name`; there is no built-in `/prompts` command.
- No prompt implementation belongs in this task.
