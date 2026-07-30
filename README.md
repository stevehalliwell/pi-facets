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

- Pi coding agent runtime.
- TypeScript-capable Pi extension environment: [TBD]

## Quick start

Toolchain setup is not configured yet: [TBD].

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
[TBD: test command]
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
