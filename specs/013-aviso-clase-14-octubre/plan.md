# Plan editorial

- FR-001: modificar fuentes externas en `../programa` y `../contenidos`, y guía docente de clase 10; regenerar réplicas y cronograma con los comandos existentes.
- FR-002/003/004: crear `docentes/aviso-campus-clase-10-virtual.md` con enlaces absolutos de apunte, práctica y plantilla GDD bajo `https://unraf-piapc.vercel.app`. Anunciar los adjuntos incorporados y retirar la nota editorial de pendiente.
- Verificación AC-001/002: revisar el aviso, ejecutar `npm run content:sync`, `npm run generate:academic-content` y `npm run content:check`. Cambio exclusivamente documental.
- AC-003: copiar los binarios originales a `public/Game_AI_Architecture.pdf` y `public/resumen-eje-05-navegacion-decisiones.png`. Usar enlaces HTTPS absolutos, compatibles con el validador y el renderizador existentes; mostrar la imagen con Markdown. Comprobar igualdad SHA-256 con los originales.
