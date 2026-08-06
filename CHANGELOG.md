# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.4.0]

### Added

- Brainstorming, note-taker, and tweaking presets with paired workflows for exploratory ideation, concise note capture, and rapid small changes.

### Changed

- Messaging strategy now covers customer-facing messaging beyond websites.
- Backlog refinement continues through eligible draft items one at a time after each agreed scope.
- README lists current example presets.

### Removed

- Five Whys, ghostwriter, and delivery-planning project presets and their project-local workflow resources.

## [0.3.0]

### Added

- `pi-facets install --scope project|global` CLI for copying bundled facets, activation siblings, and presets into project or personal Pi scope; existing files remain unchanged unless `--force` is passed.
- Optional `<facet-name>.activation.md` siblings for one-time facet context when a facet becomes active or is restored.
- Backlog-capture preset and skill for recording draft backlog items without inferring scope or implementation.

### Changed

- README documents bundled-facet installation, activation-file use, and backlog capture.

## [0.2.0]

### Added

- Preset-to-skill associations: explicit interactive preset selection shows its associated skill in the TUI and asks before running it; unavailable skills leave selected facets active and show an actionable error.
- Workflow skills and paired presets for editorial review, ghostwriting, Five Whys, and website art direction.
- Standalone workflow skills for Six Thinking Hats and report-only facet-resource audits.
- Resource-boundary guidance for facets, presets, skills, prompts, project context, and references.

### Changed

- Facet components now focus on compact single-axis expertise, decision authority, or response style; workflow steps remain in skills.

## [0.1.0]

### Added

- Initial project guidance, README, design brief, and Attendant-backed task/decision collections.
- Minimal Pi package manifest, TypeScript check, Vitest check, and project-local self-load settings.
- `/facets` interactive selection, inspection, clearing, session restoration, and active-status display for role, authority, and style components.
- Named facet presets, trusted project-local component and preset discovery, global fallbacks, and optional default presets.
- Project prompt templates plus workflow skills for backlog refinement, competitor analysis, implementation, technical review, website messaging, web implementation, Three.js performance, and release readiness.
- Facet-alignment workflow and structured Open Knowledge Framework artifact-capture reference for research work.
