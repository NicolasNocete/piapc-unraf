---
name: security-audit
description: Use when reviewing PIAPC authentication, authorization, Server Actions, Route Handlers, Supabase access, RLS, grants, Storage, or privileged SQL.
---

# PIAPC Security Audit

Report each applicable check as `PASS`, `WARN`, `FAIL`, or `N/A`, with file and line evidence.

## Checks

1. Identity: server authorization uses verified claims rather than trusting browser state or `getSession()`.
2. Endpoint input: Server Actions and Route Handlers validate untrusted input.
3. Object authorization: every read and mutation checks access to the specific affected resource and avoids IDOR/BOLA.
4. Secrets: no service-role or secret value reaches browser code, logs, responses, or `NEXT_PUBLIC_*` variables.
5. RLS: exposed tables have enabled RLS and policies cover the intended actor, operation, ownership, and update checks.
6. Grants: schema, table, sequence, and function privileges expose only what the Data API needs.
7. Views and functions: views use security-invoker behavior; privileged functions use a private schema, empty search path, qualified names, caller checks, and explicit execute grants.
8. Storage: buckets, object paths, size/MIME constraints, and policies match the associated record authorization.
9. Responses: endpoints and DTOs return minimal data and do not leak internal errors.
10. Verification: allowed and denied actor cases exist or are explicitly listed as a test gap.

Finish with totals, blocking findings, remediation order, and residual test gaps.
