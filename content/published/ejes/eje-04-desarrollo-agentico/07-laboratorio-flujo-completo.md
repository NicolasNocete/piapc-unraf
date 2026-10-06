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
version: 3
disponible_desde: "2026-09-30"
disponible_hasta: "2026-10-06"
---

# Laboratorio de intervención agéntica completa

**Consigna completa y entrega de los cinco upgrades — 6/10/2026, 23:59.** En esta misma página tenés el catálogo, el procedimiento, los prompts orientativos y el entregable. Con tu sesión iniciada, el box **«Entrega»** aparece al final de la consigna: ahí registrás la URL del repositorio y el commit final. La guía complementaria no es una segunda actividad ni una segunda entrega.

## Situación problemática

Cada estudiante elige al menos cinco upgrades distintos del catálogo de esta consigna y los desarrolla en su repositorio individual. Debe conducir cada intervención sin aceptar código por autoridad del agente: explorar, especificar, planificar, modificar incrementalmente, validar, depurar si falla, revisar diferencias y registrar decisiones.

Los upgrades abarcan conducta expresiva, feedback, cámara, interacción y tensión. No se publica ni despliega el resultado.

## Objetivo

Producir al menos cinco mejoras revisables y evidencia suficiente para que otra persona pueda decidir si integrarlas. El aprendizaje evaluado es el proceso transferible, no el uso de una interfaz particular.

## Catálogo: elegí al menos cinco upgrades distintos

Este es el mismo catálogo de la actividad ya asignada; no agrega mejoras obligatorias nuevas. Elegí cinco y completá el ciclo de trabajo para cada una. No cuenta repetir el mismo efecto cinco veces.

| N.º | Upgrade | Qué debe aportar |
|---:|---|---|
| 1 | Patrulla con pausas y mirada direccional | Anticipación visual y ritmo del recorrido. |
| 2 | Cono de visión visible y reactivo | Claridad de alcance y amenaza. |
| 3 | Animaciones por estado y transición | Representación coherente de la conducta. |
| 4 | Impacto visual extremo de alerta | Shake, flash, zoom, partículas o respuesta equivalente. |
| 5 | Cámara dinámica de tensión | Encuadre útil durante un momento de riesgo. |
| 6 | Cobertura y ruptura de línea de visión | Una decisión activa de sigilo. |
| 7 | Distractores sonoros interactivos | Oportunidad y planificación para el jugador. |
| 8 | Medidor de alerta y estados del nivel | Consecuencias visibles del peligro. |
| 9 | Escape de último momento | Feedback de alivio ante una maniobra ajustada. |
| 10 | Puertas, atajos o rutas bloqueables | Transformación del espacio y la estrategia. |

**Ejemplo de selección:** 1, 2, 4, 7 y 10 combinan conducta, legibilidad, feedback, interacción y espacio. Es una orientación, no una combinación obligatoria. Cada selección debe conservar alcance, criterio y evidencia propios.

## Recursos disponibles

- [Laboratorio Guardia de Sigilo](https://github.com/NicolasNocete/piapc-guardia-sigilo) o proyecto que cumpla su contrato de equivalencia.
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

Antes de implementar cada upgrade, completá esta puerta de trabajo:

```text
intención declarada → requisito verificable → spec revisada
→ plan aprobado → build → evidencia
```

Un prompt no reemplaza la spec. Si una propuesta del agente parece correcta pero no tiene alcance, criterio o evidencia, todavía no puede aceptarse.

1. **Establecer el punto inicial.** Registrá fecha, versión, rama, estado de Git, entorno y cambios preexistentes. Ejecutá la validación de referencia o documentá por qué no es posible.
2. **Explorar.** Mapeá entradas, dominio, integración, pruebas, configuración e instrucciones. Seguí definiciones y usos relacionados con la incidencia. Separá evidencia, supuestos y preguntas.
3. **Preparar contexto.** Justificá cada fuente seleccionada, respetá jerarquía global/proyecto/tarea y sintetizá hallazgos con rutas. Actualizá la síntesis cuando una prueba contradiga un supuesto.
4. **Especificar.** Definí problema, objetivo, alcance, fuera de alcance, restricciones, casos límite, criterios de aceptación y prueba prevista para cada uno. Consultá decisiones de diseño abiertas.
5. **Planificar.** Dividí el trabajo en incrementos con archivos previstos, validación, riesgo y condición de detención.
6. **Implementar.** Realizá un incremento por vez. Después de cada uno, ejecutá la comprobación más cercana y revisá el diff. Rechazá cambios no justificados.
7. **Depurar por evidencia.** Si aparece un fallo, conservá una reproducción mínima; formulá una hipótesis con predicción; instrumentá sólo lo necesario; corregí la causa mínima y repetí el caso.
8. **Validar.** Ejecutá formato comprobado, lint o análisis estático, compilación, prueba enfocada, suite y producto según corresponda. Registrá comandos, resultados y omisiones.
9. **Revisar.** Contrastá criterios con evidencia, arquitectura con cambios y alcance con archivos. Identificá regresiones, riesgos, instrumentación residual y efectos no cubiertos por Git.
10. **Cerrar.** Registrá estado final, duración, iteraciones, decisiones humanas y recomendación: integrar, corregir, revertir o descartar. Repetí el ciclo para cinco upgrades distintos.

### Cómo armar cada paquete

Conservá una carpeta por upgrade en tu repositorio individual:

```text
docs/upgrades/
  01-nombre-upgrade/
    spec.md
    plan.md
    evidencia.md
  02-nombre-upgrade/
    spec.md
    plan.md
    evidencia.md
  ... hasta completar al menos cinco upgrades distintos
```

| Documento | Qué incluir |
|---|---|
| `spec.md` | Problema, intención, objetivo, alcance, fuera de alcance, restricciones, caso normal, caso límite, criterios de aceptación y evidencia prevista. |
| `plan.md` | Incrementos pequeños, archivos previstos, validación, riesgos y condiciones para detenerse. |
| `evidencia.md` | Versión inicial/final, comandos y resultados, build/ejecución, registro breve, diff, matriz criterio-evidencia y decisión humana. |

El registro y la revisión pueden quedar dentro de `evidencia.md`; no necesitás duplicarlos en otro informe.

### Prompt 1 — Explorar y preparar la spec

Copiá este prompt para cada upgrade y completá los tres campos de diseño:

```text
Trabajamos sobre mi repositorio individual de Guardia de Sigilo.
Upgrade seleccionado: [NOMBRE DEL CATÁLOGO].
Mi intención de diseño: [QUÉ EXPERIENCIA QUIERO PRODUCIR].
Requisito inicial: [QUÉ DEBE OCURRIR DE FORMA OBSERVABLE].

Explorá sólo en lectura README, AGENTS, arquitectura, código y pruebas
relacionados. No modifiques archivos, ejecutes comandos ni instales dependencias.
Mostrá qué existe, qué se reutiliza y qué restricciones aplican, con rutas
y símbolos. Separá evidencia, supuestos y preguntas.
Consultame las decisiones de diseño que no puedas comprobar; usá question
si tu herramienta lo permite. No las inventes.
Con mis respuestas, redactá una spec breve con objetivo, alcance, exclusiones,
restricciones, caso normal, caso límite, criterios y evidencia prevista.
No implementes todavía; esperá mi revisión.
```

**Ejemplo para completar:** upgrade 4; intención «que la detección resulte clara»; requisito «ante una alerta se activa un shake único, termina y vuelve a la posición normal en menos de un segundo». La spec delimita el disparador y comprueba restauración y repetición; no cambia detección ni navegación sólo para producir un efecto visual.

Leé la respuesta, contrastá al menos dos afirmaciones con el repositorio y revisá la spec. Guardala antes de autorizar código. Un prompt como «poné un shake copado» no reemplaza ese contrato.

### Prompt 2 — Planificar e implementar un incremento

Primero pedí el plan:

```text
La spec de [CARPETA DEL UPGRADE] está revisada.
Proponé un plan breve por incrementos: archivos reales, criterio a comprobar,
comando/prueba y riesgo. Conservá arquitectura y cambios anteriores.
No implementes ni agregues dependencias. Esperá mi aprobación del plan.
```

Después de revisarlo, autorizá un solo incremento:

```text
Apruebo el plan y autorizo únicamente el incremento [NÚMERO].
Modificá sólo sus archivos previstos y respetá la spec del upgrade.
Ejecutá la validación acordada, mostrá el resultado y el diff.
Si falta una decisión, permiso o archivo fuera del plan, consultame.
No crees commits ni publiques automáticamente. No avances al siguiente incremento.
```

### Prompt 3 — Validar y cerrar el upgrade

```text
Contrastá la implementación con cada criterio de la spec de [CARPETA].
Con los comandos autorizados, verificá build, caso normal, caso límite y
regresiones relevantes. Devolvé criterio → comprobación → resultado real.
Si cambia cámara, animación, interfaz o feedback, indicá una reproducción
visual o telemetría que compruebe activación, finalización y estado posterior.
Revisá el diff y registrá límites y decisiones humanas en evidencia.md.
No inventes pruebas exitosas ni cambies criterios para acomodar un fallo.
No publiques ni crees commits sin mi autorización.
```

Revisá los resultados personalmente y decidí integrar, corregir, revertir o descartar. Repetí este recorrido para los cinco upgrades. La [guía autogestionada](guia-practica-autogestionada-opencode-guardia.md) ofrece contexto adicional, pero esta consigna reúne lo necesario para completar y entregar el trabajo.

## Entregable

Un portafolio con al menos cinco paquetes de upgrade. Cada paquete incluye:

- spec y plan versionados;
- build, prueba o ejecución reproducible;
- registro cronológico resumido;
- diff o referencia de cambios autorizados;
- matriz criterio-evidencia y salidas relevantes;
- evidencia visual o telemetría cuando modifica cámara, animación, interfaz o feedback;
- revisión final con limitaciones y decisión humana.

Entregá la URL del repositorio individual y el commit final en la plataforma antes del **martes 6 de octubre de 2026 a las 23:59**. Cada artefacto debe identificar la misma versión del proyecto. No se entregan secretos ni razonamientos internos privados.

### Registrar en el box «Entrega» de esta página

Con la sesión iniciada como estudiante, bajá al final de esta consigna y completá **«Tu entrega»**. No entregues en una página de lectura o en la guía de apoyo. Copiá esta estructura, completala y presioná **«Registrar entrega»**:

```text
Repositorio individual: [URL]
Commit final: [HASH]

Upgrades completados:
1. [NOMBRE] — [RUTA DE LA CARPETA CON SPEC, PLAN Y EVIDENCIA]
2. [NOMBRE] — [RUTA]
3. [NOMBRE] — [RUTA]
4. [NOMBRE] — [RUTA]
5. [NOMBRE] — [RUTA]

Validación/build: [COMANDOS Y RESULTADOS; RUTA DE EVIDENCIA]
Evidencia visual o telemetría: [RUTAS/ENLACES CUANDO CORRESPONDA]
Limitaciones: [RESUMEN CONCRETO]
```

Verificá que la página muestre tu entrega registrada. El box admite texto y enlaces; el código, las specs y las pruebas deben estar en el repositorio/commit que indicás. Esta es **una única entrega de los cinco upgrades**, independiente de la práctica nueva de navegación que se entrega el 14/10.

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

## Errores frecuentes

- Tratar el prompt como documento de requisitos.
- Aceptar una propuesta del agente sin contrastar rutas, símbolos o supuestos.
- Implementar un efecto visual antes de definir qué regla comunica.
- Considerar una apariencia correcta como sustituto de build, prueba o revisión.

## Alternativa sin modelos pagos

Puede utilizarse un agente con modelo local o gratuito. Si no hay un modelo adecuado, la cátedra proveerá un registro de intervención con propuestas y resultados de herramientas: el estudiante deberá seleccionar contexto, revisar los pasos, ejecutar validaciones, rechazar cambios indebidos y producir la decisión final. Se evalúan los mismos resultados.

## Publicación de la solución

Las soluciones o fallos preparados se publicarán sólo después del cierre de la actividad y por decisión docente. Hasta entonces no deben incorporarse al repositorio estudiantil ni compartirse entre grupos.

## Bibliografía comentada

- Yang, J. et al. (2024). “SWE-agent”. Interfaz y trayectorias de resolución en repositorios. https://arxiv.org/abs/2405.15793
- Jimenez, C. et al. (2024). “SWE-bench”. Tareas reales y evaluación mediante evidencia ejecutable. https://arxiv.org/abs/2310.06770
- OpenCode. *Documentación oficial*. Consulta operativa si se usa como laboratorio; no es necesaria para justificar el flujo. https://opencode.ai/docs/ (consulta: 4 de agosto de 2026).
