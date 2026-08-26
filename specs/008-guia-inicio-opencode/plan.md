# Plan técnico

## Decisiones

- La guía se publica como lectura del Eje 3 porque prepara el laboratorio sin transformar OpenCode en contenido transversal obligatorio.
- Se enlaza la página de introducción y las secciones oficiales de Windows, permisos, reglas y agentes; los pasos de instalación específicos quedan en la documentación del producto para evitar duplicar instrucciones variables.
- El laboratorio mantiene su ID y archivo para no romper referencias existentes; su orden editorial pasa a 8 y agrega la guía como prerrequisito.

## Archivos

- `content/published/ejes/eje-03-sistemas-agenticos/07-primeros-pasos-opencode.md`: nueva guía operativa. (FR-001, FR-002, FR-003, FR-004)
- `content/published/ejes/eje-03-sistemas-agenticos/README.md`: recorrido actualizado. (FR-001, FR-005)
- `content/published/ejes/eje-03-sistemas-agenticos/07-laboratorio-agente-controlado.md`: orden y prerrequisitos actualizados. (FR-005)
- `src/content/generated/academic-content.ts`: manifiesto regenerado. (AC-004)

## Verificación

1. Confirmar que la guía aparece antes del laboratorio en el índice y que éste la declara como prerrequisito.
2. Ejecutar `npm run generate:academic-content`.
3. Ejecutar `npm run check`.
