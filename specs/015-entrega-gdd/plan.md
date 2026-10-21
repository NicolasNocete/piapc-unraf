# Plan técnico

1. Crear `../contenidos/transversales/tp-final-entrega-gdd.md` como actividad pública evaluable, ID `tp-final-entrega-gdd`, fechas civiles 21–27/10/2026; comunicar la hora y zona en el cuerpo (FR-001–002, AC-001).
2. Reutilizar `acceptsDeliveries`, `DeliverySection` y `submitDelivery` sin modificarlos: el ID de cada contenido ya separa formularios, versiones y revisión docente. No se necesitan SQL ni escrituras remotas (FR-003, AC-003).
3. Actualizar fuentes de consigna, guía e índice, incrementando sus versiones y manteniendo fechas e ID de la entrega final. Enlazar ambas instancias y aclarar qué se entrega en cada una (FR-004, AC-002).
4. Confirmar integridad de fuentes frente al manifiesto antes de sincronizar; regenerar réplicas únicamente mediante `npm run content:sync` (FR-001–004).
5. Añadir regresiones sobre IDs, elegibilidad, fechas, hora y enlaces; ejecutar pruebas editoriales y `npm run check`. Usar next-dev-loop para rutas afectadas si es posible y documentar límites de autenticación (AC-001–004).

## Rollout

Preparar los archivos para el despliegue habitual, sin publicar ni hacer commit/push. El nuevo ID aparecerá en el catálogo y en el índice docente existentes. Las entregas anteriores permanecen vinculadas al ID original.
