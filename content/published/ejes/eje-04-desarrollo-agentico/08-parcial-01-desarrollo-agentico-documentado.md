---
id: parcial-01-desarrollo-agentico-documentado
titulo: Parcial 1 - Desarrollo agéntico documentado
eje: 4
orden: 8
tipo: actividad
nivel: obligatorio
audiencia: estudiante
clases: [6]
modalidad: mixta
duracion_minutos: 360
resultados: [RA3, RA4, RA5, RA8, RA9, RA11]
prerrequisitos: [eje-04-repositorios-y-contexto, eje-04-especificaciones-y-planes, eje-03-primeros-pasos-opencode]
evaluable: true
acceso: publico
disponible_desde: 2026-09-08
disponible_hasta: 2026-09-15
version: 1
---

# Parcial 1 - Desarrollo agéntico documentado

## Propósito

Conducir una intervención pequeña sobre un proyecto de videojuego mediante un proceso trazable: comprender el repositorio, definir una intención de diseño, especificar el cambio, planificarlo, usar un agente con control humano, validar el resultado y revisar las decisiones tomadas.

La actividad se inicia en la clase del 9 de septiembre y continúa de forma individual. La entrega formal se realiza en esta plataforma hasta el **15 de septiembre de 2026 a las 23:59**.

## Consigna general

La cátedra presenta en clase una situación de comportamiento acotada sobre el repositorio base. Definí un GDD simplificado que guíe la resolución, implementá sólo el cambio incluido en el alcance y documentá el proceso completo. La situación específica y toda pauta de corrección permanecen fuera de este material público.

## Repositorio y uso de herramientas

1. Creá un repositorio público individual desde la base indicada por la cátedra.
2. Conservá el commit inicial, los commits progresivos y el commit final evaluable.
3. Leé las instrucciones, la arquitectura, los scripts y las pruebas antes de editar.
4. Usá OpenCode o una herramienta equivalente inicialmente con lectura y búsqueda. Una traza provista por la cátedra es una alternativa si no disponés de modelo.
5. No instales dependencias, no uses red, no publiques, no accedas a secretos ni ejecutes comandos que no estén documentados o autorizados.
6. Detenete y registrá la situación si falta una decisión de diseño, un permiso o evidencia para continuar.

## Hitos verificables

| Hito | Artefacto o evidencia | Verificación |
|---|---|---|
| Inicio | URL del repositorio y commit base | El historial permite identificar el punto de partida. |
| GDD | `GDD.md` | Define experiencia, problema, reglas, límites y un caso límite. |
| Exploración | `docs/auditoria-repositorio.md` | Distingue rutas, flujo, pruebas, evidencia y supuestos. |
| Especificación | `docs/especificacion.md` | Declara alcance, restricciones y criterios observables. |
| Plan | `docs/plan.md` | Relaciona cambios, riesgos y validaciones. |
| Intervención | `docs/registro-intervencion.md` | Registra acciones, resultados y decisiones humanas. |
| Implementación | Código y commits | El cambio es pequeño, revisable y consistente con el plan. |
| Validación | `docs/evidencia-pruebas.md` | Demuestra el camino principal y el caso límite. |
| Revisión | `docs/informe-final.md` | Explica decisiones, correcciones y riesgos pendientes. |

## Estructura esperada

```text
/
├── GDD.md
├── README.md
├── docs/
│   ├── auditoria-repositorio.md
│   ├── especificacion.md
│   ├── plan.md
│   ├── registro-intervencion.md
│   ├── evidencia-pruebas.md
│   └── informe-final.md
├── src/
└── tests/
```

Podés adaptar la estructura existente del repositorio siempre que los artefactos requeridos sean localizables.

## Entrega en la plataforma

Escribí en el campo de entrega:

1. URL del repositorio público individual.
2. Hash o enlace del commit final evaluable.
3. Herramienta y modelo utilizados, si están disponibles.
4. Comandos de validación ejecutados y resultado.
5. Declaración de que el repositorio no contiene secretos, credenciales ni datos privados.

El repositorio permite comprobar el proceso técnico; la entrega en plataforma registra la versión presentada dentro del plazo.

## Criterios públicos

- El problema de diseño, el alcance y la aceptación están definidos de forma verificable.
- La intervención se apoya en exploración y evidencia, no en afirmaciones del agente.
- Los permisos y las acciones son mínimos, justificados y seguros.
- Los cambios son incrementales, revisables y coherentes con el GDD y el plan.
- La validación se vincula con los criterios de aceptación, incluido un caso límite.
- La documentación declara decisiones humanas, límites y uso de IA sin incluir razonamientos internos privados.

Un resultado ejecutable no sustituye los artefactos del proceso. Del mismo modo, una afirmación de la herramienta no sustituye una prueba reproducible.
