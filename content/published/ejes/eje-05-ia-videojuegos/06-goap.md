---
id: eje-05-goap
titulo: Planificación orientada a objetivos y GOAP
eje: 5
orden: 6
tipo: lectura
nivel: obligatorio
audiencia: estudiante
clases: [10]
modalidad: presencial
duracion_minutos: 20
resultados: [RA7, RA8, RA11]
prerrequisitos: [eje-05-busqueda-y-a-star, eje-05-maquinas-de-estados]
evaluable: true
acceso: publico
version: 1
---

# Planificación orientada a objetivos y GOAP

## Propósito

Representar un mundo simbólico, objetivos y acciones con precondiciones, efectos y costos; obtener y ejecutar un plan GOAP; y verificar su validez ante cambios.

## Por qué importa

Una máquina enumera conductas previstas. La planificación orientada a objetivos (*Goal-Oriented Action Planning*, GOAP) permite encontrar secuencias nuevas combinando acciones declaradas. Es útil cuando distintos recursos y caminos pueden satisfacer el mismo objetivo.

## Modelo mental como búsqueda

El estado del mundo es un conjunto acotado de hechos, por ejemplo:

```text
{ veJugador=false, conocePosición=true, tieneLlave=false,
  puertaAbierta=false, enSalaObjetivo=false }
```

Un **objetivo** es una condición deseada, como `{enSalaObjetivo=true}`. Cada acción declara:

- **Precondiciones:** hechos necesarios antes de ejecutarla.
- **Efectos:** hechos que cambia al completarse.
- **Costo:** preferencia cuantitativa.
- **Procedimiento:** implementación concreta, separada del modelo simbólico.

Planificar es buscar en un grafo de estados: aplicar una acción válida genera otro estado. BFS sirve con costos iguales; A* o costo uniforme, con costos diferentes.

## Dominio de ejemplo

| Acción | Precondiciones | Efectos | Costo |
|---|---|---|---:|
| `IrALlave` | conoceLlave, juntoLlave=false | juntoLlave=true, juntoPuerta=false | 1 |
| `BuscarLlave` | juntoLlave, tieneLlave=false | tieneLlave=true | 2 |
| `IrAPuerta` | conocePuerta, juntoPuerta=false | juntoPuerta=true, juntoLlave=false | 2 |
| `AbrirPuerta` | juntoPuerta, tieneLlave, puertaAbierta=false | puertaAbierta=true | 1 |
| `ForzarPuerta` | juntoPuerta, tienePalanca, puertaAbierta=false | puertaAbierta=true, hizoRuido=true | 3 |
| `EntrarSala` | juntoPuerta, puertaAbierta, enSalaObjetivo=false | enSalaObjetivo=true | 1 |

Estado inicial: `conocePuerta=true`, `conoceLlave=true`, `juntoLlave=false`, `juntoPuerta=false`, `tieneLlave=false`, `tienePalanca=false`, `puertaAbierta=false`, `enSalaObjetivo=false`; objetivo: `enSalaObjetivo=true`.

```text
Plan A: IrALlave(1) → BuscarLlave(2) → IrAPuerta(2) → AbrirPuerta(1) → EntrarSala(1)
costo total = 7
```

Si el estado inicial incluyera `tienePalanca=true` y el costo de ruido no importara, `IrAPuerta → ForzarPuerta → EntrarSala` costaría 6. Si `hizoRuido` compromete el sigilo, debe reflejarse como costo o restricción; el planificador no conoce intenciones no modeladas.

## Traza de planificación

Con búsqueda de costo uniforme, desempate determinista por nombre de acción y estados abreviados a los hechos que cambian, una traza válida es:

```text
expandir S0={}, g=0
  IrALlave  → S1={juntoLlave}, g=1
  IrAPuerta → S2={juntoPuerta}, g=2
  restantes rechazadas: no cumplen sus precondiciones
expandir S1={juntoLlave}, g=1
  BuscarLlave → S3={juntoLlave,tieneLlave}, g=3
  IrAPuerta   → S2, g=3; descartar (S2 ya se alcanzó con g=2)
  restantes rechazadas: no cumplen sus precondiciones
expandir S2={juntoPuerta}, g=2
  IrALlave → S1, g=3; descartar (S1 ya se alcanzó con g=1)
  BuscarLlave rechazada: falta juntoLlave
  AbrirPuerta rechazada: falta tieneLlave
  restantes rechazadas: no cumplen sus precondiciones
expandir S3={juntoLlave,tieneLlave}, g=3
  IrAPuerta → S4={juntoPuerta,tieneLlave}, g=5
  restantes rechazadas: no cumplen sus precondiciones
expandir S4={juntoPuerta,tieneLlave}, g=5
  AbrirPuerta → S5={juntoPuerta,tieneLlave,puertaAbierta}, g=6
  IrALlave    → S3, g=6; descartar (S3 ya se alcanzó con g=3)
  restantes rechazadas: no cumplen sus precondiciones
expandir S5={juntoPuerta,tieneLlave,puertaAbierta}, g=6
  EntrarSala → G={juntoPuerta,tieneLlave,puertaAbierta,enSalaObjetivo}, g=7
  IrALlave   → S6={juntoLlave,tieneLlave,puertaAbierta}, g=7
  restantes rechazadas: no cumplen sus precondiciones
extraer G de la frontera antes que S6 por el desempate: objetivo alcanzado, costo 7
```

Una instrumentación completa registra estado normalizado, acción, precondiciones rechazadas, costo acumulado y frente máximo. Debe evitar guardar objetos mutables como claves: estados lógicamente iguales tienen que compararse iguales.

## Planificación y ejecución no son lo mismo

Si el agente ya tiene la llave, el plan simbólico `IrAPuerta` debe ejecutarse mediante navegación y locomoción. Puede quedar `EnCurso`, tener éxito o fallar. Antes de iniciar cada acción se vuelven a comprobar precondiciones; al finalizar se validan efectos observados, no se los supone automáticamente.

```text
planificar → [IrAPuerta, AbrirPuerta, EntrarSala]
ejecutar IrAPuerta → puerta bloqueada por caja → Fallo
actualizar estado observado → invalidar plan → replanificar o abortar
```

Replanificar cada cuadro desperdicia recursos y crea inestabilidad. Conviene hacerlo cuando falla una acción, cambia una precondición relevante, aparece un objetivo de mayor prioridad o vence el plan.

## Objetivos y selección

GOAP no decide necesariamente qué objetivo perseguir. Una capa superior puede elegir `Sobrevivir`, `Capturar` o `Investigar` mediante prioridad o utilidad; GOAP busca cómo satisfacerlo. El objetivo necesita condición de éxito y relevancia actual. Si ya está satisfecho, el plan válido es vacío, no fracaso.

## Heurísticas y rendimiento

Una heurística simple cuenta hechos del objetivo aún insatisfechos, pero puede no representar costos reales. Para conservar optimalidad debe ser admisible. En juegos suele aceptarse un plan suficientemente bueno con presupuestos de expansiones, planificación distribuida entre cuadros o costos aproximados. El límite debe producir `presupuesto-agotado`, distinto de `sin-plan`.

Reducir hechos irrelevantes evita explosión combinatoria. No incluir posiciones continuas completas en el estado simbólico: usar relaciones como `juntoPuerta` y delegar geometría a navegación.

## Estrategia de comprobación

- Acción aplicable sólo cuando todas sus precondiciones se cumplen.
- Efectos sin mutar el estado padre.
- Plan mínimo conocido y alternativa de mayor costo.
- Objetivo ya satisfecho y objetivo imposible.
- Ciclos de acciones y costos positivos.
- Cambio de mundo durante ejecución y replanificación.
- Presupuesto agotado separado de ausencia de plan.
- Ejecutor que no produce el efecto prometido.

## Límites

El espacio crece con hechos y acciones. Mantener coherencia entre modelo simbólico y mundo real exige trabajo. Los planes pueden ser difíciles de anticipar para diseño y jugadores. Para cinco conductas fijas, una FSM suele ser más legible; GOAP se justifica cuando la recombinación aporta experiencia real.

## Errores frecuentes

- Confundir el objetivo con una acción (`objetivo=atacar`).
- Aplicar efectos al comenzar aunque la acción física falle.
- Omitir del costo consecuencias como tiempo, peligro o ruido.
- Replanificar sin evento relevante.
- Permitir costos negativos y ciclos que reducen costo indefinidamente.
- Afirmar `sin-plan` al agotar un presupuesto de búsqueda.

## Comprobación

1. ¿Qué separa la descripción simbólica del procedimiento de una acción?
2. ¿Cuándo debe invalidarse un plan en ejecución?
3. ¿Por qué un objetivo satisfecho produce un plan vacío?
4. ¿Qué consecuencia de `ForzarPuerta` debería modelarse en sigilo?

## Actividad relacionada

Contrastá GOAP con FSM, BT y utilidad en [selección e intención de diseño](07-seleccion-e-intencion-de-diseno.md).

## Bibliografía comentada

- Poole, D. L. y Mackworth, A. K. (2023). *Artificial Intelligence: Foundations of Computational Agents* (3.ª ed.). Consultar representación de estados, planificación y búsqueda heurística. https://artint.info/
- Millington, I. y Funge, J. (2016). *Artificial Intelligence for Games* (3.ª ed.). Leer planificación orientada a objetivos y ejecución de acciones en juegos.
- Rabin, S. (ed.). (2013). *Game AI Pro: Collected Wisdom of Game AI Professionals*. Consultar experiencias de planificación aplicada en producción.
