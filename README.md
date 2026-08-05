# PIAPC

Sitio de la catedra **Programacion de Inteligencia Artificial y Patrones de Comportamiento** de la Universidad Nacional de Rafaela.

La aplicacion usa [Next.js](https://nextjs.org/docs), [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/docs/), [Tailwind CSS](https://tailwindcss.com/docs), [shadcn/ui](https://ui.shadcn.com/docs) con [Base UI](https://base-ui.com/react/overview/getting-started) y [Supabase](https://supabase.com/docs).

## Referencias del repositorio

| Recurso | Ubicacion | Uso |
| --- | --- | --- |
| Aplicacion | [`src/app/`](src/app/) | Rutas, paginas y acciones del servidor. |
| Componentes reutilizables | [`src/components/`](src/components/) | Componentes de interfaz compartidos. |
| Integraciones y dominio | [`src/lib/`](src/lib/) | Clientes Supabase, perfiles, contenidos y proximas acciones. |
| Contenido publico generado | [`content/published/`](content/published/) | Replica publicada y versionada del contenido academico. |
| Manifiesto de contenidos | [`content/manifest.json`](content/manifest.json) | Indice generado que consume el catalogo. |
| Programa y glosario generados | [`src/content/generated/`](src/content/generated/) | Artefacto de compilacion; no se edita manualmente. |
| Sincronizacion y validacion de contenido | [`scripts/content/`](scripts/content/) | Replica, manifiesto, integridad y enlaces del contenido. |
| Migraciones y pruebas de base | [`supabase/`](supabase/) | Esquema, politicas y pruebas SQL locales. |
| Especificaciones | [`specs/`](specs/README.md) | Requisitos, planes, tareas y criterios de aceptacion. |
| Reglas de colaboracion | [`AGENTS.md`](AGENTS.md) | Convenciones tecnicas, seguridad y verificaciones. |
| Configuracion para agentes | [`opencode.json`](opencode.json) | Skills, referencias y servidores MCP. |

El contenido academico fuente se mantiene fuera de esta aplicacion, en `../contenidos`; `npm run content:sync` genera `content/published/` y `content/manifest.json` a partir de esa fuente. El programa y el glosario se generan desde `../programa/Programa PIAPC - 2026.md` y `../contenidos/glosario.md` durante el `prebuild`. Si esas fuentes no estan disponibles, se conserva el artefacto generado versionado.

La bibliografia academica permanece junto a cada material en `content/published/`, para conservar su contexto pedagogico; no se duplica en este README tecnico.

## Requisitos

- [Node.js 22.13 o posterior](https://nodejs.org/en/download).
- `npm` incluido con Node.js.
- Acceso al proyecto Supabase `edknatgzwxcsdywoqfft` para operaciones remotas.
- [Supabase CLI](https://supabase.com/docs/guides/local-development/cli/getting-started) y [Docker Desktop](https://docs.docker.com/desktop/) para ejecutar o probar la base local.
- Un proyecto de [Google Cloud](https://console.cloud.google.com/) para OAuth con Google.

## Inicio rapido

1. Instalá las dependencias y creá la configuracion local:

   ```bash
   npm install
   copy .env.example .env.local
   ```

2. Completá las variables de Supabase en `.env.local`.
3. Iniciá la aplicacion:

   ```bash
   npm run dev
   ```

4. Abrí [http://localhost:3000](http://localhost:3000).

## Variables de entorno

Usá [`.env.example`](.env.example) como referencia:

```env
NEXT_PUBLIC_SUPABASE_URL=https://edknatgzwxcsdywoqfft.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_REEMPLAZAR
NEXT_PUBLIC_SITE_URL=http://localhost:3000
SUPABASE_SERVICE_ROLE_KEY=REEMPLAZAR_SOLO_EN_SERVIDOR
```

La clave publicable se obtiene desde [Supabase Dashboard > Connect](https://supabase.com/dashboard/project/edknatgzwxcsdywoqfft/connect). No uses una clave secreta ni `service_role` en variables `NEXT_PUBLIC_*`. `SUPABASE_SERVICE_ROLE_KEY` solo puede utilizarse en codigo de servidor y no debe exponerse al navegador.

Para el manejo de variables de entorno, consultá la [documentacion de Next.js](https://nextjs.org/docs/app/guides/environment-variables) y la [guia de API keys de Supabase](https://supabase.com/docs/guides/api/api-keys).

## Comandos

| Comando | Funcion |
| --- | --- |
| `npm run dev` | Inicia Next.js en modo desarrollo. |
| `npm run build` | Valida el contenido y genera el build de produccion. |
| `npm run start` | Inicia el build de produccion. |
| `npm run lint` | Ejecuta ESLint. |
| `npm run typecheck` | Ejecuta TypeScript sin emitir archivos. |
| `npm run content:sync` | Replica el contenido academico fuente y regenera el manifiesto. |
| `npm run content:check` | Verifica manifiesto, integridad, metadatos y enlaces de contenido. |
| `npm run test:content` | Ejecuta pruebas del esquema de contenido. |
| `npm run check` | Ejecuta lint, typecheck y build. |

## Contenido academico

El catalogo consume el manifiesto generado en [`content/manifest.json`](content/manifest.json). Para actualizarlo desde las fuentes externas disponibles en el directorio padre:

```bash
npm run content:sync
npm run content:check
```

No edites manualmente `content/manifest.json`, `content/published/` ni `src/content/generated/`: son artefactos generados. Consultá [`content/published/README.md`](content/published/README.md) para la organizacion editorial y [`scripts/content/check.ts`](scripts/content/check.ts) para las reglas de validacion de enlaces y metadatos.

## Base de datos

Las migraciones en [`supabase/migrations/`](supabase/migrations/) crean perfiles de usuarios autenticados, roles, entregas y sus controles de acceso. Las cuentas nuevas comienzan como Alumno y el año se deriva de la fecha de alta en `America/Argentina/Buenos_Aires`.

Para vincular y aplicar las migraciones remotas, autenticá primero la [Supabase CLI](https://supabase.com/docs/reference/cli/supabase-login):

```bash
npx supabase link --project-ref edknatgzwxcsdywoqfft
npx supabase db push
```

Antes de aplicarlas a una base existente, verificá que no haya una tabla `public.profiles` o triggers con los mismos nombres. La migracion de perfiles es aditiva y conserva `display_name` y `avatar_url` por compatibilidad.

El primer profesor responsable se designa manualmente desde la base con la funcion privada `private.bootstrap_first_responsible(email, identificador_institucional)`. Esta operacion debe realizarla unicamente un operador de base autorizado y deja auditoria. Los cambios posteriores de roles, responsables y años se realizan desde el perfil de un profesor responsable usando un email conocido; el producto no expone listas ni busquedas de cuentas.

Para verificar la base local se requiere Docker Desktop en ejecucion:

```bash
npx supabase db reset --local
npx supabase test db --local supabase/tests/database
npx supabase gen types typescript --local
```

Referencias: [migraciones locales](https://supabase.com/docs/guides/local-development/managing-environments), [pruebas de base](https://supabase.com/docs/guides/local-development/testing/overview) y [Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security).

## Login con Google

### 1. Configurar Google Auth Platform

1. Abrí [Google Auth Platform](https://console.cloud.google.com/auth/overview) y elegí o creá un proyecto.
2. Configurá Branding y Audience. Durante desarrollo podés mantener la aplicacion en modo de prueba y agregar tus cuentas como usuarios de prueba.
3. En Data Access verificá los scopes `openid`, `userinfo.email` y `userinfo.profile`.
4. Creá un OAuth Client de tipo **Web application**.
5. Agregá `http://localhost:3000` en **Authorized JavaScript origins**.
6. Agregá esta URI exacta en **Authorized redirect URIs**:

   ```text
   https://edknatgzwxcsdywoqfft.supabase.co/auth/v1/callback
   ```

### 2. Configurar Supabase Auth

1. Abrí [Authentication > Providers > Google](https://supabase.com/dashboard/project/edknatgzwxcsdywoqfft/auth/providers).
2. Habilitá Google e ingresá allí el Client ID y Client Secret creados en Google. Estos valores no van en el repositorio.
3. Abrí [Authentication > URL Configuration](https://supabase.com/dashboard/project/edknatgzwxcsdywoqfft/auth/url-configuration).
4. Configurá `http://localhost:3000` como Site URL.
5. Agregá `http://localhost:3000/auth/callback` a Redirect URLs.

La configuracion se basa en la [guia de inicio de sesion con Google de Supabase](https://supabase.com/docs/guides/auth/social-login/auth-google) y la [documentacion de credenciales OAuth de Google](https://support.google.com/cloud/answer/15549257).

### 3. Probar el flujo

Con `npm run dev` en ejecucion, abrí [http://localhost:3000](http://localhost:3000), seleccioná **Continuar con Google** y verificá que el navegador termine en `/dashboard`.

## MCP, skills y especificaciones

[`opencode.json`](opencode.json) configura los siguientes servidores MCP:

- `supabase-piapc`: documentacion, base de datos, funciones y diagnostico del proyecto Supabase.
- `next-devtools`: rutas, errores, compilacion y estado del servidor de desarrollo de Next.js.
- `shadcn`: busqueda, documentacion e instalacion de componentes desde registries.

Para conectar Supabase MCP:

```bash
opencode mcp auth supabase-piapc
opencode mcp list
```

Las skills oficiales viven en [`.agents/skills/`](.agents/skills/) y su procedencia queda registrada en [`skills-lock.json`](skills-lock.json). Las reglas y comandos especificos de PIAPC viven bajo [`.opencode/`](.opencode/). La documentacion de referencia de OpenCode esta disponible en [opencode.ai/docs](https://opencode.ai/docs), y la de MCP en [modelcontextprotocol.io](https://modelcontextprotocol.io/specification/2025-06-18).

Todo cambio material de comportamiento, datos, seguridad o arquitectura debe seguir el flujo definido en [`specs/README.md`](specs/README.md): `/spec`, `/spec-plan`, `/spec-tasks`, `/spec-analyze`, `/spec-implement` y `/spec-converge`.

## Validacion

Antes de integrar cambios de codigo, ejecutá:

```bash
npm run check
```

Este comando ejecuta lint, verificacion de TypeScript, validacion del contenido y build de produccion.
