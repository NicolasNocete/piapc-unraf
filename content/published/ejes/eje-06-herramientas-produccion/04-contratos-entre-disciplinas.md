---
id: eje-06-contratos-disciplinas
titulo: Contratos entre disciplinas y consistencia del producto
eje: 6
orden: 4
tipo: lectura
nivel: obligatorio
audiencia: estudiante
clases: [10, 12, 13]
modalidad: mixta
duracion_minutos: 22
resultados: [RA3, RA5, RA8, RA11]
prerrequisitos: [eje-06-interoperabilidad-motores-servicios]
evaluable: true
acceso: publico
version: 1
---

# Contratos entre disciplinas y consistencia del producto

## Propósito

Convertir dependencias entre diseño, programación, narrativa, arte, audio y QA en contratos verificables hasta el producto ejecutable.

## Por qué importa

Cada artefacto puede ser correcto de forma aislada y producir un juego incoherente: una animación dura más que la ventana de ataque, el subtítulo no coincide con el audio o la dificultad implementada contradice la intención de diseño.

## Modelo mental

```text
intención → especificación → contrato de interfaz → activo y código
          → integración → comportamiento ejecutado → evidencia
```

## Conceptos centrales

Un contrato interdisciplinario no asigna sólo tareas. Define qué entrega una disciplina y qué puede asumir la otra.

| Campo | Ejemplo verificable |
|---|---|
| Intención | El aviso debe ser perceptible sin sobresalto excesivo |
| Productor/consumidor | Audio entrega; sistema de alerta reproduce |
| Identidad y versión | `alerta_guardia`, revisión 3 |
| Formato | WAV, 48 kHz, mono, pico máximo acordado |
| Semántica | Comienza al entrar en estado `alerta` |
| Límites | Duración máxima 1,2 s; sin información esencial sólo sonora |
| Caso de aceptación | Se oye una vez por transición y tiene alternativa visual |
| Evidencia | Metadatos, prueba de transición y ejecución grabada con versión |
| Responsable | Quién acepta, rechaza y resuelve conflicto |

## Fuentes de verdad y cambios

El contrato debe enlazar versiones concretas de especificación, activo y comportamiento. Si una disciplina cambia nombre, duración, evento o escala, identifica consumidores afectados y renegocia el contrato; no “corrige” silenciosamente al integrar.

Una matriz simple detecta divergencias:

| Criterio | Especificación | Activo | Código/prueba | Ejecutable |
|---|---|---|---|---|
| Aviso único al alertarse | Sí | Sonido v3 | Evento por transición | Observar/escuchar |
| Alternativa visual | Sí | Icono v2 | Se activa con evento | Observar sin audio |
| Duración máxima | 1,2 s | 1,1 s | Metadato validado | Medir en ejecución |

No todas las celdas se validan del mismo modo. Una prueba unitaria puede demostrar un evento único, pero no mezcla, legibilidad ni sensación de dificultad. Esas cualidades requieren inspección humana con condiciones registradas.

## Caso aplicado

Diseño especifica que un guardia tarda 0,8 s en reconocer al jugador. Arte entrega una anticipación de 12 cuadros y programación dispara persecución de inmediato. Ningún archivo está roto, pero el producto contradice la intención. El contrato debe fijar evento, frecuencia de animación, instante de transición y tolerancia. QA prueba el límite temporal y diseño evalúa legibilidad en el build objetivo.

## Contrato para agentes

Al delegar, se entregan sólo fuentes vigentes, alcance de archivos y criterios por disciplina. El agente puede detectar diferencias y preparar cambios, pero no debe resolver por sí solo un conflicto de intención. Su salida separa:

- hechos observados y versiones;
- inconsistencias;
- propuesta y archivos afectados;
- validaciones ejecutadas;
- decisiones humanas pendientes.

## Límites

Un contrato no reemplaza conversación ni elimina evolución creativa. Formalizar cada detalle puede frenar prototipos; conviene concentrarse en interfaces costosas de cambiar, requisitos de accesibilidad, rendimiento, licencias y criterios que cruzan disciplinas.

## Errores frecuentes

- Definir entregables sin consumidores ni semántica.
- Usar nombres de archivo como única identidad.
- Validar activos fuera del juego y omitir el build objetivo.
- Considerar la especificación inmutable aunque exista un cambio aprobado.
- Permitir que una corrección técnica cambie intención de diseño.

## Comprobación

1. ¿Qué dato conecta una animación con una transición de comportamiento?
2. ¿Por qué un archivo de audio válido puede fallar como activo de juego?
3. ¿Qué conflictos debe escalar el agente?

## Actividad relacionada

[Laboratorio integrador: una integración controlada](07-laboratorio-integrador.md).

## Bibliografía comentada

- PIAPC. Programa 2026. Resultados RA3, RA8 y RA11 y criterios de integración.
- Unity Technologies. *Asset workflow*. Relación entre archivos fuente, importación y activos. https://docs.unity3d.com/Manual/AssetWorkflow.html (consulta: 4 de agosto de 2026).
- Phaser. *Loader*. Carga, claves y tipos de recursos en proyectos web. https://docs.phaser.io/phaser/concepts/loader (consulta: 4 de agosto de 2026).
