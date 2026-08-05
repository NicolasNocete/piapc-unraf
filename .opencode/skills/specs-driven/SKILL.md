---
name: specs-driven
description: Use when defining or changing PIAPC product behavior, data, security, architecture, scope, acceptance criteria, implementation plans, or task breakdowns.
---

# Lightweight Spec-Driven Development

Store each feature in `specs/NNN-feature-name/`.

## Artifact boundaries

- `spec.md`: what and why. Keep it independent from implementation where possible.
- `plan.md`: how. Record architecture, files, data model, security, rollout, and verification decisions.
- `tasks.md`: executable ordered work, with requirement references and validation steps.
- `checklists/`: focused requirement-quality or domain checklists when useful.

## Spec requirements

Every `spec.md` must include status, objective, user value, scenarios, functional requirements with stable IDs, out of scope, data impact, security/privacy, ambiguities, and measurable acceptance criteria.

Use `[NEEDS CLARIFICATION: question]` instead of guessing. A spec cannot become Approved while unresolved markers remain.

## Traceability

- Give requirements IDs such as `FR-001` and criteria IDs such as `AC-001`.
- Reference those IDs from `plan.md` and `tasks.md`.
- Every requirement must map to implementation work and a verification method.
- If intended behavior changes during implementation, update the spec before continuing.
