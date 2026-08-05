# Plan de implementación: perfiles de usuario y roles

## Estado y alcance

- **Spec de origen:** `specs/001-user-profiles/spec.md`
- **Estado de la spec:** Draft
- **Estado del plan:** Propuesto
- **Requisitos cubiertos:** FR-001 a FR-024
- **Criterios cubiertos:** AC-001 a AC-020
- **Condición de implementación:** no comenzar `tasks.md` ni cambios de producto hasta que la spec sea aprobada explícitamente.

No quedan marcadores de aclaración ni ambigüedades funcionales abiertas. Durante la planificación se aclaró que las operaciones sobre terceros usan un email conocido sin búsqueda, que un nombre completo no se divide automáticamente y que el bootstrap registra un identificador institucional externo; estas decisiones quedaron incorporadas en FR-022 a FR-024.

## Estado actual

- `public.profiles` ya existe en la migración local `supabase/migrations/20260804200656_create_profiles.sql`, con una relación uno a uno con `auth.users`, creación automática, backfill, RLS de lectura y actualización propia, y eliminación en cascada (base parcial para FR-001, FR-002, FR-007, FR-012, FR-013, FR-016, FR-017 y FR-021).
- El perfil actual solo contiene `display_name`, `avatar_url` y timestamps. No tiene nombre y apellido separados, rol, año, autorización de responsable ni auditoría.
- `/dashboard` es un Server Component que usa `getClaims()`, pero solo lee `display_name` y `avatar_url`; tolera perfiles ausentes o incompletos mediante metadata y un valor por defecto.
- No existen rutas de perfil, finalización de perfil ni gestión acotada por email.
- `src/proxy.ts` solo actualiza la sesión. Se mantendrá fuera de las decisiones de autorización y no realizará consultas de perfil.
- El proyecto usa migraciones SQL imperativas (`schema_paths = []`) y no tiene tipos generados, pruebas SQL ni framework de pruebas de aplicación.
- El servidor Next.js 16.3.0 está activo en el puerto 3000, expone `/`, `/auth/callback` y `/dashboard`, y no reporta errores de runtime al redactar este plan.
- El proyecto Supabase remoto consultado no reporta tablas ni migraciones aplicadas. Antes del rollout se debe confirmar que el enlace apunta al entorno esperado y volver a inspeccionar schema, migraciones y usuarios; no se asumirá que está vacío.

## Arquitectura propuesta

### Flujo de identidad y perfil

1. Supabase Auth continúa siendo la fuente de identidad y `auth.users.created_at` la fuente del año inicial (FR-006, FR-014).
2. El trigger de alta crea exactamente un `public.profiles` por cuenta, con rol inicial Alumno, año argentino y nombres separados solo cuando el proveedor entrega campos separados (FR-001, FR-002, FR-006, FR-010, FR-012, FR-023).
3. Un nombre completo como `full_name` o `name` no se divide. Si falta nombre o apellido, el perfil queda incompleto (FR-009, FR-023).
4. Las rutas autenticadas pasan por un layout de servidor que valida identidad con `getClaims()`. Un segundo layout protege las rutas que requieren perfil completo; `/profile/complete` queda dentro del área autenticada pero fuera de esa segunda barrera (FR-009).
5. Las lecturas y mutaciones vuelven a autenticar y autorizar junto al acceso de datos. Los layouts y el proxy solo mejoran navegación y no son límites de seguridad (FR-007, FR-008, FR-011, FR-017, FR-018).
6. La persona consulta y edita su perfil en `/profile`. Los profesores responsables disponen allí de formularios mínimos por email conocido; no se ofrecen listas, sugerencias ni datos de terceros (FR-013, FR-015, FR-017, FR-022).
7. Las mutaciones sensibles se ejecutan en una transacción de base de datos, aplican invariantes y generan auditoría antes de devolver un resultado mínimo (FR-019, FR-020, FR-024).

### Estructura de rutas

Se usarán route groups para conservar las URLs públicas:

```text
src/app/
  (protected)/
    layout.tsx                         # identidad verificada
    profile/complete/
      page.tsx
      actions.ts
      profile-completion-form.tsx
    (complete)/
      layout.tsx                       # exige perfil completo
      dashboard/page.tsx               # mueve el dashboard actual
      profile/
        page.tsx
        actions.ts
        profile-form.tsx
        responsible-forms.tsx
```

- `(protected)/layout.tsx` será un Server Component que usa `getClaims()` y redirige cuentas no autenticadas a `/`.
- `(protected)/(complete)/layout.tsx` consulta el perfil propio y redirige a `/profile/complete` cuando falta nombre o apellido.
- `/profile/complete` redirige a `/dashboard` si el perfil ya está completo, evitando un flujo alternativo permanente.
- `/dashboard` y `/profile` reutilizan un acceso de datos server-only y nunca aceptan un ID de usuario desde el navegador para consultar el perfil propio.
- `src/proxy.ts` y `src/lib/supabase/proxy.ts` conservarán únicamente la actualización de cookies; no incorporarán la consulta de perfil porque Proxy no es una barrera de autorización ni está destinado a acceso lento de datos.

### Acceso de datos

Se agregará un módulo `server-only` compartido en `src/lib/profiles/server.ts` porque el perfil se utiliza en layouts, dashboard, perfil y acciones:

- `getVerifiedUserId()` obtiene `claims.sub` mediante `getClaims()` o termina la solicitud como no autenticada.
- `getCurrentProfile()` selecciona solo `first_name`, `last_name`, `role`, `course_year`, `is_responsible` y los campos de avatar que consume la UI.
- `requireCompleteProfile()` y `requireResponsibleProfile()` mantienen los chequeos cercanos a las consultas. Las funciones SQL sensibles repiten la autorización para evitar depender exclusivamente de Next.js.
- No se cachean perfiles entre solicitudes. Si se deduplican lecturas dentro de una renderización, se usará `cache()` de React sin estado mutable global.
- Los errores internos de Supabase no se serializan al cliente; las acciones devuelven estados esperados y mínimos.

## Datos y migraciones

### Estrategia de migración

- No se modifica `20260804200656_create_profiles.sql`, incluso si todavía no estuviera aplicado remotamente.
- Se crea una nueva migración mediante `npx supabase migration new extend_user_profiles` para conservar historia imperativa.
- La migración será compatible con la aplicación anterior: retendrá `display_name` y `avatar_url`. `display_name` deja de ser fuente de verdad, no se usa para inferir nombre o apellido y queda como campo legado hasta una limpieza futura explícita.

### Extensión de `public.profiles`

| Columna | Tipo y restricciones | Uso |
|---|---|---|
| `first_name` | `text`, nullable durante finalización, `CHECK` que impide texto vacío o solo espacios | FR-003, FR-009, FR-012, FR-013, FR-023 |
| `last_name` | `text`, nullable durante finalización, misma restricción | FR-003, FR-009, FR-012, FR-013, FR-023 |
| `role` | `text NOT NULL DEFAULT 'student'`, `CHECK ('student', 'professor')` | FR-004, FR-008, FR-010, FR-011 |
| `course_year` | `smallint NOT NULL`, `CHECK (course_year BETWEEN 1000 AND 9999)` | FR-005, FR-006, FR-014, FR-015 |
| `is_responsible` | `boolean NOT NULL DEFAULT false`, restricción que solo permite `true` con rol `professor` | FR-018, FR-019 |

Los valores internos `student` y `professor` se presentan como “Alumno” y “Profesor”. Se usa `text` con `CHECK` en lugar de un enum para mantener simples futuras migraciones sin ampliar el catálogo funcional actual.

No se almacena un indicador `is_complete`: se deriva de que `first_name` y `last_name` sean no nulos y no vacíos, evitando estado duplicado.

### Alta y backfill

- Se reemplaza de forma compatible `private.handle_new_user()` para escribir `first_name` desde `raw_user_meta_data.given_name` y `last_name` desde `raw_user_meta_data.family_name`, normalizados con `btrim` y `nullif`.
- No se usa `full_name`, `name` ni `display_name` para poblar los campos separados (FR-023).
- `course_year` se calcula con `extract(year from timezone('America/Argentina/Buenos_Aires', auth.users.created_at))` y se convierte a `smallint` (FR-006, FR-014).
- El backfill toma los mismos campos separados y la fecha original de cada `auth.users`; asigna `student` y `false` a todas las cuentas existentes (FR-016).
- La relación primaria `profiles.id -> auth.users.id ON DELETE CASCADE` y el `ON CONFLICT` del alta se conservan para unicidad e idempotencia (FR-001, FR-021).
- Antes de desplegar se inspeccionarán únicamente las claves disponibles en metadata del proveedor, sin registrar valores personales, para confirmar el porcentaje esperado de perfiles que requerirá finalización.

### Auditoría privada

Se crea `private.profile_change_audit` con:

- `id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY`.
- `target_user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE`.
- `actor_user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE` para actores autenticados.
- `external_actor_identifier text` para el operador del bootstrap.
- `actor_kind text CHECK ('authenticated', 'external')` y una restricción que exige exactamente la identidad correspondiente.
- `change_kind text CHECK ('role', 'responsibility', 'course_year')`.
- `old_value text NOT NULL`, `new_value text NOT NULL` y `changed_at timestamptz NOT NULL DEFAULT now()`.
- Índices sobre `target_user_id` y sobre `actor_user_id` cuando no sea nulo, necesarios para cascadas y verificaciones (FR-020, FR-021).

La tabla privada tendrá RLS habilitado como defensa adicional y no tendrá políticas ni grants para `anon` o `authenticated`. No se expondrá una lectura de auditoría en esta feature.

### Funciones y triggers

- Un trigger `BEFORE UPDATE` retira `is_responsible` al cambiar el rol a `student`, y una restricción impide responsables que no sean profesores (FR-019).
- Un trigger `AFTER UPDATE` registra por separado cada cambio de rol, responsabilidad o año. Obtiene `auth.uid()` para actores autenticados o un identificador externo establecido localmente por el bootstrap; rechaza cambios sensibles sin actor identificable (FR-020, FR-024).
- Las operaciones por email se implementan como RPC públicas `SECURITY INVOKER` de retorno mínimo, respaldadas por funciones `SECURITY DEFINER` en `private` con `search_path = ''`, nombres de objetos calificados y verificación explícita de `auth.uid()`, perfil completo y `is_responsible` (FR-011, FR-015, FR-018, FR-022).
- Las funciones privadas resuelven `lower(btrim(email))` contra `auth.users` dentro de la misma transacción, no guardan el email y no retornan UUID, email ni perfil del objetivo (FR-022).
- Se otorgará a `authenticated` solo `USAGE` de schema y `EXECUTE` de las firmas privadas estrictamente necesarias para los wrappers; `private` sigue fuera de los schemas expuestos por Data API. Se revoca `EXECUTE` de `PUBLIC`, `anon` y funciones no invocables.
- El bootstrap se realiza con una función privada separada, invocable solo por el propietario de base de datos. Exige target existente, identificador institucional no vacío y ausencia de otro bootstrap inicial; asigna Profesor y responsable en una transacción y activa la auditoría externa (FR-018, FR-020, FR-024).
- Las respuestas de operaciones por email indican solo éxito o un error genérico; no incluyen datos del objetivo. Los mensajes internos y la diferencia entre cuenta inexistente y operación no autorizada no se envían al navegador (FR-017, FR-022).

## Autorización, RLS y grants

### `public.profiles`

- Mantener RLS habilitado.
- Mantener una política `SELECT TO authenticated USING ((select auth.uid()) = id)` para que cada persona vea solo su fila (FR-007, FR-017).
- Mantener una política de actualización propia con `USING` y `WITH CHECK` sobre `auth.uid() = id`, pero limitar el grant de columnas a `first_name`, `last_name` y `avatar_url`. No otorgar actualización directa de `role`, `course_year`, `is_responsible`, `id` ni timestamps (FR-008, FR-013).
- Las restricciones de nombre aceptan `NULL` para el estado incompleto, pero rechazan cadenas vacías. Las acciones normales exigen ambos valores; un cliente que vacíe su propio perfil solo restringe su propio acceso y no obtiene privilegios.
- No agregar políticas que permitan a profesores leer filas ajenas. Las mutaciones sensibles pasan por funciones con resultado mínimo (FR-011, FR-015, FR-017, FR-022).

### Defensa en profundidad

- Cada Server Action valida `FormData`, obtiene identidad con `getClaims()` y autoriza el recurso o delega en una RPC que vuelve a validar al actor.
- No se usa `user_metadata` para roles o autorización. Rol y responsabilidad viven en datos de aplicación protegidos.
- No se introduce `service_role`, secret key ni variable `NEXT_PUBLIC_*` adicional.
- Los wrappers RPC, helpers, triggers y bootstrap tendrán grants explícitos por firma. Se inspeccionará `information_schema.role_routine_grants` y `pg_proc` para detectar ejecución accidental.
- Los cambios de rol, responsabilidad y año son atómicos con su auditoría; no se difiere auditoría con `after()` ni con trabajo cliente.
- La eliminación de un usuario elimina perfil y auditorías donde sea target o actor mediante foreign keys indexadas `ON DELETE CASCADE` (FR-021).

## Fronteras servidor/cliente

### Server Components

- Layouts de identidad y completitud.
- Páginas de dashboard, perfil y finalización.
- Lectura del perfil y decisión sobre qué formularios renderizar.
- Presentación de nombre, apellido, rol, año, responsabilidad y avatar con DTOs mínimos.

### Server Actions

- Completar nombre y apellido propios.
- Editar nombre y apellido propios.
- Cambiar rol por email conocido.
- Otorgar o retirar responsabilidad por email conocido.
- Corregir año por email conocido.

Cada acción usa un esquema Zod server-side, vuelve a autenticar, no acepta un `userId` del cliente, llama a una única mutación y revalida o redirige la ruta afectada. Se agregará `zod` como dependencia directa. Los valores se normalizan con `trim`; los nombres deben tener entre 1 y 100 caracteres, el email debe ser válido, el año debe ser entero de cuatro dígitos y las opciones deben pertenecer a sus conjuntos cerrados.

### Client Components

Solo los formularios que necesitan `useActionState` para errores de campo, confirmación y estado pendiente llevarán `"use client"`. Reciben valores primitivos mínimos desde el servidor y no crean un cliente Supabase ni consultan datos. El cierre de sesión mantiene la Server Action existente.

## shadcn/ui y experiencia

- El proyecto usa `base-nova`, Base UI, RSC, Tailwind v4, aliases `@/components` y `@/components/ui`, y Lucide según `components.json`.
- Se reutilizan `Avatar`, `Badge`, `Button` y `Separator` ya instalados.
- Se incorporan desde `@shadcn` y se revisan antes de aceptar cambios: `field`, `input`, `card`, `alert`, `select` y `spinner`. `field` incorpora también su dependencia `label`.
- Los formularios usan `FieldGroup`, `Field`, `FieldLabel`, `FieldError`, `Input` y `Select`; los errores globales usan `Alert`; el estado pendiente compone `Spinner` dentro de `Button`.
- Las opciones de rol y responsabilidad se presentan con labels en español y valores internos cerrados. Los items de `Select` se agrupan mediante `SelectGroup` por las reglas de Base UI.
- Los componentes interactivos se mantienen colocados con su ruta. Solo los primitivos del registry viven en `src/components/ui/`.
- No se agregan colores ad hoc ni un nuevo sistema visual. Se usan tokens semánticos, foco visible, labels asociados, `aria-invalid`, feedback con `role="alert"`, navegación por teclado, layout móvil y reduced motion existente.
- No se modifica `globals.css` salvo que la instalación oficial de un primitivo lo requiera y el diff sea revisado previamente.

## Archivos afectados

### Base de datos y tipos

- **Nuevo:** `supabase/migrations/<timestamp>_extend_user_profiles.sql`.
- **Nuevo:** `supabase/tests/database/001_user_profiles.test.sql`.
- **Nuevo generado:** `src/lib/supabase/database.types.ts`.
- **Modificar:** `src/lib/supabase/server.ts` y `src/lib/supabase/client.ts` para parametrizar los clientes con `Database`.
- **No modificar:** `supabase/migrations/20260804200656_create_profiles.sql`.

### Aplicación

- **Nuevo:** `src/lib/profiles/server.ts`.
- **Nuevo:** layouts y archivos bajo `src/app/(protected)/` detallados en la estructura de rutas.
- **Mover y modificar:** `src/app/dashboard/page.tsx` a `src/app/(protected)/(complete)/dashboard/page.tsx`.
- **Modificar:** `src/app/auth/callback/route.ts` para validar `next` como ruta local segura; la completitud se resuelve en los layouts, no en parámetros del cliente.
- **Conservar:** `src/proxy.ts` y `src/lib/supabase/proxy.ts` sin lógica de autorización de perfil.
- **Modificar:** `package.json` y `package-lock.json` para `zod` y scripts de prueba/tipos si se incorporan.
- **Modificar:** `README.md` para documentar el nuevo perfil, bootstrap inicial, migración, generación de tipos y verificación.

### UI

- **Nuevos mediante shadcn CLI y revisión de diff:** `src/components/ui/field.tsx`, `input.tsx`, `label.tsx`, `card.tsx`, `alert.tsx`, `select.tsx` y `spinner.tsx`.
- **Sin cambios previstos:** primitivos existentes salvo que el dry-run muestre una dependencia necesaria; nunca se sobrescriben cambios locales automáticamente.

## Rollout

1. Confirmar proyecto Supabase enlazado, versión Postgres, tablas, migraciones y cantidad de cuentas. El estado remoto actualmente observado es vacío y debe reconfirmarse.
2. Crear la migración con CLI, aplicarla primero a Supabase local y ejecutar backfill sobre datos representativos, incluidos perfiles incompletos y fechas cercanas al cambio de año argentino.
3. Ejecutar pruebas pgTAP de grants, RLS, funciones, invariantes, auditoría y cascadas.
4. Generar tipos TypeScript desde el schema local verificado y completar aplicación/UI.
5. Ejecutar `npm run check` y el ciclo `next-dev-loop` en desktop y mobile.
6. Hacer backup o punto de restauración del entorno objetivo y aplicar primero las migraciones. La aplicación anterior continúa funcionando porque se retienen las columnas actuales.
7. Ejecutar smoke tests SQL de lectura propia, denegaciones y RPC con usuarios de prueba; correr advisors de seguridad y rendimiento.
8. Desplegar la aplicación y verificar login, finalización, perfil y formularios de responsable.
9. Solo después de validar la aplicación, un operador autorizado ejecuta el bootstrap privado con el email del primer profesor y su identificador institucional. Verificar la auditoría sin exponerla en UI.

No se aplica automáticamente ninguna migración remota durante la implementación sin confirmación explícita del usuario.

## Rollback

- **Aplicación:** volver al build anterior. La migración es aditiva y conserva `display_name`, `avatar_url`, políticas de lectura propia y el flujo de login previo.
- **Antes de datos reales o bootstrap:** si la migración solo se aplicó localmente, usar `supabase db reset` para reconstruir desde historia.
- **Después de aplicar remotamente:** no editar ni borrar migraciones aplicadas. Crear una migración compensatoria revisada si fuera imprescindible.
- **Después de actividad auditada:** preferir un forward fix. Eliminar columnas o tablas perdería rol, año y auditoría, por lo que requiere backup, aprobación explícita y una ventana de mantenimiento.
- **Bootstrap incorrecto:** un operador autorizado revoca responsabilidad y corrige rol mediante una operación auditada; no se elimina manualmente el historial salvo por la baja de cuenta definida en FR-021.

## Verificación

### Base de datos y seguridad

Ejecutar, como mínimo:

```text
npx supabase db reset --local
npx supabase test db --local supabase/tests/database
npx supabase gen types typescript --local
npm run check
```

La CLI local deberá ejecutarse de forma secuencial en Windows porque invocaciones paralelas observaron contención sobre `~/.supabase/telemetry.json`; esto no afecta el diseño, pero sí la confiabilidad del proceso de verificación.

Casos pgTAP:

- Alta única e idempotente, rol Alumno y año argentino (FR-001, FR-002, FR-005, FR-006, FR-010, FR-014; AC-001, AC-004, AC-005, AC-016).
- Metadata separada completa frente a `full_name` sin separación (FR-003, FR-009, FR-012, FR-023; AC-002, AC-003, AC-019).
- Backfill de cuentas existentes con fecha original (FR-016; AC-012).
- Lectura propia permitida y lectura ajena denegada para alumno, profesor y responsable (FR-007, FR-017; AC-006, AC-007).
- Actualización propia de nombres permitida; actualización propia de rol, responsabilidad y año denegada (FR-008, FR-013; AC-008, AC-010).
- RPC denegadas a no responsables y permitidas a responsables, sin retorno de perfil (FR-011, FR-015, FR-018, FR-022; AC-009, AC-011, AC-013, AC-014, AC-018).
- Responsabilidad rechazada para alumnos y retirada al degradar un profesor (FR-019; AC-015).
- Auditoría exacta de actor autenticado, fecha, anterior y nuevo para cada cambio (FR-020; AC-009, AC-011, AC-013, AC-014).
- Bootstrap único con identificador institucional externo y sin ejecución para roles públicos (FR-018, FR-020, FR-024; AC-020).
- Eliminación de perfil y auditorías donde la cuenta sea target o actor (FR-021; AC-017).
- Inspección de RLS habilitado, grants de columnas, schemas expuestos, execute por firma, funciones con `search_path = ''` e índices de foreign keys.

Después de cualquier cambio remoto, ejecutar advisors de Supabase. El warning actual de protección de contraseñas filtradas se documenta como preexistente y no bloquea esta feature basada en OAuth; cualquier advisor nuevo causado por la migración sí bloquea el rollout.

### Aplicación y runtime

- `npm run lint`, `npm run typecheck`, `npm run build` y finalmente `npm run check`.
- Next MCP: `get_routes`, `get_errors` y compilación explícita de `/dashboard`, `/profile` y `/profile/complete`.
- Navegador con `next-dev-loop`:
  - visitante no autenticado redirigido desde rutas protegidas;
  - perfil incompleto limitado a completar datos o salir;
  - nombre completo del proveedor no dividido;
  - perfil completo muestra nombre, apellido, rol y año;
  - edición propia refleja el cambio sin recarga insegura;
  - un no responsable no ve formularios y una invocación directa es rechazada;
  - un responsable opera por email sin listas, sugerencias ni datos del objetivo;
  - formularios muestran errores accesibles y estado pendiente;
  - comportamiento correcto en viewport móvil y desktop, teclado y reduced motion.

## Matriz de trazabilidad

| Requisitos | Implementación principal | Verificación principal |
|---|---|---|
| FR-001, FR-002 | PK/FK, trigger de alta, `ON CONFLICT` | pgTAP de alta e idempotencia; AC-001, AC-016 |
| FR-003, FR-009, FR-012, FR-023 | nombres separados, layout de completitud, acciones propias | pgTAP metadata + navegador; AC-002, AC-003, AC-019 |
| FR-004, FR-008, FR-010, FR-011 | rol con constraint, default y mutación privada | grants/RPC permitida-denegada; AC-004, AC-008, AC-009 |
| FR-005, FR-006, FR-014, FR-015 | `course_year`, timezone y RPC de corrección | fechas límite y auditoría; AC-005, AC-011 |
| FR-007, FR-013, FR-017 | RLS propia, `/profile`, DTO mínimo | actores permitidos/denegados y browser; AC-006, AC-007, AC-010 |
| FR-016 | backfill desde `auth.users` | cuentas históricas completas/incompletas; AC-012 |
| FR-018, FR-019 | responsabilidad separada, bootstrap y delegación | invariantes y flujos auditados; AC-013, AC-014, AC-015 |
| FR-020, FR-024 | trigger y auditoría privada con dos tipos de actor | pgTAP de valores y bootstrap; AC-009, AC-011, AC-013, AC-014, AC-020 |
| FR-021 | cascadas indexadas desde `auth.users` | eliminación como target y actor; AC-017 |
| FR-022 | RPC y formularios por email con respuesta mínima | ausencia de listas/datos y tests de retorno; AC-018 |

## Riesgos y mitigaciones

- **El remoto observado no coincide con la migración local:** bloquear rollout hasta confirmar enlace y estado; nunca aplicar SQL suponiendo una base vacía.
- **Metadata real de Google sin campos separados:** esperado por diseño; la cuenta pasa por finalización sin inferir nombres.
- **Funciones privilegiadas invocables accidentalmente:** schema privado no expuesto, wrappers invoker, verificación interna, grants por firma y tests de ejecución denegada.
- **Desincronización entre rol y responsabilidad:** constraint más trigger de degradación, ambos probados.
- **Auditoría huérfana o cascadas lentas:** foreign keys `ON DELETE CASCADE` e índices sobre target y actor.
- **Enumeración por email:** no hay búsqueda/lista/autocomplete; la RPC devuelve estado mínimo y errores genéricos, y solo un responsable verificado puede invocarla.
- **Rollback de app después de migrar DB:** conservar columnas existentes y desplegar DB antes que aplicación.
- **Perfil faltante por fallo de trigger:** las rutas no inventan un perfil desde metadata; reportan el fallo y la verificación de migración bloquea el rollout.
