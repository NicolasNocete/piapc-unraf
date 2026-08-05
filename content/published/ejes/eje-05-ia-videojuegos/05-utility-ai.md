---
id: eje-05-utility-ai
titulo: Sistemas de utilidad
eje: 5
orden: 5
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

# Sistemas de utilidad

## Propósito

Modelar alternativas, convertir consideraciones mediante curvas comparables, combinar puntuaciones normalizadas y seleccionar una acción de forma controlable y verificable.

## Por qué importa

Cuando hambre, salud, peligro y distancia cambian continuamente, una cascada de reglas puede producir umbrales rígidos. Un sistema de utilidad (*Utility AI*) pregunta cuánto conviene cada alternativa en la situación actual.

## Modelo mental

1. Enumerar **alternativas** ejecutables: atacar, cubrirse, curarse, patrullar.
2. Medir **consideraciones**: salud, munición, distancia, exposición.
3. Normalizar cada entrada a un intervalo común, usualmente `[0,1]`.
4. Transformarla mediante una **curva de respuesta**.
5. Combinar respuestas en una puntuación por alternativa.
6. Filtrar opciones inválidas y seleccionar según una política explícita.

La puntuación no es probabilidad ni verdad moral: es una preferencia diseñada.

## Normalización y curvas

Para distancia limitada a 20 metros:

```text
d = limitar(distancia / 20, 0, 1)
cercanía = 1 - d
```

Una curva lineal conserva proporción. Una curva cuadrática `x²` exige valores altos; una raíz cuadrada responde pronto; una curva escalonada crea un umbral; una curva logística suaviza una transición. Deben graficarse o tabularse: pequeños cambios de parámetros pueden alterar mucho la experiencia.

| `x` | lineal `x` | cuadrática `x²` | escalón `x>=0,6` |
|---:|---:|---:|---:|
| 0,3 | 0,30 | 0,09 | 0 |
| 0,6 | 0,60 | 0,36 | 1 |
| 0,9 | 0,90 | 0,81 | 1 |

La entrada debe tener unidad y rango documentados. Normalizar salud con máximo incorrecto vuelve incomparables las puntuaciones.

## Combinación

Una suma ponderada permite compensación:

```text
U(atacar) = 0,6*cercanía + 0,4*munición
```

Aunque no haya munición, cercanía podría dar una puntuación alta. Si todas las consideraciones son necesarias, el producto expresa veto suave:

```text
U(atacar) = cercanía * munición * confianza
```

Un cero anula la opción y muchos factores menores que 1 reducen excesivamente el resultado. Otra estrategia separa **precondiciones duras** (`munición > 0`) de la puntuación. Pesos no normalizados pueden hacer que una alternativa gane sólo porque suma más factores.

## Caso y traza

Un guardia considera `Perseguir`, `Investigar` y `Cubrirse`. Entradas ya normalizadas:

```text
veJugador=1; cercanía=0,70; memoriaSonido=0,50;
peligro=0,80; saludBaja=0,75
```

```text
Perseguir   = veJugador * (0,7*cercanía + 0,3*(1-peligro))
            = 1 * (0,49 + 0,06) = 0,55
Investigar  = memoriaSonido * (1-peligro) = 0,10
Cubrirse    = peligro * saludBaja = 0,60
```

Resultado: `Cubrirse`. La traza debe conservar entradas crudas, normalizadas, respuesta de cada curva, combinación, opciones filtradas, puntuación final y desempate. Así diseño puede discutir si el peso produce la intención deseada.

## Selección y estabilidad

Elegir siempre el máximo es determinista y fácil de depurar, pero dos opciones cercanas pueden alternar cada cuadro. Medidas posibles:

- **Inercia:** bonificación pequeña a la acción actual.
- **Histéresis:** cambiar sólo si la nueva supera por un margen.
- **Enfriamiento:** impedir reevaluación durante un tiempo razonable.
- **Compromiso:** mantener una acción hasta un punto interrumpible.
- **Selección ponderada:** sortear entre puntuaciones, con semilla para reproducir.

La aleatoriedad no corrige una función mal diseñada. Debe existir una alternativa de reserva, como `Esperar`, si todas puntúan cero. Los empates necesitan regla estable.

## Estrategia de comprobación

Probar cada capa por separado:

- límites y valores fuera de rango de normalización;
- puntos representativos de cada curva;
- veto y compensación al combinar;
- empate, todas cero, `NaN` e infinito;
- estabilidad alrededor de un umbral;
- distribución con semilla si hay selección aleatoria;
- escenarios de diseño: baja salud, enemigo lejano, sin munición.

Además de pruebas unitarias, registrar porcentaje de tiempo en cada acción y cantidad de cambios por minuto. Un sistema técnicamente correcto puede producir conducta frenética o una opción dominante.

## Límites

Utility AI selecciona, pero no descompone por sí sola una tarea larga. Las curvas y pesos crecen como parámetros difíciles de razonar en conjunto. Comparar escalas mal normalizadas invalida el sistema. Si las reglas son pocas y categóricas, una FSM puede ser más clara y barata.

## Errores frecuentes

- Llamar “utilidad” a una cadena de `if` sin puntuaciones comparables.
- Mezclar metros, porcentajes y booleanos sin normalización.
- Añadir más consideraciones y favorecer por accidente una suma mayor.
- Reevaluar cada cuadro sin histéresis.
- Ocultar precondiciones imposibles dentro de una puntuación pequeña.
- No registrar por qué ganó una alternativa.

## Comprobación

1. ¿Cuándo usarías una precondición dura en lugar de una curva?
2. ¿Qué diferencia produce sumar y multiplicar consideraciones?
3. ¿Cómo evitarías alternancia entre puntuaciones `0,61` y `0,60`?
4. ¿Qué datos mínimos exige una traza reproducible?

## Actividad relacionada

Usá la [matriz de selección](07-seleccion-e-intencion-de-diseno.md) para decidir si esta flexibilidad justifica su costo.

## Bibliografía comentada

- Millington, I. y Funge, J. (2016). *Artificial Intelligence for Games* (3.ª ed.). Leer toma de decisiones basada en utilidad y arbitraje de acciones.
- Rabin, S. (ed.). (2013). *Game AI Pro: Collected Wisdom of Game AI Professionals*. Consultar artículos sobre sistemas de utilidad y ajuste para producción.
