---
name: piapc-shadcn-conventions
description: Use when creating, installing, composing, styling, or reviewing shadcn/ui and Base UI components in PIAPC.
---

# PIAPC shadcn Conventions

Load the official `shadcn` skill first. It supplies current CLI and component rules.

- Respect the Base UI style, aliases, icon library, RSC setting, and Tailwind v4 CSS path in `components.json`.
- Search installed components and the shadcn registry before creating custom UI primitives.
- Keep `src/components/ui/` for owned primitives. Keep feature compositions close to their route until reuse is proven.
- Prefer variants and semantic tokens over one-off color and typography overrides.
- Preview upstream changes with dry-run and diff. Never overwrite local component changes without explicit approval.
- Review accessibility, keyboard interaction, focus, mobile layout, dark mode, loading, empty, and error states.
