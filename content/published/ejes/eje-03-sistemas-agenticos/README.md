---
id: eje-03
titulo: Sistemas agénticos
eje: 3
orden: 3
tipo: indice
nivel: obligatorio
audiencia: estudiante
clases: [1, 4, 8, 12]
modalidad: mixta
resultados: [RA1, RA2, RA5, RA6, RA8]
acceso: publico
version: 1
---

# Eje 3. Sistemas agénticos

## Propósito

Comprender y controlar sistemas que utilizan modelos para decidir acciones sobre un entorno. El eje estudia dónde reside el control, qué información utiliza el sistema, cómo actúa y bajo qué condiciones debe detenerse.

## Modelo central

```text
objetivo y restricciones
          ↓
modelo ← contexto y estado
          ↓
selección de acción
          ↓
herramienta → entorno
          ↓
resultado observable y verificación
          ↓
continuar, ajustar, terminar o escalar
```

## Recorrido

| Orden | Archivo | Función |
|---:|---|---|
| 1 | [01-chat-workflow-y-agente.md](01-chat-workflow-y-agente.md) | Fronteras y niveles de autonomía |
| 2 | [02-arquitectura-y-ciclo.md](02-arquitectura-y-ciclo.md) | Componentes y operación mínima |
| 3 | [03-herramientas-estado-y-realimentacion.md](03-herramientas-estado-y-realimentacion.md) | Acción, entorno, contexto y persistencia |
| 4 | [04-terminacion-planificacion-y-recuperacion.md](04-terminacion-planificacion-y-recuperacion.md) | Límites, estancamiento y escalamiento |
| 5 | [05-patrones-agenticos.md](05-patrones-agenticos.md) | Encadenamiento, enrutamiento, paralelización y evaluación |
| 6 | [06-agente-unico-y-multiagente.md](06-agente-unico-y-multiagente.md) | Criterios de arquitectura y costos de coordinación |
| 7 | [07-laboratorio-agente-controlado.md](07-laboratorio-agente-controlado.md) | Observación y ejecución verificable con OpenCode |

Las lecturas 1 a 4 forman el núcleo obligatorio para analizar y controlar un agente. Los patrones de composición se reconocen conceptualmente; la arquitectura multiagente se aborda con alcance demostrativo. El laboratorio aplica el ciclo completo sobre un proyecto real y exige evidencia observable.

## Profundidad

### Obligatorio

- Diferencia entre automatización, flujo de trabajo (*workflow*) y agente.
- Objetivo, contexto, estado, herramientas y realimentación.
- Condiciones de éxito, aborto y escalamiento.
- Selección entre código convencional, flujo de trabajo y agente único.
- Reconocimiento de patrones de composición.

### Demostrativo

- Paralelización.
- Evaluador-optimizador.
- Orquestador con trabajadores.
- Sistema multiagente real.

## Evidencia esperada

- Clasificación de un sistema por su control efectivo.
- Diagrama de componentes y ciclo.
- Inventario de herramientas y permisos.
- Contrato de terminación.
- Traza observable con validación externa.
- Decisión justificada entre flujo de trabajo, agente único y multiagente.
