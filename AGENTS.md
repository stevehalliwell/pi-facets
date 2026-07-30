# pi-facets agent guidance

Read `README.md` before work. Human-facing setup, commands, usage, and repo layout belong there.

## Context

- Read `pi-modes-and-skills-implementation-brief.md` for design context; recorded decisions supersede it.
- Read `.pi/attendant.tables`, run `attendant_schema`, then query tracked work before reading record paths.
- Read `.pi/handoff.md` if present; Git state and Attendant records are authoritative.

## Implementation rules

- Prefer Markdown and existing Pi APIs over new abstractions or dependencies.
- Keep mode files single-axis; do not duplicate skill workflow or project facts.
- Keep extension state thin and explicit.
- Automatic inference and model switching are out of first milestone.
- Do not limit, gate, or enforce tool calls unless user explicitly revisits this decision.
- Preserve explicit mode overrides and fail with actionable errors for invalid mode files.

## Protected paths

Do not edit unless task explicitly targets them:

- `.attendant/`, build output, test output, and caches.
- Dependency directories and package-manager caches.
- CI/release config, binary/media assets, and backups.
