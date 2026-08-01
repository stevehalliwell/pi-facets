# Product discovery: first-user experience

## Purpose

Pi Facets helps an individual AI-assisted builder keep Pi in right collaboration stance across coding, backlog work, research, copy, game development, frontend work, and other project tasks.

The problem is intent drift: agent and user believe they are doing different work. Common failures include implementing when user wants refinement, over-scoping a tweak, running disproportionate validation, leaving stale elements after a feature change, or deprecating behavior when deletion was expected.

Success is more seamless work. Failure signals are added friction, confusing state, noticeably higher token use, or more agent micromanagement.

## Product model

- **Facets** are persistent collaboration dimensions: role, authority, and conversation style.
- **Initiative** is a candidate fourth axis for how far Pi goes beyond literal request before seeking direction; it is not current state. See [`keep-initiative-axis-as-candidate`](../records/decisions/keep-initiative-axis-as-candidate.md).
- **Presets** are named starting compositions of facets.
- **Skills** are temporary task workflows and output contracts.
- **Project context** carries repository, product, and knowledge-system facts.
- **Status** makes persistent facet state visible.
- **Suggestions** surface likely facet misalignment; user retains control.

Facets guide how Pi reasons and collaborates. Skills define task procedure. Neither should become a catch-all “mode.”

## Primary user

Individual developer/product builder, sometimes working in a small team. Uses Pi across web frontend, games, Unity, Three.js, online research, website development, product planning, and marketing copy.

User is comfortable editing Markdown configuration. Preferred configuration model is layered:

1. project-local definitions and defaults;
2. global personal definitions and defaults;
3. no facets when neither applies.

Project definitions shadow global definitions with matching names.

## Persistent state and controls

### Defaults

New session resolution:

1. valid project default preset;
2. valid global default preset;
3. no facets.

An invalid or missing project default silently falls through to a valid global default. An invalid or missing global default results in no facets. Explicit user choices override defaults.

### Presets and individual facets

Presets are fast named starting points. When a user changes one axis after applying a preset, resulting state becomes an explicit custom composition; preset identity no longer applies.

Role, authority, and style are useful user-facing controls. Detection should identify which axis is misaligned, rather than only proposing a whole preset.

### Visibility

Persistent status indicator:

- active preset: show preset name only;
- no preset: show one compact line for role, authority, and style;
- skills do not appear in persistent status.

## Transition and suggestion behavior

Natural-language intent plus current project/task context may indicate that current facets are misaligned.

Before substantive response, Pi should conservatively identify one highest-impact mismatch and recommend smallest change. It must not silently switch facets.

Example:

```text
Current role: product-owner.
“Implement this” appears misaligned.
Suggest role: dev-peer. Keep authority/style.
```

Interaction rules:

- passive mismatch indication is terse; user changes state with `/facets`;
- a targeted proposed change uses `ask_user_question`;
- avoid topic-only guesses; infer from explicit intent plus context;
- suggest one axis first, then reassess after user response;
- do not replace all facets or a preset unless clearly needed and approved.

## Workflow contracts

### Backlog refinement

Purpose: turn high-level work into bounded, actionable tasks without implementing.

Expected behavior:

- clarify desired change and customer/business value;
- inspect existing code/features for conflicts and dependencies;
- discuss complexity, splitting, priority, urgency, and sequencing;
- define scope, non-goals, acceptance, and open decisions;
- do not treat refinement as implementation authorization.

Preferred stance: product-owner, advisory, exploratory. Existing backlog preset should be checked because its current `recommend-and-proceed` authority may not fit this workflow.

### Implementation

Preferred stance: senior development peer.

Expected behavior:

- trace real code paths and implement agreed scope;
- flag material risks and assumptions;
- recommend smallest credible validation rather than automatically running broad suites;
- for a low-risk visual change visible live, recommend a focused check and let user decide;
- for removals/replacements, identify likely cleanup candidates and ask cleanup scope;
- do not silently deprecate or assume broad cleanup.

### Website messaging

Preferred stance: marketing strategist.

Expected behavior branches by request:

- website review: diagnose audience, message gaps, proof, hierarchy, and decisions before drafting;
- suggested copy tweaks: compare viable directions and trade-offs;
- missing audience or proof: proceed with labelled assumptions;
- do not invent customer promises, positioning, or evidence.

### Online research

Research should create durable OKF-compatible Markdown artifacts by default, not only chat answers. This includes incidental standards verification during implementation.

Each source note should include:

- metadata and URL;
- concise summary;
- supporting excerpts or claims;
- relevance to research question;
- confidence and limits.

A synthesis note should connect evidence to findings, uncertainty, and recommendations.

This behavior belongs in research skills and project context, not facets. “Discuss only” explicitly opts out of artifact creation.

### Three.js visual work

Preferred stance: senior development peer, advisory.

Expected behavior:

- protect frame time, memory, draw calls, shader and texture cost, resize behavior, and device constraints;
- flag a visual request likely to add material render cost;
- propose a focused measurement or lower-cost approach before profiling or altering requested visual direction;
- ask the performance target when project context does not state one;
- keep live visual experiments small and reversible;
- do not substitute broad test suites for render evidence.

### Web frontend implementation

Preferred stance: web-platform specialist, `recommend-and-proceed`. Suggest this role for implementation or review where web standards, accessibility, responsive behavior, browser compatibility, SEO/GEO, or performance are material. Use marketing strategist first for messaging/copy requests, even when SEO/GEO is relevant.

Default quality baseline:

- target 100 Lighthouse scores at delivery;
- support major desktop, mobile, and tablet browsers released within last two years;
- account for accessibility, SEO/GEO, responsiveness, platform capability, and performance;
- prefer current standards and native browser capabilities when compatible.

Expected behavior:

- use high-level direction confidently for routine standards-compliant implementation;
- flag direct material quality conflicts, propose compliant alternatives, and wait for decision;
- collect routine quality concerns during build rather than interrupting iteration;
- before delivery, propose a consolidated Lighthouse, browser, accessibility, and discoverability audit;
- remediate all issues found within task outcome; pause only where fix changes product behavior, visual direction, scope, external dependency, or cannot meet target;
- verify uncertain modern platform guidance with authoritative current sources, then save OKF artifacts.

## Product boundaries

Not current first-user requirements:

- automatic facet switching;
- enforced tool restrictions or tool-call gating;
- model switching;
- interactive facet editor;
- persistent skill status;
- automatic routing based only on topic;
- separate persistent facets for generated artifacts versus user conversation.

## Existing implementation and gaps

Already present:

- Markdown facets and named presets;
- project/global layered discovery;
- manual `/facets` selection and inspection;
- session persistence;
- core workflow skills.

Evidence-backed follow-up candidates:

1. project/global default preset configuration;
2. persistent facet status indicator;
3. conservative mismatch and transition suggestions;
4. workflow/preset contract refinement, especially backlog authority and implementation validation/cleanup;
5. research workflow with OKF artifact capture, including incidental standards verification;
6. web-platform specialist role and web implementation/delivery-review workflow;
7. Three.js performance-aware visual-iteration workflow;
8. reassess `initiative` axis after evidence from additional domains.
