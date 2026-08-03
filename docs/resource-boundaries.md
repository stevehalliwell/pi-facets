# Resource boundaries

Authoring contract for Pi Facets resources. It turns existing product rules into one reviewable reference for authors and later `facet-craft` audits.

## Status and sources

**Normative** rules use **must**, **must not**, or **only**. Remaining guidance is heuristic: apply it when it reduces prompt cost, duplication, or ambiguity.

This contract derives from [README](../README.md), [project guidance](../AGENTS.md), [product discovery](product-discovery.md), [facet grid](facet-grid.md), and [preset-skill confirmation decision](../records/decisions/preset-skill-confirmation.md). Recorded decisions win if sources conflict.

## Canonical homes

Each directive has one canonical home. Preset/skill association belongs in preset `skill` frontmatter; copying behavior is not.

| Resource | Holds | Does not hold |
| --- | --- | --- |
| Facet | Persistent role, authority, or style stance; compact expert heuristics; optional one-time activation context in a sibling file | Repeatable task sequence, gates, required inputs, tool/source rules, deliverables, completion checks, repo facts |
| Preset | Named facet composition and approved association metadata | Component bodies or workflow |
| Skill | Temporary process, gates, checks, and output contract | Persistent stance or repo facts |
| Prompt | Short user-request frame | State mutation, workflow, persistent behavior |
| Project context | Repository and product facts | Reusable general guidance |
| Reference | Detailed reusable standards or evidence | Duplicated workflow or rules |

Example: “Challenge unsupported assumptions” belongs in `critical` style. “Collect sources, compare options, return recommendation” belongs in a research skill.

## Facets

Facets are persistent, compact collaboration context. They must be single-axis and non-sequenced.

| Axis | Owns | Does not own |
| --- | --- | --- |
| Role | Expertise lens, domain perspective, working attitude, domain interests and priorities, standards of judgment, risks noticed | Decision rights, reply form, repeatable task workflow |
| Authority | Decision and approval default | Domain expertise, scope priorities, tone |
| Style | Response form, tone, density | Scope decisions, domain expertise, workflow |

A facet may mention another axis only to prevent conflict. Do not encode “ask before changing public behavior” in a role or style, domain expertise in authority, or scope decisions in style.

A role may use action-oriented language for a compact, persistent expert heuristic. For example, “Treat untraced dependencies as delivery risk” expresses an engineering lens. It becomes skill workflow when it prescribes a repeatable sequence, required input, gate, tool/source rule, deliverable, or completion check: “Trace dependencies before editing; run affected tests.”

Use semantic compactness, not a numeric line cap: every instruction must earn repeated prompt-context cost. Prefer concise, non-sequenced bullets. Do not move needed guardrails only to satisfy a count.

### Activation files

An optional `<facet-name>.activation.md` sibling holds Markdown injected once when its matching facet becomes active or is restored. It has no frontmatter; absence is valid. Use it for broader facet-specific goals, rules, or planning/execution context that should shape initial work but would be noisy on every turn. A Ponytail activation file, for example, may establish planning and execution priorities while its facet body retains only compact ongoing heuristics.

Keep instructions needed on every turn in the facet body. Keep repeatable task procedure, gates, required inputs, tool/source rules, deliverables, and completion checks in skills. Activation content remains owned by its matching single-axis facet; it must not become a catch-all project context or duplicate persistent body instructions.

## Presets

A preset is a named composition of one role, authority, and style. It may carry approved entry-point metadata or a short use-case note, but must not repeat component bodies or skill workflow.

An optional `skill` association names one valid Pi skill through preset frontmatter. Do not repeat it in preset body text. On **explicit interactive** preset selection, apply facets first, then ask whether to run it. On confirmation, send `/skill:<name>` through `pi.sendUserMessage`. Declining leaves preset active.

Default presets, restored state, and RPC, JSON, print, or other non-interactive paths must never prompt or launch a skill. A missing associated skill must not prevent facet application: report actionable error and skip prompt/launch. Presets do not associate prompts in this version.

Use `skill: implementation` frontmatter for a preset/skill association. Preset body text must not repeat that association or copy skill workflow.

## Skills

Skills own temporary, repeatable task procedure. Give each one concrete routing triggers, ordered checkable steps, narrow scope, and output contract. Put detailed standards or evidence in skill-local references when reuse warrants it.

Do not use skills for persistent stance, project facts, or a catch-all instruction set. Split only when a skill becomes materially noisy or load cost exceeds cohesion; roughly 1,000 words is a review signal, not a cap.

Example: `art-director` may require evidence-led alternatives. `website-art-direction` skill owns evidence collection, audit, alternatives, comparison, approval gate, and output.

## Prompts, context, and references

Prompts remain short, non-mutating request frames. They do not select facets, start workflows, or carry behavioral rules. Prompt-content auditing is deferred; retain current guidance only.

Project context holds repository/product facts. References hold detailed reusable standards or evidence. Neither should duplicate skill workflow or per-turn facet rules.

## Audit guidance

A later report-only `facet-craft` skill should inspect facets and their activation siblings, presets, skills, and prompts by default; users may narrow scope. It reports evidence without changing resources.

| Finding | Meaning |
| --- | --- |
| Hard violation | Wrong resource or axis ownership, or conflicting duplicate |
| Warning | Redundant same-purpose directive, even if consistent |
| Advisory | Similar idea/wording without duplicated behavior |

Do not flag every shared phrase as overlap. Show conflicting ownership or repeated context cost. Do not prescribe edits without evidence.
