# Próximas acciones

**Status:** Approved

## Objetivo

Incorporar en el dashboard de la materia una sección breve y vigente que indique al alumnado las próximas acciones académicas que debe realizar.

## Valor para el usuario

- El alumnado identifica rápidamente qué actividad debe realizar sin depender de un aviso externo.
- La cátedra puede actualizar las indicaciones de forma manual desde un único archivo editorial.

## Actores

- **Estudiante:** persona autenticada que consulta el dashboard de la materia.
- **Profesor:** responsable que actualiza las indicaciones académicas publicadas.

## Escenarios de usuario

### US-001 - Consulta de acciones vigentes

Una persona autenticada ingresa al dashboard, encuentra la sección `Próximas acciones` y reconoce las tareas académicas que debe realizar.

### US-002 - Acceso a recursos indicados

Una persona selecciona una acción publicada y llega al recurso de la plataforma asociado a esa tarea.

### US-003 - Actualización editorial manual

El profesor modifica el archivo editorial de próximas acciones y la siguiente publicación refleja el contenido actualizado sin requerir cambios en la interfaz ni en la base de datos.

## Requisitos funcionales

- **FR-001:** El dashboard protegido debe mostrar una sección identificada como `Próximas acciones`.
- **FR-002:** La sección debe presentar un resumen, una o más acciones concretas para el alumnado, un vencimiento cuando corresponda y una aclaración relevante para completar las tareas.
- **FR-003:** Cada acción que refiera a un recurso de la plataforma debe ofrecer un enlace hacia su destino publicado.
- **FR-004:** El contenido de la sección debe provenir de `content/upcoming-actions.md`, que la cátedra podrá actualizar manualmente.
- **FR-005:** La sección debe conservar la legibilidad y los enlaces utilizables en pantallas móviles y de escritorio.
- **FR-006:** La publicación de próximas acciones no debe crear datos de estudiantes, habilitar mensajería ni exponer información adicional fuera del dashboard autenticado.

## Fuera de alcance

- Crear un panel administrativo, notificaciones, mensajería o foro.
- Programar publicaciones automáticas o vencimientos dinámicos.
- Sincronizar el contenido con Campus u otros sistemas externos.
- Crear, editar o modificar los recursos académicos enlazados.
- Registrar lecturas, progreso o confirmaciones de estudiantes.

## Impacto en datos

- Se incorpora un único archivo Markdown editorial de solo lectura para la aplicación.
- No se crean tablas, migraciones, registros de actividad ni datos personales nuevos.

## Seguridad y privacidad

- La sección se renderiza únicamente dentro del dashboard, que conserva la autenticación existente.
- El archivo editorial se trata como contenido de confianza mantenido por la cátedra y no acepta entradas de usuarios.
- Los enlaces solo conducen a recursos publicados existentes de la plataforma.

## Ambigüedades abiertas

No quedan ambigüedades abiertas. La sección no se divide por día o semana; se actualiza manualmente cuando la cátedra lo considere necesario.

## Criterios de aceptación

- **AC-001 (FR-001, FR-002):** Dada una persona autenticada que abre el dashboard, cuando consulta la sección, encuentra el título `Próximas acciones`, el resumen de la clase inicial, las tres tareas indicadas, el vencimiento del 11 de agosto a las 23:59 y la aclaración de que no necesita instalar herramientas, programar ni usar modelos de IA.
- **AC-002 (FR-003):** Dada una persona que consulta las acciones iniciales, cuando selecciona las lecturas o la actividad, llega respectivamente a `eje-01-bienvenida`, `eje-01-que-es-ia` o `eje-01-actividad-clasificacion`.
- **AC-003 (FR-004):** Dado un cambio manual en `content/upcoming-actions.md`, cuando se publica la aplicación, el dashboard muestra los nuevos textos y enlaces sin editar el componente visual.
- **AC-004 (FR-005):** Dada una persona que consulta el dashboard desde móvil o escritorio, cuando revisa la sección, puede leer el contenido y activar sus enlaces sin pérdida de información esencial.
- **AC-005 (FR-006):** Dada una revisión del cambio, cuando se inspecciona su impacto, no existen tablas, datos personales, mensajería ni registros de actividad nuevos.
