---
id: eje-05
titulo: Inteligencia artificial y comportamiento en videojuegos
eje: 5
orden: 5
tipo: indice
nivel: obligatorio
audiencia: estudiante
clases: [9, 10, 11]
modalidad: mixta
resultados: [RA7, RA8, RA11]
acceso: publico
version: 2
---

# Eje 5. IA y comportamiento en videojuegos

## Propósito

Seleccionar, implementar y evaluar técnicas de comportamiento según las necesidades del diseño y la experiencia buscada para el jugador.

La implementación principal se concentra en **A\*** y **máquinas de estados**. Percepción, seguimiento de caminos, comportamientos de movimiento y locomoción se integran como capas diferenciadas. Los árboles de comportamiento (*behavior trees*), los sistemas de utilidad (*Utility AI*) y GOAP se desarrollan mediante modelos y trazas comparativas.

Los contenidos nuevos se trabajan en las clases 9 (búsqueda y navegación) y 10 (patrones de comportamiento). Los ejercicios de búsqueda de la clase 9 forman parte de la lectura y actividad de A*, no del laboratorio combinado. El laboratorio público de A* y FSM se realiza en la clase 10, cuando ambas lecturas están disponibles. La clase 11 corresponde al segundo parcial práctico, cuya consigna y criterios se mantienen en el espacio docente privado; la clase 13 corresponde únicamente a la entrega del trabajo práctico final.

## Recorrido completo

| Orden | Documento | Función |
|---:|---|---|
| 1 | [Búsqueda de caminos y A*](01-busqueda-y-a-star.md) | Estados, acciones, objetivos, costos, restricciones, grafos, BFS, DFS y heurísticas |
| 2 | [Percepción, seguimiento y movimiento](02-percepcion-navegacion-y-steering.md) | Estado observado, memoria, rutas, steering y locomoción |
| 3 | [FSM y HFSM](03-maquinas-de-estados.md) | Estados, eventos, transiciones, guardas, invariantes y pruebas |
| 4 | [Árboles de comportamiento](04-behavior-trees.md) | Nodos, composición, prioridad, estado y reutilización |
| 5 | [Sistemas de utilidad](05-utility-ai.md) | Alternativas, normalización, curvas, puntuación y selección |
| 6 | [Planificación orientada a objetivos y GOAP](06-goap.md) | Precondiciones, efectos, costos, planes y replanificación |
| 7 | [Selección e intención de diseño](07-seleccion-e-intencion-de-diseno.md) | Comparación técnica, experiencia y uso de modelos generativos |
| 8 | [Caso integrador del guardia](08-caso-integrador-guardia.md) | Contratos, traza completa, diagnóstico y casos límite |
| 9 | [Laboratorio de A* y FSM](09-laboratorio-a-star-y-fsm.md) | Implementación asistida, pruebas y revisión humana |

**Estado:** recorrido desarrollado completo.

## Mapa de capas

```text
mundo → percepción → memoria → decisión → búsqueda → seguimiento
      → steering → locomoción → mundo
```

1. La percepción limita la información disponible.
2. La arquitectura de decisión selecciona una conducta.
3. La búsqueda produce una ruta.
4. El seguimiento consume esa ruta y selecciona puntos.
5. Los comportamientos de movimiento calculan velocidades o aceleraciones.
6. La locomoción aplica física, colisiones y animación.

## Cobertura del programa

| Contenido | Documentos |
|---|---|
| Formulación, grafos, BFS, DFS, A* y heurísticas | 1 |
| Percepción, caminos, steering y locomoción | 2 y 8 |
| FSM y HFSM | 3, 8 y 9 |
| Árboles de comportamiento (*behavior trees*) | 4 |
| Sistemas de utilidad (*Utility AI*) | 5 |
| GOAP | 6 |
| Comparación: previsibilidad, expresividad, rendimiento, depuración, diseño, legibilidad, dificultad y experiencia | 7 |
| Agentes de desarrollo frente a agentes internos y límites de los modelos generativos durante la ejecución (*runtime*) | 7 y 9 |
| Ejemplos, trazas, límites, errores y comprobación | 1 a 8 |
| Implementación, evidencia y revisión | 8 y 9 |

## Evidencia esperada

- Traza comparada de BFS, DFS y A*.
- Implementación o refactorización de A* y una FSM.
- Tabla de transiciones con eventos, guardas, prioridades e invariantes.
- Pruebas de secuencias, casos límite y recuperación.
- Trazas explicativas de BT, sistemas de utilidad y GOAP.
- Selección justificada desde rendimiento, autoría, legibilidad y experiencia.
- Ejecución reproducible, diferencias revisadas y declaración del uso de IA.
