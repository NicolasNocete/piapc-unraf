---
id: eje-07
titulo: Evaluación, seguridad y responsabilidad
eje: 7
orden: 7
tipo: indice
nivel: obligatorio
audiencia: estudiante
clases: [1, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14]
modalidad: mixta
resultados: [RA8, RA9, RA10, RA11]
acceso: publico
version: 1
---

# Eje 7. Evaluación, seguridad y responsabilidad

## Propósito

Proporcionar las reglas y evidencias que hacen aceptable un proceso agéntico. El eje se aplica desde la primera clase y se sintetiza en la clase 12; no debe reducirse a una exposición final sobre riesgos.

## Materiales

| Orden | Archivo | Función |
|---:|---|---|
| 1 | [01-evaluacion-y-metricas.md](01-evaluacion-y-metricas.md) | Cumplimiento, éxito, regresiones, iteraciones y costo |
| 2 | [02-seguridad-permisos-y-secretos.md](02-seguridad-permisos-y-secretos.md) | Menor privilegio, aislamiento y protección de datos |
| 3 | [03-prompt-injection.md](03-prompt-injection.md) | Inyección de instrucciones (*prompt injection*), contenido no confiable y cadena de suministro |
| 4 | [04-reversibilidad-y-supervision.md](04-reversibilidad-y-supervision.md) | Recuperación, límites de autonomía y decisiones humanas |
| 5 | [05-licencias-autoria-e-integridad.md](05-licencias-autoria-e-integridad.md) | Procedencia, declaración de IA, autoría y responsabilidad |
| 6 | [Listas de verificación (checklists)](06-checklists-operativos.md) | Controles antes, durante y después de operar |
| 7 | [07-caso-red-team.md](07-caso-red-team.md) | Laboratorio de equipo rojo (*red team*) y respuesta controlada |

**Estado:** eje desarrollado. Las siete piezas se encuentran disponibles y enlazadas.

Las [listas de verificación operativas](06-checklists-operativos.md) se usan desde la clase 4 con definiciones básicas autocontenidas y la lectura de permisos y seguridad como prerrequisito. Los conceptos avanzados de evaluación y métricas se incorporan en la clase 12 para profundizar su análisis, no como condición para el uso inicial.

## Núcleo obligatorio

- Criterios observables y pruebas.
- Permisos por capacidad.
- Protección de secretos y datos.
- Identificación de inyección de instrucciones.
- Cambios pequeños y reversibles.
- Puntos de control humano (checkpoints).
- Procedencia y licencias.
- Registro del uso de IA y decisiones humanas.

## Evidencia esperada

- Matriz de permisos.
- Plan de validación.
- Registro de intervención agéntica.
- Diferencias y pruebas.
- Registro de riesgos.
- Declaración de uso de IA.
- Plan de reversión.
- Revisión crítica final.

Una afirmación del agente, una captura aislada o un producto ejecutable sin explicación no constituyen evidencia suficiente.

## Mapa de cobertura

| Contenido del programa | Documento principal |
|---|---|
| Tareas, casos, criterios, evidencia y métricas | [Evaluación y métricas](01-evaluacion-y-metricas.md) |
| Evaluación determinista, humana, asistida y comparación controlada | [Evaluación y métricas](01-evaluacion-y-metricas.md) |
| Menor privilegio, aislamiento, secretos, datos y repositorios privados | [Permisos, aislamiento y protección](02-seguridad-permisos-y-secretos.md) |
| Inyección directa/indirecta, contenido no confiable y cadena de suministro | [Inyección y cadena de suministro](03-prompt-injection.md) |
| Reversibilidad, confirmaciones, puntos de control humano y riesgos de autonomía | [Reversibilidad y supervisión](04-reversibilidad-y-supervision.md) |
| Propiedad intelectual, licencias, procedencia y declaración de IA | [Procedencia, autoría e integridad](05-licencias-autoria-e-integridad.md) |
| Integridad académica, autoría, trazabilidad y responsabilidad | [Procedencia, autoría e integridad](05-licencias-autoria-e-integridad.md) |
| Aplicación integral y controles prácticos | [Listas de verificación](06-checklists-operativos.md) y [laboratorio de equipo rojo](07-caso-red-team.md) |
