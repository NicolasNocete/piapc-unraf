# Enlaces al laboratorio Guardia de Sigilo

**Status:** Implemented

## Objetivo

Vincular cada referencia académica visible al laboratorio Guardia de Sigilo con su repositorio canónico y conservar una guía privada para la clase 4.

## Valor para el usuario

- El estudiantado accede desde cada material al proyecto que ejemplifica o sustenta la actividad.
- La docencia conserva una guía reutilizable para conducir el primer laboratorio con OpenCode.

## Escenarios de usuario

### US-001 - Acceso al laboratorio desde un contenido académico

Una persona lee una referencia al Guardia de Sigilo y puede abrir su repositorio canónico.

### US-002 - Consulta docente de la clase 4

La persona docente consulta una guía privada con la secuencia y criterios de la clase.

## Requisitos funcionales

- **FR-001:** Toda referencia académica visible al laboratorio o al guardia de sigilo debe enlazar a `https://github.com/NicolasNocete/piapc-guardia-sigilo`.
- **FR-002:** Las referencias técnicas dentro de salidas de terminal, identificadores y metadatos conservan su representación literal para no alterar su función documental.
- **FR-003:** Debe existir una guía privada de la clase 4 bajo `docentes/`.

## Fuera de alcance

- Cambiar consignas, criterios de evaluación o comportamiento de la aplicación.
- Cambiar IDs, títulos de metadatos o salidas de evidencia.
- Modificar el repositorio externo.

## Impacto en datos

- Se actualizan documentos Markdown y el manifiesto generado de contenidos.
- No se crean tablas ni se procesan datos personales.

## Seguridad y privacidad

- La guía permanece fuera del contenido público.
- Los enlaces se dirigen a un repositorio público de la cátedra.

## Ambigüedades abiertas

No quedan ambigüedades abiertas.

## Criterios de aceptación

- **AC-001 (FR-001):** Cada referencia académica visible al laboratorio o guardia de sigilo contiene un enlace al repositorio canónico.
- **AC-002 (FR-002):** Los fragmentos de terminal, IDs y frontmatter se preservan como texto literal.
- **AC-003 (FR-003):** `docentes/guia-clase-04-sistemas-agenticos.md` contiene preparación, secuencia, entregable y criterios de observación.
