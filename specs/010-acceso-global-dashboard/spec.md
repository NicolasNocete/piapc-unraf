# Acceso global al dashboard

**Status:** Approved

## Objetivo

Permitir que toda persona autenticada acceda rápidamente al dashboard desde cualquier pantalla, sin depender de la navegación hacia atrás del navegador.

## Requisitos funcionales

- **FR-001:** Debe existir un acceso visible y persistente hacia `/dashboard` fuera de las rutas del dashboard.
- **FR-002:** El acceso debe ser idéntico para perfiles de estudiante y profesor; no debe revelar opciones restringidas.
- **FR-003:** El acceso no debe mostrarse en la portada principal de `/dashboard`.

## Fuera de alcance

- Modificar permisos, roles o autorizaciones de las rutas existentes.
- Añadir navegación hacia entregas u operaciones exclusivas de responsables.

## Seguridad

El enlace no concede acceso. `/dashboard` y sus subrutas mantienen sus comprobaciones de identidad y perfil.

## Criterios de aceptación

- **AC-001 (FR-001):** Desde inicio, contenidos, detalle de contenido y perfil existe un enlace directo y accesible a `/dashboard`.
- **AC-002 (FR-002):** El componente no consulta ni ramifica por rol y no enlaza a rutas restringidas.
- **AC-003 (FR-003):** En `/dashboard` no se renderiza un enlace redundante hacia la misma ruta.
