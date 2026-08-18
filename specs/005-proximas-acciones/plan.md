# Plan de implementación: Próximas acciones

**Spec:** `specs/005-proximas-acciones/spec.md`
**Status:** Approved

## Decisiones de implementación

- `content/upcoming-actions.md` continúa como fuente editorial vigente. Su frontmatter declara el resumen, las acciones con título y destino, apoyos auxiliares, vencimiento y aclaración.
- La publicación inicial se conserva en `content/archive/2026/upcoming-actions-clase-1.md`; el servidor sólo lee la publicación vigente.
- Un módulo solo de servidor leerá y validará el frontmatter con las dependencias ya instaladas (`gray-matter` y `zod`). La página no enviará lógica de edición ni JavaScript de cliente adicional.
- `src/app/dashboard/page.tsx` consumirá el contenido después de la comprobación de perfil ya existente, renderizará enlaces internos con `next/link` y mostrará los apoyos opcionales como alerta informativa.
- La sección se ubicará luego de la introducción y antes de los accesos rápidos, usando los patrones visuales, espaciado y foco visible ya presentes en el dashboard.

## Datos, seguridad y autorización

- No se crearán tablas, migraciones, políticas RLS, Storage ni Server Actions.
- Los archivos editoriales no contienen datos de estudiantes. Solo la publicación vigente se lee en el servidor dentro de la ruta protegida existente.
- Los destinos vigentes son `/contenidos/eje-01`, `/contenidos/eje-02`, `/contenidos/eje-02-laboratorio-caja-de-cristal` y `/contenidos/eje-02-errores-conceptuales`, todos recursos publicados existentes.

## Archivos afectados

- `content/upcoming-actions.md`: contenido editorial vigente y actualizable por la cátedra.
- `content/archive/2026/upcoming-actions-clase-1.md`: publicación inicial preservada para reutilización editorial.
- `src/lib/upcoming-actions/server.ts`: lectura y validación server-only del contenido editorial.
- `src/app/dashboard/page.tsx`: sección visual de próximas acciones.
- `specs/005-proximas-acciones/`: requisitos, plan y tareas de esta funcionalidad.

## Verificación

- No se ejecutarán `npm run check`, verificación en navegador ni `next-dev-loop` por indicación explícita del usuario. AC-001 a AC-005 quedan pendientes de validación.

## Trazabilidad

- Sección y contenido editorial: FR-001, FR-002, FR-004 y FR-007; AC-001 y AC-003.
- Enlaces a recursos: FR-003; AC-002.
- Diseño adaptable: FR-005; AC-004.
- Sin datos ni canales nuevos: FR-006; AC-005.
