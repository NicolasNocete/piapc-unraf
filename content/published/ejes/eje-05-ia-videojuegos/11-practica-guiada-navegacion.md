---
id: eje-05-practica-guiada-navegacion
titulo: "Práctica guiada: especificar y verificar una navegación"
eje: 5
orden: 11
tipo: actividad
nivel: obligatorio
audiencia: estudiante
clases: [9, 10]
modalidad: mixta
duracion_minutos: 180
resultados: [RA3, RA4, RA5, RA7, RA8, RA11]
prerrequisitos: [eje-05-teoria-navegacion-comportamiento]
evaluable: true
acceso: publico
version: 1
disponible_desde: "2026-10-07"
disponible_hasta: "2026-10-14"
---

# Práctica guiada: especificar y verificar una navegación

**Inicio: miércoles 7/10/2026. Entrega única: en la clase del miércoles 14/10/2026.**

## Situación problemática y objetivo

El guardia puede encontrar una ruta, pero la más corta no siempre responde a la intención de diseño y una ruta puede dejar de ser válida. Vas a comparar algoritmos y conducir **una sola mejora de navegación**, con una spec breve y pruebas reproducibles.

La práctica está prearmada: copiás una spec común, elegís una de tres variantes y seguís los pasos. Elaborar la spec significa contrastarla con tu repositorio y completar datos concretos, no escribir un informe desde cero. Ningún prompt autoriza tareas fuera de la spec.

**Entregás todo junto el 14/10.** No hay entregas intermedias. La FSM, los árboles, la utilidad y GOAP que se presentan ese día no forman parte de esta entrega. Tampoco se vuelven a pedir los cinco upgrades de la actividad anterior.

## Recursos disponibles

- Tu repositorio individual basado en [Guardia de Sigilo](https://github.com/NicolasNocete/piapc-guardia-sigilo), conservando tus cambios anteriores.
- El [apunte teórico de las dos clases](10-teoria-navegacion-y-comportamiento.md).
- Las specs, mapas, prompts y plantillas completos de esta guía.
- README, instrucciones, arquitectura, código y pruebas de tu copia.

En el laboratorio canónico, buscá primero `src/domain/navigation/`, `src/application/simulation/navigationDemo.ts` y `tests/navigation/`. Son puntos de entrada para explorar, **no nombres garantizados en tu copia**. La versión canónica actual ya cuenta con conducta autónoma; no reconstruyas la FSM ni supongas que falta.

## Restricciones y recorrido

Dominio independiente del motor; sin dependencias nuevas, editor de mapas, despliegue, acceso a secretos ni cambios a percepción/FSM. Las specs también contienen estas restricciones. Los comandos se ejecutan sólo después de comprobarlos en el repositorio. Los commits y la publicación se realizan por decisión humana.

| Paso | Qué hacés | Qué conservás | Tiempo orientativo |
|---:|---|---|---:|
| 1 | Exploración en lectura | Rutas y estado inicial en evidencia | 15 min |
| 2 | Copiar spec común y elegir variante | `spec.md` en borrador | 15 min |
| 3 | Adaptar y aprobar la spec | Spec revisada | 20 min |
| 4 | Línea base, comparación y trazas | Resultados comunes | 30 min |
| 5 | Revisar plan prearmado | `plan.md` aprobado | 10 min |
| 6 | Implementar por incrementos | Una mejora acotada | 45 min |
| 7 | Verificar y revisar | Matriz criterio-evidencia | 30 min |
| 8 | Cerrar la entrega | Tres archivos, URL y commit | 15 min |

Si un fallo previo o una incompatibilidad impide avanzar, registrá la reproducción y consultá. No inventes resultados ni amplíes la práctica para resolver una refactorización grande.

---

## La spec común: contrato de toda la práctica

**Copiá este bloque al principio de `docs/practica-navegacion/spec.md`.** Después pegá únicamente la variante que elegiste. Ese archivo es la spec completa: base común más un anexo. Los únicos campos iniciales a completar son repositorio, commit, variante, rutas y comandos confirmados.

```markdown
# Spec: práctica de navegación — 7 al 14/10/2026

Estado: Borrador
Repositorio: [URL]
Commit inicial: [COMMIT]
Variante elegida: [A, B o C]
Rutas relevantes: [COMPLETAR DESPUÉS DE EXPLORAR]
Comandos confirmados: [VALIDACIÓN Y PRUEBA ENFOCADA]

## Objetivo
Comparar navegación y verificar una única mejora con un caso normal y uno
límite, manteniendo separadas búsqueda, seguimiento y decisión.

## Alcance
Exploración, línea base, comparación BFS/A*, trazas guiadas DFS/Dijkstra,
adaptación de esta spec, un plan de tres incrementos, la variante seleccionada,
validación y entrega. La variante se conecta con una entrada de navegación o
simulación existente; no queda como un algoritmo aislado sin consumidor.

## Fuera de alcance
Implementar DFS o Dijkstra; cambiar FSM, percepción o controles; agregar
dependencias, editor de mapas, motor nuevo o despliegue; hacer varias variantes.

## Requisitos comunes
BASE-01: identificar búsqueda, seguimiento, consumidor y pruebas con rutas;
registrar commit inicial, cambios previos y validación de referencia.
BASE-02: usar el fixture de 5x3 definido debajo y registrar vecinos/desempate.
Comparar BFS y A* unitarios con igual mapa, inicio y meta: estado, ruta, pasos,
costo, nodos expandidos y frontera máxima. No inventar métricas ausentes.
Si una métrica no existe, registrar la limitación sin agregar instrumentación
obligatoria; conservar al menos estado, ruta, pasos y costo comprobable.
BASE-03: explicar la traza DFS y completar los costos de la traza Dijkstra
provistas en la guía. No implementar nuevos algoritmos para este requisito.
BASE-04: verificar éxito con ruta válida, inicio igual a meta con costo 0,
destino libre pero inaccesible y extremos inválidos, usando el contrato real
del proyecto. No representar éxito inmóvil y fracaso de forma indistinguible.
BASE-05: copiar un solo anexo, contrastar sus supuestos con el código, completar
rutas/comandos y señalar incompatibilidades. Aprobar spec y plan antes de editar
código. Registrar un contraste y una decisión humana, sin transcribir el chat.
BASE-06: implementar sólo la variante aprobada, reutilizar capacidades ya
existentes y revisar cada incremento. Conservar dominio puro y conducta previa.
BASE-07: producir evidencia del camino normal, el caso límite y una llamada
desde el consumidor real o su prueba de integración. Ejecutar prueba enfocada
y validación del repositorio; revisar diff y regresiones.
BASE-08: entregar el 14/10/2026, en un único paquete, spec.md, plan.md y
evidencia.md bajo docs/practica-navegacion/, más URL y commit final.

## Fixture común
Cuadrícula: x=0..4, y=0..2; origen arriba a la izquierda; cuatro vecinos,
sin diagonales; inicio S=(0,1), meta G=(4,1); todas las celdas libres y costo 1.
La ruta incluye inicio y meta. Pasos = cantidad de aristas, no de puntos.
Para el caso inaccesible, bloquear (2,0), (2,1) y (2,2); la meta sigue libre.
Para extremos inválidos: inicio (-1,1) o meta (5,1), en casos separados.
Traducir el fixture al formato actual sin cambiar su semántica.

## Restricciones
No sobreescribir cambios anteriores ni modificar pruebas para ocultar fallos.
No instalar dependencias, acceder a secretos o publicar. No cambiar el motor
ni la FSM. Escritura acotada a documentos, navegación, su consumidor mínimo y
pruebas previstas en el plan. No autorizar commits automáticos.
Todos los comandos deben existir o estar justificados y autorizados.

## Criterios comunes
BASE-AC1: evidencia identifica repositorio/commit, capas, cambios previos,
comando y resultado inicial; lo observado se distingue de lo supuesto.
BASE-AC2: en el fixture libre, BFS y A* devuelven ruta cardinal válida de
4 pasos y costo 4. Registrar resultados reales y explicar métricas disponibles.
Las trazas DFS/Dijkstra incluyen conclusión sobre pasos frente a costos.
BASE-AC3: inicio=meta es éxito de costo 0; barrera completa es inaccesible;
extremos fuera de mapa producen resultados inválidos según contrato documentado.
BASE-AC4: spec y plan aprobados antes de implementación; una decisión humana
y su contraste quedan registrados, y sólo se desarrolla el anexo elegido.
BASE-AC5: criterios del anexo tienen pruebas reproducibles; existe evidencia
de su conexión con el consumidor; validación final y diff revisados, sin
regresiones nuevas ni ampliaciones ocultas del alcance.
BASE-AC6: los tres documentos, la URL y el commit final identifican la misma
versión entregada el 14/10; los cambios de código y pruebas están en ese commit.

## Evidencia y decisiones
Usar la plantilla evidencia.md de esta guía. Si un supuesto no se cumple,
marcarlo como pendiente y consultar; no aprobar una spec con dudas que afecten
el comportamiento. La hora/canal de entrega será la indicada por la cátedra.
```

**Ejemplo para entender la spec:** no alcanza pedir «que el guardia navegue mejor». `BASE-AC2` fija mapa, condiciones y resultado. Si una ruta incluye cinco puntos, tiene cuatro pasos. Si el agente devuelve un rodeo de seis pasos en el mapa libre unitario, no satisface ese criterio aunque llegue.

---

## Elegí una variante: tres specs listas

Elegí **A si querés trabajar costos**, **B si te interesa la intención de sigilo** o **C si preferís reaccionar a cambios del mapa**. A y B comparten una estructura de costos: no cuentan como dos mejoras obligatorias. Las opciones tienen resultados predefinidos; no hay que ajustar parámetros por ensayo y error.

### Opción A — Terreno lento

**Caso:** una franja central es transitable, pero cuesta más recorrerla. El guardia debe preferir un rodeo de menor costo. El costo modela preferencia de navegación; no se exige cambiar velocidad física o animación.

Pegá este anexo después de la spec común:

```markdown
## Anexo A: terreno lento
Intención: minimizar costo de desplazamiento, no sólo cantidad de pasos.
Escenario: fixture BASE, con costo de entrada 5 en (1,1), (2,1), (3,1).
El resto cuesta 1; el inicio no suma costo. No hay celdas bloqueadas.

Requisitos:
A-01: el cálculo ponderado suma costos de entrada positivos; BFS conserva
su semántica unitaria y no se presenta como oráculo del mínimo ponderado.
A-02: usar A* existente con costo ponderado y heurística Manhattan válida
(costo mínimo 1), o su capacidad equivalente ya existente; no implementar
Dijkstra adicional. Mantener compatible el caso unitario anterior.
A-03: conectar el modo ponderado con un consumidor de navegación/simulación
existente mediante configuración explícita, sin crear una interfaz nueva.
A-04: si la franja vuelve a costo 1, la búsqueda usa esos nuevos datos y
recupera el mínimo unitario; no reutiliza costos anteriores por accidente.

Criterios:
A-AC1: la ruta directa tiene 4 pasos y costo 16 (=5+5+5+1).
La búsqueda ponderada devuelve un rodeo válido de 6 pasos y costo total 6.
Puede pasar por arriba o abajo; no exigir una ruta única en un empate.
A-AC2: sin franja lenta, resultado de 4 pasos y costo 4.
A-AC3: prueba del consumidor confirma que usa el modo ponderado y obtiene
costo 6 con franja; el modo unitario existente conserva su funcionamiento.

Fuera de alcance: modificar velocidad, crear terrenos gráficos o editar niveles.
Evidencia: prueba de franja, prueba de restauración, comparación de costos y
prueba de consumidor; registrar en evidencia.md.
```

**Prompt orientativo de inicio A — usalo en el paso 3:**

```text
Elegí el anexo A: terreno lento. Mi spec común y anexo están al final.
Primero explorá sólo en lectura si navegación acepta costos, cómo suma g,
qué heurística usa y quién consume el resultado. No implementes.
Contrastá la ruta directa de costo 16 y el rodeo de costo 6 con el fixture.
Proponé la adaptación mínima al contrato actual, preservando BFS unitario.
No cambies velocidades ni agregues algoritmos o dependencias.
Mostrá rutas/símbolos y diferencias entre evidencia y supuestos.
Devolvé la spec breve adaptada; consultame si existe una incompatibilidad.
[PEGAR SPEC COMÚN + ANEXO A]
```

### Opción B — Evitar zonas expuestas

**Caso:** el recorrido directo cruza una franja expuesta. Una ruta más larga evita esa franja. Se trabaja con una máscara fija, no con visión dinámica ni con la posición secreta del jugador.

```markdown
## Anexo B: zonas expuestas
Intención: preferir menos exposición cuando existe una alternativa razonable.
Escenario: fixture BASE, con máscara expuesta en (1,1), (2,1), (3,1).
Costo de entrar = 1 + penalización; penalización 4 si expuesta, 0 si no.
El inicio no suma costo. Exposición es preferencia, no obstáculo ni probabilidad.

Requisitos:
B-01: usar la máscara fija explícita para calcular costos positivos de entrada.
No leer jugador oculto ni cambiar sensores o memoria; todas las celdas son libres.
B-02: la búsqueda ponderada usa A* existente adaptado o capacidad equivalente,
con Manhattan y costo mínimo 1; mantiene el caso unitario y BFS existentes.
B-03: conectar perfil de penalización con el consumidor de navegación/simulación
existente mediante configuración, sin interfaz nueva ni adaptación de la FSM.
B-04: con penalización 0, dejar de evitar la máscara por costos anteriores.

Criterios:
B-AC1: directa de 4 pasos tiene costo 16; resultado preferido tiene 6 pasos,
costo 6 y no entra en las tres celdas expuestas. Aceptar rodeo superior o inferior.
B-AC2: con penalización 0, resultado de 4 pasos y costo 4; la máscara no bloquea.
B-AC3: prueba del consumidor obtiene el rodeo con el perfil expuesto y conserva
el resultado unitario al desactivarlo. Percepción y memoria no se modificaron.

Fuera de alcance: exposición dinámica, probabilidades, nuevas coberturas o sensores.
Evidencia: cálculo del costo, ruta sin franja, penalización 0, prueba de consumidor
y revisión de archivos; registrar en evidencia.md.
```

**Prompt orientativo de inicio B:**

```text
Elegí el anexo B: zonas expuestas. Copio mi spec común y anexo al final.
Explorá sólo en lectura navegación, costos y consumidor. No implementes.
Necesito una máscara fija de tres celdas, no cambiar visión ni memoria.
Mostrá cómo expresar costo 1+4 y cómo preservar Manhattan y el modo unitario.
Verificá los costos esperados 16 y 6, y el caso de penalización 0.
Proponé una adaptación mínima de la spec con rutas reales. No agregues UI.
Si hay incompatibilidades, presentá opciones acotadas y esperá mi decisión.
[PEGAR SPEC COMÚN + ANEXO B]
```

### Opción C — Reaccionar ante un bloqueo dinámico

**Caso:** la ruta inicial era válida, pero se bloquea una celda antes de que el guardia la atraviese. Debe abandonar la ruta vieja y buscar un rodeo. Si no existe salida, se detiene e informa el motivo.

```markdown
## Anexo C: bloqueo dinámico
Intención: no continuar por una ruta invalidada ni recalcular sin motivo.
Escenario: fixture BASE unitario. Calcular ruta inicial de 4 pasos.
Sin mover al guardia de S=(0,1), bloquear (2,1) y notificar cambio del mapa.
Luego, en un caso independiente desde S, bloquear toda la columna x=2.

Requisitos:
C-01: ante cambio notificado, comprobar si afecta la ruta restante; si la afecta,
invalidar antes del siguiente avance. No introducir física ni colisiones nuevas.
C-02: pedir una nueva ruta desde la celda actual hacia la misma meta; reemplazar
la anterior al obtener resultado. La decisión/FSM conserva su contrato.
C-03: un evento que invalida ruta produce una solicitud de recálculo; actualizaciones
posteriores sin otro cambio o destino nuevo no repiten solicitudes de búsqueda.
C-04: si no hay ruta, cancelar avance por la ruta vieja y exponer inaccesible
al consumidor. Queda detenido hasta un nuevo cambio de mapa o destino solicitado;
un cambio relevante permite reintentar. No reintentar en bucle cada cuadro.

Criterios:
C-AC1: bloqueo de (2,1) antes del avance cancela la ruta directa; la nueva ruta
tiene 6 pasos, costo 6 y no atraviesa la celda bloqueada (rodeo arriba o abajo).
C-AC2: barrera x=2 da inaccesible, sin avance hacia la barrera; diez actualizaciones
sin otro evento no agregan búsquedas. Instrumentar llamadas sólo en la prueba.
C-AC3: liberar la barrera y notificar permite recuperar ruta de 4 pasos/costo 4;
una prueba de integración del consumidor demuestra invalidación y recuperación.

Fuera de alcance: puertas animadas, editor, rediseño de FSM, bloqueo bajo el guardia
o modelado del radio físico. Usar eventos/datos de mapa y tiempo controlados.
Evidencia: bloqueo simple, barrera, conteo de solicitudes, recuperación y consumidor.
```

**Prompt orientativo de inicio C:**

```text
Elegí el anexo C: bloqueo dinámico. Copio mi spec común y anexo al final.
Explorá sólo en lectura búsqueda, seguimiento y coordinación de rutas.
No implementes ni cambies la FSM. Identificá dónde invalidar una ruta y comunicar
inaccesible, y cómo notificar un cambio de mapa sin editor o interfaz nueva.
Usá eventos explícitos; no pongas una búsqueda por cuadro.
Contrastá bloqueo simple, barrera completa, diez actualizaciones sin cambio
y recuperación. Proponé la spec adaptada con rutas reales y consultá conflictos
con el contrato existente antes de autorizar código.
[PEGAR SPEC COMÚN + ANEXO C]
```

---

## Procedimiento paso a paso

### Paso 1 — Reconocé tu punto de partida (BASE-01)

Abrí tu repositorio individual. Copiá el siguiente prompt en OpenCode o una herramienta equivalente:

```text
Voy a realizar la práctica de navegación del 7 al 14/10.
Por ahora tenés permiso sólo de lectura y búsqueda de archivos.
Leé README, AGENTS si existe, arquitectura, package.json, navegación,
seguimiento, consumidor y pruebas. No ejecutes comandos ni edites archivos.
Devolvé una tabla: capa, ruta/símbolo, capacidad existente y evidencia.
Señalá los comandos documentados de prueba enfocada y validación completa.
Separá hechos, supuestos y preguntas. No supongas que falta una FSM.
No propongas refactorizaciones ni mejoras fuera de navegación.
```

**Esperá:** un mapa breve de rutas reales, no una descripción genérica de A*. **Revisá:** abrí dos rutas mencionadas y comprobá las afirmaciones. **Guardá:** la tabla y un contraste breve en `evidencia.md`, usando la plantilla del paso 8. **Avanzá:** cuando reconocés búsqueda, seguimiento, consumidor y pruebas. No hace falta una auditoría separada.

### Paso 2 — Armá el contrato por copia y selección (BASE-05)

Creá `docs/practica-navegacion/` en tu copia. Copiá la spec común a `spec.md` y pegá un único anexo. Completá la URL, el commit inicial y la letra seleccionada. Copiá también las plantillas de `plan.md` y `evidencia.md` del paso 8.

Podés hacerlo manualmente o autorizar al agente con este prompt:

```text
Autorizo crear únicamente docs/practica-navegacion/spec.md, plan.md y evidencia.md.
Usá literalmente las plantillas que pego abajo; mi variante es [A/B/C].
Conservá IDs, datos de fixture y criterios. Marcá pendientes los campos locales.
Si alguno de esos archivos ya existe, mostrame su contenido y consultame antes
de sobreescribir. No modifiques código, pruebas, instrucciones ni otros documentos.
[PEGAR SPEC COMÚN, ANEXO ELEGIDO Y LAS DOS PLANTILLAS DEL PASO 8]
```

**Elegís:** una variante; no más. **Esperá:** tres documentos cortos con campos pendientes identificables. **Revisá:** que no haya dos anexos ni requisitos nuevos. **Avanzá:** con spec en borrador y tus cambios anteriores conservados.

### Paso 3 — Elaborá la spec adaptándola (BASE-05)

Usá el prompt inicial A, B o C incluido junto a tu anexo. Pegá la spec completa o indicá que está en `docs/practica-navegacion/spec.md` y pedí que la lea. La respuesta debe identificar rutas, capacidades existentes e incompatibilidades, sin escribir código.

Elegí ahora el consumidor concreto: **la entrada de navegación ya existente** o **la entrada de simulación ya existente**, según lo que el agente haya demostrado. Se recomienda el consumidor que ya acepta configuración. No se exige una UI nueva. La prueba final debe invocar ese consumidor, no solamente el algoritmo.

**Ejemplo de elaboración:** el agente encuentra que A* usa costo fijo 1. Conservás el requisito de sumar costos de entrada, registrás esa diferencia y ubicás el cambio en navegación. No aceptás «usar BFS porque ya funciona»: BFS no prueba el mínimo ponderado.

Si el contrato permite representaciones diferentes de inicio=meta, documentá cuál existe; el criterio sigue siendo éxito inequívoco y costo 0. No impongas un nuevo formato de retorno sólo para copiar el ejemplo.

Para aprobar y guardar la adaptación:

```text
Revisé la propuesta. Mi consumidor será [RUTA/SÍMBOLO CONFIRMADO].
Mi decisión humana es [DECISIÓN BREVE BASADA EN LA EXPLORACIÓN].
Autorizo actualizar únicamente la spec y los datos iniciales de evidencia.
Conservá requisitos y criterios. Completá rutas y comandos confirmados.
Si no hay conflictos pendientes de comportamiento, marcá la spec Aprobada.
Si quedan conflictos, listalos y detenete; no marques Aprobada ni implementes.
```

**Guardá:** un contraste, por ejemplo «se propuso crear costos nuevos, pero ya había una entrada configurable en X; elegí reutilizarla». Una confirmación fundada de capacidad existente también vale. **Avanzá:** sólo con spec aprobada y sin conflictos pendientes.

### Paso 4 — Línea base, comparación y otras búsquedas (BASE-01/02/03/04)

Ejecutá vos los comandos documentados, o autorizá al agente a los que hayas confirmado. En el laboratorio canónico, `npm run validate` ejecuta tipos, pruebas y build. `git status --short` y `git rev-parse HEAD` permiten registrar cambios previos y commit; no modifican el código. No registres datos privados.

Usá el fixture común, no un mapa aleatorio. Si no existe una prueba que lo represente, podés agregar el fixture y pruebas de referencia **sin modificar aún la implementación**; ese permiso es sólo para pruebas de BASE-02/04.

```text
La spec común está aprobada. Quiero completar sólo BASE-01 a BASE-04.
Autorizo [PEGAR COMANDOS CONFIRMADOS] y crear/adaptar pruebas de referencia
para el fixture común dentro de la carpeta de pruebas existente.
No cambies implementación ni empieces el anexo.
Ejecutá BFS y A* con igual mapa, S y G, y registrá resultados reales.
Verificá inicio=meta, barrera completa y extremos fuera del mapa.
Usá los campos de métricas existentes; si falta alguno, informalo sin inventarlo.
Si una prueba detecta un fallo previo, conservá reproducción y consultame.
Mostrá diff de pruebas y comandos/resultados para mi revisión.
```

**Resultado esperado:** en mapa libre, ambos dan cuatro pasos y costo 4. En barrera, no hay camino; no confundas ese resultado con extremos fuera del mapa. Guardá las salidas necesarias en evidencia.

#### Exploración guiada de DFS: leer la traza, no implementarla

Usá este grafo y orden de vecinos:

```text
S:[A,B] A:[C] C:[X] X:[G] B:[D,E] D:[G] E:[] G:[]
Costos: todos 1. DFS usa pila e inserta vecinos en orden inverso.
```

La traza DFS es `S,A,C,X,G`: ruta de cuatro pasos. BFS encuentra `S,B,D,G`: tres pasos. Explicá en dos frases por qué encontrar primero una meta no demuestra que DFS encuentre la ruta más corta. No necesitás ejecutar código DFS.

#### Exploración guiada de Dijkstra: completar costos

```text
S→A cuesta 1; A→G cuesta 9; S→B cuesta 3; B→G cuesta 3.
Extraer S=0: descubrir A=1, B=3.
Extraer A=1: descubrir G=[COMPLETAR].
Extraer B=3: mejorar G=[COMPLETAR].
Extraer entrada válida de G: ruta [COMPLETAR], costo [COMPLETAR].
```

**Autocorrección:** los valores son 10, 6, `S-B-G`, 6. Ambas rutas tienen dos acciones; BFS no distingue sus costos por contar acciones. Anotá por qué no hay que terminar al descubrir por primera vez `G`.

Prompt de apoyo opcional:

```text
Explicame las trazas DFS y Dijkstra de la guía sin generar código ni archivos.
Mostrá frontera y costos observables, no razonamientos privados.
Luego haceme una pregunta sobre pasos frente a costo y esperá mi respuesta.
```

**Avanzá:** con comparación guardada, trazas comprendidas y línea base identificada. Si un resultado previo falla, no lo escondas dentro de la variante: consultá la corrección mínima.

### Paso 5 — Ajustá el plan de tres incrementos (BASE-05/06)

La plantilla del paso 8 ya incluye tres incrementos. Sólo hay que completar rutas y comandos reales.

```text
Leé mi spec aprobada, anexo elegido y plan prearmado.
Autorizo actualizar únicamente docs/practica-navegacion/plan.md.
Completá los tres incrementos con archivos reales, IDs de criterios y
comandos confirmados. Reutilizá lo existente; no agregues requisitos.
Separá dominio/pruebas de la conexión con el consumidor y del cierre.
Señalá riesgos y detenciones. No implementes todavía.
```

**Revisá:** cada incremento tiene prueba y criterio; no agrega una segunda variante, UI ni refactorización de FSM. **Elegís:** aceptar el plan o corregir un archivo/alcance justificado. Cambiá su estado a Aprobado cuando lo revises. **Avanzá:** con plan de tres incrementos aprobado.

### Paso 6 — Implementá un incremento por vez (BASE-06)

Usá este prompt para el incremento 1; repetilo cambiando el número para los demás:

```text
La spec y el plan de docs/practica-navegacion/ están aprobados.
Autorizo sólo el incremento [NÚMERO] y los archivos previstos en él.
No hagas el siguiente incremento. Preservá cambios anteriores.
Implementá la mínima modificación que satisface sus requisitos y agregá las
pruebas indicadas. Usá fixture fijo y resultados esperados de la spec.
Ejecutá la comprobación enfocada autorizada, mostrá resultado y diff.
Si necesitás más archivos, dependencias o cambiar el contrato, consultame.
No crees commits ni publiques. Terminá indicando criterio demostrado y límite.
```

**Esperá:** código y prueba pequeños, no una reescritura. **Revisá:** la suma de costos o la invalidación se aplica donde corresponde; el consumidor realmente utiliza la mejora. Ejecutá o inspeccioná personalmente al menos una comprobación. **Guardá:** comando, resultado y tu decisión en evidencia. **Avanzá:** sólo si el incremento cumple sus criterios y no deja fallos sin explicar.

En A/B, revisá también el **costo informado en el resultado**: no alcanza cambiar la prioridad de búsqueda si `totalCost` sigue contando pasos. Un rodeo de seis pasos y costo 6 parece correcto en ambas medidas; la ruta directa de cuatro pasos y costo 16 permite detectar esa confusión. No cambies el contrato unitario de BFS para esconderla.

Si ya existía la capacidad, no dupliques código: completá su configuración, integración o evidencia. El aprendizaje es verificar un contrato, no producir una cantidad mínima de líneas.

### Paso 7 — Verificá contrato y regresiones (BASE-07)

```text
Verificá mi spec común y único anexo, sin ampliar el alcance.
Autorizo las pruebas y validación ya confirmadas en el plan.
Devolvé una tabla criterio → prueba/comando → resultado observado → limitación.
Incluí caso normal, límite y prueba del consumidor real.
Revisá el diff contra mi estado inicial; diferenciá cambios previos y actuales.
Si falla algo, reproducilo y proponé una corrección mínima; no cambies criterios
ni corrijas fuera del alcance sin autorización.
No des por aprobado un criterio basándote en tu propia afirmación.
```

**Esperá:** resultados reales. `A-AC1` y `B-AC1` se comprueban sumando costos y validando ruta, no exigiendo rodeo superior exacto. En C, el conteo se realiza con un doble de prueba o contador local a la prueba, no agregando un panel de telemetría al juego.

Para la conexión con el consumidor alcanza una prueba de integración reproducible que invoque la entrada real de navegación/simulación. Una captura puede complementar, pero no reemplaza esa comprobación. No se exige video ni editor para representar el fixture.

**Guardá:** salida resumida, prueba identificada, matriz y limitaciones. **Avanzá:** con criterios satisfechos, validación final y diff revisado. Si hay una limitación pendiente, identificá el criterio que no se demostró; no marques la práctica completa.

### Paso 8 — Cerrá la entrega única (BASE-08)

Usá estas plantillas. Mantenelas breves: spec común más anexo; plan de tres incrementos; evidencia con tablas y conclusiones cortas. No agregues auditoría, informe o transcripción aparte.

#### `plan.md`: copiar y completar

```markdown
# Plan — práctica de navegación
Estado: Borrador / Aprobado
Variante: [A/B/C]
Spec: spec.md

| Incremento | Trabajo | Archivos reales | Criterios | Comprobación |
|---|---|---|---|---|
| 1 | Configurar/ajustar dominio y probar caso normal/límite de mi variante | [RUTAS] | [AC DEL ANEXO] | [COMANDO] |
| 2 | Conectar con consumidor existente y probar contrato anterior | [RUTAS] | [AC DE CONSUMIDOR], BASE-AC5 | [COMANDO] |
| 3 | Validación final, diff y cierre de evidencia | [RUTAS] | BASE-AC1 a BASE-AC6 | [COMANDO] |

Referencia previa: comparación y casos comunes BASE-01 a BASE-04 completados.
Riesgos: [UNO O DOS RIESGOS CONCRETOS DEL CAMBIO].
Detenerse si: faltan permisos, hay cambios ajenos, conflicto de contrato,
regresión nueva o se requiere dependencia/UI/refactorización fuera del alcance.
No crear commits ni publicar automáticamente.
```

#### `evidencia.md`: copiar y completar

```markdown
# Evidencia — práctica de navegación
Repositorio: [URL]
Commit inicial: [HASH]
Commit de implementación: [HASH CONOCIDO O VER COMMIT INFORMADO EN LA ENTREGA]
Versión de entrega: commit final informado por el estudiante en la plataforma.
Variante: [A/B/C]
Herramienta/modelo o trabajo manual: [DATO DISPONIBLE]
Cambios previos: [RESUMEN O NINGUNO]
Línea base: [COMANDO, RESULTADO Y FALLOS PREVIOS SI EXISTEN]

## Exploración mínima
| Capa | Ruta/símbolo | Capacidad comprobada |
|---|---|---|
| Búsqueda | [RUTA] | [HECHO] |
| Seguimiento | [RUTA] | [HECHO] |
| Consumidor | [RUTA] | [HECHO] |
| Pruebas | [RUTA] | [HECHO] |

Contraste y decisión humana: [AFIRMACIÓN COMPROBADA Y QUÉ DECIDÍ].
Spec/plan aprobados: [MOMENTO O PASO; AJUSTE SI HUBO].

## Comparación común — fixture libre 5x3
Vecinos y desempate reales: [REGLAS].
| Algoritmo | Estado | Ruta | Pasos | Costo | Expandidos | Frontera máxima |
|---|---|---|---:|---:|---|---|
| BFS | [DATO] | [DATO] | [DATO] | [DATO] | [DATO O NO DISPONIBLE] | [DATO O NO DISPONIBLE] |
| A* | [DATO] | [DATO] | [DATO] | [DATO] | [DATO O NO DISPONIBLE] | [DATO O NO DISPONIBLE] |
DFS: [DOS FRASES SOBRE SU TRAZA Y LÍMITE].
Dijkstra: [COSTOS COMPLETADOS, RUTA Y CONCLUSIÓN].

## Criterio → evidencia
| Criterio | Prueba/archivo y comando o reproducción | Observado | Cumple/pendiente |
|---|---|---|---|
| BASE-AC1 | [REFERENCIA] | [RESULTADO] | [ESTADO] |
| BASE-AC2 | [REFERENCIA] | [RESULTADO] | [ESTADO] |
| BASE-AC3 | [INICIO=META, BARRERA Y EXTREMOS] | [RESULTADOS] | [ESTADO] |
| BASE-AC4 | [SPEC, PLAN Y DECISIÓN] | [RESULTADO] | [ESTADO] |
| [A/B/C]-AC1 | [REFERENCIA] | [RESULTADO] | [ESTADO] |
| [A/B/C]-AC2 | [REFERENCIA] | [RESULTADO] | [ESTADO] |
| [A/B/C]-AC3 | [PRUEBA DEL CONSUMIDOR] | [RESULTADO] | [ESTADO] |
| BASE-AC5 | [VALIDACIÓN Y DIFF] | [RESULTADO] | [ESTADO] |
| BASE-AC6 | [URL, VERSIÓN Y TRES DOCUMENTOS] | [RESULTADO] | [ESTADO] |

## Registro mínimo de intervención
Prompts: [PASOS/VARIANTE DE ESTA GUÍA USADOS Y CAMBIOS RELEVANTES].
Decisión tras incremento 1: [ACEPTAR/CORREGIR Y MOTIVO].
Decisión tras incremento 2: [ACEPTAR/CORREGIR Y MOTIVO].
Validación final: [COMANDO Y RESULTADO REAL].
Diff revisado: [ARCHIVOS Y ALCANCE].
Conclusión: [QUÉ NAVEGACIÓN CONVIENE EN ESTE CASO Y POR QUÉ, 3-5 FRASES].
Limitaciones: [CONCRETAS O NINGUNA CONOCIDA].
```

Prompt de cierre:

```text
Autorizo completar sólo los tres documentos de docs/practica-navegacion/
con la evidencia real ya obtenida. No inventes métricas ni éxito de pruebas.
Conservá una sola variante y explicá limitaciones. Referenciá los prompts por
paso de la guía; copiá sólo modificaciones importantes, no todo el chat.
Revisá que cada criterio tenga evidencia y que no queden campos sin completar.
Informame qué falta para entregar. No crees commits ni publiques.
```

### Entregable y versión

Entregá el **14/10/2026, en la clase próxima**, por el canal que indique la cátedra:

1. URL del repositorio individual.
2. Hash del commit final de código, pruebas y documentación de la práctica.
3. Carpeta `docs/practica-navegacion/` con los tres archivos completos.

Vos revisás y creás el commit final; el agente no lo hace sin autorización. Para no intentar escribir dentro de un commit su propio hash, `evidencia.md` puede señalar el commit de implementación ya conocido y registrar «versión de entrega: commit informado en la plataforma». El hash entregado debe contener los tres documentos y todo el código/pruebas referenciado. No dejar cambios requeridos sólo en tu carpeta local.

## Evidencia válida y criterios de evaluación

Se valora: spec adaptada conscientemente, comparación correcta, una variante que satisface sus criterios, pruebas del caso normal/límite y consumidor, preservación del contrato anterior y explicación de la decisión.

Sirven comandos con resultado, rutas de pruebas, costos comprobados y reproducción sobre el fixture. No alcanzan «el agente dijo que anda», una captura aislada ni un build sin prueba del comportamiento. Una traza conceptual DFS/Dijkstra se declara conceptual; no se presenta como ejecución del proyecto.

Lista final:

- [ ] Copié la base y un único anexo; completé campos y revisé decisiones.
- [ ] Registré comparación BFS/A* y expliqué las trazas DFS/Dijkstra.
- [ ] Comprobé casos comunes y los tres criterios de mi variante.
- [ ] Existe una prueba del consumidor y no sólo del algoritmo aislado.
- [ ] Ejecuté validación, revisé diff y preservé trabajo previo.
- [ ] Entrego tres documentos, URL y commit identificable el 14/10.

## Alternativa sin modelos pagos

Podés usar un agente gratuito disponible o realizar los mismos pasos manualmente. Los prompts se convierten en listas de verificación: localizar rutas, adaptar spec, completar plan y ejecutar pruebas. Los mapas, resultados esperados y trazas ya están provistos. No se exige suscripción ni comparación entre modelos. Si necesitás apoyo técnico, llevá a consulta el criterio, la reproducción y el error concreto; conservá el mismo entregable.

## Solución y continuidad

Los resultados conocidos de los fixtures son parte de la guía para permitir autocorrección. No se publica una implementación única para copiar sin revisión: cada repositorio puede tener contratos diferentes. La puesta en común del 14/10 recuperará la decisión de navegación antes de trabajar patrones de comportamiento.
