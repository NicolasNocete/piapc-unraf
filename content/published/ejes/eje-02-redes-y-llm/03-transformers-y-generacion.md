---
id: eje-02-transformers-y-generacion
titulo: Transformers, atención y generación probabilística
eje: 2
orden: 3
tipo: lectura
nivel: obligatorio
audiencia: estudiante
clases: [2, 3]
modalidad: mixta
duracion_minutos: 22
resultados: [RA1]
prerrequisitos: [eje-02-tokens-embeddings-y-contexto]
evaluable: true
acceso: publico
version: 1
---

# Transformers, atención y generación probabilística

## Propósito

Al finalizar, podrás explicar a nivel introductorio cómo la atención combina información del contexto y cómo un modelo de lenguaje genera una secuencia token por token sin confundir probabilidad con verdad.

## Por qué importa

Un modelo puede producir código válido, diálogos coherentes o documentación plausible porque modela regularidades de secuencias. Comprender el mecanismo ayuda a revisar dependencias lejanas, contradicciones y decisiones que parecen intencionales pero son resultados de predicción.

## Modelo mental

Durante la inferencia de un modelo generativo:

```text
tokens previos → Transformer → puntuación para cada token posible
              → distribución de probabilidad → selección → nuevo token → repetición
```

Se denomina generación **autoregresiva** porque cada token seleccionado pasa a formar parte de la entrada para el siguiente paso. Un error temprano puede orientar todo lo que sigue.

## Conceptos centrales

### Arquitectura Transformer

El Transformer presentado por Vaswani y colaboradores reemplazó la recurrencia como mecanismo central por capas de atención y transformaciones aplicadas a posiciones. Los modelos actuales incorporan numerosas variantes; “Transformer” nombra una familia, no una implementación única.

Como el texto llega en paralelo a una capa, se agrega información de posición. Cada bloque combina, de forma simplificada:

- atención para intercambiar información entre posiciones;
- una transformación neuronal por posición;
- conexiones residuales y normalización que facilitan el entrenamiento;
- múltiples capas que refinan representaciones.

### Atención

Para cada posición se construyen vectores de consulta (*query*), clave (*key*) y valor (*value*). La consulta se compara con claves; sus puntuaciones normalizadas ponderan los valores:

```text
Atención(Q, K, V) = softmax(QKᵀ / √d) V
```

No es necesario calcularla en esta materia. La idea útil es: cada posición produce una mezcla dependiente del contexto. Varias cabezas de atención pueden capturar relaciones diferentes.

En un modelo autoregresivo se aplica una máscara causal: al predecir una posición no puede mirar tokens futuros. “Atender” no equivale a comprender como una persona, enfocar conscientemente ni justificar causalmente una salida. Además, inspeccionar pesos de atención por sí solo no ofrece una explicación completa del modelo.

### Predicción y selección

El modelo produce valores para todo el vocabulario. Una función *softmax* los convierte en una distribución. El sistema puede elegir el token de mayor probabilidad o muestrear entre candidatos. Luego repite el cálculo con la secuencia extendida hasta una condición de parada o un límite.

La probabilidad es condicional a los parámetros y al contexto:

```text
P(token siguiente | tokens anteriores, parámetros)
```

No es una probabilidad de que la afirmación sea verdadera. Los datos pueden favorecer continuaciones frecuentes, desactualizadas o estereotipadas.

## Caso aplicado

Se pide completar una función que descuenta salud. Tras leer nombre, tipos, comentarios y código vecino, el modelo asigna alta probabilidad a patrones habituales. Puede generar una guarda contra valores negativos porque aparece en ejemplos similares, pero no sabe si el diseño permite daño, curación o invulnerabilidad.

Experimento: entrega el mismo encabezado con tres contextos: sin reglas; con “la salud nunca baja de cero”; y con una prueba que espera salud negativa para representar deuda. Registra cómo cambia la continuación. La arquitectura integra señales contextuales, pero no resuelve por sí sola cuál especificación es válida.

## Límites

La atención tiene capacidad finita y costo computacional. Relaciones muy largas, múltiples instrucciones y texto irrelevante pueden degradar el resultado. La generación local token por token no asegura coherencia global, cumplimiento de requisitos ni ejecución correcta. Una explicación verbal fluida puede ser posterior e incompatible con el código producido.

## Errores frecuentes

- **“El modelo busca una respuesta almacenada y la copia.”** Calcula continuaciones; puede también reproducir fragmentos aprendidos.
- **“El token más probable es el verdadero.”** Probabilidad lingüística no es veracidad.
- **“Atención significa conciencia.”** Es una operación numérica entre representaciones.
- **“Generar token por token impide planificar.”** Puede representar patrones de planificación, pero no garantiza un plan correcto.
- **“Todos los LLM usan exactamente el Transformer de 2017.”** Existen variantes de arquitectura, datos y entrenamiento.

## Comprobación

1. ¿Por qué se llama autoregresiva a la generación?
2. ¿Qué función cumple la máscara causal?
3. ¿Por qué una continuación probable puede introducir una API inexistente?

<details>
<summary>Ver orientación</summary>

1. Cada token generado condiciona la predicción siguiente.
2. Impide usar posiciones futuras durante la predicción.
3. El modelo favorece patrones plausibles según datos y contexto, no consulta necesariamente la API real.

</details>

## Actividad relacionada

[Errores conceptuales y decisiones](06-errores-conceptuales.md), casos 4 y 5.

## Bibliografía comentada

- Vaswani, A. et al. (2017). “Attention Is All You Need”. Secciones 1 a 3 y figura 1: fuente primaria para arquitectura y atención; las derivaciones y resultados experimentales quedan como ampliación. https://arxiv.org/abs/1706.03762
- Goodfellow, I., Bengio, Y. y Courville, A. (2016). *Deep Learning*. Capítulo 6: ampliar redes profundas y transformaciones; es anterior al Transformer. https://www.deeplearningbook.org/
