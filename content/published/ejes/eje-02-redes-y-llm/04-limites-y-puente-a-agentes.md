---
id: eje-02-limites-y-puente-a-agentes
titulo: Operación, límites y selección de modelos
eje: 2
orden: 4
tipo: lectura
nivel: obligatorio
audiencia: estudiante
clases: [2, 3]
modalidad: mixta
duracion_minutos: 25
resultados: [RA1]
prerrequisitos: [eje-02-transformers-y-generacion]
evaluable: true
acceso: publico
version: 1
---

# Operación, límites y selección de modelos

## Propósito

Al finalizar, podrás anticipar efectos del contexto y los parámetros de generación, reconocer límites no resueltos por una respuesta fluida y comparar modelos según capacidad, privacidad, costo y disponibilidad.

## Por qué importa

Elegir un modelo para revisar código, generar diálogos o ejecutarse dentro de un juego es una decisión de ingeniería. La calidad observada en una demostración no informa por sí sola latencia, costo, licencia, exposición de datos ni estabilidad bajo casos reales.

## Modelo mental

```text
tarea + instrucciones + contexto + configuración + modelo + infraestructura
→ salida probable, no garantía
```

Cambiar cualquiera de esas piezas puede cambiar el resultado. El nombre del modelo no basta para reproducirlo: deben registrarse entrada, versión, configuración, herramientas y fecha.

## Conceptos centrales

### Contexto y generación

La **ventana de contexto** limita los tokens que una invocación puede procesar, incluyendo instrucciones, historial, archivos, resultados de herramientas y salida reservada. No es memoria permanente ni garantiza uso uniforme de todo lo incluido. Si se supera, la aplicación puede rechazar, truncar o resumir información. Un límite anunciado es capacidad máxima, no cantidad útil.

- **Temperatura:** reescala la distribución. Valores bajos suelen concentrar elecciones; altos suelen diversificarlas. Su escala y comportamiento dependen del sistema.
- **Muestreo por núcleo (*top-p*):** limita el muestreo al conjunto menor de tokens cuya probabilidad acumulada alcanza `p`. No representa porcentaje de calidad.
- **Semilla:** inicializa el generador pseudoaleatorio. Puede favorecer repetición sólo si permanecen iguales modelo, infraestructura y configuración; no promete identidad entre servicios o versiones.
- **Límite de salida:** detiene la generación al alcanzar cierta cantidad de tokens. No fuerza al modelo a concluir antes.

Temperatura cero puede reducir variación, pero no convierte el sistema en verdadero ni necesariamente determinista: cambios de infraestructura, versiones, procesamiento paralelo o herramientas pueden alterar la salida. Conviene modificar una variable por experimento y no combinar temperatura y `top-p` sin necesidad.

### Latencia y cómputo

La latencia percibida incluye envío, espera, procesamiento de la entrada, generación y herramientas. Una entrada larga aumenta trabajo antes del primer token; una salida larga prolonga la generación. Modelos más grandes, razonamientos adicionales, hardware, concurrencia y ubicación también influyen.

El consumo computacional ocurre tanto al entrenar como al inferir, aunque a escalas distintas. Afecta costo, energía, memoria y posibilidad de ejecución local. Para un personaje en tiempo real, una respuesta de dos segundos puede ser inaceptable; para una revisión nocturna de código puede ser razonable. Caché, modelos menores, respuestas breves y llamadas fuera del bucle principal pueden ayudar, pero deben medirse en el caso real.

### Capacidades observadas y límites

Una capacidad es **observada** cuando aparece bajo ciertas pruebas; no queda garantizada para entradas nuevas.

- **Alucinación:** contenido plausible pero sin sustento, incorrecto o inventado, como una clase de Unity inexistente. Se mitiga verificando fuentes, herramientas y pruebas; no sólo pidiendo seguridad.
- **Sesgo:** diferencias o asociaciones sistemáticas derivadas de datos, objetivos y despliegue. Puede estereotipar nombres, culturas o roles de personajes. Requiere casos diversos y revisión del impacto.
- **Conocimiento desactualizado:** los parámetros reflejan un período y no conocen automáticamente la versión local. Documentación recuperada y metadatos ayudan, pero también pueden estar obsoletos.
- **Fragilidad contextual:** orden, redacción, ejemplos irrelevantes o instrucciones contradictorias pueden cambiar la respuesta. Más texto no siempre mejora el resultado.
- **Variabilidad:** el muestreo y la infraestructura producen salidas diferentes. Una ejecución exitosa no estima una tasa de éxito.

Además, el modelo no observa por defecto el proyecto, no ejecuta el juego y no conoce la intención tácita del equipo. Son necesarios especificaciones, herramientas, permisos y validaciones externas: ese ensamblaje abre el estudio de sistemas agénticos.

### Regímenes de acceso y ejecución

Estas categorías describen dimensiones distintas:

- **Propietario:** una entidad controla el modelo o servicio; puede ofrecer gran capacidad y operación administrada, con dependencia de precio, políticas, red y tratamiento de datos.
- **Código abierto:** el software se distribuye con una licencia que permite inspección, uso, modificación y redistribución según sus términos. Que una biblioteca sea abierta no vuelve abiertos los pesos ni los datos.
- **Pesos abiertos:** se publican parámetros para descarga, pero la licencia puede restringir usos y quizá no estén disponibles datos o proceso de entrenamiento. “Abierto” debe verificarse artefacto por artefacto.
- **Ejecución local:** el modelo corre en infraestructura controlada por el usuario. Puede mejorar control, trabajo sin conexión y privacidad, pero exige hardware, configuración, actualizaciones y seguridad. Un modelo local puede tener pesos abiertos o una licencia restrictiva.

Ninguna categoría implica automáticamente gratis, auditable, seguro o apto para uso comercial.

## Caso aplicado

### Matriz de selección

Un estudio compara tres tareas y prueba candidatos con el mismo conjunto de casos:

| Tarea | Prioridad | Preguntas decisivas |
|---|---|---|
| Revisar un repositorio privado | privacidad y capacidad | ¿se retienen datos?, ¿qué archivos necesita?, ¿detecta defectos en pruebas reales? |
| Generar variantes de diálogo sin conexión | disponibilidad y latencia | ¿cabe en el hardware?, ¿la licencia permite distribuirlo?, ¿mantiene tono y seguridad? |
| Clasificar incidencias por lotes | costo y estabilidad | ¿cuánto cuesta por lote?, ¿qué tasa de error tiene?, ¿cómo se recupera ante fallos? |

La selección registra versión, licencia, residencia y retención de datos, hardware, latencia percentil alto, consumo, costo total, longitud útil de contexto, idiomas y desempeño en casos propios. Los rankings públicos sirven para preseleccionar, no para decidir.

## Límites

Las condiciones comerciales y licencias cambian; deben verificarse en la fuente vigente. Las métricas de hardware no se transfieren sin medir tamaño, cuantización, longitud y concurrencia. Tampoco existe una configuración universalmente “creativa” o “precisa”.

## Errores frecuentes

- **“Ventana grande equivale a memoria y atención perfecta.”** Es un límite de entrada, no garantía de recuperación.
- **“La semilla hace reproducible cualquier servicio.”** Sólo controla una fuente de variación.
- **“Temperatura cero elimina alucinaciones.”** Reduce muestreo, no corrige conocimiento ni contexto.
- **“Pesos abiertos significa código, datos y licencia abierta.”** Son artefactos independientes.
- **“Local significa privado.”** Telemetría, registros y configuración también deben revisarse.
- **“El modelo con mejor benchmark es el adecuado.”** Faltan costo, tareas propias, licencia y operación.

## Comprobación

1. ¿Qué registrarías para comparar dos ejecuciones?
2. ¿Por qué una ventana de contexto mayor puede no mejorar una tarea?
3. ¿Qué diferencia pesos abiertos de ejecución local?
4. ¿Cómo comprobarías una API sugerida por el modelo?

<details>
<summary>Ver orientación</summary>

1. Entrada, contexto, modelo y versión, configuración, herramientas, fecha y salida.
2. Puede incorporar ruido, contradicciones o información difícil de aprovechar.
3. Los pesos son un artefacto distribuido; local describe dónde ocurre la inferencia.
4. Consultando documentación de la versión y compilando o ejecutando una prueba mínima.

</details>

## Actividad relacionada

[Errores conceptuales y decisiones](06-errores-conceptuales.md), que incluye una matriz de selección.

## Bibliografía comentada

- National Institute of Standards and Technology (2024). *Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile (NIST AI 600-1)*. Secciones sobre riesgos, medición y gobernanza: marco para no tratar capacidades observadas como garantías. https://doi.org/10.6028/NIST.AI.600-1
- Russell, S. y Norvig, P. (2021). *Artificial Intelligence: A Modern Approach* (4.ª ed.). Consultar capítulos sobre aprendizaje y riesgos para relacionar generalización, incertidumbre e impacto.
- Vaswani, A. et al. (2017). “Attention Is All You Need”. Sección 5: referencia para costos y complejidad de la arquitectura original; no extrapolar sus cifras directamente a modelos actuales. https://arxiv.org/abs/1706.03762
