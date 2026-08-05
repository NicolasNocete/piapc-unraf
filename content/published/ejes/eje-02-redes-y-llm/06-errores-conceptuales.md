---
id: eje-02-errores-conceptuales
titulo: Errores conceptuales y decisiones sobre modelos
eje: 2
orden: 6
tipo: actividad
nivel: obligatorio
audiencia: estudiante
clases: [3]
modalidad: mixta
duracion_minutos: 45
resultados: [RA1]
prerrequisitos: [eje-02-limites-y-puente-a-agentes]
evaluable: true
disponible_desde: 2026-08-12
disponible_hasta: 2026-08-25
acceso: publico
version: 1
---

# Actividad: errores conceptuales y decisiones

## Situación problemática

Durante una reunión sobre un prototipo, el equipo formula afirmaciones plausibles sobre modelos de lenguaje. Algunas mezclan conceptos; otras omiten condiciones necesarias para decidir. Debes convertirlas en afirmaciones técnicamente defendibles y seleccionar un régimen de modelo para un caso concreto.

## Objetivo

Diagnosticar confusiones entre entrenamiento e inferencia, probabilidad y verdad, contexto y memoria, apertura y ejecución; justificar una selección con criterios observables.

## Recursos disponibles

- [Redes neuronales, entrenamiento e inferencia](01-redes-entrenamiento-e-inferencia.md).
- [Tokens, embeddings y similitud](02-tokens-embeddings-y-contexto.md).
- [Transformers, atención y generación probabilística](03-transformers-y-generacion.md).
- [Operación, límites y selección de modelos](04-limites-y-puente-a-agentes.md).
- [Fichas autocontenidas de alternativas, mediciones y licencias simuladas](../../transversales/eje-02-fichas-seleccion-modelos.md). No se requiere una cuenta comercial.

## Restricciones

- Clasificar cada afirmación como correcta, incorrecta o insuficiente.
- Corregirla en un máximo de tres frases usando el mecanismo pertinente.
- No atribuir propiedades a un producto sin evidencia de su versión.
- Separar requisitos obligatorios de preferencias.
- No usar “la IA entiende” o “la IA sabe” como explicación del mecanismo.

## Procedimiento

### Parte A: diagnóstico

Analiza al menos ocho afirmaciones y asegúrate de cubrir los seis grupos.

1. **Aprendizaje:** “Adjuntar la biblia narrativa ajusta los parámetros”; “un adaptador entrenado y un ejemplo en el prompt hacen lo mismo”.
2. **Representación:** “Cada palabra ocupa un token”; “el documento con embedding más cercano contiene la respuesta correcta”.
3. **Generación:** “Atención prueba que el modelo comprendió”; “el siguiente token más probable es el dato más verdadero”.
4. **Configuración:** “Con temperatura cero siempre obtenemos los mismos bytes”; “una semilla vuelve reproducible cualquier proveedor”.
5. **Límites:** “Si la documentación entra en la ventana, el modelo la utilizará bien”; “una respuesta fluida indica conocimiento actualizado”.
6. **Distribución:** “Pesos abiertos significa código y datos abiertos”; “local significa privado y gratuito”.

Para cada una completa:

| Diagnóstico | Conceptos confundidos | Reformulación | Evidencia o prueba |
|---|---|---|---|
| incorrecta/insuficiente/correcta | dos términos como máximo | afirmación condicionada | dato, documento o experimento |

### Parte B: caso de selección

El juego debe generar rumores opcionales durante una exposición sin conexión. El equipo dispone de una computadora con memoria limitada. Los rumores no pueden revelar datos personales, contradecir hechos de la historia ni bloquear el bucle principal. El presupuesto de operación es bajo y la distribución será comercial.

1. Convierte el caso en requisitos medibles: latencia objetivo, memoria disponible, tasa tolerable de contradicciones, licencia y funcionamiento sin red.
2. Compara al menos dos alternativas: modelo local y servicio propietario. Puedes agregar una solución sin modelo generativo.
3. Para cada alternativa registra capacidad en pruebas propias, privacidad y retención, costo total, disponibilidad, licencia, cómputo y mecanismo de fallo seguro.
4. Elige, descarta o condiciona cada alternativa. Si faltan cifras, escribe qué medición impide decidir.
5. Propón un diseño mínimo: rumores preproducidos o modelo fuera del bucle principal, recuperación de hechos vigentes, filtro de salida y frase segura ante demora.

## Entregable

Una tabla de diagnóstico y una matriz de decisión de una página. La conclusión debe incluir:

- alternativa seleccionada o decisión de no usar un LLM;
- dos evidencias necesarias antes de desplegar;
- dos límites que permanecen aunque las pruebas resulten favorables.

## Evidencia válida

- Correcciones que explican qué cambia y qué permanece fijo.
- Condiciones de licencia y operación tomadas de fichas provistas o fuentes oficiales identificadas.
- Mediciones sobre los casos del juego o plan concreto para obtenerlas.
- Decisión que admite información faltante y una opción sin generación.

No son evidencia válida un ranking aislado, “funcionó una vez” ni la opinión del modelo sobre su propia precisión.

## Criterios de evaluación

- Precisión conceptual: 35 %.
- Calidad y trazabilidad de criterios de selección: 30 %.
- Controles y fallos seguros adecuados al videojuego: 25 %.
- Claridad y concisión: 10 %.

## Alternativa sin modelos pagos

Toda la actividad puede resolverse con las lecturas y las [fichas públicas proporcionadas](../../transversales/eje-02-fichas-seleccion-modelos.md). La alternativa sin modelo generativo, como rumores escritos y seleccionados mediante reglas, debe considerarse con el mismo rigor que las demás.

## Condición de publicación de la solución

La orientación docente se publica después de la entrega. Puede haber varias decisiones correctas si declaran supuestos y satisfacen requisitos; las marcas o cifras de las fichas no deben extrapolarse a versiones distintas.

## Bibliografía comentada

- National Institute of Standards and Technology (2024). *NIST AI 600-1*. Usar las secciones de medición y riesgos para revisar evidencia, contexto de uso y límites residuales. https://doi.org/10.6028/NIST.AI.600-1
- Russell, S. y Norvig, P. (2021). *Artificial Intelligence: A Modern Approach* (4.ª ed.). Marco general para comparar desempeño esperado, incertidumbre y consecuencias de una decisión.
