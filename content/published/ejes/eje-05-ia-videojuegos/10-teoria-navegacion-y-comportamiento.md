---
id: eje-05-teoria-navegacion-comportamiento
titulo: "IA para videojuegos: navegación y toma de decisiones"
eje: 5
orden: 10
tipo: lectura
nivel: obligatorio
audiencia: estudiante
clases: [9, 10]
modalidad: mixta
duracion_minutos: 80
resultados: [RA7, RA8, RA11]
prerrequisitos: []
evaluable: true
acceso: publico
version: 1
disponible_desde: "2026-10-07"
---

# IA para videojuegos: navegación y toma de decisiones

**Apunte teórico integrado — clases del 7 y 14 de octubre de 2026.**

## Propósito y recorrido

Este documento reúne las dos clases del Eje 5. La primera parte explica cómo representar un problema de navegación, buscar una ruta y convertirla en movimiento. La segunda explica cómo elegir qué hacer mediante patrones de comportamiento. El caso conductor es un guardia en un juego de sigilo.

| Clase | Lectura | Pregunta principal |
|---|---|---|
| 9 — 7/10, virtual asincrónica | Parte I, secciones 1 a 9 | ¿Cómo puede llegar el guardia a un destino válido? |
| 10 — 14/10, presencial | Parte II, secciones 10 a 16 | ¿Por qué el guardia decide ir a ese destino? |

La duración es una estimación de lectura de ambas partes, no de las clases. Los ejemplos explican mecanismos; no son consignas de entrega. La actividad correspondiente está en la [práctica guiada de navegación](11-practica-guiada-navegacion.md).

## Por qué importa: dos problemas diferentes

Un guardia puede encontrar la mejor ruta hacia el jugador y, sin embargo, ser un enemigo injusto: quizá conoce una posición que nunca pudo observar. También puede elegir correctamente investigar un ruido y quedarse trabado porque sigue mal los puntos de la ruta.

Por eso no alcanza con decir «la IA falla». Hay que identificar qué información recibió, qué decisión tomó, qué ruta calculó y qué movimiento ejecutó. La arquitectura por capas permite explicar y corregir cada problema sin reescribir todo el personaje.

El **agente de desarrollo** trabaja sobre archivos, herramientas y pruebas durante la producción. El **agente del videojuego** percibe un mundo simulado y actúa durante la partida. Usar OpenCode para escribir A* no significa que el guardia consulte un modelo de lenguaje mientras juega.

---

# Parte I — Clase del 7/10: búsqueda y navegación

## 1. Formular el problema antes de elegir el algoritmo

Buscar consiste en encontrar una secuencia de acciones que transforme una situación inicial en otra que cumpla un objetivo. Para definir el problema hacen falta:

| Elemento | Qué representa | Ejemplo del guardia |
|---|---|---|
| Estado | Información relevante para decidir acciones futuras | Celda actual; además, posesión de llave si afecta el recorrido |
| Inicio | Estado desde el cual se busca | Guardia en `(0,1)` |
| Acción | Cambio permitido | Avanzar una celda hacia el norte |
| Objetivo | Condición que debe satisfacerse | Llegar a `(4,1)` |
| Restricción | Acción o estado no permitido | No atravesar una pared |
| Costo | Magnitud que se quiere minimizar | Pasos, tiempo, exposición o ruido |

La representación determina qué puede resolver la búsqueda. Si para abrir una puerta hace falta una llave, dos personajes en la misma posición pero con distinto inventario no tienen necesariamente las mismas acciones disponibles. El estado puede necesitar ser `(posición, tieneLlave)`.

**Una restricción no es un costo muy alto.** Una pared no debe volverse transitable porque el algoritmo no encontró una alternativa barata. En cambio, una superficie ruidosa puede ser transitable pero poco conveniente.

Tampoco «mejor ruta» tiene un significado único. La más corta puede cruzar una zona visible; la más segura puede tardar más. Primero se define la intención y después el costo que la representa.

## 2. Representar el espacio mediante un grafo

Un **grafo** contiene nodos y aristas. Los nodos representan estados o lugares; las aristas, acciones permitidas. Una arista puede tener dirección y costo. Si saltar hacia abajo está permitido pero volver a subir no, la conexión es dirigida.

### Cuadrícula

Divide el espacio en celdas. Una celda libre puede conectarse con cuatro vecinos cardinales o con ocho si se permiten diagonales. Es simple de inspeccionar y probar, pero la resolución afecta memoria, precisión y tamaño del personaje.

Si se permiten diagonales, hay que definir su costo y si se puede pasar entre dos obstáculos que se tocan en una esquina. Cambiar vecinos sin cambiar esas reglas modifica el problema.

### Red de puntos de navegación

Los nodos son lugares importantes: puertas, intersecciones, coberturas. Las conexiones indican recorridos válidos. Puede reducir el tamaño del grafo, pero obliga a preparar enlaces y comprobar que el personaje realmente puede atravesarlos.

### Malla de navegación (*navmesh*)

Representa superficies transitables mediante polígonos conectados. La búsqueda encuentra un recorrido entre regiones; después otro procedimiento obtiene una trayectoria dentro de ese corredor. Es apropiada para espacios continuos, pero no elimina la necesidad de costos, radios, enlaces especiales ni seguimiento.

| Representación | Ventaja típica | Límite típico |
|---|---|---|
| Cuadrícula | Datos y casos fáciles de construir | Muchas celdas; apariencia escalonada |
| Puntos | Grafo reducido y control autoral | Conexiones incompletas o mal preparadas |
| Navmesh | Ajuste a superficies continuas | Construcción, radios y cambios dinámicos |

**A* no es una representación:** es una búsqueda que puede operar sobre distintos grafos. Elegir navmesh no equivale a reemplazar A* por un algoritmo necesariamente diferente.

## 3. Frontera, visitados y reconstrucción

La **frontera** guarda estados descubiertos que todavía deben procesarse. Un registro de visitados o mejores costos evita recorridos repetidos. Un mapa de predecesores recuerda desde dónde se llegó a cada estado para reconstruir la ruta.

Consideremos este grafo dirigido con costos unitarios y vecinos en el orden indicado:

```text
S → A → C → X → G
└ → B → D → G
      └ → E

S:[A,B]  A:[C]  C:[X]  X:[G]  B:[D,E]  D:[G]  E:[]  G:[]
```

Hay dos caminos hacia `G`: uno tiene cuatro acciones y otro tres. El algoritmo determina en qué orden se exploran las posibilidades.

### BFS: búsqueda en anchura

Usa una cola FIFO: sale primero lo que entró primero. Explora todos los estados a una acción de distancia, después los de dos acciones, y así sucesivamente.

| Extraído | Frontera después de expandir |
|---|---|
| S | A, B |
| A | B, C |
| B | C, D, E |
| C | D, E, X |
| D | E, X, G |
| E | X, G |
| X | G; no vuelve a insertar G ya descubierto |
| G | Objetivo encontrado |

La ruta reconstruida es `S-B-D-G`: tres acciones. BFS encuentra un camino con el menor número de acciones cuando los costos son iguales. Si una acción cuesta diez y otra uno, minimizar acciones ya no significa minimizar costo.

### DFS: búsqueda en profundidad

Usa una pila LIFO: sale lo último que entró. Para visitar `A` antes de `B`, se insertan los vecinos en orden inverso. Sigue una rama antes de volver a las alternativas.

```text
Extracciones: S → A → C → X → G
Ruta: S-A-C-X-G, cuatro acciones.
```

DFS encontró una solución, pero no la más corta. En un grafo finito, con registro de visitados y sin restricciones de presupuesto, puede recorrer todo lo alcanzable. En espacios infinitos o sin manejo de ciclos puede no terminar.

El orden de vecinos influye en las trazas. Comparar resultados sin fijarlo puede atribuir al algoritmo diferencias que provienen del desempate.

## 4. Dijkstra: buscar por costo acumulado

Dijkstra, o búsqueda de costo uniforme en este contexto, extrae el estado con menor costo conocido `g`. Con pesos no negativos, la primera extracción válida de la meta tiene costo mínimo. En nuestros ejemplos los costos serán estrictamente positivos.

```text
S → A: 1     A → G: 9
S → B: 3     B → G: 3
```

Ambas rutas tienen dos acciones. Sus costos son diferentes:

- `S-A-G`: `1+9=10`.
- `S-B-G`: `3+3=6`.

Dijkstra procesa `S` con costo 0; descubre `A=1` y `B=3`. Extrae `A` y descubre `G=10`. Luego extrae `B` y mejora `G` a 6. Finalmente extrae la entrada válida de `G=6`.

**Descubrir la meta no implica que ya se haya encontrado su costo óptimo.** Puede quedar una ruta mejor pendiente en la frontera. Una entrada vieja de costo 10 debe descartarse si ya existe una mejor de costo 6.

## 5. A*: orientar la búsqueda con una heurística

A* combina el costo recorrido y una estimación del costo restante:

```text
f(n) = g(n) + h(n)
```

- `g(n)`: costo real acumulado desde el inicio.
- `h(n)`: estimación hasta el objetivo.
- `f(n)`: prioridad de la frontera.

Con `h=0`, A* se comporta como búsqueda de costo uniforme. La heurística ayuda a dirigir la exploración, pero debe ser adecuada al grafo.

### Manhattan: ejemplo numérico

En una cuadrícula de cuatro vecinos, con costo mínimo de paso 1:

```text
h(x,y) = |x-metaX| + |y-metaY|
```

Desde `(0,1)` hacia `(4,1)`, la estimación es 4. Si no hay obstáculos, la ruta directa cuesta 4:

| Nodo | g | h | f |
|---|---:|---:|---:|
| (0,1) | 0 | 4 | 4 |
| (1,1) | 1 | 3 | 4 |
| (2,1) | 2 | 2 | 4 |
| (3,1) | 3 | 1 | 4 |
| (4,1) | 4 | 0 | 4 |

Hay empates; debe fijarse una regla, por ejemplo menor `h` y luego orden de inserción. El resultado reproducible depende también de esa regla.

### Admisibilidad y consistencia

Una heurística es **admisible** si nunca sobreestima el costo óptimo restante. Es **consistente** si, para cada conexión:

```text
h(n) <= costo(n,n') + h(n')
```

Manhattan es adecuada para cuatro vecinos y pasos de costo al menos 1. Con diagonales baratas o teletransportes puede dejar de ser admisible. Con costos mínimos distintos puede escalarse por una cota inferior válida, no por un promedio arbitrario.

Con heurística consistente, una implementación estándar puede cerrar nodos sin reabrirlos. Con una heurística admisible pero inconsistente se necesita permitir mejoras y reaperturas. La garantía no depende sólo de escribir `g+h`: también depende del manejo correcto de la frontera y del momento de terminar.

### Esquema de una búsqueda correcta

```text
mejorCosto[inicio] = 0
insertar inicio con g=0 y f=h(inicio)
mientras haya frontera:
    extraer entrada con menor f
    descartar si su g quedó obsoleto
    si es objetivo: reconstruir y terminar
    para cada vecino permitido:
        candidato = g actual + costo de la acción
        si mejora el costo conocido:
            actualizar costo y predecesor
            insertar una nueva entrada con f=candidato+h(vecino)
si se agota la frontera: informar inaccesible
```

Si existe un presupuesto de expansiones, agotarlo debe producir un resultado distinto de «inaccesible»: no se completó la exploración necesaria para probarlo.

## 6. Menos pasos no siempre significa mejor recorrido

Ejemplo de terreno lento: cuadrícula libre de 5 columnas y 3 filas. Inicio `(0,1)`, meta `(4,1)`. Entrar en `(1,1)`, `(2,1)` o `(3,1)` cuesta 5; entrar en cualquier otra celda cuesta 1. El inicio no añade costo.

```text
y=0   . . . . .
y=1   S L L L G
y=2   . . . . .
      0 1 2 3 4  ← x
```

La ruta directa tiene cuatro pasos, pero cuesta `5+5+5+1=16`. Rodear por arriba o por abajo tiene seis pasos y cuesta 6. BFS minimiza pasos y puede devolver la directa; una búsqueda ponderada correcta prefiere el rodeo.

Si `L` significa exposición, la misma estructura expresa una preferencia por cobertura, pero **el costo 5 no es una probabilidad de detección**. Es una penalización de diseño. Si significa ruido, tampoco equivale automáticamente a decibeles. Las unidades y la intención deben estar documentadas.

| Algoritmo | Orden de selección | Qué optimiza | Límite relevante |
|---|---|---|---|
| BFS | FIFO | Acciones, con costos iguales | No minimiza pesos distintos |
| DFS | LIFO | No garantiza un mínimo | Depende mucho de las ramas |
| Dijkstra | Menor g | Costo con pesos no negativos | Puede expandir muchas alternativas |
| A* | Menor g+h | Costo bajo condiciones adecuadas | Depende de heurística e implementación |

Medir nodos expandidos, costo, frontera máxima y tiempo permite comparar. Una ejecución aislada no demuestra que A* siempre sea más rápido. El costo de la heurística y de la estructura de prioridad también influye.

## 7. Una ruta no mueve al personaje

Una búsqueda devuelve puntos. El **seguimiento de caminos** transforma esa lista en el siguiente objetivo de movimiento. Los **comportamientos de movimiento** (*steering*) producen una velocidad o aceleración deseada. La **locomoción** aplica desplazamiento, límites, colisiones y animación.

```text
ruta: [(0,1),(1,1),(2,1)]
seguimiento: próximo punto = (1,1)
steering: velocidad deseada hacia ese punto
locomoción: desplazamiento posible con las colisiones actuales
```

### Comportamientos básicos

- **Buscar (*seek*):** dirigir el movimiento hacia un objetivo. No incluye necesariamente frenado.
- **Llegar (*arrive*):** reducir velocidad al acercarse para evitar sobrepasar el destino.
- **Huir (*flee*):** alejarse de una amenaza.
- **Separación:** evitar que varios personajes se amontonen.
- **Evasión local:** corregir la dirección frente a un obstáculo cercano.

No corresponde confundir `seek` con BFS: uno produce movimiento local y el otro busca en un grafo. La evasión local tampoco garantiza encontrar una salida de un laberinto.

El seguimiento debe tolerar posiciones continuas y consumir varios puntos si el desplazamiento permitido lo alcanza. Exigir igualdad exacta puede producir oscilaciones. Avanzar siempre un punto por cuadro hace que el resultado dependa de la tasa de cuadros.

Suavizar una ruta puede mejorar su apariencia, pero cada atajo debe seguir siendo transitable para el radio del personaje. Un segmento recto que atraviesa una pared no es una mejora válida.

## 8. Percepción, memoria y mundo dinámico

La posición real del jugador y la última posición observada no son lo mismo. La visión puede evaluar alcance, ángulo y oclusión; el sonido puede aportar origen, radio y vigencia. La memoria registra información obtenida por esos sensores.

```text
t=0: jugador oculto; guardia no conoce su posición
t=1: oye un sonido en (4,1); recuerda ese origen
t=2: ve al jugador en (4,2); actualiza la última posición
t=3: pierde visión; conserva (4,2), no la posición real posterior
```

Si el guardia sigue la posición actual detrás de una pared sin percepción válida, el problema es de información, no de A*.

Una ruta también envejece. Si se cierra una puerta, la búsqueda anterior puede haber sido correcta y la ejecución actual resultar imposible. Conviene invalidar ante cambios relevantes y replanificar, no recalcular todo cada cuadro.

Si el bloqueo no deja ninguna salida, se informa un resultado explícito y se define una recuperación. «Esperar» puede ser una recuperación legítima; conservar movimiento hacia una pared sin límite no lo es.

## 9. Diagnosticar navegación por capas

| Síntoma | Primera capa a investigar | Evidencia útil |
|---|---|---|
| Ruta atraviesa una pared | Grafo y búsqueda | Vecinos, celdas bloqueadas, ruta |
| Ruta válida, personaje no avanza | Seguimiento y locomoción | Punto activo, posición y colisión |
| Vibra al llegar | Seguimiento/arrive | Radio de llegada y avance temporal |
| Recalcula continuamente | Política de invalidación | Motivo y frecuencia de solicitudes |
| Sigue al jugador oculto | Percepción/memoria | Observación válida y marca temporal |
| Ruta corta pero muy peligrosa | Modelo de costos | Costo por tramo y objetivo de diseño |

El diagnóstico empieza por una reproducción y una hipótesis comprobable. Pedirle al agente «arreglá la IA» sin identificar la capa favorece cambios innecesarios.

---

# Parte II — Clase del 14/10: patrones de comportamiento

## 10. Elegir una conducta antes de buscar una ruta

La navegación responde cómo alcanzar un destino. La arquitectura de comportamiento decide qué destino o acción interesa ahora: patrullar, investigar, perseguir, buscar o regresar.

```text
mundo → percepción → memoria → decisión → búsqueda de ruta
      → seguimiento → steering → locomoción → mundo
```

Una decisión puede solicitar una ruta, pero no debería calcular colisiones dentro de la tabla de estados. A su vez, la búsqueda no debería elegir cuándo perseguir. Las técnicas siguientes organizan la capa de decisión de maneras diferentes.

## 11. Máquinas de estados finitos: modos y transiciones explícitos

Una **máquina de estados finitos (FSM)** conserva un modo activo y cambia según eventos y condiciones.

- **Estado:** conducta persistente, como `Investigar`.
- **Evento:** hecho ocurrido, como `SonidoOído(p)`.
- **Guarda:** condición que habilita una transición.
- **Transición:** cambio de origen a destino.
- **Acción:** efecto de entrada, salida o actualización.
- **Invariante:** regla que debe cumplirse siempre.

### Ejemplo del guardia

| Origen | Evento | Guarda | Destino | Acción |
|---|---|---|---|---|
| Cualquier estado activo | JugadorVisto(p) | Percepción válida | Perseguir | Recordar p; solicitar ruta si corresponde |
| Patrullar | SonidoOído(p) | Sin visión del jugador | Investigar | Registrar origen y navegar |
| Perseguir | VisiónPerdida | Hay última posición conocida | Investigar | Ir a esa posición |
| Investigar | DestinoAlcanzado | Sin visión del jugador | Buscar | Iniciar tiempo de búsqueda |
| Buscar | TiempoAgotado | Sin nueva observación | Regresar | Seleccionar punto de patrulla |
| Regresar | PatrullaAlcanzada | Punto válido | Patrullar | Continuar circuito |

La tabla es un modelo explicativo, no afirma que cada copia del laboratorio tenga exactamente esas APIs. Toda implementación debe establecer también qué ocurre ante destino inaccesible, eventos simultáneos y reinicio.

### Traza explicada

```text
Patrullar + sonido válido → Investigar
Investigar + visión válida → Perseguir
Perseguir + sonido mientras ve al jugador → conserva Perseguir
Perseguir + pérdida de visión → Investigar última posición
Investigar + llegada → Buscar
Buscar + tiempo agotado → Regresar
Regresar + llegada a patrulla → Patrullar
```

Visión tiene prioridad sobre sonido. Esa prioridad debe ser explícita, no depender del orden accidental en que se llamaron funciones.

Una observación visual repetida no tiene por qué reiniciar la entrada a `Perseguir`: puede actualizar datos sin duplicar rutas o temporizadores. La política de reentrada forma parte del contrato.

Ejemplos de invariantes: sólo un modo principal activo; la última posición cambia por observación válida; un personaje deshabilitado no avanza; los temporizadores son finitos. Probar sólo que se alcanzó cada estado no basta: también importan guardas falsas, repetición, límites de tiempo y secuencias completas.

### HFSM: compartir reglas mediante jerarquía

Una FSM jerárquica agrupa modos relacionados:

```text
Activo
├── Patrullar
├── Investigar
├── Perseguir
├── Buscar
└── Regresar
Incapacitado
├── Aturdido
└── Deshabilitado
```

Una transición por daño fatal puede definirse para `Activo` en lugar de repetirse en todos sus hijos. La jerarquía reduce duplicación, pero requiere reglas de prioridad entre hijo y padre. No conviene agregar niveles si cinco estados planos ya expresan el problema con claridad.

## 12. Árboles de comportamiento: composición y prioridad

Un **árbol de comportamiento (BT)** organiza tareas jerárquicas. En cada actualización, o *tick*, los nodos devuelven:

- `Éxito`: completaron su propósito.
- `Fallo`: no corresponde o no pudieron completarlo.
- `EnCurso`: deben continuar en otra actualización.

`MoverA` devuelve `EnCurso` mientras avanza, no `Éxito`. Si ese resultado se confunde con un booleano, puede ejecutarse la siguiente tarea antes de llegar.

### Nodos y ejemplo

Una **secuencia** ejecuta hijos en orden y se detiene ante fallo o ejecución en curso. Un **selector** prueba alternativas y toma la primera que tiene éxito o queda en curso. Una condición consulta; una acción actúa; un decorador limita o transforma la ejecución.

```text
Selector reactivo de prioridad
├── Secuencia: ¿ve jugador? → Perseguir
├── Secuencia: ¿sonido vigente? → Investigar
└── Patrullar
```

En un tick sin visión pero con sonido, investigar queda en curso. En el siguiente, si aparece visión, el selector reactivo vuelve a evaluar la rama superior y puede interrumpir la investigación.

```text
tick 40: visión falla; sonido tiene éxito; Investigar queda EnCurso
tick 41: visión tiene éxito; abortar Investigar; Perseguir queda EnCurso
```

La interrupción debe cancelar los recursos de la acción abandonada. Dejar su ruta activa permite que dos tareas intenten mover al mismo guardia.

Un selector **con memoria** puede continuar la rama anterior sin revisar inmediatamente las prioridades superiores. Ninguna variante es universalmente mejor; importa declarar qué reactividad requiere el diseño.

Un **pizarrón (blackboard)** guarda datos compartidos del personaje: destino, memoria o resultado de ruta. Su esquema y responsables deben ser claros. Dos guardias pueden compartir la definición del árbol, pero no los temporizadores ni rutas mutables de ejecución.

Los BT resultan útiles para componer tareas reutilizables. Un árbol enorme con condiciones que modifican datos ocultamente puede ser tan difícil de depurar como una FSM desordenada.

## 13. Utility AI: elegir por conveniencia gradual

Los **sistemas de utilidad** puntúan alternativas según la situación. Son apropiados cuando las preferencias dependen de magnitudes continuas, como salud, peligro, hambre o distancia.

El proceso es: definir acciones posibles, medir consideraciones, normalizar, aplicar curvas, combinar puntuaciones, filtrar acciones imposibles y seleccionar con una política explícita.

### Ejemplo numérico

Entradas normalizadas entre 0 y 1:

```text
veJugador=1; cercanía=0,70; recuerdoSonido=0,50
peligro=0,80; saludBaja=0,75
```

| Acción | Fórmula de ejemplo | Resultado |
|---|---|---:|
| Perseguir | veJugador × (0,7×cercanía + 0,3×(1−peligro)) | 0,55 |
| Investigar | recuerdoSonido × (1−peligro) | 0,10 |
| Cubrirse | peligro × saludBaja | 0,60 |

Con selección del máximo gana `Cubrirse`. Esto expresa una intención de diseño: priorizar protección ante peligro y mala salud. No representa una probabilidad ni demuestra que el personaje sea «más inteligente».

### Curvas y estabilidad

Normalizar una distancia máxima de 20 metros puede dar `cercanía=1−limitar(distancia/20,0,1)`. Una curva cuadrática exige valores más altos que una lineal; un escalón crea un umbral. Las unidades y rangos deben estar definidos antes de combinar.

Una suma permite compensación: mucha cercanía podría compensar poca munición. Si disparar sin munición es imposible, debe filtrarse como precondición, no esconderse en una puntuación baja.

Si dos opciones puntúan 0,60 y 0,61 y fluctúan cada cuadro, el personaje puede alternar sin completar nada. Una **histéresis** puede exigir que la nueva opción supere a la actual por un margen; un compromiso puede mantenerla hasta un punto interrumpible. También deben existir regla de empate y acción de reserva.

La telemetría debe mostrar entradas y puntuaciones, no sólo la acción ganadora. Las curvas mal ajustadas pueden producir una alternativa dominante incluso cuando todas las operaciones matemáticas sean correctas.

## 14. GOAP: construir una secuencia para satisfacer un objetivo

La **planificación orientada a objetivos (GOAP)** busca planes a partir de hechos, acciones y costos. No se limita a elegir una acción inmediata: combina acciones para alcanzar una condición.

Cada acción declara **precondiciones**, **efectos** y **costo**. Su ejecución física es un procedimiento separado.

### Ejemplo: entrar en una sala cerrada

Situación inicial: el personaje conoce la llave y la puerta, no está junto a ellas, no tiene llave, la puerta está cerrada y está fuera de la sala.

| Acción | Precondición relevante | Efecto relevante | Costo |
|---|---|---|---:|
| Ir a la llave | Conoce su ubicación | Está junto a la llave; deja de estar junto a la puerta | 1 |
| Tomar llave | Está junto a la llave | Tiene llave | 2 |
| Ir a la puerta | Conoce su ubicación | Está junto a la puerta; deja de estar junto a la llave | 2 |
| Abrir puerta | Junto a puerta, tiene llave | Puerta abierta | 1 |
| Forzar puerta | Junto a puerta, tiene palanca | Puerta abierta y ruido producido | 3 |
| Entrar | Junto a puerta, puerta abierta | Está dentro de la sala | 1 |

Objetivo: `dentroDeSala=true`.

```text
Sin palanca:
IrLlave → TomarLlave → IrPuerta → Abrir → Entrar
Costo: 1+2+2+1+1 = 7

Con palanca y sin penalización adicional por ruido:
IrPuerta → Forzar → Entrar
Costo: 2+3+1 = 6
```

Si hacer ruido contradice el sigilo, la restricción o penalización debe estar en el modelo. El planificador no puede respetar una intención que no fue representada.

GOAP busca en un grafo de estados simbólicos. A* puede emplearse allí también: sus nodos no tienen por qué ser celdas. Eso no convierte el plan simbólico en una trayectoria física.

### Planificar no equivale a ejecutar

`IrPuerta` debe solicitar navegación y puede fallar. Si una caja bloquea el acceso, no se aplican mágicamente los efectos de llegada. Se actualiza la información observada y se invalida el plan.

Antes de cada acción se revisan precondiciones; al completarla se verifican efectos. Si el objetivo ya se cumple, un plan vacío es éxito. Si se agotó un presupuesto, no se demostró que no existe plan.

GOAP aporta flexibilidad cuando hay varias secuencias recombinables. Para cinco conductas fijas puede añadir búsqueda, sincronización y depuración sin mejorar la experiencia.

## 15. Elegir la técnica según la intención de diseño

| Técnica | Pregunta que organiza | Ejemplo apropiado | Evidencia para explicar la elección |
|---|---|---|---|
| FSM/HFSM | ¿En qué modo estoy y cuándo cambio? | Guardia de modos claros; jefe por fases | Estado, evento, guarda, transición |
| BT | ¿Qué tarea prioritaria puedo ejecutar? | Soldado con secuencias reutilizables | Nodos visitados, resultados, abortos |
| Utility AI | ¿Qué alternativa conviene más ahora? | Habitante con necesidades graduales | Consideraciones, curvas, puntuaciones |
| GOAP | ¿Qué secuencia satisface este objetivo? | Conseguir recursos por varias vías | Hechos, acciones, costos, plan y fallos |

Ninguna técnica reemplaza automáticamente a la navegación. Una FSM puede solicitar A*; un BT puede ejecutar el seguimiento; Utility AI puede elegir un destino; GOAP puede incluir una acción de desplazamiento.

Las combinaciones son posibles, pero cada frontera exige contratos. No corresponde combinar las cuatro técnicas para demostrar que se conocen. Se elige la solución más sencilla que expresa la experiencia y permite verificarla.

La evaluación debe considerar previsibilidad, facilidad de autoría, rendimiento, depuración y legibilidad para el jugador. Un jefe con fases reconocibles puede ser mejor que uno que elige siempre la acción más eficaz y no permite aprender sus patrones.

## 16. Caso integrado: explicar una conducta completa

```text
1. Percepción: sonido válido en (4,1).
2. Memoria: registra origen e instante.
3. Decisión: Patrullar → Investigar.
4. Búsqueda: calcula ruta transitable hacia (4,1).
5. Seguimiento: selecciona el siguiente punto.
6. Movimiento: propone velocidad; locomoción aplica colisiones.
7. Cambio de mundo: se bloquea una celda de la ruta.
8. Navegación: invalida y busca un rodeo, o informa inaccesible.
9. Decisión: responde al resultado según sus reglas.
```

Se necesitan trazas que unan causas y resultados: observación, evento, destino, costo de ruta, punto activo y motivo de recálculo. No hace falta registrar todos los cuadros ni razonamientos privados de un modelo.

La justicia del enemigo depende también de percepción limitada, tiempos de reacción, señales visibles y oportunidades de respuesta. Conocer todo el mundo o reaccionar instantáneamente puede aumentar la eficacia y empeorar el juego.

Para comportamiento acotado y reproducible, las técnicas clásicas suelen ser apropiadas: ejecutan localmente, tienen costo predecible y pueden probarse sin servicios externos. Los modelos generativos en tiempo de ejecución requieren una justificación propia; no se incorporan sólo porque un agente ayudó a construir el juego.

## Límites y errores frecuentes

- Llamar «IA» a todas las capas impide localizar causas.
- Afirmar que BFS minimiza costos variables o que DFS siempre encuentra la ruta corta.
- Usar Manhattan después de habilitar diagonales baratas sin revisar su validez.
- Confundir un objetivo inaccesible con un presupuesto agotado.
- Mezclar búsqueda, seguimiento y colisiones en una misma función.
- Actualizar memoria con información que los sensores no observaron.
- Confundir `EnCurso` con éxito o no cancelar una acción interrumpida.
- Ajustar utilidad sin normalizar entradas ni comprobar oscilaciones.
- Aplicar efectos GOAP aunque la acción física falle.
- Elegir la técnica más compleja en lugar de la más apropiada.

## Comprobación conceptual

1. Una ruta tiene cuatro pasos de costo total 16 y otra seis pasos de costo 6. ¿Qué optimizan BFS y Dijkstra en ese caso?
2. ¿Por qué Manhattan es válida en cuatro vecinos de costo mínimo 1 y puede fallar con teletransportes?
3. ¿Qué diferencia hay entre restricción, penalización y objetivo?
4. ¿Por qué un personaje puede tener una ruta correcta y aun así no llegar?
5. ¿Qué puede recordar un guardia después de perder visión?
6. ¿Qué cambia entre un evento, una guarda y un estado de FSM?
7. ¿Qué debe hacer un BT con una investigación en curso cuando la visión gana prioridad?
8. ¿Por qué Utility AI necesita estabilidad además de puntuaciones?
9. ¿Qué diferencia hay entre encontrar un plan GOAP y ejecutar sus acciones?
10. ¿Qué técnica elegirías para un guardia con cinco modos reconocibles y cómo justificarías esa elección?

**Orientación para autocorrección:** BFS minimiza pasos con costos iguales; Dijkstra, costo. La heurística debe respetar las acciones y costos reales. La locomoción puede impedir un movimiento válido en el grafo. La memoria conserva observaciones, no omnisciencia. Los patrones organizan decisiones diferentes y requieren evidencia específica.

## Actividad relacionada

La [práctica guiada de navegación](11-practica-guiada-navegacion.md) comienza el 7/10 y se entrega completa en la clase del 14/10. Incluye una sola variante y no exige implementar los patrones presentados ese día. El [laboratorio de A* y FSM](09-laboratorio-a-star-y-fsm.md) corresponde al trabajo de comportamiento de la clase 10.

## Bibliografía comentada y ampliación

- Poole, D. L. y Mackworth, A. K. (2023). *Artificial Intelligence: Foundations of Computational Agents*, 3.ª ed. Consultar búsqueda en grafos, costo uniforme, heurísticas y planificación para fundamentar las garantías. [Libro abierto](https://artint.info/).
- Millington, I. y Funge, J. *Artificial Intelligence for Games*. Consultar movimiento, búsqueda de caminos y toma de decisiones; interesa distinguir contratos y costos, no memorizar una implementación.
- Rabin, S. (ed.) (2013). *Game AI Pro*. Consultar experiencias de producción sobre comportamiento, utilidad y planificación para comparar autoría, rendimiento y ajuste.
- Materiales de la cátedra: [A*](01-busqueda-y-a-star.md), [percepción y movimiento](02-percepcion-navegacion-y-steering.md), [FSM](03-maquinas-de-estados.md), [BT](04-behavior-trees.md), [utilidad](05-utility-ai.md), [GOAP](06-goap.md) y [selección de técnicas](07-seleccion-e-intencion-de-diseno.md). Profundizan cada sección de este apunte.
