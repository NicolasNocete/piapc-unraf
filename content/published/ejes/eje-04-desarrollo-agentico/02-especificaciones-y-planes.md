---
id: eje-04-especificaciones-y-planes
titulo: Especificaciones y planes verificables
eje: 4
orden: 2
tipo: lectura
nivel: obligatorio
audiencia: estudiante
clases: [5, 8]
modalidad: mixta
duracion_minutos: 25
resultados: [RA3, RA5, RA8, RA11]
prerrequisitos: [eje-04-repositorios-y-contexto]
evaluable: true
acceso: publico
version: 1
---

# Especificaciones y planes verificables

## Propósito

Transformar una solicitud ambigua en un contrato de resultado y descomponerlo en pasos que puedan implementarse y verificarse por separado.

## Por qué importa

“Mejorá la inteligencia del guardia” permite soluciones incompatibles. Una especificación reduce ese espacio sin imponer prematuramente una implementación. El agente puede proponer alternativas; la persona conserva las decisiones de producto y acepta los criterios.

## Modelo mental

```text
necesidad → especificación → criterios y pruebas → plan incremental
```

La especificación define qué resultado aceptar; el plan organiza cómo intentar alcanzarlo. Si una prueba revela un supuesto falso, se actualiza el plan sin cambiar silenciosamente el resultado acordado.

## Conceptos centrales

Una especificación responde:

| Elemento | Pregunta |
|---|---|
| Problema | ¿Qué comportamiento actual produce qué perjuicio? |
| Objetivo | ¿Qué resultado observable se busca? |
| Alcance | ¿Qué conducta o componentes pueden cambiar? |
| Fuera de alcance | ¿Qué no debe resolverse ahora? |
| Restricciones | ¿Qué arquitectura, rendimiento, permisos o recursos limitan la solución? |
| Casos límite | ¿Qué entradas, tiempos o estados extremos importan? |
| Aceptación | ¿Qué condiciones observables deben cumplirse? |
| Pruebas | ¿Cómo y dónde se obtendrá evidencia para cada condición? |

El problema describe la necesidad; el objetivo, el estado deseado. “La persecución continúa sin visión” es un problema. “Volver a patrulla tras tres segundos sin percepción” es un objetivo medible.

## Caso aplicado: memoria del [guardia de sigilo](https://github.com/NicolasNocete/piapc-guardia-sigilo)

**Problema:** al perder de vista al jugador, el guardia lo persigue indefinidamente y bloquea el ciclo de sigilo.

**Objetivo:** el guardia investiga la última posición conocida y vuelve a patrulla si no recupera percepción durante tres segundos.

**Alcance:** transición desde investigación, temporizador y pruebas del dominio.

**Fuera de alcance:** navegación, cono visual, animaciones, dificultad y sonido.

**Restricciones:** el dominio no importa Phaser; no se agregan dependencias; el tiempo ingresa como dato controlable; no se publican cambios.

**Casos límite:** recuperar visión al vencer el plazo, actualización con un salto temporal grande, reinicio y ausencia de ruta.

| Criterio de aceptación | Evidencia prevista |
|---|---|
| Sin nueva percepción, pasa a patrulla a los 3000 ms | Prueba con reloj controlado |
| Si recupera visión antes, vuelve a persecución | Prueba de transición |
| Un salto temporal no deja un estado inválido | Prueba de caso límite |
| No cambia navegación ni representación | Diferencia de Git y suite existente |

“Tiene pruebas” no es un criterio: no indica qué comportamiento comprueban ni qué resultado esperan.

## Descomponer antes de editar

Un plan conecta criterios, cambios y validaciones:

```text
criterio → modificación mínima → comprobación enfocada → riesgo
```

Para el caso anterior:

1. Reproducir el fallo con una prueba del dominio.
2. Incorporar la transición mínima sin tocar la escena.
3. Ejecutar la prueba enfocada.
4. Cubrir recuperación de visión y salto temporal.
5. Ejecutar validación completa y revisar diferencias.

Cada paso debe dejar un estado comprensible. Si “refactorizar IA” y “corregir temporizador” están mezclados, no se sabe qué cambio resolvió el problema ni cuál introdujo una regresión.

## Plan vivo y condiciones de detención

Planificar no significa adivinar toda la implementación. El plan se actualiza cuando la exploración o las pruebas aportan evidencia nueva. Debe registrar el motivo del cambio, no reescribir la historia.

Hay que detenerse cuando falta una decisión de diseño, una fuente contradice a otra, aparece un cambio concurrente incompatible, se requiere un permiso no concedido o la solución excede el alcance. Escalar una ambigüedad crítica es mejor que convertirla en código.

## Límites

Una especificación no reemplaza la exploración ni garantiza calidad. El exceso de detalle puede congelar una solución incorrecta; la falta de criterios deja la finalización a juicio subjetivo. Los prototipos exploratorios también requieren límites de tiempo, riesgo y aprendizaje esperado.

## Errores frecuentes

- Confundir objetivo con una lista de archivos a editar.
- Omitir “fuera de alcance” y aceptar expansión silenciosa.
- Escribir criterios no observables como “código limpio”.
- Diseñar sólo el camino favorable.
- Separar pruebas de los criterios que deben demostrar.
- Mantener un plan refutado por evidencia nueva.
- Pedir al agente que complete decisiones de diseño no delegadas.

## Comprobación

1. ¿Qué diferencia hay entre problema y objetivo?
2. ¿Por qué “no romper nada” no es un criterio suficiente?
3. ¿Qué caso límite aparece cuando percepción y plazo cambian a la vez?
4. ¿Cuándo debe detenerse una implementación aunque el agente pueda continuar?

## Actividad relacionada

Completá la [plantilla de especificación](../../plantillas/01-especificacion.md) y luego la [plantilla de plan](../../plantillas/02-plan.md) para el laboratorio. Cada criterio debe tener una evidencia prevista.

## Bibliografía comentada

- Jimenez, C. et al. (2024). “SWE-bench”. Presenta tareas de ingeniería derivadas de incidencias reales y evaluación mediante pruebas. https://arxiv.org/abs/2310.06770
- Yang, J. et al. (2024). “SWE-agent”. Relaciona resolución de tareas, observaciones del repositorio e interfaz de trabajo. https://arxiv.org/abs/2405.15793
- GitHub. *About issue and pull request templates*. Referencia práctica para estructurar solicitudes; no sustituye una especificación. https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests
