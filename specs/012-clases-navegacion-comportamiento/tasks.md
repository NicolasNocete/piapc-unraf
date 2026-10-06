# Tareas

- [x] T1: revisar contrato editorial, programa y arquitectura canónica; registrar aprobación y excepción de extensión. FR-008.
- [x] T2: escribir apunte de navegación y comportamiento, ejemplos y bibliografía. FR-001/002; AC-001. Documento fuente redactado y ejemplos revisados editorialmente.
- [x] T3: escribir spec común, variantes, prompts y plantillas con entrega única. FR-003/004/005/006/007; AC-002/003/004. Spec base y tres anexos con resultados conocidos; ocho pasos y plantillas redactados.
- [x] T4: actualizar índice, sincronizar y verificar metadatos/enlaces y ejemplos. FR-008; AC-005.
- [x] T5: preservar publicación, enlazar entrega de hoy y materiales nuevos; redactar aviso y actualizar guía docente. FR-009/010/011.
- [x] T6: validar YAML/IDs, revisar archivo y fechas, ejecutar `npm run check`. AC-006.
- [x] T7: archivar publicación y unificar tarjeta de entrega de upgrades; validar publicación y check. FR-012.
- [x] T8: completar la consigna fuente de upgrades y remitir la guía complementaria a su box; sincronizar y verificar. FR-013.

## Evidencia de verificación

- `npm run content:sync`: réplica y manifiesto generados desde fuentes.
- `npm run content:check`: metadatos, digests y enlaces internos válidos.
- Verificación independiente en memoria con búsqueda por costo: mapa libre 4; ponderado 6; directa 16; bloqueo simple 6; barrera inaccesible; recuperación 4.
- Revisión de trazas: DFS 4 acciones frente a BFS 3; Dijkstra mejora meta de costo 10 a 6; utilidad 0,55/0,10/0,60; GOAP 7 frente a 6.
- Revisión de entrega: base más un anexo, tres documentos y una entrega el 14/10; sin hora inventada, sin implementación de FSM nueva ni segunda variante.
- En la primera etapa documental no se ejecutó build/runtime de la app; las pruebas del laboratorio son instrucciones para estudiantes, no se reportan como ejecutadas aquí. La ampliación semanal sí ejecutó build, como se detalla debajo.

### Verificación de la ampliación semanal

- YAML contrastado con el esquema de publicación; los cinco enlaces corresponden a IDs del manifiesto.
- Archivo editorial idéntico al contenido anterior de `content/upcoming-actions.md` en HEAD, verificado byte a byte.
- Fechas explícitas conservadas: 6/10 23:59 y clase del 14/10; modalidad virtual asincrónica del 7/10 contrastada con cronograma generado.
- `npm run check` aprobado: lint, typecheck, content:check y build de producción.
- Sin servidor de desarrollo descubierto: no se realizó inspección en navegador. No se cambió código de UI.

### Corrección de duplicación y consigna completa

- Una única tarjeta enlaza el laboratorio de upgrades con box habilitado; cuatro enlaces del anuncio validados contra manifiesto.
- Archivo editorial de cinco tarjetas preservado íntegramente respecto a HEAD.
- Consigna fuente versión 3: catálogo de diez opciones original, ciclo y prompts, estructura de cinco paquetes y texto copiable para registrar entrega. Guía complementaria versión 3 remite a esa página.
- `npm run content:sync`, seis pruebas de `npm run test:content` y `npm run check` aprobados. Sin inspección visual autenticada por ausencia de servidor/sesión de prueba.
