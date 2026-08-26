---
id: eje-03-laboratorio-agente-controlado
titulo: Laboratorio de agente controlado
eje: 3
orden: 8
tipo: laboratorio
nivel: obligatorio
audiencia: estudiante
clases: [4]
modalidad: presencial
duracion_minutos: 75
resultados: [RA1, RA2, RA5, RA6, RA8, RA10, RA11]
prerrequisitos: [eje-03-herramientas-estado-y-realimentacion, eje-03-terminacion-planificacion-y-recuperacion, eje-03-primeros-pasos-opencode]
evaluable: true
acceso: publico
version: 1
---

# Laboratorio de agente controlado

## Situación problemática

El equipo recibe un proyecto de sigilo existente y una solicitud acotada: explicar cómo se determina el destino del guardia y comprobar si la validación disponible respalda esa explicación. Se utilizará OpenCode como laboratorio de referencia, con lectura y ejecución controladas. El objetivo no es obtener mucho código, sino observar el ciclo del agente y conservar evidencia.

## Objetivo

Al finalizar, cada equipo podrá:

- distinguir inferencias del modelo, acciones de herramientas y resultados del entorno;
- configurar alcance, permisos y un contrato de terminación;
- registrar observar, decidir, actuar, verificar y ajustar sin pedir razonamientos internos privados;
- decidir si la tarea necesita chat, workflow o agente.

## Recursos disponibles

- [Laboratorio Guardia de Sigilo](https://github.com/NicolasNocete/piapc-guardia-sigilo), provisto por la cátedra.
- OpenCode o un agente equivalente con registro de herramientas.
- Editor, terminal, Git y los comandos documentados por el proyecto.
- [Lectura de arquitectura y ciclo](02-arquitectura-y-ciclo.md).
- [Lectura de herramientas y realimentación](03-herramientas-estado-y-realimentacion.md).
- [Traza saneada y autocontenida de un agente controlado](../../transversales/eje-03-traza-agente-controlado.md), para análisis sin modelo.

## Restricciones

- Trabajar sólo en una copia o rama preparada por la cátedra.
- Comenzar con herramientas de lectura y búsqueda; solicitar aprobación antes de escribir.
- No instalar dependencias, publicar, hacer commit, leer secretos ni acceder fuera del proyecto.
- No desactivar pruebas ni modificar criterios para conseguir un resultado favorable.
- Máximo: 12 llamadas de herramienta, 35 minutos de ejecución agéntica y el presupuesto indicado por la cátedra.
- Detenerse ante conflicto con cambios existentes, acción destructiva, permiso insuficiente o dos intentos equivalentes sin nueva evidencia.
- No entregar cadenas privadas de pensamiento. Registrar decisiones operativas breves y evidencia observable.

## Procedimiento

1. Leer las instrucciones del proyecto, su arquitectura y permisos recomendados antes de pedir cambios.
2. Redactar un contrato con objetivo, fuera de alcance, evidencia de éxito, límites y condiciones de escalamiento.
3. Clasificar la tarea: explicar por qué conviene chat, workflow o agente. Si se usa agente, justificar la autonomía mínima.
4. Configurar permisos de sólo lectura. Pedir al agente que mapee el recorrido desde la entrada del jugador o evento perceptual hasta el destino del guardia, citando archivos y símbolos.
5. Registrar por cada ciclo: observación relevante, acción seleccionada, herramienta, resultado y decisión `continuar`, `ajustar`, `terminar` o `escalar`.
6. Contrastar al menos dos afirmaciones del agente con archivos, búsquedas o ejecución. Marcar evidencia, supuesto y dato faltante.
7. Pedir un plan de validación. No solicitar razonamientos internos; exigir pasos, criterios, riesgos y comandos verificables.
8. Autorizar únicamente los comandos de validación documentados. Registrar código de salida y resultado relevante.
9. Si la cátedra entrega una variante con un fallo pequeño, habilitar escritura sólo en el alcance indicado. Inspeccionar la diferencia antes de ejecutar validación completa.
10. Aplicar las condiciones de salida. Si falta información o se agota un límite, escalar con una pregunta concreta en vez de continuar.
11. Revisar la traza y separar lo afirmado por el modelo de lo comprobado en el entorno.
12. Restaurar o conservar los cambios según indique la cátedra y comprobar el estado final de Git.

## Tips orientativos para resolver la práctica

Los siguientes modelos orientan el registro y el razonamiento. Adaptalos a la evidencia que encuentres en el repositorio o en la traza: no reemplazan la exploración ni constituyen respuestas únicas.

### Contrato de ejecución

> **Objetivo:** explicar cómo una selección en el mapa determina el destino del guardia.<br>
> **Fuera de alcance:** modificar código, instalar dependencias, publicar cambios o leer secretos.<br>
> **Evidencia de éxito:** rutas y símbolos citados, dos afirmaciones contrastadas y resultado de una validación autorizada.<br>
> **Permisos:** lectura de archivos, búsqueda de texto y ejecución de `npm run validate`.<br>
> **Detención:** detenerse y consultar al docente si falta documentación, se necesita escribir archivos o un comando no está autorizado.

### Clasificación y autonomía mínima

Podés justificar un agente controlado de este modo: debe buscar información en varios archivos, conservar lo encontrado y contrastarlo con una validación. Un chat no consulta el repositorio y un workflow fijo no se adapta al siguiente archivo que conviene revisar según los hallazgos. La autonomía mínima necesaria es lectura, búsqueda y un comando autorizado.

### Exploración inicial y flujo observado

Comenzá leyendo `README.md`, `AGENTS.md` y la documentación de arquitectura. Luego buscá términos como `guardia`, `destino`, `BFS`, `A*`, `click` o `pointer`. No pidas ediciones ni ejecutes comandos no indicados.

Para registrar el flujo, completá una afirmación con evidencia concreta: “El clic en el mapa se recibe en `[ruta]:[símbolo del manejador]`. Ese manejador actualiza `[estado o función]` en `[ruta]`; luego `[función de navegación]` calcula una ruta con BFS o A* y `[símbolo]` asigna o actualiza el destino del guardia.” Reemplazá cada corchete sólo con rutas y símbolos comprobados.

### Contraste y validación

Contrastá afirmaciones específicas, no conclusiones generales:

| Afirmación | Cómo contrastarla | Resultado que la confirma |
| --- | --- | --- |
| “El usuario selecciona el destino con un clic.” | Buscar el manejador de clic y leer su implementación. | El código transforma el clic en una celda o destino. |
| “La tecla Espacio alterna BFS y A*.” | Revisar la documentación y el manejador de teclado. | Ambas fuentes coinciden o el código lo demuestra. |

Para el plan de validación, podés registrar: “Ejecutar `npm run validate`, porque está documentado. El criterio observable es que termine con código de salida 0 y reporte las verificaciones aprobadas. Si falla, registrar el mensaje; no corregir ni ejecutar comandos adicionales sin autorización.”

### Registro de un ciclo

| Observación | Acción | Herramienta | Resultado | Verificación | Decisión |
| --- | --- | --- | --- | --- | --- |
| La guía indica que el destino se selecciona en el mapa. | Buscar `click` y `destino`. | Búsqueda de texto. | Se localiza un manejador en una ruta concreta. | Leer la función y comprobar que actualiza el estado. | Continuar hacia la función de navegación. |

## Entregable

Un informe breve en Markdown con:

- clasificación y arquitectura observada;
- contrato de ejecución y permisos efectivos;
- tabla del ciclo operativo;
- diagrama de componentes y flujo de información;
- afirmaciones comprobadas, evidencia y dudas;
- diferencias realizadas, si las hubo;
- condición de terminación aplicada;
- decisión humana final y límites encontrados.

Tabla sugerida:

| Paso | Observación | Acción/herramienta | Resultado | Verificación | Decisión |
|---:|---|---|---|---|---|
| 1 | ... | ... | ... | ... | continuar/ajustar/terminar/escalar |

## Evidencia válida

- rutas y fragmentos relevantes inspeccionados;
- entradas, resultados y errores de herramientas;
- códigos de salida y registros de validación;
- diferencia de Git acotada;
- ejecución reproducible o inspección docente;
- decisiones humanas y motivo de terminación.

No bastan una captura aislada, una transcripción completa sin análisis ni la frase del agente “todo funciona”. No se incluyen credenciales ni datos privados.

## Criterios de evaluación

- Clasifica el sistema por su control efectivo y no por su interfaz.
- Relaciona modelo, instrucciones, contexto, estado, memoria recuperable, herramientas y entorno.
- Reconstruye el ciclo con evidencia, sin atribuir acciones directas al modelo.
- Aplica permisos mínimos, límites y escalamiento.
- Comprueba afirmaciones mediante artefactos externos.
- Distingue éxito, aborto seguro y presupuesto agotado.
- Explica limitaciones y conserva trazabilidad suficiente.

## Alternativa sin modelos pagos

Puede utilizarse un modelo local compatible, trabajo por parejas donde una persona simula la política de decisión, o la [traza pública provista](../../transversales/eje-03-traza-agente-controlado.md). En todos los casos se analizan los mismos eventos de herramientas y el mismo repositorio; la capacidad de pago no cambia la evidencia exigida.

## Condición de publicación de la solución

La eventual variante resuelta y las orientaciones específicas se publicarán después del cierre de la actividad. El informe del equipo no debe incorporar soluciones de otros grupos durante la ejecución.

## Límites y errores frecuentes

- Dar escritura antes de comprender arquitectura y alcance.
- Confundir la explicación plausible de un archivo con evidencia del flujo completo.
- Ejecutar comandos sugeridos sin contrastarlos con documentación y permisos.
- Ocultar intervenciones humanas o resultados fallidos.
- Consumir el límite intentando confirmar la misma hipótesis.
- Declarar éxito sin inspeccionar diferencias y validación.

## Comprobación final

1. ¿Puede reconstruirse qué cambió en cada ciclo y por qué?
2. ¿Cada afirmación central remite a evidencia externa al modelo?
3. ¿Los permisos utilizados fueron los mínimos necesarios?
4. ¿La salida coincide con una condición definida antes de ejecutar?

## Bibliografía comentada

- Yao, S. et al. (2023). “ReAct”. Base conceptual para intercalar acciones y observaciones. https://arxiv.org/abs/2210.03629
- Yang, J. et al. (2024). “SWE-agent”. Interfaz entre agente y entorno de desarrollo. https://arxiv.org/abs/2405.15793
- OpenCode. *Documentation*. Consulta operativa sobre agentes, herramientas, reglas y permisos. https://opencode.ai/docs/
