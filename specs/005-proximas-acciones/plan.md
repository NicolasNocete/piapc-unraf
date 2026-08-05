# Plan de implementación: Próximas acciones

**Spec:** `specs/005-proximas-acciones/spec.md`
**Status:** Approved

## Decisiones de implementación

- Se añadirá `content/upcoming-actions.md` como única fuente editorial. Su frontmatter declarará el resumen, las acciones con título y destino, el vencimiento y la aclaración vigente.
- Un módulo solo de servidor leerá y validará el frontmatter con las dependencias ya instaladas (`gray-matter` y `zod`). La página no enviará lógica de edición ni JavaScript de cliente adicional.
- `src/app/dashboard/page.tsx` consumirá el contenido después de la comprobación de perfil ya existente y renderizará enlaces internos con `next/link`.
- La sección se ubicará luego de la introducción y antes de los accesos rápidos, usando los patrones visuales, espaciado y foco visible ya presentes en el dashboard.

## Datos, seguridad y autorización

- No se crearán tablas, migraciones, políticas RLS, Storage ni Server Actions.
- El archivo editorial no contiene datos de estudiantes. Solo se lee en el servidor dentro de la ruta protegida existente.
- Los destinos iniciales son `/contenidos/eje-01-bienvenida` y `/contenidos/eje-01-actividad-clasificacion`, ambos recursos publicados ya existentes.

## Archivos afectados

- `content/upcoming-actions.md`: contenido editorial actualizable por la cátedra.
- `src/lib/upcoming-actions/server.ts`: lectura y validación server-only del contenido editorial.
- `src/app/dashboard/page.tsx`: sección visual de próximas acciones.
- `specs/005-proximas-acciones/`: requisitos, plan y tareas de esta funcionalidad.

## Verificación

- Ejecutar `npm run check` para validar lint, tipos, contenido y compilación. Cubre AC-001 a AC-005 en lo verificable de forma automática.
- No se realizará verificación en navegador ni `next-dev-loop` por indicación explícita del usuario. AC-004 queda pendiente de comprobación visual manual.

## Trazabilidad

- Sección y contenido editorial: FR-001, FR-002 y FR-004; AC-001 y AC-003.
- Enlaces a recursos: FR-003; AC-002.
- Diseño adaptable: FR-005; AC-004.
- Sin datos ni canales nuevos: FR-006; AC-005.
