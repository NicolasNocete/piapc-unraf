<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# PIAPC Project Rules

## Product and stack

- This repository is the site for the UNRaf course Programacion de Inteligencia Artificial y Patrones de Comportamiento.
- Use Next.js App Router, React, TypeScript, Supabase, Tailwind CSS, and shadcn/ui with Base UI.
- Treat `README.md`, approved files under `specs/`, and the existing implementation as sources of truth. Ask when they conflict.

## Implementation

- Prefer Server Components. Add `"use client"` only at the smallest interactive boundary.
- Treat Server Actions and Route Handlers as public endpoints: validate input, authenticate, authorize the affected resource, and return minimal data.
- Keep authorization close to data access. `src/proxy.ts` is not an authorization boundary.
- Keep route-specific components colocated. Promote a component to `src/components/` only after real reuse appears.
- Keep changes small, direct, and verifiable. Do not add abstractions for hypothetical reuse.

## Supabase

- Load `project-supabase` for every Supabase task and `project-postgres-best-practices` before writing SQL or changing database objects. These aliases use the project-pinned official skills.
- Use `getClaims()` for verified server-side identity. Do not trust `getSession()` for authorization.
- Enable RLS on every table in an exposed schema and write policies for the actual actor and ownership model.
- RLS and SQL grants are separate controls; configure both deliberately.
- Prefer `security invoker`. If `security definer` is required, use a private schema, `set search_path = ''`, fully qualified names, caller checks, and explicit execute revocation/grants.
- Never expose secret or service-role credentials through `NEXT_PUBLIC_*` variables or browser code.

## shadcn/ui

- Load the `shadcn` skill before adding or changing shadcn components.
- Read `components.json` and use its Base UI APIs, aliases, icon library, and Tailwind v4 configuration.
- Search existing components and registries before writing custom primitives. Preview updates before overwriting locally owned component code.
- Use semantic design tokens and preserve keyboard, focus, responsive, and reduced-motion behavior.

## Spec-driven workflow

- Create or update a feature under `specs/NNN-feature-name/` before material behavior, data, security, or architecture changes.
- Keep product intent in `spec.md`, technical decisions in `plan.md`, and executable work in `tasks.md`.
- Mark unresolved decisions explicitly. Do not invent requirements to remove ambiguity.
- Implement only an approved spec or after explicit approval in the current conversation.
- Trace requirements to tasks and verification. Update the artifacts when intended behavior changes.
- Do not create branches, commit, merge, or push as part of the spec workflow unless the user explicitly requests it.

## Verification

- Run the narrowest relevant checks while iterating.
- Before declaring implementation complete, run `npm run check` unless the task is documentation-only.
- For UI or routing changes, use `next-dev-loop` against a running development server when available.
- For database changes, verify the migration and run Supabase security and performance advisors.
