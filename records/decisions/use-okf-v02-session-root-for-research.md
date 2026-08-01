---
id: 019fbce3-f6ba-7668-bc8e-b5b64b3aecbb
name: use-okf-v02-session-root-for-research
created_at: 2026-08-01T10:34:44.282Z
desc: ""
tags: []
status: accepted
revisit_triggers:
  - okf-version-change
  - research-storage-friction
  - cross-session-root-repetition
---

## Context

Research artifacts must be saved on disk as traversable Markdown. No OKF specification or project mapping existed locally. Canonical Open Knowledge Format v0.2 defines compliant bundle/document structure but deliberately does not prescribe a producer taxonomy or storage mapping.

## Decision

Use canonical OKF v0.2 for research artifacts. When project bundle root is unknown, ask user for root path; retain it only for current session. Once supplied, automatically initialize missing bundle root with `index.md`, `references/`, and `research/`. Save one `Reference` concept per source and one `Research Synthesis` concept per research question.

## Options considered

- User-provided canonical spec: accepted after web research identified official v0.2 specification.
- Project `.pi/okf.md` mapping: rejected; adds persistent project configuration before need.
- Global personal spec plus project overrides: rejected; adds more configuration/state.
- Ask every research task for full paths: rejected; repeated friction.
- Ask only bundle root then initialize standard producer folders: accepted; low-friction and compliant.

## Trade-offs / consequences

- Users must supply bundle root once per project/session.
- Bundle root is not persisted across sessions, so repeated root prompts may later justify configuration.
- `references/` and `research/` are producer conventions, not imposed by OKF itself.
- Research cannot save artifacts until root is supplied.

## Affected areas

- Research/competitor-analysis and web-implementation workflows.
- Session-scoped extension/skill state.
- Markdown generation, tests, and product documentation.

## Guardrails

- Every created non-reserved concept has parseable YAML frontmatter and non-empty `type`.
- Preserve evidence, provenance, uncertainty, and links; do not claim verification not performed.
- Do not invent other storage/config files or archive full source pages by default.
- Explicit discussion-only request creates no artifacts.

## Revisit trigger

- `okf-version-change`: canonical OKF version/schema changes.
- `research-storage-friction`: bundle layout or artifact creation produces user friction.
- `cross-session-root-repetition`: repeated root prompts justify persistent project/global mapping.
