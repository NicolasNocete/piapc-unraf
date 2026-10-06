# Tareas

- [x] T1: localizar las cuatro puertas y confirmar que la base no restringe tipos. FR-001/002/003/004.
- [x] T2: implementar regla compartida y aplicarla en las cuatro puertas. AC-001/002/003.
- [x] T3: ejecutar regresiones, check y registrar disponibilidad de runtime. AC-004.

## Verificación

- `npm run test:content`: seis pruebas aprobadas; incluyen matriz de tipos y las consignas reales de upgrades/navegación, y exclusión del apunte teórico.
- `npm run check`: lint, typecheck, content:check y build aprobados.
- `git diff --check`: sin errores.
- Revisión estática: formulario, Server Action, índice y detalle docente invocan `acceptsDeliveries`.
- Se preservan verificación de identidad, rol estudiante y autorización de profesor responsable; el RPC y la base no se modifican.
- No se detectó servidor de desarrollo activo ni sesión autenticada de prueba: no se verificó en navegador ni se registraron entregas reales. Se solicitó puerto al usuario para una comprobación visual si tiene un servidor abierto.
