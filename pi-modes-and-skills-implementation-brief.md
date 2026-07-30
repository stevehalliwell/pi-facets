# Pi Modes and Skills — Implementation Brief

> **Indicative only.** This ChatGPT-produced brief is a starting hypothesis, not binding specification. Refine details as pi-facets develops. Current project decision: do not limit or gate tool calls.

## Goal

Create a lightweight system for composing agent behaviour from separate concerns rather than maintaining large, duplicated personas.

The system should distinguish between:

- **Modes**: persistent session behaviour and perspective.
- **Skills**: task-specific processes and methods.
- **Project context**: facts about the current product, business, repository, and users.
- **References**: frameworks, standards, checklists, and supporting material.
- **Tool policy**: enforceable permissions and available tools.

The initial implementation should stay small, Markdown-driven, and easy to extend.

---

## Design principles

1. Keep the global `AGENTS.md` short.
2. Store detailed behaviour in composable Markdown files.
3. Use skills for workflows, not persistent personas.
4. Use a Pi extension only where state, enforcement, or UI is required.
5. Avoid duplicating domain facts or reference material across skills.
6. Prefer a few broad skills with lazily loaded references over many narrowly overlapping skills.
7. Make automatic mode selection conservative and transparent.
8. Allow the user to override any inferred mode explicitly.

---

## Behaviour axes

| Axis | Purpose | Storage / implementation |
|---|---|---|
| Role | Perspective used for decisions | Mode Markdown, selected by extension |
| Workflow | Procedure followed for a task | Pi skill |
| Decision authority | Whether the agent advises, recommends, or decides by default | Mode component |
| Execution authority | Whether the agent may edit files, run commands, deploy, etc. | Extension-enforced tool policy |
| Domain context | Facts about the business, product, customer, and repository | Project `AGENTS.md` and project docs |
| Reference material | Frameworks, standards, checklists, and examples | Skill reference files |
| Conversation style | Concise, exploratory, blunt, explanatory, etc. | Global defaults or switchable mode component |
| Output contract | Expected deliverable format | Skill instructions or prompt template |
| Session phase | Discovery, planning, implementation, review | Optional extension state |
| Model/tool profile | Model choice and enabled tools | Optional extension behaviour |

---

## Proposed directory structure

```text
~/.pi/agent/
├── AGENTS.md
├── extensions/
│   └── mode.ts
├── modes/
│   ├── roles/
│   │   ├── pragmatic-collaborator.md
│   │   ├── product-owner.md
│   │   ├── dev-peer.md
│   │   └── marketing-strategist.md
│   ├── authority/
│   │   ├── advisory.md
│   │   ├── recommend-and-proceed.md
│   │   └── decisive.md
│   └── style/
│       ├── concise.md
│       ├── exploratory.md
│       └── critical.md
└── skills/
    ├── backlog-refinement/
    │   └── SKILL.md
    ├── competitor-analysis/
    │   └── SKILL.md
    ├── website-messaging/
    │   ├── SKILL.md
    │   └── references/
    │       ├── storybrand.md
    │       ├── positioning.md
    │       └── calls-to-action.md
    └── technical-review/
        └── SKILL.md
```

A project may add:

```text
project/
├── AGENTS.md
├── docs/
│   ├── product.md
│   ├── customers.md
│   ├── positioning.md
│   └── architecture.md
└── .pi/
    └── skills/
        ├── website-implementation/
        └── website-review/
```

---

## Global `AGENTS.md`

The global file should contain only stable working preferences and routing rules.

It should tell the agent to:

- infer the appropriate role and workflow from the request;
- avoid asking for a mode when the choice is obvious;
- ask only when plausible modes would produce materially different outcomes;
- recommend a default when asking;
- state inferred mode changes briefly;
- load relevant skills and project instructions;
- respect the active tool policy;
- allow explicit mode overrides.

It should not contain detailed role definitions, workflow procedures, business facts, or large reference frameworks.

---

## Mode extension

The extension should be a thin stateful loader, not a large agent framework.

### Required commands

```text
/mode
/mode show
/mode clear
/mode role <name>
/mode authority <name>
/mode style <name>
```

A shorter shorthand may also be supported:

```text
/mode product-owner
```

### Required behaviour

The extension should:

1. Track the active role, decision authority, and conversation style.
2. Load their Markdown definitions.
3. Inject the composed mode into the system prompt before each agent run.
4. Persist mode state in the Pi session.
5. Restore mode state when a session is resumed.
6. Ensure a newly selected component supersedes the old component on the same axis.
7. Show the active mode through `/mode show`.
8. Provide a simple selector when `/mode` is called without arguments.
9. Allow all mode components to be cleared.
10. Fail clearly when a referenced mode file is missing or invalid.

### Optional behaviour

Later iterations may add:

- footer or status-line display;
- automatic mode suggestions;
- session-phase tracking;
- model selection by mode;
- mode-specific tool sets;
- tool-call permission checks;
- project-local mode definitions;
- named presets composed from several axes.

Example preset:

```yaml
name: website-copy-review
role: marketing-strategist
authority: recommend-and-proceed
style: critical
```

Presets should reference components rather than duplicate their contents.

---

## Mode file format

Keep mode files small and declarative.

Example:

```md
---
name: product-owner
axis: role
description: Prioritises customer value, business outcomes, sequencing, and opportunity cost.
---

# Product owner

Prioritise:

- customer value;
- business outcomes;
- clear sequencing;
- opportunity cost;
- testable acceptance criteria.

Challenge:

- work without a clear outcome;
- speculative complexity;
- features without supporting evidence;
- ambiguous backlog items.

Do not override execution permissions or workflow instructions.
```

Each mode component should define only one axis.

---

## Skills

Skills should represent repeatable processes.

Initial skills:

### `backlog-refinement`

Use for:

- clarifying backlog items;
- identifying missing decisions;
- splitting oversized work;
- defining outcomes and acceptance criteria;
- prioritising or removing items.

### `competitor-analysis`

Use for:

- selecting competitors;
- gathering comparable evidence;
- identifying positioning, product, and messaging patterns;
- separating observation from inference;
- producing a structured comparison.

### `website-messaging`

Use for:

- StoryBrand analysis;
- positioning and value proposition work;
- page structure;
- copy review and rewriting;
- calls to action;
- cross-page consistency.

Reference files should hold framework-specific detail.

### `technical-review`

Use for:

- implementation feasibility;
- architectural trade-offs;
- maintainability;
- delivery risk;
- dependency and integration review.

---

## Skill design rules

Create a new skill when it has:

- a distinct trigger;
- a substantially different procedure;
- different tools or permissions;
- a distinct class of deliverable;
- value as an independently invoked workflow.

Use a reference file instead when the content is:

- a framework used by a broader workflow;
- relevant only to one subtype of task;
- detailed supporting knowledge;
- a checklist or standard;
- not useful as an independent invocation.

Keep skill descriptions short and discriminative.

Good:

```yaml
description: Analyse or rewrite the message communicated by website pages. Use for positioning, StoryBrand, value propositions, page copy, and calls to action. Not for implementing the page.
```

Avoid descriptions that overlap heavily with several other skills.

Rare or specialised skills may be manual-only rather than exposed for automatic model invocation.

---

## Composition model

The active behaviour should be assembled as:

```text
global working agreement
+ active role
+ active decision authority
+ active conversation style
+ applicable skill
+ project context
+ required references
+ enforced tool policy
```

Example:

```text
Role: marketing strategist
Authority: recommend and proceed
Style: critical
Workflow: website messaging
Project context: current website and target customer
Reference: StoryBrand
Tool policy: may edit content files, may not deploy
```

---

## First implementation milestone

Build only:

1. A short global `AGENTS.md`.
2. The `/mode` extension.
3. Three role files:
   - `pragmatic-collaborator`
   - `product-owner`
   - `dev-peer`
4. Three authority files:
   - `advisory`
   - `recommend-and-proceed`
   - `decisive`
5. Two style files:
   - `concise`
   - `critical`
6. Four stub skills:
   - `backlog-refinement`
   - `competitor-analysis`
   - `website-messaging`
   - `technical-review`
7. Basic tests for mode loading, switching, clearing, and session restoration.

Do not build automatic inference, model switching, or complex permission profiles in the first milestone.

---

## Acceptance criteria

- `/mode` lists available components.
- A role, authority, and style can be selected independently.
- Selecting a component replaces the previous component on the same axis.
- `/mode show` reports the composed active mode.
- `/mode clear` returns to global defaults.
- Active mode state survives session resume.
- The composed instructions are injected before every agent run.
- Missing or malformed mode files produce actionable errors.
- Skills remain independently invokable.
- Skill content does not duplicate mode content.
- Project context remains outside global skills and modes.
- The implementation is documented well enough to add a new role or skill without changing extension code.

---

## Deferred questions

Resolve after using the first version:

- Should project-local modes be supported?
- Should mode presets be first-class?
- Should the extension suggest mode changes automatically?
- Should execution authority be enforced through explicit tool profiles?
- Should active mode be shown persistently in the UI?
- Should workflow phase become a separate axis?
- Should mode changes be recorded in the transcript?
