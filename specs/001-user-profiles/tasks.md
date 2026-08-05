# Tareas: perfiles de usuario y roles

## Estado

- [x] **T-001** Aprobar la especificación y confirmar ausencia de ambigüedades. (FR-001 a FR-024; AC-001 a AC-020)

## Base de datos

- [ ] **T-002** Crear una migración aditiva para extender `public.profiles`, actualizar alta/backfill y preservar columnas existentes. Implementada; pendiente de aplicar y verificar en Supabase local. (FR-001 a FR-006, FR-009, FR-010, FR-012, FR-014, FR-016, FR-019, FR-023; AC-001 a AC-005, AC-012, AC-015, AC-016, AC-019)
- [ ] **T-003** Incorporar auditoría privada, bootstrap externo y cascadas indexadas. Implementada; pendiente de verificación local. (FR-018 a FR-021, FR-024; AC-009, AC-011, AC-013 a AC-015, AC-017, AC-020)
- [ ] **T-004** Implementar wrappers RPC y funciones privadas para operaciones por email con autorización y respuestas mínimas. Implementada; pendiente de pruebas permitidas/denegadas. (FR-008, FR-011, FR-015, FR-017, FR-018, FR-022; AC-007 a AC-009, AC-011, AC-013, AC-014, AC-018)
- [ ] **T-005** Añadir pruebas pgTAP para alta, backfill, RLS, grants, RPC, invariantes, auditoría y eliminación. Agregada la cobertura estructural inicial; pendiente de ampliar y ejecutar con Docker Desktop. (FR-001 a FR-024; AC-001 a AC-020)
- [ ] **T-006** Generar tipos TypeScript desde el schema local y tipar clientes Supabase. Clientes tipados con el contrato local; pendiente de regenerar desde la base local. (FR-001 a FR-024)

## Aplicación

- [x] **T-007** Crear DAL server-only para identidad verificada, perfil propio, completitud y responsabilidad. (FR-007 a FR-009, FR-011, FR-017, FR-022; AC-003, AC-006 a AC-008, AC-018)
- [x] **T-008** Crear layouts protegidos y flujo `/profile/complete`; mover dashboard conservando `/dashboard`. Implementación equivalente mediante guards de página/DAL conservando las rutas. (FR-003, FR-007, FR-009, FR-012, FR-017, FR-023; AC-002, AC-003, AC-006, AC-007, AC-019)
- [x] **T-009** Crear `/profile` para consulta y edición de nombre y apellido propios. (FR-003, FR-004, FR-005, FR-007, FR-013, FR-017; AC-006, AC-007, AC-010)
- [x] **T-010** Crear formularios acotados por email para rol, responsabilidad y año. La ejecución depende de la migración pendiente. (FR-008, FR-011, FR-015, FR-018, FR-019, FR-020, FR-022; AC-008, AC-009, AC-011, AC-013 a AC-015, AC-018)
- [x] **T-011** Endurecer el redirect local del callback OAuth y mantener Proxy fuera de autorización. (FR-007, FR-009, FR-017)
- [x] **T-012** Incorporar y componer primitivos shadcn/Base UI accesibles. (FR-009, FR-013, FR-022; AC-003, AC-010, AC-018)
- [x] **T-013** Actualizar README con migración, tipos, bootstrap y validación. (FR-016, FR-018, FR-020, FR-024)

## Verificación

- [ ] **T-014** Ejecutar reset local, pgTAP, advisors y casos permitidos/denegados. (FR-001 a FR-024; AC-001 a AC-020)
- [x] **T-015** Ejecutar lint, typecheck, build y `npm run check`. Evidencia: 2026-08-05, exitoso. (FR-001 a FR-024)
- [ ] **T-016** Verificar rutas y comportamiento desktop/mobile con Next MCP y `next-dev-loop`. Verificado el redirect no autenticado de `/profile` y la compilación de rutas; los flujos autenticados quedan bloqueados por la migración remota no aplicada. (FR-007, FR-009, FR-013, FR-017, FR-022; AC-003, AC-006, AC-007, AC-010, AC-018, AC-019)
- [ ] **T-017** Registrar evidencia y marcar únicamente criterios comprobados. Bloqueado hasta ejecutar la base local y los flujos autenticados. (FR-001 a FR-024; AC-001 a AC-020)
