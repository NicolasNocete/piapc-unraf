# Tareas: Gestion de entregas

- [x] **T-001:** Extender el contrato editorial con disponibilidad obligatoria para actividades. Referencias: FR-001, FR-015; AC-001. Verificacion: `npm run test:content`.
- [x] **T-002:** Crear y aplicar las migraciones de entregas, versiones, devoluciones, RLS, grants e indices. Referencias: FR-006 a FR-013; AC-004 a AC-008. Verificacion: tablas remotas y asesores Supabase.
- [x] **T-003:** Implementar acciones de servidor para registrar entregas y devoluciones. Referencias: FR-002 a FR-006, FR-010 a FR-013; AC-002, AC-004, AC-006 a AC-008. Verificacion: `npm run lint`, `npm run typecheck`.
- [x] **T-004:** Implementar formulario de estudiante y bandeja docente de pendientes desde el dashboard del profesor responsable. Referencias: FR-005, FR-008, FR-011, FR-014, FR-016; AC-003, AC-005, AC-006, AC-009. Verificacion: compilacion de rutas.
- [ ] **T-005:** Resolver el enlace editorial de la actividad inicial a una solucion diferida para recuperar `npm run content:check`, `npm run build` y `npm run check`. Referencias: FR-015. Bloqueo heredado de `specs/003-content-management/tasks.md`.
- [ ] **T-006:** Ejecutar pruebas RLS permitidas y denegadas en Supabase local, y prueba manual autenticada con `next-dev-loop`. Referencias: AC-002 a AC-009.
- [ ] **T-007:** Incorporar la nota diagnostica privada de 1 a 10 en devoluciones, acciones, consultas y UI docente, sin exponerla al estudiante; permitir una devolucion sin nota solo cuando el material sea inaccesible. Referencias: FR-017, FR-018; AC-010. Verificacion: migracion, pruebas de autorizacion, `npm run check` y flujo docente/estudiante.
- [ ] **T-008:** Reemplazar la bandeja plana docente por un indice historico de actividades y una ruta de detalle con todas las entregas de cada actividad. Referencias: FR-019; AC-011. Verificacion: `npm run check` y flujo docente con `next-dev-loop`.
