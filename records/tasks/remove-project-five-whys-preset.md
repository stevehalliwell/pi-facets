---
id: 019fd435-9d39-75fa-baf4-0ea202ffc0d7
name: remove-project-five-whys-preset
created_at: 2026-08-05T23:15:11.289Z
desc: "Remove the project Five Whys preset and retain the workflow as a Pi-global skill."
tags:
  - presets
  - skills
  - cleanup
status: done
scope: agreed
depends_on: null
---

## Scope

### Desired outcome

- The project no longer ships the `five-whys` preset or skill; the workflow remains available in Pi-global scope.

### In scope

- Move or install the `five-whys` skill in Pi-global scope before removing its project copy.
- Remove project preset, skill, documentation, and test references.

### Out of scope

- Changing Five Whys workflow behavior or other inquiry facets.

### Existing behavior to preserve

- Users can continue to run the Five Whys workflow from Pi-global scope.

### Acceptance

- No project `five-whys` preset or skill remains.
- Pi-global `five-whys` skill is available.
- Project documentation and tests no longer list the removed resources.

## Open questions

- None.

## Decisions

- 2026-08-06: Maintainer requested removal of the project preset while retaining the workflow as a Pi-global skill.

## Plan

1. Verify or install the Pi-global skill.
2. Remove project resources and references.
3. Run focused resource-discovery and package checks.

## Implemented so far

- Copied the unchanged workflow and reference to `C:/Users/steve/.pi/agent/skills/five-whys/`.
- Removed project `.pi/skills/five-whys/` and `.pi/facets/presets/five-whys.md`.
- Removed project documentation, resource-test, and fixture references; generic association fixtures now use `paired-skill`.

## Checks

- Verified both global skill files exist and both project resources are absent.
- Confirmed no live Five Whys references remain in project README, docs, `.pi/`, extension, tests, or package manifest.
- `npm test -- test/package.test.ts test/facets.test.ts` passed (29 tests).

## Review / next slice

- Ready for review: complete; maintainer approved removal on 2026-08-06.
- Likely next slice/task: select another agreed preset task or refine the draft `ghostwriter` investigation.

## Notes

- The standalone `inquiry-guide` role remains intentionally: this task removes only the preset and skill.
