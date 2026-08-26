# Plan técnico

## Decisiones

- La guía será un documento fuente bajo `../contenidos/soluciones/`, con `tipo: solucion` y acceso público, porque la carpeta está destinada a orientaciones liberables.
- Incluirá resultados modelo basados en los paquetes públicos de muestras y fichas; no usará evidencia de estudiantes ni materiales privados.
- Las actividades conservarán su consigna y enlazarán la guía desde su sección de publicación de solución.
- La acción del dashboard reutilizará el enlace interno generado para el nuevo identificador de contenido.

## Archivos

- `../contenidos/soluciones/guia-eje-02-caja-cristal-y-decisiones.md`: guía liberable. (FR-001, FR-002, FR-003)
- `../contenidos/ejes/eje-02-redes-y-llm/05-laboratorio-caja-de-cristal.md`: enlace a la guía. (FR-004)
- `../contenidos/ejes/eje-02-redes-y-llm/06-errores-conceptuales.md`: enlace a la guía. (FR-004)
- `content/upcoming-actions.md`: acción enlazada a la guía y retiro del tip incorrecto. (FR-004)
- `content/archive/2026/`: copia de la publicación vigente antes de reemplazarla.

## Publicación y verificación

1. Ejecutar `npm run content:sync` para copiar el documento al contenido publicado y actualizar el manifiesto con su digest.
2. Ejecutar `npm run check` para validar enlaces, esquema, tipos, lint y build.
