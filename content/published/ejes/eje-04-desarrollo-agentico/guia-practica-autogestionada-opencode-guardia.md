---
id: eje-04-guia-practica-opencode-guardia
titulo: "Guía práctica autogestionada: OpenCode y Guardia de Sigilo"
tipo: referencia
audiencia: estudiante
acceso: publico
eje: 4
orden: 8
clases: [5]
modalidad: mixta
version: 1
---

# Guía práctica autogestionada: OpenCode y Guardia de Sigilo

## Propósito

Usá esta guía para recuperar la clase 5 y preparar una intervención pequeña y verificable sobre el laboratorio [Guardia de Sigilo](https://github.com/NicolasNocete/piapc-guardia-sigilo). Avanzá por los hitos en orden: cada uno deja evidencia para el siguiente.

La guía organiza el proceso; la [consigna del Parcial 1](08-parcial-01-desarrollo-agentico-documentado.md) indica la entrega formal y la situación que presente la cátedra. No inventes requisitos que no estén en esa situación.

## Antes de empezar

1. Creá tu repositorio público individual desde la base indicada y conservá el commit inicial.
2. Leé `README.md`, `AGENTS.md`, `docs/arquitectura.md`, `docs/permisos-recomendados.md`, `package.json` y las pruebas relacionadas antes de editar.
3. Abrí OpenCode desde la carpeta del proyecto. Empezá con lectura y búsqueda; no habilites escritura, red, instalación, publicación ni acceso a secretos sin una necesidad documentada y autorización.
4. Usá los controles del escenario para observar jugador, destino del guardia, BFS/A*, sonido y reinicio. En H3, percepción y memoria no deciden todavía una persecución autónoma.

## Hitos de trabajo

| Hito | Qué hacés | Evidencia para avanzar |
|---|---|---|
| 1. Inicio | Registrás URL, rama o commit base y estado inicial. | El historial permite reconocer el punto de partida. |
| 2. GDD | Definís experiencia, problema, comportamiento esperado, reglas, límites y un caso límite. | [GDD simplificado](../../plantillas/09-gdd-simplificado.md) completo sin proponer archivos antes de definir la necesidad. |
| 3. Auditoría | Mapeás entrada, dominio, aplicación, escena, pruebas y comandos. | [Auditoría](../../plantillas/03-auditoria-repositorio.md) con evidencia, supuestos y dudas diferenciados. |
| 4. Especificación | Delimitás objetivo, alcance, fuera de alcance, restricciones y criterios observables. | [Especificación](../../plantillas/01-especificacion.md) con camino principal y caso límite. |
| 5. Plan | Relacionás cada criterio con un cambio pequeño, una verificación y un riesgo. | [Plan](../../plantillas/02-plan.md) con condiciones explícitas para detenerse. |
| 6. Registro | Documentás cada ciclo de herramienta y tu decisión humana. | [Registro](../../plantillas/05-registro-intervencion.md) sin secretos ni razonamientos internos. |
| 7. Implementación | Aplicás sólo el cambio aprobado por la especificación y el plan. | Diferencias y commits pequeños que se puedan revisar. |
| 8. Validación | Comprobás criterio por criterio el camino principal y el caso límite. | [Evidencia de pruebas](../../plantillas/06-evidencia-pruebas.md) reproducible. |
| 9. Revisión | Explicás alcance logrado, correcciones, límites y riesgos pendientes. | [Informe final](../../plantillas/08-informe-final.md) y commit final identificable. |

No avances ocultando un fallo del hito anterior. Si no podés justificar una decisión con una fuente o una validación, registrala como supuesto o duda.

## Ciclo con OpenCode

1. **Observar.** Pedí una exploración acotada. Ejemplo: “Mapeá el recorrido desde la entrada de jugador hasta el destino del guardia. Citá rutas y símbolos. Separá evidencia, supuestos y dudas. No modifiques archivos ni ejecutes comandos.”
2. **Contrastar.** Verificá al menos dos afirmaciones mediante archivos, búsquedas o comandos autorizados. La respuesta del agente no es una prueba.
3. **Delimitar.** Actualizá GDD, auditoría, especificación y plan antes de habilitar escritura. Completá la [matriz de permisos](../../plantillas/04-matriz-permisos.md).
4. **Cambiar.** Pedí una modificación pequeña, limitada a los archivos previstos. Revisá la diferencia antes de continuar.
5. **Validar.** Ejecutá primero la prueba relacionada y luego los comandos documentados de validación. Registrá resultado, versión y criterio demostrado.
6. **Revisar.** Compará el resultado con el objetivo acordado, no con una impresión general de que “parece funcionar”.

## Preguntas para orientarte

- ¿Qué experiencia se perjudica con el comportamiento actual del guardia?
- ¿Qué sabe el guardia por visión o sonido, y qué información no debería conocer?
- ¿Qué capa calcula ruta, cuál consume puntos y cuál aplica el movimiento real?
- ¿Qué archivo, prueba o ejecución confirma cada afirmación importante?
- ¿Cómo demostrarás el camino principal y el caso límite?

## Cuándo detenerse

Detenete y consultá si la situación admite interpretaciones de diseño distintas, falta un permiso, el agente propone un comando no documentado, una validación falla sin causa comprendida, aparecen cambios ajenos, se requieren credenciales o el cambio atraviesa el límite entre dominio y motor.

Podés usar una herramienta equivalente o una traza provista por la cátedra si no contás con un modelo. La evidencia y las decisiones humanas exigidas son las mismas.

## Lecturas de apoyo

1. [Primeros pasos con OpenCode](../eje-03-sistemas-agenticos/07-primeros-pasos-opencode.md).
2. [Repositorios y selección de contexto](01-repositorios-y-contexto.md).
3. [Especificaciones y planes verificables](02-especificaciones-y-planes.md).
4. [Parcial 1 - Desarrollo agéntico documentado](08-parcial-01-desarrollo-agentico-documentado.md).
