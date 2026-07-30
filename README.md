# pi-facets

Composable modes, skills, and extensions for Pi agent.

## Overview

pi-facets separates persistent agent behavior from task workflows, project context, and references:

- **Modes** provide role, decision authority, and conversation style.
- **Skills** provide repeatable task workflows and output contracts.
- **Project context** provides repository and product facts outside modes and skills.
- **References** provide framework or standards material loaded only when needed.

A thin Pi extension composes selected mode components into each agent run. pi-facets does not limit or gate tool calls.

## Status

Core implementation is complete for:

- `/mode` selection, inspection, clearing, and session restoration;
- role, authority, and style components;
- global, package, and trusted project-local mode discovery;
- named mode presets;
- four independently invokable workflow skills;
- focused extension and package tests.

Deferred until evidence or a concrete need appears:

- automatic mode inference or task/mode mismatch detection;
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

`package.json` declares `extensions/` and `skills/` as package resources. Pi discovers them through project settings.

## Modes

### Commands

```text
/mode
/mode show
/mode clear
/mode role <name>
/mode authority <name>
/mode style <name>
/mode presets
/mode preset
/mode preset <name>
/mode preset show <name>
```

`/mode` and `/mode preset` open interactive selectors in TUI mode. Use explicit commands in print or non-interactive mode.

Selecting one component replaces the previous component on that axis. `/mode show` reports active component name, source, and path. Active state is stored in compact transcript entries and restored when the session or branch is resumed. If a persisted component is no longer available, Pi reports an actionable missing-reference warning.

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

Add a package component under `modes/{roles,authority,style}/`. No extension-code change is required.

### Discovery and precedence

Sources resolve in this order:

1. trusted project: `<cwd>/.pi/modes/{roles,authority,style}/`;
2. package: `modes/{roles,authority,style}/`;
3. global: `~/.pi/agent/modes/{roles,authority,style}/`.

A higher-precedence component shadows a same-named lower-precedence component. Files are never merged. Project discovery uses current `cwd` only. Untrusted projects skip local mode Markdown and retain package/global components. Invalid trusted components produce diagnostics.

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

Optional notes shown by `/mode preset show implementation-review`.
```

Global presets live under `~/.pi/agent/modes/presets/`. Trusted project presets live under `<cwd>/.pi/modes/presets/` and shadow same-named global presets. Preset references must resolve to available components.

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

Pi exposes skill descriptions for automatic routing and registers `/skill:<name>` commands for explicit invocation. Keep workflows, output contracts, and workflow-specific references in skills. Do not duplicate persistent mode behavior, project facts, or tool policy. Add references or helper files only when they reduce context or repetition.

Current skills:

- `backlog-refinement` — turn vague backlog work into bounded, accepted task shape;
- `competitor-analysis` — produce evidence-backed competitor comparisons;
- `website-messaging` — review or rewrite positioning, page copy, proof, and calls to action;
- `technical-review` — assess feasibility, trade-offs, risks, and validation before coding.

Add a skill under `skills/<name>/SKILL.md`; extension code does not need changing.

## Project context and references

Project facts belong in `AGENTS.md`, product docs, architecture docs, or other project context files. Frameworks, standards, and detailed supporting material belong in skill references. Modes and skills should point to these sources rather than duplicate them.

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
- `modes/` — package mode components;
- `skills/` — independently invokable workflows and references;
- `records/tasks/` — Attendant-backed task records;
- `records/decisions/` — Attendant-backed durable decisions;
- `pi-modes-and-skills-implementation-brief.md` — indicative design context, not binding specification.

For Pi extension and skill API details, use the installed Pi documentation. Recorded decisions supersede the indicative brief.
