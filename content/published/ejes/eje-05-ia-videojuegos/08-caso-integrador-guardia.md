---
id: eje-05-caso-integrador-guardia
titulo: Caso integrador de un guardia de sigilo
eje: 5
orden: 8
tipo: lectura
nivel: obligatorio
audiencia: estudiante
clases: [10]
modalidad: mixta
duracion_minutos: 20
resultados: [RA7, RA8, RA11]
prerrequisitos: [eje-05-seleccion-intencion-diseno]
evaluable: true
acceso: publico
version: 1
---

# Caso integrador de un guardia de sigilo

## Propósito

Integrar percepción, memoria, A*, seguimiento, movimiento y FSM en una conducta trazable, y diagnosticar sus fallos por capa.

## Por qué importa

Los algoritmos aislados pueden aprobar sus pruebas y aun producir un guardia incoherente. La integración exige contratos: qué entrega cada capa, cuándo vence y cómo se informa el fracaso.

## Intención y criterios

El guardia debe ser amenazante pero justo: sólo persigue información percibida, comunica su nivel de alerta y abandona una búsqueda después de un tiempo. Estados: `Patrullar`, `Investigar`, `Perseguir`, `Buscar`, `Regresar`.

Invariantes principales:

- la última posición conocida cambia sólo ante percepción válida;
- ninguna ruta contiene celdas bloqueadas;
- el estado visible coincide con la conducta ejecutada;
- una ruta inaccesible produce recuperación, no inmovilidad silenciosa;
- reiniciar restaura estado, memoria, rutas y temporizadores.

## Contratos entre capas

| Capa | Entrada | Salida observable | Fallo explícito |
|---|---|---|---|
| Percepción | geometría, orientación, eventos | visto/oído, razón, posición, tiempo | configuración inválida |
| Memoria | observación válida | última posición y antigüedad | dato vencido/ausente |
| FSM | estado, eventos, contexto | transición y acciones | evento ignorado/guarda falsa |
| A* | grafo, inicio, objetivo | estado, ruta, costo, métricas | extremos inválidos/inaccesible |
| Seguimiento | posición, ruta, índice, paso | objetivo siguiente y progreso | ruta inválida |
| Movimiento | objetivo y límites | velocidad/aceleración solicitada | objetivo no finito |
| Locomoción | solicitud, física, colisiones | desplazamiento real | bloqueo/atasco |

## Secuencia completa

```text
t=0,0  estado=Patrullar, objetivo=P1
        A*: éxito, costo=4; follower=waypoint 1/4
t=1,0  Q: sonido en (8,3); sensor: oído=true
        FSM: Patrullar → Investigar; memoria=(8,3, sonido, 1,0)
        cancelar ruta P1; A*: ruta a (8,3), costo=6
t=2,0  visión: visible en (9,3)
        FSM: Investigar → Perseguir; memoria=(9,3, visión, 2,0)
t=2,2  visión: ocluida; evento=VisiónPerdida
        FSM: Perseguir → Investigar; conserva (9,3), no posición real
t=4,0  follower: destino alcanzado
        FSM: Investigar → Buscar; temporizador=3 s
t=7,0  no hay percepción; TiempoAgotado
        FSM: Buscar → Regresar; destino=punto de patrulla válido
t=9,0  destino alcanzado; Regresar → Patrullar
```

Dos eventos en el mismo instante se arbitran antes de la FSM: visión tiene prioridad sobre sonido. Una actualización de visión mientras ya persigue renueva memoria y ruta sólo si el objetivo cambió lo suficiente o venció un intervalo; evita recalcular cada cuadro.

## Diagnóstico por síntomas

**Persigue detrás de una pared:** comprobar razón del sensor y que la FSM no lea la posición real. No ajustar A*.

**Ruta atraviesa pared:** conservar mapa, extremos, ruta y celdas bloqueadas; comprobar representación y vecinos.

**Oscila junto a un punto:** inspeccionar radio de llegada, paso temporal y velocidad; la ruta puede ser correcta.

**Alterna investigar/perseguir:** revisar eventos repetidos, reentrada, memoria e histéresis perceptual.

**Queda quieto ante destino imposible:** A* debe devolver `inaccesible`; la FSM debe elegir otro punto, buscar localmente o regresar.

**Después de reiniciar recuerda al jugador:** el reinicio no restauró todo el estado mutable.

## Casos de prueba integrados

| Caso | Estímulo | Resultado esperado | Evidencia |
|---|---|---|---|
| Oclusión | jugador dentro del cono detrás de muro | permanece patrullando | razón `ocluido`, sin transición |
| Prioridad | sonido y visión simultáneos | Perseguir | traza de arbitraje |
| Pérdida | ocultarse durante persecución | va a última posición vista | memoria no cambia al ocultarse |
| Inaccesible | bloquear destino de investigación | recuperación definida | estado A* y transición posterior |
| Pico temporal | paso alcanza varios puntos | no atraviesa paredes ni oscila | progreso del follower |
| Reinicio | reiniciar en Perseguir | configuración inicial completa | instantánea de estado |

Las pruebas de dominio verifican sensores, búsqueda, seguimiento y FSM con tiempo controlado. La ejecución del juego comprueba integración con entrada, física y representación. El *playtesting* responde otra pregunta: ¿la persona entiende por qué el guardia la detectó y cómo evitarlo?

## Observabilidad mínima

Mostrar estado actual/anterior, último evento, última posición conocida, ruta, nodos explorados y razón perceptual. Registrar sólo cambios o muestrear métricas; una línea por agente y cuadro puede ocultar lo relevante y afectar rendimiento.

Para una reproducción conservar mapa y configuración, semilla si existe azar, secuencia temporal de entradas y versión. Una captura final no demuestra la secuencia.

## Límites

El caso usa un guardia y geometría estática. No resuelve coordinación de escuadrones, navegación de multitudes ni mapas que cambian continuamente. La FSM se elige por legibilidad pedagógica, no porque los árboles de comportamiento (*behavior trees*, BT), los sistemas de utilidad (*Utility AI*) o GOAP sean incorrectos.

## Errores frecuentes

- Probar cada módulo pero no sus contratos.
- Corregir un síntoma agregando una transición global sin hallar la capa causal.
- Suponer que efectos planeados ocurrieron sin observar locomoción.
- Registrar sólo el estado final y perder el evento causante.
- Optimizar antes de medir o recortar telemetría antes de estabilizar.

## Comprobación

1. ¿Qué capa es responsable si existe ruta pero el guardia no se desplaza?
2. ¿Por qué la memoria no debe consultar la posición real al perder visión?
3. ¿Qué debe hacer la FSM ante `inaccesible`?
4. ¿Qué evidencia permite reproducir una captura aparentemente injusta?

## Actividad relacionada

Realizá [el laboratorio de A* y FSM](09-laboratorio-a-star-y-fsm.md) sobre el proyecto de referencia o uno equivalente.

## Bibliografía comentada

- Millington, I. y Funge, J. (2016). *Artificial Intelligence for Games* (3.ª ed.). Integrar las secciones de percepción, movimiento, búsqueda y toma de decisiones.
- Rabin, S. (ed.). (2013). *Game AI Pro: Collected Wisdom of Game AI Professionals*. Consultar experiencias sobre arquitectura, telemetría y depuración de IA en juegos.
