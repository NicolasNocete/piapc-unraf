---
id: glosario-general
titulo: Glosario general
tipo: referencia
audiencia: estudiante
acceso: publico
version: 2
---

# Glosario general

Las definiciones son operativas y se utilizarán de forma consistente en todos los ejes.

## Agente

Sistema que persigue un objetivo mediante un ciclo en el que observa información del entorno, selecciona acciones, utiliza herramientas, recibe resultados y decide si debe continuar, ajustar, detenerse o solicitar intervención humana.

## Agente racional

Marco de la inteligencia artificial clásica para analizar una entidad que selecciona acciones según la información disponible, sus objetivos, restricciones y una medida de desempeño. No implica conciencia, perfección ni comportamiento humano.

## Algoritmo A*

Algoritmo de búsqueda informada que prioriza estados mediante `f(n) = g(n) + h(n)`, donde `g(n)` es el costo acumulado conocido y `h(n)` estima el costo restante. Con costos positivos, una heurística adecuada y un manejo correcto de la frontera, puede encontrar una solución de costo mínimo.

## Árbol de comportamiento (behavior tree, BT)

Arquitectura que organiza decisiones como una jerarquía de nodos evaluada desde una raíz. Sus nodos suelen devolver éxito, fallo o en curso, y se componen mediante secuencias, selectores, condiciones, acciones y decoradores con contratos explícitos.

## Asistente

Sistema que ayuda a una persona a realizar una tarea, pero conserva a la persona como responsable directa de aplicar las acciones principales.

## Automatización

Ejecución de una secuencia predefinida de operaciones. Puede utilizar o no modelos de inteligencia artificial.

## Banco de pruebas (benchmark)

Conjunto estandarizado de tareas, datos, protocolo y métricas utilizado para comparar sistemas o configuraciones bajo condiciones declaradas. Un buen resultado en un banco de pruebas no garantiza adecuación a las tareas, costos, riesgos o restricciones de un proyecto concreto.

## Comportamiento de movimiento (steering)

Regla que calcula una velocidad o aceleración deseada para alcanzar un objetivo local, llegar, huir, separarse o evitar obstáculos. Expresa una solicitud de movimiento; la locomoción determina cómo se aplica según las restricciones físicas del personaje y del mundo.

## Conjunto de tareas

Colección versionada de problemas representativos utilizada para evaluar un sistema. Incluye condiciones de ejecución, criterios observables, variaciones, casos límite, entradas adversariales y regresiones conocidas, en lugar de limitarse a ejemplos exitosos.

## Contexto

Información disponible para una invocación concreta del modelo: instrucciones, archivos, documentación, resultados de herramientas, historial relevante y datos de la tarea.

## Criterio de aceptación

Condición observable que debe cumplirse para considerar aceptado un requisito, cambio o producto. Debe indicar qué se espera sin imponer innecesariamente la implementación y vincularse con una prueba, ejecución, inspección u otra evidencia verificable.

## Desarrollo agéntico

Forma de trabajo en la que personas y agentes colaboran sobre artefactos reales mediante especificaciones, herramientas, validaciones, permisos y evidencia observable.

## Evidencia

Información observable que permite comprobar una afirmación: resultado de pruebas, ejecución reproducible, diferencias de código, registros, métricas o inspección de artefactos.

## Flujo de trabajo (workflow)

Proceso cuya secuencia principal está predeterminada. Puede incluir modelos y herramientas, pero el sistema no decide libremente la estructura completa de ejecución.

## Generación aumentada por recuperación (RAG)

Técnica en la que un sistema busca información externa relevante y la incorpora al contexto utilizado durante la inferencia. Actualiza la evidencia disponible para esa invocación, pero no modifica por sí misma los parámetros ni garantiza que la respuesta sea correcta.

## Herramienta

Operación externa que permite consultar o modificar un entorno. Debe declarar entradas, resultados, errores, permisos y efectos laterales.

## Heurística admisible

Estimación que nunca supera el costo óptimo restante desde un estado hasta un objetivo. En A*, esta propiedad permite conservar la optimalidad cuando también se cumplen las demás condiciones del algoritmo.

## Heurística consistente

Heurística que para cada transición cumple `h(n) <= costo(n, n') + h(n')`. Esta relación hace que la estimación sea compatible con los costos del grafo y permite cerrar estados sin reabrirlos bajo la implementación y las condiciones correspondientes.

## Habilidad reutilizable (skill)

Conjunto de instrucciones y procedimientos que un agente puede cargar para realizar una clase de tareas de manera consistente. No modifica los parámetros del modelo.

## Inferencia

Uso de un modelo ya entrenado para calcular una salida a partir de una entrada y un contexto. Una interacción ordinaria no vuelve a entrenar el modelo.

## Instrucción

Indicación que condiciona el comportamiento esperado del modelo o agente durante una tarea. Puede ser puntual o persistente.

## Instrucción de entrada (prompt)

Entrada proporcionada a un modelo. Puede incluir objetivo, contexto, restricciones, ejemplos, formato y criterios de aceptación.

## Inyección de instrucciones (prompt injection)

Intento de alterar el comportamiento esperado de un sistema mediante contenido procesado por el modelo, ya sea en la entrada directa o en fuentes externas recuperadas. El contenido no adquiere autoridad por formularse como instrucción; la mitigación requiere separar datos de órdenes, limitar permisos y validar efectos.

## Locomoción

Capa que aplica al personaje las solicitudes de movimiento respetando velocidad, aceleración, colisiones, gravedad, rotación y otras restricciones físicas, además de coordinar su representación cuando corresponde. Puede aplicar sólo una parte de la solicitud o rechazarla, por lo que su resultado debe observarse.

## Máquina de estados finitos (FSM)

Arquitectura de comportamiento que mantiene un estado vigente y define cambios explícitos mediante eventos, guardas, transiciones y acciones. Favorece conductas previsibles y trazables cuando el número de estados y relaciones permanece manejable.

## Máquina de estados finitos jerárquica (HFSM)

Extensión de una FSM que agrupa estados en niveles de jerarquía para compartir comportamiento o transiciones. Reduce repetición, pero necesita reglas explícitas sobre cómo se propagan y priorizan los eventos entre subestados y estados superiores.

## Memoria

Información conservada más allá de una observación inmediata para influir en decisiones posteriores. Debe declarar origen, vigencia, actualización y, cuando corresponda, marca temporal o confianza; no equivale a la verdad actual del mundo.

## Modelo de lenguaje de gran tamaño (LLM)

Modelo entrenado para procesar y generar secuencias de tokens. Sus respuestas se calculan a partir de parámetros y contexto, y pueden ser plausibles sin ser correctas.

## Observabilidad

Disponibilidad de señales y registros suficientes para inspeccionar el estado y comportamiento de un sistema o reconstruir un proceso. Puede incluir acciones, resultados, tiempos, iteraciones, métricas, errores y decisiones, sin requerir razonamientos internos privados del modelo.

## Parámetro

Valor interno ajustado durante el entrenamiento de un modelo. Un prompt, una habilidad reutilizable (*skill*) o un documento agregado al contexto no modifica normalmente estos parámetros.

## Percepción

Proceso que transforma sensores, eventos o datos del mundo en observaciones limitadas disponibles para un agente. Una observación puede depender de alcance, oclusión, frecuencia y latencia; no percibir algo no demuestra que no exista.

## Planificación orientada a objetivos (Goal-Oriented Action Planning, GOAP)

Técnica que representa un estado del mundo, objetivos y acciones con precondiciones, efectos y costos, y busca una secuencia de acciones que satisfaga un objetivo. El plan simbólico debe validarse durante la ejecución y puede requerir replanificación cuando cambia el mundo.

## Principio de menor privilegio

Regla de seguridad que concede únicamente las capacidades necesarias, sobre el alcance necesario y durante el tiempo necesario. Lectura, escritura, ejecución, red, acceso a credenciales y publicación se consideran permisos diferentes.

## Protocolo de Contexto de Modelo (Model Context Protocol, MCP)

Protocolo para conectar aplicaciones de inteligencia artificial con herramientas y fuentes de contexto. No convierte por sí mismo una aplicación en agente ni garantiza seguridad o calidad.

## Regresión

Deterioro de una capacidad o comportamiento que antes cumplía su criterio. Se detecta repitiendo casos de referencia después de un cambio y no queda descartada sólo porque la funcionalidad nueva opere correctamente.

## Representación vectorial (embedding)

Representación vectorial aprendida de un elemento. Puede utilizarse para aproximar relaciones y recuperar información, pero no constituye una definición exacta de significado.

## Reversibilidad

Capacidad de restaurar un estado anterior conocido y verificar que la recuperación fue efectiva. Requiere línea de base, mecanismo de restauración y prueba posterior; algunos efectos externos, como una filtración o publicación, no pueden revertirse por completo.

## Sistema agéntico

Categoría amplia que comprende agentes y flujos de trabajo que combinan modelos, herramientas y mecanismos de control.

## Sistema de utilidad (Utility AI)

Arquitectura que puntúa alternativas a partir de consideraciones observables, transformaciones y reglas de combinación, y selecciona una opción mediante una política explícita. La puntuación expresa una preferencia diseñada: no es una probabilidad ni una medida universal de corrección.

## Trazabilidad

Capacidad de reconstruir qué objetivo se definió, qué acciones se realizaron, qué resultados se obtuvieron y qué decisiones humanas determinaron la integración final.

## Unidad de procesamiento (token)

Unidad procesada por un modelo de lenguaje. Puede representar una palabra, parte de una palabra, un signo, un espacio o un fragmento de código.
