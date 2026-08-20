# pi-facets

Give pi repeatable collaboration stances and task workflows without turning every request into one giant prompt.

- **Facets** shape persistent role, decision authority, and response style.
- **Presets** combine facets for common work.
- **Skills** provide temporary, focused workflows.
- **Prompts** provide short request frames.

## Use it

Install pi-facets from GitHub:

```sh
pi install git:github.com/stevehalliwell/pi-facets
```

Then install the bundled resources into personal Pi scope.

### Install bundled resources

Copy the supplied facets, prompts, and skills into personal Pi scope:

```sh
pi-facets install
```

This copies the contents of [`examples/pi-resources/`](examples/pi-resources/) into `~/.pi/agent/{facets,prompts,skills}`. Existing bundled paths are reported and left unchanged. Pass `--force` to replace those paths; unrelated destination files remain untouched. The installer is global-only.

Open facet selection:

```text
/facets
```

Choose a preset such as **technical review**, **implementation partner**, **backlog capture**, **brainstorming**, **note taker**, or **tweaking**. If it has an associated skill, Pi shows its name and asks before running it. You can also run a workflow directly:

```text
/skill:implementation
/skill:release-readiness
```

Facet choices persist in a session. Explicit choices override any configured default preset.

## Configure it

Add project facets under `.pi/facets/`, or personal facets under `~/.pi/agent/facets/`. Project files override same-named personal files.

```markdown
---
name: product-owner
axis: role
description: Prioritises customer value and business outcomes.
---

- Make scope and sequencing explicit.
```

Use optional sibling `product-owner.activation.md` for one-time Markdown context. It injects once when that facet becomes active or is restored, not on every agent turn. Put broad facet-specific goals, rules, or planning/execution context there when they would be noisy per turn; keep compact ongoing stance in the facet body and repeatable procedure in a skill. For example, Ponytail-style planning and execution guidance can live in an activation file while its persistent facet body stays short.

A preset combines role, authority, and style. Each axis is optional: omit it or use `none` when the preset should not set that axis. It can point to a skill:

```markdown
---
name: implementation-partner
role: dev-peer
authority: recommend-and-proceed
style: concise
skill: implementation
---
```

### Default facets

Set a starting composition in `~/.pi/agent/facets/default.md` or `.pi/facets/default.md`. A project default takes precedence when the project is trusted; an invalid or missing project default falls back to the global default. Explicit facet choices and clears in the session always override defaults.

Use a preset, direct axes, or a preset with axis overrides. Omitted axes mean none; `none` explicitly removes an axis supplied by the preset.

```markdown
---
preset: implementation-partner
style: exploratory
authority: none
---
```

This starts from `implementation-partner`, changes its style, and removes its authority. Invalid facet names or fields are ignored and follow the fallback behavior above.

See [facet grid](docs/facet-grid.md) for shipped examples. See [resource boundaries](docs/resource-boundaries.md) when authoring facets, presets, skills, prompts, or references.

## Develop

Requirements: Node.js `>=22.19.0`, Pi `>=0.83.0`, npm.

```sh
npm run check
npm test
```

Pi loads TypeScript extensions through jiti. No build step.

## Project layout

- `extensions/` — Pi extension code.
- `examples/pi-resources/facets/` — installable facets and presets.
- `examples/pi-resources/skills/` — installable task workflows.
- `examples/pi-resources/prompts/` — installable short request frames.
- `docs/` — authoring and example references.
