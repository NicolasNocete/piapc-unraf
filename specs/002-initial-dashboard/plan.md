# Plan de implementación: Dashboard inicial de la materia

**Spec:** `specs/002-initial-dashboard/spec.md`  
**Status:** Approved

## Decisiones de implementación

- El dashboard se mantiene como una ruta protegida y Server Component. Los accesos rápidos disponibles reemplazarán las anclas de contenido pendiente por rutas reales: `/dashboard/programa`, `/dashboard/cronograma` y `/glosario`.
- El programa PIAPC 2026 se publicará como el programa vigente y aprobado. El cronograma no tendrá documento ni datos independientes: será la vista focalizada de la sección `CRONOGRAMA` del mismo programa.
- El glosario se publicará como contenido público en `/glosario`, conforme al metadato `acceso: publico` de su fuente. No se incluirá en la autorización de `/dashboard` ni se requerirá identidad para consultarlo.
- Los documentos fuente permanecerán fuera de la aplicación en `../programa/Programa PIAPC - 2026.md` y `../contenidos/glosario.md`, respecto de la raíz de `app/`. Un paso de generación previo a la compilación validará y transformará esas fuentes en un artefacto local temporal de solo lectura. El artefacto no será una fuente editorial ni se editará manualmente.
- El paso de generación deberá fallar si faltan las fuentes, si el programa no corresponde a 2026, si no se encuentra la sección `CRONOGRAMA`, o si el glosario no declara el ID, la versión y el acceso público esperados. Así se evita publicar enlaces rotos o contenido parcial.

## Arquitectura y límites server/client

- `src/app/dashboard/page.tsx` seguirá verificando `getClaims()` en el servidor antes de leer el perfil o renderizar contenido protegido. Reemplazará las anclas actuales y las tarjetas "Próximamente" de programa y cronograma por enlaces `next/link` hacia sus destinos reales. El acceso a ejes continuará siendo un marcador explícitamente no disponible mientras permanezca fuera de alcance.
- `src/app/dashboard/programa/page.tsx` será un Server Component protegido. Obtendrá el documento generado, mostrará su ciclo lectivo, versión y condición de aprobado, y renderizará todo el programa.
- `src/app/dashboard/cronograma/page.tsx` será un Server Component protegido. Consumirá el cronograma ya extraído del programa generado y lo presentará con sus fechas, modalidades, contenidos, actividades, bibliografía e hitos. No leerá un segundo archivo ni hará consultas propias.
- `src/app/glosario/page.tsx` será un Server Component público. Leerá solamente el glosario generado y expondrá su título, versión y definiciones; no creará cliente Supabase ni consultará perfiles.
- Un módulo generado y marcado como solo servidor, por ejemplo `src/content/generated/academic-content.ts`, exportará tipos serializables y los datos necesarios para cada página. Las páginas no accederán al sistema de archivos ni a rutas externas en tiempo de solicitud.
- El generador, por ejemplo `scripts/generate-academic-content.mjs`, será la única pieza que lea las fuentes externas. Se integrará mediante un script `prebuild` en `package.json`, por lo que `npm run build` y los despliegues fallarán temprano ante una fuente inválida.
- No se requiere límite cliente ni estado interactivo. Las rutas se renderizarán como Server Components para evitar enviar el contenido completo como JavaScript de cliente. Los enlaces y controles existentes conservarán las primitivas Base UI ya instaladas.

## Interpretación y seguridad del contenido

- El generador analizará únicamente el frontmatter y la estructura Markdown necesarios para este alcance: metadatos del programa, cuerpo del programa, sección `CRONOGRAMA`, metadatos del glosario y sus términos/definiciones.
- El renderizador Markdown deberá deshabilitar HTML sin procesar, no ejecutar contenido incrustado y limitar enlaces a protocolos seguros. Los documentos académicos se tratarán como datos de solo lectura, nunca como instrucciones de ejecución.
- Los recursos y enlaces del Markdown se resolverán solo si forman parte del contenido publicado y no revelan rutas privadas, credenciales ni contenido excluido. Los fallos de validación impedirán el despliegue en lugar de degradar a placeholders.
- El programa y el cronograma permanecerán detrás de la comprobación server-side con `getClaims()` en cada ruta protegida. La renovación de cookies realizada por `src/proxy.ts` es un mecanismo de sesión, no el límite de autorización.
- La ruta pública del glosario no debe leer perfiles ni exponer datos de usuarios. El acceso público se limita al contenido que su fuente declara pública.

## Datos, migraciones y autorización

- No se crearán tablas, columnas, funciones, migraciones, políticas RLS, grants ni Storage. Por lo tanto, no corresponde ejecutar una migración ni modificar RLS para esta feature.
- La única consulta de datos existente seguirá limitada a `profiles.display_name` y `profiles.avatar_url` en el dashboard protegido. No se registrarán lecturas, actividad, progreso ni preferencias.
- La autorización se resuelve en las páginas protegidas mediante claims verificados de Supabase; el glosario público no requiere autorización. Cualquier futuro contenido de acceso restringido deberá tener una ruta protegida y comprobación de autorización propia antes de reutilizar este mecanismo.

## Interfaz y shadcn/ui

- Se conservarán `Avatar`, `Badge`, `Button` y `Separator`, las primitivas existentes de shadcn/ui con Base UI y los tokens visuales actuales de PIAPC.
- Antes de agregar primitivas, se revisarán las componentes instaladas y la documentación Base UI de shadcn. Para la presentación estructurada del cronograma se agregará `Table` solo si su composición semántica resulta necesaria; para bloques de lectura se preferirán los patrones de sección ya presentes antes de agregar `Card`.
- Los accesos rápidos mostrarán nombre, propósito y estado de disponibilidad. Programa, cronograma y glosario tendrán enlaces con destinos reales; ejes no se presentará como disponible mientras no exista su destino.
- Las vistas tendrán encabezados jerárquicos, tablas con encabezados de columna, textos alternativos pertinentes, foco visible, enlaces distinguibles, desplazamiento horizontal controlado para tablas en móviles y lectura completa en anchos móvil y escritorio.

## Archivos afectados

- `package.json`: incorporar el paso `prebuild` y las dependencias de análisis/renderizado Markdown si el generador no puede implementarse con las dependencias actuales.
- `scripts/generate-academic-content.mjs`: validar las fuentes académicas y generar el módulo de lectura.
- `src/content/generated/academic-content.ts`: artefacto generado desde las fuentes autoritativas; se regenerará, no se editará.
- `src/app/dashboard/page.tsx`: reemplazar enlaces de ancla y estados pendientes de programa/cronograma por accesos disponibles; añadir glosario.
- `src/app/dashboard/programa/page.tsx`: nuevo destino protegido para el programa aprobado.
- `src/app/dashboard/cronograma/page.tsx`: nuevo destino protegido para el cronograma extraído del programa.
- `src/app/glosario/page.tsx`: nuevo destino público para el glosario.
- `src/components/ui/table.tsx`: solo si se instala la primitiva `Table` tras revisar el diff de shadcn y confirmar que no hay una alternativa instalada adecuada.
- `specs/002-initial-dashboard/tasks.md`: actualizar tareas y evidencia para `FR-013` a `FR-018` y `AC-011` a `AC-014` antes de implementar.

## Despliegue, dependencias y reversión

- El entorno de compilación debe incluir las carpetas hermanas `programa/` y `contenidos/` en las rutas esperadas; se documentará esta condición junto al script. No se desplegará una compilación que no pueda validar dichas fuentes.
- El primer despliegue publicará el programa 2026 aprobado, su cronograma derivado y el glosario público. El contenido se actualizará únicamente modificando su Markdown autoritativo y generando un nuevo despliegue.
- Si una fuente se vuelve inválida, se detendrá el despliegue y seguirá activa la última versión válida. Para revertir contenido o interfaz se redeplegará la versión anterior validada; no hay datos persistidos que migrar o restaurar.

## Verificación

- Ejecutar el generador con las fuentes actuales y verificar que identifica el programa 2026, su estado aprobado, las 14 clases del cronograma y la versión 2 del glosario. Cubre FR-015 a FR-018 y AC-011 a AC-014.
- Ejecutar `npm run check`; el flujo debe incluir la generación previa, lint, typecheck y build sin errores.
- Compilar y revisar las rutas `/dashboard`, `/dashboard/programa`, `/dashboard/cronograma` y `/glosario` mediante las herramientas de Next.js. Cubre FR-010, FR-013 a FR-018 y AC-006, AC-009, AC-011 a AC-014.
- En un navegador autenticado, confirmar que el dashboard presenta el contenido existente, cuatro accesos diferenciados, y que programa y cronograma muestran los datos de las fuentes aprobadas. Cubre FR-001 a FR-016 y AC-001 a AC-012.
- En una sesión no autenticada, solicitar directamente `/dashboard`, `/dashboard/programa` y `/dashboard/cronograma` y confirmar que no devuelven contenido protegido. Solicitar `/glosario` y confirmar que es accesible sin identidad. Cubre FR-011, FR-017 y AC-007, AC-013.
- Revisar las vistas de dashboard, programa, cronograma y glosario en móvil y escritorio, incluyendo el foco por teclado, semántica de encabezados y tabla desplazable. Cubre FR-009, FR-010, FR-014 y AC-005, AC-006, AC-009, AC-014.
- Usar `next-dev-loop` contra el servidor de desarrollo para confirmar renderizado real, enlaces, errores de consola y errores de Next.js antes de completar la feature.

## Trazabilidad

- Presentación institucional y académica: FR-001 a FR-009; AC-001 a AC-005.
- Adaptación y accesibilidad: FR-010; AC-006.
- Autenticación, datos mínimos y contenido público: FR-011; AC-007 y AC-010.
- Vigencia del contenido: FR-012, FR-015 y FR-018; AC-008 y AC-011.
- Accesos y destinos publicados: FR-013, FR-014, FR-016 y FR-017; AC-009, AC-012, AC-013 y AC-014.
