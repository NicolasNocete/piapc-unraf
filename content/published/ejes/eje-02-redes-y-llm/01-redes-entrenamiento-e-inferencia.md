---
id: eje-02-redes-entrenamiento-e-inferencia
titulo: Redes neuronales, entrenamiento e inferencia
eje: 2
orden: 1
tipo: lectura
nivel: obligatorio
audiencia: estudiante
clases: [2, 3]
modalidad: mixta
duracion_minutos: 18
resultados: [RA1]
prerrequisitos: [eje-01-que-es-ia]
evaluable: true
acceso: publico
version: 1
---

# Redes neuronales, entrenamiento e inferencia

## Propósito

Al finalizar, podrás explicar cómo aprende una red, distinguir entrenamiento, ajuste fino, adaptación e inferencia, y reconocer qué alternativas cambian parámetros y cuáles sólo cambian la información disponible.

## Por qué importa

En un videojuego, una predicción puede clasificar una animación, proponer diálogo o puntuar una acción. Saber de dónde surge permite decidir si hacen falta nuevos datos, otra configuración o controles del juego, en vez de llamar “entrenamiento” a cualquier mejora.

## Modelo mental

Una neurona artificial recibe números, multiplica cada entrada por un peso, suma un sesgo y aplica una función de activación. Una red conecta muchas de estas unidades en capas:

```text
entradas → sumas ponderadas y activaciones → representaciones intermedias → salida
```

Los pesos y sesgos son **parámetros**. Aprender consiste en ajustarlos para reducir un error medido sobre ejemplos; no consiste en guardar literalmente cada ejemplo.

## Conceptos centrales

### Red como función parametrizada

Una red neuronal (*neural network*) puede representarse así:

```text
salida = f(entrada; parámetros)
```

La entrada contiene datos numéricos. La función `f` describe una arquitectura compuesta por capas. Los parámetros son valores internos que determinan cómo se transforma la entrada.

Por ejemplo, una red podría recibir distancia al jugador, salud y munición, y producir puntuaciones:

```text
atacar: 0,68
cubrirse: 0,25
retirarse: 0,07
```

Una capa agrupa muchas unidades. Para esta materia alcanza con conservar que las capas transforman representaciones y que los parámetros condicionan esas transformaciones. “Neuronal” describe una inspiración histórica y matemática limitada: no prueba que la red piense como un cerebro.

### Piezas que no deben confundirse

- **Datos:** ejemplos utilizados para desarrollar o evaluar el modelo.
- **Arquitectura:** organización de capas y conexiones.
- **Parámetros:** valores ajustados dentro de la arquitectura.
- **Pérdida (*loss*):** medida del desacuerdo entre una predicción y el objetivo de entrenamiento.
- **Hiperparámetros:** decisiones externas sobre el proceso, como configuración y duración del entrenamiento.

Una pérdida baja sólo indica buen ajuste respecto del criterio y los datos elegidos. No demuestra seguridad ni utilidad universal.

### Entrenamiento

El entrenamiento (*training*) sigue conceptualmente este ciclo:

```text
ejemplos → predicciones → pérdida → ajuste de parámetros → repetición
```

Las decisiones sobre datos, objetivo y evaluación son tan importantes como la arquitectura. En términos conceptuales, la retropropagación atribuye parte del error a los parámetros y un optimizador los desplaza para reducirlo. Datos incompletos o sesgados pueden generar fallos sistemáticos. Separar datos de entrenamiento y evaluación ayuda a detectar si la red sólo se ajustó a los ejemplos conocidos.

El ajuste fino (*fine-tuning*) continúa el entrenamiento de un modelo existente para adaptarlo a nuevos datos u objetivos. En ambos casos se modifican parámetros.

### Formas de adaptación

- **Preentrenamiento:** aprende patrones generales a gran escala desde una inicialización o una etapa previa; habitualmente optimiza una parte amplia de los parámetros entrenables, pero no exige modificar todos los componentes.
- **Ajuste fino:** parte de un modelo preentrenado y modifica todos o algunos parámetros con datos u objetivos más específicos.
- **Adaptación eficiente en parámetros:** entrena una fracción pequeña o módulos añadidos, como adaptadores; sigue siendo entrenamiento.
- **Aprendizaje en contexto:** ejemplos incluidos en la entrada condicionan la respuesta sin modificar parámetros.
- **Generación aumentada por recuperación (RAG):** un sistema busca documentos y los agrega al contexto; actualiza la evidencia disponible, no los parámetros.
- **Instrucciones y herramientas:** cambian la tarea o las acciones posibles, pero no entrenan el modelo.

Elegir depende del problema. Para consultar reglas de diseño que cambian cada semana suele convenir recuperación; para modificar de forma estable un formato o estilo puede evaluarse ajuste fino. Ninguna opción garantiza exactitud.

### Inferencia

La inferencia (*inference*) utiliza parámetros ya entrenados para calcular una salida:

```text
entrada actual + parámetros existentes → salida
```

Durante una conversación ordinaria:

- el mensaje no reentrena inmediatamente la red;
- una corrección no modifica por sí sola los parámetros;
- adjuntar un archivo no lo incorpora permanentemente;
- el historial no constituye memoria ilimitada;
- generar código no significa que compile o haya sido integrado.

Cambiar una instrucción o agregar contexto puede cambiar la respuesta sin cambiar el modelo.

## Caso aplicado

Un estudio registra distancia, alerta, salud, aliados y acción observada para entrenar un clasificador. Durante una partida, el juego obtiene el estado y ejecuta inferencia. La lógica externa decide cómo utilizar la puntuación:

```text
estado → modelo → puntuaciones → reglas del juego → acción
```

Si el modelo recomienda atacar sin munición, la integración debe rechazar la acción. Un resultado del modelo no reemplaza invariantes ni reglas de diseño.

Otro estudio quiere que un modelo ayude con diálogos. Adjuntar la biblia narrativa en cada sesión es contexto; recuperarla desde una base documental es RAG; entrenar adaptadores con ejemplos aprobados cambia parámetros. Las tres intervenciones pueden producir respuestas parecidas, pero difieren en costo, actualización, privacidad y posibilidad de retirar información.

## Límites

Esta explicación omite el cálculo matricial, la derivación de gradientes y muchas arquitecturas. Además, reducir la pérdida promedio no garantiza buen comportamiento en casos raros, datos nuevos o grupos poco representados. Un modelo grande puede memorizar fragmentos, generalizar patrones o hacer ambas cosas; observar una salida no permite determinar por sí solo cuál ocurrió.

## Puente hacia agentes

Un modelo puede proponer una acción, pero no modifica por sí solo un repositorio o un motor. Para actuar necesita componentes externos: herramientas, permisos, estado, resultados observables y condiciones de terminación.

```text
modelo durante inferencia ≠ agente completo
```

## Errores frecuentes

- **“Arquitectura y parámetros son lo mismo.”** La arquitectura define estructura; los parámetros son valores ajustados.
- **“Agregar un documento enseña permanentemente al modelo.”** Normalmente sólo cambia el contexto actual.
- **“Inferencia garantiza una deducción correcta.”** Aquí significa ejecutar el modelo, no demostrar verdad.
- **“Toda mejora es ajuste fino.”** Instrucciones y contexto pueden mejorar una salida sin modificar parámetros.
- **“RAG y ajuste fino son memorias equivalentes.”** RAG recupera información externa; el ajuste fino cambia parámetros.
- **“Una neurona artificial reproduce una neurona biológica.”** Es una abstracción matemática mucho más simple.
- **“El modelo dijo que actuó.”** Describir una acción no la ejecuta.

## Comprobación

1. ¿Qué modifica el entrenamiento?
2. ¿Qué diferencia arquitectura de parámetros?
3. ¿Adjuntar documentación cambia normalmente los parámetros?
4. ¿Qué componente transforma una puntuación en una acción del juego?
5. ¿Qué usarías para incorporar reglas que cambian a diario y por qué?

<details>
<summary>Ver orientación</summary>

1. Ajusta parámetros usando datos y una medida de pérdida.
2. La arquitectura es la estructura; los parámetros son valores internos aprendidos.
3. No: se incorpora al contexto de la invocación.
4. La lógica externa del juego.
5. Normalmente recuperación y contexto, porque permiten actualizar y citar reglas sin reentrenar.

</details>

## Actividad relacionada

[Laboratorio: caja de cristal](05-laboratorio-caja-de-cristal.md), especialmente el contraste entre contexto e inferencia.

## Bibliografía comentada

- Goodfellow, I., Bengio, Y. y Courville, A. (2016). *Deep Learning*. Capítulos introductorios. https://www.deeplearningbook.org/
- Nielsen, M. (2015). *Neural Networks and Deep Learning*. Introducción visual. http://neuralnetworksanddeeplearning.com/
- Russell, S. y Norvig, P. (2021). *Artificial Intelligence: A Modern Approach* (4.ª ed.). Consultar las secciones introductorias de aprendizaje automático para situar datos, objetivos y generalización.
