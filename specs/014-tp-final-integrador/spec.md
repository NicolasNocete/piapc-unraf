# TP final integrador de IA para NPC

Status: Implemented

## Objetivo y valor

Publicar una consigna realizable que unifique el segundo parcial con el TP final y permita entregar desde la plataforma. Aprobado en la conversación con «avanzar», entrega el 3/11/2026, exposición el 4/11 y ninguna actividad el 11/11.

## Escenarios

- El estudiante encuentra la consigna desde Próximas acciones, forma un equipo de hasta dos integrantes y sigue GDD → specs → ejecución.
- Implementa un prototipo con NPC, objetivos, búsqueda, navegación y comportamiento, usando OpenCode, y entrega su repositorio público.
- El docente encuentra la actividad en Entregas y organiza la exposición de métodos el 4/11.

## Requisitos

- FR-001: publicar una actividad evaluable con fecha editorial de entrega 3/11 y exposición 4/11; sustituye el segundo parcial y se unifica con el TP final.
- FR-002: equipos de uno o dos integrantes; prototipo acotado con percepción, objetivos, al menos dos algoritmos de búsqueda y dos alternativas de navegación; admitir más. Permitir FSM, BT, utilidad o GOAP, sin exigir todas.
- FR-003: explicar spec-driven básico, incluir un ejemplo de spec y proponer GDD → specs → ejecución con OpenCode, pruebas y ajuste, sin informe extenso ni acumulación de evidencias.
- FR-004: solicitar repositorio público, ejecución reproducible, README, GDD breve, specs y presentación de búsqueda, navegación, características de IA y proceso de desarrollo.
- FR-005: reutilizar entregas individuales existentes: cada integrante envía el mismo repositorio e identifica el equipo. No implementar coautoría ni registrar envíos ficticios.
- FR-006: archivar Próximas acciones sin cambios y reemplazar su publicación con enlaces válidos a la consigna y apoyos pertinentes.
- FR-007: alinear programa fuente, índice editorial y guías docentes: inicio 21/10, taller 28/10, entrega 3/11, exposición 4/11 y sin actividades el 11/11. Mantener porcentajes y umbrales académicos existentes; eliminar la obligación de un segundo parcial separado.
- FR-008: exigir variación procedural o aleatoria sencilla del escenario que afecte las rutas y permita generar otra variante válida. Mostrar jugando cómo funcionan las búsquedas, la navegación y los comportamientos en distintos escenarios. El patrullaje no puede depender exclusivamente de trayectorias fijas preparadas: sus puntos deben ser válidos y las rutas calcularse según el mapa. No exigir semillas, guardado, reproducción exacta, comparación con mapa/inicio/objetivo idénticos, métricas, tablas ni documentación adicional.

## Fuera de alcance

Cambios de UI, rutas, SQL, autenticación, permisos, esquema, calificaciones, ponderaciones, soporte de grupos y cierre técnico de entregas. No exigir MCP. No publicar rúbricas privadas. No crear commits, desplegar ni enviar trabajos en nombre de estudiantes.

## Datos y seguridad

Nueva entrada editorial con ID estable `tp-final-integrador-npc`; se reutilizan autorización y almacenamiento de entregas. No migración ni escritura remota. Recordar que el repositorio no debe contener secretos ni datos privados.

## Ambigüedades

No se acordó hora de cierre: publicar sólo el día 3/11, sin inventar hora ni bloqueo. Se conserva la recepción de versiones fuera de plazo prevista por el producto.

## Aceptación

- AC-001 (FR-001, FR-005): manifiesto contiene una actividad pública evaluable disponible hasta 2026-11-03, admitida por la regla existente de entregas; cada integrante tiene instrucciones de envío.
- AC-002 (FR-002, FR-003, FR-004): consigna incluye requisitos, ejemplos, spec y flujo básico, materiales mínimos y temario de exposición, sin exigir MCP ni informe/evidencias extensas.
- AC-003 (FR-006): archivo histórico idéntico al original y enlaces de Próximas acciones resuelven a IDs publicados.
- AC-004 (FR-007): programa y guías actuales reflejan fechas definitivas, sustitución del parcial y última semana sin actividades.
- AC-005: sincronización, validación editorial, pruebas de contenido y `npm run check` pasan. Verificar runtime si hay servidor disponible; declarar cualquier limitación de sesión.
- AC-006 (FR-008): consigna, ejemplo de spec, flujo, instrucciones de ejecución y exposición exigen escenarios variables y rutas adaptativas observables jugando, sin confundir variación de escenario con las dos alternativas de navegación. No exigen semillas, guardado ni comparación controlada. Simplificación aprobada en la conversación con «avanzar, commit y push».
