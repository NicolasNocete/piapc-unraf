# Clases 9 y 10: teoría integrada y práctica guiada

Estado: Implemented

## Objetivo y valor

Preparar un apunte teórico único para el 7 y 14 de octubre de 2026 y una práctica independiente, preensamblada, de navegación. El estudiante debe comprender las técnicas y conducir una intervención pequeña sin inventar requisitos ni producir documentación redundante.

Aprobación: conversación del 6/10/2026, incluida la instrucción «avanzar». Se acordaron las fechas, dos documentos, elección de una variante y una entrega conjunta el 14/10.

## Escenarios

- El estudiante lee navegación para la clase 9 y retoma el mismo apunte para comportamiento en la clase 10.
- Copia la spec común y una variante, contrasta el repositorio, completa datos locales y aprueba un plan breve.
- Compara BFS/A*, explora DFS/Dijkstra con trazas y valida una única mejora.
- Entrega spec, plan y evidencia junto con URL y commit el 14/10, sin implementar los patrones que recién se presentan ese día.

## Requisitos

- FR-001: el documento teórico desarrolla grafos, BFS, DFS, Dijkstra, A*, heurísticas, representaciones alternativas, percepción, memoria, seguimiento y movimiento con ejemplos explicados.
- FR-002: el mismo documento desarrolla FSM/HFSM, BT, utilidad, GOAP, comparación y arquitectura por capas para el 14/10.
- FR-003: la práctica incluye una spec común completa: exploración, línea base, comparación, trazas, casos límite, adaptación, validación y entrega.
- FR-004: ofrece tres specs breves listas para copiar: terreno lento, exposición y bloqueo dinámico. Sólo una es obligatoria; no se solicita implementar DFS/Dijkstra.
- FR-005: cada etapa tiene un prompt copiable, resultado esperado, revisión humana, artefacto y condición de avance; se evitan tareas escondidas fuera de las specs.
- FR-006: elaborar la spec significa contrastar y adaptar un contrato prearmado, sin suponer APIs ni implementar antes de aprobarlo.
- FR-007: entrega única el 14/10/2026, con `spec.md`, `plan.md`, `evidencia.md`, URL y commit. Sin hora inventada ni entregas intermedias.
- FR-008: se preservan las fuentes, arquitectura de dominio, trabajo previo y acceso sin modelo pago; se enlazan materiales en el índice del eje.
- FR-009: por ampliación explícita del pedido, actualizar Próximas acciones conservando enlace a entrega del 6/10 y agregando los materiales nuevos, con recordatorio de modalidad asincrónica del 7/10.
- FR-010: preservar la publicación anterior íntegra en el archivo editorial y las dos fechas explícitas: upgrades 6/10 23:59 y navegación en clase del 14/10; no inferir un vencimiento distinto.
- FR-011: preparar aviso completo copiable para campus con lectura, ejercicios y práctica, elección de una variante y entregable; actualizar guía docente existente.
- FR-012: presentar una sola tarjeta para la entrega de upgrades en Próximas acciones; la guía de apoyo permanece accesible desde la consigna, sin una segunda tarjeta para el mismo trabajo. Corrección solicitada por el usuario al señalar duplicación visual.
- FR-013: la tarjeta de upgrades abre una consigna autocontenida con catálogo original, instrucciones, prompts, estructura del paquete y guía de registro en su box de entrega. La guía complementaria remite explícitamente a esa consigna, sin otra entrega ni cambios de alcance.

## Alcance excluido

No cambiar el programa, los parciales, el laboratorio canónico, la base ni interfaces. No exigir motor nuevo, dependencias, despliegue, múltiples variantes o implementación de FSM en esta entrega.

## Datos y seguridad

Documentación académica pública. No incluye datos personales, secretos o evaluaciones privadas. Los prompts restringen comandos y escritura a permisos explícitos; los commits de alumnos son una decisión humana.

## Decisiones y ambigüedades

No quedan decisiones de alcance pendientes. La hora y el canal institucional de entrega no fueron definidos: se indica entrega en la clase del 14/10, sin inventarlos. Las rutas y comandos de cada copia se resuelven mediante exploración.

Excepción editorial aprobada: aunque el contrato recomienda lecturas cortas, el usuario pidió un documento teórico para ambas clases y una práctica autocontenida. Se mantienen dos archivos con secciones navegables, no más archivos obligatorios para el estudiante.

## Aceptación

- AC-001: un archivo teórico cubre FR-001/002 y tiene ejemplos resueltos, límites, comprobación y bibliografía.
- AC-002: la guía contiene una spec base y tres variantes con requisitos y criterios comprobables, datos de escenarios y resultados esperados.
- AC-003: todos los pasos y productos obligatorios se trazan a la spec; el estudiante puede copiar los prompts y las tres plantillas de entrega.
- AC-004: fecha única 14/10, alcance de una variante y exclusión de comportamiento nuevo son explícitos.
- AC-005: enlaces relativos y metadatos son válidos; la réplica se genera con el script, nunca se edita manualmente.
- AC-006: publicación nueva enlaza IDs publicados válidos, conserva el historial y las dos fechas; aviso diferencia entregas, confirma asincronía y no exige patrones nuevos para el 14/10. Ejecutar `npm run check` según la skill de publicación semanal.
