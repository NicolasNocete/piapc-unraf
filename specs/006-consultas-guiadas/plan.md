# Plan técnico: Consultas guiadas sobre el sitio

## Decisiones

- Se crea la ruta protegida `/dashboard/consultas` y un acceso para toda persona autenticada con perfil completo.
- Un Route Handler autenticado valida cada pregunta y usa la API Responses de OpenAI con `OPENAI_API_KEY`, exclusivamente en servidor.
- La recuperación selecciona fragmentos del contenido publicado localmente. Las referencias externas enlazadas en esos materiales se incluyen entre las fuentes permitidas y se muestran como procedencia; no se habilitan herramientas ni acciones del modelo.
- Se usará `gpt-4.1-mini` como modelo inicial de texto, sin búsqueda web ni herramientas de OpenAI.
- Las tablas `guided_conversations`, `guided_messages` y `guided_consultation_usage` conservan historial propio y cuota diaria. RLS permite leer únicamente conversaciones y mensajes propios; los eventos de uso no se exponen al cliente.
- Funciones privadas de seguridad controlan de forma atómica el límite de diez consultas por día en `America/Argentina/Buenos_Aires`, crean preguntas y agregan respuestas. Las consultas rechazadas solo insertan su evento categorizado.

## Seguridad y privacidad

- El Route Handler verifica identidad mediante `getClaims()` y no confía en identificadores enviados por el navegador.
- La entrada se valida con Zod y se rechazan intentos de alterar instrucciones, acceder a datos privados, ejecutar acciones o solicitar contenido académico no publicado.
- El modelo recibe solo la pregunta, historial propio limitado y fragmentos de fuentes permitidas. No recibe secretos, perfiles, entregas ni metadatos internos.
- Las respuestas exponen solo texto y fuentes locales o URLs externas extraídas del contenido permitido.

## Verificación

- Ejecutar las pruebas SQL locales de políticas y cuota cuando Docker esté disponible.
- Generar tipos de Supabase y ejecutar `npm run check`.
- Ejecutar consultas HTTP autenticadas y no autenticadas si hay un entorno local disponible, sin usar navegador.

## Trazabilidad

- FR-001 a FR-010: ruta, formulario, Route Handler y composición de fuentes.
- FR-011 a FR-014: migración, RLS, funciones de cuota e historial, y mensajes de rechazo.
- AC-001 a AC-010: pruebas de validación, tipos, build y pruebas SQL de actores permitidos y denegados.
