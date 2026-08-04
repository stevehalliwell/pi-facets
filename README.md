# pi-facets

Give pi repeatable collaboration stances and task workflows without turning every request into one giant prompt.

- **Facets** shape persistent role, decision authority, and response style.
- **Presets** combine facets for common work.
- **Skills** provide temporary, focused workflows.

## Use it

Install dependencies, then start Pi in this repository:

```sh
npm install
pi
```

This repository’s `.pi/settings.json` loads pi-facets as a local package.

### Install bundled facets

After installing pi-facets, copy its supplied roles, authority, style facets, activation siblings, and presets into desired Pi scope:

```sh
# Current project: <cwd>/.pi/facets
pi-facets install --scope project

# Personal Pi scope: ~/.pi/agent/facets
pi-facets install --scope global
```

Existing bundled paths are reported and left unchanged. Pass `--force` to replace those paths; unrelated destination files remain untouched. Skills and extension stay package-provided.

Open facet selection:

```text
/facets
```

Choose a preset such as **technical review**, **implementation partner**, **editorial review**, or **release readiness**. If it has an associated skill, Pi shows its name and asks before running it. You can also run a workflow directly:

```text
/skill:implementation
/skill:five-whys
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

A preset combines one role, authority, and style. It can point to a skill:

```markdown
---
name: implementation-partner
role: dev-peer
authority: recommend-and-proceed
style: concise
skill: implementation
---
```

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
- `.pi/facets/` — project facets and presets.
- `.pi/skills/` — task workflows.
- `.pi/prompts/` — short request frames.
- `docs/` — authoring and example references.
