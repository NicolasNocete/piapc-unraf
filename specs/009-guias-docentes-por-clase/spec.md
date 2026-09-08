# Guías docentes por clase

**Status:** Approved

## Objetivo

Mantener una guía privada reutilizable para cada clase del cronograma 2026, con preparación, secuencia, respuestas esperables y criterios de observación para la docencia.

## Valor para el usuario

- La docencia dispone de material de conducción y posibles respuestas antes de cada encuentro.
- Las guías se apoyan en el cronograma y los materiales académicos vigentes, sin mezclar material docente con el recorrido estudiantil.

## Escenarios de usuario

### US-001 - Preparación de una clase

La persona docente abre la guía correspondiente a la clase y encuentra propósito, recursos, secuencia y preguntas para conducirla.

### US-002 - Consulta de respuestas esperables

Ante una respuesta o duda frecuente, la persona docente consulta criterios de respuesta fundamentados en los recursos publicados, sin usar una clave rígida como sustituto de la evaluación.

### US-003 - Preparación semanal

Al publicar Próximas acciones para una clase, la cátedra revisa también la guía docente privada correspondiente.

## Requisitos funcionales

- **FR-001:** Debe existir una guía privada bajo `docentes/` para cada una de las 14 filas del cronograma 2026.
- **FR-002:** Cada guía debe indicar fecha, modalidad, propósito, preparación, materiales, secuencia, entregable o resultado esperado y criterios de observación.
- **FR-003:** Cada guía debe incluir preguntas de mediación y respuestas esperables o criterios para evaluarlas, derivados del cronograma y de materiales publicados existentes.
- **FR-004:** Las guías de instancias evaluativas o de entrega no deben inventar ni exponer consignas, rúbricas, calificaciones o soluciones que no estén definidas en una fuente autorizada.
- **FR-005:** El flujo de Próximas acciones debe exigir revisar o crear la guía privada de la clase objetivo, sin publicar esa guía ni modificar el catálogo estudiantil.

## Fuera de alcance

- Mostrar guías docentes en la aplicación o incorporarlas a `content/published/`.
- Generar automáticamente respuestas, calificaciones o retroalimentación para estudiantes.
- Modificar cronograma, recursos académicos, consignas o rúbricas.

## Impacto en datos

- Se agregan documentos Markdown privados en `docentes/`.
- No se crean tablas, migraciones ni datos personales.

## Seguridad y privacidad

- Las guías permanecen fuera del contenido publicado, del manifiesto y de las rutas de la aplicación.
- Las respuestas esperables no incluyen secretos, datos personales ni razonamientos privados de estudiantes.

## Ambigüedades abiertas

No quedan ambigüedades abiertas. Las respuestas esperables son criterios de mediación; las instancias evaluativas conservan sus decisiones y materiales privados.

## Criterios de aceptación

- **AC-001 (FR-001, FR-002):** Al inspeccionar `docentes/`, existen 14 guías, una por cada clase 1 a 14, y cada una contiene los apartados requeridos.
- **AC-002 (FR-003):** Cada guía contiene al menos dos preguntas de mediación con una respuesta esperable o criterio observable respaldado por materiales existentes.
- **AC-003 (FR-004):** Las guías de clases 6, 11 y 13 describen la conducción y evidencia requerida sin revelar ni fabricar una evaluación privada.
- **AC-004 (FR-005):** La skill de Próximas acciones instruye revisar o crear la guía privada de la clase objetivo y conservarla fuera de `content/published/`.
