---
id: 019fb0a1-1c08-76a7-9fb1-392db51dfc04
name: document-pi-facets
created_at: 2026-07-30T01:26:16.328Z
desc: ""
tags: []
status: done
priority: medium
depends_on:
  - tasks/implement-mode-extension
  - tasks/create-mode-components
  - tasks/create-initial-skills
  - tasks/setup-pi-extension-package-requirements
---

## Scope

### Desired outcome

Document first-milestone usage and extension points so a new role or skill can be added without changing extension code.

### In scope

- Explain modes, skills, project context, and references; state that pi-facets does not restrict tool calls.
- Document `/mode` commands and active-state behavior.
- Document mode file format and component discovery.
- Document skill layout and discriminative descriptions.
- Record first-milestone exclusions and deferred questions.
- Keep human README and agent guidance aligned with implementation.

### Out of scope

- Detailed framework/reference documentation.
- User-facing docs for deferred presets, inference, model switching, or tool-call restrictions.
- Handoff/status notes without real implementation progress.

### Existing behavior to preserve

- Global `AGENTS.md` stays short; detailed behavior remains in modes/skills.
- Project facts remain outside global skills and modes.

### Acceptance

- README documents current status, setup, checks, tests, repository layout, and implemented boundaries.
- README documents all implemented `/mode` commands, state restoration, missing-reference behavior, component format, discovery sources, precedence, trust gating, and named presets.
- README documents skill layout, required frontmatter, automatic discovery, explicit `/skill:name` invocation, and workflow boundaries.
- README distinguishes modes, skills, project context, references, and unrestricted tool calling.
- README records deferred work accurately: automatic mismatch detection/inference, model switching, communication-target facets, and tool restrictions.
- New role and skill components remain addable without extension-code edits.
- `AGENTS.md` remains short and has no contradiction with README; edit only if needed.
- Examples match implementation and `npm test` / `npm run check` pass.

## Open questions

- None for this documentation slice.

## Decisions

- README is primary human-facing and contributor documentation.
- Keep `AGENTS.md` limited to stable working rules; perform consistency audit and make only minimal corrective edits.
- Document current named presets and trusted project-local modes; do not describe implemented behavior as deferred.
- Do not duplicate Pi internal extension API details; link or point to Pi documentation when useful.
- Keep handoff/status notes out of README.

## Plan

- Rewrite stale README status and boundaries against current implementation.
- Add concise mode, preset, skill, project-local, and contributor-format sections.
- Audit `AGENTS.md` for contradictions; edit only if required.
- Verify command examples and run documentation-adjacent tests/checks.

## Implemented so far

- Task captured from implementation brief.
- Refinement agreed: README-primary boundary, current implementation coverage, deferred work, and validation checks.
- Rewrote README status, setup, commands, mode components, discovery, presets, skills, project context, references, tool policy, and deferred work.
- Audited AGENTS.md; no corrective edit required.

## Checks

- README implementation paths verified.
- `git diff --check` — passed.
- `npm test` — 12 tests passed.
- `npm run check` — passed.

## Review / next slice

- Approved and complete.
- Next: refine next actionable task when needed.

## Notes

- Former task scope: `agreed`.

- Avoid duplicating mode/skill content in README.
