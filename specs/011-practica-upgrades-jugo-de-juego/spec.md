# Práctica de upgrades y jugo de juego

**Status:** Approved

## Objetivo

Convertir la clase 8 en una práctica individual evaluable donde cada estudiante aplica el flujo de exploración, especificación, planificación, implementación, validación y revisión sobre upgrades visibles y jugables del laboratorio Guardia de Sigilo.

## Valor para el estudiante

- Practica el uso de un agente como apoyo de exploración y no como sustituto de decisiones de diseño.
- Relaciona una mecánica con feedback visual, sonoro o de cámara que haga legible su consecuencia.
- Conserva evidencia verificable de cinco intervenciones pequeñas en su repositorio individual.

## Escenarios

### US-001 - Inicio guiado de una intervención

Una persona selecciona un upgrade, usa un prompt de sólo lectura, contrasta la evidencia del repositorio y responde las preguntas de diseño antes de aceptar una spec.

### US-002 - Construcción de upgrades

Una persona completa al menos cinco upgrades distintos, cada uno con spec, plan, build, validación, evidencia y revisión del diff.

### US-003 - Consulta de la entrega

Una persona abre Próximas acciones y encuentra la guía, el laboratorio, la lectura de apoyo y el vencimiento de la práctica.

## Requisitos funcionales

- **FR-001:** El laboratorio de clase 8 debe mantener condición evaluable y requerir al menos cinco upgrades completos en el repositorio individual.
- **FR-002:** Cada upgrade debe registrar una spec con objetivo, alcance, restricciones, criterios de aceptación y evidencia prevista.
- **FR-003:** Cada upgrade debe tener un plan previo a la edición con incrementos, validaciones, riesgos y condiciones de detención.
- **FR-004:** La guía práctica debe incluir un prompt inicial breve de sólo lectura que instruya al agente a usar la herramienta `question` para resolver decisiones de diseño abiertas.
- **FR-005:** Los materiales deben ofrecer diez upgrades con propósitos distintos de mecánica, legibilidad, feedback, cámara, interacción o tensión.
- **FR-006:** La práctica debe vencer el martes 6 de octubre de 2026 a las 23:59.
- **FR-007:** Debe existir una lectura pública que explique jugo de juego, feedback y evidencia de validación sin publicar soluciones de los upgrades.
- **FR-008:** Los materiales deben diferenciar explícitamente intención de diseño, requisito, spec, prompt, plan, evidencia y vibe coding.
- **FR-009:** El prompt inicial debe recibir intención y requisito antes de pedir exploración al agente.

## Fuera de alcance

- Modificar el repositorio canónico Guardia de Sigilo.
- Publicar soluciones, archivos objetivo, rúbricas numéricas o incidencias privadas.
- Cambiar el cronograma, la interfaz, la autenticación o la base de datos.
- Exigir completar los diez upgrades.

## Impacto en datos

- Se agregan y actualizan documentos Markdown académicos y privados.
- Se regenera el manifiesto de contenidos.
- No se crean tablas, migraciones ni datos personales.

## Seguridad y privacidad

- El prompt inicial limita al agente a lectura y preguntas antes de autorizar escritura.
- Los materiales prohíben red, secretos, publicación, dependencias no autorizadas y acciones destructivas.
- La guía docente permanece en `docentes/` y fuera del contenido publicado.

## Ambigüedades abiertas

No quedan ambigüedades abiertas.

## Criterios de aceptación

- **AC-001 (FR-001, FR-006):** El laboratorio declara que la práctica es evaluable, solicita cinco upgrades mínimos y muestra el vencimiento correcto.
- **AC-002 (FR-002, FR-003):** La guía práctica ofrece estructuras de spec y plan aplicables a cada upgrade antes del build.
- **AC-003 (FR-004):** La guía práctica contiene un prompt breve que pide evidencia, restricciones, datos faltantes y uso de `question` antes de generar la spec.
- **AC-004 (FR-005, FR-007):** La lectura y la guía presentan los diez upgrades sin soluciones técnicas anticipadas y explican el rol del feedback.
- **AC-005 (FR-006):** Próximas acciones enlaza sólo contenido publicado y comunica la entrega del 6 de octubre a las 23:59.
- **AC-006 (FR-008, FR-009):** Antes de construir, una persona puede identificar qué decisión mantiene, qué documento persiste, qué pide al agente y qué evidencia deberá producir.
