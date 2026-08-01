---
id: 019fbbff-7a3a-74d3-aed2-2bb46cf38fcf
name: add-okf-research-artifact-capture
created_at: 2026-08-01T06:25:10.202Z
desc: "Persist research and standards verification as OKF-compatible Markdown artifacts."
tags: []
status: todo
scope: agreed
---

## Scope

### Desired outcome

- Research and incidental standards verification save reusable, OKF v0.2-compliant Markdown artifacts by default.

### In scope

- Follow canonical Open Knowledge Format v0.2 specification.
- When project bundle root is unknown, ask user for it; retain supplied root for current session.
- Once root is supplied, initialize missing bundle structure automatically:
  - `index.md` with `okf_version: "0.2"`;
  - `references/` source concepts;
  - `research/` synthesis concepts.
- Create one `Reference` concept per source under `references/`.
- Create one `Research Synthesis` concept per research question under `research/`.
- Source notes include `type`, title, description, resource URL, tags, generated metadata, summary, evidence/excerpts, relevance, confidence, and limits.
- Synthesis notes include `type`, title, description, tags, generated metadata, linked `sources`, question, findings with footnotes, recommendation, and uncertainty/limits.
- Use standard Markdown links/footnotes for graph/provenance.
- Capture standalone research and incidental standards verification; explicit discussion-only request opts out.
- Update web-implementation dependency contract, research skills/docs, and focused checks.

### Out of scope

- Persistent project mapping/config file, automatic root discovery, or asking for source/synthesis subpaths.
- Full source-page archival, invented storage beyond agreed bundle layout, facet state, or status UI changes.
- Trust verification, attested computations, or custom OKF runtime tooling.

### Existing behavior to preserve

- Evidence stays distinct from inference and recommendations.
- User retains control over material conclusions.
- Existing web research tools remain usable.

### Acceptance

- Unknown root asks user before research artifacts are written.
- Supplied root initializes valid minimal OKF v0.2 bundle when absent.
- Every non-reserved created Markdown concept has parseable frontmatter with non-empty `type`.
- One Reference concept is saved per source; one linked Research Synthesis is saved per question.
- Notes contain agreed evidence/provenance and synthesis fields.
- Discussion-only request creates no artifacts.
- Session remembers supplied root without writing project config.
- Tests/docs cover unknown root, existing/absent bundle, normal research, incidental verification, and opt-out.

## Open questions

- None.

## Decisions

- Use canonical OKF v0.2 spec: `https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md`.
- Ask only for bundle root per project/session; do not require project config or subpath mapping.
- Initialize `index.md`, `references/`, and `research/` automatically once root is supplied.
- Save one Reference per source and one Research Synthesis per question.

## Plan

1. Read current research/competitor skill patterns and define reusable OKF helper boundary.
2. Implement session-scoped root acquisition and safe bundle initialization.
3. Implement reference/synthesis Markdown generation with links and provenance.
4. Update affected skills and dependent web workflow wording.
5. Add focused file/output checks and run full validation.

## Implemented so far

- Task refinement only; no implementation changes.

## Checks

- Canonical OKF v0.2 spec researched and refinement confirmed by user on 2026-08-01.

## Review / next slice

- Ready for review: no; ready to select for implementation.
- Likely next slice/task: mark `doing`, then inspect research-skill integration and safe session root state.

## Notes

- Missing root asks user; supplied root enables automatic compliant saving.
