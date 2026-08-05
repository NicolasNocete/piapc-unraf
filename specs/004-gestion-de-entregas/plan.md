# Plan tecnico: Gestion de entregas

**Spec:** [spec.md](./spec.md)  
**Status:** Draft

## Resumen de arquitectura

La fuente de verdad de una actividad continua siendo el Markdown editorial: el cuerpo contiene la consigna y su frontmatter define identificador, version, fechas y periodo de disponibilidad. La aplicacion valida y publica esos metadatos a traves del pipeline de contenido existente. Las entregas, sus versiones y las devoluciones son datos academicos personales y se almacenan exclusivamente en Supabase.

Cada render y cada mutacion vuelve a verificar la identidad con `getClaims()`. Las paginas leen mediante el cliente de sesion y RLS; las mutaciones pasan por Server Actions que validan la actividad contra el manifiesto editorial actual, autentican y autorizan al actor, y llaman una operacion atomica de base con una clave de servicio solo de servidor. No se exponen operaciones de escritura a navegadores ni se agregan rutas HTTP publicas.

La fecha y el periodo de disponibilidad se muestran al estudiante, pero no bloquean entregas: una entrega puede registrarse antes, durante o despues de ese periodo y conserva su hora de recepcion para la posterior evaluacion docente. Esto implementa FR-002 sin introducir una calificacion o una clasificacion automatica de puntualidad.

## Contenido editorial y disponibilidad

1. Extender `src/lib/content/schema.ts` con los metadatos obligatorios para `tipo: actividad`: `disponible_desde` y `disponible_hasta`, como fechas civiles `YYYY-MM-DD`, con inicio no posterior al fin. Conservar el modelo de fecha civil actual y evaluar su presentacion en `America/Argentina/Buenos_Aires`; no agregar hora limite ni estado de tardanza. Referencias: FR-001, FR-015; AC-001.
2. Extender `ContentEntry`, su esquema de manifiesto y `scripts/content/sync.ts` para transportar ambos valores desde el frontmatter de los Markdown autoritativos hacia `content/manifest.json`. Extender `scripts/content/check.ts` y sus pruebas para rechazar actividades sin ambos campos, fechas invalidas o rangos invertidos. Referencias: FR-001, FR-015; AC-001.
3. Agregar los metadatos requeridos en la fuente editorial de cada actividad y sincronizar la replica publicada. No se modifica el cuerpo de las consignas ni se crea una copia de fechas en Supabase. La actividad identificada por `activity_id` conserva tambien la `activity_version` de su manifiesto al momento de cada version de entrega. Referencias: FR-001, FR-013, FR-015.

## Datos, migraciones y RLS

Crear una nueva migracion imperativa con `supabase migration new` al implementar. No modificar las migraciones existentes. La migracion debe crear estas tablas en `public`, todas con RLS habilitada:

| Tabla | Proposito y campos principales |
| --- | --- |
| `activity_submissions` | Una entrega logica por estudiante y actividad: identificador UUID, `activity_id` textual, `student_id` con FK a `public.profiles`, version editorial de actividad, `created_at` y `updated_at`. Restriccion unica sobre `(activity_id, student_id)`. |
| `activity_submission_versions` | Historial inmutable de texto presentado: identidad, FK a entrega, numero de version consecutivo, texto, `submitted_at` y version editorial de actividad. Restriccion unica sobre `(submission_id, version_number)`. |
| `activity_feedback_versions` | Historial inmutable de devoluciones: identidad, FK a entrega, numero de revision consecutivo, texto de devolucion, `reviewer_id` con FK a `public.profiles` y `published_at`. Restriccion unica sobre `(submission_id, revision_number)`. |

- Usar claves UUID para recursos que se exponen en rutas o formularios y `bigint generated always as identity` solo si se requieren secuencias internas. Indexar todas las FK y los recorridos reales: versiones por `(submission_id, version_number desc)`, devoluciones por `(submission_id, revision_number desc)`, y entregas pendientes por actividad/fecha. Referencias: FR-006 a FR-010, FR-013.
- No hay borrado automatico, caducidad, bucket de Storage ni archivos. El texto y sus enlaces se conservan permanentemente junto con sus versiones y devoluciones. Referencias: FR-002, FR-006, FR-010, FR-013.
- Incorporar checks de texto no vacio y un maximo de 20.000 caracteres en el modelo Zod y en la base, sin recortar silenciosamente lo escrito por el estudiante. No intentar validar que los enlaces externos existan o sean accesibles. Referencias: FR-002 a FR-004, FR-010.
- Crear funciones privadas, con `security definer`, `set search_path = ''`, referencias calificadas, verificacion explicita de los argumentos y permisos revocados de `public`, `anon` y `authenticated`, para anexar de forma atomica una version de entrega o una devolucion. Exponer solamente wrappers `security invoker` en `public` ejecutables por `service_role`; los navegadores autenticados no reciben grants de `INSERT`, `UPDATE` ni `DELETE` sobre las tres tablas. Referencias: FR-006, FR-010, FR-012, FR-013.
- Agregar politicas `SELECT` para que un estudiante solo pueda leer entregas, versiones y devoluciones donde sea autor; y para que un profesor responsable pueda leer todas las filas necesarias para revisar. Otorgar solo `SELECT` a `authenticated`; RLS y grants bloquean toda escritura directa. Las lecturas de servidor deben seguir usando el cliente de sesion para que estas politicas se ejerciten. Referencias: FR-005, FR-007 a FR-012, FR-014.
- La operacion de escritura recibe el autor o revisor solo desde el servidor, no desde `FormData`; valida que el autor sea estudiante y que el revisor sea un profesor responsable con perfil completo. La funcion atomica asigna el siguiente numero de version bajo bloqueo de la entrega para impedir colisiones entre envios concurrentes. Referencias: FR-006, FR-010, FR-012, FR-013; AC-004, AC-006 a AC-008.
- Regenerar `src/lib/supabase/database.types.ts` desde el proyecto Supabase despues de aplicar y verificar la migracion. Referencias: todos los accesos Supabase.

## Acceso de servidor y acciones

1. Agregar `src/lib/deliveries/server.ts` con `import "server-only"`. Concentrara las consultas tipadas para la vista de actividad, la lista por actividad, las entregas pendientes y el detalle docente; aceptara el actor verificado y no retornara columnas que la vista no necesita. Referencias: FR-005, FR-007 a FR-009, FR-011, FR-014.
2. Agregar un cliente administrativo solo servidor, por ejemplo `src/lib/supabase/admin.ts`, que use `SUPABASE_SERVICE_ROLE_KEY` sin prefijo `NEXT_PUBLIC_`. Solo se utiliza despues de validar identidad, rol, responsabilidad, actividad y datos en cada Server Action para ejecutar los RPC de escritura. Documentar la variable en `.env.example` sin valor real. Referencias: FR-002 a FR-004, FR-006, FR-010, FR-012, FR-013.
3. Crear acciones de ruta con `"use server"` para enviar/reemplazar una entrega y publicar una devolucion. Cada una debe: validar `FormData` con Zod; obtener identidad con `getClaims()`; cargar el perfil actual; derivar actividad y version desde el manifiesto por ID; comprobar que su tipo sea `actividad`; autorizar al estudiante o profesor responsable segun corresponda; y llamar el RPC atomico con valores derivados. Tratar los IDs de formulario como referencias no confiables. Referencias: FR-002 a FR-004, FR-006, FR-010, FR-012, FR-015.
4. Tras una mutacion, invalidar la ruta de contenido o perfil afectada con `revalidatePath` para que la respuesta de la accion ya muestre la version o devolucion vigente. No devolver registros de base completos ni datos de terceros. Referencias: FR-004 a FR-006, FR-010, FR-011, FR-014.
5. El contenido Markdown se renderiza como texto no confiable tal como hoy, sin `rehype-raw` ni MDX. Los enlaces incorporados en una entrega se presentan como enlaces externos protegidos con `rel="noreferrer noopener"`; nunca se interpretan como instrucciones, HTML ejecutable o credenciales. Referencias: requisitos de seguridad, FR-002, FR-009.

## Rutas y fronteras servidor/cliente

- Actualizar `src/app/contenidos/[id]/page.tsx` para cargar el detalle de entrega del actor solo cuando la entrada sea una actividad. La ruta deja de ser prerenderizada para evitar serializar o cachear datos de entrega entre usuarios; conserva la lectura del Markdown en servidor. Referencias: FR-001, FR-005, FR-014, FR-016.
- Crear componentes privados de `src/app/contenidos/[id]/_components/`: una seccion de entrega Server Component y un formulario Client Component minimo para el `textarea`, estado pendiente y errores accionables. El cliente recibe solo estado propio, la actividad y la Server Action; no recibe perfiles, versiones ajenas ni credenciales. Referencias: FR-002 a FR-006, FR-011, FR-014, FR-016.
- Actualizar el dashboard para mostrar, solo a un profesor responsable, un acceso directo a `/dashboard/entregas`, donde se presenta la seccion de entregas pendientes de devolucion. Cada fila abre el detalle docente de la actividad o entrega. Referencias: FR-008, FR-009, FR-014, FR-016.
- La ruta protegida `/dashboard/entregas` comprueba perfil responsable antes de consultar pendientes y presenta cada detalle en un dialogo accesible con texto, enlaces, versiones y formulario de devolucion. Un actor no autorizado redirige al dashboard sin obtener datos. Referencias: FR-009 a FR-012, FR-014; AC-005 a AC-008.
- No se agregan Route Handlers, cliente Supabase de navegador para entregas, notificaciones ni polling. `src/proxy.ts` continua siendo solo una ayuda de sesion y no reemplaza las verificaciones de acciones o consultas. Referencias: FR-012 y seguridad de la spec.

## shadcn/ui y accesibilidad

- Reutilizar los componentes instalados `Card`, `Badge`, `Button`, `Field`, `FieldGroup`, `FieldLabel`, `FieldDescription`, `Table`, `Alert` y `Spinner` con los tokens de `base-nova` y Base UI existentes.
- Antes de implementar, comprobar en el registry `@shadcn` y con la documentacion versionada si faltan `Textarea` para el texto de entrega/devolucion y `Empty` para los estados sin pendientes. Agregarlos solo si no existen, revisando su diff antes de modificar componentes locales.
- El formulario debe tener etiqueta, ayuda sobre el uso de enlaces, contador o validacion accesible si se impone limite, `aria-invalid` y mensaje de error asociado. Deshabilitar el boton durante la accion con `Spinner`; conservar texto y enlaces ante un error validable. Referencias: FR-003, FR-004, FR-016.
- Presentar los estados con `Badge`, tablas con encabezados y alternativa legible en pantallas chicas; los enlaces de evidencia deben tener etiqueta visible y abrirse de modo seguro. Incluir estados de carga, vacio, error, foco por teclado y contraste con tokens semanticos. Referencias: FR-005, FR-007 a FR-011, FR-014, FR-016.

## Rollout y rollback

1. Publicar primero la migracion, tipos generados y pruebas de RLS; confirmar que no existen grants de escritura directos para `authenticated` ni acceso `anon`.
2. Publicar el contrato editorial y sincronizar el contenido: cualquier actividad sin `disponible_desde` y `disponible_hasta` debe bloquear `content:check` y el despliegue antes de activar UI de entregas.
3. Desplegar las rutas y acciones solo despues de que la migracion y el manifiesto con actividades validas esten disponibles.
4. Si se debe revertir la interfaz, retirar los enlaces y acciones sin borrar tablas ni datos academicos. No revertir la migracion destructivamente: las entregas y devoluciones son permanentes. Una correccion de esquema posterior requiere una nueva migracion aditiva.
5. Mantener la clave de servicio exclusivamente en el entorno de servidor y rotarla si se sospecha exposicion; no incluirla en artefactos, logs, props, errores ni variables `NEXT_PUBLIC_*`.

## Verificacion

1. Contenido: ejecutar `npm run content:sync`, `npm run content:check` y `npm run test:content`. Cubrir actividades sin fechas, con rango invertido y con fechas validas en el esquema/sincronizador. Referencias: FR-001, FR-015; AC-001.
2. Base: aplicar la migracion en Supabase local, ejecutar `npx supabase test db --local supabase/tests/database`, y ampliar las pruebas pgTAP para tablas, FKs, constraints, indices, RLS, grants y llamadas permitidas/denegadas como estudiante, profesor no responsable y profesor responsable. Verificar concurrencia de versiones y que no se pueda alterar una version previa. Referencias: FR-006 a FR-013; AC-004 a AC-008.
3. Tipos y calidad: regenerar tipos, ejecutar `npm run typecheck`, `npm run lint` y finalmente `npm run check`.
4. Seguridad: probar en acciones y datos que una cuenta no autenticada no entrega; un estudiante no lee, reemplaza ni devuelve entregas ajenas; un profesor no responsable no revisa; y un responsable puede consultar pendientes y publicar devoluciones. Ejecutar los asesores de seguridad y rendimiento de Supabase despues de la migracion. Referencias: FR-005, FR-007 a FR-013; AC-003, AC-005 a AC-008.
5. Runtime: usar `next-dev-loop` contra el servidor en ejecucion para verificar una actividad disponible y una fuera de su periodo, envio inicial, reemplazo, devolucion, estado pendiente, vista docente y comportamiento movil. Confirmar que la entrega posterior al periodo se acepta y registra su fecha, sin clasificarla automaticamente. Referencias: AC-002 a AC-009.

## Trazabilidad

| Requisitos | Decision de plan | Verificacion |
| --- | --- | --- |
| FR-001, FR-015 | Frontmatter obligatorio, manifiesto validado y contenido como fuente de verdad | `content:check`, pruebas de esquema, AC-001 |
| FR-002 a FR-006 | Formulario de texto, historial inmutable y accion de entrega validada | Pruebas de acciones y UI, AC-002 a AC-004 |
| FR-007 a FR-009 | Consultas RLS por actividad, pendientes en perfil y detalle protegido | pgTAP y UI docente, AC-005 |
| FR-010, FR-011 | Devoluciones versionadas y vistas separadas por actor | Pruebas de autorizacion y UI, AC-006 |
| FR-012, FR-013 | DAL solo servidor, acciones autorizadas, RPC atomicos y auditoria por versiones | Pruebas RLS/RPC y concurrencia, AC-007 a AC-008 |
| FR-014, FR-016 | Estados derivados, badges, accesibilidad y diseno adaptable | `next-dev-loop`, prueba movil, AC-003 y AC-009 |
