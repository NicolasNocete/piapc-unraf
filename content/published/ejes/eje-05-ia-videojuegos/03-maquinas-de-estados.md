---
id: eje-05-maquinas-de-estados
titulo: Máquinas de estados finitos y jerárquicas
eje: 5
orden: 3
tipo: lectura
nivel: obligatorio
audiencia: estudiante
clases: [10]
modalidad: presencial
duracion_minutos: 25
resultados: [RA7, RA8, RA11]
prerrequisitos: [eje-05-percepcion-navegacion-steering]
evaluable: true
acceso: publico
version: 1
---

# Máquinas de estados finitos y jerárquicas

## Propósito

Modelar una máquina de estados finitos (FSM) y una FSM jerárquica (HFSM) mediante estados, eventos, transiciones, guardas e invariantes, y comprobar secuencias y casos límite.

## Por qué importa

Una FSM hace explícita la conducta vigente y las condiciones que permiten cambiarla. Esa previsibilidad sirve para enemigos legibles, reglas de prioridad claras y pruebas reproducibles.

## Modelo mental

- **Estado:** modo persistente que determina conducta, por ejemplo `Patrullar`.
- **Evento:** hecho ocurrido, como `JugadorVisto(posición)`.
- **Transición:** cambio permitido entre estado origen y destino.
- **Guarda:** condición booleana que habilita la transición.
- **Acción:** efecto al salir, transicionar, entrar o actualizar un estado.
- **Invariante:** condición que debe cumplirse siempre en un estado o sistema.

Una transición puede expresarse como:

```text
(estado, evento, guarda) → nuevoEstado + acciones
```

El evento describe lo ocurrido; la guarda consulta contexto. No conviene codificar `JugadorVistoYConVidaYNoAturdido` como evento si vida y aturdimiento son condiciones actuales.

## Caso: [guardia de sigilo](https://github.com/NicolasNocete/piapc-guardia-sigilo)

Estados: `Patrullar`, `Investigar`, `Perseguir`, `Buscar`, `Regresar`.

| Origen | Evento | Guarda | Destino | Acción principal |
|---|---|---|---|---|
| cualquiera | `JugadorVisto(p)` | guardia activo | Perseguir | recordar `p`, recalcular ruta |
| Patrullar | `SonidoOído(p)` | no ve jugador | Investigar | recordar `p` |
| Investigar | `DestinoAlcanzado` | no ve jugador | Buscar | iniciar temporizador |
| Perseguir | `VisiónPerdida` | hay posición conocida | Investigar | ir a última posición |
| Buscar | `TiempoAgotado` | no ve jugador | Regresar | elegir patrulla válida |
| Regresar | `PatrullaAlcanzada` | punto válido | Patrullar | continuar circuito |

La prioridad “visión supera sonido” debe estar definida por orden de procesamiento o arbitraje previo. Depender del orden accidental de llamadas produce errores distintos según la tasa de cuadros.

## Acciones de entrada, actualización y salida

`entrar(Perseguir)` puede crear una ruta; `actualizar(Perseguir)` renueva el objetivo a intervalos; `salir(Perseguir)` cancela la ruta anterior. Las acciones deben ser pequeñas e idempotentes cuando sea posible. Si entrar al mismo estado duplica temporizadores, una transición repetida genera fallos.

Una política explícita debe decidir si una transición al mismo estado:

- se ignora;
- reinicia entrada y salida;
- actualiza datos sin reiniciar.

Para `JugadorVisto(p)` suele convenir conservar `Perseguir` y actualizar memoria, no reiniciar toda la conducta cada cuadro.

## Invariantes

Ejemplos comprobables:

- En `Perseguir`, existe una posición observada vigente.
- En `Buscar`, el temporizador es finito y no negativo.
- En `Patrullar`, el objetivo pertenece a los puntos configurados.
- Un guardia deshabilitado no ejecuta movimiento.
- El estado informado coincide con la conducta ejecutada.

Las invariantes detectan combinaciones ilegales que una prueba de transición feliz no descubre. Pueden validarse tras cada evento en pruebas y registrarse como error en desarrollo.

## Traza reproducible

```text
0.0  Patrullar  + SonidoOído(8,3) [no ve] → Investigar
1.2  Investigar + JugadorVisto(9,3) [activo] → Perseguir
2.0  Perseguir  + SonidoOído(2,1) [ve] → Perseguir (ignorado por prioridad)
2.4  Perseguir  + VisiónPerdida [memoria=(9,3)] → Investigar
4.1  Investigar + DestinoAlcanzado [no ve] → Buscar
7.1  Buscar     + TiempoAgotado [no ve] → Regresar
9.0  Regresar   + PatrullaAlcanzada → Patrullar
```

Una traza útil incluye tiempo, origen, evento con datos, resultado de guarda, destino y acciones. No hace falta registrar detalles internos irrelevantes.

## HFSM: reducir repetición con jerarquía

Cuando crecen los estados, las transiciones globales se duplican. Una máquina jerárquica (HFSM) agrupa subestados:

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

`DañoFatal` puede definirse una vez en `Activo → Deshabilitado`. Los eventos se ofrecen primero al subestado y luego al padre, con una regla documentada. La jerarquía comparte transiciones, no convierte automáticamente la arquitectura en más clara: demasiados niveles ocultan qué transición gana.

## Pruebas

Probar una FSM requiere más que visitar cada estado:

- cada transición válida y cada guarda falsa;
- eventos simultáneos y prioridad;
- eventos desconocidos;
- reentrada y eventos repetidos;
- temporizadores en el límite exacto;
- reinicio desde cualquier estado;
- invariantes después de cada paso;
- secuencias completas como la traza anterior.

Una tabla de transición declarativa permite detectar estados inalcanzables y destinos sin salida. La prueba no debe depender de renderizado ni tiempo real: inyectar eventos y tiempo controlado facilita reproducción.

## Límites

Muchas variables ortogonales producen explosión combinatoria: `movimiento × salud × alerta`. Una HFSM reduce repetición, pero no resuelve toda composición. Para conductas muy modulares o selección continua pueden convenir árboles o utilidad. Una FSM enorme con transiciones dispersas pierde legibilidad.

## Errores frecuentes

- Usar un estado como evento (`si estadoVioJugador`) o un evento como estado persistente.
- Ejecutar dos estados en el mismo cuadro por cambiar durante `update` sin una política.
- Ocultar prioridades en una cadena accidental de `if`.
- Cambiar el estado antes de ejecutar la salida y perder contexto.
- Probar métodos aislados sin comprobar secuencias e invariantes.

## Comprobación

1. ¿Qué diferencia semántica hay entre evento, guarda e invariante?
2. ¿Qué debe ocurrir si visión y sonido llegan en el mismo instante?
3. ¿Cuándo una transición al mismo estado debe reiniciar sus acciones?
4. ¿Qué repetición del caso justificaría una HFSM?

## Actividad relacionada

Implementá y verificá una FSM acotada en [el laboratorio de A* y FSM](09-laboratorio-a-star-y-fsm.md).

## Bibliografía comentada

- Millington, I. y Funge, J. (2016). *Artificial Intelligence for Games* (3.ª ed.). Leer toma de decisiones mediante máquinas de estados y máquinas jerárquicas.
- Rabin, S. (ed.). (2013). *Game AI Pro: Collected Wisdom of Game AI Professionals*. Consultar patrones y experiencias de producción sobre arquitecturas de comportamiento.
