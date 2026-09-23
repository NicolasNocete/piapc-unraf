---
id: eje-04-guia-practica-opencode-guardia
titulo: "Guía práctica autogestionada: OpenCode y Guardia de Sigilo"
tipo: referencia
audiencia: estudiante
acceso: publico
eje: 4
orden: 8
clases: [5, 8]
modalidad: mixta
version: 2
---

# Guía práctica autogestionada: OpenCode y Guardia de Sigilo

## Propósito

Usá esta guía para recuperar la clase 5 y, en la clase 8, completar una práctica evaluable de upgrades sobre el laboratorio [Guardia de Sigilo](https://github.com/NicolasNocete/piapc-guardia-sigilo). Avanzá por los hitos en orden: cada uno deja evidencia para el siguiente.

La guía organiza el proceso. Para la práctica de clase 8, cada estudiante trabaja en su repositorio individual y entrega al menos cinco upgrades completos el **martes 6 de octubre de 2026 a las 23:59**. No inventes requisitos que no estén en la situación elegida.

## Antes de usar el agente

No pases de una idea vaga al código. Antes de cada upgrade, separá:

```text
intención → requisito → spec → prompt → plan → build → evidencia
```

- **Intención:** experiencia que buscás para quien juega.
- **Requisito:** regla o necesidad concreta que debe cumplirse.
- **Spec:** contrato versionado con objetivo, alcance, límites, criterios y evidencia.
- **Prompt:** pedido puntual al agente para una acción concreta.
- **Plan:** incrementos y validaciones para cumplir la spec.
- **Evidencia:** build, prueba, ejecución, telemetría y diff que prueban un criterio.

**Vibe coding** es aceptar una propuesta o código porque parece funcionar, sin spec, criterio ni evidencia. No significa que usar IA esté mal: el problema es delegar una decisión de diseño o aceptar un resultado sin revisarlo.

Ejemplo breve:

```text
Vibe coding: “Poné un shake copado cuando detecte al jugador”.

Spec: al dispararse una alerta, la cámara realiza un shake único y vuelve a su
posición normal en menos de un segundo. No cambia controles, navegación ni
detección.
```

Tu decisión humana define intención, requisito, alcance, criterios y permisos. El agente puede ayudar a explorar, preguntar, planificar y construir; no reemplaza esas decisiones.

## Práctica entregable: cinco upgrades de jugo de juego

Elegí cinco upgrades distintos del siguiente catálogo. Cada uno cuenta sólo si tiene spec, plan, build, validación, evidencia y revisión del diff. Podés completar más de cinco, pero el mínimo obligatorio es cinco.

| N.º | Upgrade | Qué debe aportar |
|---:|---|---|
| 1 | Patrulla con pausas y mirada direccional | Anticipación visual y ritmo del recorrido. |
| 2 | Cono de visión visible y reactivo | Claridad de alcance y amenaza. |
| 3 | Animaciones por estado y transición | Representación coherente de la conducta. |
| 4 | Impacto visual extremo de alerta | Shake, flash, zoom, partículas o respuesta equivalente. |
| 5 | Cámara dinámica de tensión | Encuadre útil durante un momento de riesgo. |
| 6 | Cobertura y ruptura de línea de visión | Una decisión activa de sigilo. |
| 7 | Distractores sonoros interactivos | Oportunidad y planificación para el jugador. |
| 8 | Medidor de alerta y estados del nivel | Consecuencias visibles del peligro. |
| 9 | Escape de último momento | Feedback de alivio ante una maniobra ajustada. |
| 10 | Puertas, atajos o rutas bloqueables | Transformación del espacio y la estrategia. |

### 0. Orientación inicial con el agente

Un prompt sirve para explorar; una spec versionada conserva el objetivo, alcance y criterios entre sesiones. Empezá con este prompt, reemplazando sólo el nombre del upgrade:

```text
Trabajamos sobre mi repositorio individual de Guardia de Sigilo.

Mi intención de diseño es: [INTENCIÓN].
El requisito que quiero comprobar es: [REQUISITO].

Quiero preparar el upgrade: [NOMBRE DEL UPGRADE].

Explorá sólo en modo lectura. Leé README.md, AGENTS.md, la arquitectura,
los hitos, las pruebas y el código relacionado. No modifiques archivos, no
ejecutes comandos ni instales dependencias.

Decime:
1. Qué ya existe, con rutas o símbolos.
2. Qué podría reutilizarse.
3. Qué restricciones debo respetar.
4. Qué datos faltan para escribir una spec.

Luego usá la herramienta `question` para preguntarme únicamente las decisiones
de diseño que no puedas comprobar en el repositorio.

Cuando responda, redactá una spec breve con objetivo, alcance, restricciones,
criterios de aceptación y evidencia prevista. No generes código todavía.
```

Contrastá las afirmaciones del agente con el repositorio. Respondé sus preguntas sin inventar datos. Recién entonces aceptá o corregí la spec, pedí el plan y autorizá un incremento pequeño.

### Ficha de trabajo por upgrade

En tu repositorio, conservá una carpeta por cada upgrade que entregues:

```text
docs/upgrades/
  01-nombre-upgrade/
    spec.md
    plan.md
    evidencia.md
```

La `spec.md` debe indicar problema, resultado esperado, alcance, fuera de alcance, restricciones, camino principal, caso límite, criterios de aceptación y evidencia prevista. La `plan.md` debe proponer incrementos, archivos probables, validaciones, riesgos y condiciones de detención. La `evidencia.md` debe registrar commit inicial/final, build, pruebas, secuencia reproducible, resultado y limitaciones.

### Entrega

Entregá en la plataforma antes del **martes 6 de octubre de 2026 a las 23:59**:

1. URL de tu repositorio individual.
2. Commit final identificable.
3. Cinco carpetas de upgrades completas como mínimo.
4. Comandos de build y validación con sus resultados.
5. Evidencia visual o telemetría cuando el upgrade modifique cámara, animación, interfaz o feedback.

No alcanza con una lista de ideas, una captura aislada o código sin build y evidencia.

## Laboratorio de propuestas con OpenCode

En esta práctica dirigís a OpenCode: no se trata de mirar cómo explora el proyecto, sino de pedirle una propuesta fundada, revisar sus límites y definir los próximos pasos. Usá el prompt de muestra para solicitar la progresión completa del guardia y luego ajustalo según tu objetivo.

| Hito | Movimiento o conducta | Evidencia que debe proponer OpenCode |
|---|---|---|
| H3 actual | Seguir una ruta indicada por una persona. | Ruta, nodos explorados y posición final. |
| H4.1 | Patrullar puntos cíclicos. | Ruta válida y cambio de punto de patrulla. |
| H4.2 | Investigar un sonido o última posición conocida. | Llegada al origen o posición recordada. |
| H4.3 | Perseguir una percepción visual válida. | Replanificación sólo ante un cambio relevante del objetivo. |
| H4.4 | Buscar tras perder visión. | Recorrido acotado alrededor de la última posición conocida. |
| H4.5 | Regresar a patrulla. | Retorno a un punto válido y transición registrada. |
| H5 | Comparar FSM con árbol, utilidad o GOAP. | Diagrama o traza y justificación de técnica. |
| H6 | Integración final. | Métricas, pruebas, telemetría y revisión de riesgos. |

La propuesta debe respetar estas reglas: visión tiene prioridad sobre sonido; una pérdida de visión no borra la última posición conocida; decisión, búsqueda, seguimiento y locomoción son capas distintas; y toda transición debe poder observarse en telemetría.

### Prompt de muestra

**Usá este prompt como punto de partida.** Copialo, pegalo en OpenCode y modificá lo necesario para tu tarea. No es una respuesta ni una solución: es una estructura para pedir exploración con evidencia, elaborar una propuesta y definir los próximos pasos.

```text
Trabajamos sobre el laboratorio Guardia de Sigilo.

Explorá primero README.md, AGENTS.md, docs/arquitectura.md,
docs/permisos-recomendados.md, las especificaciones, los hitos, el código y
las pruebas relacionadas. Si necesitás ampliar el contexto, buscá rutas y
símbolos vinculados. No modifiques archivos ni ejecutes comandos.

Determiná el estado actual del laboratorio a partir de las fuentes del
repositorio. Indicá qué capacidades del guardia ya existen, cuáles todavía no
existen y qué rutas o símbolos respaldan cada afirmación. No asumas que existe
una máquina de estados hasta comprobarlo. Separá evidencia, supuestos y
preguntas abiertas.

Luego elaborá una propuesta completa de progresión para:
1. Patrullar puntos cíclicos.
2. Investigar un sonido o última posición conocida.
3. Perseguir al jugador cuando exista percepción visual válida.
4. Buscar durante un tiempo limitado al perder visión.
5. Regresar a un punto de patrulla válido.

Para cada conducta indicá estado de origen, evento, guarda, estado destino y
acción; la información que puede usar el guardia y la que no debe consultar;
cuándo recalcular o conservar una ruta; qué hacer ante un destino inaccesible;
una prueba del camino principal y un caso límite; y las capas, rutas y pruebas
relacionadas.

Respetá estas restricciones:
- El dominio no puede importar Phaser, DOM ni APIs del navegador.
- Percepción, memoria, decisión, búsqueda, seguimiento y locomoción deben
  permanecer separados.
- Visión tiene prioridad sobre sonido y la última posición conocida cambia sólo
  ante una percepción válida.
- Cada transición debe producir telemetría observable.
- No agregar dependencias, no usar red, no acceder a secretos ni publicar.

Presentá el resultado en este orden:
1. Evidencia encontrada.
2. Supuestos y preguntas abiertas.
3. Tabla completa de estados y transiciones.
4. Plan incremental por hitos H4.1 a H4.5.
5. Estrategia de pruebas y evidencia.
6. Archivos posiblemente afectados.
7. Condiciones para detenerse y consultar.

No implementes todavía.
```

### Plantilla para copiar y adaptar

Copiá y pegá esta plantilla. Reemplazá cada campo entre corchetes y adaptá las listas a la mejora que querés pedir. Conservá las restricciones y el orden de salida para que la respuesta sea verificable.

```text
Trabajamos sobre [NOMBRE DEL PROYECTO O REPOSITORIO].

Quiero analizar y proponer mejoras para [ENTIDAD O SISTEMA].

Objetivo de diseño:
[EXPERIENCIA O COMPORTAMIENTO QUE QUIERO LOGRAR PARA QUIEN JUEGA].

Explorá primero [DOCUMENTOS, CARPETAS, SÍMBOLOS O PRUEBAS CONOCIDAS].
Si necesitás ampliar el contexto, buscá rutas relacionadas. No modifiques
archivos ni ejecutes comandos.

Determiná el estado actual del proyecto con evidencia. Indicá qué capacidades
ya existen, cuáles no, y qué rutas y símbolos respaldan cada afirmación.
Separá evidencia, supuestos y preguntas abiertas.

Luego elaborá una propuesta para:
[COMPORTAMIENTOS, MOVIMIENTOS O HITOS A ANALIZAR].

Para cada propuesta indicá estado inicial, evento, guarda, comportamiento
esperado, información permitida y prohibida, capas o archivos involucrados,
prueba principal, caso límite, riesgos y condiciones para detenerse.

Respetá estas restricciones:
- [RESTRICCIÓN DE ARQUITECTURA].
- [PERMISOS O ACCIONES PROHIBIDAS].
- [LÍMITE DE ALCANCE].
- [REGLAS DE DISEÑO O INVARIANTES].

Presentá el resultado en este orden:
1. Evidencia encontrada.
2. Supuestos y preguntas abiertas.
3. Propuesta de comportamiento.
4. Plan por hitos.
5. Estrategia de pruebas.
6. Archivos posiblemente afectados.
7. Condiciones para detenerse y consultar.

No implementes todavía.
```

### Qué entregás al terminar la práctica

1. Prompt inicial copiado o adaptado.
2. Respuesta de OpenCode con evidencia.
3. Contraste de al menos dos afirmaciones con el repositorio.
4. Una corrección humana de alcance, supuesto o restricción.
5. Segundo prompt mejorado.
6. Propuesta final de los hitos H4.1 a H4.5, con pruebas y condiciones de detención.

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

1. **Proponer.** Copiá el prompt de muestra o completá la plantilla y pedí una exploración más propuesta completa.
2. **Contrastar.** Verificá al menos dos afirmaciones mediante archivos, búsquedas o comandos autorizados. La respuesta del agente no es una prueba.
3. **Corregir.** Señalá una decisión que OpenCode no puede tomar por sí solo, ajustá el alcance o una restricción y formulá un segundo prompt.
4. **Delimitar.** Actualizá GDD, auditoría, especificación y plan antes de habilitar escritura. Completá la [matriz de permisos](../../plantillas/04-matriz-permisos.md).
5. **Cambiar.** Cuando la consigna lo habilite, pedí una modificación pequeña, limitada a los archivos previstos. Revisá la diferencia antes de continuar.
6. **Validar.** Ejecutá primero la prueba relacionada y luego los comandos documentados de validación. Registrá resultado, versión y criterio demostrado.
7. **Revisar.** Compará el resultado con el objetivo acordado, no con una impresión general de que “parece funcionar”.

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
