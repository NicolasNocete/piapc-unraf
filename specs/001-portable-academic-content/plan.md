# Plan

## Approach

Keep the existing external Markdown sources as the local editorial input. Detect whether both source files exist before reading them. When neither exists, preserve the committed `src/content/generated/academic-content.ts` module and return successfully so a clean Vercel checkout can build. When one exists without the other, fail to avoid publishing a partially refreshed artifact.

## Files

- `scripts/generate-academic-content.mjs`: add source-availability handling. Implements FR-001 through FR-003.
- `../contenidos/ejes/eje-01-fundamentos-ia/05-actividad-clasificacion.md`: remove the public link to deferred material. Implements FR-004.
- `scripts/content/check.ts`: resolve relative Markdown links from their file directory. Implements FR-005.
- External editorial Markdown: replace workspace-only links with plain references before publishing. Implements FR-006.
- `specs/001-portable-academic-content/*`: traceable scope and execution record.

## Rollout

Deploy the normal Git commit through Vercel. No environment variables or Vercel setting changes are required.

## Verification

- Run generation from the local workspace for AC-001.
- Run the build from a temporary clean copy of the repository without sibling directories for AC-002.
- Exercise the partial-source condition for AC-003.
- Regenerate the catalog and run its validation for AC-004.
