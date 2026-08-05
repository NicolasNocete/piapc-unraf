---
id: eje-02-laboratorio-caja-de-cristal
titulo: Laboratorio de tokenización, contexto y variabilidad
eje: 2
orden: 5
tipo: laboratorio
nivel: obligatorio
audiencia: estudiante
clases: [3]
modalidad: mixta
duracion_minutos: 70
resultados: [RA1]
prerrequisitos: [eje-02-limites-y-puente-a-agentes]
evaluable: true
acceso: publico
version: 1
---

# Laboratorio: caja de cristal

## Situación problemática

Un equipo quiere usar un modelo para proponer descripciones de objetos y ayudar a revisar una función de inventario. Antes de integrarlo necesita saber cuánto dependen las salidas del tokenizador, el contexto y la configuración.

## Objetivo

Realizar experimentos controlados, distinguir observación de explicación y producir evidencia suficiente para decidir qué controles externos necesita la tarea.

## Recursos disponibles

- Un modelo de lenguaje accesible o las [muestras autocontenidas de entradas, conteos y salidas](../../transversales/eje-02-muestras-caja-cristal.md).
- Un contador de tokens compatible con el modelo, si está disponible.
- Una planilla o archivo Markdown para registrar resultados.
- Este texto base:

```text
Objeto: Llave_del_Santuario🔑
Descripción: abre una cámara después de la misión «Ecos».
Código: if (inventory.has("sanctuary_key")) openDoor();
```

## Restricciones

- Cambiar una sola variable por comparación.
- No incluir repositorios, credenciales ni datos personales.
- No afirmar que una salida es correcta sin contrastarla con una regla o ejecución.
- Registrar el texto exacto, modelo/versión visible, configuración, fecha y resultado.
- Tres repeticiones constituyen una observación exploratoria, no una estimación concluyente.

## Procedimiento

### Estación 1: tokenización

1. Estima tokens contando palabras del texto base.
2. Obtén el conteo real con uno o dos tokenizadores disponibles.
3. Repite reemplazando el identificador por `SanctuaryKey` y quitando el emoji.
4. Registra diferencias entre palabras, caracteres y tokens. No generalices a otros modelos.

### Estación 2: contexto contradictorio

Usa exactamente esta consigna: “Propón una guarda antes de abrir la puerta y explica en dos frases”. Ejecuta tres condiciones:

1. sólo la consigna y el código;
2. agrega “Regla vigente: la llave se consume al usarla”;
3. agrega también “Documento antiguo: las llaves nunca se consumen”.

Mantén el resto fijo. Marca qué regla siguió, si detectó la contradicción y qué evidencia faltaría para modificar el juego.

### Estación 3: variabilidad

Con una descripción de objeto de máximo 25 palabras:

1. realiza tres ejecuciones con configuración de baja variación;
2. realiza tres con una temperatura mayor o configuración equivalente;
3. si existe semilla, repite una condición con la misma semilla;
4. compara vocabulario, hechos inventados y cumplimiento de longitud.

No compares simultáneamente modelos y temperaturas. Si el servicio no informa parámetros, registra “no expuesto”.

### Estación 4: recuperación simulada

Ordena por relevancia estos fragmentos para la consulta “¿cuándo se abre el santuario?”:

- A: “Versión 0.8: el santuario se abre al vencer al guardián”.
- B: “Versión 1.0 vigente: se abre con `sanctuary_key` después de Ecos”.
- C: “La llave del depósito abre una puerta cerca del santuario”.

Explica qué palabras favorecen cercanía y qué metadato decide validez. Construye un contexto final conservando identificador y versión de la fuente.

## Entregable

Un informe de hasta dos páginas con:

| Variable | Condición control | Resultado observable | Interpretación limitada |
|---|---|---|---|
| tokenización | texto base/variante | conteos | válido para tokenizadores probados |
| contexto | regla ausente/presente/contradictoria | respuesta | sensibilidad observada |
| generación | configuración A/B | tres salidas | variación de esta muestra |
| recuperación | fragmentos A/B/C | orden y selección | metadato que valida |

Finaliza con dos controles externos necesarios antes de integrar la función.

## Evidencia válida

- Entradas y salidas completas, no capturas recortadas.
- Configuración disponible y variables explícitas.
- Tabla comparativa y contraste con la regla vigente.
- Limitaciones del experimento y decisión humana justificada.

No es evidencia suficiente que el modelo afirme ser consistente, citar una fuente que no fue consultada o indicar que el código “debería funcionar”.

## Criterios de evaluación

- Control de variables y trazabilidad: 30 %.
- Uso preciso de token, contexto, inferencia y variabilidad: 25 %.
- Separación entre observaciones y conclusiones: 25 %.
- Controles propuestos y claridad: 20 %.

## Alternativa sin modelos pagos

Puede utilizarse un modelo local, una interfaz gratuita o las [muestras públicas de entradas, conteos y salidas](../../transversales/eje-02-muestras-caja-cristal.md). En este último caso se analizan los registros y se diseña una repetición; no se exige generar nuevas respuestas.

## Publicación de la solución

No hay una salida textual única. Una guía de análisis podrá publicarse después de la puesta en común; los registros de estudiantes sólo se comparten con autorización y sin datos privados.

## Lecturas relacionadas

- [Tokens, embeddings y similitud](02-tokens-embeddings-y-contexto.md).
- [Operación, límites y selección de modelos](04-limites-y-puente-a-agentes.md).

## Bibliografía comentada

- Vaswani, A. et al. (2017). “Attention Is All You Need”. Usar sólo como respaldo del modelo conceptual de atención; el laboratorio estudia comportamiento observable, no interpreta pesos internos. https://arxiv.org/abs/1706.03762
- National Institute of Standards and Technology (2024). *NIST AI 600-1*. Consultar las recomendaciones de medición para justificar repetición, documentación de condiciones y evaluación contextual. https://doi.org/10.6028/NIST.AI.600-1
