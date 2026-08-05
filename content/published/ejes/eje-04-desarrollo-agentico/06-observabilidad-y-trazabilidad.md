---
id: eje-04-observabilidad-y-trazabilidad
titulo: Observabilidad y trazabilidad del proceso
eje: 4
orden: 6
tipo: lectura
nivel: obligatorio
audiencia: estudiante
clases: [8, 12, 13]
modalidad: mixta
duracion_minutos: 20
resultados: [RA5, RA8, RA9, RA11]
prerrequisitos: [eje-04-pruebas-depuracion-y-revision]
evaluable: true
acceso: publico
version: 1
---

# Observabilidad y trazabilidad del proceso

## Propósito

Registrar acciones, resultados y métricas suficientes para reconstruir una intervención y decidir si su calidad justifica el tiempo y costo empleados.

## Por qué importa

El producto final no explica cómo apareció un archivo fuera de alcance, cuántos intentos fallaron ni qué decisión humana evitó publicar. Observar el proceso permite depurar el trabajo agéntico sin solicitar razonamientos internos privados.

## Modelo mental: de eventos a decisiones

La unidad útil es un evento observable:

```text
entrada relevante → acción/herramienta → resultado → decisión
```

Por ejemplo: “criterio C2; ejecutar prueba enfocada; falla transición en 3000 ms; conservar hipótesis y agregar instrumentación”. No hace falta guardar conversación irrelevante ni cadenas de pensamiento. Sí hace falta identificar versión del código, configuración y momento.

## Conceptos centrales: qué registrar

| Dimensión | Registro mínimo |
|---|---|
| Acciones | lecturas, búsquedas, ediciones, comandos y autorizaciones |
| Resultados | rutas, salidas resumidas, códigos de estado y artefactos |
| Duración | inicio/fin definidos; aclarar esperas humanas |
| Iteraciones | ciclos de intento, validación y ajuste |
| Tokens | entrada/salida y modelo, si el proveedor los informa |
| Costos | moneda, tarifa o importe informado; “no disponible” si falta |
| Decisiones | aceptar, corregir, rechazar, revertir, detener o escalar |
| Estado | rama o commit inicial/final y archivos cambiados |

La duración no es sinónimo de latencia del modelo: puede incluir herramientas, compilación, cola e intervención. Una iteración debe tener definición estable. Los tokens permiten comparar consumo sólo cuando modelo, tarea y calidad son comparables.

## Calidad antes que actividad

Muchos comandos o tokens no implican progreso. Las métricas se conectan con resultados:

- criterios cumplidos y regresiones;
- cantidad de iteraciones hasta evidencia válida;
- duración hasta resultado validado;
- intervención humana y motivo;
- costo por tarea aceptada, no sólo por intento.

Si una variante cuesta menos pero falla un criterio obligatorio, no es más eficiente. Para comparar configuraciones se mantiene la misma tarea, versión, permisos y estrategia de validación, y se repiten ejecuciones cuando existe variabilidad.

## Trazabilidad sin exposición indebida

El registro debe permitir reconstruir decisiones, pero excluye secretos, datos personales, código privado innecesario y razonamientos internos del modelo. Se pueden resumir entradas relevantes, conservar salidas de pruebas y referenciar diffs. El acceso y la retención del registro también requieren reglas.

## Caso aplicado

Dos intervenciones corrigen el temporizador del guardia. A usa tres iteraciones, 14 minutos y pruebas completas; B usa una iteración y 6 minutos, pero sólo compila. Sin ejecutar el mismo conjunto de criterios no existe comparación válida. Tras validar, B revela una regresión al recuperar visión. La observabilidad explica el costo; la evidencia decide la aceptación.

## OpenCode como laboratorio

En OpenCode pueden observarse mensajes, llamadas a herramientas, resultados, permisos y, según proveedor, consumo. Sus reglas de proyecto y comandos personalizados sirven para practicar contexto persistente y validaciones repetibles. No se debe inferir que sus nombres de archivos, comandos o interfaz son estándares.

La transferencia consiste en poder localizar equivalentes en otra herramienta:

| Necesidad | Equivalente transferible |
|---|---|
| Reglas persistentes | mecanismo de instrucciones de proyecto |
| Acción externa | herramienta con permisos y resultado |
| Validación repetible | script versionado independiente del agente |
| Registro | eventos exportables o bitácora propia |
| Recuperación | control de versiones y punto de retorno |

## Límites

Registrar todo puede elevar costo, ruido y riesgo de exposición. Los contadores de proveedores pueden no ser comparables y los precios cambian. La ausencia de eventos no demuestra que una acción no ocurrió si la instrumentación es incompleta.

## Errores frecuentes

- Usar cantidad de mensajes como calidad.
- Registrar costo desconocido como cero.
- Omitir intentos fallidos o correcciones humanas.
- Comparar modelos con tareas o pruebas distintas.
- Guardar secretos dentro de transcripciones.
- Depender del historial de una interfaz como única evidencia.
- Confundir observabilidad con vigilancia del razonamiento privado.

## Comprobación

1. ¿Qué cuatro elementos forman un evento útil?
2. ¿Por qué una iteración necesita definición?
3. ¿Cuándo tokens y costo permiten una comparación justa?
4. ¿Qué conservarías sin guardar la conversación completa?

## Actividad relacionada

Usá la [plantilla de registro](../../plantillas/05-registro-intervencion.md) en el [laboratorio](07-laboratorio-flujo-completo.md) y relacioná cada decisión final con evidencia.

## Bibliografía comentada

- Jimenez, C. et al. (2024). “SWE-bench”. Base para distinguir resolución declarada y evaluación reproducible. https://arxiv.org/abs/2310.06770
- Yang, J. et al. (2024). “SWE-agent”. Analiza trayectorias de acciones e interfaces para ingeniería de software. https://arxiv.org/abs/2405.15793
- OpenCode. *Documentation*. Referencia operativa del laboratorio, no fundamento exclusivo. https://opencode.ai/docs/ (consulta: 4 de agosto de 2026).
