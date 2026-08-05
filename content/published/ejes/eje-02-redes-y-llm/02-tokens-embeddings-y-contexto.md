---
id: eje-02-tokens-embeddings-y-contexto
titulo: Unidades de procesamiento (tokens) y representaciones vectoriales (embeddings)
eje: 2
orden: 2
tipo: lectura
nivel: obligatorio
audiencia: estudiante
clases: [2, 3]
modalidad: mixta
duracion_minutos: 20
resultados: [RA1]
prerrequisitos: [eje-02-redes-entrenamiento-e-inferencia]
evaluable: true
acceso: publico
version: 1
---

# Unidades de procesamiento (tokens) y representaciones vectoriales (embeddings)

## Propósito

Al finalizar, podrás describir cómo el texto se convierte en unidades de procesamiento (*tokens*) y representaciones vectoriales (*embeddings*), interpretar con cautela una medida de similitud y explicar por qué recuperar un fragmento relacionado no demuestra que sea correcto.

## Por qué importa

Los límites y costos de un modelo se expresan en unidades de procesamiento, no en páginas. Las representaciones vectoriales permiten buscar líneas de diálogo, incidencias o documentación por semejanza, pero una búsqueda convincente puede traer material incorrecto para la versión actual del juego.

## Modelo mental

```text
texto → tokenizador → identificadores → embeddings → representaciones procesadas
```

El tokenizador aplica un vocabulario y reglas definidos para ese modelo. Cada identificador selecciona inicialmente un vector aprendido. El modelo transforma luego esos vectores considerando posición y contexto.

## Conceptos centrales

### Tokenización

Un token puede ser una palabra, parte de una palabra, puntuación, espacio o fragmento de código. No existe una división universal: dos modelos pueden tokenizar `PlayerHealth`, `jugador_2` o un emoji de maneras diferentes. Por eso:

- caracteres, palabras y tokens no son equivalentes;
- idiomas, nombres poco frecuentes y código pueden consumir cantidades distintas;
- estimar por palabras sirve como aproximación, no como garantía;
- cambiar el tokenizador cambia los identificadores que recibe la red.

El modelo genera tokens que después se decodifican como texto. Un corte puede ocurrir a mitad de una estructura lógica aunque no se vea como “media palabra”.

### Representaciones vectoriales

Una representación vectorial (*embedding*) es una lista de números aprendida. Elementos que aparecieron en contextos relacionados pueden quedar próximos según alguna medida. Las coordenadas individuales no suelen corresponder a conceptos legibles como “diversión” o “dificultad”.

Para comparar vectores se usa a menudo la similitud coseno:

```text
similitud(a, b) = (a · b) / (||a|| ||b||)
```

Intuitivamente compara orientación más que magnitud. Un valor mayor indica cercanía bajo ese modelo y esa medida, no igualdad de significado ni verdad.

### Representaciones vectoriales de unidades y documentos

En el interior del modelo, cada token inicia con un embedding y adquiere una representación contextual. En un buscador semántico, otro modelo puede convertir una consulta y cada fragmento documental en un vector. Son usos relacionados, pero no debe suponerse que emplean el mismo modelo ni el mismo espacio vectorial.

Una recuperación típica sigue este flujo:

```text
consulta → embedding → vecinos cercanos → fragmentos → contexto del modelo
```

La longitud y separación de fragmentos, metadatos, versión del documento y cantidad recuperada afectan el resultado. La similitud es sólo una señal de selección.

## Caso aplicado

Un equipo indexa fichas de misiones. La consulta “el guardia no abre la puerta tras conseguir la llave” recupera:

1. una incidencia cerrada de una versión anterior;
2. la especificación vigente de la misión;
3. una conversación que menciona una puerta decorativa.

Los tres textos son cercanos por vocabulario. Antes de darlos al modelo, el sistema filtra por versión, tipo de activo e idioma. La persona conserva los identificadores de origen para verificar la respuesta. El embedding mejora el hallazgo; los metadatos y la revisión sostienen la validez.

### Experimento breve sin modelo pago

Escribe cinco descripciones de objetos: dos armas, dos consumibles y una llave. Pide a tres personas que ordenen qué pares son “más similares”, primero por función y luego por apariencia. Compara los órdenes. La actividad muestra que “similitud” depende del criterio, aun antes de elegir un modelo matemático.

## Límites

Los embeddings pueden reflejar asociaciones sesgadas de sus datos. También pierden detalles cuando comprimen textos largos en un único vector. Una distancia no explica la causa de la cercanía y los valores no son comparables automáticamente entre modelos. Para coincidencias exactas, versiones o identificadores, filtros y búsqueda léxica pueden ser superiores.

## Errores frecuentes

- **“Un token es una palabra.”** Puede ser una parte, signo o espacio.
- **“El embedding contiene el significado verdadero.”** Es una representación aprendida para ciertos objetivos.
- **“Cercano significa relevante y correcto.”** Puede ser temáticamente próximo pero obsoleto o contradictorio.
- **“RAG entrena al modelo.”** Recupera fragmentos para la inferencia actual.
- **“Más contexto siempre ayuda.”** Fragmentos irrelevantes compiten por atención y espacio.

## Comprobación

1. ¿Por qué no se puede prometer un número de tokens contando palabras?
2. ¿Qué afirma y qué no afirma una similitud coseno alta?
3. ¿Qué filtro usarías al buscar documentación de varias versiones del juego?

<details>
<summary>Ver orientación</summary>

1. Cada tokenizador divide el texto según su vocabulario y sus reglas.
2. Afirma cercanía vectorial bajo una representación; no garantiza identidad, pertinencia ni verdad.
3. Como mínimo, versión y tipo de documento, además de conservar la fuente.

</details>

## Actividad relacionada

[Laboratorio: caja de cristal](05-laboratorio-caja-de-cristal.md), estación de tokenización y recuperación.

## Bibliografía comentada

- Goodfellow, I., Bengio, Y. y Courville, A. (2016). *Deep Learning*. Capítulos 5 y 12: consultar para representación distribuida y fundamentos; no se exige desarrollo matemático. https://www.deeplearningbook.org/
- Russell, S. y Norvig, P. (2021). *Artificial Intelligence: A Modern Approach* (4.ª ed.). Secciones de procesamiento del lenguaje: ampliar la relación entre representación, aprendizaje y tareas lingüísticas.
