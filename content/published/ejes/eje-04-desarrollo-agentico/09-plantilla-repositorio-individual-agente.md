---
id: eje-04-plantilla-repositorio-individual-agente
titulo: Plantilla para repositorio individual con agente
tipo: referencia
audiencia: estudiante
acceso: publico
eje: 4
orden: 9
clases: [6]
modalidad: mixta
version: 1
---

# Plantilla para repositorio individual con agente

## Proposito

La catedra provee [PIAPC plantilla agente](https://github.com/NicolasNocete/piapc-plantilla-agente) como base publica y generica para crear un repositorio individual. No depende de Guardia de Sigilo ni de un motor particular: puede utilizarse con Unity, Godot, Unreal, Phaser u otro entorno aprobado.

La plantilla organiza los documentos que permiten demostrar el proceso. No entrega respuestas ni completa una solucion: cada estudiante debe reunir evidencia en su propio proyecto y registrar sus decisiones.

## Como iniciar el repositorio

1. Crea un repositorio publico individual desde la plantilla y conserva su commit inicial.
2. Indica en `README.md` el motor, version, nombre del proyecto y forma de ejecucion.
3. Agrega el proyecto generado por el motor elegido y sus reglas de `.gitignore`; no mezcles archivos ni configuraciones de motores distintos.
4. Lee `AGENTS.md` antes de usar un agente.
5. Copia y adapta `docs/prompt-inicial-opencode.md` para comenzar con exploracion de solo lectura.
6. Completa los documentos de proceso a medida que avances. No reemplaces los marcadores pendientes con contenido inventado.

## Documentos incluidos

| Archivo | Que registra |
|---|---|
| `GDD.md` | Intencion de diseno, comportamiento esperado, reglas, limites y caso limite. |
| `docs/auditoria-repositorio.md` | Rutas, simbolos, flujo, pruebas, comandos, hechos y supuestos comprobados. |
| `docs/especificacion.md` | Problema, alcance, restricciones y criterios de aceptacion verificables. |
| `docs/plan.md` | Cambios minimos, archivos previstos, verificaciones, riesgos y condiciones de detencion. |
| `docs/matriz-permisos.md` | Acciones que el agente puede realizar, no puede realizar o requieren consulta. |
| `docs/registro-intervencion.md` | Instrucciones, acciones, resultados observables y decisiones humanas. |
| `docs/evidencia-pruebas.md` | Pruebas reproducibles para el camino principal y el caso limite. |
| `docs/informe-final.md` | Resultado, validaciones, limites y riesgos pendientes. |

Las mismas estructuras se publican como [plantillas de trabajo](../../plantillas/README.md). La version incluida en el repositorio base permite que el agente las lea junto con el proyecto; las plantillas de la catedra son la referencia para su uso academico.

## Regla de uso con agentes

El primer intercambio debe ser de lectura y busqueda. El agente puede ayudar a identificar que informacion falta y donde encontrarla, pero no puede afirmar que una prueba paso, definir por si solo una decision de diseno ni completar documentos con datos no verificados.

Antes de permitir escritura, completa la auditoria, la especificacion, el plan y la matriz de permisos. Detente y consulta si falta una decision de diseno, aparece un comando no documentado, se requieren permisos no previstos o una validacion falla sin causa comprendida.
