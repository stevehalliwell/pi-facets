---
name: facet-alignment
description: "Use when active facets clearly conflict with an explicit new request, or when deciding whether current facets still fit requested work. Resolve the conflict before substantive work while preserving user overrides. Do not use for topic changes, ordinary task progression, or merely plausible alternate facets."
---

# Facet alignment

Resolve clear request/facet conflict without automatic switching.

## Workflow

1. Confirm conflict. Compare explicit new request with active role, authority, and style. Trigger only when they clearly do not align; topic change or ordinary task progression is insufficient. Done when conflict is clear or workflow stops silently.
2. State concern. Name relevant active facets and mismatch briefly. Ask whether user wants to continue under current facets or change them. Done when user has both options.
3. Target change. If one smallest axis change is clear, use `ask_user_question` to offer it and continuing unchanged. If no concrete target is clear, direct user to `/facets`. Done when user has an explicit path.
4. Preserve override. Change facets only through user selection; never auto-switch. If user continues, proceed under active facets. Done when active state reflects user choice.
5. Resume work. State selected outcome and continue or return to prior work. Done when next substantive action is unambiguous.

## Output shape

```text
Facet alignment: <clear conflict>

Active:
- <role/authority/style>

Options:
- Continue under current facets.
- <smallest clear change or /facets>
```

## Rules

- Active facets are user overrides.
- Trigger before substantive work only for clear explicit conflict.
- Keep aligned work silent.
- Do not restrict tools, classify requests, or infer/switch facets automatically.
