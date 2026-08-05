---
id: eje-04
titulo: Ingeniería del desarrollo agéntico
eje: 4
orden: 4
tipo: indice
nivel: obligatorio
audiencia: estudiante
clases: [5, 7, 8, 11, 13]
modalidad: mixta
resultados: [RA3, RA4, RA5, RA8, RA9, RA11]
acceso: publico
version: 1
---

# Eje 4. Ingeniería del desarrollo agéntico

## Propósito

Convertir el uso de agentes en un proceso de ingeniería verificable. Este eje organiza el recorrido:

```text
comprender → especificar → planificar → modificar → validar → revisar → registrar
```

No se evalúa cuánto código produce un agente, sino la capacidad del estudiante para delimitar el problema, controlar el proceso y demostrar la calidad del resultado.

## Materiales disponibles

| Orden | Archivo | Función |
|---:|---|---|
| 1 | [01-repositorios-y-contexto.md](01-repositorios-y-contexto.md) | Exploración, fuentes de verdad y selección de información |
| 2 | [02-especificaciones-y-planes.md](02-especificaciones-y-planes.md) | Alcance, criterios de aceptación y descomposición |
| 3 | [03-implementacion-git-y-reversibilidad.md](03-implementacion-git-y-reversibilidad.md) | Cambios pequeños e integración controlada |
| 4 | [04-pruebas-depuracion-y-revision.md](04-pruebas-depuracion-y-revision.md) | Evidencia, hipótesis y lectura de diferencias |
| 5 | [05-infraestructura-de-validacion.md](05-infraestructura-de-validacion.md) | Documentación, comandos y automatizaciones reproducibles |
| 6 | [06-observabilidad-y-trazabilidad.md](06-observabilidad-y-trazabilidad.md) | Acciones, decisiones, métricas y límites |
| 7 | [07-laboratorio-flujo-completo.md](07-laboratorio-flujo-completo.md) | Intervención agéntica sobre proyecto preparado |

**Estado:** recorrido completo disponible.

## Secuencia de preparación y laboratorio

En la clase 7 se realiza únicamente la preparación: lectura de los materiales previos, auditoría del repositorio, reconocimiento del entorno y registro de la línea de base. La [plantilla de auditoría](../../plantillas/03-auditoria-repositorio.md) organiza ese trabajo, que no constituye todavía el laboratorio.

El [laboratorio de flujo completo](07-laboratorio-flujo-completo.md) comienza formalmente en la clase 8, una vez disponibles infraestructura de validación, pruebas, depuración, revisión, observabilidad y trazabilidad. Conserva como prerrequisitos las dos ramas completas del recorrido: [infraestructura de validación](05-infraestructura-de-validacion.md) y [observabilidad y trazabilidad](06-observabilidad-y-trazabilidad.md), con sus respectivos prerrequisitos.

## Artefactos acumulativos

- Especificación verificable.
- Auditoría del repositorio.
- Paquete de contexto justificado.
- Plan previo a la modificación.
- Registro de intervención.
- Diferencias o confirmaciones de cambios (*commits*) explicadas.
- Pruebas y evidencia de ejecución.
- Revisión crítica y limitaciones.

## Proyecto de laboratorio

Se utilizará el laboratorio Guardia de Sigilo, preparado para Phaser, o un proyecto equivalente en Unity u otro entorno. Los materiales históricos del workspace no forman parte de las consignas ni de las soluciones.

## Evidencia esperada

El estudiante deberá relacionar cada criterio de aceptación con una prueba o evidencia y explicar qué decisiones del agente fueron aceptadas, rechazadas o modificadas.
