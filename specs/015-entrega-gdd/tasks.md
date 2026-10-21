# Tareas y verificación

- [x] T-001: inspeccionar actividades, formulario y guardado por ID; comprobar que las fuentes coinciden con los digests publicados (FR-003, AC-003).
- [x] T-002: crear fuente de Entrega del GDD con plazo, materiales e instrucciones de versiones/equipos (FR-001–002, AC-001).
- [x] T-003: alinear consigna, guía e índice y sincronizar réplicas (FR-003–004, AC-002–003).
- [x] T-004: agregar regresiones de IDs, fechas, hora, elegibilidad y enlaces; ejecutar `npm run test:content`, `npm run content:check` y `npm run check` (AC-001–004).
- [x] T-005: intentar runtime, revisar diff y registrar evidencias y limitaciones sin crear envíos ficticios (AC-003–004).

## Evidencias

- AC-001: nuevas regresiones comprueban IDs distintos, elegibilidad de ambas actividades, fechas originales del final, fechas del GDD y plazo horario en su texto. `npm run test:content`: 9/9 pruebas pasan.
- AC-002: regresiones comprueban enlaces al GDD desde consigna, guía e índice, retorno desde GDD, y guía sin entrega. `content:check` pasa dentro de `npm run check`, incluyendo enlaces e integridad de la réplica.
- AC-003: revisión de diff sin cambios de UI, acciones, SQL ni configuración. `DeliverySection` filtra por `activity_id` y usuario; `submitDelivery` utiliza el ID del contenido. No se hicieron escrituras de entregas ni migraciones. No se probó un envío autenticado real.
- AC-004: `content:sync`, `test:content` y `npm run check` pasan (lint, TypeScript, integridad editorial y build). Dev server en localhost:3000: `get_compilation_issues` devuelve `issues: []`; `get_errors` devuelve listas vacías. Navegación con agent-browser a `/contenidos/tp-final-entrega-gdd` redirige a `/` con «Continuar con Google».

## Pendiente de verificación manual

Con una sesión autenticada, abrir GDD y final y verificar sus formularios independientes; con rol docente, comprobar la actividad nueva en Entregas. No se eludió autenticación ni se crearon envíos ficticios. La sesión del navegador impidió validar visualmente las rutas protegidas. Sin commit, push ni despliegue.
