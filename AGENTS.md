# pi-facets project guidance

Global Pi rules already apply. This repo develops composable Pi modes, skills, extensions, and supporting docs. Keep implementation small, Markdown-driven, and independently extensible.

## Read first

- `README.md` — project purpose, planned milestone, layout, and commands.
- `pi-modes-and-skills-implementation-brief.md` — indicative design input, not binding specification.
- `.pi/attendant.tables` — configured record collections; run `attendant_schema` before querying tracked work.
- `.pi/handoff.md` — previous pickup summary, if present.
- Read record source paths only after Attendant identifies them.

## Verified commands

Record commands actually run in this repo. Current toolchain is not configured yet.

- Setup/install: [TBD]
- Test: [TBD]
- Focused test: [TBD]
- Lint/typecheck/build: [TBD]
- Required order, prerequisites, expensive checks, bench/profile policy: [TBD]
- Local wrappers/skills: Pi skills under `skills/`; extension code under `extensions/`.

## Project map and coding rules

- `extensions/` — Pi extensions; keep stateful behavior thin and explicit.
- `modes/` — composable role, authority, and style Markdown components.
- `skills/` — independently invokable task workflows and lazy references.
- `records/` — Attendant-backed tasks and durable decisions.
- `pi-modes-and-skills-implementation-brief.md` — indicative starting point for first milestone; recorded user decisions supersede it.
- Prefer Markdown and existing Pi APIs over new abstractions or dependencies.
- Keep mode files single-axis; do not duplicate skill workflow or project facts.
- Automatic inference and model switching are out of first milestone.
- Do not limit, gate, or enforce tool calls unless user explicitly revisits this decision.
- Preserve explicit mode overrides and fail with actionable errors for invalid mode files.

## Protected paths

Do not edit unless task explicitly targets them:

- Generated/build/cache: `.attendant/`, build output, test output.
- Vendored/deps: dependency directories and package-manager caches.
- CI/release config: [TBD]
- Binary/media/serialized assets: [TBD]
- Lockfiles policy: [TBD]
- Backups/archives: [TBD]

## Project-specific doc policy

- `README.md`: human-facing overview, setup, usage, and layout.
- `CHANGELOG.md`: user-visible changes, grouped under Unreleased until release.
- `pi-modes-and-skills-implementation-brief.md`: indicative design context; update when scope decisions change, without treating it as binding.
- Attendant collections: canonical tracked state; discover with `attendant_schema`, query with Attendant, edit Markdown records as source.
- `.pi/handoff.md`: agent-only resume pointer; create/update via `/skill:wrap-up` when real handoff content exists.

## Done means here

- First milestone acceptance criteria in the brief are met, or remaining gaps are recorded.
- Relevant tests/checks pass; if unavailable, record blocker and remaining risk.
- New modes/skills document their trigger, scope, and extension points without unrelated duplication.
- User-facing behavior changes update README and CHANGELOG as needed.
