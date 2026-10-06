# Aviso para campus — entrega del 6/10 y clase asincrónica del 7/10

Texto listo para enviar el 6/10/2026. Los nombres de materiales coinciden con los enlaces de Próximas acciones. Se indica cómo acceder desde el sitio de la cátedra sin inventar una URL pública.

---

**Asunto: PIAPC — entrega de hoy y trabajo asincrónico de navegación para el 14/10**

Hola a todos:

Les recuerdo que **hoy, martes 6 de octubre, a las 23:59 vence la entrega de los cinco upgrades** del laboratorio de intervención agéntica completa. Revisen que cada mejora incluya su spec, plan, build o ejecución reproducible, validación, evidencia y revisión de los cambios. Entreguen en la plataforma la **URL del repositorio individual y el commit final**, con los cinco paquetes completos y la documentación correspondiente.

La consigna y la guía de ese trabajo siguen enlazadas en **Próximas acciones**, en el sitio de la cátedra, para que puedan comprobar qué deben entregar hoy.

## Clase del miércoles 7/10: virtual asincrónica

Según el cronograma, **la clase de mañana, miércoles 7 de octubre, es virtual asincrónica**. No tendremos encuentro presencial ni una sesión sincrónica: trabajarán con los materiales y la actividad durante la semana.

Comenzamos el nuevo tema: **búsqueda de caminos y navegación en videojuegos**. El trabajo incluye **lectura, ejercicios y una práctica nueva**; no consiste solamente en leer el apunte.

En **Próximas acciones** encontrarán los dos materiales nuevos:

- **«IA para videojuegos: navegación y toma de decisiones»**: un único apunte teórico para las clases del 7 y 14 de octubre.
- **«Práctica guiada: especificar y verificar una navegación»**: la actividad paso a paso, con specs prearmadas, ejemplos, prompts para copiar y plantillas del entregable.

## Qué deben hacer, en orden

1. **Leer la Parte I del apunte**, correspondiente al 7/10. Trabajaremos estados, acciones, grafos, BFS, DFS, Dijkstra, A*, heurísticas, percepción, seguimiento de caminos y movimiento. Revisen los ejemplos resueltos y las preguntas de comprobación: les servirán para verificar su comprensión, sin un informe adicional.
2. **Abrir la práctica guiada y explorar su repositorio individual**, conservando las mejoras realizadas anteriormente. Identifiquen dónde se calcula la ruta, dónde se sigue y qué parte del proyecto consume el resultado.
3. **Copiar la spec común y elegir una sola variante**: A, terreno lento; B, zonas expuestas; o C, bloqueo dinámico. Las tres opciones ya tienen requisitos, casos y resultados esperados. No deben hacer todas ni inventar una spec desde cero: deben revisar y adaptar la elegida al proyecto que tienen.
4. **Realizar los ejercicios de comparación**: ejecutar BFS y A* sobre el mismo mapa, explicar la traza de DFS y completar los costos del ejemplo de Dijkstra. No se pide implementar los cuatro algoritmos. Registren los resultados dentro de `evidencia.md`, no en una entrega separada.
5. **Revisar la spec y el plan antes de implementar**. La guía incluye prompts orientativos para cada etapa. No acepten cambios sólo porque el agente afirma que funcionan; contrasten las propuestas con el código y los criterios establecidos.
6. **Implementar o configurar la única variante seleccionada**, siguiendo los incrementos de la guía. Comprueben el caso normal, el caso límite y que el consumidor real del proyecto utiliza el resultado. Ejecuten la validación y revisen las diferencias.
7. **Completar los tres documentos del entregable** con las plantillas provistas. Mantengan el registro breve y concreto: resultados reales, pruebas, decisiones humanas y limitaciones; no hace falta transcribir todo el chat.

## Próxima entrega: todo junto el miércoles 14/10

La nueva práctica de navegación se entrega **completa, en una única entrega, en la clase del miércoles 14 de octubre**. No hay entregas intermedias.

El paquete debe incluir:

- `docs/practica-navegacion/spec.md`: spec común y un solo anexo seleccionado, revisados y adaptados.
- `docs/practica-navegacion/plan.md`: plan breve de trabajo.
- `docs/practica-navegacion/evidencia.md`: comparación, ejercicios, comprobaciones de la variante, validación y conclusión.
- URL del repositorio individual y commit final que contenga el trabajo y su documentación.

**Son dos entregas diferentes:** hoy cierra el trabajo de cinco upgrades; el 14/10 se entrega todo el trabajo nuevo de navegación. No tienen que volver a entregar los cinco upgrades como si fueran parte de la práctica nueva.

Antes del encuentro **presencial del 14/10**, lean también la **Parte II del apunte**, sobre máquinas de estados, árboles de comportamiento, sistemas de utilidad y GOAP. Esa lectura prepara la próxima clase; **la entrega de navegación no exige implementar esos patrones**, que trabajaremos en ese encuentro.

Sigan los ocho pasos de la guía y trabajen una mejora acotada. Si aparece un problema, conserven el error o la reproducción concreta y el criterio que están intentando comprobar para poder consultarlo. Pueden realizar la actividad sin un modelo pago: los ejemplos, specs y resultados esperados ya están incluidos.

Saludos,

Nicolás
