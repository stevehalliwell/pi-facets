# pi-facets

Composable facets, skills, and extensions for Pi agent.

## Overview

pi-facets separates persistent agent behavior from task workflows, project context, and references:

- **Facets** provide role, decision authority, and conversation style.
- **Skills** provide repeatable task workflows and output contracts.
- **Project context** provides repository and product facts outside facets and skills.
- **References** provide framework or standards material loaded only when needed.

A thin Pi extension composes selected facet components into each agent run. pi-facets does not limit or gate tool calls.

## Status

Core implementation is complete for:

- `/facets` selection, inspection, clearing, and session restoration;
- role, authority, and style components;
- trusted project-local and global facet discovery;
- named facet presets;
- four independently invokable workflow skills;
- focused extension and package tests.

Deferred until evidence or a concrete need appears:

- automatic facet inference or task/facet mismatch detection;
- model switching;
- separate persistent facets for user interaction versus generated artifacts;
- project-local tool restrictions;
- persistent UI indicators.

## Requirements

- Node.js `>=22.19.0`.
- Pi coding agent `>=0.83.0`.
- npm.

Pi loads TypeScript extensions through jiti. No extension build step is required.

## Quick start

```sh
npm install
npm run check
npm test
```

Project `.pi/settings.json` loads the repository root as a local Pi package. For non-interactive checks, approve project resources explicitly:

```sh
pi --approve --no-session --no-tools --mode json -p "Reply exactly: OK"
```

`package.json` declares `extensions/`, `skills/`, and `prompts/` as package resources. Pi discovers them through project settings.

## Facets

### Commands

```text
/facets
```

`/facets` opens the interactive facet menu. Each Presets, Role, Authority, and Style item shows its current selection; choose one to drill in. Role, Authority, and Style selections return to menu for another change. Submenus offer `(none)` to clear that selection and Back to return to menu. Choose Clear all facets to reset selection. Outside TUI, it prints current facet state.

Selecting one component replaces the previous component on that axis. Active state is stored in compact transcript entries and restored when the session or branch is resumed. If a persisted component is no longer available, Pi reports an actionable missing-reference warning.

### Component format

Each component is one Markdown file. Filename stem must match frontmatter `name`; `axis`, `description`, and body are required.

```markdown
---
name: product-owner
axis: role
description: Prioritises customer value, sequencing, and opportunity cost.
---

# Product owner

- Prioritise customer value and business outcomes.
- Make sequencing and scope explicit.
```

Supported axes:

- `role` — perspective used for decisions;
- `authority` — default decision authority;
- `style` — conversation style.

Add a project component under `.pi/facets/{roles,authority,style}/`. No extension-code change is required.

### Discovery and precedence

Sources resolve in this order:

1. trusted project: `<cwd>/.pi/facets/{roles,authority,style}/`;
2. global: `~/.pi/agent/facets/{roles,authority,style}/`.

Project components shadow same-named global components. Files are never merged. Project discovery uses current `cwd` only. Untrusted projects skip local facet Markdown and retain global components. Invalid trusted components produce diagnostics.

## Named presets

Presets compose one role, authority, and style component:

```markdown
---
name: implementation-review
description: Review implementation choices critically.
role: dev-peer
authority: advisory
style: critical
---

Optional notes may document intended use.
```

Global presets live under `~/.pi/agent/facets/presets/`. Trusted project presets live under `<cwd>/.pi/facets/presets/`. Sources resolve project → global; a project definition shadows a global one, including invalid definitions. Preset references must resolve to available components.

### Package examples

Project ships representative compositions for implementation review, backlog refinement, messaging strategy, research exploration, and delivery planning. See [`docs/facet-grid.md`](docs/facet-grid.md) for the resource grid.

Prompt templates are short, non-mutating request frames:

```text
/explore-options <topic>
/decision-brief <topic>
```

They do not select or mutate facets. Skills remain workflow source of truth.

## Skills

Skills are independently invokable workflows. Each skill is a directory containing `SKILL.md`:

```text
skills/
├── backlog-refinement/SKILL.md
├── competitor-analysis/SKILL.md
├── website-messaging/SKILL.md
└── technical-review/SKILL.md
```

Required frontmatter:

```yaml
---
name: skill-name
description: Trigger-rich description of when to use the skill and its goal.
---
```

Pi exposes skill descriptions for automatic routing and registers `/skill:<name>` commands for explicit invocation. Keep workflows, output contracts, and workflow-specific references in skills. Do not duplicate persistent facet behavior, project facts, or tool policy. Add references or helper files only when they reduce context or repetition.

Current skills:

- `backlog-refinement` — turn vague backlog work into bounded, accepted task shape;
- `competitor-analysis` — produce evidence-backed competitor comparisons;
- `website-messaging` — review or rewrite positioning, page copy, proof, and calls to action;
- `technical-review` — assess feasibility, trade-offs, risks, and validation before coding.

Add a skill under `skills/<name>/SKILL.md`; extension code does not need changing.

## Project context and references

Project facts belong in `AGENTS.md`, product docs, architecture docs, or other project context files. Frameworks, standards, and detailed supporting material belong in skill references. Facets and skills should point to these sources rather than duplicate them.

## Tool policy

pi-facets does not restrict, gate, or enforce tool calls. Execution permissions remain Pi and project configuration concerns.

## Test

```sh
npm test
npm run check
npm test -- test/package.test.ts
```

## Documentation and layout

- `extensions/` — thin stateful Pi extensions;
- `.pi/facets/` — project facet components and presets;
- `prompts/` — package prompt templates;
- `skills/` — independently invokable workflows and references;
- `docs/facet-grid.md` — package resource examples;
- `records/tasks/` — Attendant-backed task records;
- `records/decisions/` — Attendant-backed durable decisions;
- `pi-modes-and-skills-implementation-brief.md` — indicative design context, not binding specification.

For Pi extension and skill API details, use the installed Pi documentation. Recorded decisions supersede the indicative brief.
