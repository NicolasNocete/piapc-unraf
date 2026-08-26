---
name: piapc-upcoming-actions
description: Use when manually updating, publishing, archiving, or preparing "Próximas acciones" for the current PIAPC class.
---

# PIAPC Upcoming Actions

## Scope

- Use only when the professor explicitly asks to update the weekly `Próximas acciones` publication.
- Treat `content/upcoming-actions.md` as the single visible publication and `content/archive/2026/` as its editorial history.
- Do not change the dashboard interface, database, authentication, or published academic resources for this task.

## Weekly Workflow

1. Read the current date and locate the class whose date falls in the current week in `src/content/generated/academic-content.ts`. If the request is for another week, use the class explicitly named by the professor instead.
2. Read the corresponding schedule row and the published content whose frontmatter includes that class number. Select only the materials and activities that directly support that class.
3. Find the next scheduled class in the same schedule. Set `deadline` to `23:59` on the calendar day before it. If there is no subsequent class, ask the professor for the deadline.
4. Read and preserve the current `content/upcoming-actions.md` verbatim in `content/archive/2026/` before publishing the replacement. Use a descriptive, collision-free filename such as `upcoming-actions-clases-2-3.md` or `upcoming-actions-clase-4.md`.
5. Replace `content/upcoming-actions.md` with valid YAML frontmatter containing:
   - `summary`: concise context for the current class;
   - `actions`: one or more concrete actions with `title` and an internal `/contenidos/` `href`;
   - `tips`: optional supporting recommendations;
   - `deadline`: the inferred deadline;
   - `note`: a relevant operational clarification.
6. Check every `href` against an existing published content ID. Keep links internal and do not create content records.
7. Run `npm run check` before reporting completion. If a check fails, report the failure and do not claim the publication was fully verified.

## Editorial Rules

- Use the schedule and published content as sources of truth; do not invent activities, due dates, resources, or grading criteria.
- Describe the deadline as an inferred publication deadline, not as a hidden grading rule.
- Keep the language concise, actionable, and appropriate for students.
- Preserve the archive. Never overwrite or delete earlier publications.
