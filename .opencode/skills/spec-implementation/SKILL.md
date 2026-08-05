---
name: spec-implementation
description: Use when implementing, analyzing, or converging an approved PIAPC feature spec from specs/ with requirement-to-task verification.
---

# Spec Implementation

## Readiness gate

1. Resolve the feature by number, slug, or path under `specs/`.
2. Read `spec.md`, `plan.md`, and `tasks.md`.
3. Require `Status: Approved` or explicit approval in the current conversation.
4. Stop for unresolved `[NEEDS CLARIFICATION]` markers, missing acceptance criteria, unsafe assumptions, or scope conflicts.
5. Inspect `git status`; preserve unrelated work. Do not switch branches or create commits unless explicitly requested.

## Execution

1. Work through dependency-ordered tasks and keep task state accurate.
2. Keep changes within the approved scope and project rules.
3. Verify incrementally with the narrowest relevant command.
4. Update task checkboxes only after implementation and verification are complete.
5. Record discovered scope or requirement changes in the spec before implementing them.

## Completion

1. Map every requirement and acceptance criterion to evidence.
2. Run `npm run check` unless the work is documentation-only.
3. Use `next-dev-loop` for affected routes when a dev server is available.
4. For Supabase changes, verify allowed and denied actors and run advisors.
5. Report passed, failed, blocked, and unverified criteria separately. Never claim completion for an unverified criterion.
