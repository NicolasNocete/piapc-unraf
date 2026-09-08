# Plan técnico: Guías docentes por clase

**Spec:** `specs/009-guias-docentes-por-clase/spec.md`
**Status:** Approved

## Decisiones

- `docentes/` almacena las guías privadas y no participa en la sincronización ni en el manifiesto de contenido.
- Los nombres siguen `guia-clase-NN-tema.md`; la guía de clase 4 existente conserva su nombre y funciona como referencia de estructura.
- El cronograma generado aporta fecha, modalidad, tema y actividad; los Markdown publicados con `clases: [N]` aportan los materiales y la evidencia académica.
- Las respuestas esperables describen conceptos, evidencia y límites de respuestas adecuadas. Para clases 6, 11 y 13 no se redactan claves ni rúbricas no autorizadas.
- La skill semanal actualiza solo la guía de la clase objetivo; la cobertura inicial queda versionada como las 14 guías del directorio.

## Archivos afectados

- `docentes/guia-clase-01-*.md` a `docentes/guia-clase-14-*.md`: guías privadas. (FR-001 a FR-004)
- `.opencode/skills/piapc-upcoming-actions/SKILL.md`: paso de preparación docente. (FR-005)
- `specs/009-guias-docentes-por-clase/`: requisitos, plan y tareas.

## Verificación

1. Confirmar que hay exactamente una guía para cada número de clase 1 a 14.
2. Verificar que los materiales citados existen en `content/published/` y que las guías no están en `content/published/` ni `content/manifest.json`.
3. Ejecutar `npm run check`.

## Trazabilidad

- Cobertura y estructura: FR-001, FR-002; AC-001.
- Preguntas y respuestas esperables: FR-003; AC-002.
- Evaluaciones y entregas: FR-004; AC-003.
- Flujo semanal privado: FR-005; AC-004.
