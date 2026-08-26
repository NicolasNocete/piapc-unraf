# Tareas: gestion de contenidos academicos

**Spec:** `specs/003-content-management/spec.md`  
**Plan:** `specs/003-content-management/plan.md`

## Implementacion

- [x] **T-001:** Agregar dependencias y scripts para sincronizar, validar y renderizar Markdown. Referencias: FR-004, FR-011. Verificacion: `npm run content:check`, `npm run typecheck`.
- [ ] **T-002:** Implementar el esquema editorial, la carga server-only y el validador de Markdown, IDs, hashes, acceso, ledger y enlaces. Referencias: FR-003, FR-005, FR-007 a FR-015, FR-021; AC-002 a AC-010, AC-014, AC-015. Verificacion: pruebas de contenido y entradas invalidas.
- [x] **T-003:** Implementar el sincronizador desde `../contenidos`, los manifiestos y la replica publicable inicial. Referencias: FR-005, FR-006, FR-011 a FR-016; AC-003, AC-007 a AC-010. Verificacion: `npm run content:sync`, `npm run content:check`.
- [x] **T-004:** Crear el catalogo publico, detalle estatico, renderer Markdown seguro y pagina 404 generica. Referencias: FR-001 a FR-004, FR-008, FR-013, FR-015, FR-016, FR-019; AC-001, AC-002, AC-004, AC-008, AC-010, AC-013. Verificacion: compilacion de rutas y navegador.
- [ ] **T-005:** Crear la ruta dinamica de diferidos, con `getClaims()` cercano al acceso, retorno local seguro y metadata generica. Referencias: FR-007 a FR-010; AC-004 a AC-006. Verificacion: solicitud anonima y autenticada.
- [x] **T-006:** Incorporar primitivas shadcn requeridas y enlazar home/dashboard con el catalogo. Referencias: FR-001, FR-019; AC-001, AC-013. Verificacion: inspeccion visual movil y escritorio.
- [x] **T-009:** Incorporar un indice de anclas para acceder directamente a cada eje publicado del catalogo. Referencias: FR-022; AC-016. Verificacion: navegacion por fragmentos en movil y escritorio.
- [ ] **T-010:** Incorporar las vistas por eje y por clase, sus indices de anclas y la etiqueta de clases en tarjetas. La vista por eje se ordena por numero de eje; la vista por clase ubica cada material en sus clases declaradas. Referencias: FR-023; AC-017. Verificacion: selector, orden numerico de ejes, duplicacion multiclase y recursos generales en movil y escritorio.
- [ ] **T-011:** Ordenar las referencias al final de cada grupo del catalogo. Referencias: FR-024; AC-018. Verificacion: inspeccion de grupos por eje y por clase.
- [ ] **T-007:** Incorporar CODEOWNERS, allowlists y workflows de aprobacion/sincronizacion con controles de historico editorial. Referencias: FR-006, FR-017, FR-018, FR-020; AC-003, AC-011, AC-012, AC-015. Verificacion: validacion local de ledger y revision de configuracion CI.

## Verificacion final

- [ ] **T-008:** Ejecutar `npm run content:check`, `npm run test:content`, `npm run check` y `next-dev-loop` para las rutas afectadas. Actualizar estado y evidencia de T-001 a T-007. Referencias: AC-001 a AC-015.

## Bloqueos

- 2026-08-05: `content:check` bloquea la publicacion porque `ejes/eje-01-fundamentos-ia/05-actividad-clasificacion.md` enlaza a una solucion `diferido` no liberada. Para cumplir FR-013, el enlace debe retirarse de la fuente academica o la solucion debe pasar por una liberacion docente verificable; no se modifica automaticamente el Markdown autoritativo.
