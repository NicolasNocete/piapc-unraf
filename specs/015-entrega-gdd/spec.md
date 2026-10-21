# Entrega del GDD independiente

Status: Implemented

## Objetivo y valor

Permitir entregar el GDD antes de la entrega final del proyecto, sin confundir sus versiones ni reemplazar envíos existentes. Alcance aprobado en la conversación con «sí, correcto» y «avanzar».

## Escenarios

- El estudiante abre «Entrega del GDD», registra el documento y puede actualizarlo con nuevas versiones.
- Desde la consigna del TP final encuentra el enlace al GDD y distingue ambos plazos.
- El docente encuentra el GDD como actividad independiente en el índice de entregas existente.

## Requisitos

- FR-001: publicar «Entrega del GDD» como actividad independiente con ID estable `tp-final-entrega-gdd`, disponible desde el 21/10/2026 y plazo editorial antes del martes 27/10/2026 a las 12:00 hs de Argentina.
- FR-002: solicitar el GDD breve ya definido por la consigna, mediante texto y enlaces accesibles; no exigir prototipo terminado, specs ni presentación en esta instancia. En parejas, cada integrante registra el mismo enlace identificando al equipo.
- FR-003: reutilizar el formulario y versionado por actividad; conservar el ID `tp-final-integrador-npc`, su fecha del 3/11 y todos los envíos existentes. Las actualizaciones de una actividad no reemplazan las de la otra.
- FR-004: enlazar el GDD desde la consigna, la guía de inicio y el índice transversal; retirar la afirmación de que no existe entrega intermedia y distinguir GDD, final y exposición.

## Fuera de alcance

Cambiar UI, rutas, esquema, RLS, autenticación, ponderaciones, requisitos técnicos del TP, Próximas acciones o el aviso de clase. No migrar envíos existentes, crear entregas en nombre de estudiantes, desplegar, hacer commit ni push. No agregar cierre técnico: se mantiene la recepción de versiones fuera de plazo del producto.

## Datos y seguridad

Nueva entrada editorial pública; las entregas privadas siguen asociadas a estudiante e ID de actividad mediante los controles existentes. No se cambia ni se escribe la base durante la implementación. No publicar secretos ni documentos privados de estudiantes.

## Ambigüedades

Sin decisiones pendientes. La hora se comunica en la consigna; los metadatos actuales representan días civiles y no bloquean envíos tardíos. «Única entrega» pasa a significar una sola entrega final integradora, además del GDD previo.

## Aceptación

- AC-001 (FR-001–003): manifiesto incluye ambos IDs distintos, evaluables y admitidos por `acceptsDeliveries`; GDD hasta 27/10 y final hasta 3/11. El texto del GDD indica antes de las 12:00 hs de Argentina y permite actualizar sólo su propia entrega.
- AC-002 (FR-002, FR-004): enlaces entre GDD, consigna, guía e índice resuelven; instrucciones distinguen los materiales de ambas instancias, sin contradicción sobre entrega intermedia.
- AC-003 (FR-003): no hay cambios en código de guardado, migraciones ni envíos existentes; el formulario existente utiliza el ID propio de cada actividad.
- AC-004: sincronización editorial, pruebas de contenido y `npm run check` pasan. Intentar verificación runtime y declarar limitaciones de sesión sin registrar envíos ficticios.
