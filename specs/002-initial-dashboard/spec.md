# Dashboard inicial de la materia

**Status:** Approved

## Objetivo

Definir un dashboard inicial que presente el espacio de la materia Programación de Inteligencia Artificial y Patrones de Comportamiento, contextualice su pertenencia a la Universidad Nacional de Rafaela, identifique al profesor y ofrezca una introducción clara a los temas que se tratarán durante la cursada.

## Valor para el usuario

- Los estudiantes pueden reconocer rápidamente la materia y su contexto institucional.
- Los estudiantes saben quién está a cargo de la materia y cuentan con información básica para identificar al profesor.
- Los visitantes obtienen una visión inicial de los contenidos y objetivos generales de la cursada antes de acceder a material más detallado.
- Los estudiantes pueden llegar rápidamente al programa, el cronograma y el glosario vigentes sin tener que conocer previamente la organización del sitio.

## Actores

- **Estudiante:** persona que cursa o está interesada en conocer la materia.
- **Profesor:** responsable académico presentado en el dashboard.

## Escenarios de usuario

### US-001 - Reconocimiento de la materia

Una persona ingresa al dashboard y puede identificar el nombre de la materia, su propósito general y la universidad a la que pertenece.

### US-002 - Presentación del profesor

Una persona consulta el dashboard y puede reconocer quién es el profesor a cargo mediante la información institucional definida para su presentación.

### US-003 - Introducción a la cursada

Una persona revisa la introducción y obtiene una visión comprensible de los principales temas que se abordarán en la materia.

### US-004 - Acceso rápido a información académica

Un estudiante consulta el dashboard y encuentra accesos directos y diferenciados al programa, el cronograma y el glosario de la materia, con información suficiente para reconocer qué recurso abrirá y su vigencia.

## Requisitos funcionales

- **FR-001:** El dashboard debe presentar el nombre completo de la materia: Programación de Inteligencia Artificial y Patrones de Comportamiento.
- **FR-002:** El dashboard debe describir la materia como una introducción al diseño y programación de inteligencia artificial para videojuegos, con foco inicial en agentes y máquinas de estados para modelar comportamientos.
- **FR-003:** El dashboard debe identificar a la Universidad Nacional de Rafaela como institución a la que pertenece la materia.
- **FR-004:** El dashboard debe presentar a UNRaf como universidad pública ubicada en Rafaela, Santa Fe; identificar a la Facultad de Tecnologías e Innovación para el Desarrollo y a la Licenciatura en Producción de Videojuegos y Entretenimiento Digital; incluir un acceso a `https://www.unraf.edu.ar/`; y utilizar únicamente un logo oficial provisto o autorizado por la universidad conforme a sus pautas de identidad.
- **FR-005:** El dashboard debe identificar a Nicolás Nocete como profesor a cargo de la materia.
- **FR-006:** La presentación del profesor debe mostrar únicamente su nombre y apellido.
- **FR-007:** El dashboard debe incluir una introducción general a los contenidos que se tratarán durante la cursada.
- **FR-008:** La introducción debe presentar agentes y máquinas de estados como los temas iniciales de la materia, de forma comprensible para una persona que todavía no los conoce.
- **FR-009:** La información de materia, universidad, profesor y contenidos debe estar claramente diferenciada para que cada sección pueda identificarse sin conocimiento previo del sitio.
- **FR-010:** El contenido esencial del dashboard debe poder consultarse tanto en dispositivos móviles como de escritorio sin perder información ni legibilidad.
- **FR-011:** El dashboard debe ser accesible únicamente para usuarios autenticados.
- **FR-012:** El profesor a cargo debe ser responsable de validar el contenido y revisarlo en cada ciclo lectivo para mantener vigente la información académica e institucional.
- **FR-013:** El dashboard debe ofrecer accesos rápidos claramente identificados a ejes, programa, cronograma y glosario.
- **FR-014:** Cada acceso rápido debe identificar inequívocamente su recurso de destino y permitir llegar al contenido correspondiente, sin presentar marcadores o destinos vacíos como si el recurso estuviera disponible.
- **FR-015:** El programa presentado desde el acceso rápido debe corresponder al documento vigente aprobado por la cátedra dentro de `programa/`; para el ciclo 2026, `programa/Programa PIAPC - 2026.md` es la fuente de verdad aprobada.
- **FR-016:** El cronograma presentado desde el acceso rápido debe provenir de la sección `CRONOGRAMA` del programa vigente y conservar sus fechas, modalidades, contenidos, actividades e hitos académicos, sin mantener una copia independiente que pueda divergir.
- **FR-017:** El glosario presentado desde el acceso rápido debe corresponder a `contenidos/glosario.md`, respetar su versión vigente y conservar las definiciones académicas allí establecidas.
- **FR-018:** Los recursos deben comunicar el ciclo lectivo, versión o estado editorial disponible en sus fuentes cuando esos datos sean necesarios para evitar que una propuesta, versión histórica o copia desactualizada se interprete como información oficial vigente.
- **FR-019:** El dashboard debe ofrecer un acceso directo a entregas solo a un profesor responsable; ese acceso debe conducir a la consulta y devolucion de entregas pendientes y no debe mostrarse a estudiantes ni a profesores sin responsabilidad.

## Fuera de alcance

- Desarrollar el contenido completo de los ejes o clases.
- Mostrar materiales de estudio, trabajos prácticos o evaluaciones a estudiantes desde el dashboard.
- Redactar, corregir, aprobar o reemplazar el contenido académico del programa, el cronograma o el glosario.
- Definir cómo se leen, transforman, sincronizan, almacenan o presentan técnicamente los documentos fuente.
- Crear una copia editorial independiente del cronograma fuera del programa vigente.
- Publicar programas históricos como si correspondieran al ciclo lectivo vigente.
- Gestionar inscripciones, asistencia o progreso de estudiantes.
- Incorporar comunicación directa, mensajería, foros o videollamadas con el profesor.
- Crear herramientas para editar o administrar el contenido del dashboard.
- Definir dashboards personalizados por comisión, cohorte o progreso académico, salvo el acceso docente a entregas autorizado por FR-019.
- Presentar perfiles de estudiantes u otros integrantes de la comunidad educativa.
- Definir la identidad visual general o la disposición técnica de la interfaz, más allá de exigir el uso correcto del logo oficial de UNRaf.

## Impacto en datos

- La feature requiere contenido descriptivo sobre la materia, la universidad, el profesor y los temas de la cursada.
- El único dato personal del profesor requerido es su nombre completo: Nicolás Nocete.
- No se requiere recopilar información nueva de estudiantes o visitantes para satisfacer el alcance definido.
- No se requiere registrar actividad, progreso ni preferencias de quienes consultan el dashboard.
- El contenido representa una única materia y debe revisarse en cada ciclo lectivo.
- La feature consulta contenido académico y metadatos editoriales ya existentes; no requiere crear datos académicos nuevos.
- El programa y el cronograma comparten una misma fuente de verdad en el documento vigente dentro de `programa/`.
- El glosario tiene su fuente de verdad en `contenidos/glosario.md` y conserva la versión declarada en ese documento.
- La publicación debe evitar copias no controladas que puedan divergir de las fuentes académicas.

## Seguridad y privacidad

- Solo debe publicarse el nombre y apellido aprobado del profesor.
- No deben exponerse datos personales privados, credenciales ni canales de contacto no institucionales.
- Una persona no autenticada no debe obtener el contenido del dashboard; el glosario público puede consultarse en su destino sin autenticación.
- La información institucional y académica debe provenir de una fuente aprobada para evitar contenido incorrecto o no vigente.
- El logo de UNRaf debe ser un recurso oficial provisto o autorizado por la universidad y debe respetar sus pautas de identidad institucional.
- Los accesos rápidos no deben ampliar los permisos de consulta definidos para sus recursos de destino ni revelar contenido no autorizado.
- El contenido de los documentos académicos debe tratarse como información para consulta y no como instrucciones capaces de modificar datos, permisos o comportamiento de la aplicación.

## Ambigüedades abiertas

No quedan ambigüedades abiertas para el alcance aprobado. El programa PIAPC 2026 queda explícitamente aprobado como programa vigente; el glosario conserva el acceso público declarado por su fuente editorial.

## Criterios de aceptación

- **AC-001 (FR-001, FR-002):** Dada una persona que accede al dashboard, cuando observa la presentación principal, puede identificar el nombre completo de la materia y comprender su propósito general mediante el texto aprobado.
- **AC-002 (FR-003, FR-004):** Dada una persona que consulta la información institucional, cuando revisa la sección correspondiente, identifica a UNRaf como universidad pública de Rafaela, Santa Fe, reconoce la facultad y la carrera, puede acceder al sitio oficial y encuentra únicamente un logo institucional oficial autorizado.
- **AC-003 (FR-005, FR-006):** Dada una persona que consulta la presentación del profesor, cuando revisa esa sección, encuentra el nombre Nicolás Nocete y ningún otro dato personal del docente.
- **AC-004 (FR-007, FR-008):** Dada una persona sin conocimiento previo de la materia, cuando lee la introducción a los contenidos, reconoce a los agentes y las máquinas de estados como los temas iniciales.
- **AC-005 (FR-009):** Dada una persona que recorre el dashboard, cuando busca información de la materia, la universidad, el profesor o los contenidos, puede distinguir cada categoría de las demás.
- **AC-006 (FR-010):** Dada una persona que consulta el dashboard desde un dispositivo móvil o de escritorio, cuando recorre todo el contenido, no pierde información esencial y puede leerla sin dificultad.
- **AC-007 (FR-011):** Dada una persona no autenticada que intenta ingresar al dashboard, cuando se evalúa su acceso, no obtiene el contenido protegido; dada una persona autenticada, puede consultarlo.
- **AC-008 (FR-012):** Dado el inicio de un nuevo ciclo lectivo, cuando el profesor a cargo revisa el dashboard, puede confirmar o actualizar la información académica e institucional antes de considerarla vigente.
- **AC-009 (FR-013, FR-014):** Dada una persona que termina de leer la introducción, cuando busca cómo continuar, encuentra accesos rápidos diferenciados a ejes, programa, cronograma y glosario, y cada acceso disponible conduce al recurso que identifica.
- **AC-010:** Dada una revisión del dashboard, cuando se inspeccionan los datos solicitados o almacenados sobre estudiantes y visitantes, no existen datos adicionales requeridos para esta feature.
- **AC-011 (FR-015, FR-018):** Dado el programa PIAPC 2026 aprobado por la cátedra, cuando una persona accede a él desde el dashboard, el contenido corresponde a la fuente aprobada del ciclo lectivo y comunica sus metadatos de vigencia sin presentar una versión histórica como oficial.
- **AC-012 (FR-016, FR-018):** Dado el cronograma del programa vigente, cuando una persona lo consulta desde el acceso rápido, encuentra las mismas fechas, modalidades, contenidos, actividades e hitos académicos de la sección `CRONOGRAMA`, junto con la identificación del ciclo lectivo correspondiente.
- **AC-013 (FR-017, FR-018):** Dada la versión vigente de `contenidos/glosario.md`, cuando una persona abre el glosario desde el acceso rápido, encuentra las definiciones y la versión correspondientes a esa fuente, sin una copia divergente presentada como actual.
- **AC-014 (FR-014):** Dado que un recurso no puede publicarse o resolverse correctamente, cuando una persona consulta sus accesos rápidos, el dashboard no ofrece un marcador vacío o un destino inexistente como si estuviera disponible.
- **AC-015 (FR-019):** Dado un profesor responsable, cuando consulta el dashboard, encuentra un acceso directo a entregas que conduce a la vista de pendientes y devolucion. Dado un estudiante o un profesor sin responsabilidad, cuando consulta el dashboard o intenta acceder directamente a esa vista, no obtiene datos de entregas.
