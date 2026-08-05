---
id: eje-03-chat-workflow-y-agente
titulo: Chat, flujo de trabajo y agente
eje: 3
orden: 1
tipo: lectura
nivel: obligatorio
audiencia: estudiante
clases: [1, 4]
modalidad: mixta
duracion_minutos: 20
resultados: [RA1, RA2, RA5, RA8]
prerrequisitos: [eje-01-bienvenida]
evaluable: true
acceso: publico
version: 1
---

# Chat, flujo de trabajo y agente

## Propósito

Distinguir modelo, chat, flujo de trabajo y agente siguiendo dónde reside el control efectivo, no la interfaz ni la etiqueta comercial.

## Por qué importa

En producción de videojuegos, elegir más autonomía de la necesaria aumenta costo y riesgo. No se resuelve del mismo modo redactar diálogos opcionales, importar cien texturas o investigar un fallo intermitente: la estructura debe corresponder al problema.

## Modelo mental

Un **modelo** realiza inferencia: recibe una entrada y un contexto y produce una salida. No observa archivos ni ejecuta código por sí solo. Un **chat** organiza invocaciones del modelo en una conversación; puede conservar historial y ofrecer herramientas, pero su interfaz no determina quién controla la tarea.

## Seguir el control

Para analizar un sistema preguntá:

1. ¿Quién selecciona el siguiente paso?
2. ¿Quién puede actuar sobre el entorno?
3. ¿Qué resultado recibe después de actuar?
4. ¿Quién decide continuar, ajustar o terminar?

## Formas de organizar una tarea

### Código convencional

La lógica define todas las operaciones. Una función de daño puede incluir reglas complejas y seguir siendo código convencional.

### Automatización

Ejecuta una secuencia conocida, por ejemplo validar, convertir y empaquetar recursos. Ante un error sigue una rama prevista o se detiene.

### Aplicación con un modelo

El modelo resuelve una inferencia acotada, como clasificar reportes. La aplicación conserva el control del proceso. Usar un modelo no convierte automáticamente al sistema en agente.

### Chat o asistente

La persona recibe propuestas y aplica las acciones principales: copiar código, ejecutar pruebas o decidir el siguiente pedido.

### Flujo de trabajo

Un flujo de trabajo (*workflow*) combina modelos y herramientas dentro de una estructura predeterminada. Puede repetir o enrutar pasos, pero no inventa libremente el proceso completo.

### Agente

Un agente observa información, selecciona acciones, utiliza herramientas y decide cómo continuar según los resultados:

```text
objetivo → observar → actuar → verificar
                ↑                 ↓
                └── ajustar ──────┘
```

Ante un error de carga, podría inspeccionar registros, buscar código, reproducir, modificar, probar y decidir si corrige o solicita ayuda. La secuencia concreta no está completamente predeterminada.

## Comparación

| Forma | Control principal | Siguiente paso |
|---|---|---|
| Código | Lógica programada | Código |
| Automatización | Secuencia fija | Código o persona ante excepción |
| Aplicación con modelo | Aplicación | Código |
| Asistente | Persona | Persona |
| Workflow | Diseño del flujo | Rutas previstas |
| Agente | Modelo o política de decisión, condicionado por objetivo y límites | El agente, dentro de herramientas y permisos |

No es una escala de calidad. Más autonomía no significa mejor solución.

## Autonomía gradual

Puede delegarse por dimensiones:

- explorar o recibir archivos seleccionados;
- seguir un plan o proponerlo;
- leer, escribir o ejecutar;
- realizar un paso o varios;
- detenerse por éxito, error, tiempo, costo o solicitud humana.

La autonomía adecuada es la mínima necesaria para resolver la tarea con evidencia aceptable.

## Cuándo no usar agentes

Preferí una solución más simple cuando:

- las reglas y pasos son estables;
- no existe una verificación clara;
- un error tendría alto impacto;
- se requiere latencia baja y reproducibilidad;
- no pueden limitarse permisos;
- no pueden definirse condiciones de salida.

Colisiones, inventario o apertura de puertas suelen necesitar código previsible, no un ciclo agéntico.

## Caso aplicado: una compilación rota

Un chat propone revisar una importación y una persona abre el archivo, aplica el cambio y ejecuta las pruebas. Un workflow ejecuta siempre `formato → compilación → pruebas` y publica el informe. Un agente recibe el objetivo “restaurar la compilación sin cambiar la mecánica”, inspecciona el error, localiza usos, modifica dentro del alcance y adapta su siguiente acción al resultado de las pruebas. El modelo puede ser el mismo; cambian el control, las herramientas y la realimentación.

## Límites

Las categorías pueden combinarse: un agente puede llamar a un workflow de validación y una persona puede interrumpirlo. La clasificación describe el control efectivo de una ejecución concreta, no una esencia permanente del producto.

## Errores frecuentes

- Llamar agente a cualquier invocación de un modelo.
- Delegar más permisos por prestigio técnico.
- Ocultar un flujo fijo detrás de una interfaz conversacional.
- Modificar sin recibir resultados verificables.
- Usar al propio modelo como única validación.
- Ejecutar “hasta resolver” sin límites ni escalamiento.

## Comprobación

Clasificá:

1. Importar, comprimir y empaquetar siempre en el mismo orden.
2. Proponer una descripción que una persona decide incorporar.
3. Investigar un fallo, elegir pruebas y cambiar el plan según resultados.
4. Clasificar reseñas con un modelo y guardar la categoría mediante código fijo.
5. ¿Una interfaz de chat con acceso a archivos es necesariamente un agente?

<details>
<summary>Ver orientación</summary>

1. Automatización.
2. Asistencia.
3. Agente.
4. Aplicación con modelo.
5. No. Hay que observar quién elige acciones, las ejecuta y decide continuar.

</details>

## Actividad relacionada

[Laboratorio: agente controlado](07-laboratorio-agente-controlado.md).

## Bibliografía comentada

- Poole, D. y Mackworth, A. (2023). *Artificial Intelligence: Foundations of Computational Agents*. https://artint.info/
- Wang, L. et al. (2024). “A Survey on Large Language Model Based Autonomous Agents”. https://doi.org/10.1007/s11704-024-40231-1
- Yao, S. et al. (2023). “ReAct”. https://arxiv.org/abs/2210.03629
- Anthropic. (2024). *Building Effective Agents*. Taxonomía práctica de workflows y agentes. https://www.anthropic.com/research/building-effective-agents
