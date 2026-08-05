---
id: eje-02
titulo: Fundamentos de redes neuronales y modelos de lenguaje
eje: 2
orden: 2
tipo: indice
nivel: obligatorio
audiencia: estudiante
clases: [2, 3]
modalidad: mixta
resultados: [RA1]
acceso: publico
version: 2
---

# Eje 2. Redes neuronales y modelos de lenguaje

## Propósito

Proporcionar un modelo mental suficiente para comprender qué recibe un modelo de lenguaje, cómo produce una salida y por qué necesita controles externos cuando forma parte de un agente.

El eje no enseña a entrenar redes. Se concentra en el recorrido aproximado:

```text
texto → unidades de procesamiento (tokens) → vectores → arquitectura Transformer → puntuaciones → selección → texto
```

## Resultados del eje

- Diferenciar entrenamiento, ajuste fino, adaptación eficiente, aprendizaje en contexto, recuperación e inferencia.
- Explicar qué son parámetros, unidades de procesamiento (*tokens*), representaciones vectoriales (*embeddings*) y contexto.
- Describir conceptualmente atención y generación autoregresiva.
- Predecir efectos de variabilidad, truncamiento y contexto contradictorio.
- Explicar por qué instrucciones de entrada (*prompts*) y contexto adicional no reentrenan el modelo.
- Reconocer que actuar sobre un entorno requiere componentes externos al modelo, como puente hacia el Eje 3.
- Comparar modelos propietarios, código abierto, pesos abiertos y ejecución local con criterios verificables.

## Materiales

| Orden | Archivo | Función |
|---:|---|---|
| 1 | [01-redes-entrenamiento-e-inferencia.md](01-redes-entrenamiento-e-inferencia.md) | Red como función parametrizada y distinción fundamental |
| 2 | [Unidades de procesamiento (tokens) y representaciones vectoriales (embeddings)](02-tokens-embeddings-y-contexto.md) | Tokenización, representación, similitud y recuperación |
| 3 | [03-transformers-y-generacion.md](03-transformers-y-generacion.md) | Atención y predicción probabilística del siguiente token |
| 4 | [04-limites-y-puente-a-agentes.md](04-limites-y-puente-a-agentes.md) | Contexto, configuración, cómputo, límites y selección de modelos |
| 5 | [05-laboratorio-caja-de-cristal.md](05-laboratorio-caja-de-cristal.md) | Experimentos controlados de tokenización, variabilidad, contexto y recuperación |
| 6 | [06-errores-conceptuales.md](06-errores-conceptuales.md) | Diagnóstico conceptual y matriz de decisión aplicada |
| 7 | [07-referencias-del-eje.md](07-referencias-del-eje.md) | Bibliografía comentada y criterios para consultar fichas vigentes |

**Estado:** eje completo. Cuatro lecturas conceptuales, dos prácticas y una guía de referencias disponibles.

## Profundidad

### Obligatorio

- Red neuronal como transformación parametrizada.
- Entrenamiento frente a inferencia.
- Unidades de procesamiento (*tokens*), representaciones vectoriales (*embeddings*), contexto y generación.
- Flujo conceptual de un Transformer.
- Parámetros de generación, ventana de contexto, latencia y cómputo.
- Limitaciones, regímenes de acceso y necesidad de controles externos.

### Demostrativo

- Fórmula de atención.
- Similitud vectorial.
- Variaciones entre tokenizadores y proveedores.
- Ajuste eficiente en parámetros y recuperación aumentada.

### No evaluable

- Derivación de retropropagación.
- Cálculo matricial completo.
- Entrenamiento con GPU.
- Taxonomía exhaustiva de arquitecturas neuronales.

## Evidencia esperada

- Diagrama correcto de inferencia.
- Experimento controlado cambiando una variable por vez.
- Registro de entradas, configuración y resultados.
- Diagnóstico de una salida deficiente.
- Matriz de selección con capacidad, privacidad, costo, disponibilidad y licencia.
- Explicación de por qué el modelo por sí solo no ejecuta acciones sobre un proyecto.

## Secuencia sugerida

1. Leer los materiales 1 y 2 antes de la clase 3.
2. Trabajar la lectura 3 con un diagrama de generación autoregresiva.
3. Usar la lectura 4 para preparar criterios y riesgos.
4. Realizar el laboratorio 5 y cerrar con la actividad diagnóstica 6.
5. Consultar las referencias 7 según el concepto que requiera ampliación.
