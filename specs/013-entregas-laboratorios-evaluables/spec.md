# Entregas de laboratorios evaluables

Estado: Implemented

## Objetivo y valor

Permitir que el estudiante entregue los cinco upgrades en la propia consigna del laboratorio, y que el profesor encuentre esas entregas en su índice e historial. Aprobado en esta conversación con «avanzar».

## Escenarios

- Un estudiante autenticado abre `eje-04-laboratorio-flujo-completo`, ve el box al final y registra su entrega con el mismo flujo versionado existente.
- El profesor responsable encuentra ese laboratorio en Entregas y abre su historial.
- Lecturas y laboratorios no evaluables no habilitan recepción de entregas.

## Requisitos

- FR-001: una regla común admite las actividades que ya recibían entregas y añade laboratorios con `evaluable: true`.
- FR-002: página de contenido y Server Action aplican la misma regla; se conserva validación, identidad verificada y rol estudiante antes de escritura.
- FR-003: índice y detalle docente usan la misma regla; se conserva acceso exclusivo del profesor responsable.
- FR-004: se mantiene el ID y versión de contenido, los registros existentes y el formulario actual.

## Fuera de alcance

No modificar fechas, reglas temporales, contenido académico, autenticación, políticas, esquema, componentes del formulario ni tipos de las consignas. No crear commits o push en este pedido.

## Datos y seguridad

Se reutilizan tablas/RPC existentes y los mismos controles por actor. No requiere migración: la base almacena IDs y versiones y no filtra por tipo del manifiesto. La Server Action sigue verificando contenido publicado y actor antes del RPC privilegiado. No se amplía acceso de lectura entre alumnos.

## Ambigüedades

Ninguna: se añade sólo laboratorio explícitamente evaluable y se conserva el comportamiento de actividades, incluso si su metadato evaluable es falso.

## Aceptación

- AC-001: el laboratorio de upgrades y la práctica nueva de navegación cumplen la regla común, con sus IDs originales.
- AC-002: laboratorio sin evaluable o con false y lecturas aun evaluables no cumplen la regla.
- AC-003: las cuatro puertas (formulario, guardado, índice y detalle docente) usan la misma regla.
- AC-004: pruebas de contenido y `npm run check` pasan; verificación de runtime cuando haya servidor y sesión disponibles, registrando límites si no están disponibles.
