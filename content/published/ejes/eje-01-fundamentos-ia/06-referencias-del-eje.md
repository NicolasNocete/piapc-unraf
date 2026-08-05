---
id: eje-01-referencias
titulo: Referencias comentadas del Eje 1
eje: 1
orden: 6
tipo: referencia
nivel: ampliacion
audiencia: estudiante
clases: [1, 2]
modalidad: mixta
resultados: [RA1, RA2]
prerrequisitos: []
acceso: publico
version: 1
---

# Referencias comentadas del Eje 1

Esta selección usa la bibliografía declarada en el programa. No es necesario leer las obras completas: las indicaciones señalan para qué sirve cada fuente dentro del eje.

## Lecturas principales

- **Russell, S. y Norvig, P. (2021). *Artificial Intelligence: A Modern Approach* (4.ª ed., edición global). Pearson.** Los capítulos introductorios presentan enfoques, evolución del campo, agentes racionales y propiedades de los entornos. Es la referencia principal para [qué entendemos por IA](02-que-es-inteligencia-artificial.md) y [agentes racionales](03-agentes-racionales.md).
- **Poole, D. L. y Mackworth, A. K. (2023). *Artificial Intelligence: Foundations of Computational Agents* (3.ª ed.). Cambridge University Press.** Ofrece una formulación sistemática de agentes computacionales y búsqueda. Conviene leer la introducción y conservar el resto para los ejes posteriores. Acceso abierto: https://artint.info/
- **Millington, I. y Funge, J. (2016). *Artificial Intelligence for Games* (3.ª ed.). CRC Press.** Vincula movimiento, búsqueda y toma de decisiones con restricciones reales de videojuegos. En este eje se consulta para reconocer por qué la IA clásica sigue siendo pertinente; la implementación corresponde al Eje 5.

## Agentes basados en modelos de lenguaje

- **Wang, L. et al. (2024). "A Survey on Large Language Model Based Autonomous Agents". *Frontiers of Computer Science*, 18, 186345.** Revisión amplia de componentes como perfil, memoria, planificación y acción. Es útil para comparar un LLM aislado con un sistema agéntico, sin asumir que todas las arquitecturas usan los mismos componentes. https://doi.org/10.1007/s11704-024-40231-1
- **Yao, S. et al. (2023). "ReAct: Synergizing Reasoning and Acting in Language Models". *International Conference on Learning Representations*.** Presenta un patrón que intercala generación, acciones y observaciones. En el Eje 1 interesa como ejemplo del ciclo agente-entorno; su implementación no es obligatoria. https://arxiv.org/abs/2210.03629

## Contexto histórico y ampliación

- **Vaswani, A. et al. (2017). "Attention Is All You Need". *Advances in Neural Information Processing Systems*, 30.** Fuente primaria de la arquitectura Transformer. En este eje sólo se requiere ubicarla en la evolución reciente; su mecanismo se estudia en el Eje 2. https://arxiv.org/abs/1706.03762
- **Rabin, S. (ed.). (2013). *Game AI Pro: Collected Wisdom of Game AI Professionals*. CRC Press.** Colección orientada a práctica profesional. Sirve para explorar soluciones de IA de videojuegos que no dependen de modelos generativos; elegir capítulos según el problema, no como lectura lineal.
- **NIST (2024). *Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile* (NIST AI 600-1).** Marco de consulta para ampliar el análisis de riesgos de IA generativa. En este eje ayuda a fundamentar criterios de adopción y descarte. https://doi.org/10.6028/NIST.AI.600-1

## Recorrido sugerido

1. Para el vocabulario general, empezá por Russell y Norvig o por la introducción de Poole y Mackworth.
2. Para analizar comportamiento dentro del juego, continuá con Millington y Funge.
3. Para distinguir modelo y agente basado en LLM, leé la revisión de Wang et al. y luego el caso ReAct.
4. Usá las demás fuentes sólo para ampliar la pregunta concreta que estés investigando.
