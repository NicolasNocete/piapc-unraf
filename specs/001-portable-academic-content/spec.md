# Academic Content Build Portability

Status: Approved

## Objective

Allow the production build to complete when the application is deployed from its Git repository without the local editorial directories that sit beside it.

## User Value

Visitors can access the deployed site because Vercel can build the application from the committed repository alone.

## Scenarios

- A developer with the adjacent editorial directories runs the content generator and refreshes the committed generated module.
- Vercel runs the production build from the Git repository, where those adjacent directories do not exist.

## Functional Requirements

- FR-001: The academic-content generator must use the editorial Markdown sources when they are available locally.
- FR-002: The academic-content generator must not fail a production build when the external editorial sources are absent and the committed generated module is available.
- FR-003: A missing external source must be reported clearly during generation.
- FR-004: Published content must not link to deferred material that is intentionally excluded from the public catalog.
- FR-005: Content-link validation must resolve relative Markdown links from the source file directory.
- FR-006: Published content must not link to workspace-only documents that are excluded from the public catalog.

## Out Of Scope

- Moving or changing the editorial source repository.
- Changing the academic content or its public rendering.

## Data Impact

No database or user data changes. The committed generated TypeScript module remains the production content artifact.

## Security And Privacy

No authentication, authorization, secrets, or personal-data behavior changes.

## Acceptance Criteria

- AC-001: `npm run generate:academic-content` regenerates the module with local editorial sources present.
- AC-002: `npm run build` succeeds without sibling `programa` and `contenidos` directories when the generated module is committed.
- AC-003: The generator exits with a descriptive failure if only one external source is present.
- AC-004: `npm run content:check` validates the published catalog successfully.
