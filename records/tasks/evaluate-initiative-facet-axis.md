---
id: 019fbc05-4357-7263-9af1-85f33877436f
name: evaluate-initiative-facet-axis
created_at: 2026-08-01T06:31:29.367Z
desc: "Review whether action breadth needs persistent initiative facet axis."
tags: []
status: done
priority: medium
---

## Scope

### Desired outcome

- Decide whether `initiative` should become fourth persistent facet axis, remain workflow guidance, or be skipped.

### In scope

- Review cross-domain evidence for constrained, pragmatic, and autonomous action breadth.
- Compare new axis against role, authority, style, and skills.
- Define minimal semantics and costs if adopted.

### Out of scope

- Implementing a new axis before agreement.
- Tool gating or execution permission changes.

### Existing behavior to preserve

- Role is perspective, authority is decision ownership, style is communication.
- Explicit user control and no silent switching.

### Acceptance

- Decision records adopt, defer with evidence threshold, or skip.
- If adopted, task shape covers components, presets, persistence, status, and suggestions.

## Open questions

- Is evidence from web/visual/implementation work sufficient?
- Can workflow guidance solve recurring action-breadth friction without a new axis?

## Decisions

- Current accepted decision keeps initiative as candidate. See `records/decisions/keep-initiative-axis-as-candidate.md`.
- Review closed on 2026-08-01: current examples map to workflow/domain rules; no manual persistent knob need observed.

## Plan

- Collect and compare examples from multiple domains.
- Run trade-off review before any implementation task.

## Implemented so far

- Reviewed backlog, generic implementation, visual iteration, web-platform, and Three.js examples; no axis implementation authorized.

## Checks

- Trade-off review completed; user chose defer and close on 2026-08-01.

## Review / next slice

- Ready for review: completed; deferred by user on 2026-08-01.
- Likely next slice/task: reopen only on `initiative-axis-evidence` or `cross-domain-action-scope-friction`.

## Notes

- Former task scope: `draft`.

- Draft review task; does not reopen accepted decision by itself.
