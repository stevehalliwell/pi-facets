---
id: 019fd435-9d50-73e7-90c7-48d8c542eb1b
name: remove-delivery-planning-preset
created_at: 2026-08-05T23:15:11.312Z
desc: "Remove the unassociated project delivery-planning preset and its references."
tags:
  - presets
  - cleanup
status: done
priority: medium
depends_on: null
---

## Scope

### Desired outcome

- The project no longer ships the `delivery-planning` preset.

### In scope

- Remove the preset and its documentation and test references.

### Out of scope

- Adding a delivery-planning skill or replacing the preset with another workflow.

### Existing behavior to preserve

- Existing explicit facet selection and all unrelated presets remain unchanged.

### Acceptance

- No project `delivery-planning` preset remains.
- Documentation and tests no longer list it.
- Focused resource-discovery and package checks pass.

## Open questions

- None.

## Decisions

- 2026-08-06: Maintainer requested removal of the unassociated project preset; no project skill exists to remove.

## Plan

1. Remove the preset and references.
2. Run focused resource-discovery and package checks.

## Implemented so far

- Removed `.pi/facets/presets/delivery-planning.md`.
- Removed the Delivery planning row and preset list entry from `docs/facet-grid.md`.
- Removed the deleted preset from `test/package.test.ts` resource-existence coverage.

## Checks

- `npm test -- test/package.test.ts` passed (15 tests).
- Confirmed no live `delivery-planning` or “delivery planning” references remain in `README.md`, `docs/`, `.pi/`, `extensions/`, `test/`, or `package.json`; historical task and decision records are preserved.

## Review / next slice

- Ready for review: complete; maintainer approved removal on 2026-08-06.
- Likely next slice/task: `remove-project-five-whys-preset` after global skill availability is verified.

## Notes

- Former task scope: `agreed`.

- The standalone `delivery-lead` role remains intentionally: this task removes only the preset.
