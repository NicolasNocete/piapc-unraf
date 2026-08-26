# Plan técnico

## Decisiones

- Se usarán enlaces Markdown directos al repositorio canónico en las referencias visibles de contenido editorial.
- El frontmatter y las salidas de terminal no admitirán enlaces para preservar sus valores estructurados y evidencia literal.
- La guía docente se mantiene en `docentes/`, fuera de `content/published/`, para no incorporarla a materiales públicos.

## Archivos

- `docentes/guia-clase-04-sistemas-agenticos.md`: guía privada. (FR-003)
- `content/published/**/*.md`: referencias académicas enlazadas. (FR-001, FR-002)
- `content/manifest.json`: regenerado desde el contenido editorial actualizado. (AC-001)

## Verificación

1. Buscar todas las referencias académicas y confirmar que las visibles incluyan el enlace canónico.
2. Ejecutar `npm run generate:academic-content`.
3. Ejecutar `npm run check`.
