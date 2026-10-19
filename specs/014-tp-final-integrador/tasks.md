# Tareas

- [x] T-001 (FR-001–005, AC-001–002): publicar consigna fuente con requisitos, ejemplos, spec, flujo, fechas e instrucciones de entrega.
- [x] T-002 (FR-007, AC-004): alinear programa, índices y guías docentes de clases 11–14.
- [x] T-003 (FR-006, AC-003): archivar publicación anterior íntegra y actualizar Próximas acciones.
- [x] T-004 (AC-001–004): regenerar réplicas y artefacto académico; validar contenido, metadatos, recepción por regla existente, enlaces y archivo histórico.
- [x] T-005 (AC-005): ejecutar pruebas de contenido y `npm run check`; registrar alcance y límites de runtime.
- [x] T-006 (FR-008, AC-006): exigir escenarios variables y patrullaje adaptativo observables jugando, sin semillas, guardado ni comparación controlada, en consigna, ejemplo, flujo, presentación y apoyos docentes; regenerar y verificar.
- [x] T-007 (FR-009, AC-007): publicar guía de inicio no evaluable con prompt y enlaces de ida/vuelta; regenerar, verificar formulario único y ejecutar checks.

## Verificación final

Ampliación FR-009: guía `tp-final-como-comenzar` publicada como lectura con `evaluable: false`; consigna versión 3 con enlace y sin el prompt corto anterior. `content:sync` y `npm run check` correctos. Comprobación directa del manifiesto y `acceptsDeliveries`: guía sin formulario y consigna con recepción de entregas; fecha 3/11 conservada. Enlaces de ida/vuelta y presencia de clonación, `question`, GDD y specs verificados. Sin cambios de UI, pruebas de navegador, commit, push ni despliegue para esta ampliación.

Ampliación FR-008: consigna versión 2, ejemplo, flujo, instrucciones, exposición, aviso y guías docentes revisados. Se conserva la obligación de escenarios variables y patrullaje adaptativo observables jugando, quitando reproducción exacta y comparación controlada. `content:sync` y `npm run check` correctos. Sin cambios de UI ni comprobación en navegador para esta ampliación editorial. Commit y push autorizados en la conversación.

- `content:sync` y `content:check`: correctos; réplicas regeneradas desde fuentes que coincidían con el manifiesto antes de editar.
- `test:content`: 6/6 pruebas correctas.
- Actividad `tp-final-integrador-npc` pública, evaluable, clases 11–13 y `availableUntil: 2026-11-03`; `acceptsDeliveries` devuelve true.
- Todos los enlaces de Próximas acciones apuntan a IDs publicados. Archivo anterior copiado sin modificar; comparación con HEAD correcta normalizando CRLF de Git.
- Fuentes del programa, índices y guías revisadas con entrega 3/11, exposición 4/11 y última semana sin actividades.
- `generate:academic-content`: correcto; artefacto generado versión 1.1 y cronograma final comprobados.
- `npm run check`: correcto (ESLint, TypeScript, validación editorial y build de producción con Turbopack).
- `git diff --check`: correcto. No se ejecutaron commits ni despliegue.
- `nextjs_index`: no encontró servidor de desarrollo. No se verificó navegador ni envío autenticado; no se crearon entregas de prueba en la base.
