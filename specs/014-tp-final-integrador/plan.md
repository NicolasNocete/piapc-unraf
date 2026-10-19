# Plan técnico

1. Editar fuentes `../contenidos/` y `../programa/Programa PIAPC - 2026.md`, no réplicas manualmente (FR-001–004, FR-007).
2. Crear `transversales/tp-final-integrador-npc.md` como `actividad`, evaluable y pública, clases 11–13, disponible desde 19/10 hasta 3/11. El ID activa formulario, guardado e índice docente mediante `acceptsDeliveries`, sin modificar código ni Supabase (FR-001, FR-005).
3. Enlazar la consigna desde los índices fuente y conservar fechas históricas de actividades anteriores. Actualizar el programa a versión 1.1, manteniendo instrumentos, porcentajes y umbrales, pero sin un segundo examen independiente (FR-007).
4. Copiar íntegramente la publicación anterior a un archivo histórico nuevo. Publicar resumen, acciones y fecha explícita 3/11, sin inferir el 27/10 ni una hora (FR-006).
5. Actualizar guías docentes privadas existentes de clases 11–14 sin añadir rúbricas, soluciones ni notas (FR-007).
6. Ejecutar `content:sync` después de comprobar que las fuentes coinciden con el manifiesto previo; luego generación académica, validación y pruebas. Confirmar actividad admitida y enlaces de Próximas acciones, y comparar archivo histórico byte por byte (AC-001–004).
7. Ejecutar `npm run check`; usar next-dev-loop si hay servidor disponible y registrar limitaciones (AC-005).

## Rollout y límites

Los cambios quedan preparados en el repositorio para el despliegue habitual. No se realiza despliegue, commit ni escritura en base. El mecanismo vigente permite versiones tardías; la fecha es editorial, no se añade un cierre técnico. Cada estudiante registra su envío individual, aunque comparta proyecto con otra persona.
