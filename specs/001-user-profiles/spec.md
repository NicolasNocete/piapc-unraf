# Perfiles de usuario y roles

**Status:** Approved

## Objetivo

Crear automáticamente un perfil asociado a cada cuenta para identificar a la persona dentro del espacio de la cátedra, distinguir entre alumnos y profesores, y registrar el año de cursada correspondiente al año calendario en que se creó la cuenta.

## Valor para el usuario

- Los alumnos pueden ingresar al espacio de la cátedra con una identidad reconocible y un año de cursada asociado.
- Los profesores pueden ser identificados con un rol diferenciado para habilitar, en futuras funcionalidades, responsabilidades propias de la cátedra.
- La cátedra dispone de información mínima y consistente sobre cada participante sin solicitar nuevamente datos ya disponibles al crear la cuenta.

## Actores

- **Alumno:** persona que cursa la materia. Es el rol inicial de toda cuenta.
- **Profesor:** integrante de la cátedra con una identidad diferenciada. Este rol puede implicar privilegios en funcionalidades futuras, pero esta especificación no los define.
- **Profesor responsable:** profesor que, además de su rol, tiene autorización para gestionar roles, designar a otros profesores responsables y corregir años de cursada. Esta autorización no constituye un tercer rol.
- **Operador externo autorizado:** autoridad que designa al primer profesor responsable para iniciar la delegación dentro del producto.

## Escenarios de usuario

### US-001 - Alta de un alumno

Una persona crea una cuenta y obtiene un perfil con su nombre y apellido, el rol Alumno y el año calendario correspondiente a la creación de la cuenta en Argentina.

### US-002 - Finalización de un perfil incompleto

Una persona cuyo proveedor de identidad no informó nombre o apellido debe completar los datos faltantes antes de acceder al resto del producto.

### US-003 - Identificación de un profesor

Un profesor responsable asigna el rol Profesor a otra persona, sin que un usuario común pueda atribuirse ese rol por sí mismo.

### US-004 - Gestión de responsables

El primer profesor responsable, designado externamente, puede delegar o retirar esta autorización a otros profesores.

### US-005 - Consulta y actualización del perfil propio

Una persona autenticada consulta su nombre, apellido, rol y año de cursada, y puede corregir su propio nombre y apellido sin acceder a perfiles ajenos.

### US-006 - Corrección excepcional del año

Un profesor responsable corrige el año de cursada de una cuenta cuando su fecha de creación no representa el año académico que corresponde a la persona.

### US-007 - Gestión por email conocido

Un profesor responsable ingresa el email conocido de una cuenta para cambiar su rol, autorización de responsable o año de cursada, sin acceder a una lista, búsqueda o perfil ajeno.

## Requisitos funcionales

- **FR-001:** Cada cuenta debe tener exactamente un perfil asociado.
- **FR-002:** El perfil debe generarse como parte del alta de la cuenta, sin requerir una segunda registración manual.
- **FR-003:** El perfil debe contener el nombre y apellido de la persona como dos datos no vacíos después de eliminar espacios al inicio y al final.
- **FR-004:** El perfil debe tener exactamente uno de estos roles: `Alumno` o `Profesor`.
- **FR-005:** El perfil debe contener un año de cursada expresado con cuatro dígitos.
- **FR-006:** El año de cursada inicial debe ser el año calendario de la fecha de creación de la cuenta, calculado según la zona horaria oficial de Argentina (`America/Argentina/Buenos_Aires`).
- **FR-007:** Una persona autenticada debe poder consultar los datos de su propio perfil.
- **FR-008:** Un usuario no debe poder asignarse ni cambiarse por sí mismo al rol Profesor.
- **FR-009:** Si el proveedor de identidad no entrega nombre o apellido, el perfil debe considerarse incompleto y la persona solo puede acceder a completar esos datos o cerrar sesión hasta que ambos estén presentes.
- **FR-010:** Toda cuenta nueva debe recibir inicialmente el rol Alumno.
- **FR-011:** Solo un profesor responsable puede asignar o retirar el rol Profesor.
- **FR-012:** El nombre y apellido iniciales deben obtenerse de los campos separados informados por el proveedor de identidad. Los datos faltantes deben ser ingresados por el titular durante la finalización de su perfil.
- **FR-013:** El titular debe poder modificar el nombre y apellido de su propio perfil después del alta.
- **FR-014:** La fecha de creación de la cuenta es la fuente temporal para calcular el año de cursada inicial.
- **FR-015:** Un profesor responsable debe poder corregir el año de cursada para contemplar excepciones como recursadas, altas tardías o datos históricos.
- **FR-016:** Cada cuenta existente al incorporar la funcionalidad debe recibir un perfil con el rol Alumno, el año correspondiente a su fecha original de creación y el nombre y apellido disponibles según las mismas reglas aplicadas a una cuenta nueva.
- **FR-017:** En esta primera versión, una persona solo puede consultar su propio perfil. Ser profesor o profesor responsable no habilita la consulta de perfiles ajenos.
- **FR-018:** La autorización inicial de profesor responsable debe ser otorgada por un operador externo autorizado. Luego, un profesor responsable puede otorgar o retirar esa autorización a otros profesores.
- **FR-019:** La autorización de profesor responsable solo puede pertenecer a una cuenta con rol Profesor y debe retirarse si la cuenta deja de tener ese rol.
- **FR-020:** Cada cambio de rol, autorización de responsable o año de cursada debe registrar la identidad del actor, la fecha y hora, el valor anterior y el valor nuevo.
- **FR-021:** Al eliminar una cuenta deben eliminarse su perfil y los registros de auditoría en los que figure como cuenta afectada o como actor.
- **FR-022:** Un profesor responsable debe identificar la cuenta afectada ingresando un email que ya conoce. El producto no debe ofrecer listas, búsquedas, sugerencias ni datos del perfil correspondiente a ese email.
- **FR-023:** Si el proveedor de identidad entrega únicamente un nombre completo, el sistema no debe dividirlo ni inferir automáticamente el nombre y el apellido; el titular debe completar ambos datos por separado.
- **FR-024:** La designación del primer profesor responsable debe registrar al operador externo mediante un identificador institucional y distinguirlo de un actor autenticado del producto.

## Fuera de alcance

- Definir permisos funcionales concretos para alumnos o profesores más allá de gestionar roles, responsables y correcciones del año de cursada.
- Crear paneles generales de administración de usuarios, cursos o comisiones. Se permiten únicamente formularios acotados para operar sobre un email conocido según FR-022.
- Gestionar múltiples materias, cohortes o años de cursada simultáneos por usuario.
- Modelar reinscripciones, recursadas, promociones o historial académico.
- Verificar identidad legal, legajo, pertenencia institucional o condición académica.
- Definir el mecanismo técnico de autenticación o modificar el flujo del proveedor de identidad.
- Incorporar datos adicionales como teléfono, domicilio, documento, legajo o fecha de nacimiento.
- Regular la imagen de perfil existente, sus cambios o su visibilidad.
- Definir procesos de desactivación temporal, suspensión o recuperación de cuentas eliminadas.
- Permitir la consulta de perfiles ajenos o crear directorios de alumnos y profesores.

## Impacto en datos

- Se incorporan o formalizan como datos del perfil: nombre, apellido, rol, año de cursada y autorización de profesor responsable.
- El nombre y apellido son datos personales identificatorios.
- El rol y la autorización de responsable son datos sensibles de autorización porque pueden condicionar permisos presentes o futuros.
- El año de cursada revela una relación temporal con la materia y debe limitarse al uso académico previsto.
- Debe conservarse una relación uno a uno entre cuenta y perfil durante el ciclo de vida de la cuenta.
- Se incorpora un historial de cambios de rol, autorización de responsable y año de cursada con identificación del actor y de la cuenta afectada.
- El email se utiliza como identificador de entrada para las operaciones de responsables, pero no se incorpora al perfil ni se muestra como resultado de búsqueda.
- El historial distingue entre actores autenticados y operadores externos; para estos últimos conserva el identificador institucional informado.
- La eliminación de una cuenta elimina su perfil y todo registro de auditoría que la identifique como cuenta afectada o actor, priorizando la minimización de datos personales sobre la conservación histórica.

## Seguridad y privacidad

- La creación o modificación del perfil no debe permitir asociarlo a una cuenta ajena.
- Un usuario autenticado solo puede consultar su propio perfil, incluso si tiene rol Profesor o autorización de profesor responsable.
- El rol Profesor no puede depender de una declaración no verificada del propio usuario ni de datos manipulables por este.
- La autorización de profesor responsable es independiente del rol, se limita a profesores y debe seguir una cadena de designación iniciada por un operador externo autorizado.
- Solo un profesor responsable puede cambiar roles, delegar o retirar la autorización de responsable y corregir años de cursada.
- Los cambios de rol, autorización y año deben quedar auditados con actor, fecha y hora, valor anterior y valor nuevo.
- Las operaciones sobre terceros aceptan un email conocido, pero no deben transformarse en un mecanismo para explorar cuentas ni devolver datos del perfil afectado.
- La designación inicial debe identificar al operador externo de forma institucional; no puede atribuir el cambio al profesor designado.
- El titular solo puede modificar el nombre y apellido de su propia cuenta; no puede modificar su rol, autorización de responsable ni año de cursada.
- Solo deben recopilarse los datos mínimos definidos en esta especificación.
- La eliminación de la cuenta debe retirar los datos personales y registros de auditoría asociados según FR-021.

## Ambigüedades abiertas

No quedan ambigüedades funcionales abiertas para el alcance de esta especificación.

## Criterios de aceptación

- **AC-001 (FR-001, FR-002):** Dada una cuenta creada correctamente, cuando finaliza el alta, existe un único perfil asociado sin una registración adicional.
- **AC-002 (FR-003, FR-012):** Dada una cuenta cuyo proveedor informa nombre y apellido por separado, cuando se genera el perfil, ambos datos no vacíos quedan disponibles en él.
- **AC-003 (FR-009, FR-012):** Dada una cuenta cuyo proveedor omite el nombre o el apellido, cuando la persona ingresa, solo puede completar los datos faltantes o cerrar sesión hasta que el perfil esté completo.
- **AC-004 (FR-004, FR-010):** Dado un perfil nuevo, cuando se consulta su rol, el valor es Alumno.
- **AC-005 (FR-005, FR-006, FR-014):** Dada una cuenta creada en una fecha conocida, cuando se genera su perfil, el año de cursada contiene cuatro dígitos y coincide con el año de esa fecha en `America/Argentina/Buenos_Aires`.
- **AC-006 (FR-007, FR-017):** Dada una persona autenticada con perfil completo, cuando consulta su propio perfil, recibe su nombre, apellido, rol y año de cursada.
- **AC-007 (FR-017):** Dada una persona autenticada, incluso si es profesor responsable, cuando intenta consultar un perfil ajeno, no obtiene sus datos.
- **AC-008 (FR-008, FR-011):** Dado un usuario que no es profesor responsable, cuando intenta asignar o retirar el rol Profesor, la operación es rechazada y el perfil no cambia.
- **AC-009 (FR-011, FR-020):** Dado un profesor responsable, cuando asigna o retira el rol Profesor, el perfil refleja el nuevo rol y se registra actor, fecha y hora, valor anterior y valor nuevo.
- **AC-010 (FR-013):** Dado un usuario autenticado, cuando modifica el nombre o apellido de su propio perfil con valores válidos, el perfil refleja los cambios.
- **AC-011 (FR-015, FR-020):** Dado un profesor responsable, cuando corrige un año de cursada, el perfil refleja el nuevo año y se registra actor, fecha y hora, valor anterior y valor nuevo.
- **AC-012 (FR-016):** Dada una cuenta existente antes de esta funcionalidad, cuando recibe su perfil, este tiene rol Alumno, el año de su fecha original de creación y el nombre y apellido disponibles; si alguno falta, queda incompleto según FR-009.
- **AC-013 (FR-018, FR-019):** Dado el primer profesor responsable designado por un operador externo autorizado, cuando delega la autorización a otro profesor, este queda habilitado como responsable y el cambio se audita.
- **AC-014 (FR-018, FR-020):** Dado un profesor responsable, cuando retira esa autorización a otro profesor, la persona conserva su rol Profesor, pierde las facultades de responsable y el cambio se audita.
- **AC-015 (FR-019):** Dado un profesor responsable cuyo rol cambia a Alumno, cuando se completa el cambio, también pierde la autorización de responsable.
- **AC-016 (FR-001):** Dada una cuenta que ya posee un perfil, cuando se repite o reintenta el proceso de generación, no se crea un segundo perfil.
- **AC-017 (FR-021):** Dada una cuenta con perfil e historial asociado, cuando se elimina la cuenta, ya no existen su perfil ni registros de auditoría donde figure como cuenta afectada o actor.
- **AC-018 (FR-022):** Dado un profesor responsable que conoce el email de una cuenta, cuando ejecuta una operación autorizada sobre ese email, recibe únicamente el resultado de la operación y no datos del perfil; no dispone de listas, búsqueda ni sugerencias de cuentas.
- **AC-019 (FR-009, FR-012, FR-023):** Dada una cuenta cuyo proveedor solo informa un nombre completo, cuando se crea su perfil, el nombre completo no se divide automáticamente y la persona debe ingresar nombre y apellido por separado antes de acceder al resto del producto.
- **AC-020 (FR-020, FR-024):** Dada la designación inicial de un profesor responsable, cuando un operador externo autorizado la realiza, el historial registra su identificador institucional como actor externo, la fecha y hora, y los valores anterior y nuevo.
