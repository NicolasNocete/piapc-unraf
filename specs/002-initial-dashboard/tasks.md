# Tareas: Dashboard inicial de la materia

## Implementación

- [x] **T-001 (FR-001 a FR-009, AC-001 a AC-005):** Reemplazar el estado vacío de `/dashboard` por las secciones aprobadas de materia, introducción, profesor y universidad.
- [x] **T-002 (FR-004, AC-002):** Incorporar el logo obtenido del sitio oficial de UNRaf y el enlace institucional.
- [x] **T-003 (FR-013 a FR-018, AC-009, AC-011 a AC-014):** Agregar accesos rápidos diferenciados a ejes, programa, cronograma y glosario; publicar los recursos disponibles desde sus fuentes académicas validadas sin duplicar el cronograma.
- [x] **T-004 (FR-011, AC-007, AC-010):** Conservar la verificación server-side mediante claims y limitar la lectura del perfil a los campos mínimos usados por la interfaz.
- [x] **T-005 (FR-010, AC-006):** Ajustar la composición para lectura completa y sin desbordes en móvil y escritorio, con jerarquía semántica y foco visible.

## Verificación

- [ ] **T-006 (AC-001 a AC-005, AC-009):** Verificar en navegador autenticado el contenido aprobado, la diferenciación de secciones y los accesos rápidos. Bloqueada: la sesión de navegador disponible llegó al inicio de sesión de Google y requiere intervención de una persona autenticada.
- [ ] **T-007 (AC-006):** Verificar visualmente `/dashboard` en viewport móvil y de escritorio. Bloqueada: requiere la misma sesión autenticada para que la ruta renderice su contenido.
- [x] **T-008 (AC-007, AC-010):** Verificar que una visita no autenticada no obtiene el dashboard y que no se solicitan datos nuevos del usuario.
- [x] **T-009 (FR-001 a FR-018, AC-001 a AC-014):** Ejecutar la generación académica, diagnósticos de Next.js y `npm run check`, y registrar el resultado.

## Evidencia

- 2026-08-05: `npx eslint src/app/dashboard/page.tsx`, `npm run typecheck` y `npm run check` finalizaron correctamente.
- 2026-08-05: Next.js informó `issues: []` al compilar `/dashboard`, sin errores de compilación ni de sesión.
- 2026-08-05: la visita sin sesión a `/dashboard` no expuso el contenido protegido y terminó en el flujo de inicio de sesión de Google.
- 2026-08-05: la generación validó el programa PIAPC 2026 aprobado, las 14 clases del cronograma y el glosario público versión 2. Next.js compiló `/dashboard/programa`, `/dashboard/cronograma` y `/glosario` sin incidencias.
- 2026-08-05: en navegador real sin sesión, `/dashboard/programa` redirigió a `/`; `/glosario` cargó públicamente con el título "Glosario general".
- Pendiente: verificación visual y funcional de AC-001 a AC-006 y AC-009 con una sesión autenticada, en móvil y escritorio.
