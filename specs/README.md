# PIAPC Specifications

Material changes to product behavior, data, security, or architecture use one feature directory:

```text
specs/
  NNN-feature-name/
    spec.md
    plan.md
    tasks.md
    checklists/
```

## Workflow

1. `/spec`: define what and why in `spec.md`.
2. Resolve every `[NEEDS CLARIFICATION]` marker and approve the spec.
3. `/spec-plan`: document the technical approach in `plan.md`.
4. `/spec-tasks`: create dependency-ordered, traceable work in `tasks.md`.
5. `/spec-analyze`: check consistency and requirement coverage.
6. `/spec-implement`: implement approved work and collect verification evidence.
7. `/spec-converge`: compare the result with the artifacts and record remaining work.

## Status

Use one of these values near the top of `spec.md`: `Draft`, `Approved`, `Implemented`, or `Superseded`.

Approval means the objective, scope, requirements, security/data impact, and acceptance criteria are understood and contain no unresolved clarification markers.

## Traceability

- Functional requirements use IDs such as `FR-001`.
- Acceptance criteria use IDs such as `AC-001`.
- Plans and tasks reference those IDs.
- A task is complete only after its implementation and verification pass.
