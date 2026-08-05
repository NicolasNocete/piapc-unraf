---
id: eje-06-multimodalidad
titulo: Multimodalidad en la producción de videojuegos
eje: 6
orden: 6
tipo: lectura
nivel: demostrativo
audiencia: estudiante
clases: [12, 13]
modalidad: mixta
duracion_minutos: 20
resultados: [RA8, RA10, RA11]
prerrequisitos: [eje-06-contratos-disciplinas]
evaluable: true
acceso: publico
version: 1
---

# Multimodalidad en la producción de videojuegos

## Propósito

Coordinar entradas y salidas de texto, código, imagen y audio sin atribuir al modelo capacidades de comprensión o validación que no están demostradas.

## Por qué importa

Un videojuego integra modalidades con criterios diferentes. Poder generar o describir varias no demuestra que sean correctas por separado ni consistentes en ejecución.

## Modelo mental

Multimodalidad es la capacidad de procesar o producir más de una modalidad. No implica que todas compartan una representación perfecta ni que el sistema pueda verificar lo que genera. En producción conviene separar:

```text
artefacto fuente → transformación → salida candidata → validación específica
```

## Conceptos centrales

| Área | Entrada o salida posible | Validación necesaria |
|---|---|---|
| Código | Fuente, diferencias, registros | Tipado, pruebas, revisión y ejecución |
| Diseño | Reglas, tablas, diagramas | Simulación, telemetría y prueba de juego |
| Narrativa | Guion, diálogo, localización | Continuidad, tono, variables y revisión humana |
| Imagen | Boceto, sprite, captura | Dimensiones, transparencia, legibilidad, licencia y uso en escena |
| Audio | Guion, voz, efecto, forma de onda | Formato, duración, niveles, sincronía, escucha y licencia |
| Documentación | Especificación, incidencia, manual | Fuentes, versión, enlaces y coherencia con el proyecto |
| Pruebas | Casos, capturas, video, registros | Oráculo explícito, entorno y reproducción |

Un modelo puede describir una captura y omitir un objeto; transcribir audio y perder intención; generar una prueba que confirma su propia suposición; o producir un activo estilísticamente plausible pero incompatible con licencia, escala o rendimiento.

## Caso aplicado

Se agrega una advertencia de detección. Diseño define anticipación de 0,8 s y accesibilidad redundante. Narrativa aporta texto; arte, icono y animación; audio, señal; programación sincroniza eventos; QA prueba con audio apagado, distintas resoluciones y reinicio de escena.

Un agente multimodal puede comparar captura, especificación y registro, pero su informe es una hipótesis. La aceptación combina validaciones mecánicas, inspección humana y ejecución identificada. Si no puede procesar audio, no debe inferir que el archivo “suena bien” desde su nombre o metadatos.

## Consistencia entre modalidades

Definí identificadores y restricciones compartidos: evento, versión, duración, resolución, idioma, licencia y plataforma. Después comprobá relaciones, no sólo archivos:

- texto visible coincide con narrativa aprobada;
- icono y sonido responden al mismo evento;
- comportamiento respeta tiempos de animación;
- documentación describe la versión ejecutada;
- pruebas observan el build y condiciones objetivo.

La procedencia acompaña cada activo: fuente, autoría, herramienta, transformaciones, licencia y aprobación. No se incorporan datos personales, voces o estilos protegidos sin base y autorización apropiadas.

## Límites

Las capacidades dependen del modelo, formato, resolución, duración y herramienta disponible. Comprimir una imagen o audio puede ocultar el defecto. Capturas no muestran interacción completa; transcripciones no demuestran mezcla; pruebas generadas no establecen por sí mismas el resultado esperado. Debe existir una alternativa con registros provistos cuando no haya acceso a modelos multimodales.

## Errores frecuentes

- Llamar multimodal a incluir sólo enlaces que el modelo no puede abrir.
- Evaluar una salida con el mismo modelo y tratarlo como prueba independiente.
- Omitir versión, formato o transformación del activo.
- Validar imagen y audio fuera del contexto jugable.
- Suponer que una descripción segura implica derechos de uso.

## Comprobación

1. ¿Qué puede demostrar un metadato de audio y qué no?
2. ¿Por qué una captura aislada no prueba interacción?
3. ¿Qué identificador compartirían código, animación y prueba?

## Actividad relacionada

[Laboratorio integrador: una integración controlada](07-laboratorio-integrador.md).

## Bibliografía comentada

- Model Context Protocol. *Tools*. Tipos de contenido de resultados, incluidos texto, imagen y audio. https://modelcontextprotocol.io/specification/2025-06-18/server/tools (consulta: 4 de agosto de 2026).
- NIST (2024). *Artificial Intelligence Risk Management Framework: Generative AI Profile*. Riesgos y trazabilidad de contenido generativo. https://doi.org/10.6028/NIST.AI.600-1
- Unity Technologies. *Asset workflow*. Importación y relación con archivos fuente. https://docs.unity3d.com/Manual/AssetWorkflow.html (consulta: 4 de agosto de 2026).
- Phaser. *Loader*. Tipos y ciclo de carga de activos web. https://docs.phaser.io/phaser/concepts/loader (consulta: 4 de agosto de 2026).
