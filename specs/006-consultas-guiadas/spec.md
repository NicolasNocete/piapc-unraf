# Consultas guiadas sobre el sitio

**Status:** Approved

## Objetivo

Incorporar una sección de consultas guiadas con una experiencia conversacional para que las personas puedan formular preguntas sobre la materia y recibir respuestas basadas exclusivamente en el contenido académico publicado por el sitio y sus referencias asociadas.

## Valor para el usuario

- El alumnado obtiene orientación inmediata para estudiar y ubicar los materiales pertinentes de la materia.
- Cada respuesta permite reconocer el material o la referencia que la fundamenta, en lugar de presentar una respuesta sin procedencia.
- La cátedra ofrece una ayuda de consulta acotada al contenido publicado sin que sustituya la lectura, la evaluación docente ni las decisiones académicas.

## Actores

- **Estudiante:** persona que consulta contenidos de la materia mediante la sección conversacional.
- **Profesor:** integrante de la cátedra que mantiene o publica el contenido académico y sus referencias.
- **Cátedra:** responsable de definir el alcance pedagógico y las reglas de uso de la sección.

## Escenarios de usuario

### US-001 - Pregunta sobre un contenido publicado

Una persona formula una pregunta sobre un concepto, actividad o material de la materia y recibe una respuesta clara, limitada a la información disponible en el sitio.

### US-002 - Consulta con procedencia verificable

Una persona recibe una respuesta y puede identificar los contenidos y referencias del sitio que la respaldan para continuar su lectura.

### US-003 - Pregunta fuera del material disponible

Una persona pregunta por información que no está respaldada por el contenido ni las referencias del sitio y recibe una indicación explícita de que la sección no puede responderla, junto con orientación hacia los materiales disponibles cuando corresponda.

### US-004 - Consulta de indicaciones académicas sensibles

Una persona consulta por una consigna, evaluación, calificación, plazo u otra decisión académica no publicada y la sección no inventa ni confirma información; deriva a la cátedra o al canal académico definido.

## Requisitos funcionales

- **FR-001:** El sitio debe ofrecer una sección identificable de consultas guiadas con una interacción conversacional de preguntas y respuestas.
- **FR-002:** La sección debe aceptar preguntas de lenguaje natural relacionadas con los contenidos, actividades y referencias publicados por el sitio.
- **FR-003:** Cada respuesta debe basarse exclusivamente en contenido académico publicado por el sitio y en las referencias externas enlazadas desde ese contenido al momento de la consulta.
- **FR-004:** Cada respuesta que entregue información sustantiva debe mostrar una procedencia verificable mediante enlaces o identificadores hacia el contenido y las referencias del sitio que la respaldan.
- **FR-005:** La sección no debe completar con conocimiento externo, suposiciones o información no respaldada por las fuentes permitidas; cuando no haya respaldo suficiente, debe indicarlo explícitamente.
- **FR-006:** La sección debe rechazar o redirigir consultas ajenas al alcance académico publicado, incluidas solicitudes de indicaciones no publicadas, respuestas de evaluaciones, calificaciones, datos personales o instrucciones para alterar el sitio.
- **FR-007:** La sección debe comunicar de forma visible que sus respuestas son una guía basada en los materiales del sitio y no sustituyen las consignas, devoluciones ni decisiones de la cátedra.
- **FR-008:** La experiencia debe conservar la lectura, el envío de preguntas y el acceso a las fuentes de respaldo en pantallas móviles y de escritorio.
- **FR-009:** La sección debe mantener separadas las instrucciones operativas del sistema y el contenido consultado, de modo que texto incluido en materiales o preguntas no pueda ampliar el alcance de las fuentes permitidas ni modificar las reglas de respuesta.
- **FR-010:** La sección debe usar OpenAI para generar las respuestas conversacionales.
- **FR-011:** Una persona autenticada debe poder retomar sus conversaciones previas y consultar únicamente sus propias preguntas, respuestas y fuentes de respaldo.
- **FR-012:** La sección y su acceso desde el dashboard deben estar disponibles para estudiantes y profesores autenticados con perfil completo.
- **FR-013:** Cada persona autenticada debe poder realizar como máximo diez consultas por día calendario de Argentina.
- **FR-014:** Ante una consulta abusiva o inapropiada, la sección debe rechazarla con un mensaje general, sin generar una respuesta académica ni conservar el texto rechazado en el historial; el rechazo debe contar para el límite diario y solo puede conservar metadatos mínimos de seguridad.

## Fuera de alcance

- Responder con conocimiento general, resultados de búsqueda web u otras fuentes que no estén publicadas en el sitio.
- Sustituir la tutoría docente, emitir calificaciones, interpretar casos académicos individuales o resolver evaluaciones.
- Crear, editar, publicar o eliminar contenido académico, perfiles, entregas, calificaciones o configuraciones del sitio.
- Ejecutar acciones externas o acceder a sistemas institucionales ajenos al contenido publicado y sus referencias enlazadas.
- Ofrecer generación de imágenes, archivos, código u otros asistentes de propósito general.
- Garantizar exactitud de contenido que no esté disponible o sea ambiguo en las fuentes publicadas.
- Exportar, compartir o hacer públicas las conversaciones entre personas usuarias.

## Impacto en datos

- La funcionalidad consulta el contenido académico publicado y sus referencias como fuentes permitidas.
- Las preguntas, respuestas y fuentes mostradas se conservan para que cada persona autenticada pueda retomar exclusivamente sus propias conversaciones.
- Se registran los eventos de uso diarios necesarios para aplicar el límite de consultas y, en rechazos, solo fecha, persona, resultado y categoría de rechazo; no se registra el texto rechazado.
- Las fuentes permitidas son el contenido académico publicado localmente y las referencias externas enlazadas desde ese contenido.

## Seguridad y privacidad

- La sección no debe exponer a OpenAI ni a la persona usuaria credenciales, configuraciones internas, datos de perfiles, entregas, calificaciones ni material académico no publicado.
- Las preguntas deben tratarse como entrada no confiable y no deben poder modificar las fuentes permitidas, las reglas de la sección ni el comportamiento de otros recursos del sitio.
- La sección debe minimizar los datos enviados al proveedor de IA y limitar ese envío a lo necesario para responder la consulta dentro del alcance permitido.
- Solo los estudiantes y profesores autenticados con perfil completo pueden acceder a la sección, sus conversaciones y sus eventos de uso.
- Antes de usar la sección, debe mostrarse un aviso que informe que la pregunta y el contexto mínimo necesario para responder se procesarán mediante OpenAI.
- La clave de OpenAI se configura exclusivamente en el servidor mediante `OPENAI_API_KEY`; no puede exponerse al navegador ni en registros o respuestas.
- Cada persona puede realizar hasta diez consultas diarias. Las consultas abusivas o inapropiadas se rechazan con un mensaje general, cuentan para ese límite y no conservan su texto; solo pueden registrarse metadatos mínimos de seguridad sin revelar la regla específica que produjo el rechazo.

## Ambigüedades abiertas

No quedan ambigüedades abiertas para el alcance funcional aprobado.

## Criterios de aceptación

- **AC-001 (FR-001, FR-002):** Dada una persona con acceso a la sección, cuando formula una pregunta pertinente sobre un concepto publicado de la materia, puede enviar la pregunta y recibe una respuesta conversacional legible.
- **AC-002 (FR-003, FR-004):** Dada una pregunta cuya respuesta está respaldada por materiales publicados, cuando la sección responde, la respuesta no usa fuentes ajenas al sitio e identifica enlaces o referencias verificables hacia los materiales que la fundamentan.
- **AC-003 (FR-005):** Dada una pregunta para la que el sitio no ofrece respaldo suficiente, cuando la sección responde, declara esa limitación y no presenta una conjetura ni conocimiento externo como si fuera contenido de la materia.
- **AC-004 (FR-006, FR-007):** Dada una consulta sobre una evaluación, calificación, dato personal, instrucción no publicada o cambio del sitio, cuando la sección la procesa, no revela ni inventa información, no ejecuta acciones y comunica el canal o límite académico correspondiente.
- **AC-005 (FR-008):** Dada una persona que usa la sección desde móvil o escritorio, cuando formula una pregunta y revisa su respuesta, puede leerla, enviar una nueva consulta y abrir las fuentes de respaldo sin pérdida de información esencial.
- **AC-006 (FR-009):** Dada una pregunta o un fragmento de contenido que intenta cambiar las instrucciones de la sección o ampliar sus fuentes, cuando se procesa, la respuesta conserva el alcance de contenido publicado y no revela instrucciones internas, credenciales ni datos no autorizados.
- **AC-007 (FR-010):** Dada una consulta válida, cuando la sección genera una respuesta, esta se produce mediante OpenAI y conserva las restricciones de fuentes, procedencia y privacidad definidas por esta especificación.
- **AC-008 (FR-011, FR-012):** Dada una persona autenticada con perfil completo, estudiante o profesor, cuando abre el acceso de consultas guiadas desde el dashboard, puede iniciar una conversación y retomar exclusivamente sus conversaciones previas; una persona no autenticada o sin perfil completo no puede acceder a esa sección ni a sus datos.
- **AC-009 (FR-013):** Dada una persona que ya realizó diez consultas durante el día calendario de Argentina, cuando intenta formular una nueva consulta, recibe una indicación de que alcanzó el límite y no se envía la pregunta a OpenAI.
- **AC-010 (FR-014):** Dada una consulta abusiva o inapropiada, cuando la sección la procesa, muestra un rechazo general, no genera respuesta académica, no conserva el texto en el historial, registra únicamente metadatos mínimos de seguridad y descuenta una de las diez consultas diarias.
