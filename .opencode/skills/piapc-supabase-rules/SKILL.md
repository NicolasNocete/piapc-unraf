---
name: piapc-supabase-rules
description: Use when changing Supabase auth, SSR clients, profiles, migrations, RLS, Storage, Edge Functions, or database access in PIAPC.
---

# PIAPC Supabase Rules

Load `project-supabase` for current product guidance and `project-postgres-best-practices` before SQL or schema work. These aliases point to the project-pinned official skills.

## Project rules

- `auth.users` is the identity source and `public.profiles` stores application profile data.
- Use `getClaims()` for verified server identity and authorize the affected record near each query or mutation.
- Browser clients receive only the project URL and publishable key.
- Enable RLS on exposed tables and configure explicit grants separately.
- Keep privileged functions in a private schema. Use an empty search path, qualified objects, caller checks, and explicit execute privileges.
- Apply schema changes through migrations. Never edit an already-applied migration to change production history.
- After database changes, verify behavior for allowed and denied actors and run security and performance advisors.
