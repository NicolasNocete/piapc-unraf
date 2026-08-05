# Gestion de entregas

**Status:** Approved

## Objetivo

Permitir que las actividades de la cursada con fechas ya definidas reciban entregas de estudiantes y que el profesor pueda revisarlas de manera ordenada, identificando con certeza quien entrego, que version presento y en que momento.

## Valor para el usuario

- Los estudiantes pueden presentar el trabajo solicitado desde el espacio de la materia y comprobar que su entrega fue recibida.
- Los estudiantes pueden reconocer la actividad, sus fechas de disponibilidad y el estado de su propia entrega sin depender de canales informales.
- El profesor puede localizar las entregas de cada actividad, ver quienes entregaron y revisar el material presentado con su trazabilidad.
- La catedra reduce perdidas, confusiones y disputas sobre la recepcion, autoria y momento de una entrega.

## Actores

- **Estudiante:** persona autenticada habilitada para cursar la materia y presentar sus propios trabajos.
- **Profesor responsable:** persona autorizada para consultar y gestionar las entregas de las actividades de la materia.

## Escenarios de usuario

### US-001 - Entrega disponible

Un estudiante abre una actividad disponible, identifica sus fechas y presenta el material requerido como texto con los enlaces necesarios; luego recibe una confirmacion con el momento y la version registrada.

### US-002 - Correccion de una entrega

Un estudiante que ya presento una actividad vuelve a entregar una version corregida y puede reconocer cual es su entrega vigente.

### US-003 - Consulta de entregas pendientes

El profesor accede desde el dashboard a la seccion de entregas y consulta las que todavia no recibieron devolucion para organizar su revision.

### US-004 - Revision docente por actividad

El profesor abre una actividad y consulta las entregas recibidas, las personas que no entregaron y el estado de cada presentacion para organizar su revision.

### US-005 - Revision de una entrega individual

El profesor abre una entrega y accede al material presentado, su autor, sus versiones y sus marcas de tiempo para revisarla sin confundirla con trabajos de otros estudiantes.

## Requisitos funcionales

- **FR-001:** Cada contenido marcado como actividad debe admitir entrega e informar a los estudiantes autorizados su identificacion, consigna en el texto del contenido, fechas y periodo de disponibilidad vigentes definidos como metadatos editoriales obligatorios de su frontmatter.
- **FR-002:** Un estudiante autorizado debe poder presentar una entrega propia para una actividad, incluso despues de finalizado su periodo de disponibilidad, mediante texto libre e incluidos enlaces a recursos externos que considere pertinentes.
- **FR-003:** Antes de confirmar una entrega, el sistema debe informar claramente al estudiante que material o referencias seran presentados y para que actividad.
- **FR-004:** Al registrar una entrega, el sistema debe confirmar su recepcion y mostrar al estudiante la fecha y hora registradas y la version vigente.
- **FR-005:** El estudiante debe poder consultar el estado y el contenido o referencias de sus propias entregas para cada actividad a la que tenga acceso.
- **FR-006:** El estudiante debe poder presentar una nueva version de su entrega y reconocer cual es la vigente; las versiones anteriores deben conservar trazabilidad para el profesor.
- **FR-007:** El profesor responsable debe poder consultar, por actividad, las entregas recibidas y los estudiantes habilitados sin entrega.
- **FR-008:** El dashboard debe ofrecer al profesor responsable un acceso directo a una seccion que muestre las entregas pendientes de devolucion.
- **FR-009:** El profesor responsable debe poder abrir una entrega y consultar su autor, texto, enlaces presentados, fecha y hora de cada version y version vigente.
- **FR-010:** El profesor responsable debe poder registrar una devolucion de texto libre para una entrega, que puede incluir una observacion o un valor numerico.
- **FR-011:** El estudiante debe poder consultar la devolucion publicada para sus propias entregas, sin acceder a informacion de otros estudiantes.
- **FR-012:** Solo el estudiante autor de una entrega puede crear o actualizar sus presentaciones; el profesor responsable puede consultarlas y registrar o actualizar devoluciones.
- **FR-013:** Una entrega, sus versiones y sus devoluciones deben mantener una trazabilidad verificable de autor, actividad, acciones relevantes y sus fechas y horas.
- **FR-014:** La gestion de entregas debe distinguir las actividades no disponibles, disponibles sin entrega, entregadas, pendientes de devolucion y revisadas, sin presentar estados ambiguos a estudiantes o docentes.
- **FR-015:** Las fechas, consignas y condiciones de entrega que se muestren deben corresponder a la actividad vigente definida por la catedra y no a una copia divergente.
- **FR-016:** La experiencia de consulta y entrega debe conservar la informacion esencial y ser utilizable desde telefonos moviles y computadoras actuales.

## Fuera de alcance

- Crear, editar, programar o publicar actividades, consignas o fechas de disponibilidad.
- Cambiar las fechas definidas actualmente para las actividades.
- Cargar, almacenar o distribuir archivos en la plataforma.
- Corregir automaticamente el contenido presentado, detectar plagio o usar inteligencia artificial para calificar.
- Gestionar trabajos grupales, coautoria o entregas en nombre de otras personas.
- Gestionar instancias de recuperacion, prorrogas individuales, excepciones, justificaciones o apelaciones.
- Definir la escala de calificaciones, su ponderacion, actas oficiales o promocion de la materia.
- Incorporar mensajeria, comentarios entre estudiantes, foros o notificaciones.
- Exponer analiticas de rendimiento, ranking de estudiantes o seguimiento individual fuera de la consulta necesaria para gestionar entregas.

## Impacto en datos

- La feature requiere asociar los contenidos vigentes marcados como actividad con estudiantes habilitados, fechas y periodos de disponibilidad definidos en su frontmatter editorial obligatorio.
- Por cada entrega se procesan datos de identidad del autor, actividad, texto y enlaces presentados, versiones, fechas y horas, estado y devolucion.
- Las devoluciones y los valores numericos que puedan incluir son datos academicos personales y deben conservarse asociados solamente a la entrega correspondiente.
- Las entregas, sus versiones y devoluciones deben conservarse permanentemente junto con su trazabilidad.

## Seguridad y privacidad

- Las entregas, sus textos o enlaces y las devoluciones deben ser accesibles solo para su estudiante autor y el profesor responsable autorizado.
- Un estudiante no debe poder consultar, modificar, inferir la existencia ni obtener metadatos de entregas, revisiones o calificaciones de otros estudiantes.
- Las acciones de entrega y revision deben requerir identidad autenticada y verificada; la autorizacion debe evaluarse sobre la actividad y la entrega afectadas.
- El sistema debe registrar de forma confiable la autoria y el momento de recepcion, sin permitir que el estudiante los suplante o altere.
- El material presentado por estudiantes debe tratarse como contenido no confiable: no debe ejecutar instrucciones, ampliar permisos, revelar credenciales ni modificar datos fuera de las acciones autorizadas.
- Las respuestas ante accesos no autorizados no deben revelar nombres, resultados, archivos, referencias ni estados de entregas de terceros.

## Ambiguedades abiertas

No quedan ambiguedades abiertas para el alcance funcional aprobado.

## Criterios de aceptacion

- **AC-001 (FR-001, FR-015):** Dado un contenido marcado como actividad, cuando un estudiante autorizado lo consulta durante su periodo de disponibilidad, puede identificar la actividad, su consigna en el contenido, sus fechas y su periodo vigentes.
- **AC-002 (FR-002, FR-003, FR-004):** Dado un estudiante autorizado y una actividad, incluso si su periodo de disponibilidad finalizo, cuando presenta texto libre con los enlaces que corresponden y confirma la accion, se registra una entrega para esa actividad y el estudiante recibe la fecha y hora y la version vigente.
- **AC-003 (FR-005, FR-014):** Dado un estudiante con actividades en diferentes estados, cuando consulta sus entregas, puede distinguir las actividades sin entrega, sus entregas vigentes, las pendientes de devolucion y las revisadas, y solo accede a sus propios textos, enlaces y devoluciones.
- **AC-004 (FR-006, FR-013):** Dada una entrega existente, cuando el estudiante presenta una correccion, la nueva version queda identificada como vigente y el profesor puede consultar las versiones anteriores con sus fechas y horas.
- **AC-005 (FR-007, FR-008, FR-009):** Dado un profesor responsable que consulta el acceso directo de entregas desde el dashboard, cuando abre la vista correspondiente, puede identificar las entregas recibidas, los estudiantes habilitados sin entrega y las entregas pendientes; al abrir una entrega obtiene su autor, texto, enlaces, versiones y marcas de tiempo.
- **AC-006 (FR-010, FR-011):** Dado un profesor responsable que revisa una entrega, cuando publica una devolucion de texto libre, el estudiante autor puede consultarla en su propia entrega y ningun otro estudiante puede hacerlo.
- **AC-007 (FR-012):** Dado un estudiante que intenta crear o actualizar una entrega ajena, o una persona que no es el profesor responsable que intenta revisar una entrega, cuando se evalua la accion, se rechaza sin modificar datos ni revelar informacion de la entrega afectada.
- **AC-008 (FR-013):** Dada una entrega con versiones o devoluciones, cuando el profesor responsable consulta su trazabilidad, puede identificar el autor, la actividad, las acciones relevantes y sus fechas y horas.
- **AC-009 (FR-016):** Dada una persona autorizada que consulta o presenta una entrega desde un telefono movil o una computadora actual, cuando completa el flujo correspondiente, conserva toda la informacion esencial y puede realizarlo sin perder legibilidad ni controles necesarios.
