# Facet grid

Project examples compose one role, one authority, and one style. Presets are named shortcuts; prompt templates frame one request without changing active facets.

| Use case | Role | Authority | Style | Resource |
| --- | --- | --- | --- | --- |
| Implementation review | `dev-peer` | `advisory` | `critical` | `implementation-review` |
| Backlog refinement | `product-owner` | `recommend-and-proceed` | `concise` | `backlog-refinement` |
| Messaging strategy | `marketing-strategist` | `recommend-and-proceed` | `explanatory` | `messaging-strategy` |
| Research exploration | `researcher` | `advisory` | `exploratory` | `research-exploration` |
| Delivery planning | `delivery-lead` | `decisive` | `structured` | `delivery-planning` |

## Project resources

- Roles: `dev-peer`, `pragmatic-collaborator`, `product-owner`, `marketing-strategist`, `researcher`, `delivery-lead`.
- Authorities: `advisory`, `recommend-and-proceed`, `decisive`.
- Styles: `concise`, `critical`, `exploratory`, `explanatory`, `structured`.
- Presets: `implementation-review`, `backlog-refinement`, `messaging-strategy`, `research-exploration`, `delivery-planning`.
- Prompt templates: `/explore-options <topic>`, `/decision-brief <topic>`.

Skills remain workflow source of truth. Prompt templates do not select or mutate facets.
