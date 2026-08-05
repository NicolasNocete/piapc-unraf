---
id: eje-05-percepcion-navegacion-steering
titulo: Percepción, seguimiento de caminos y movimiento
eje: 5
orden: 2
tipo: lectura
nivel: obligatorio
audiencia: estudiante
clases: [9]
modalidad: mixta
duracion_minutos: 20
resultados: [RA7, RA8, RA11]
prerrequisitos: [eje-05-busqueda-y-a-star]
evaluable: true
acceso: publico
version: 1
---

# Percepción, seguimiento de caminos y movimiento

## Propósito

Separar la información que un agente percibe de la ruta que planifica, el objetivo que sigue, el movimiento que solicita y la locomoción que finalmente aplica.

## Por qué importa

Un guardia que conoce la posición del jugador detrás de una pared hace trampa; uno que encuentra una ruta pero vibra en una esquina falla por movimiento, no por A*. Separar capas permite diseñar mejor y localizar el defecto correcto.

## Modelo mental por capas

```text
mundo real del juego
  → sensores y eventos
  → memoria/estado observado
  → decisión
  → búsqueda de ruta
  → seguimiento de puntos
  → steering
  → locomoción/física/animación
  → mundo modificado
```

La **verdad del mundo** no equivale al **estado observado**. La percepción produce observaciones limitadas; la memoria conserva algunas con marca temporal y confianza. La arquitectura de decisión sólo debería consultar esa interfaz, salvo información deliberadamente pública.

## Percepción

Un sensor visual puede evaluar distancia, ángulo y oclusión. Un sensor sonoro recibe un evento con posición, radio, instante y duración. La ausencia de observación no prueba ausencia del objetivo.

```text
ve = distancia <= alcance
     y ángulo(dirección, objetivo) <= apertura/2
     y línea de visión sin obstáculo
oye = evento vigente y distancia <= radio
```

Conviene devolver no sólo `true/false`, sino razones como `fuera-de-rango`, `fuera-del-cono` u `ocluido`. Eso vuelve depurable la conducta. El muestreo discreto, la latencia y la frecuencia del sensor son parte del diseño: evaluar cien enemigos cada cuadro puede ser innecesario.

La memoria puede almacenar `ultimaPosicion`, `percibidaEn` y `origen`. Debe caducar o degradarse. Invariante útil: la última posición conocida cambia sólo por una percepción válida; no se actualiza leyendo directamente la posición actual del jugador.

## Ruta y seguimiento

La búsqueda devuelve una secuencia de nodos transitables. El **seguimiento de caminos** (*path following*) convierte esa secuencia en un objetivo próximo (*waypoint*):

1. Seleccionar el siguiente punto no alcanzado.
2. Avanzar hacia él sin exceder la distancia disponible del cuadro.
3. Consumir varios puntos si el paso temporal lo permite.
4. Informar fin de ruta o bloqueo.

No asumir “un punto por cuadro”: con un pico de `deltaTime`, el personaje puede atravesar o quedar oscilando alrededor del punto. Un radio de aceptación evita exigir igualdad exacta de números continuos. Suavizar la ruta elimina esquinas, pero cada atajo debe comprobar colisión y radio del agente.

## Comportamientos de movimiento y locomoción

Los comportamientos de movimiento (*steering*) producen velocidades o aceleraciones deseadas:

- **Buscar** (*seek*): acelera hacia un objetivo.
- **Llegar** (*arrive*): reduce velocidad dentro de un radio para detenerse.
- **Huir** (*flee*): se aleja de una amenaza.
- **Separación:** evita amontonamiento.
- **Evasión de obstáculos:** corrige el movimiento local.

Varias solicitudes requieren combinación limitada, ponderada o priorizada. Sumar todo sin límite puede cancelar vectores o superar la capacidad física. La **locomoción** aplica velocidad máxima, aceleración, colisiones, gravedad y rotación, y coordina animación. Puede rechazar parcialmente la solicitud; el sistema debe observar el resultado y detectar atasco.

## Traza de un guardia

```text
t=0.0  visión=ocluido; memoria=vacía; decisión=Patrullar
t=1.2  sonido válido en (8,3); memoria=(8,3, sonido); decisión=Investigar
t=1.3  A*: éxito, costo=6, ruta=[...,(8,3)]
t=1.4  follower: waypoint=(5,3); arrive: velocidad=(70,0)
t=2.1  locomoción: pared dinámica, desplazamiento=0; atasco=1
t=2.4  atasco=3; invalidar ruta y volver a buscar
t=3.0  visión=visible; memoria=(9,4, visión); decisión=Perseguir
```

Cada fila permite atribuir la causa. Si A* informa éxito y el guardia no avanza, se inspeccionan seguimiento, steering o locomoción. Si persigue una posición nunca observada, se inspecciona percepción/memoria.

## Límites

Un cono visual es una abstracción, no visión humana. Un radio sonoro ignora puertas y materiales. Steering local no garantiza salir de mínimos locales ni reemplaza planificación global. Recalcular rutas con cada pequeño cambio puede consumir CPU y crear inestabilidad visual. En multitudes se necesitan técnicas adicionales.

## Errores frecuentes

- Permitir que la decisión lea todo el mundo y luego dibujar un cono sólo como decoración.
- Culpar a A* por una colisión no representada en el grafo.
- Actualizar el objetivo cada cuadro y reiniciar continuamente la ruta.
- Normalizar el vector cero o dividir por `deltaTime=0`.
- Mezclar física del motor dentro del dominio, volviendo difíciles las pruebas.

## Comprobación

1. ¿Qué diferencia hay entre perder visión y olvidar al jugador?
2. ¿Qué capa debe decidir el próximo *waypoint* y cuál debe resolver colisiones?
3. ¿Cómo probarías que un muro bloquea visión pero no necesariamente sonido?
4. ¿Qué telemetría distingue una ruta vencida de un agente atascado?

## Actividad relacionada

El [caso integrador del guardia](08-caso-integrador-guardia.md) conecta estas capas con una FSM.

## Bibliografía comentada

- Millington, I. y Funge, J. (2016). *Artificial Intelligence for Games* (3.ª ed.). Leer las secciones de percepción, movimiento cinemático y dinámico, combinación de steering y seguimiento de caminos.
- Rabin, S. (ed.). (2013). *Game AI Pro: Collected Wisdom of Game AI Professionals*. Consultar como ampliación los artículos sobre movimiento y arquitectura de IA de juegos.
