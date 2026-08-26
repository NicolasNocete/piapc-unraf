# Plan de implementacion: gestion de contenidos academicos

## Estado y alcance

- **Spec de origen:** `specs/003-content-management/spec.md`
- **Estado de la spec:** Approved
- **Estado del plan:** Propuesto
- **Requisitos cubiertos:** FR-001 a FR-021
- **Criterios cubiertos:** AC-001 a AC-015

No quedan marcadores `[NEEDS CLARIFICATION]` ni ambiguedades funcionales abiertas. Este plan decide la forma de replicar y publicar los Markdown sin cambiar su condicion de fuente academica autoritativa.

## Estado actual

- La aplicacion usa Next.js 16.3.0 con App Router, React 19.2.8, TypeScript estricto, Tailwind CSS v4, shadcn/ui `base-nova` sobre Base UI y Lucide.
- El servidor de desarrollo esta activo en el puerto 3000. Next MCP informa las rutas `/`, `/auth/callback`, `/dashboard` y `/favicon.ico`, sin errores de configuracion o runtime al redactar este plan.
- `/dashboard` es un Server Component autenticado mediante `supabase.auth.getClaims()`. Contiene accesos preparados para ejes, programa y cronograma, pero todavia no existe una ruta ni un cargador de contenidos.
- Los unicos primitivos shadcn instalados son `Avatar`, `Badge`, `Button` y `Separator`.
- No existen dependencias para analizar frontmatter, validar esquemas o renderizar Markdown GFM. Tampoco existe un framework de pruebas de aplicacion.
- El repositorio Git de la aplicacion termina en `PIAPC/app`. El directorio autoritativo `PIAPC/contenidos` es un hermano externo al repositorio y no estaria disponible en un checkout o build remoto de la app.
- El corpus actual contiene 77 Markdown: 57 bajo `ejes/`, 6 bajo `transversales/`, 9 bajo `plantillas/`, 2 bajo `soluciones/` y 3 en la raiz. Todos tienen frontmatter inicial con `id`, `titulo`, `tipo`, `audiencia`, `acceso` y `version`, y no se detectaron IDs duplicados.
- Hay 75 documentos con `acceso: publico`, uno con `acceso: diferido` y uno con `acceso: privado`. El unico diferido es `soluciones/liberables/eje-01-clasificacion-inicial.md`; su fecha `publicar_desde` no lo libera automaticamente porque FR-009 exige una decision docente manual.
- El alcance inicial actual produce 75 materiales publicables: `esquema-editorial.md` es privado y se omite por su control de acceso, y la solucion diferida aun no liberada tambien queda excluida. Este numero es una linea base de inventario, no una constante de codigo.
- No hay binarios reales, imagenes Markdown ni descargas dentro de `contenidos/`. Si hay tablas GFM, listas de tareas, URLs desnudas y bloques de codigo en varios lenguajes.
- Seis enlaces relativos salen de `contenidos/` hacia documentos del laboratorio `guardia-sigilo`. Como esos destinos tampoco pertenecen al repositorio de la app, necesitaran una URL publica aprobada en el mapa de enlaces antes del rollout.
- Supabase solo contiene la migracion local de perfiles. No hay tablas, Storage ni autorizacion editorial que deban reutilizarse para esta feature.

## Decisiones de arquitectura

### Fuente y replica publicable

Se usara una **replica Markdown versionada dentro del repositorio de la app**, no una base de datos:

1. `../contenidos` sigue siendo la unica fuente academica y el unico lugar de edicion (FR-005, FR-017).
2. Un comando local de sincronizacion lee exclusivamente ese arbol mediante una allowlist de categorias, valida el corpus y copia solamente los materiales publicables a `content/published/`.
3. La replica conserva rutas relativas y cuerpos Markdown para facilitar comparacion, resolucion de enlaces y auditoria. No se modifica manualmente; toda diferencia exige una nueva sincronizacion.
4. Cada archivo copiado obtiene un SHA-256 en `content/manifest.json`. Un workflow de sincronizacion protegido, ejecutado en un runner que tiene disponible la fuente `../contenidos`, recalcula el SHA-256 de cada Markdown autoritativo, compara la replica recien generada y firma la atestacion de fuente con una clave privada de GitHub Actions inaccesible a los PR. `content/source-attestation.json` contiene ruta fuente, digest, version, hora, `snapshotHash` calculado sobre la representacion canonica de `manifest.json` sin la atestacion, firma y key ID. `content:check` verifica la firma con la clave publica versionada, recalcula `snapshotHash` y los hashes de la replica, y exige que coincidan con manifest y atestacion. Rechaza cambios directos, archivos sin manifest o atestacion, manifest sin archivo o divergencias con el registro editorial (FR-005, FR-015).
5. La replica y sus manifiestos se incluyen en el mismo commit que la aplicacion. Un build remoto solo consume esa instantanea; nunca depende de que exista `../contenidos` (FR-006).
6. Un cambio invalido bloquea el nuevo build y deja servido el despliegue valido anterior. No se degrada silenciosamente ni se retira contenido valido ya desplegado (FR-011, FR-012, FR-014).

No se persiste el cuerpo en Supabase porque el contenido es inmutable durante cada despliegue, publico y editado fuera de la app. Una tabla duplicaria la fuente, agregaria sincronizacion runtime, RLS y rollback de datos sin aportar valor al alcance aprobado.

### Flujo editorial y auditoria

La publicacion es una operacion de repositorio, no una mutacion de la aplicacion:

1. Un autor modifica el Markdown autoritativo y ejecuta `npm run content:sync` para los IDs afectados.
2. El comando valida la fuente, actualiza la replica y agrega un evento a `content/publication-ledger.json` con `contentId`, `sourcePath`, `version`, `digest`, `action`, `author`, `approver`, `approvedAt`, referencia al cambio, aviso de correccion opcional, `previousEventHash` y `eventHash`.
3. Las acciones cerradas son `publish`, `release`, `correct` y `retire`. `release` es la unica que incorpora un documento `diferido`; una fecha del frontmatter es informativa y nunca dispara la copia por si sola (FR-007, FR-009).
4. El PR debe ser aprobado por el docente responsable indicado en el evento. `CODEOWNERS` y la proteccion de la rama principal exigen esa revision para `content/**`, `scripts/content/**` y el cargador (FR-006, FR-020).
5. Un workflow de GitHub Actions consulta el autor y la revision aprobatoria del PR mediante la API de GitHub. Compara el autor con la allowlist versionada `content/editorial-authors.json`, y el aprobador con `content/editorial-approvers.json` y la revision real del PR. Rechaza eventos cuyo autor, aprobador, accion, fecha o referencia de PR no coincidan con las identidades y la revision verificadas; el ledger no es por si solo una prueba de autorizacion.
6. `content:check` recalcula cada `eventHash` sobre la representacion canonica del evento y exige que `previousEventHash` apunte al evento anterior. El workflow obtiene el ledger del commit base del PR y exige que sea un prefijo byte a byte de la secuencia propuesta: solo se aceptan eventos anexados, nunca una edicion, eliminacion, reordenamiento o insercion dentro de la historia existente. La proteccion de rama prohíbe force-push y el workflow es obligatorio antes del merge. Tambien exige que el ultimo evento aplicable de cada ID coincida con el manifest publicado.
7. La identidad verificada de GitHub, el PR y el ledger conservan autor, aprobador, fecha, version y accion. El ledger no elimina eventos al retirar un material y Git conserva la historia mientras exista el repositorio (AC-015).
8. Una correccion marcada por el docente como relevante exige `action: correct` y `correctionNotice`; el aviso vigente se presenta en la pagina mediante `Alert` (FR-018).
9. El merge a la rama desplegable activa el siguiente despliegue. No hay endpoint, Server Action ni UI editorial (FR-006, FR-017).

`CODEOWNERS` debe incluir `content/**`, `scripts/content/**`, `src/lib/content/**`, `src/app/contenidos/**`, `content/editorial-authors.json`, `content/editorial-approvers.json`, `.github/CODEOWNERS` y `.github/workflows/**`. La proteccion de rama exige aprobacion de esos propietarios y ejecuta los workflows desde la rama base, no desde el cambio propuesto. Sin esas protecciones, la identidad declarada en el ledger seria solo informativa y no satisfaria FR-020.

### Seleccion y control de acceso

- El sincronizador solo recorre `../contenidos`; nunca recorre `../docentes`, `../repositorio` ni la raiz completa de PIAPC.
- Se incluyen ejes, transversales, plantillas, glosario, indices publicos y soluciones diferidas que tengan un evento docente `release` vigente (FR-016).
- Un documento `publico` del alcance se copia. Un documento `diferido` solo se copia mediante `release` (FR-007 a FR-010).
- Los documentos con `acceso: privado` se omiten de la replica por construccion; su presencia en la fuente no bloquea los demas materiales. La validacion aborta unicamente si un privado llega por error a `content/published/` o al manifest.
- Los documentos diferidos no liberados y privados no generan entrada de manifest, ruta, metadata, indice, busqueda ni bundle. Una URL adivinada responde con el mismo `not-found` generico que un ID inexistente, sin revelar titulo o clasificacion (FR-008 a FR-010).
- Todo contenido `publico` publicado queda disponible anonimamente, sin condicionar el acceso a su valor de `audiencia`. Toda persona con identidad Supabase autenticada y verificada mediante `getClaims()` se considera audiencia `estudiante` para un diferido liberado con esa audiencia. Si se aprobara un diferido para otra audiencia, el sincronizador lo rechazara hasta que una spec defina su modelo de autorizacion. La verificacion ocurre dentro del cargador de detalle, no en `proxy.ts` (FR-010, AC-006).

### Validacion y modelo de contenido

Se agregara un esquema Zod discriminado por `tipo`:

- Campos base obligatorios: `id`, `titulo`, `tipo`, `audiencia`, `acceso` y `version`.
- Conjuntos cerrados segun `esquema-editorial.md` para `tipo`, `nivel`, `audiencia` y `acceso`.
- `lectura`, `actividad` y `laboratorio` requieren `eje`, `orden`, `nivel`, `clases`, `modalidad`, `duracion_minutos`, `resultados`, `prerrequisitos` y `evaluable`, con los tipos y rangos definidos por el contrato editorial.
- `indice`, `referencia`, `plantilla`, `guia-docente`, `solucion` y `rubrica` solo requieren los campos base; aceptan los campos pedagogicos aplicables siempre que tengan el tipo valido. Un `tipo` nuevo o un campo requerido adicional exige actualizar primero el contrato editorial y esta matriz.
- `publicar_desde` solo se admite para `solucion` con `acceso: diferido`, tiene formato de fecha civil y es informativo: no reemplaza el evento docente `release`.
- Parseo exclusivo del primer bloque de frontmatter para no confundir los ejemplos YAML de `esquema-editorial.md` con documentos reales.
- IDs unicos y estables; la URL usa `id`, no el nombre del archivo (FR-003, FR-012).
- Validacion del grafo de enlaces, destinos relativos, archivos asociados, rutas fuera de allowlist y protocolos permitidos (FR-013).
- Normalizacion explicita de `publicar_desde` como fecha civil en formato `YYYY-MM-DD`, sin usarla para liberacion automatica.

`content:check` reporta archivo, campo o enlace afectado y termina con error. No genera una publicacion parcial: el despliegue anterior conserva el catalogo valido mientras se corrige la fuente (FR-014, AC-009).

### Enlaces y archivos asociados

- Los enlaces Markdown relativos entre documentos publicados se resuelven primero contra la ruta fuente y luego se reescriben a `/contenidos/{id}` mediante el indice del manifest.
- Los enlaces a material diferido no liberado se rechazan para evitar anunciar o filtrar su existencia. El autor debe retirar temporalmente el enlace o liberar ambos materiales en el mismo cambio.
- Los enlaces externos solo admiten `https`, `http` y `mailto`; se rechazan `javascript:`, `data:`, `file:` y destinos absolutos del sistema local.
- Los enlaces actuales hacia `laboratorios/` deben declararse en `content/external-links.json` con una URL publica aprobada. La sincronizacion falla si encuentra un destino fuera de `contenidos/` sin mapeo; no se inventa una URL ni se copia el laboratorio completo, que sigue fuera de alcance.
- Si aparecen imagenes o descargas reales, el sincronizador las copia a `content/published-assets/` con ruta estable y hash, valida que el archivo permanezca dentro de la allowlist y genera su URL publica. No interpreta menciones dentro de bloques de codigo como dependencias (FR-013).
- Video, audio y recursos interactivos siguen siendo enlaces externos y no se replican en este alcance.

### Rutas y renderizado

Se agregaran rutas publicas:

```text
src/app/contenidos/
  layout.tsx
  page.tsx
  not-found.tsx
  [id]/
    page.tsx
  diferidos/[id]/
    page.tsx
  _components/
    content-card.tsx
    content-markdown.tsx
    content-navigation.tsx
```

- `/contenidos` renderiza el catalogo agrupado por ejes y categorias, respetando `eje`, `orden` y relaciones declaradas (FR-001, FR-002, FR-016).
- El catalogo incluye un indice de anclas hacia cada eje publicado. Cada destino tiene un identificador estable y margen de desplazamiento para conservar visible su encabezado (FR-022).
- El catalogo ofrece un selector local entre vistas por eje y por clase. La vista por eje ordena los grupos por numero de eje; la vista por clase toma los numeros del cronograma y solo agrupa `lectura`, `referencia` y `actividad` en todas sus clases declaradas. Los demas tipos se excluyen de esa vista y los materiales admitidos sin clases quedan en recursos generales. Las clases sin materiales siguen disponibles e indican esa condicion. Ambas vistas presentan la etiqueta `CLASES` de cada tarjeta y su indice de anclas correspondiente (FR-023).
- El orden interno de cada grupo prioriza los materiales que no son `referencia` y deja las referencias al final, sin alterar la clasificacion ni los metadatos publicados (FR-024).
- `/contenidos/[id]` obtiene solo entradas `publico` del manifest. `generateStaticParams()` devuelve todos los IDs publicos y `dynamicParams = false` impide render bajo demanda para IDs no publicados.
- `/contenidos/diferidos/[id]` es una ruta dinamica que primero valida `getClaims()` dentro de su cargador y redirige a login con un retorno local seguro cuando no existe identidad verificada. La redireccion se aplica por igual a todo ID de esa ruta para no revelar su existencia. Despues de verificar identidad, obtiene solo entradas `diferido` liberadas con audiencia `estudiante`; los IDs ausentes, privados o diferidos no liberados responden con el `not-found` generico. No exporta `generateStaticParams`, no se prerenderiza y nunca incorpora su cuerpo en artefactos estaticos.
- La ruta publica usa `generateMetadata()` con el titulo y una descripcion textual acotada del material; no usa datos de solicitud. La ruta diferida no define metadata especifica: hereda metadata generica que no incluye ID, titulo ni descripcion del material. El `not-found.tsx` es generico y no distingue privado, diferido o inexistente.
- `content-markdown.tsx` usa `react-markdown` y `remark-gfm` para tablas, task lists, URLs desnudas y bloques cercados. No habilita MDX, `rehype-raw` ni `dangerouslySetInnerHTML`; el contenido nunca se ejecuta como codigo o instrucciones (FR-004 y seguridad de la spec).
- Los componentes de render reescriben enlaces con el indice validado, endurecen enlaces externos con `rel="noreferrer noopener"` y presentan tablas y bloques de codigo con overflow horizontal controlado.
- Cada pagina muestra tipo, audiencia/nivel aplicable, version vigente, navegacion anterior/siguiente cuando el orden la define y el aviso de correccion vigente (FR-002, FR-003, FR-015, FR-018).
- La home publica y el dashboard enlazan a `/contenidos`; el catalogo publica solo contenido `publico`. El dashboard puede ofrecer enlaces a diferidos liberados para cuentas autenticadas, sin anunciar esos materiales en el catalogo publico (FR-010).
- `signInWithGoogle` acepta exclusivamente un retorno local validado y `auth/callback` conserva esa validacion antes de redirigir. La ruta diferida usa ese retorno para que la persona vuelva al material solicitado despues del login; no acepta URLs externas ni serializa el ID en un destino no validado.

## Fronteras servidor/cliente

### Build y servidor

- El sincronizador y el validador usan `node:fs`, `node:path` y `node:crypto` fuera del grafo cliente.
- `src/lib/content/server.ts` lleva `import "server-only"`, carga manifest y Markdown, y expone DTOs inmutables para catalogo, detalle, metadata y navegacion.
- Layout, detalle, metadata, Markdown y navegacion son Server Components. El catalogo mantiene la carga del manifest en servidor y serializa exclusivamente sus metadatos publicos al limite cliente que alterna las vistas; nunca envia cuerpos Markdown ni datos privados como props cliente.
- La lectura publica se realiza durante `next build` para prerenderizar rutas `publico`. Las rutas diferidas leen solo la replica local en cada solicitud y usan Supabase exclusivamente para verificar identidad; no hay I/O contra el directorio fuente externo.

### Cliente

- `content-catalog.tsx` es un Client Component acotado que conserva la vista elegida durante la navegacion actual y genera ambos agrupamientos a partir de metadatos publicos. No realiza I/O, no registra preferencias ni recibe cuerpos Markdown (FR-021, FR-023).

## Datos, migraciones y RLS

### Datos versionados en Git

- `content/published/`: replica Markdown autorizada.
- `content/published-assets/`: solo archivos asociados realmente utilizados.
- `content/manifest.json`: indice generado, hashes, rutas, metadatos normalizados y relaciones publicadas.
- `content/source-attestation.json`: hashes obtenidos de los Markdown autoritativos durante la sincronizacion, vinculados al snapshot publicado.
- `content/publication-ledger.json`: eventos editoriales append-only encadenados por hash y avisos de correccion.
- `content/external-links.json`: allowlist explicita para destinos documentales fuera del corpus.

No se almacenan lecturas, progreso, preferencias, busquedas ni actividad de estudiantes (AC-014).

### Supabase

- No se crean tablas, columnas, funciones, buckets, migraciones ni tipos Supabase.
- No se modifican `public.profiles`, sus grants ni sus politicas RLS.
- RLS no aplica al corpus porque no se expone mediante Postgres, Data API o Storage.
- No se agrega `service_role`, secret key ni variable `NEXT_PUBLIC_*`.
- Las identidades y autorizaciones editoriales se resuelven en el flujo protegido del repositorio, no mediante metadata de usuario o claims manipulables de la aplicacion.

Si una feature futura exige edicion runtime, personalizacion o liberacion sin despliegue, requerira una nueva spec y un modelo de datos/RLS propio; no se incorpora compatibilidad anticipada aqui.

## shadcn/ui y experiencia

- Se conserva `base-nova`, Base UI, RSC, Tailwind v4, aliases `@/components` y `@/components/ui`, Lucide y el lenguaje visual existente.
- Se reutilizan `Badge`, `Button` y `Separator` para metadata, navegacion y estructura.
- Se incorporan mediante `npx shadcn@latest`, despues de revisar `--dry-run`, diff y documentacion vigente: `card` para entradas del catalogo, `breadcrumb` para ubicacion y `alert` para correcciones relevantes.
- Los componentes de feature permanecen colocados bajo `src/app/contenidos/_components/`; solo primitivas del registry viven en `src/components/ui/`.
- Se usan tokens semanticos y variantes existentes. No se agregan colores ad hoc ni se sobrescriben primitivas locales sin aprobacion.
- El documento renderizado mantiene jerarquia de encabezados, landmarks, foco visible, nombres de enlace descriptivos y una medida de lectura acotada.
- Tablas y codigo permiten desplazamiento horizontal sin desbordar la pagina; enlaces y controles mantienen objetivos tactiles adecuados.
- La navegacion y todo el contenido esencial se verifican en movil y escritorio, con teclado, zoom y preferencia de movimiento reducido (FR-019).
- El indice de ejes usa enlaces HTML a fragmentos, con etiqueta accesible y foco visible; no incorpora estado ni hidratacion cliente (FR-022).
- El selector usa botones con estado presionado y nombre accesible. Cada vista muestra solo su indice y secciones activas; las anclas conservan foco visible y margen de desplazamiento en movil y escritorio (FR-023).

## Dependencias y scripts

- Agregar dependencias directas: `gray-matter` para frontmatter, `zod` para contrato, `react-markdown` para render seguro y `remark-gfm` para las construcciones usadas por el corpus.
- Agregar `tsx` como dependencia de desarrollo para ejecutar sincronizacion, validacion y pruebas TypeScript sin introducir un framework de pruebas completo.
- Agregar scripts:
  - `content:sync`: replica IDs seleccionados y registra el evento editorial.
  - `content:check`: valida esquema, alcance, hashes, auditoria, enlaces y activos.
  - `test:content`: ejecuta pruebas con el test runner de Node a traves de `tsx`.
  - `build`: ejecuta `content:check` antes de `next build`, de modo que todo despliegue falle cerrado.
  - `check`: incorpora `test:content` y conserva lint, typecheck y build.

Las versiones se fijan en `package-lock.json`. No se incorpora MDX ni un resaltador de sintaxis en el alcance inicial.

## Archivos afectados

### Publicacion y validacion

- **Nuevo:** `content/README.md` con reglas de replica y advertencia de no editar manualmente.
- **Nuevos generados:** `content/published/**`, `content/published-assets/**`, `content/manifest.json` y `content/source-attestation.json`.
- **Nuevos:** `content/publication-ledger.json` y `content/external-links.json`.
- **Nuevos:** `scripts/content/sync.ts`, `scripts/content/check.ts` y helpers colocados bajo `scripts/content/lib/` solo cuando exista reutilizacion real.
- **Nuevos:** fixtures y pruebas bajo `scripts/content/__tests__/`.
- **Nuevo:** `.github/CODEOWNERS` para exigir revision docente sobre publicacion y pipeline.
- **Nuevos:** `.github/workflows/sync-content.yml` y `verify-content-approval.yml`; el primero genera una atestacion firmada desde la fuente disponible y el segundo contrasta el ledger con la aprobacion de PR, los autores autorizados de `content/editorial-authors.json` y el conjunto de docentes responsables en `content/editorial-approvers.json`.
- **Modificar:** `package.json` y `package-lock.json` con dependencias y scripts.

### Aplicacion

- **Nuevo:** `src/lib/content/schema.ts` para tipos y validacion compartida.
- **Nuevo:** `src/lib/content/server.ts` para acceso server-only, catalogo, detalle y resolucion de relaciones.
- **Nuevos:** layout, catalogo, detalle, `not-found` y componentes colocados bajo `src/app/contenidos/`.
- **Modificar:** `src/app/page.tsx` para ofrecer acceso publico al catalogo.
- **Modificar:** `src/app/dashboard/page.tsx` para reemplazar el placeholder de ejes por navegacion real a `/contenidos`.
- **Modificar:** `src/app/auth/actions.ts` para propagar un retorno local validado al OAuth, sin alterar sus limites de autenticacion.
- **Conservar:** `src/app/auth/callback/route.ts`, `src/proxy.ts`, clientes Supabase y migraciones; el callback ya rechaza destinos no locales.

### UI

- **Nuevos mediante shadcn CLI y revision de diff:** `src/components/ui/card.tsx`, `breadcrumb.tsx` y `alert.tsx`.
- **Modificar solo si hace falta para la lectura:** `src/app/globals.css` con estilos semanticos acotados para contenido Markdown que no puedan expresarse limpiamente en el renderer; no se cambia el tema global.

## Rollout

1. Configurar `CODEOWNERS`, `sync-content.yml`, `verify-content-approval.yml`, las allowlists editoriales y proteccion de la rama desplegable con revision obligatoria del docente responsable. El workflow de sincronizacion debe ejecutarse en un runner protegido con acceso de solo lectura a `../contenidos` y la clave privada de firma; verificar que un PR no pueda acceder a esa clave. Verificar con un PR de prueba que un autor no autorizado o que intenta autoaprobar sea rechazado, que un aprobador fuera de la allowlist sea rechazado y que los cambios a allowlists, `CODEOWNERS` o workflows requieran una aprobacion de code owner de la rama base.
2. Agregar dependencias, esquema, sincronizador, validador y pruebas sin exponer todavia enlaces de navegacion.
3. Definir URLs publicas aprobadas para los seis enlaces al laboratorio en `content/external-links.json`; la falta de cualquiera bloquea la publicacion.
4. Ejecutar la importacion inicial con `content:sync` en un entorno que tenga `../contenidos` disponible. La atestacion debe registrar y comparar los digests de la fuente y de la replica en el mismo proceso; la solucion diferida queda excluida hasta una accion manual `release`.
5. Revisar el diff de la replica: inventario esperado, cero archivos privados, hashes, atestacion de fuente, metadatos, ledger, enlaces y ausencia de rutas hacia `repositorio/`.
6. Implementar las rutas estaticas y probar localmente catalogo, detalles, enlaces, metadata, 404 generico y responsive.
7. Ejecutar `npm run check` y `next-dev-loop`; revisar tambien el artefacto de build para confirmar que no contiene IDs, titulos o fragmentos privados/diferidos.
8. Desplegar primero las rutas sin enlazarlas desde home/dashboard si se desea un smoke test discreto; al aprobarlo, agregar los accesos visibles y desplegar nuevamente.
9. Para cada cambio posterior, sincronizar IDs afectados, registrar evento, obtener aprobacion docente y dejar que el merge produzca el siguiente despliegue.

No se aplica ninguna migracion ni cambio remoto de Supabase durante este rollout.

## Rollback

- **Error de UI o render:** volver al build anterior. Los Markdown autoritativos y la base de datos no cambian.
- **Contenido academico incorrecto:** crear una correccion en la fuente, sincronizar con `action: correct`, incluir aviso cuando corresponda y desplegar hacia adelante. No se revierte un commit editorial: una reversion eliminaría eventos y fallaria la validacion append-only.
- **Liberacion diferida prematura:** crear un nuevo evento `retire`, retirar el archivo de la replica mediante el sincronizador, desplegar de inmediato y revisar caches/CDN. La fuente autoritativa permanece intacta.
- **Riesgo privado:** un rollback normal no es suficiente si material privado fue commiteado. Se debe bloquear el despliegue, retirar el artefacto y caches, revocar accesos si hubiera secretos y sanear la historia Git segun el procedimiento de incidente. La allowlist, el fallo ante `privado` y la inspeccion de artefactos existen para prevenir este caso.
- **Pipeline defectuoso:** revertir sincronizador, manifest y rutas como una unidad. Nunca promover una copia editada manualmente para eludir validaciones.

## Verificacion

### Pipeline y seguridad

- Pruebas de frontmatter base, matriz de campos requerida por tipo, valores admitidos, fecha civil, IDs duplicados y estabilidad de ID (FR-003, FR-011, FR-012; AC-002, AC-007).
- Fixtures con un segundo bloque YAML dentro del cuerpo para demostrar que solo se interpreta el frontmatter inicial.
- Pruebas de seleccion para publico, diferido sin liberar, diferido liberado y privado; confirmar que los privados se omiten de la replica, que los diferidos no liberados no dejan cuerpo, metadata ni manifest y que los diferidos liberados de audiencia estudiante quedan marcados como protegidos (FR-007 a FR-010, FR-016; AC-004 a AC-006, AC-010).
- Pruebas de sincronizacion con fuente disponible: una modificacion en la fuente modifica digest, atestacion y firma; una replica distinta de su digest atestado, una firma invalida o una atestacion creada sin el workflow protegido son rechazadas. Pruebas de ledger: archivo alterado, evento faltante, version divergente, actor faltante, accion invalida, hash de evento alterado, evento eliminado o reordenado respecto del commit base, y aviso requerido para correccion relevante (FR-005, FR-006, FR-015, FR-018, FR-020; AC-003, AC-011, AC-012, AC-015).
- Pruebas de enlaces relativos, archivos inexistentes, salida de allowlist, destino diferido, protocolos peligrosos, mapeo externo y menciones de activos dentro de codigo (FR-013; AC-008).
- Inspeccion del output de build para buscar rutas, IDs y fragmentos conocidos del material diferido no liberado y del arbol `docentes/`.
- Verificacion de que un PR sin aprobacion de code owner no pueda fusionarse, de que autor/aprobador del ledger coincidan con la identidad de autor y revision aprobatoria obtenidas desde la API de GitHub, y de que los controles editoriales no puedan modificarse desde el propio PR para eludir esa validacion (FR-020; AC-011, AC-015).

### Aplicacion y runtime

Ejecutar como minimo:

```text
npm run content:check
npm run test:content
npm run check
```

Con Next MCP y `next-dev-loop`:

- Confirmar rutas `/contenidos` y `/contenidos/[id]`, compilacion sin issues y ausencia de errores runtime.
- Como visitante no autenticado, navegar catalogo y detalles publicos sin redireccion de login; un detalle diferido liberado de audiencia estudiante debe redirigir a login sin incluir su cuerpo en la respuesta. Una sesion con identidad autenticada y verificada debe poder consultarlo (FR-001, FR-009, FR-010; AC-001, AC-005, AC-006).
- Verificar agrupacion y orden de los siete ejes, transversales, plantillas, glosario e indices; una solucion solo aparece despues de un evento manual de liberacion (FR-002, FR-009, FR-016; AC-001, AC-005, AC-010).
- Verificar que cada acceso del indice de ejes desplaza la vista a su seccion y mantiene visible el encabezado en movil y escritorio (FR-022; AC-016).
- Comparar materiales representativos de cada tipo con su Markdown: encabezados, parrafos, listas, tablas, task lists, enlaces, citas y codigo (FR-003, FR-004; AC-002).
- Solicitar un ID inexistente, privado conocido de fixture y diferido no liberado; todos deben producir el mismo 404 generico sin metadata sensible (FR-008 a FR-010; AC-004 a AC-006).
- Verificar metadata por documento publico, version visible, anterior/siguiente y `Alert` de correccion; la respuesta para una ruta diferida anonima no contiene ID, titulo ni descripcion y la ruta diferida autenticada conserva metadata generica (FR-002, FR-009, FR-010, FR-015, FR-018; AC-003, AC-005, AC-006, AC-012).
- Revisar movil y escritorio, teclado, foco, zoom, tablas y bloques de codigo sin perdida de informacion ni desborde de pagina (FR-019; AC-013).
- Confirmar por inspeccion de codigo y red que no se registran lecturas, progreso, preferencias o llamadas Supabase al consultar contenido (AC-014).

## Matriz de trazabilidad

| Requisitos | Implementacion principal | Verificacion principal |
|---|---|---|
| FR-001, FR-002 | Catalogo estatico, manifest, agrupacion y navegacion | Inventario y navegador; AC-001 |
| FR-003, FR-004 | Esquema tipado, renderer GFM seguro, metadata visible | Fixtures y comparacion visual; AC-002 |
| FR-005, FR-006 | Snapshot versionado, SHA-256, ledger, PR y despliegue | Divergencia bloqueada y build posterior al merge; AC-003 |
| FR-007, FR-008, FR-009, FR-010 | Allowlist, liberacion manual, exclusion fisica, ruta dinamica autenticada para diferidos estudiantiles y rutas estaticas publicas | Fixtures permitido/denegado, sesion anonima/autenticada y 404 uniforme; AC-004 a AC-006 |
| FR-011, FR-012 | Zod, validacion por tipo e IDs unicos | `content:check` y pruebas negativas; AC-007 |
| FR-013 | Indice de enlaces, mapa externo y pipeline de activos | Grafo completo y protocolos rechazados; AC-008 |
| FR-014 | Build fail-closed y despliegue atomico | Cambio invalido no reemplaza build vigente; AC-009 |
| FR-015 | Version y digest fuente/replica | Hash recalculado y version visible; AC-003 |
| FR-016 | Reglas de seleccion del inventario inicial | Comparacion con corpus autoritativo; AC-010 |
| FR-017, FR-020 | Sin editor runtime, CODEOWNERS, workflow de identidad editorial y rama protegida | Ausencia de endpoints y PR denegado sin docente o con ledger no verificable; AC-011, AC-015 |
| FR-018 | Evento `correct` y `Alert` con aviso vigente | Correccion relevante con/sin aviso; AC-012 |
| FR-019 | Layout y Markdown responsive y accesible | Browser movil/escritorio, teclado y zoom; AC-013 |
| FR-021 | Sin tracking de estudiantes | Inspeccion de red y datos; AC-014 |
| FR-022 | Indice de anclas hacia secciones de ejes | Navegador movil/escritorio; AC-016 |

## Riesgos y mitigaciones

- **La fuente esta fuera del repositorio:** un workflow protegido con acceso de solo lectura a la fuente firma la atestacion de sus digests; el build remoto valida firma, snapshot y ledger, pero no intenta leer una ruta externa inexistente.
- **Divergencia entre fuente y replica:** sincronizacion unica, hashes por archivo, revision de diff y rechazo de edicion directa.
- **Filtracion de privados o diferidos:** enumeracion exclusiva de `contenidos`, omision fisica de privados, exclusion de diferidos no liberados, metadata generica y cargador autenticado para diferidos estudiantiles, rutas solo para manifest y busqueda de secretos en artefacto.
- **Autor o aprobador declarado pero no verificado:** CODEOWNERS, rama protegida, allowlists separadas de autores y docentes responsables, y workflow que contrasta el ledger con autor y revision de PR via API; el rollout se bloquea sin esa configuracion.
- **Escalada por cambio de controles editoriales:** `CODEOWNERS` protege allowlists, workflows y sus propias reglas; los checks obligatorios se ejecutan desde la rama base antes del merge.
- **Auditoria editorial alterada:** cadena de hashes, comparacion prefija con el ledger del commit base, proteccion contra force-push y coincidencia del ultimo evento con el manifest bloquean la eliminacion o modificacion silenciosa de eventos.
- **Enlaces al laboratorio sin destino desplegable:** mapa explicito obligatorio; no se inventan URLs ni se publican enlaces locales rotos.
- **Markdown malicioso o accidentalmente ejecutable:** sin MDX ni HTML crudo, protocolos restringidos, renderer server-side y ninguna interpretacion de instrucciones como operaciones.
- **Un documento invalido bloquea una actualizacion:** comportamiento intencional para una publicacion atomica; el despliegue anterior conserva todos los materiales validos hasta corregir la fuente.
- **Crecimiento del corpus y costo de build:** 75 documentos actuales son apropiados para prerender completo; medir tiempos y revisar la estrategia en otra spec si el corpus crece sustancialmente.
- **Activos futuros fuera del arbol permitido:** resolucion canonica de rutas, hashes y allowlist impiden traversal o copia accidental de archivos locales.
