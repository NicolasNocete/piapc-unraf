---
id: eje-05-behavior-trees
titulo: Árboles de comportamiento
eje: 5
orden: 4
tipo: lectura
nivel: obligatorio
audiencia: estudiante
clases: [10]
modalidad: presencial
duracion_minutos: 20
resultados: [RA7, RA8, RA11]
prerrequisitos: [eje-05-maquinas-de-estados]
evaluable: true
acceso: publico
version: 1
---

# Árboles de comportamiento

## Propósito

Construir y trazar un árbol de comportamiento (*behavior tree*, BT) con nodos de composición, prioridades, estado de ejecución y subárboles reutilizables.

## Por qué importa

Un BT organiza decisiones como composición de tareas en vez de enumerar transiciones entre todos los estados. Su estructura visual puede facilitar que programación y diseño discutan prioridades, siempre que los nodos tengan contratos precisos.

## Modelo mental: consultar desde la raíz

En cada actualización (*tick*), la raíz evalúa hijos. Cada nodo devuelve uno de tres estados:

- `Éxito`: completó su propósito.
- `Fallo`: no puede o no corresponde ejecutarlo.
- `EnCurso`: necesita continuar en próximos ticks.

El estado no significa “verdadero/falso”. `MoverA(destino)` devuelve `EnCurso` mientras avanza, `Éxito` al llegar y `Fallo` si el destino es inaccesible.

## Nodos centrales

- **Secuencia:** evalúa hijos de izquierda a derecha; falla al primer fallo, queda en curso ante el primero en curso y tiene éxito si todos lo tienen. Representa “hacer A y luego B”.
- **Selector:** evalúa por prioridad; tiene éxito o queda en curso con el primer hijo que no falla. Representa “intentar A; si no, B”.
- **Condición:** consulta sin producir efectos relevantes, por ejemplo `¿veJugador?`.
- **Acción:** modifica el mundo o sostiene una tarea, por ejemplo `Perseguir`.
- **Decorador:** transforma o limita un hijo: invertir resultado, repetir, imponer tiempo máximo o enfriamiento.

```text
Selector de prioridad
├── Secuencia
│   ├── ¿ve jugador?
│   └── Perseguir
├── Secuencia
│   ├── ¿oyó sonido vigente?
│   └── Investigar
└── Patrullar
```

Si `¿ve jugador?` tiene éxito, `Perseguir` queda `EnCurso` y no se consulta lo inferior. Si falla, se intenta sonido; finalmente patrulla.

## Prioridad y reactividad

En un selector **reactivo**, cada tick comienza en el hijo de mayor prioridad. Permite interrumpir `Patrullar` al ver al jugador. En un selector **con memoria**, se continúa desde el hijo `EnCurso`; reduce reevaluación, pero puede ignorar una amenaza nueva hasta que termine.

Esta diferencia debe ser explícita. “Selector” no basta como contrato. También se necesita una política de **aborto**: al abandonar `Investigar`, ¿se cancela su ruta y su temporizador? Un nodo interrumpido debe limpiar recursos sin marcar éxito.

## Estado de ejecución

Los nodos `EnCurso` conservan estado: punto siguiente, tiempo restante o identificador de animación. Hay dos estrategias:

- El nodo guarda estado interno por instancia.
- Un **pizarrón** (*blackboard*) guarda datos compartidos como última posición conocida.

No almacenar estado mutable en una definición compartida por varios guardias: mezclarían rutas y temporizadores. La estructura puede reutilizarse, pero cada agente necesita contexto de ejecución propio. El pizarrón debe tener esquema y responsables; una bolsa global de claves arbitrarias oculta dependencias.

## Traza aplicada

```text
tick 40: raíz
  ¿ve jugador? → Fallo
  ¿sonido vigente? → Éxito
  Investigar → EnCurso (punto 2/5)
resultado raíz → EnCurso

tick 41: raíz reactiva
  ¿ve jugador? → Éxito
  abortar Investigar → ruta cancelada
  Perseguir → EnCurso
resultado raíz → EnCurso
```

La traza registra sólo nodos visitados, resultados, abortos y cambios relevantes. Visualizar el nodo activo y el camino evaluado permite explicar por qué no se eligió una rama.

## Composición y reutilización

Un subárbol `IrA(posición)` puede componer `¿destino válido? → CalcularRuta → SeguirRuta`. Para reutilizarlo, sus entradas y salidas deben ser claras:

```text
entrada: blackboard.destino
éxito: agente dentro del radio de llegada
fallo: destino inválido o ruta inaccesible
aborto: cancela ruta activa
```

Parametrizar destino es mejor que duplicar árboles para patrulla e investigación. La reutilización falla si el subárbol conoce nombres de escenas, escribe claves no declaradas o supone sensores específicos.

## Comprobación y pruebas

- Tabla de resultados para secuencias y selectores.
- Acción que permanece varios ticks en curso y luego termina.
- Cambio de prioridad que aborta una rama inferior.
- Fallo de ruta y recuperación hacia otra opción.
- Dos agentes con la misma definición y estados independientes.
- Decorador de tiempo exactamente en el límite.

Para evitar diferencias por tasa de cuadros, inyectar tiempo y entradas. Una traza esperada puede comparar nodos visitados y resultados, no detalles privados de implementación.

## Límites

Árboles anchos y profundos pueden reevaluar muchas condiciones y esconder dependencias en el pizarrón. Los BT expresan bien composición y prioridad, pero peor una elección gradual entre muchas alternativas. La representación visual no garantiza legibilidad si hay decoradores ambiguos o efectos laterales ocultos.

## Errores frecuentes

- Tratar `EnCurso` como éxito y avanzar al hijo siguiente.
- No cancelar una acción interrumpida.
- Poner acciones con efectos laterales dentro de condiciones.
- Compartir estado mutable entre agentes.
- Repetir infinitamente un hijo que siempre falla en el mismo tick.
- Creer que el orden de hijos no afecta el diseño.

## Comprobación

1. ¿Qué cambia entre selector reactivo y selector con memoria?
2. ¿Qué resultado debe devolver `MoverA` mientras el agente avanza?
3. ¿Qué estado puede compartir una definición y cuál debe ser por agente?
4. ¿Cómo comprobarías que visión interrumpe investigación correctamente?

## Actividad relacionada

Compará esta arquitectura con las demás mediante [selección e intención de diseño](07-seleccion-e-intencion-de-diseno.md).

## Bibliografía comentada

- Millington, I. y Funge, J. (2016). *Artificial Intelligence for Games* (3.ª ed.). Leer árboles de decisión y árboles de comportamiento, con atención a ejecución y escalabilidad.
- Rabin, S. (ed.). (2013). *Game AI Pro: Collected Wisdom of Game AI Professionals*. Consultar experiencias de producción sobre composición y depuración de BT.
