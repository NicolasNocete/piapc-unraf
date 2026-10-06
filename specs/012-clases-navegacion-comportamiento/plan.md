# Plan editorial

1. Redactar `../contenidos/ejes/eje-05-ia-videojuegos/10-teoria-navegacion-y-comportamiento.md` como apunte integrado, con dos partes y ejemplos reproducibles. FR-001/002; AC-001.
2. Redactar `../contenidos/ejes/eje-05-ia-videojuegos/11-practica-guiada-navegacion.md` con spec común, tres anexos seleccionables, mapa fijo, ocho pasos y plantillas compactas. FR-003/004/005/006/007; AC-002/003/004.
3. Enlazar ambos desde el índice fuente; distinguir la entrega de navegación del laboratorio A*/FSM de clase 10. FR-008; AC-005.
4. Sincronizar con `npm run content:sync` y validar con `npm run content:check`. Revisar los cambios generados y las sumas/rutas de los ejemplos. FR-008; AC-005.

## Decisiones técnicas de los ejemplos

- Cuadrícula de cuatro vecinos, coordenadas desde cero, inicio (0,1) y meta (4,1), sin diagonales.
- Variantes A/B usan costo positivo de entrada: 1 normal y 5 lento/expuesto. Manhattan sigue siendo una cota inferior válida. BFS sólo es referencia de cantidad de pasos; el oráculo ponderado es el costo conocido del fixture.
- Variante C usa bloqueo de (2,1) y recálculo por invalidación, separado del presupuesto temporal de persecución y de la FSM existente.
- Datos de prueba fijos y fixture puro; no se obliga a editar el mapa de producción ni agregar una interfaz de edición.
- Rutas locales sugeridas no se presentan como símbolos garantizados de las copias individuales.

## Verificación

Revisión editorial y trazabilidad de requisitos, revisión aritmética de trazas, enlaces y metadatos con el validador existente. Trabajo sólo documental: no requiere `npm run check` ni pruebas de runtime.

## Ampliación: publicación semanal y campus

Pedido explícito posterior: actualizar `content/upcoming-actions.md`, preservar la versión en `content/archive/2026/upcoming-actions-clase-8-cinco-upgrades.md`, actualizar `docentes/guia-clase-09-busqueda-navegacion.md` y redactar `docentes/aviso-campus-clase-09-entregas.md`. FR-009/010/011; AC-006.

Conservar las fechas expresamente aprobadas, que prevalecen sobre una inferencia de vencimiento al día anterior. Los enlaces de acciones usan `/contenidos/ID`; el aviso remite a la sección del sitio por nombre porque no se conoce el dominio público. No enlazar rutas de docentes ni rutas de revisión de entregas reservadas al profesor.

Para esta ampliación, la skill de publicación requiere `npm run check`. Verificar además YAML y referencias contra manifiesto. Runtime sólo si hay servidor disponible; no se modifica código de interfaz.

## Corrección de duplicación y consigna completa

FR-012/013: archivar la publicación de cinco tarjetas, dejar una tarjeta de upgrades que enlace `eje-04-laboratorio-flujo-completo` y consolidar en su fuente el catálogo original, los prompts, el paquete y el registro de entrega. La guía complementaria mantiene su contenido y añade un enlace explícito a la consigna con formulario. Sin añadir upgrades, plazos o entregas. Sincronizar fuentes y verificar con `content:check`, `test:content` y `check`.
