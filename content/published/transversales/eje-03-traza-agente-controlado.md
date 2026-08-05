---
id: transversal-eje-03-traza-agente-controlado
titulo: Traza saneada de un agente controlado
tipo: referencia
audiencia: estudiante
acceso: publico
version: 1
---

# Traza saneada de un agente controlado

Registro autocontenido para analizar el laboratorio sin ejecutar un modelo. Es una **traza de ejercicio**, no una demostración correcta: las afirmaciones del agente pueden ser incompletas o erróneas y las decisiones humanas deben evaluarse. No contiene razonamiento interno, credenciales ni datos personales.

## Encargo y entorno

- Solicitud: `Explica cómo se determina el destino del guardia y comprueba si la validación disponible respalda la explicación.`
- Proyecto: `guardia-sigilo`, instantánea didáctica `0.1.0`, estado Git inicial limpio.
- Permisos iniciales: lectura y búsqueda en el proyecto; escritura, red, instalación, publicación y lectura de secretos denegadas; scripts declarados requieren aprobación.
- Límites: 12 llamadas, 35 minutos, detener tras dos intentos equivalentes o ante acción fuera de alcance.
- Evidencia de éxito declarada por la persona operadora: rutas y símbolos citados, dos afirmaciones contrastadas y resultado de un script documentado.

## Eventos

| Paso | Actor | Acción o herramienta | Entrada resumida | Resultado observable | Tiempo acumulado |
|---:|---|---|---|---|---:|
| 1 | agente | leer | `AGENTS.md`, `README.md` | Reglas: leer especificación, arquitectura y permisos; `npm run validate` antes de terminar. README: clic elige destino, espacio compara BFS/A*. | 02:10 |
| 2 | agente | leer | `specs/01-producto.md`, `docs/arquitectura.md`, `docs/permisos-recomendados.md` | Arquitectura separa `game`, `application` y `domain`; validación permitida sólo mediante scripts declarados. | 05:40 |
| 3 | agente | buscar | `pointer|navigationGoal|calculateRoute|advanceAlongPath` en `src/` | Coincidencias en `GameScene.ts`, `navigationDemo.ts`, `search.ts` y `pathFollower.ts`. | 07:05 |
| 4 | agente | leer | `GameScene.ts:214-288` | `handlePointerDown` asigna `navigationGoal`; `renderNavigation` llama `calculateRoute`; una ruta exitosa se convierte con `cellCenter`; `updateGuardMovement` llama `advanceAlongPath`. | 10:20 |
| 5 | agente | leer | `navigationDemo.ts:1-18` y cabecera de `search.ts` | `calculateRoute` selecciona `findPathAStar` si `algorithm === "astar"`; en otro caso usa BFS. | 13:00 |
| 6 | agente | mensaje | afirmación intermedia | `El sistema de percepción fija navigationGoal con la última posición conocida y GameScene ordena a A* perseguirla.` | 14:10 |
| 7 | persona | decisión | contrastar afirmación antes de continuar | Solicita buscar todas las escrituras de `navigationGoal` y `perceptionMemory`. No autoriza escritura. | 15:00 |
| 8 | agente | buscar | asignaciones de ambos símbolos | `navigationGoal` se inicializa y se asigna en `handlePointerDown`; `perceptionMemory` se actualiza en `updatePerception`. No aparece una asignación entre ambos símbolos. | 17:25 |
| 9 | agente | leer | `docs/h3-percepcion-movimiento.md:20-60` | El documento indica que ver u oír actualiza memoria pero no inicia persecución; los destinos son indicados por una persona en H3. | 19:05 |
| 10 | agente | mensaje | plan de validación | Propone `npm test -- navigation`, abrir servidor y comprobar clic. No indica el script exacto ni criterio para el resultado visual. | 21:15 |
| 11 | persona | decisión | ajustar y aprobar sólo script declarado | Autoriza `npm run test:run -- tests/navigation`; deniega iniciar servidor porque no es necesario para la evidencia mínima declarada. | 22:00 |
| 12 | agente | terminal | `npm run test:run -- tests/navigation` | Código `0`. Vitest informa `2` archivos, `15` pruebas aprobadas, duración `712 ms`. No se ejecutaron pruebas de `GameScene` ni una revisión visual. | 23:12 |

## Extractos inspeccionados

```ts
private handlePointerDown(pointer: Phaser.Input.Pointer): void {
  this.navigationGoal = worldToCell({ x: pointer.worldX, y: pointer.worldY }, TILE_SIZE);
  this.renderNavigation();
}

const result = calculateRoute(LAB_MAP, guardCell, this.navigationGoal, this.navigationAlgorithm);
this.guardWaypoints = result.status === "success"
  ? result.path.map((point) => cellCenter(point, TILE_SIZE))
  : [];
```

```ts
export function calculateRoute(map, start, goal, algorithm): SearchResult {
  return algorithm === "astar"
    ? findPathAStar(map, start, goal)
    : findPathBfs(map, start, goal);
}
```

## Resultado de terminal saneado

```text
> piapc-guardia-sigilo@0.1.0 test:run
> vitest run tests/navigation

 PASS tests/navigation/search.test.ts (11 tests)
 PASS tests/navigation/pathFollower.test.ts (4 tests)
 Test Files  2 passed (2)
 Tests       15 passed (15)
 Duration    712ms
exit_code=0
```

Estado final registrado: Git limpio; llamadas consumidas `12/12`; escritura `0`; red `0`; instalaciones `0`. La traza termina por presupuesto de llamadas, sin mensaje final del agente.

## Uso del paquete

Reconstruye los ciclos, clasifica afirmaciones como comprobadas, supuestas o refutadas, evalúa permisos y terminación, y decide qué demuestra realmente la validación. No se proporciona tabla resuelta ni decisión final.
