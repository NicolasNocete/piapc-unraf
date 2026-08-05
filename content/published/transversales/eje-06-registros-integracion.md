---
id: transversal-eje-06-registros-integracion
titulo: Registros saneados de una integración de producción
tipo: referencia
audiencia: estudiante
acceso: publico
version: 1
---

# Registros saneados de integración

Paquete para ejecutar el laboratorio integrador sin servicio, motor remoto ni modelo pago. `ForjaLocal` es un servicio simulado y todas las identidades son ficticias. Son **datos de ejercicio** deliberadamente imperfectos; los registros no certifican aceptación ni resuelven las inconsistencias.

## Solicitud y especificación

Incidencia simulada `JUEGO-184`: al recoger `llave_santuario`, el inventario debe mostrar el nombre `Llave del Santuario`; el icono debe ser `32 x 32`, fondo transparente y ancla centrada. El identificador de código permanece `sanctuary_key`. Criterio límite: una segunda recolección no duplica el objeto. Alcance autorizado: adaptador de inventario, catálogo de texto, activo y pruebas relacionadas; no publicar ni cerrar la incidencia.

## Contrato de herramienta

```json
{
  "name": "forja_asset",
  "operations": {
    "get": {"input": {"asset_id": "string"}, "effect": "read", "idempotent": true},
    "put": {"input": {"asset_id": "string", "revision": "integer", "sha256": "string"}, "effect": "write", "idempotent": false}
  },
  "errors": [400, 401, 403, 404, 409],
  "authentication": "fictitious bearer token supplied by simulator",
  "authorization": "scope checked per operation"
}
```

## Registro del servicio

La credencial ficticia no se incluye. Su huella irreversible de ejercicio es `sha256:7d9e...c120`.

```jsonl
{"ts":"2026-05-08T14:02:11Z","request_id":"r-301","identity":"alumna-17","authenticated":true,"scopes":["asset:read"],"operation":"get","asset_id":"ui/key_sanctuary","status":200,"revision":4}
{"ts":"2026-05-08T14:03:07Z","request_id":"r-302","identity":"alumna-17","authenticated":true,"scopes":["asset:read"],"operation":"put","asset_id":"ui/key_sanctuary","status":403,"error":"scope_asset_write_required"}
{"ts":"2026-05-08T14:04:20Z","request_id":"r-303","identity":"alumna-17","authenticated":true,"scopes":["asset:read"],"operation":"get","asset_id":"ui/key_sanctuary","status":200,"revision":4}
```

## Metadatos de activo y contrato interdisciplinario recibido

```yaml
asset_id: ui/key_sanctuary
revision: 4
file: assets/ui/key_sanctuary.png
width: 64
height: 64
alpha: true
anchor: [0.5, 0.5]
source: arte-equipo-a
license: proyecto-interno
sha256: 91e5d4b1-exercise-only
consumer: InventoryHud
acceptance: "nombre visible, transparencia, ancla y tamaño según JUEGO-184"
responsible_producer: arte-equipo-a
responsible_consumer: programacion-equipo-b
```

## Cambios propuestos en la copia local

```diff
--- a/src/inventory/catalog.ts
+++ b/src/inventory/catalog.ts
@@
-  sanctuary_key: { label: "Llave santuario", icon: "key_sanctuary" },
+  sanctuary_key: { label: "Llave del Santuario", icon: "key_sanctuary" },

--- a/src/inventory/addItem.ts
+++ b/src/inventory/addItem.ts
@@
-  inventory.push(itemId);
+  if (!inventory.includes(itemId)) inventory.push(itemId);
```

No se modificó el PNG ni su metadato. Estado previo: revisión local `build-218`, árbol limpio. Estado posterior: dos archivos TypeScript modificados, sin commit.

## Validaciones registradas

```text
$ npm run typecheck
exit_code=0

$ npm run test:run -- inventory
PASS catalog.test.ts (3)
PASS addItem.test.ts (4)
Tests: 7 passed (7)
exit_code=0

$ npm run build
build_id=build-219-local
exit_code=0
```

Observación manual, Windows 11, `build-219-local`, 1366 x 768:

```text
14:18:02 Nueva partida; inventario vacío.
14:18:17 Primera recolección: aparece "Llave del Santuario"; cantidad visual 1.
14:18:26 Segunda recolección: cantidad visual 1.
14:18:31 Icono visible y centrado; bordes percibidos como suaves.
14:18:42 Panel de depuración informa textura fuente 64x64, render 32x32.
```

## Borrador local de incidencia

```text
JUEGO-184 - actualización NO PUBLICADA
Cambios: catálogo y prevención de duplicado.
Pruebas: inventory 7/7; build-219-local.
Activo: ui/key_sanctuary revision 4.
Pendiente: revisión de producción.
```

## Uso del paquete

Con estos datos realiza los diez pasos del laboratorio: audita herramienta y permisos, completa el contrato entre disciplinas, separa consulta de acción, construye la matriz de consistencia y decide entre aceptar, corregir, revertir o escalar. Debes explicar qué demuestran y qué no demuestran los estados `200`, `403`, las pruebas y la observación manual. No se incluye una decisión resuelta.
