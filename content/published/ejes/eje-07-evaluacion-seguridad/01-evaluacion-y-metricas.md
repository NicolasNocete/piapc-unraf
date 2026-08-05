---
id: eje-07-evaluacion-y-metricas
titulo: Evaluación y métricas de procesos agénticos
eje: 7
orden: 1
tipo: lectura
nivel: obligatorio
audiencia: estudiante
clases: [12]
modalidad: mixta
duracion_minutos: 25
resultados: [RA8, RA9]
prerrequisitos: [eje-03-chat-workflow-y-agente]
evaluable: true
acceso: publico
version: 1
---

# Evaluación y métricas de procesos agénticos

## Propósito

Diseñar una evaluación basada en criterios, casos y evidencia; interpretar calidad, costo y supervisión sin confundir actividad con resultados.

Que un agente afirme “terminé” no demuestra que una mecánica funcione ni que no haya regresiones.

## Por qué importa

Un cambio puede compilar y aun romper la dificultad, la legibilidad o una plataforma. Evaluar separa la impresión de calidad de una decisión de integración defendible.

## Modelo mínimo

Un **conjunto de tareas** reúne problemas representativos con versiones identificables. No debe contener sólo ejemplos exitosos: incluye variaciones, casos límite, entradas adversariales y regresiones conocidas. Para cada tarea se registra:

1. **Criterio:** condición observable.
2. **Caso:** situación concreta donde se comprueba.
3. **Ejecución:** intento con configuración identificable.
4. **Evidencia:** prueba, registro, diferencia o inspección que verifica el resultado.

“El guardia funciona bien” no es verificable. “Deja de perseguir dentro de tres segundos de perder visión” sí.

## Cumplimiento y éxito

```text
cumplimiento = criterios cumplidos / criterios evaluados
tasa de éxito = ejecuciones con todos los obligatorios / ejecuciones totales
```

Informá siempre numerador, denominador y definición de éxito. Algunos criterios no admiten compensación: seguridad, integridad de datos o funcionamiento básico.

## Evidencia válida

- pruebas automatizadas;
- ejecución reproducible;
- diferencias y archivos modificados;
- compilación y análisis estático;
- registros de herramientas y errores;
- inspección humana del producto.

No son suficientes una captura aislada, una demostración sin condiciones registradas ni la autoevaluación del agente.

## Tres formas de evaluar

| Método | Aporta | No demuestra por sí solo |
|---|---|---|
| Determinista | Resultado repetible: pruebas, esquema, compilación, análisis estático, límites numéricos | Calidad perceptual, intención de diseño o ausencia de casos no previstos |
| Revisión humana | Juicio situado sobre experiencia, claridad, accesibilidad y mantenibilidad | Repetibilidad ni cobertura completa; puede variar entre personas |
| Asistida por modelos | Clasificación o crítica a escala cuando existe una rúbrica y ejemplos | Verdad ni imparcialidad; puede compartir errores con el sistema evaluado |

Conviene combinar métodos. Un modelo evaluador no debe ser juez único de su propia salida ni decidir sobre criterios obligatorios de seguridad. Su dictamen es un dato: se conserva entrada, modelo, versión disponible, rúbrica, salida y desacuerdos humanos. No se solicitan razonamientos internos privados.

En esta materia, la evaluación asistida por modelos tiene alcance conceptual o demostrativo: debe comprenderse y analizarse, pero no es requisito implementar un evaluador autónomo.

## Métricas útiles

### Regresiones

Capacidades antes correctas que dejan de funcionar. Se detectan repitiendo casos de referencia.

### Iteraciones

Ciclos definidos de intento, validación y ajuste. Muchas pueden indicar dificultad, ambigüedad o herramientas deficientes. Pocas no garantizan calidad.

### Latencia

Tiempo desde un inicio definido hasta resultado validado. Aclará si incluye esperas humanas y pruebas. Para varias ejecuciones conviene mediana y rango.

### Intervención humana

Registrá cantidad, duración y motivo: autorización, ambigüedad, error, riesgo o decisión de diseño. Intervenir puede ser un control previsto, no un fallo.

### Tokens y costo

Cuando estén disponibles, registrá entrada, salida, modelo y tarifa. Si el dato falta, indicá “no disponible”, no cero. Menos tokens no implica mejor calidad.

### Reversibilidad e incidentes

La reversibilidad debe probarse restaurando y verificando. Un incidente registra qué ocurrió, impacto, detección, contención, recuperación y prevención.

## Métricas decorativas

| Útil cuando se interpreta | Decorativa por sí sola |
|---|---|
| Casos obligatorios superados | Líneas de código generadas |
| Regresiones | Cantidad de mensajes |
| Latencia frente a un límite | Capturas producidas |
| Intervenciones por riesgo | Puntuación del mismo modelo |
| Reversión verificada | Tokens sin relación con calidad |

Una métrica es útil si se vincula con un objetivo y cambia una decisión.

## Comparación experimental controlada

Para atribuir una diferencia a una variable, cambiá sólo una por vez: modelo, instrucción, herramienta o configuración. Antes de ejecutar:

1. congelá versión del repositorio, entorno, tarea, contexto, permisos, presupuesto y criterios;
2. definí casos y repeticiones, incluidos fallos y casos límite;
3. alterná el orden de las configuraciones cuando el orden pueda favorecer a una;
4. conservá todas las ejecuciones, no sólo la mejor;
5. aplicá la misma evaluación y reportá resultados por caso, dispersión, fallos e incertidumbre;
6. decidí con criterios previamente declarados.

Con pocas repeticiones se informa una observación local, no una superioridad general. Si dos modelos reciben distinto contexto o uno obtiene correcciones humanas adicionales, no se aisló el efecto del modelo.

### Ejemplo controlado

Se comparan dos instrucciones para corregir el guardia de sigilo. Ambas usan el mismo modelo, commit, cinco escenarios, límite de pasos y permisos. Cada condición se ejecuta cinco veces en orden alternado. Se registran éxito completo, regresiones, latencia, tokens e intervenciones. La instrucción B logra más éxitos, pero requiere dos confirmaciones no previstas: el informe muestra ambos resultados y no oculta el costo de supervisión.

## Plantilla mínima

| Campo | Registro |
|---|---|
| Objetivo | Resultado a comprobar |
| Versión/configuración | Código, modelo, instrucciones y herramientas |
| Criterios obligatorios | Condiciones no compensables |
| Casos/repeticiones | Situaciones y cantidad de ejecuciones |
| Evidencia | Pruebas, registros, diferencias |
| Resultados | Cumplimiento, éxito y regresiones |
| Operación | Iteraciones, latencia, intervención |
| Recursos | Tokens y costo disponibles |
| Seguridad | Incidentes y permisos utilizados |
| Reversibilidad | Procedimiento y resultado |
| Decisión humana | Aceptar, corregir, revertir o descartar |

## Caso aplicado

Un agente corrige un guardia. Hay cuatro criterios: no atravesar obstáculos, perseguir sólo con visión, volver a patrulla y conservar pruebas existentes. Obtiene 13 éxitos en 15 ejecuciones, pero introduce una regresión y modifica un archivo fuera de alcance.

La tasa alta no autoriza integrar. Los criterios obligatorios y el incidente exigen corregir o revertir. Las métricas orientan la decisión; no la reemplazan.

## Límites

Un conjunto de casos representa una parte del uso posible y puede quedar obsoleto. Las métricas agregadas pueden ocultar un fallo crítico. La revisión humana también necesita criterios, más de una persona cuando el juicio sea decisivo y registro de desacuerdos.

## Errores frecuentes

- Probar sólo casos favorables.
- Cambiar varias configuraciones a la vez.
- Informar porcentajes sin cantidades.
- Omitir intervenciones para aparentar autonomía.
- Registrar costo cero cuando se desconoce.
- Presumir reversibilidad sin probarla.
- Usar al agente como único evaluador.
- Comparar configuraciones mientras cambian contexto, permisos y presupuesto.
- Presentar una puntuación de un modelo evaluador como hecho objetivo.

## Comprobación

1. ¿Por qué éxito no reemplaza cumplimiento por criterio?
2. ¿Cuándo los tokens se vuelven una métrica útil?
3. ¿Intervención humana implica siempre fallo?
4. ¿Qué verificarías luego de revertir?
5. ¿Qué variables deben permanecer constantes al comparar dos instrucciones?

## Actividad relacionada

El [laboratorio de equipo rojo y respuesta controlada](07-caso-red-team.md) aplica casos, criterios y evidencia a un escenario adversarial.

## Bibliografía comentada

- Jimenez, C. et al. (2024). “SWE-bench”. https://arxiv.org/abs/2310.06770
- NIST (2024). *Generative AI Profile*. Marco para medir, documentar y gestionar riesgos durante el ciclo de vida. https://doi.org/10.6028/NIST.AI.600-1
- OWASP (2025). *Agentic AI: Threats and Mitigations*. Referencia de amenazas y controles; no reemplaza el análisis del contexto. https://genai.owasp.org/resource/agentic-ai-threats-and-mitigations/
- Yang, J. et al. (2024). “SWE-agent”. https://arxiv.org/abs/2405.15793
