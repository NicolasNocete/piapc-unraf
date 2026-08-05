---
id: eje-01-que-es-ia
titulo: Qué entendemos por inteligencia artificial
eje: 1
orden: 2
tipo: lectura
nivel: obligatorio
audiencia: estudiante
clases: [1, 2]
modalidad: mixta
duracion_minutos: 20
resultados: [RA1, RA2]
prerrequisitos: [eje-01-bienvenida]
evaluable: true
acceso: publico
version: 1
---

# Qué entendemos por inteligencia artificial

## Propósito

Esta lectura permite usar una definición operativa de IA, reconocer cambios centrales en la evolución del campo y relacionar cuatro categorías que suelen confundirse: IA clásica, aprendizaje automático, aprendizaje profundo e IA generativa.

## Por qué importa

Las técnicas que hoy conviven en un videojuego provienen de tradiciones diferentes. Conocer ese mapa evita presentar lo generativo como reemplazo de toda IA anterior y ayuda a elegir entre reglas explícitas, aprendizaje a partir de datos y generación de contenido.

## Modelo mental: representar, producir y evaluar

No existe una definición universal que resuelva todos los debates del campo. Para analizar sistemas concretos utilizaremos esta:

> La inteligencia artificial estudia y construye sistemas capaces de recibir información, representar una situación y producir decisiones, predicciones, acciones o contenidos orientados a un objetivo.

La definición evita preguntar si una máquina “piensa como una persona”. En cambio, permite observar:

1. qué información recibe;
2. cómo representa el problema;
3. qué objetivo orienta su funcionamiento;
4. qué resultado produce;
5. cómo puede evaluarse.

IA no es sinónimo de aprendizaje automático, modelo de lenguaje, robot ni agente.

## Evolución del campo y principales enfoques

La historia de la IA no es una marcha lineal hacia sistemas cada vez "más inteligentes". Cambiaron las preguntas, las representaciones, los recursos computacionales y los criterios de éxito; además, enfoques de distintas épocas siguen coexistiendo.

- **Antecedentes y nacimiento del campo (décadas de 1940 y 1950).** La computación, la lógica y la cibernética ofrecieron formas de describir cálculo, control y retroalimentación. En 1950 Alan Turing propuso discutir la inteligencia mediante conducta observable en una conversación. El encuentro de Dartmouth de 1956 consolidó el nombre *artificial intelligence* y un programa de investigación.
- **IA simbólica (décadas de 1950 a 1980).** Buena parte del trabajo representó conocimiento con símbolos, reglas, estados y objetivos. La búsqueda, la resolución de problemas y luego los sistemas expertos mostraron resultados en dominios acotados. Dependían, sin embargo, de conocimiento difícil de construir y mantener, y eran frágiles fuera de los supuestos previstos.
- **Ciclos de expectativas y límites.** Las promesas excedieron en distintos momentos la capacidad, los datos y el cómputo disponibles. La reducción de financiamiento y expectativas en algunos períodos se conoce como "inviernos de la IA". Esta historia aconseja separar demostraciones llamativas de desempeño sostenido en contexto.
- **Giro hacia métodos estadísticos y aprendizaje automático (desde las décadas de 1980 y 1990).** Con más datos y capacidad de cómputo cobraron fuerza los modelos que ajustan parámetros a partir de ejemplos. El foco se desplazó parcialmente desde codificar todo el conocimiento hacia medir generalización sobre datos no vistos.
- **Aprendizaje profundo (especialmente desde la década de 2010).** Redes neuronales de múltiples capas mejoraron tareas de percepción, voz y lenguaje gracias a avances algorítmicos, grandes conjuntos de datos y hardware especializado. Estos resultados no eliminaron los problemas de sesgo, robustez, costo o explicación.
- **Modelos fundacionales e IA generativa (finales de la década de 2010 y década de 2020).** La arquitectura Transformer, presentada en 2017, impulsó modelos entrenados a gran escala que pueden adaptarse a múltiples tareas y generar texto, código, imágenes o audio. Su flexibilidad amplía usos, pero una salida probable y convincente no garantiza verdad ni adecuación.

En videojuegos, las máquinas de estados, la búsqueda de caminos y los sistemas de utilidad no quedaron obsoletos por estos cambios. Pueden combinarse con modelos aprendidos, reservando cada técnica para aquello que hace bien.

## Conceptos centrales: cuatro categorías relacionadas

### IA clásica

La inteligencia artificial clásica (*classical AI*) representa explícitamente estados, acciones, reglas, objetivos, costos o restricciones. Incluye búsqueda, planificación, máquinas de estados, árboles de comportamiento y sistemas de utilidad.

Un guardia puede pasar de `patrullar` a `investigar` al oír un ruido y a `perseguir` al ver al jugador. La conducta puede ser compleja sin haber sido aprendida de datos. Estas técnicas siguen siendo valiosas porque suelen resultar eficientes, controlables y fáciles de depurar.

### Aprendizaje automático

El aprendizaje automático (*machine learning*) ajusta un modelo a partir de datos y un objetivo de entrenamiento, en lugar de escribir una regla para cada entrada posible.

Por ejemplo, un estudio puede clasificar comentarios en “error técnico”, “equilibrio” o “consulta” usando ejemplos previamente etiquetados. El modelo aprende regularidades, pero también puede reproducir sesgos o fallar ante casos poco representados.

### Aprendizaje profundo

El aprendizaje profundo (*deep learning*) es una subárea del aprendizaje automático basada en redes neuronales con múltiples capas. Se utiliza especialmente con imágenes, audio, lenguaje y grandes volúmenes de datos.

No todo aprendizaje automático es profundo y no toda red profunda genera contenido: también puede clasificar, detectar o estimar valores.

### IA generativa

La inteligencia artificial generativa (*generative AI*) produce contenido nuevo, como texto, código, imágenes o audio, a partir de patrones aprendidos.

Durante la producción de un videojuego puede proponer diálogos, resumir registros o generar borradores de código. Durante la ejecución puede producir conversaciones variables. En ambos casos requiere validación: una salida plausible puede ser incorrecta, costosa, lenta o contraria al diseño.

Las categorías describen aspectos diferentes. Gran parte de la IA generativa actual usa aprendizaje profundo, pero no todo aprendizaje profundo es generativo.

## Caso aplicado: un mismo guardia, varios enfoques

| Necesidad | Enfoque posible |
|---|---|
| Patrullar y perseguir | Máquina de estados, IA clásica |
| Encontrar una ruta | A*, IA clásica |
| Clasificar un sonido | Aprendizaje automático |
| Reconocer objetos en una imagen | Aprendizaje profundo |
| Improvisar una respuesta verbal | IA generativa |

Los enfoques pueden combinarse. Un modelo generativo no necesita controlar movimiento, daño o reglas de combate. Una arquitectura híbrida puede reservar técnicas previsibles para la jugabilidad y generación para espacios donde la variación sea aceptable.

## Límites del mapa

Estas categorías se superponen y no describen por sí solas una arquitectura completa. "Clásica" reúne técnicas diversas; un sistema aprendido puede integrarse dentro de reglas explícitas; y "generativa" describe el tipo de salida, no su grado de autonomía. Tampoco el test de Turing mide todas las capacidades ni certifica comprensión, seguridad o utilidad: es una propuesta histórica basada en imitación conversacional.

### Elegir por el problema

Antes de adoptar una técnica, considerá:

- previsibilidad necesaria;
- disponibilidad y calidad de datos;
- costo y latencia;
- facilidad de prueba y depuración;
- consecuencias de un error;
- necesidad real de adaptación o generación.

Una puerta que se abre al poseer una llave requiere una condición determinista. Agregar un modelo generativo aumentaría costo y variabilidad sin aportar valor.

## Errores frecuentes

- **“Toda IA aprende.”** Falso: búsqueda y máquinas de estados pueden ser IA sin entrenamiento.
- **“Aprendizaje automático y profundo son sinónimos.”** El segundo es una subárea del primero.
- **“Toda red neuronal genera contenido.”** También puede clasificar o predecir.
- **“Generativo significa verdadero.”** Generar una salida probable no verifica su exactitud.
- **“Más sofisticado es mejor.”** En videojuegos, control y legibilidad también son calidad.
- **“La IA generativa reemplazó a la IA clásica.”** Resuelven necesidades diferentes y suelen combinarse.
- **“La historia fue un progreso continuo.”** Hubo límites, cambios de enfoque y ciclos de expectativas.

## Comprobación

1. ¿Puede una máquina de estados considerarse IA?
2. ¿Qué relación existe entre aprendizaje automático y aprendizaje profundo?
3. ¿Qué enfoque usarías para abrir una puerta con una llave?
4. ¿Por qué un diálogo plausible no es evidencia de corrección?

<details>
<summary>Ver orientación</summary>

1. Sí: representa estados y selecciona acciones mediante reglas explícitas.
2. El aprendizaje profundo es una familia dentro del aprendizaje automático.
3. Una condición determinista, por ser simple y verificable.
4. Porque plausibilidad y verdad no son equivalentes; debe contrastarse con diseño, reglas y pruebas.

</details>

## Actividad relacionada

Aplicá estas categorías en la [actividad inicial de clasificación](05-actividad-clasificacion.md).

## Bibliografía comentada

- Russell, S. y Norvig, P. (2021). *Artificial Intelligence: A Modern Approach* (4.ª ed.). Los capítulos 1 y 2 ofrecen el panorama histórico y las definiciones del campo; son la referencia principal para esta lectura.
- Poole, D. L. y Mackworth, A. K. (2023). *Artificial Intelligence: Foundations of Computational Agents* (3.ª ed.). La introducción organiza IA alrededor de agentes computacionales. Acceso abierto: https://artint.info/
- Millington, I. y Funge, J. (2016). *Artificial Intelligence for Games* (3.ª ed.). Consultar de manera selectiva para ver búsqueda y toma de decisiones aplicadas a videojuegos.
- Vaswani, A. et al. (2017). "Attention Is All You Need". Fuente primaria de la arquitectura Transformer; en este eje basta reconocer su lugar histórico. https://arxiv.org/abs/1706.03762
