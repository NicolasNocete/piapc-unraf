---
id: eje-04-laboratorio-flujo-completo
titulo: Laboratorio de intervención agéntica completa
eje: 4
orden: 7
tipo: laboratorio
nivel: obligatorio
audiencia: estudiante
clases: [8]
modalidad: mixta
duracion_minutos: 120
resultados: [RA3, RA4, RA5, RA8, RA9, RA11]
prerrequisitos: [eje-04-infraestructura-de-validacion, eje-04-observabilidad-y-trazabilidad]
evaluable: true
acceso: publico
version: 1
---

# Laboratorio de intervención agéntica completa

## Situación problemática

El equipo recibe una incidencia acotada sobre el comportamiento del guardia. Debe conducir una intervención completa sin aceptar código por autoridad del agente: explorar, especificar, planificar, modificar incrementalmente, validar, depurar si falla, revisar diferencias y registrar decisiones.

El docente asignará una incidencia compatible con el estado del proyecto, por ejemplo una transición temporal, un caso límite de percepción o una regresión preparada. No se publica ni despliega el resultado.

## Objetivo

Producir una corrección revisable y evidencia suficiente para que otra persona pueda decidir si integrarla. El aprendizaje evaluado es el proceso transferible, no el uso de una interfaz particular.

## Recursos disponibles

- [Laboratorio Guardia de Sigilo](../../../laboratorios/phaser/guardia-sigilo/README.md) o proyecto que cumpla su contrato de equivalencia.
- [Lectura de repositorios y contexto](01-repositorios-y-contexto.md).
- [Especificaciones y planes](02-especificaciones-y-planes.md).
- [Implementación, Git y reversibilidad](03-implementacion-git-y-reversibilidad.md).
- [Validación y depuración](04-pruebas-depuracion-y-revision.md).
- [Infraestructura de validación](05-infraestructura-de-validacion.md).
- [Observabilidad y trazabilidad](06-observabilidad-y-trazabilidad.md).
- Plantillas de [auditoría](../../plantillas/03-auditoria-repositorio.md), [especificación](../../plantillas/01-especificacion.md), [plan](../../plantillas/02-plan.md), [registro](../../plantillas/05-registro-intervencion.md) y [evidencia](../../plantillas/06-evidencia-pruebas.md).

## Restricciones

- Trabajar sólo sobre el alcance asignado y conservar cambios preexistentes.
- Leer las instrucciones, especificación y arquitectura del proyecto antes de editar.
- No agregar dependencias, publicar, desplegar, eliminar ni crear commits sin autorización.
- No leer ni registrar credenciales o datos privados.
- Mantener el dominio independiente del motor.
- Usar cambios pequeños y revisar el diff después de cada incremento.
- Detenerse ante ambigüedad de diseño, conflicto concurrente o permiso faltante.
- Declarar herramienta y modelo cuando estén disponibles; OpenCode es una opción, no un requisito conceptual.

## Procedimiento

1. **Establecer el punto inicial.** Registrá fecha, versión, rama, estado de Git, entorno y cambios preexistentes. Ejecutá la validación de referencia o documentá por qué no es posible.
2. **Explorar.** Mapeá entradas, dominio, integración, pruebas, configuración e instrucciones. Seguí definiciones y usos relacionados con la incidencia. Separá evidencia, supuestos y preguntas.
3. **Preparar contexto.** Justificá cada fuente seleccionada, respetá jerarquía global/proyecto/tarea y sintetizá hallazgos con rutas. Actualizá la síntesis cuando una prueba contradiga un supuesto.
4. **Especificar.** Definí problema, objetivo, alcance, fuera de alcance, restricciones, casos límite, criterios de aceptación y prueba prevista para cada uno. Consultá decisiones de diseño abiertas.
5. **Planificar.** Dividí el trabajo en incrementos con archivos previstos, validación, riesgo y condición de detención.
6. **Implementar.** Realizá un incremento por vez. Después de cada uno, ejecutá la comprobación más cercana y revisá el diff. Rechazá cambios no justificados.
7. **Depurar por evidencia.** Si aparece un fallo, conservá una reproducción mínima; formulá una hipótesis con predicción; instrumentá sólo lo necesario; corregí la causa mínima y repetí el caso.
8. **Validar.** Ejecutá formato comprobado, lint o análisis estático, compilación, prueba enfocada, suite y producto según corresponda. Registrá comandos, resultados y omisiones.
9. **Revisar.** Contrastá criterios con evidencia, arquitectura con cambios y alcance con archivos. Identificá regresiones, riesgos, instrumentación residual y efectos no cubiertos por Git.
10. **Cerrar.** Registrá estado final, duración, iteraciones, tokens y costos disponibles, decisiones humanas y recomendación: integrar, corregir, revertir o descartar.

## Entregable

Un paquete con:

- auditoría y paquete de contexto justificado;
- especificación y plan versionados;
- registro cronológico resumido;
- diff o referencia de cambios autorizados;
- matriz criterio-evidencia y salidas relevantes;
- revisión final con limitaciones, métricas y decisión humana.

Cada artefacto debe identificar la misma versión del proyecto. No se entregan secretos ni razonamientos internos privados.

## Evidencia válida

- estado y diferencias de Git;
- comandos reproducibles con código de salida;
- pruebas automatizadas y ejecución del producto;
- logs de instrumentación relacionados con una hipótesis;
- rutas y fragmentos necesarios para justificar decisiones;
- registro de acciones, resultados, autorizaciones y correcciones humanas.

No alcanzan la afirmación del agente, una captura aislada, código sin ejecutar ni una prueba que no se vincula con un criterio.

## Criterios de evaluación

| Criterio | Evidencia esperada |
|---|---|
| Comprensión del repositorio y contexto económico | Auditoría, fuentes y supuestos actualizados |
| Especificación verificable | Alcance completo y relación criterio-prueba |
| Plan e implementación incremental | Pasos, diffs acotados y verificaciones intermedias |
| Validación y depuración | Reproducción, hipótesis cuando aplica y controles completos |
| Git y reversibilidad | Punto inicial/final, cambios preservados y recuperación explicada |
| Observabilidad | Acciones, resultados, duración, iteraciones y consumo disponible |
| Revisión crítica y transferencia | Decisiones humanas, límites y equivalentes fuera de la herramienta |

Un producto ejecutable con trazabilidad insuficiente no satisface el laboratorio.

## Alternativa sin modelos pagos

Puede utilizarse un agente con modelo local o gratuito. Si no hay un modelo adecuado, la cátedra proveerá un registro de intervención con propuestas y resultados de herramientas: el estudiante deberá seleccionar contexto, revisar los pasos, ejecutar validaciones, rechazar cambios indebidos y producir la decisión final. Se evalúan los mismos resultados.

## Publicación de la solución

Las soluciones o fallos preparados se publicarán sólo después del cierre de la actividad y por decisión docente. Hasta entonces no deben incorporarse al repositorio estudiantil ni compartirse entre grupos.

## Bibliografía comentada

- Yang, J. et al. (2024). “SWE-agent”. Interfaz y trayectorias de resolución en repositorios. https://arxiv.org/abs/2405.15793
- Jimenez, C. et al. (2024). “SWE-bench”. Tareas reales y evaluación mediante evidencia ejecutable. https://arxiv.org/abs/2310.06770
- OpenCode. *Documentación oficial*. Consulta operativa si se usa como laboratorio; no es necesaria para justificar el flujo. https://opencode.ai/docs/ (consulta: 4 de agosto de 2026).
