---
name: piapc-next-conventions
description: Use when editing Next.js routes, layouts, proxy, Server Actions, Route Handlers, caching, or authentication flows in PIAPC.
---

# PIAPC Next.js Conventions

1. Read the relevant version-matched guide in `node_modules/next/dist/docs/` before writing framework-sensitive code.
2. Prefer Server Components and move client boundaries down to the smallest interactive component.
3. Authenticate and authorize inside the data path. Proxy redirects are only an early user-experience check.
4. Validate all Server Action and Route Handler input and return only the fields the caller needs.
5. Keep route-only code under the route. Move code into shared folders only after demonstrated reuse.
6. After changes, run the narrowest relevant check and use `next-dev-loop` for runtime verification when the dev server is available.
