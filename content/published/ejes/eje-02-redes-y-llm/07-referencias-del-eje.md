---
id: eje-02-referencias
titulo: Referencias comentadas del Eje 2
eje: 2
orden: 7
tipo: referencia
nivel: ampliacion
audiencia: estudiante
clases: [2, 3]
modalidad: virtual-asincronica
resultados: [RA1]
acceso: publico
version: 1
---

# Referencias comentadas del Eje 2

## Propósito y criterio de uso

Esta guía distingue fuentes primarias, manuales formativos y marcos de riesgo. No es necesario leerlas completas. Las páginas de productos y fichas técnicas pueden documentar una versión, licencia o parámetro, pero no sustituyen evaluación independiente ni constituyen por sí solas sustento académico.

## Recorrido mínimo

### Redes y aprendizaje

- **Goodfellow, I., Bengio, Y. y Courville, A. (2016). *Deep Learning*. MIT Press.** Los capítulos 5 y 6 formalizan aprendizaje, generalización y redes profundas; el capítulo 12 introduce representaciones. Es una fuente de consulta abierta y más matemática que el alcance del eje. https://www.deeplearningbook.org/
- **Nielsen, M. (2015). *Neural Networks and Deep Learning*.** Los capítulos 1 y 2 ofrecen una entrada visual a neuronas, descenso por gradiente y retropropagación. Útil para construir intuición; sus ejemplos no representan la escala de un LLM actual. http://neuralnetworksanddeeplearning.com/
- **Russell, S. y Norvig, P. (2021). *Artificial Intelligence: A Modern Approach* (4.ª ed., edición global). Pearson.** Obra de consulta incluida en el programa. Permite situar redes y aprendizaje dentro de un campo más amplio y discutir incertidumbre y riesgos sin reducir inteligencia artificial a generación de texto.

### Transformer y atención

- **Vaswani, A. et al. (2017). “Attention Is All You Need”. *Advances in Neural Information Processing Systems*, 30.** Fuente primaria incluida en el programa. Para este eje alcanzan el resumen, las secciones 1 a 3 y la figura 1. La fórmula de atención escalada y la arquitectura original explican el punto de partida; no debe asumirse que todos los modelos actuales conservan cada detalle o costo. https://arxiv.org/abs/1706.03762

### Riesgos y evaluación

- **National Institute of Standards and Technology (2024). *Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile (NIST AI 600-1)*.** Documento incluido en el programa. Relaciona confabulación, privacidad, sesgos, procedencia, medición y gobernanza. Conviene consultar las tablas de riesgos y acciones después de las lecturas, no memorizar su taxonomía. https://doi.org/10.6028/NIST.AI.600-1

## Fuentes del programa para el puente a agentes

Estas referencias no explican por sí solas el mecanismo neuronal, pero muestran por qué un modelo debe integrarse con acciones, observaciones y evaluación:

- **Wang, L. et al. (2024). “A Survey on Large Language Model Based Autonomous Agents”. *Frontiers of Computer Science*, 18, 186345.** Usar introducción y taxonomía para distinguir modelo de sistema agéntico; las listas de sistemas envejecen rápidamente. https://doi.org/10.1007/s11704-024-40231-1
- **Yao, S. et al. (2023). “ReAct: Synergizing Reasoning and Acting in Language Models”. ICLR.** Fuente primaria para estudiar la alternancia entre producción del modelo, acciones y observaciones. No interpreta una traza textual como garantía de razonamiento correcto. https://arxiv.org/abs/2210.03629
- **Jimenez, C. E. et al. (2024). “SWE-bench: Can Language Models Resolve Real-World GitHub Issues?”. ICLR.** Ejemplo de evaluación sobre tareas de repositorios reales. Útil para contrastar fluidez con éxito verificable mediante pruebas. https://arxiv.org/abs/2310.06770
- **Yang, J. et al. (2024). “SWE-agent: Agent-Computer Interfaces Enable Automated Software Engineering”.** Introduce la importancia de la interfaz entre agente y computadora. Leer como puente al Eje 3 y a herramientas, no como evidencia de que un LLM aislado actúa. https://arxiv.org/abs/2405.15793

## Cómo leer fichas de modelos

Para seleccionar un modelo se necesitan fuentes vigentes adicionales: tarjeta del modelo, licencia, política de datos, documentación de versión y mediciones propias. Registra fecha de consulta y separa afirmaciones verificadas de campos ausentes.

| Pregunta | Evidencia adecuada |
|---|---|
| ¿Puede distribuirse comercialmente? | texto de la licencia aplicable |
| ¿Dónde se procesan y retienen entradas? | términos y política de datos vigentes |
| ¿Cabe localmente? | tamaño, formato, cuantización y medición en el hardware objetivo |
| ¿Resuelve la tarea? | conjunto de casos del proyecto con criterios observables |
| ¿Es reproducible? | versión, configuración, semilla, infraestructura y repeticiones |

“Código abierto”, “pesos abiertos”, “gratuito” y “local” no son sinónimos. Si una fuente no aclara datos de entrenamiento, restricciones o cambios de versión, esa ausencia forma parte de la decisión.

## Mapa de lecturas

- [Redes neuronales, entrenamiento e inferencia](01-redes-entrenamiento-e-inferencia.md): Goodfellow, Nielsen y Russell/Norvig.
- [Tokens, embeddings y similitud](02-tokens-embeddings-y-contexto.md): Goodfellow y Russell/Norvig.
- [Transformers, atención y generación](03-transformers-y-generacion.md): Vaswani y Goodfellow.
- [Operación, límites y selección](04-limites-y-puente-a-agentes.md): NIST, Russell/Norvig y Vaswani.
- [Laboratorio: caja de cristal](05-laboratorio-caja-de-cristal.md): NIST para diseño de evidencia.

## Límites de esta bibliografía

La investigación y los productos cambian más rápido que el programa. Estas fuentes no reemplazan las fichas de la versión usada ni pruebas sobre el videojuego. Las licencias requieren lectura de sus términos y, cuando corresponda, asesoramiento especializado; este material no ofrece asesoramiento legal.
