---
id: eje-01-ia-produccion-ejecucion
titulo: IA en la producción y la ejecución de videojuegos
eje: 1
orden: 4
tipo: lectura
nivel: obligatorio
audiencia: estudiante
clases: [2]
modalidad: mixta
duracion_minutos: 20
resultados: [RA1, RA2]
prerrequisitos: [eje-01-agentes-racionales]
evaluable: true
acceso: publico
version: 1
---

# IA en la producción y la ejecución de videojuegos

## Propósito

Al terminar podrás diferenciar automatización, asistencia, flujo de trabajo y autonomía; ubicar aplicaciones de IA durante la producción o la ejecución de un videojuego; y justificar cuándo usar reglas, modelos aprendidos, generación o ninguna IA.

## Por qué importa

Una herramienta interna que resume registros y un personaje que genera respuestas en vivo enfrentan restricciones distintas. Confundir ambos contextos puede trasladar al producto costos, demoras y variabilidad que eran aceptables sólo durante el desarrollo.

## Modelo mental: delegación bajo restricciones

Pensá cada solución como una distribución de decisiones entre programa, modelo y persona. A mayor capacidad del sistema para elegir pasos y actuar, mayor necesidad de límites, evidencia y recuperación. La autonomía no es una propiedad binaria ni un objetivo en sí mismo.

## Conceptos centrales

- **Automatización:** ejecuta una secuencia predeterminada. Un programa que convierte recursos siempre del mismo modo puede ser valioso sin usar IA.
- **Asistencia:** propone o analiza, mientras una persona decide y aplica las acciones principales. Un modelo puede sugerir código sin tener permiso para editarlo.
- **Flujo de trabajo (*workflow*):** coordina pasos cuya estructura principal está definida; alguno puede incluir una decisión de modelo. Por ejemplo: transcribir una prueba, clasificar el fallo y crear un borrador de incidencia para revisión.
- **Autonomía:** grado en que el sistema selecciona pasos y acciones sin intervención inmediata. Está acotada por herramientas, permisos, tiempo, presupuesto y condiciones de detención.

Estas categorías pueden combinarse. Para distinguirlas observá quién elige el siguiente paso, quién produce efectos sobre el entorno y dónde se exige aprobación.

## Caso aplicado: dos momentos del mismo proyecto

### Durante la producción

Un equipo puede usar IA para clasificar devoluciones de pruebas, explorar código, proponer diálogos, generar borradores de pruebas o buscar inconsistencias entre diseño e implementación. El resultado todavía atraviesa revisión, control de versiones, pruebas y decisión humana antes de llegar al juego.

Aquí importan:

- exactitud y trazabilidad de fuentes y cambios;
- privacidad de código, activos y datos de jugadores;
- facilidad para revisar, revertir y reproducir;
- tiempo profesional ahorrado frente al costo de validar;
- licencias y procedencia de lo generado.

### Durante la ejecución

Mientras se juega, la IA puede seleccionar comportamientos, buscar rutas, ajustar parámetros, reconocer entradas o generar diálogo. Cada decisión afecta directamente la experiencia y quizá no pueda esperar una revisión humana.

Aquí importan:

- latencia y consumo de CPU, memoria, red o servicios externos;
- previsibilidad, dificultad y legibilidad para el jugador;
- funcionamiento sin conexión y disponibilidad del proveedor;
- moderación, privacidad y consistencia narrativa;
- posibilidad de probar y limitar todas las acciones con impacto jugable.

Una arquitectura híbrida puede usar una máquina de estados para combate y movimiento, y reservar generación para frases opcionales. Así una demora o salida defectuosa no altera reglas críticas.

## Decidir con evidencia

Antes de elegir una solución, definí el problema y compará al menos una alternativa simple.

| Pregunta | Señal a favor de IA o modelos aprendidos | Señal a favor de reglas o software convencional |
|---|---|---|
| ¿Las entradas son ambiguas o difíciles de expresar con reglas? | Lenguaje, imágenes o patrones variables | Condiciones exactas y enumerables |
| ¿Se necesita variación o adaptación? | Muchas salidas aceptables | Un resultado correcto y estable |
| ¿Cómo se verifica? | Hay muestras, métricas y revisión adecuada | La corrección puede especificarse directamente |
| ¿Qué cuesta un error? | El efecto es reversible y acotado | Afecta progreso, seguridad, pagos o datos |
| ¿Qué restricciones operativas existen? | Latencia, costo y disponibilidad son aceptables | Debe responder localmente y de forma constante |

Usar IA requiere una ventaja observable frente a la alternativa: mejor experiencia, cobertura de entradas, tiempo o calidad. Una demostración sorprendente no alcanza.

## Cuándo no usar IA

No conviene usarla cuando una regla sencilla satisface el requisito, no existe forma de validar la salida, los datos necesarios no pueden utilizarse responsablemente, la latencia o el costo rompen la experiencia, o el impacto de un error supera los controles disponibles.

Ejemplos: abrir una puerta al verificar una llave, calcular daño con una fórmula de diseño, guardar una partida o aplicar una migración crítica. En estos casos, determinismo y pruebas directas aportan más valor que interpretación o variación.

## Límites

La tabla orienta, pero no reemplaza prototipos ni mediciones en el dispositivo objetivo. "Producción" y "ejecución" también pueden conectarse: datos recolectados durante el juego alimentan análisis posteriores, lo que agrega obligaciones de privacidad. Los mecanismos detallados de modelos, agentes y evaluación se desarrollan en ejes posteriores.

## Errores frecuentes

- **"Si tiene varios pasos, es un agente."** Puede ser un flujo completamente predefinido.
- **"Asistencia implica bajo riesgo."** Una sugerencia aceptada sin revisión puede producir el mismo daño que una acción automática.
- **"Un prototipo rápido garantiza operación viable."** Faltan medir latencia, costo, fallos y dependencia externa.
- **"La IA dentro del juego debe ser generativa."** La mayor parte de una conducta puede resolverse con técnicas clásicas controlables.
- **"No usar IA es falta de innovación."** Elegir la solución mínima adecuada es una decisión de ingeniería y diseño.

## Comprobación

1. ¿Qué diferencia un flujo de trabajo de un agente con mayor autonomía?
2. ¿Por qué generar diálogos durante producción tiene restricciones distintas de generarlos durante la partida?
3. ¿Qué alternativa simple compararías antes de usar un modelo para abrir una puerta?
4. ¿Qué evidencia pedirías para afirmar que una IA mejora un proceso de pruebas?

## Actividad relacionada

Completá la [actividad inicial de clasificación](05-actividad-clasificacion.md) y justificá el caso en el que no usarías IA con al menos dos criterios de esta lectura.

## Bibliografía comentada

- Millington, I. y Funge, J. (2016). *Artificial Intelligence for Games* (3.ª ed.). Referencia para contrastar técnicas de ejecución según movimiento, búsqueda y toma de decisiones.
- Russell, S. y Norvig, P. (2021). *Artificial Intelligence: A Modern Approach* (4.ª ed.). Aporta el marco general para seleccionar agentes y técnicas según las propiedades del entorno.
- NIST (2024). *Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile* (NIST AI 600-1). Lectura de ampliación para identificar riesgos y controles de IA generativa, no como receta específica para videojuegos. https://doi.org/10.6028/NIST.AI.600-1
