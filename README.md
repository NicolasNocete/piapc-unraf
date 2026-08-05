# PIAPC

Sitio de la cátedra Programación de Inteligencia Artificial y Patrones de Comportamiento de la Universidad Nacional de Rafaela.

## Requisitos

- Node.js 22.13 o posterior.
- Acceso al proyecto Supabase `edknatgzwxcsdywoqfft`.
- Un proyecto de Google Cloud para OAuth.

## Variables de entorno

Creá `.env.local` a partir de `.env.example` y reemplazá la clave publicable:

```env
NEXT_PUBLIC_SUPABASE_URL=https://edknatgzwxcsdywoqfft.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_REEMPLAZAR
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

La clave publicable se obtiene desde **Supabase > Project > Connect**. No uses una clave secreta ni `service_role` en variables `NEXT_PUBLIC_*`.

## MCP para agentes

El archivo `opencode.json` configura estos servidores MCP:

- `supabase-piapc`: documentación, base de datos, funciones y diagnóstico del proyecto Supabase.
- `next-devtools`: rutas, errores, compilación y estado del servidor de desarrollo de Next.js.
- `shadcn`: búsqueda, documentación e instalación de componentes desde registries.

1. Cerrá y reiniciá OpenCode dentro de esta carpeta.
2. Ejecutá `opencode mcp auth supabase-piapc`.
3. Completá la autorización de Supabase en el navegador.

Podés comprobar el estado de los servidores con:

```bash
opencode mcp list
```

## Skills y comandos

Las skills oficiales del proyecto viven en `.agents/skills/` y su procedencia queda registrada en `skills-lock.json`. Las reglas específicas de PIAPC y los comandos viven bajo `.opencode/`.

El flujo spec-driven usa un directorio por feature bajo `specs/`:

1. `/spec`: requisitos y criterios de aceptación.
2. `/spec-plan`: decisiones técnicas y verificación.
3. `/spec-tasks`: trabajo ordenado y trazable.
4. `/spec-analyze`: consistencia y cobertura.
5. `/spec-implement`: implementación de una spec aprobada.
6. `/spec-converge`: contraste final entre artifacts e implementación.

También están disponibles `/review`, `/check`, `/next-verify`, `/supabase-review` y `/ui-build`.

## Base de datos

Las migraciones crean perfiles de usuarios autenticados y agregan nombre, apellido, rol, año de cursada y autorización de profesor responsable. Las cuentas nuevas comienzan como Alumno y el año se deriva de la fecha de alta en `America/Argentina/Buenos_Aires`.

Después de autenticar Supabase CLI, se puede aplicar con:

```bash
npx supabase link --project-ref edknatgzwxcsdywoqfft
npx supabase db push
```

Antes de aplicarlas a una base existente, verificá que no haya una tabla `public.profiles` o triggers con los mismos nombres. La migración de perfiles es aditiva y conserva `display_name` y `avatar_url` por compatibilidad.

El primer profesor responsable se designa manualmente desde la base con la función privada `private.bootstrap_first_responsible(email, identificador_institucional)`. Esta operación debe realizarla únicamente un operador de base autorizado y deja auditoría. Los cambios posteriores de roles, responsables y años se realizan desde el perfil de un profesor responsable usando un email conocido; el producto no expone listas ni búsquedas de cuentas.

Para verificar la base local se requiere Docker Desktop en ejecución:

```bash
npx supabase db reset --local
npx supabase test db --local supabase/tests/database
npx supabase gen types typescript --local
```

## Login con Google

### 1. Configurar Google Auth Platform

1. Abrí [Google Auth Platform](https://console.cloud.google.com/auth/overview) y elegí o creá un proyecto.
2. Configurá Branding y Audience. Durante desarrollo podés mantener la aplicación en modo de prueba y agregar tus cuentas como usuarios de prueba.
3. En Data Access verificá los scopes `openid`, `userinfo.email` y `userinfo.profile`.
4. Creá un OAuth Client de tipo **Web application**.
5. Agregá `http://localhost:3000` en **Authorized JavaScript origins**.
6. Agregá esta URI exacta en **Authorized redirect URIs**:

```text
https://edknatgzwxcsdywoqfft.supabase.co/auth/v1/callback
```

### 2. Configurar Supabase Auth

1. Abrí **Authentication > Providers > Google**.
2. Habilitá Google e ingresá allí el Client ID y Client Secret creados en Google. Estos valores no van en el repositorio.
3. Abrí **Authentication > URL Configuration**.
4. Configurá `http://localhost:3000` como Site URL.
5. Agregá `http://localhost:3000/auth/callback` a Redirect URLs.

### 3. Probar el flujo

```bash
npm install
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000), seleccioná **Continuar con Google** y verificá que el navegador termine en `/dashboard`.

## Validación

```bash
npm run check
```

Este comando ejecuta lint, verificación de TypeScript y build de producción.
