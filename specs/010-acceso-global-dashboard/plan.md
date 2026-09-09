# Plan técnico: Acceso global al dashboard

**Spec:** `specs/010-acceso-global-dashboard/spec.md`
**Status:** Approved

## Decisiones

- Crear un componente cliente pequeño que lea la ruta actual con `usePathname()`.
- Renderizar un enlace fijo a `/dashboard` desde el layout raíz y ocultarlo sólo en `/dashboard`.
- No consultar perfil ni rol: el destino aplica sus controles existentes y el componente no expone navegación privilegiada.

## Archivos afectados

- `src/components/dashboard-access.tsx`: acceso global y condición de visibilidad. (FR-001 a FR-003)
- `src/app/layout.tsx`: inclusión del componente en toda la aplicación. (FR-001)

## Verificación

1. Navegar a inicio, contenidos, detalle y perfil; confirmar acceso visible a `/dashboard`.
2. Confirmar que el acceso no aparece en `/dashboard` y sí en sus subrutas.
3. Ejecutar `npm run check`.
