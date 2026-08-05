---
id: eje-01-agentes-racionales
titulo: El agente racional como marco de análisis
eje: 1
orden: 3
tipo: lectura
nivel: obligatorio
audiencia: estudiante
clases: [2]
modalidad: mixta
duracion_minutos: 25
resultados: [RA1, RA2]
prerrequisitos: [eje-01-que-es-ia]
evaluable: true
acceso: publico
version: 1
---

# El agente racional como marco de análisis

## Propósito

Al terminar podrás describir un sistema mediante entorno, percepciones, estado, objetivos, medida de desempeño, decisiones y acciones, y comparar este marco clásico con un agente basado en un modelo de lenguaje de gran tamaño (LLM).

## Por qué importa

Decir que un enemigo "es inteligente" no explica su conducta. El marco de agente racional obliga a identificar qué sabe, qué intenta lograr, qué puede hacer y cómo se juzga su desempeño. Sirve para analizar tanto personajes de un juego como agentes que trabajan sobre un repositorio.

## Modelo mental: observar, actualizar, decidir y actuar

Un agente recibe **percepciones** del **entorno**, mantiene o estima un **estado**, compara alternativas según sus **objetivos** y su **medida de desempeño**, toma una **decisión** y ejecuta una **acción**. La acción cambia o consulta el entorno; la percepción siguiente cierra el ciclo.

Ser racional significa seleccionar, con la información y los recursos disponibles, la acción que se espera que favorezca la medida de desempeño. No significa ser consciente, humano, perfecto ni omnisciente. Una decisión puede ser racional y producir un mal resultado si había incertidumbre o información incompleta.

## Conceptos centrales

- **Entorno:** aquello con lo que interactúa el agente. Puede incluir el mapa y el jugador, o un repositorio, herramientas y servicios.
- **Percepción:** información recibida en un momento: visión simulada, sonidos, archivos leídos o resultados de pruebas. El historial de percepciones puede importar tanto como la última observación.
- **Estado:** representación interna de aspectos relevantes que no están presentes en la observación actual. No es una copia total del mundo, sino una abstracción para decidir.
- **Objetivo:** condición buscada, como proteger una zona o corregir una incidencia. Indica qué estados son deseables, pero puede no ordenar todas las alternativas.
- **Medida de desempeño:** criterio para valorar la conducta a lo largo del tiempo. Puede combinar éxito, tiempo, daño recibido, costo, legibilidad o seguridad. Es más precisa que una orden vaga como "ganar".
- **Decisión:** selección entre acciones disponibles según percepciones, estado, objetivos, expectativas y restricciones.
- **Acción:** operación que el agente puede realizar sobre el entorno, desde moverse hasta ejecutar una prueba. Las acciones reales dependen de interfaces y permisos.

Una descripción del entorno también considera si es total o parcialmente observable, determinista o incierto, estático o cambiante, y si participan otros agentes. Estas propiedades condicionan la técnica apropiada.

## Caso aplicado: un guardia de sigilo

Supongamos un guardia cuya función de diseño es generar tensión sin parecer injusto.

| Elemento | Diseño posible |
|---|---|
| Entorno | Habitaciones, obstáculos, luces, jugador, aliados y alarmas |
| Percepciones | Campo visual limitado, ruidos con posición aproximada y avisos de aliados |
| Estado | Última posición conocida, nivel de alerta y sector ya investigado |
| Objetivos | Vigilar, investigar indicios y capturar al jugador |
| Desempeño | Detectar intrusiones, evitar falsas alarmas y mantener una conducta legible y justa |
| Decisiones | Seguir patrulla, investigar, perseguir, pedir apoyo o volver al puesto |
| Acciones | Moverse, mirar, comunicar, activar alarma y esperar |

Si el guardia conoce siempre la posición exacta del jugador, puede maximizar capturas y a la vez empeorar la experiencia. Por eso la medida de desempeño debe reflejar la intención de diseño, no sólo la eficacia interna. Su estado de "última posición conocida" permite buscar sin otorgarle conocimiento imposible.

## Comparación con agentes basados en LLM

El marco racional sigue siendo útil, pero no debe confundirse con una tecnología concreta.

| Aspecto | Agente clásico de videojuego | Agente basado en LLM |
|---|---|---|
| Decisión | Reglas, búsqueda, planificación o funciones de utilidad diseñadas explícitamente | El LLM interpreta contexto y propone texto, planes o llamadas a herramientas; el sistema que lo rodea controla su ejecución |
| Estado | Variables estructuradas definidas por diseño | Contexto de la invocación más estado externo persistido o recuperado; el modelo aislado no conserva necesariamente memoria entre llamadas |
| Acciones | Conjunto acotado por el código del juego | Herramientas expuestas por la aplicación, también acotadas por interfaces y permisos |
| Previsibilidad | Suele ser alta con las mismas entradas | Puede variar por generación probabilística, contexto y configuración |
| Fortalezas | Latencia baja, control, depuración y conducta legible | Interpretación de lenguaje, tareas abiertas y producción flexible |
| Riesgos | Reglas incompletas, rigidez, estados o transiciones defectuosos | Salidas plausibles incorrectas, acciones mal elegidas, costo, latencia e inyección de instrucciones |

Un **LLM no es por sí solo un agente**: calcula una salida a partir de una entrada y un contexto. Se habla de agente basado en LLM cuando una aplicación lo incorpora a un ciclo con objetivo, estado o información recuperable, herramientas, resultados del entorno, límites y condición de terminación. Tampoco todo agente necesita un LLM: el guardia anterior ya puede ser un agente en el sentido clásico.

## Límites

El marco ayuda a formular el problema, pero no implementa la solución ni garantiza buenos objetivos. Una medida de desempeño incompleta puede incentivar conductas indeseadas. En sistemas complejos quizá no sea posible enumerar todos los estados o predecir consecuencias; además, personas distintas pueden discrepar sobre qué resultado es valioso. La arquitectura operativa de agentes con herramientas se profundiza en el Eje 3.

## Errores frecuentes

- **"Racional equivale a acertar siempre."** La racionalidad depende de información y recursos disponibles, no del resultado retrospectivo.
- **"Objetivo y medida de desempeño son lo mismo."** El objetivo señala una condición; la medida permite comparar trayectorias y costos.
- **"Percepción y estado son idénticos."** La percepción llega del entorno; el estado integra o conserva información útil.
- **"Si usa un LLM, ya tiene memoria y herramientas."** Esas capacidades pertenecen a la aplicación que lo integra.
- **"Un NPC racional debe ganar."** En un videojuego debe contribuir a la experiencia diseñada, incluso si eso limita su eficacia.

## Comprobación

1. ¿Por qué una decisión racional puede terminar mal?
2. ¿Qué diferencia hay entre oír un ruido y recordar dónde se oyó?
3. ¿Qué faltaría para convertir un LLM que responde texto en un agente que modifica un proyecto?
4. ¿Por qué "capturar siempre al jugador" puede ser una mala medida de desempeño?

## Actividad relacionada

Usá los siete elementos de esta lectura para ampliar uno de los casos de la [actividad inicial de clasificación](05-actividad-clasificacion.md).

## Bibliografía comentada

- Russell, S. y Norvig, P. (2021). *Artificial Intelligence: A Modern Approach* (4.ª ed.). El capítulo sobre agentes inteligentes desarrolla racionalidad, entornos y la formulación PEAS; es la referencia conceptual principal.
- Poole, D. L. y Mackworth, A. K. (2023). *Artificial Intelligence: Foundations of Computational Agents* (3.ª ed.). Los capítulos introductorios ofrecen otra formulación del agente computacional. https://artint.info/
- Wang, L. et al. (2024). "A Survey on Large Language Model Based Autonomous Agents". Ampliación sobre perfiles, memoria, planificación y acción en agentes basados en LLM. https://doi.org/10.1007/s11704-024-40231-1
- Yao, S. et al. (2023). "ReAct: Synergizing Reasoning and Acting in Language Models". Ejemplo académico de intercalar generación del modelo y acciones con observaciones del entorno; no es necesario reproducir el método en este eje. https://arxiv.org/abs/2210.03629
