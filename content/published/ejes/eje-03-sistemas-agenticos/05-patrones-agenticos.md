---
id: eje-03-patrones-agenticos
titulo: Patrones de composición agéntica
eje: 3
orden: 5
tipo: lectura
nivel: obligatorio
audiencia: estudiante
clases: [8, 12]
modalidad: mixta
duracion_minutos: 24
resultados: [RA2, RA5, RA8, RA9]
prerrequisitos: [eje-03-terminacion-planificacion-y-recuperacion]
evaluable: true
acceso: publico
version: 1
---

# Patrones de composición agéntica

## Propósito

Reconocer cinco patrones de composición, sus controles y los problemas de videojuegos para los que resultan apropiados.

## Por qué importa

Los patrones permiten separar una tarea sin convertir cada paso en un “agente”. La estructura explícita suele ser más verificable y económica que delegar todo a un ciclo abierto.

## Modelo mental

Un patrón describe **cómo circulan trabajo y resultados**. Puede implementarse con código, modelos, workflows o agentes. Usar varias invocaciones del mismo modelo no crea necesariamente un sistema multiagente.

## Encadenamiento

```text
entrada → generar → validar formato → transformar → salida
```

Cada paso recibe la salida anterior. Sirve cuando las etapas y contratos son estables. Ejemplo: resumir reportes de pruebas, convertirlos a incidencias estructuradas y verificar campos antes de guardarlos.

El error temprano se propaga. Deben validarse contratos entre etapas y detener la cadena si una precondición falla.

## Enrutamiento

```text
solicitud → clasificador → código | arte | diseño | soporte humano
```

Selecciona una ruta especializada. En un estudio puede dirigir un reporte de colisión al equipo técnico y uno de legibilidad al diseño de niveles. Conviene incluir confianza, ruta por defecto y posibilidad de reclasificación humana. Una categoría incorrecta puede ocultar el problema.

## Paralelización

```text
             → revisión de pruebas ──┐
cambio base  → revisión de seguridad ├→ combinar
             → revisión de rendimiento┘
```

Ejecuta subtareas independientes o varias evaluaciones del mismo artefacto. Reduce latencia sólo si hay independencia y recursos disponibles. Requiere una regla de combinación y manejo de respuestas parciales. Dos trabajadores que editan el mismo archivo pueden producir conflictos.

## Orquestador-trabajadores

```text
objetivo → orquestador → subtarea A → resultado A
                       → subtarea B → resultado B
        ← integración y verificación
```

El orquestador descompone dinámicamente, asigna trabajo y sintetiza. Es útil cuando no se conocen de antemano todas las subtareas, por ejemplo analizar un fallo que puede atravesar dominio, escena y recursos. Cada trabajador necesita alcance, entradas, entregable y presupuesto. El orquestador debe verificar resultados; concatenarlos no es integrar.

## Evaluador-optimizador

```text
solución → evaluación con criterios → observaciones → nueva solución
   ↑                                                ↓
   └──────────── hasta umbral o presupuesto ───────┘
```

Itera cuando existen criterios claros y la mejora es observable: ajustar un tutorial para cumplir longitud, tono y datos obligatorios, o refinar una ruta hasta un presupuesto de costo. El evaluador puede ser código, pruebas, una persona o un modelo calibrado. Para corrección funcional, un modelo evaluador no reemplaza ejecución y pruebas.

## Selección rápida

| Situación | Patrón inicial |
|---|---|
| Etapas conocidas y dependientes | Encadenamiento |
| Categorías con procesos distintos | Enrutamiento |
| Análisis independientes | Paralelización |
| Subtareas desconocidas hasta explorar | Orquestador-trabajadores |
| Mejora iterativa con criterio graduable | Evaluador-optimizador |

Los patrones pueden combinarse, pero cada combinación agrega estados de error, costo y observabilidad. Primero se intenta la estructura más simple.

## Caso aplicado: revisión de una mecánica

Para revisar una nueva persecución, un workflow ejecuta compilación y pruebas en cadena. Si pasan, enruta el cambio a revisiones de jugabilidad y rendimiento en paralelo. Un evaluador compara telemetría contra “detección entre 200 y 400 ms” y propone ajuste hasta dos veces. La integración final sigue siendo humana. No hace falta un orquestador dinámico porque etapas y criterios ya se conocen.

## Límites

- Paralelizar aumenta consumo aunque reduzca tiempo de pared.
- Enrutadores necesitan ejemplos fuera de distribución y una salida segura.
- Un evaluador mal alineado optimiza una métrica equivocada.
- Orquestar tareas pequeñas puede costar más que resolverlas.
- Salidas concurrentes requieren procedencia, aislamiento y resolución de conflictos.

## Errores frecuentes

- Llamar multiagente a cualquier cadena de prompts.
- Paralelizar tareas que dependen entre sí.
- Enrutar sin categoría desconocida.
- Dar a trabajadores el objetivo completo y permisos irrestrictos.
- Iterar evaluador-optimizador sin umbral ni máximo.
- Aceptar consenso de modelos como prueba factual.

## Comprobación

1. ¿Qué patrón corresponde a etapas fijas dependientes?
2. ¿Cuándo la paralelización no reduce costo?
3. ¿Qué debe entregar un orquestador a cada trabajador?
4. ¿Por qué un evaluador basado en modelo no basta para validar código?

<details>
<summary>Ver orientación</summary>

1. Encadenamiento.
2. En general ejecuta más trabajo; puede reducir latencia, no consumo total.
3. Alcance, entradas, entregable, herramientas y presupuesto.
4. Su juicio puede ser plausible pero incorrecto; hacen falta pruebas y ejecución.

</details>

## Actividad relacionada

[Laboratorio: agente controlado](07-laboratorio-agente-controlado.md).

## Bibliografía comentada

- Anthropic. (2024). *Building Effective Agents*. Presentación práctica de los cinco patrones estudiados. https://www.anthropic.com/research/building-effective-agents
- OpenAI. (2025). *A Practical Guide to Building Agents*. Orquestación, herramientas y guardas. https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/
- Wang, L. et al. (2024). “A Survey on Large Language Model Based Autonomous Agents”. Perspectiva académica para ampliar la taxonomía. https://doi.org/10.1007/s11704-024-40231-1
