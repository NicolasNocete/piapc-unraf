---
id: eje-04-jugo-de-juego-feedback
titulo: Jugo de juego, feedback y evidencia de una mejora
eje: 4
orden: 10
tipo: lectura
nivel: obligatorio
audiencia: estudiante
clases: [8]
modalidad: mixta
duracion_minutos: 20
resultados: [RA3, RA5, RA8, RA11]
prerrequisitos: [eje-04-especificaciones-y-planes]
evaluable: true
acceso: publico
version: 2
---

# Jugo de juego, feedback y evidencia de una mejora

## De la intención al cambio verificable

Antes de abrir un agente, separá las partes del proceso:

| Término | Qué registra o hace |
|---|---|
| Intención de diseño | La experiencia que se busca producir en quien juega. |
| Requisito | Una necesidad o regla concreta que deriva de esa intención. |
| Spec | El contrato versionado: objetivo, alcance, límites, criterios y evidencia. |
| Prompt | Una instrucción puntual al agente para explorar, preguntar, planificar o construir. |
| Plan | Incrementos, validaciones, riesgos y condiciones de detención. |
| Evidencia | Build, prueba, ejecución, telemetría y diff que sostienen una afirmación. |
| Vibe coding | Aceptar código o decisiones por plausibilidad, sin contrato, revisión ni validación. |

```text
intención → requisito → spec → prompt guiado → plan → build → evidencia
```

La spec y el prompt no compiten. La spec conserva el acuerdo de trabajo entre sesiones, personas y herramientas; el prompt usa ese acuerdo para pedir una acción concreta. El historial de un chat puede resumirse, truncarse o no estar disponible, por lo que no reemplaza una fuente versionada.

Vibe coding no significa usar IA. Puede ser útil para explorar un prototipo rápido, pero no alcanza para una práctica evaluable: una respuesta que parece correcta todavía debe cumplir criterios y producir evidencia.

### Ejemplo: alerta visual

```text
Intención: que una alerta se perciba como un momento importante.
Requisito: al activarse una alerta, el jugador recibe feedback visual inmediato.
Spec: la alerta activa un shake único y la cámara vuelve a su posición normal
en menos de un segundo; no cambia controles, navegación ni detección.
Prompt: explorá los eventos de alerta, cámara y pruebas existentes; no edites.
Evidencia: build exitoso, secuencia reproducible y diff acotado.
```

“Poné un shake copado cuando detecte al jugador” y aceptar el resultado porque se ve intenso es vibe coding: no declara alcance, retorno, criterio ni evidencia.

## Propósito

Diseñar mejoras que hagan más clara, intensa o satisfactoria una interacción sin confundir el efecto visual con la regla que gobierna el juego.

## Mecánica, feedback y jugo de juego

Una **mecánica** cambia qué puede hacer el jugador o el sistema: una cobertura corta la línea de visión, una puerta bloquea una ruta o un distractor genera un evento de sonido. El **feedback** comunica que esa regla ocurrió: un cono cambia de color, una animación cambia de postura o un medidor sube. El **jugo de juego** aumenta la respuesta perceptible mediante ritmo, cámara, sonido, color, escala o partículas.

```text
acción o evento → regla del juego → feedback → respuesta perceptible
```

El orden importa. Un shake no vuelve peligrosa una detección si la regla no cambió, y una animación de persecución no puede decidir por sí misma que el guardia persigue.

## Tres momentos de un efecto

| Momento | Pregunta | Ejemplo de sigilo |
|---|---|---|
| Anticipación | ¿Qué permite prepararse? | El cono de visión indica alcance y orientación. |
| Impacto | ¿Qué confirma que ocurrió? | Alerta con flash, sonido, zoom breve y shake. |
| Recuperación | ¿Cómo vuelve a la calma? | La cámara retorna, el color se normaliza y el medidor desciende. |

Un efecto útil tiene disparador, duración, intensidad máxima y condición de retorno. Sin esos límites puede acumularse, ocultar información o hacer difícil comprobar qué pasó.

## Caso de laboratorio: impacto visual extremo

El impacto visual extremo de alerta es un ejercicio de herramienta y feedback. Puede activarse por un evento existente o por una tecla temporal de laboratorio. La meta no es equilibrar el juego: es construir una respuesta visual claramente reproducible.

Una versión puede combinar shake breve de cámara, flash o tinte de alerta, micro-zoom y retorno rápido, partículas o anillo expansivo, pausa visual mínima y sonido de alerta si el proyecto ya ofrece un recurso apto.

La spec debe definir qué evento lo dispara, cuánto dura, cómo se evita que se apile y qué señal demuestra que el estado normal volvió. Si falta un activo, una API o una decisión de diseño, se registra la duda antes de editar.

## Diseñar un upgrade verificable

Una solicitud como “que se vea más intenso” no permite aceptar ni rechazar un resultado. Conviene transformarla en un resultado observable:

| Elemento | Pregunta útil |
|---|---|
| Problema | ¿Qué interacción hoy se entiende poco o no tiene impacto? |
| Objetivo | ¿Qué debe percibir la persona que juega? |
| Alcance | ¿Qué mecánica y qué representación pueden cambiar? |
| Restricción | ¿Qué no puede romperse, acoplarse o agregarse? |
| Criterio | ¿Qué secuencia debe producir qué señal observable? |
| Evidencia | ¿Qué build, prueba, telemetría o captura lo demuestra? |

Por ejemplo, “al dispararse la alerta, la cámara realiza un shake único y vuelve a su posición normal en menos de un segundo” es comprobable. “Que tenga más jugo” todavía necesita decisiones.

## Validar más que el efecto

1. Construí el proyecto y registrá el resultado.
2. Ejecutá la prueba relacionada si existe.
3. Reproducí la secuencia de entrada o evento que dispara el upgrade.
4. Confirmá el feedback visible y su retorno al estado normal.
5. Revisá el diff para comprobar alcance, dependencias y cambios accidentales.
6. Registrá qué criterio se demostró y qué limitación queda pendiente.

Una captura aislada no prueba duración, acumulación ni retorno. La evidencia necesita indicar estado inicial, disparador, resultado y versión del repositorio.

## Errores frecuentes

- Usar una animación o color como única fuente de verdad del estado.
- Agregar un efecto sin disparador ni condición de retorno.
- Acumular shakes, zooms o flashes ante eventos repetidos.
- Cambiar mecánica, cámara y formato masivamente en un solo incremento.
- Declarar que un efecto funciona sin build o secuencia reproducible.
- Usar “se ve mejor” como único criterio de aceptación.

## Comprobación

1. ¿Qué diferencia una mecánica de su feedback?
2. ¿Qué cuatro límites debe declarar un efecto visual?
3. ¿Por qué una captura no alcanza para demostrar un shake?
4. ¿Qué evidencia permite saber que una mejora no alteró el alcance técnico?
5. ¿Qué decisión humana permanece antes de pedir un build al agente?
6. ¿Cuándo una respuesta plausible se convierte en vibe coding?
