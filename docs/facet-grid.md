# Facet grid

Project examples compose one role, one authority, and one style. Presets are named shortcuts; prompt templates frame one request without changing active facets.

| Use case | Role | Authority | Style | Resource |
| --- | --- | --- | --- | --- |
| Technical review | `dev-peer` | `advisory` | `critical` | `technical-review` |
| Implementation partner | `dev-peer` | `recommend-and-proceed` | `concise` | `implementation-partner` |
| Tweaking | `dev-peer` | `recommend-and-proceed` | `iterative` | `tweaking` |
| Web implementation | `web-platform-specialist` | `recommend-and-proceed` | `concise` | `web-implementation` |
| Backlog capture | `product-owner` | `recommend-and-proceed` | `concise` | `backlog-capture` |
| Backlog refinement | `product-owner` | `advisory` | `exploratory` | `backlog-refinement` |
| Note taking | `note-taker` | `recommend-and-proceed` | `concise` | `note-taker` |
| Brainstorming | `pragmatic-collaborator` | `advisory` | `exploratory` | `brainstorming` |
| Messaging strategy | `marketing-strategist` | `recommend-and-proceed` | `explanatory` | `messaging-strategy` |
| Editorial review | `editorial-reviewer` | `recommend-and-proceed` | `critical` | `editorial-review` |
| Visual direction | `art-director` | `advisory` | `exploratory` | `visual-direction` |
| Research exploration | `researcher` | `advisory` | `exploratory` | `research-exploration` |
| Release readiness | `release-steward` | `recommend-and-proceed` | `structured` | `release-readiness` |

## Project resources

- Roles: `art-director`, `dev-peer`, `editorial-reviewer`, `inquiry-guide`, `note-taker`, `pragmatic-collaborator`, `product-owner`, `marketing-strategist`, `researcher`, `delivery-lead`, `web-platform-specialist`, `release-steward`.
- Authorities: `advisory`, `recommend-and-proceed`, `decisive`.
- Styles: `concise`, `critical`, `exploratory`, `explanatory`, `inquisitive`, `iterative`, `structured`.
- Presets: `technical-review`, `implementation-partner`, `tweaking`, `web-implementation`, `backlog-capture`, `backlog-refinement`, `note-taker`, `brainstorming`, `messaging-strategy`, `editorial-review`, `visual-direction`, `research-exploration`, `release-readiness`.
- Project prompt templates: `/explore-options <topic>`, `/decision-brief <topic>`.

Skills remain workflow source of truth. Prompt templates do not select or mutate facets.
