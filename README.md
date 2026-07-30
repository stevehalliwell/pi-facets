# pi-facets

Composable modes, skills, and extensions for Pi agent.

## Overview

pi-facets separates persistent agent behavior from task workflows, project context, and references. Modes provide role, decision authority, and conversation style. Skills provide repeatable procedures. A thin Pi extension composes selected mode components into each agent run.

The ChatGPT-produced brief is indicative design input, not binding specification. Implementation details are refined as work progresses. pi-facets does not limit or gate tool calls.

## Status

Greenfield. First milestone is planned; implementation is not yet configured.

Planned initial capabilities:

- `/mode` selector with role, authority, and style axes.
- Session-persistent composed mode injection.
- Three role components, three authority components, and two style components.
- Four independently invokable stub skills.
- Basic mode loading, switching, clearing, and restoration tests.

Not included in first milestone: automatic inference, model switching, or project-local modes. Tool-call restriction is not a pi-facets goal.

## Requirements

- Node.js `>=22.19.0`.
- Pi coding agent `>=0.83.0`.
- npm.

Pi loads TypeScript extensions through jiti. No extension build step required.

## Quick start

```sh
npm install
npm run check
npm test
```

Project `.pi/settings.json` loads repository root as a local Pi package. For non-interactive checks, approve project resources explicitly:

```sh
pi --approve --no-session --no-tools --mode json -p "Reply exactly: OK"
```

`package.json` declares `extensions/` and `skills/` as package resources. Add resources there; Pi discovers them through project settings.

## Usage

After first milestone implementation:

```text
/mode
/mode role product-owner
/mode authority recommend-and-proceed
/mode style critical
/mode show
/mode clear
```

## Test

```sh
npm test
npm run check
npm test -- test/package.test.ts
```

## Documentation

- [`pi-modes-and-skills-implementation-brief.md`](pi-modes-and-skills-implementation-brief.md) — design, scope, and acceptance criteria.
- `modes/` — mode component definitions.
- `skills/` — task workflows and references.
- `extensions/` — Pi extension code.

## Repo layout

- `extensions/` — thin stateful Pi extensions.
- `modes/roles/` — role perspectives.
- `modes/authority/` — decision authority defaults.
- `modes/style/` — conversation style definitions.
- `skills/` — independently invokable workflows.
- `records/tasks/` — Attendant-backed task records.
- `records/decisions/` — Attendant-backed durable decisions.
