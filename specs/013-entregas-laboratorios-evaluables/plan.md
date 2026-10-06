# Plan técnico

1. Crear `src/lib/content/delivery.ts` con una función pura sobre tipo/evaluable; reutilización real en cuatro ubicaciones. FR-001, AC-001/002.
2. Reemplazar filtros de tipo en contenido, Server Action y rutas/índice docente. FR-002/003/004, AC-003.
3. Agregar regresiones al conjunto existente `scripts/content/__tests__/schema.test.ts`: matriz de elegibilidad y ambas consignas reales del manifiesto. AC-001/002.
4. Ejecutar `npm run test:content` y `npm run check`. AC-004. No mutar datos reales para probar un filtro del manifiesto. Runtime autenticado sujeto a disponibilidad de servidor/sesión.

Se leyó la documentación Next.js 16.3 de Server Actions y el flujo de RPC existente: el tipo se valida en la app, no se replica en SQL.
