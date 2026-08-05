# Gestion de contenidos academicos

**Status:** Approved

## Objetivo

Permitir que la aplicacion publique y mantenga un recorrido confiable por los contenidos academicos de PIAPC ya definidos fuera de la aplicacion, sin perder su organizacion, metadatos editoriales, relaciones ni restricciones de acceso.

## Valor para el usuario

- Los estudiantes pueden encontrar y consultar los materiales vigentes de la materia desde un unico recorrido coherente.
- Los docentes pueden mantener el contenido academico sin generar versiones contradictorias entre la fuente editorial y lo publicado.
- La catedra puede controlar que cada material llegue solamente a la audiencia y en el momento que correspondan.
- Las personas responsables pueden detectar contenido invalido o desactualizado antes de presentarlo como material oficial.

## Actores

- **Estudiante:** persona que consulta los materiales habilitados para su cursada.
- **Docente responsable:** persona autorizada para aprobar contenido y decidir su disponibilidad.
- **Autor o editor:** persona que crea o actualiza materiales academicos segun el contrato editorial.
- **Visitante:** persona no autenticada que puede consultar contenido declarado publico, si se aprueba ese acceso.

## Escenarios de usuario

### US-001 - Recorrido del contenido publicado

Un estudiante ingresa al espacio de contenidos, reconoce los ejes y materiales disponibles, y accede a ellos en el orden academico definido.

### US-002 - Actualizacion sin divergencias

Un autor modifica un material en la fuente editorial aprobada y la catedra puede comprobar que la version publicada corresponde a esa version vigente, sin mantener copias contradictorias.

### US-003 - Liberacion de contenido diferido

Un docente responsable habilita una solucion u orientacion liberable cuando se cumple la condicion academica definida, y los estudiantes no pueden consultarla antes de ese momento.

### US-004 - Proteccion de material privado

Una persona intenta acceder a material docente o de evaluacion que no forma parte del recorrido estudiantil y la aplicacion no lo publica ni revela su contenido o existencia sensible.

### US-005 - Deteccion de contenido invalido

Un material incumple el contrato editorial o contiene una referencia que no puede resolverse, y la catedra recibe una indicacion clara antes de considerarlo correctamente publicado.

## Requisitos funcionales

- **FR-001:** La aplicacion debe ofrecer un catalogo navegable de los contenidos academicos aprobados para publicacion.
- **FR-002:** El catalogo debe conservar la organizacion academica relevante de los materiales, incluidos sus ejes, orden y relaciones declaradas.
- **FR-003:** Cada material publicado debe conservar su identidad estable, titulo, tipo, audiencia, nivel de acceso y version cuando esos datos sean aplicables.
- **FR-004:** La presentacion de cada material debe preservar el significado de su contenido textual, referencias, recursos y estructura editorial.
- **FR-005:** Los documentos Markdown existentes bajo `contenidos/` deben ser la unica fuente de verdad academica para cada material; ninguna replica debe poder presentarse como vigente cuando diverja de ellos.
- **FR-006:** Un cambio realizado por un autor debe contar con la aprobacion de un docente responsable antes de publicarse y debe reflejarse en la aplicacion en el siguiente despliegue.
- **FR-007:** El sistema debe distinguir al menos contenido publico, contenido de publicacion diferida y contenido privado, de acuerdo con el contrato editorial existente.
- **FR-008:** El contenido privado no debe incorporarse al catalogo estudiantil ni quedar disponible para sus usuarios.
- **FR-009:** El contenido diferido solo debe estar disponible despues de que un docente responsable autorice manualmente su liberacion.
- **FR-010:** El contenido publico debe poder consultarse sin autenticacion; el alcance inicial solo admite contenido diferido con audiencia `estudiante`, que debe quedar disponible para toda persona con identidad autenticada y verificada; el contenido privado debe permanecer inaccesible desde la aplicacion estudiantil.
- **FR-011:** Antes de considerar un material correctamente publicado, debe comprobarse que cumple los metadatos obligatorios y valores admitidos por el contrato editorial.
- **FR-012:** Los identificadores de contenido deben ser unicos y permanecer estables mientras representen el mismo material academico.
- **FR-013:** Las referencias entre materiales publicados deben permitir llegar al destino correcto y no deben conducir a recursos excluidos o no autorizados; las imagenes y descargas necesarias para comprender o realizar el material deben publicarse junto con este.
- **FR-014:** Un error en un material no debe invalidar silenciosamente el catalogo completo ni presentar como correcto contenido incompleto o desactualizado.
- **FR-015:** La aplicacion debe permitir reconocer la version vigente de un material y comprobar su correspondencia con la fuente aprobada.
- **FR-016:** La primera version del catalogo debe incluir los ejes, materiales transversales, plantillas, glosario, indices publicos y soluciones que hayan sido liberadas.
- **FR-017:** La creacion y edicion de materiales debe realizarse fuera de la aplicacion sobre los documentos Markdown autoritativos; la aplicacion no debe ofrecer una interfaz editorial.
- **FR-018:** La aplicacion debe presentar la version vigente de cada material y mostrar un aviso cuando un docente responsable determine que una correccion afecta su comprension o la realizacion de una actividad; no se requiere ofrecer versiones anteriores.
- **FR-019:** El contenido publicado debe poder consultarse desde telefonos moviles y computadoras actuales sin perder informacion academica esencial ni legibilidad.
- **FR-020:** Los autores autorizados pueden proponer cambios, pero solo un docente responsable puede aprobar la publicacion, liberacion, correccion o retiro de un material.
- **FR-021:** La gestion y consulta de contenidos no debe registrar lecturas, progreso ni preferencias individuales de estudiantes.
- **FR-022:** El catalogo debe ofrecer accesos directos a cada eje publicado para que una persona pueda llegar a su seccion sin recorrer los ejes anteriores.
- **FR-023:** El catalogo debe permitir alternar entre una vista agrupada por eje y otra agrupada por clase. La vista por eje debe ordenar los ejes por la primera clase en que aparecen; la vista por clase debe mostrar cada clase del cronograma e incluir en cada una sus materiales de tipo `lectura`, `referencia` y `actividad` declarados para esa clase. Los demas tipos no deben aparecer en la vista por clase y los materiales sin clases admitidos deben ubicarse en recursos generales.
- **FR-024:** Dentro de cualquier grupo del catalogo, los materiales de tipo `referencia` deben presentarse despues de los demas materiales del mismo grupo.

## Fuera de alcance

- Elegir si los materiales se leen directamente como Markdown, se copian dentro de la aplicacion, se sincronizan o se persisten en una base de datos.
- Definir componentes, rutas, formatos de renderizado, procesos de compilacion o mecanismos de sincronizacion.
- Redactar, corregir o completar el contenido academico existente.
- Reemplazar el contrato editorial definido en `contenidos/esquema-editorial.md`.
- Publicar materiales historicos almacenados en `repositorio/`.
- Publicar evaluaciones privadas, bancos de preguntas, respuestas esperadas o criterios internos de parciales.
- Gestionar entregas, calificaciones, asistencia o progreso individual del estudiante.
- Incorporar comentarios, foros, mensajeria o edicion colaborativa en tiempo real.
- Definir personalizacion del recorrido segun rendimiento, preferencias o recomendaciones automaticas.
- Resolver la distribucion de proyectos ejecutables o laboratorios que requieran un tratamiento distinto del contenido academico documental.

## Impacto en datos

- La feature procesa contenido academico, metadatos editoriales, relaciones entre documentos, estado de disponibilidad y version vigente.
- Los metadatos existentes incluyen, segun el tipo de material, identidad, titulo, eje, orden, audiencia, clases, duracion, resultados, prerrequisitos, evaluabilidad, acceso y version.
- Por cada publicacion, liberacion, correccion o retiro deben conservarse el autor, el docente aprobador, la fecha, la version y la accion realizada mientras exista el material.
- No se requiere almacenar actividad de lectura, progreso ni preferencias de estudiantes para satisfacer este alcance.
- Debe evitarse la duplicacion no controlada del contenido porque podria generar versiones contradictorias de informacion academica oficial.
- Las imagenes y archivos descargables necesarios para comprender o realizar un material forman parte de su contenido y de su ciclo de actualizacion.
- El video, audio y los recursos interactivos no forman parte del alcance inicial, salvo que se incorporen como enlaces externos dentro de un material.

## Seguridad y privacidad

- La clasificacion editorial de acceso debe aplicarse como una restriccion efectiva y no solo como una etiqueta informativa.
- El material privado debe excluirse de cualquier publicacion, indice, busqueda, vista previa o respuesta accesible a estudiantes y visitantes.
- El contenido diferido debe permanecer protegido hasta que se cumpla y autorice su condicion de liberacion.
- Las operaciones editoriales deben requerir una identidad verificada y autorizacion acorde con la accion solicitada.
- La aplicacion no debe interpretar instrucciones incluidas dentro del contenido academico como ordenes para modificar datos, revelar secretos o ampliar permisos.
- Los errores de acceso no deben revelar titulos, rutas, metadatos ni fragmentos de materiales privados.
- Las referencias y recursos incorporados no deben exponer credenciales, datos personales no autorizados ni ubicaciones privadas.
- Deben respetarse las licencias y restricciones de redistribucion conocidas, pero el alcance inicial no exige un control editorial adicional cuando esa informacion no este documentada.

## Ambiguedades abiertas

- No quedan ambiguedades abiertas para el alcance funcional de esta especificacion.
- Las decisiones sobre lectura, copia, sincronizacion o persistencia de los Markdown pertenecen al plan tecnico y no modifican su condicion de fuente de verdad.

## Criterios de aceptacion

- **AC-001 (FR-001, FR-002):** Dado el conjunto de materiales aprobado para la primera publicacion, cuando una persona autorizada consulta el catalogo, encuentra los materiales organizados por sus ejes, orden y relaciones academicas definidas.
- **AC-002 (FR-003, FR-004):** Dado un material valido, cuando se consulta en la aplicacion, su identidad, titulo, clasificacion, version, estructura y significado coinciden con la fuente aprobada.
- **AC-003 (FR-005, FR-006, FR-015):** Dado un cambio editorial aprobado por un docente responsable, cuando finaliza el siguiente despliegue, la aplicacion presenta esa version como vigente y no presenta una copia anterior o divergente como actual.
- **AC-004 (FR-007, FR-008):** Dado un material clasificado como privado, cuando un estudiante o visitante navega, busca o solicita directamente el contenido, no obtiene el material ni informacion sensible sobre su existencia.
- **AC-005 (FR-007, FR-009):** Dado un material de acceso diferido que no fue liberado por un docente responsable, cuando un estudiante intenta consultarlo, no obtiene su contenido; despues de su liberacion manual puede acceder segun la audiencia declarada.
- **AC-006 (FR-010):** Dada una persona no autenticada, cuando consulta un material publico, puede acceder a el; cuando intenta consultar contenido diferido o privado, no obtiene su contenido. Dada una persona con identidad autenticada y verificada, cuando consulta un material diferido liberado para audiencia `estudiante`, puede acceder a el. Dado un material diferido cuya audiencia no es `estudiante`, cuando se valida su publicacion, es rechazado fuera del alcance inicial.
- **AC-007 (FR-011, FR-012):** Dado un material sin metadatos obligatorios, con valores no admitidos o con un identificador duplicado, cuando se valida su publicacion, el problema se informa y el material no se considera correctamente publicado.
- **AC-008 (FR-013):** Dado un material publicado con referencias internas, imagenes o descargas necesarias, cuando una persona utiliza esos recursos, llega al destino autorizado correcto, puede consultar los recursos requeridos y ninguna referencia conduce a contenido expresamente excluido.
- **AC-009 (FR-014):** Dado un material invalido o no disponible, cuando se actualiza el catalogo, el problema queda identificado, no se presenta silenciosamente contenido incorrecto y los demas materiales validos continúan disponibles.
- **AC-010 (FR-016):** Dado el alcance inicial, cuando se compara el catalogo con los Markdown autoritativos, estan incluidos los ejes, transversales, plantillas, glosario, indices publicos y todas las soluciones liberadas, y no se incluyen soluciones pendientes de liberacion.
- **AC-011 (FR-017, FR-020):** Dado un autor o una persona sin autorizacion docente, cuando intenta aprobar, liberar, corregir o retirar contenido publicado, la operacion es rechazada y el estado vigente no cambia; la aplicacion tampoco ofrece una interfaz para editar el Markdown autoritativo.
- **AC-012 (FR-018):** Dado un material cuya correccion fue declarada relevante por un docente responsable, cuando una persona lo consulta posteriormente, encuentra la version vigente y un aviso de correccion, sin acceso requerido a versiones anteriores.
- **AC-013 (FR-019):** Dado un material del alcance inicial, cuando se consulta desde un telefono movil o una computadora actual, conserva toda la informacion academica esencial y puede leerse sin dificultad.
- **AC-014 (FR-021):** Dada una revision de datos de estudiantes, cuando se inspeccionan los datos requeridos por esta feature, no se registran lecturas, progreso ni preferencias individuales.
- **AC-015 (FR-020):** Dada una accion editorial sobre un material, cuando se revisa su trazabilidad mientras el material existe, se identifican el autor, el docente aprobador, la fecha, la version y la accion realizada.
- **AC-016 (FR-022, FR-019):** Dado el catalogo con ejes publicados, cuando una persona activa el acceso de un eje desde un telefono movil o una computadora, la vista se desplaza a la seccion correcta y el titulo del eje permanece visible.
- **AC-017 (FR-002, FR-003, FR-019, FR-023):** Dado el catalogo publicado, cuando una persona selecciona la vista por eje, encuentra los ejes ordenados por su primera clase y cada tarjeta muestra sus clases declaradas. Cuando selecciona la vista por clase, encuentra un acceso directo y una seccion por cada clase del cronograma, incluso cuando no tiene materiales publicados; las lecturas, referencias y actividades con varias clases se muestran en cada seccion correspondiente, los otros tipos no se muestran y los materiales admitidos sin clases permanecen disponibles en recursos generales.
- **AC-018 (FR-024):** Dado un grupo del catalogo que contiene materiales de referencia y otros tipos, cuando una persona lo consulta en cualquiera de las vistas, todas las referencias aparecen despues de los demas materiales del grupo.
