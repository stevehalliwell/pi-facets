---
id: 019fbbff-7a3a-74d3-aed2-2bb46cf38fcf
name: add-okf-research-artifact-capture
created_at: 2026-08-01T06:25:10.202Z
desc: "Persist research and standards verification as OKF-compatible Markdown artifacts."
tags: []
status: todo
scope: draft
---

## Scope

### Desired outcome

- Online research and incidental implementation verification create organized, reusable OKF-compatible Markdown artifacts by default.

### In scope

- Source notes containing metadata/URL, concise summary, supporting evidence or excerpts, relevance, confidence, and limits.
- Synthesis notes connecting evidence to findings, uncertainty, and recommendations.
- Capture for standalone research and incidental standards verification.
- Explicit discussion-only opt-out.

### Out of scope

- Inventing an OKF schema, storage location, or taxonomy without project convention.
- Full archival of source pages by default.
- Changing facet state or status UI.

### Existing behavior to preserve

- Evidence is distinguished from inference and recommendations.
- User retains control over material conclusions.
- Existing web research tools remain usable.

### Acceptance

- Workflow resolves configured project OKF location/schema or fails with actionable guidance when absent.
- Each saved source note has agreed evidence fields.
- Synthesis is linkable to its source notes.
- Discussion-only request creates no artifacts.
- Tests/docs cover normal, incidental-verification, and missing-config paths.

## Open questions

- Where is OKF specification and storage convention configured for a project?
- Does every incidental verification need separate source note or may a shared standards note group related sources?

## Decisions

- Research artifact capture is default for both standalone and incidental research.
- Full extracted source text is not default; summary plus evidence is sufficient.

## Plan

- Locate or define project-facing OKF configuration contract.
- Review existing research/competitor-analysis skill behavior.
- Draft capture workflow and safe file-creation rules.

## Implemented so far

- None.

## Checks

- Not started.

## Review / next slice

- Ready for review: no; scope remains draft.
- Likely next slice/task: establish OKF configuration contract.

## Notes

- Missing configuration must not scatter arbitrary Markdown across project.
