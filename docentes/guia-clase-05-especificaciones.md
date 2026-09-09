# Guía docente: clase 5 recuperada - OpenCode, contexto y especificaciones en Guardia de Sigilo

**Fecha original:** 2 de septiembre de 2026<br>
**Fecha efectiva:** 9 de septiembre de 2026<br>
**Modalidad:** presencial, recuperación por paro<br>
**Duración:** 120 minutos<br>
**Vinculación:** inicio del primer hito evaluativo del portafolio, con entrega el 15 de septiembre.

## Propósito

Transformar una necesidad de diseño de videojuego en un GDD simplificado, una especificación y un plan verificables antes de intervenir un repositorio con un agente. La recuperación se desarrolla sobre Guardia de Sigilo para profundizar el uso controlado de OpenCode: contexto, herramientas, permisos, evidencia y condiciones de detención.

La clase conserva técnicamente los contenidos de la clase 5. El Parcial 1 sólo se presenta al cierre, si el tiempo alcanza; se realiza individualmente fuera del aula.

## Resultados esperados

Al finalizar, cada estudiante habrá iniciado en su repositorio individual:

- un `GDD.md` simplificado;
- una auditoría inicial con evidencia, supuestos y dudas;
- una especificación con criterios de aceptación;
- un plan de intervención y validación;
- un registro inicial de consulta a OpenCode o una alternativa equivalente.
- una ruta de trabajo autónoma para continuar con los hitos del parcial fuera del aula.
- una propuesta revisada para la progresión completa de movimientos del guardia.

## Preparación previa

1. Publicar en la plataforma la actividad `Parcial 1 - Desarrollo agéntico documentado`, los enlaces a las lecturas y las plantillas.
2. Confirmar que el repositorio base público tiene estado inicial conocido, instrucciones operativas, comandos de validación y pruebas disponibles.
3. Preparar la consigna específica del parcial en la ubicación privada correspondiente. No proyectar ni publicar soluciones, casos de corrección ni rúbrica interna.
4. Verificar que la actividad pueda realizarse con OpenCode, otra herramienta equivalente o la traza provista por la cátedra.
5. Recordar las restricciones: no instalar dependencias, no usar red, no publicar, no leer secretos y no ejecutar comandos que no estén documentados o autorizados.

## Materiales

- Lectura `Repositorios y selección de contexto`.
- Lectura `Especificaciones y planes verificables`.
- Lectura `Primeros pasos con OpenCode para el laboratorio`.
- Repositorio base público de la cátedra.
- Plantillas de GDD, auditoría, especificación, plan, registro de intervención y evidencia de pruebas.
- Guía práctica autogestionada de OpenCode y Guardia de Sigilo.

## Secuencia

### 1. Encuadre y mapa del recorrido - 10 minutos

Explicar que el GDD expresa la intención de diseño; la especificación define el resultado técnico que se aceptará; y el plan organiza cambios, riesgos y verificaciones. Presentar los nueve hitos como un recorrido de trabajo, no como documentos para completar sin relación: inicio, GDD, auditoría, especificación, plan, registro, implementación, validación y revisión.

Recuperar estas preguntas:

- ¿Qué problema aparece al pedir “mejorá el comportamiento” sin definir la experiencia buscada?
- ¿Por qué el primer archivo cuyo nombre coincide con la solicitud puede no ser el único relevante?
- ¿Qué distingue un criterio observable de una preferencia?
- ¿Cuándo corresponde detener al agente y consultar?

### 2. OpenCode y permisos mínimos - 15 minutos

Abrir OpenCode desde el repositorio del laboratorio y mostrar la diferencia entre leer, buscar, editar y ejecutar comandos. Relacionar cada capacidad con un permiso y una evidencia esperada. La demostración inicia en lectura y búsqueda: no se instala, publica, accede a red ni a secretos.

Presentar el prompt de muestra de la guía pública y aclarar que cada estudiante puede copiarlo, pegarlo y modificar sus campos para crear pedidos propios. El prompt no declara el estado del laboratorio: OpenCode debe inferirlo a partir del contexto y citar fuentes.

### 3. Práctica: propuesta completa con OpenCode - 15 minutos

Cada estudiante copia el prompt de muestra o adapta la plantilla. Debe pedir una propuesta completa para patrullar, investigar, perseguir, buscar y regresar; no selecciona sólo una conducta. OpenCode debe devolver evidencia, dudas, transiciones, hitos, pruebas, archivos y condiciones de detención. La persona contrasta dos afirmaciones y formula una segunda instrucción que corrija un supuesto, una restricción o el alcance.

### 4. Recorrido guiado de Guardia de Sigilo y auditoría - 25 minutos

Cada estudiante identifica el repositorio base, el estado de Git y el commit inicial. Debe leer `README.md`, `AGENTS.md`, arquitectura, permisos, configuración, scripts y pruebas antes de editar. Luego inicia `docs/auditoria-repositorio.md` con rutas relevantes, flujo observado, comandos disponibles, evidencia confirmada, supuestos y preguntas abiertas.

La observación se apoya en los controles existentes: mover al jugador, indicar un destino al guardia, alternar BFS/A*, emitir sonido y reiniciar. Identificar las capas sin confundirlas: percepción y memoria informan; navegación calcula ruta; seguimiento y movimiento ejecutan el desplazamiento; Phaser representa. Relacionar esa evidencia con la propuesta de OpenCode, sin anticipar una implementación o una solución técnica.

Intervenir si se intenta editar antes de comprender el proyecto o si se presenta una inferencia del agente como hecho comprobado.

### 5. GDD simplificado - 20 minutos

Cada estudiante redacta el `GDD.md` de su propuesta dentro del alcance de la consigna. Debe incluir experiencia buscada, entidad, problema actual, comportamiento esperado, reglas, un caso límite, fuera de alcance, restricciones y criterios de aceptación.

Pedir que reemplacen expresiones vagas como “más inteligente” o “más divertido” por consecuencias observables para jugador y sistema. Confirmar que no propongan una implementación antes de haber definido la necesidad y el límite.

### 6. Especificación y plan - 20 minutos

Cada estudiante inicia `docs/especificacion.md` y `docs/plan.md`. Debe definir el problema, objetivo, alcance, restricciones, camino principal, caso límite y evidencia prevista. El plan debe proponer cambios pequeños, archivos previstos, validaciones, riesgos y condiciones de detención.

Revisar al menos un criterio de aceptación por estudiante o pareja de revisión. Señalar que “no romper nada”, “código limpio” o “tiene pruebas” no son criterios suficientes.

### 7. Consulta inicial controlada y registro - 10 minutos

Indicar una consulta de sólo lectura: “Explorá el comportamiento relacionado con esta tarea. Citá rutas y símbolos; separá evidencia, supuestos y preguntas abiertas. No modifiques archivos ni ejecutes comandos.” Cada estudiante registra la instrucción, la herramienta, el resultado observable, una afirmación contrastada y su decisión de continuar, ajustar, detener o escalar.

Quien no disponga de modelo utiliza la traza pública y registra el mismo tipo de evidencia.

### 8. Lecturas, ruta autónoma y presentación del parcial - 5 minutos

Indicar la guía práctica autogestionada, seguida de las lecturas sobre repositorios y contexto, y especificaciones y planes. Si el tiempo alcanza, presentar el Parcial 1 como trabajo individual para continuar fuera del aula hasta el 15 de septiembre a las 23:59. La entrega formal incluye URL del repositorio público, commit final, declaración de herramienta o modelo, comandos de validación y ausencia de secretos. Recordar que se evalúa el proceso documentado, no sólo el resultado final.

## Intervenciones docentes clave

- Pedir evidencia de rutas, símbolos, resultados de comandos o diferencias, no afirmaciones generales.
- Confirmar que cada GDD delimite una experiencia y que cada especificación delimite una intervención técnica.
- Exigir permisos mínimos y detener acciones no documentadas.
- Mostrar que una respuesta de OpenCode es una hipótesis: las rutas, búsquedas, pruebas y ejecución aportan la evidencia.
- Pedir una propuesta para toda la progresión de conductas y no para una sola mecánica aislada.
- Exigir que el segundo prompt incorpore una corrección humana observable.
- Diferenciar la información que percibe el guardia de la posición real del jugador y de la locomoción que aplica el motor.
- Mantener la consigna específica, los casos evaluativos y la corrección fuera del material público.

## Errores esperables

- Confundir el GDD con una lista de archivos a modificar.
- Proponer una solución antes de formular problema, alcance y aceptación.
- Tratar el texto del agente como evidencia suficiente.
- Omitir caso límite, fuera de alcance o condiciones de detención.
- Habilitar escritura o comandos antes de completar la exploración.
- Confundir una ruta calculada con el seguimiento de puntos o el desplazamiento efectivo del guardia.
- Presentar los nueve hitos como una lista burocrática sin relación con las decisiones y validaciones.

## Evidencias a conservar

- Commit inicial y repositorio individual.
- `GDD.md`.
- Auditoría, especificación, plan y registro de intervención.
- Resultados de pruebas y commit final.

## Ajustes para grupos heterogéneos

- Quien no tenga acceso a un modelo puede analizar la traza pública con las mismas plantillas y criterios.
- Quien complete temprano puede revisar los criterios de aceptación de otra persona, sin aportar una solución técnica.
- Quien tenga dificultades con Git recibe acompañamiento para crear el repositorio y registrar el commit inicial, sin sustituir la producción individual.

## Relación con el parcial

Los artefactos iniciados durante esta clase constituyen los primeros hitos verificables del Parcial 1. La guía pública organiza su continuación autónoma. Una implementación funcional no compensa la ausencia de GDD, especificación, plan, registro de intervención o evidencia de pruebas.
