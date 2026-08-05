---
id: eje-01-bienvenida
titulo: IA, asistentes y agentes en videojuegos
eje: 1
orden: 1
tipo: lectura
nivel: obligatorio
audiencia: estudiante
clases: [1]
modalidad: virtual-asincronica
duracion_minutos: 10
resultados: [RA1, RA2]
prerrequisitos: []
evaluable: false
acceso: publico
version: 1
---

# IA, asistentes y agentes en videojuegos

## Propósito

Esta primera lectura presenta el problema central de la materia: **cómo reconocer qué clase de sistema estamos utilizando y cuánto control conviene delegarle**.

No necesitás instalar herramientas, escribir código ni utilizar un modelo de inteligencia artificial. Al terminar deberías poder distinguir inicialmente entre automatización, asistencia y agencia.

## Por qué importa

En videojuegos, llamar "IA" por igual a una ruta calculada, un generador de diálogos y una herramienta que modifica código oculta diferencias de control, costo y riesgo. Distinguirlas permite elegir una técnica por lo que el problema necesita y no por su novedad.

## Modelo mental: control, resultado y entorno

Para una primera clasificación hacé tres preguntas: **quién decide los pasos**, **qué resultado produce** y **si puede actuar sobre un entorno**. Estas preguntas no resuelven todos los casos, pero evitan confundir una respuesta generada con una acción efectivamente ejecutada.

## Conceptos centrales

### La misma etiqueta para cosas diferentes

La expresión “inteligencia artificial” se utiliza para describir sistemas muy distintos:

- un enemigo que busca una ruta;
- una herramienta que clasifica comentarios de jugadores;
- un modelo que propone diálogos;
- un personaje que conversa con el jugador;
- un asistente que completa código;
- un agente que lee un repositorio, modifica archivos y ejecuta pruebas.

Todos pueden relacionarse con la IA, pero **no funcionan de la misma manera, no tienen la misma autonomía y no presentan los mismos riesgos**.

La primera habilidad profesional consiste en no tratarlos como equivalentes.

## Una definición de trabajo

En esta materia utilizaremos una definición amplia:

> La inteligencia artificial estudia y construye sistemas capaces de percibir información, representar situaciones, seleccionar acciones, reconocer patrones, aprender o producir resultados para alcanzar objetivos.

Esta definición incluye técnicas basadas en reglas, búsqueda, aprendizaje automático y modelos generativos. Por eso, IA no es sinónimo de ChatGPT, modelo de lenguaje ni robot.

### Automatización, asistente y agente

Estas categorías ayudan a describir dónde reside el control del proceso.

| Sistema | Quién define los pasos | Qué produce | Ejemplo |
|---|---|---|---|
| Automatización | El programa sigue una secuencia previamente definida | Un resultado o efecto esperado | Programa automatizado (*script*) que comprime recursos (*assets*) y crea un paquete |
| Asistente | La persona conserva el control y aplica las sugerencias | Una recomendación o propuesta | Autocompletado de una función |
| Agente | El sistema puede seleccionar acciones y herramientas dentro de límites | Acciones y resultados sobre un entorno | Agente que investiga un error, modifica código y ejecuta pruebas |

La autonomía no es absoluta. Un agente puede tener permiso para leer archivos, pero necesitar autorización para modificarlos. También puede detenerse al alcanzar un límite de tiempo, pasos o costo.

### Un chat no es automáticamente un agente

Una interfaz conversacional (*chat*) recibe una entrada y produce una respuesta. Puede explicar, resumir o generar código, pero eso no significa que pueda actuar sobre un proyecto.

Para que un sistema opere como agente necesita, como mínimo:

- un objetivo;
- información sobre la tarea;
- acciones o herramientas disponibles;
- resultados observables del entorno;
- límites y permisos;
- una condición para terminar o pedir ayuda.

El modelo propone una acción. El entorno decide si puede ejecutarse y devuelve un resultado. Esa separación será central durante toda la materia.

## Caso aplicado: IA dentro del juego e IA para producir el juego

### Durante la ejecución

La IA puede controlar entidades o adaptar sistemas mientras una persona juega:

- navegación de enemigos;
- selección de comportamientos;
- coordinación de grupos;
- ajuste de dificultad;
- conversación con personajes.

En este contexto importan especialmente la latencia, el rendimiento, la previsibilidad y la experiencia del jugador.

### Durante la producción

La IA puede asistir al equipo que desarrolla el producto:

- explorar un repositorio;
- implementar una mecánica;
- generar pruebas;
- revisar cambios;
- analizar registros;
- contrastar documentación y producto ejecutable.

En este contexto importan la trazabilidad, la seguridad, la calidad del código y la capacidad humana para validar lo producido.

## Límites y criterios iniciales

Las categorías anteriores describen el control predominante, no cajas rígidas. Un sistema puede combinar un flujo predefinido con una decisión de modelo y una aprobación humana. Para clasificarlo hay que observar su operación real, sus permisos y quién aplica cada cambio; la interfaz o el nombre comercial no bastan.

### Más autonomía no significa mejor solución

Una puerta que se abre cuando el jugador posee una llave no necesita un modelo generativo. Una secuencia de exportación de recursos puede resolverse con un programa automatizado reproducible. Un enemigo competitivo puede requerir reglas claras para que su conducta resulte justa y comprensible.

Antes de utilizar IA conviene preguntar:

1. ¿El problema requiere interpretar información ambigua?
2. ¿Los pasos pueden definirse de antemano?
3. ¿Existe una forma clara de verificar el resultado?
4. ¿Qué ocurre si el sistema se equivoca?
5. ¿Cuánto cuestan la latencia y la variabilidad?
6. ¿Qué datos y permisos necesita?

La solución más sofisticada no es necesariamente la más adecuada.

## Errores frecuentes

- **"Si conversa, es un agente."** Puede ser sólo un modelo que devuelve texto.
- **"Si no aprende, no es IA."** Reglas, búsqueda y planificación también forman parte del campo.
- **"Automatizar equivale a usar IA."** Una secuencia fija puede no incluir ninguna técnica de IA.
- **"Autónomo significa sin límites."** La autonomía siempre depende de acciones, permisos y condiciones de detención disponibles.

## Tres ideas para conservar

1. **IA es un campo amplio.** Incluye más que modelos generativos.
2. **Un agente actúa sobre un entorno.** No se limita a producir una respuesta.
3. **La autonomía debe justificarse.** Si una solución simple es suficiente, suele ser preferible.

## Comprobación rápida

Indicá si cada afirmación es verdadera o falsa antes de desplegar la respuesta.

1. Toda aplicación que utiliza un modelo de lenguaje es un agente.
2. Un agente puede existir sin utilizar un modelo de lenguaje.
3. Una solución con mayor autonomía siempre produce una mejor experiencia.

<details>
<summary>Ver orientación</summary>

1. **Falsa.** Una aplicación puede usar un modelo para clasificar o responder sin seleccionar acciones sobre un entorno.
2. **Verdadera.** Un personaje controlado mediante percepción, estado, objetivos y acciones puede analizarse como agente sin usar un modelo de lenguaje.
3. **Falsa.** La autonomía agrega variabilidad, costo y riesgo; debe justificarse por el problema.

</details>

## Actividad relacionada

Realizá la [actividad de clasificación inicial](05-actividad-clasificacion.md). Es diagnóstica y no tiene calificación.

No busques una etiqueta perfecta para cada caso. Lo importante es identificar el mecanismo, el grado de autonomía y la evidencia utilizada para justificar tu decisión.

## Para seguir pensando

- ¿Puede un sistema ser un agente sin utilizar un modelo de lenguaje?
- ¿Puede una aplicación utilizar un modelo de lenguaje sin ser un agente?
- ¿Qué acciones nunca delegarías sin confirmación humana?

## Bibliografía comentada

- Russell, S. y Norvig, P. (2021). *Artificial Intelligence: A Modern Approach* (4.ª ed.). La introducción permite ubicar las distintas maneras de definir IA; alcanza una lectura panorámica.
- Poole, D. L. y Mackworth, A. K. (2023). *Artificial Intelligence: Foundations of Computational Agents* (3.ª ed.). La introducción presenta los agentes como marco unificador y puede consultarse en línea en https://artint.info/.
- Wang, L. et al. (2024). "A Survey on Large Language Model Based Autonomous Agents". Útil como ampliación para reconocer que un agente basado en LLM integra más componentes que el modelo aislado. https://doi.org/10.1007/s11704-024-40231-1
