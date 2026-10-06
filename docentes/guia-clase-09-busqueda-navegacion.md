# Guía docente: clase 9 - Búsqueda, navegación y movimiento

**Fecha:** 7 de octubre de 2026<br>
**Modalidad:** virtual asincrónica

## Propósito

Comparar búsqueda en grafos, heurísticas y seguimiento de caminos para justificar decisiones de navegación en videojuegos.

## Preparación previa

1. Revisar la lectura de búsqueda y A*, percepción, navegación y movimiento.
2. Preparar un grafo pequeño para que la traza de búsqueda sea comprobable.
3. Revisar el [apunte integrado](../content/published/ejes/eje-05-ia-videojuegos/10-teoria-navegacion-y-comportamiento.md) y la [práctica guiada](../content/published/ejes/eje-05-ia-videojuegos/11-practica-guiada-navegacion.md), con specs y fixtures prearmados.
4. Publicar el aviso de campus de `aviso-campus-clase-09-entregas.md` y comprobar que Próximas acciones conserva el enlace a la entrega del 6/10.

## Materiales

- Búsqueda de caminos y A*.
- Percepción, seguimiento de caminos y movimiento.
- Checklist operativo de evidencia.
- Apunte integrado: Parte I para esta semana; Parte II para el encuentro presencial del 14/10.
- Guía preensamblada con spec común y una variante A/B/C.

## Secuencia

1. Distinguir estado, acción, costo y objetivo en un grafo.
2. Comparar BFS, DFS y A* con una misma situación.
3. Separar cálculo de ruta de seguimiento y movimiento del personaje.

### Trabajo asincrónico asignado

No se convoca un encuentro presencial ni una sesión sincrónica el 7/10. El estudiante trabaja a su ritmo con lectura, ejercicios y resolución práctica:

1. Leer Parte I del apunte y responder sus preguntas de comprobación como autoevaluación.
2. Seguir los ocho pasos de la guía (estimación 180 minutos de práctica, distribuibles en la semana).
3. Comparar BFS/A*, explicar DFS y completar Dijkstra; estos ejercicios quedan dentro de evidencia.md, sin entrega separada.
4. Copiar y adaptar la spec común más un solo anexo; implementar/configurar, validar y revisar una variante.
5. Preparar entrega conjunta para el 14/10 y leer Parte II antes de la clase presencial.

Resultados asociados: RA3, RA4, RA5, RA7, RA8 y RA11. No exigir implementación de DFS/Dijkstra, dos variantes, editor ni una FSM nueva dentro de esta entrega.

## Preguntas y respuestas esperables

- ¿A* siempre es mejor que BFS? No: depende de costos, calidad de la heurística, tamaño del espacio y necesidad del problema.
- ¿Una heurística admisible puede sobreestimar el costo? No: para ser admisible no debe sobreestimarlo.

## Entregable o resultado esperado

Resolución argumentada de un caso de navegación con traza o representación del recorrido.

La entrega de navegación definida es única, en la clase del **14/10/2026**: `docs/practica-navegacion/spec.md`, `plan.md`, `evidencia.md`, URL y commit final. No tiene entregas intermedias. La hora no se inventa; se conserva la fecha explícitamente acordada con el profesor, sin adelantarla al 13/10 por inferencia editorial.

Es independiente de los cinco upgrades que vencen el **6/10 a las 23:59**. Conservar el recordatorio de ambos trabajos sin pedir nuevamente los upgrades el 14/10.

## Criterios de observación docente

- Justifica la elección del algoritmo con propiedades del caso.
- Diferencia ruta planificada y movimiento ejecutado.
- Explicita costos, obstáculos y criterio de parada.
- Adapta una spec prearmada con evidencia del repositorio; no acepta afirmaciones del agente como prueba.
- Verifica caso normal, límite y consumidor real de la variante.
- Conserva contrato anterior y cambios previos; registra validación y diff.

## Recuperación en la clase del 14/10

Recuperar las comparaciones y decisiones antes de introducir patrones. Esperar costo 4 en fixture libre, 6 en rodeo, 16 por franja penalizada e inaccesibilidad con barrera completa. Distinguir restricción de penalización y ruta de movimiento. Luego continuar el laboratorio de comportamiento previsto para clase 10; no evaluarlo como parte de una entrega realizada antes de enseñar esos contenidos.
