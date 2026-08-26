---
id: eje-05-laboratorio-a-star-fsm
titulo: Laboratorio de A* y FSM
eje: 5
orden: 9
tipo: laboratorio
nivel: obligatorio
audiencia: estudiante
clases: [10]
modalidad: mixta
duracion_minutos: 180
resultados: [RA5, RA7, RA8, RA11]
prerrequisitos: [eje-05-busqueda-y-a-star, eje-05-maquinas-de-estados]
evaluable: true
acceso: publico
version: 1
---

# Laboratorio de A* y FSM

## Situación problemática

El laboratorio [Guardia de Sigilo](https://github.com/NicolasNocete/piapc-guardia-sigilo) dispone de escenario, navegación, percepción y seguimiento. Se debe comprobar A* e incorporar o refactorizar una FSM para que el comportamiento completo sea correcto, legible y reproducible. Puede usarse un proyecto alternativo que ofrezca evidencia equivalente.

## Objetivo

Implementar o revisar dos técnicas obligatorias, A* y FSM, sin mezclar percepción, decisión, búsqueda y locomoción; producir una traza de caso normal y otra de caso límite; y justificar la arquitectura desde la intención de diseño.

## Secuencia por clases

El laboratorio comienza cuando ya están disponibles las lecturas de A* y FSM. Los ejercicios de búsqueda de la clase 9 pertenecen a la [lectura y actividad de búsqueda y A*](01-busqueda-y-a-star.md); preparan este trabajo, pero no son una etapa del laboratorio.

| Clase | Etapa | Alcance |
|---:|---|---|
| 10 | Implementación e integración | Con ambas lecturas disponibles, explorar el proyecto, establecer la línea base, verificar A*, diseñar e implementar la FSM e integrar las capas. |
La clase 11 corresponde al segundo parcial práctico. Su consigna, alcance y criterios son privados y no forman parte de este laboratorio público. La clase 13 corresponde a la entrega del trabajo práctico final y tampoco agrega una etapa ni contenidos propios de este laboratorio.

## Recursos disponibles

- Especificación del producto provista con el laboratorio.
- [Lectura de búsqueda y A*](01-busqueda-y-a-star.md).
- [Lectura de percepción y movimiento](02-percepcion-navegacion-y-steering.md).
- [Lectura de FSM/HFSM](03-maquinas-de-estados.md).
- [Caso integrador](08-caso-integrador-guardia.md).
- Pruebas y comandos ya definidos por el proyecto.

## Restricciones

- Mantener la lógica de dominio independiente del motor y del DOM.
- No agregar dependencias, arte externo ni modelos generativos durante la ejecución (*runtime*).
- No modificar especificaciones para hacer coincidir una implementación defectuosa.
- No mezclar búsqueda con seguimiento o locomoción.
- Conservar estados mínimos: Patrullar, Investigar, Perseguir, Buscar y Regresar.
- Visión tiene prioridad sobre sonido y la última posición cambia sólo por percepción válida.
- Un destino inaccesible debe producir un resultado explícito y recuperación definida.
- Todo cambio asistido por un agente de desarrollo debe revisarse y declararse.

## Procedimiento

### 1. Explorar y especificar

Leé instrucciones, arquitectura, especificaciones, código y pruebas antes de editar. Registrá fuentes consultadas. Convertí el objetivo en criterios observables y declará qué queda fuera de alcance.

### 2. Trazar la línea base

Ejecutá la validación existente. Conservá comando, entorno, resultado y fallos previos. En el proyecto de referencia:

```bash
npm run validate
```

Compará BFS y A* con el mismo mapa, inicio y objetivo. Registrá estado, costo, nodos expandidos, frontera máxima y ruta. No concluyas que A* siempre expande menos a partir de un único caso.

### 3. Verificar A*

Comprobá al menos:

- inicio igual a objetivo;
- extremos inválidos;
- destino inaccesible;
- ruta que evita celdas bloqueadas;
- mismo costo óptimo que BFS en una cuadrícula de costos uniformes;
- mapa con desvío y regla de desempate reproducible.

Si el proyecto usa costos variables, reemplazá la comparación con BFS por un oráculo adecuado y justificá la heurística.

### 4. Diseñar la FSM

Antes del código, prepará una tabla con origen, evento, guarda, destino y acciones. Definí política para eventos simultáneos, reentrada, temporizadores, rutas activas y reinicio. Escribí al menos cuatro invariantes.

### 5. Implementar en cambios pequeños

Separá el núcleo de FSM de la escena. Inyectá eventos y tiempo; evitá depender de cuadros reales en pruebas. Después de cada cambio coherente, ejecutá las pruebas relacionadas e inspeccioná las diferencias. Si usás un agente de desarrollo, pedile alcance acotado y evidencia, pero verificá personalmente cada afirmación.

### 6. Probar secuencias

Automatizá como mínimo:

```text
Patrullar →(sonido) Investigar →(llegada) Buscar
Buscar →(tiempo) Regresar →(llegada) Patrullar
cualquier estado activo →(visión) Perseguir
Perseguir →(pérdida con memoria) Investigar
```

Incluí guarda falsa, sonido y visión simultáneos, destino inaccesible, evento repetido y reinicio durante persecución. Comprobá invariantes después de cada evento.

### 7. Ejecutar y observar

Reproducí una secuencia normal y un caso límite en el producto. La telemetría debe mostrar estado actual/anterior, evento causante, razón perceptual, memoria y ruta. Confirmá que representación visual y comportamiento real coinciden.

### 8. Revisar

Ejecutá la validación completa, inspeccioná todos los cambios y buscá regresiones. Explicá un límite no resuelto y por qué FSM fue apropiada o qué evidencia justificaría migrar a otra técnica.

## Entregable

- Especificación acotada y tabla de transición.
- Cambios de código revisables.
- Pruebas automatizadas de A* y FSM.
- Dos trazas reproducibles: caso normal y caso límite.
- Registro de comandos y resultados.
- Revisión breve de diseño, limitaciones y uso de IA.

## Evidencia válida

Son válidos los resultados completos de pruebas, diferencias de código inspeccionadas, trazas estructuradas y una ejecución reproducible. No bastan una respuesta afirmativa del agente, una captura aislada, código sin ejecutar ni el estado final sin secuencia causal.

## Criterios de evaluación

1. A* devuelve ruta, costo, métricas y fallos explícitos correctamente.
2. La FSM expresa eventos, guardas, prioridades e invariantes sin mezclar capas.
3. Las pruebas cubren secuencias, límites y recuperación, no sólo estados aislados.
4. La telemetría permite explicar decisiones y reproducir fallos.
5. La solución preserva arquitectura, legibilidad y rendimiento razonable.
6. La selección técnica se justifica desde la experiencia del jugador.
7. La intervención agéntica, si existió, conserva trazabilidad y revisión humana.

## Alternativa sin modelos pagos

La actividad puede realizarse completamente con editor, terminal y herramientas locales. Si no se dispone de agente, registrá decisiones y comandos manuales. Si no se usa Phaser, el proyecto alternativo debe conservar estados, casos, pruebas y evidencia equivalentes.

## Publicación de solución

No se proporciona una solución anticipada. La puesta en común ocurre después de la entrega; cada estudiante debe poder defender individualmente el código y las decisiones presentadas.
