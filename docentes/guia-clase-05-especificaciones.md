# Guía docente: clase 5 recuperada - Ingeniería de contexto y especificaciones

**Fecha original:** 2 de septiembre de 2026<br>
**Fecha efectiva:** 9 de septiembre de 2026<br>
**Modalidad:** presencial, recuperación por paro<br>
**Duración:** 120 minutos<br>
**Vinculación:** inicio del primer hito evaluativo del portafolio, con entrega el 15 de septiembre.

## Propósito

Transformar una necesidad de diseño de videojuego en un GDD simplificado, una especificación y un plan verificables antes de intervenir un repositorio con un agente. La clase recupera el contenido previsto para el 2 de septiembre y permite comenzar el parcial sin anticipar su resolución.

## Resultados esperados

Al finalizar, cada estudiante habrá iniciado en su repositorio individual:

- un `GDD.md` simplificado;
- una auditoría inicial con evidencia, supuestos y dudas;
- una especificación con criterios de aceptación;
- un plan de intervención y validación;
- un registro inicial de consulta a OpenCode o una alternativa equivalente.

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

## Secuencia

### 1. Encuadre y recuperación conceptual - 15 minutos

Explicar que el GDD expresa la intención de diseño; la especificación define el resultado técnico que se aceptará; y el plan organiza cambios, riesgos y verificaciones. Recuperar estas preguntas:

- ¿Qué problema aparece al pedir “mejorá el comportamiento” sin definir la experiencia buscada?
- ¿Por qué el primer archivo cuyo nombre coincide con la solicitud puede no ser el único relevante?
- ¿Qué distingue un criterio observable de una preferencia?
- ¿Cuándo corresponde detener al agente y consultar?

### 2. Demostración docente: de solicitud ambigua a decisión verificable - 15 minutos

Partir de una solicitud ambigua, por ejemplo: “El guardia debería comportarse mejor cuando pierde al jugador”. En pizarra, separar problema de diseño, experiencia buscada, comportamiento observable, reglas, fuera de alcance, caso límite, criterio de aceptación y evidencia. La demostración no utiliza la consigna específica del parcial ni muestra una solución técnica.

### 3. Inicio del repositorio y auditoría - 20 minutos

Cada estudiante crea su repositorio público individual desde la base indicada y registra el commit inicial. Debe leer `README.md`, instrucciones del proyecto, configuración, scripts y pruebas antes de editar. Luego inicia `docs/auditoria-repositorio.md` con rutas relevantes, flujo observado, comandos disponibles, evidencia confirmada, supuestos y preguntas abiertas.

Intervenir si se intenta editar antes de comprender el proyecto o si se presenta una inferencia del agente como hecho comprobado.

### 4. GDD simplificado - 20 minutos

Cada estudiante redacta el `GDD.md` de su propuesta dentro del alcance de la consigna. Debe incluir experiencia buscada, entidad, problema actual, comportamiento esperado, reglas, un caso límite, fuera de alcance, restricciones y criterios de aceptación.

Pedir que reemplacen expresiones vagas como “más inteligente” o “más divertido” por consecuencias observables para jugador y sistema. Confirmar que no propongan una implementación antes de haber definido la necesidad y el límite.

### 5. Especificación y plan - 25 minutos

Cada estudiante inicia `docs/especificacion.md` y `docs/plan.md`. Debe definir el problema, objetivo, alcance, restricciones, camino principal, caso límite y evidencia prevista. El plan debe proponer cambios pequeños, archivos previstos, validaciones, riesgos y condiciones de detención.

Revisar al menos un criterio de aceptación por estudiante o pareja de revisión. Señalar que “no romper nada”, “código limpio” o “tiene pruebas” no son criterios suficientes.

### 6. Consulta inicial controlada - 15 minutos

Indicar una consulta de sólo lectura: “Explorá el comportamiento relacionado con esta tarea. Citá rutas y símbolos; separá evidencia, supuestos y preguntas abiertas. No modifiques archivos ni ejecutes comandos.” Cada estudiante registra la instrucción, la herramienta, el resultado observable, una afirmación contrastada y su decisión de continuar, ajustar, detener o escalar.

Quien no disponga de modelo utiliza la traza pública y registra el mismo tipo de evidencia.

### 7. Lanzamiento del parcial y cierre - 10 minutos

Comunicar que el trabajo continúa de forma individual hasta el 15 de septiembre a las 23:59. La entrega formal se realiza en la plataforma e incluye la URL del repositorio público, el commit final, la declaración de herramienta o modelo, los comandos de validación y la declaración de ausencia de secretos. Recordar que se evalúa el proceso documentado, no sólo el resultado final.

## Intervenciones docentes clave

- Pedir evidencia de rutas, símbolos, resultados de comandos o diferencias, no afirmaciones generales.
- Confirmar que cada GDD delimite una experiencia y que cada especificación delimite una intervención técnica.
- Exigir permisos mínimos y detener acciones no documentadas.
- Mantener la consigna específica, los casos evaluativos y la corrección fuera del material público.

## Errores esperables

- Confundir el GDD con una lista de archivos a modificar.
- Proponer una solución antes de formular problema, alcance y aceptación.
- Tratar el texto del agente como evidencia suficiente.
- Omitir caso límite, fuera de alcance o condiciones de detención.
- Habilitar escritura o comandos antes de completar la exploración.

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

Los artefactos iniciados durante esta clase constituyen los primeros hitos verificables del Parcial 1. Una implementación funcional no compensa la ausencia de GDD, especificación, plan, registro de intervención o evidencia de pruebas.
