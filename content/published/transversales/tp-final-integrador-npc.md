---
id: tp-final-integrador-npc
titulo: "TP final integrador: IA para NPC en un videojuego"
tipo: actividad
audiencia: estudiante
acceso: publico
version: 4
eje: 5
orden: 12
nivel: obligatorio
clases: [11, 12, 13]
modalidad: mixta
duracion_minutos: 30
resultados: [RA7, RA8, RA11]
prerrequisitos: [eje-05]
evaluable: true
disponible_desde: "2026-10-19"
disponible_hasta: "2026-11-03"
---

# TP final integrador: IA para NPC en un videojuego

**Modalidad:** individual o equipos de hasta **2 integrantes**.

**Entrega del GDD:** antes del **martes 27 de octubre de 2026 a las 12:00 hs (hora de Argentina)**, en el apartado independiente [Entrega del GDD](tp-final-entrega-gdd.md).

**Entrega final:** **3 de noviembre de 2026**.

**Presentación, demostración y exposición de métodos:** **4 de noviembre de 2026**, en clase.

Este trabajo **reemplaza el segundo parcial y se unifica con el TP final en una única entrega final del proyecto**, precedida por la entrega del GDD. La última semana, el **11/11**, no tiene actividades, entregas ni exposición.

## Objetivo y alcance

Construir un **prototipo pequeño y funcional** donde uno o más NPC (personajes no controlados por el jugador) perciban el entorno, seleccionen objetivos y actúen para cumplirlos.

Se busca aplicar los contenidos de la materia con **OpenCode y un proceso spec-driven básico**. No se pide un videojuego completo: prioricen un escenario acotado, pocos agentes y controles que permitan probar las alternativas. Pueden continuar un proyecto trabajado en clase o iniciar uno pequeño.

Los 30 minutos indicados en la ficha orientan la lectura y organización inicial, no la duración total del desarrollo.

**¿No sabés por dónde empezar?** Consultá [Cómo comenzar el TP final](tp-final-como-comenzar.md): crear y clonar el repositorio, iniciar OpenCode y usar un prompt guiado para preparar el GDD, las specs y comenzar a implementar.

## Requisitos mínimos

1. **Percepción y objetivos:** definir qué información recibe cada NPC, qué intenta conseguir y qué situaciones modifican sus decisiones. Por ejemplo: detectar al jugador, recordar su última posición, buscar recursos o regresar a una base.
2. **Búsqueda:** implementar **al menos 2 algoritmos**, como BFS, DFS, Dijkstra o A*, y permitir seleccionarlos para observar su funcionamiento jugando el prototipo. Pueden incorporar más. Expliquen sus diferencias y límites; por ejemplo, DFS no garantiza el camino más corto y BFS supone costos uniformes para obtenerlo.
3. **Navegación:** implementar **al menos 2 alternativas** de recorrido o movimiento. Por ejemplo: ruta corta frente a ruta segura que evita zonas expuestas; seguimiento de puntos frente a seguimiento con evasión local de obstáculos. Pueden incorporar más. Deben poder activar y demostrar cada alternativa.
4. **Comportamiento:** utilizar **máquinas de estados finitos (FSM)**, árboles de comportamiento, sistemas de utilidad o GOAP. Elijan según el proyecto; no es obligatorio implementar todas las técnicas. Una FSM de patrulla, investigación y persecución es una opción válida.
5. **OpenCode:** utilizarlo para apoyar la exploración, planificación, implementación, prueba y revisión. Revisen lo generado y puedan explicar qué aportó la herramienta y qué decisiones o correcciones hicieron ustedes.
6. **Spec-driven básico:** escribir y utilizar especificaciones breves para las funcionalidades principales, empezando por al menos una antes de implementarla.
7. **Escenarios variables:** incorporar generación procedural o aleatoria sencilla que modifique el escenario y obligue a adaptar las rutas. Debe ser posible generar otra variante y observar cómo responden los métodos jugando. No alcanza con un único mapa fijo ni con cambios sólo visuales.

**Búsqueda y navegación no son lo mismo:** la búsqueda calcula un camino; la navegación determina cómo se selecciona o recorre y cómo el NPC responde al entorno. Cambiar BFS por A* no cuenta, por sí solo, como una segunda alternativa de navegación. Una ruta segura puede modificar los costos o restricciones; expliquen qué cambia y qué algoritmo admite esos costos.

No se exige MCP, un modelo de lenguaje dentro del juego ni servicios pagos. OpenCode se utiliza durante el desarrollo; la IA del NPC puede ser completamente clásica.

## Escenarios variables y patrullaje — obligatorio

El prototipo debe permitir **generar distintas configuraciones del escenario**: por ejemplo, variar obstáculos, pasajes o zonas con distintos costos de recorrido. También pueden cambiar posiciones iniciales, recursos y objetivos. La variación debe afectar las decisiones de recorrido, no sólo colores o decoración.

No hace falta un generador de niveles complejo: alcanza con un mapa pequeño que ubique obstáculos respetando reglas o combine sectores simples. Las variantes deben ser válidas: inicio y objetivos en lugares transitables, sin superponer personajes con paredes y con al menos un camino que permita cumplir el objetivo principal. Pueden comprobarlo con una búsqueda y descartar o corregir una configuración inválida. Los casos sin camino se pueden probar aparte para mostrar cómo responde el agente.

- Incluir un control para **generar otra variante**.
- Permitir **seleccionar las alternativas de búsqueda y navegación y observarlas jugando**. No se exige repetir exactamente las mismas condiciones ni preparar una comparación formal.
- Si hay **patrullaje**, los puntos deben estar en lugares válidos y las rutas entre ellos deben calcularse según el escenario generado. Pueden usar puntos de referencia, pero no alcanza con reproducir siempre una trayectoria fija preparada que ignore cambios del mapa. Deben mostrar que la patrulla se adapta a otra configuración.
- En la exposición, **jugar y demostrar distintos escenarios generados**, mostrar las alternativas y explicar cómo se adaptan los recorridos. Las rutas pueden coincidir en algún caso: expliquen por qué, sin forzar diferencias.

**Generar otro mapa no cuenta como una segunda alternativa de navegación.** Las alternativas de navegación deben estar implementadas y poder seleccionarse; no basta con mostrar mapas diferentes. La generación procedural no es necesariamente IA por sí sola: aquí sirve para comprobar que las técnicas funcionan más allá de un recorrido preparado.

## Ejemplos para elegir

| Propuesta | Objetivos y comportamiento | Posibles comparaciones |
|---|---|---|
| **Guardia y ladrón** | Patrullar, investigar un ruido y perseguir al jugador; FSM como arquitectura posible. | BFS y A* en un mapa de costos uniformes; rutas cortas frente a rutas que eviten zonas expuestas. |
| **Robot recolector** | Elegir recursos, recogerlos y regresar a una base; decidir según cercanía o necesidad. | Dijkstra y A* con costos de terreno; seguimiento de puntos frente a seguimiento con evasión local. |
| **Rescate en un laberinto** | Buscar personajes y guiarlos hacia una salida; reaccionar a bloqueos. | BFS y A*; recorridos directos frente a recorridos que excluyan zonas peligrosas. |

Son alternativas de proyecto, no tres trabajos obligatorios. También pueden proponer un caso de complejidad equivalente. Usen gráficos simples: lo importante es que la IA se pueda observar y comprender.

## ¿Qué es spec-driven básico?

Es **definir qué queremos construir antes de pedirle al agente que lo implemente**, y usar esa definición para comprobar el resultado.

Una *spec* es un archivo breve que responde:

- ¿Qué debe hacer la funcionalidad y para qué?
- ¿En qué situaciones debe actuar?
- ¿Qué queda fuera de alcance?
- ¿Cómo comprobamos que funciona?

No hace falta una spec por cada cambio pequeño, una herramienta especial ni documentación extensa. Pueden escribir archivos Markdown en `specs/`. OpenCode puede ayudar a redactarlos, pero ustedes deben revisar y comprender el contenido. Si cambia lo que quieren construir, actualicen la spec.

### Ejemplo de spec: `specs/persecucion.md`

```markdown
# Persecución del guardia

## Objetivo
El guardia debe perseguir al jugador cuando lo detecta.

## Comportamiento esperado
- Mientras no detecta al jugador, recorre puntos de patrulla.
- Los puntos de patrulla son transitables en el mapa generado;
  las rutas entre ellos se calculan con el algoritmo seleccionado.
- Si el jugador entra en su radio de visión y no hay una pared
  entre ambos, comienza a perseguirlo.
- Calcula el camino con el algoritmo seleccionado: BFS o A*.
- El mapa de esta funcionalidad tiene costos de paso uniformes.
- Si pierde de vista al jugador, va a su última posición conocida.
- Si no lo encuentra allí, retoma la patrulla.

## Fuera de alcance
Combate, animaciones y coordinación entre varios guardias.

## Cómo comprobarlo
- Sin jugador visible, el guardia patrulla.
- Con jugador visible, comienza la persecución.
- No detecta al jugador a través de paredes.
- Si no existe un camino, no atraviesa obstáculos ni se bloquea:
  permanece en un lugar válido y retoma la patrulla si es posible.
- Se puede seleccionar BFS o A* y observar cómo se mueve el guardia.
- Al generar otro mapa, la patrulla adapta sus rutas a los obstáculos.
```

Es un ejemplo de una funcionalidad, no la especificación completa del TP: aún deberán definir sus alternativas de navegación y las demás partes de su proyecto.

## Flujo de trabajo sugerido: GDD → specs → ejecución

1. **Preparar el repositorio público.** Agregar integrantes y una descripción inicial. No publicar claves, credenciales ni información privada.
2. **Escribir un GDD breve.** El *Game Design Document* describe la idea de juego: escenario, objetivo del jugador si lo hay, interacción y controles, NPC, objetivos, comportamientos y alternativas de búsqueda y navegación elegidas. Definir qué varía al generar el escenario y cómo se mantiene válido y jugable. No necesita arte elaborado ni un diseño de juego completo.
3. **Redactar las specs principales.** Convertir la intención del GDD en comportamientos concretos, límites y comprobaciones. Empezar por un NPC y una funcionalidad pequeña.
4. **Ejecutar con OpenCode.** Pedirle que lea el GDD y una spec, proponga un plan corto y luego implemente esa funcionalidad. Revisar el plan antes de autorizar cambios. Avanzar de a una funcionalidad.
5. **Jugar, revisar y ajustar.** Ejecutar el prototipo, generar escenarios, activar las alternativas y comprobar la spec jugando. Revisar los cambios y corregir errores. Probar al menos un caso normal y uno problemático, como un destino sin camino o un obstáculo. No hace falta producir un informe separado de estas pruebas.
6. **Preparar la exposición.** Demostrar distintos escenarios jugando, seleccionar los métodos y mostrar cómo se adaptan las rutas y el patrullaje, si lo hay. Explicar las diferencias observadas, aunque dos métodos produzcan la misma ruta en algún caso. No se pide una comparación con idéntico mapa, inicio y objetivo, ni tablas o métricas adicionales.

No se pide guardar conversaciones completas, capturas de cada paso ni una carpeta de evidencias. Lo central es un prototipo funcional, documentación breve y comprensión de lo realizado.

## Entrega del GDD del 27/10

Registren el GDD breve en el apartado [Entrega del GDD](tp-final-entrega-gdd.md), **antes del martes 27/10 a las 12:00 hs (hora de Argentina)**. Allí encontrarán las instrucciones y su formulario propio. No hace falta entregar el prototipo terminado, las specs ni la presentación en esta instancia.

El GDD y la entrega final tienen **formularios, versiones y devoluciones independientes**. Actualizar uno no reemplaza el otro. El formulario al final de esta página corresponde únicamente a la **entrega final del proyecto del 3/11**.

## Entrega final del proyecto del 3/11

Entreguen la **URL del repositorio público** en el formulario **Entrega**, al final de esta página. El repositorio debe incluir:

- Código del prototipo.
- Una versión ejecutable o instrucciones claras para ejecutarlo.
- `README.md` con integrantes, descripción, requisitos de ejecución y controles para cambiar algoritmos y alternativas de navegación y generar otro escenario.
- **GDD breve**.
- **Specs utilizadas**.
- **Presentación para la clase del 4/11**, en un archivo o mediante un enlace accesible desde el README.

En equipos de dos, **cada integrante registra su propia entrega**, con la misma URL y los nombres de ambos. Así cada persona puede comprobar su envío en la plataforma; no hace falta duplicar el proyecto.

Texto sugerido para el formulario:

```text
Proyecto:
Integrante/s:
Repositorio público:
Cómo ejecutar: ver README del repositorio.
Presentación: ver archivo o enlace en el repositorio.
```

Verifiquen que el repositorio y sus enlaces sean accesibles sin permisos privados. **No se pide informe técnico extenso, archivo de evidencia ni un documento adicional de trazabilidad.**

## Presentación y exposición del 4/11

Preparar una presentación breve, apoyada en diagramas sencillos, capturas o demostración en vivo, que incluya:

1. **Idea y demostración:** escenario, objetivos del prototipo y acciones de los NPC. Jugar y mostrar distintos escenarios generados y explicar las reglas que los mantienen válidos y jugables.
2. **Métodos de búsqueda:** algoritmos implementados, cómo funcionan y qué diferencias observaron jugando. Seleccionarlos y mostrar su funcionamiento, sin exigir comparaciones con condiciones idénticas, tablas ni métricas.
3. **Navegación:** alternativas disponibles, cómo se seleccionan y qué sucede ante obstáculos o caminos bloqueados. Demostrar jugando que las rutas, incluido el patrullaje si lo hay, se adaptan al cambiar el escenario.
4. **Características de la IA:** qué percibe y recuerda cada NPC, qué objetivos persigue, cómo decide y cómo cambia su comportamiento. Mostrar la FSM u otra técnica utilizada y relacionarla con lo que se ve en el prototipo.
5. **Desarrollo con OpenCode:** cómo lo utilizaron, un ejemplo de spec que guio una funcionalidad y una decisión o corrección propia.
6. **Conclusiones:** qué funciona, qué limitaciones encontraron y qué mejorarían.

Cada integrante debe poder explicar su aporte y comprender el funcionamiento general. Se prioriza que puedan **demostrar, comparar y explicar** lo implementado, no la cantidad de código, diapositivas o documentación.

## Organización de las semanas

| Fecha | Trabajo previsto |
|---|---|
| **21/10** | Inicio del TP: equipo, propuesta, repositorio, GDD y primeras specs; comenzar el prototipo. |
| **27/10, antes de las 12:00 hs** | Entrega del GDD en su apartado independiente (hora de Argentina). |
| **28/10** | Taller presencial de producción y consultas; revisar alternativas y resolver bloqueos. |
| **3/11** | Entrega final en la plataforma. |
| **4/11** | Presentación, demostración y exposición de métodos en clase. |
| **11/11** | Sin actividades, entregas ni exposición. |

La entrega del GDD es una instancia previa independiente de la entrega final. No hay un segundo parcial adicional.

## Materiales de apoyo

- [Índice de IA y comportamiento en videojuegos](../ejes/eje-05-ia-videojuegos/README.md).
- [Búsqueda de caminos y A*](../ejes/eje-05-ia-videojuegos/01-busqueda-y-a-star.md).
- [Percepción, navegación y movimiento](../ejes/eje-05-ia-videojuegos/02-percepcion-navegacion-y-steering.md).
- [Máquinas de estados: FSM y HFSM](../ejes/eje-05-ia-videojuegos/03-maquinas-de-estados.md).
- [Teoría integrada de navegación y comportamiento](../ejes/eje-05-ia-videojuegos/10-teoria-navegacion-y-comportamiento.md).
