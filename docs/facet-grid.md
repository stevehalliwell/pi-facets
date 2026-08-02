# Facet grid

Project examples compose one role, one authority, and one style. Presets are named shortcuts; prompt templates frame one request without changing active facets.

| Use case | Role | Authority | Style | Resource |
| --- | --- | --- | --- | --- |
| Technical review | `dev-peer` | `advisory` | `critical` | `technical-review` |
| Implementation partner | `dev-peer` | `recommend-and-proceed` | `concise` | `implementation-partner` |
| Web implementation | `web-platform-specialist` | `recommend-and-proceed` | `concise` | `web-implementation` |
| Backlog refinement | `product-owner` | `advisory` | `exploratory` | `backlog-refinement` |
| Messaging strategy | `marketing-strategist` | `recommend-and-proceed` | `explanatory` | `messaging-strategy` |
| Research exploration | `researcher` | `advisory` | `exploratory` | `research-exploration` |
| Delivery planning | `delivery-lead` | `decisive` | `structured` | `delivery-planning` |
| Release readiness | `release-steward` | `recommend-and-proceed` | `structured` | `release-readiness` |

## Project resources

- Roles: `dev-peer`, `pragmatic-collaborator`, `product-owner`, `marketing-strategist`, `researcher`, `delivery-lead`, `web-platform-specialist`, `release-steward`.
- Authorities: `advisory`, `recommend-and-proceed`, `decisive`.
- Styles: `concise`, `critical`, `exploratory`, `explanatory`, `structured`.
- Presets: `technical-review`, `implementation-partner`, `web-implementation`, `backlog-refinement`, `messaging-strategy`, `research-exploration`, `delivery-planning`, `release-readiness`.
- Project prompt templates: `/explore-options <topic>`, `/decision-brief <topic>`.

Skills remain workflow source of truth. Prompt templates do not select or mutate facets.
