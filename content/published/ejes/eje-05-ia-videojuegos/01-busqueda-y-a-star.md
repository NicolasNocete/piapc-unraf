---
id: eje-05-busqueda-y-a-star
titulo: Búsqueda de caminos y A*
eje: 5
orden: 1
tipo: lectura
nivel: obligatorio
audiencia: estudiante
clases: [9]
modalidad: virtual-asincronica
duracion_minutos: 25
resultados: [RA7, RA8, RA11]
prerrequisitos: []
evaluable: true
acceso: publico
version: 2
---

# Búsqueda de caminos y A*

## Propósito

Formular un problema mediante estados, acciones, objetivos, costos y restricciones; representar su espacio como grafo; comparar BFS, DFS y A*; y comprobar una ruta con una traza reproducible.

## Por qué importa

Un personaje no puede navegar de forma correcta si el problema está mal representado. Una ruta corta puede cruzar una puerta cerrada, exponer a un guardia o exigir un giro imposible. El algoritmo sólo optimiza aquello que el grafo y el costo expresan.

## Modelo mental: buscar en un espacio de estados

- **Estado:** información suficiente para decidir acciones futuras. Si una puerta requiere llave, `posición` no alcanza: el estado es `(posición, tieneLlave)`.
- **Estado inicial:** situación desde la cual comienza la búsqueda.
- **Acción:** transformación permitida, como avanzar o abrir.
- **Objetivo:** condición comprobable, no necesariamente un único nodo.
- **Costo:** suma que representa distancia, tiempo, peligro o ruido.
- **Restricción:** acción o estado imposible; no es un costo alto.

Los estados son nodos y las acciones son aristas dirigidas. Un grafo puede ser explícito, como una red de puntos, o implícito: se generan vecinos al expandir cada estado. Una cuadrícula debe considerar obstáculos, límites, conexiones y, si corresponde, tamaño del personaje.

## Frontera, explorados y predecesores

La **frontera** contiene estados descubiertos pendientes; **explorados** registra los procesados; un mapa de **predecesores** permite reconstruir la solución. El orden de extracción cambia el algoritmo:

| Algoritmo | Frontera | Completo en grafo finito | Solución óptima |
|---|---|---|---|
| Búsqueda en anchura (*breadth-first search*, BFS) | Cola FIFO | Sí | Sí, sólo con costos iguales |
| Búsqueda en profundidad (*depth-first search*, DFS) | Pila LIFO | Sí, evitando ciclos | No |
| A* | Prioridad por `f=g+h` | Sí, con costos positivos y manejo correcto | Sí, con heurística adecuada |

DFS puede alcanzar rápido una solución profunda o recorrer una rama inútil. Consume poca memoria de frontera, pero el conjunto de visitados sigue siendo necesario en grafos con ciclos. BFS explora por cantidad de acciones, no por costo variable.

## A*: costo conocido y estimación

```text
f(n) = g(n) + h(n)
```

`g(n)` es el costo acumulado real y `h(n)` estima el costo restante. Si `h=0`, A* se vuelve búsqueda de costo uniforme. Una heurística **admisible** nunca sobreestima el costo óptimo. Una heurística **consistente** además cumple `h(n) <= costo(n,n') + h(n')`; permite cerrar nodos sin reabrirlos. Si no es consistente, una implementación correcta debe poder reabrir un nodo cuando descubre un `g` mejor.

Para desplazamiento ortogonal de costo 1:

```text
Manhattan(n, objetivo) = |nx-ox| + |ny-oy|
```

No corresponde usarla sin adaptación con diagonales baratas, teletransportes o costos menores que 1. Multiplicar `h` para acelerar puede sacrificar optimalidad: es una decisión de diseño, no el mismo A* óptimo.

## Caso aplicado y traza

Grafo dirigido, costos unitarios y vecinos en el orden mostrado:

```text
S: [A, B]   A: [C]   C: [X]   X: [G]
B: [D, E]   D: [G]   E: []
```

| Paso | BFS extrae / frontera posterior | DFS extrae / pila posterior |
|---:|---|---|
| 1 | `S` / `[A,B]` | `S` / `[B,A]` |
| 2 | `A` / `[B,C]` | `A` / `[B,C]` |
| 3 | `B` / `[C,D,E]` | `C` / `[B,X]` |
| 4 | `C` / `[D,E,X]` | `X` / `[B,G]` |
| 5 | `D` / `[E,X,G]` | `G` / éxito |

DFS devuelve `S-A-C-X-G` (4 acciones); BFS devuelve `S-B-D-G` (3). Cambiar el orden de vecinos cambia la traza, por eso debe registrarse.

En A*, supongamos `h(A)=3`, `h(B)=2`, `h(D)=1`, todos los costos 1. Tras expandir `S`, `f(A)=4` y `f(B)=3`: se elige `B`; luego `D` con `f=3`; finalmente `G` con costo 3. Para reproducir empates se necesita una regla estable, por ejemplo menor `h` y luego orden de inserción.

## Pseudocódigo robusto

```text
mejorG[inicio] = 0
frontera.agregar((inicio, 0, h(inicio)))  // (nodo, g, f)
mientras frontera no esté vacía:
    actual, gGuardado, fGuardado = frontera.extraerMenorF()
    si gGuardado != mejorG[actual]: continuar  // entrada obsoleta
    si objetivo(actual): retornar reconstruir(predecesor)
    para cada acción válida hacia vecino:
        candidato = mejorG[actual] + costo(acción)
        si vecino no está en mejorG o candidato < mejorG[vecino]:
            mejorG[vecino] = candidato
            predecesor[vecino] = actual
            fCandidato = candidato + h(vecino)
            frontera.agregar((vecino, candidato, fCandidato))
retornar inaccesible
```

La prioridad se compara por `fGuardado`; los criterios de desempate completan esa clave. Cada entrada conserva además el `g` vigente al insertarla, de modo que puede descartarse si otra ruta mejor actualizó `mejorG` antes de su extracción.

## Límites y decisiones de diseño

En mundos dinámicos, una ruta envejece: conviene recalcular ante un bloqueo relevante, no necesariamente cada cuadro. Una cuadrícula reduce posiciones continuas y puede ignorar radios, pendientes e inercia. Los costos permiten preferir sombra o evitar ruido, pero valores mal escalados producen rutas extrañas. La ruta matemáticamente óptima puede ser demasiado perfecta para el desafío buscado.

## Errores frecuentes

- Marcar un nodo visitado al descubrirlo en A* e impedir una mejora posterior.
- Devolver lista vacía tanto para `inicio=objetivo` como para fracaso.
- Afirmar que BFS minimiza costo cuando las aristas tienen pesos distintos.
- Comparar velocidad una sola vez sin fijar mapa, desempate y orden de vecinos.
- Confundir encontrar una ruta con mover al personaje.

## Comprobación

1. ¿Qué información agregarías al estado para una puerta con llave consumible?
2. ¿Por qué una heurística que sobreestima puede perder la ruta óptima?
3. Trazá DFS en el grafo anterior invirtiendo el orden de vecinos de `S`.
4. ¿Qué evidencia diferencia `inaccesible` de un error de implementación?

## Actividad relacionada

En la clase 9, resolvé estos ejercicios de comprobación como actividad propia de esta lectura de A*. Conservá las trazas y conclusiones para el [laboratorio de A* y FSM](09-laboratorio-a-star-y-fsm.md), que comienza en la clase 10 después de trabajar ambas lecturas.

## Bibliografía comentada

- Millington, I. y Funge, J. (2016). *Artificial Intelligence for Games* (3.ª ed.). Consultar representación de caminos, grafos y A* aplicada a juegos.
- Poole, D. L. y Mackworth, A. K. (2023). *Artificial Intelligence: Foundations of Computational Agents* (3.ª ed.). Consultar búsqueda de menor costo, búsqueda heurística y sus condiciones. https://artint.info/
