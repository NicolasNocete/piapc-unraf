---
id: eje-03-terminacion-planificacion-y-recuperacion
titulo: Planificación, recuperación y terminación
eje: 3
orden: 4
tipo: lectura
nivel: obligatorio
audiencia: estudiante
clases: [4, 8]
modalidad: mixta
duracion_minutos: 24
resultados: [RA3, RA5, RA8, RA9, RA10]
prerrequisitos: [eje-03-herramientas-estado-y-realimentacion]
evaluable: true
acceso: publico
version: 1
---

# Planificación, recuperación y terminación

## Propósito

Descomponer una tarea, hacer explícito un plan operativo y definir recuperación, terminación y escalamiento antes de ejecutar.

## Por qué importa

“Seguí hasta que funcione” puede generar bucles, costos imprevisibles y cambios difíciles de revisar. En videojuegos, una corrección visual aparentemente simple puede involucrar reglas, adaptadores del motor y recursos; el agente necesita límites tanto como capacidad.

## Modelo mental

```text
objetivo verificable
  → subtareas y dependencias
  → acción pequeña
  → evidencia
  → replanificar, recuperar, terminar o escalar
```

## Descomposición y razonamiento operativo

Descomponer separa resultados verificables, no sólo verbos. Para “agregar audición al guardia”:

1. precisar reglas y casos límite;
2. localizar percepción, estado y adaptador del motor;
3. crear o ajustar pruebas de dominio;
4. implementar el evento de sonido;
5. integrar sin romper visión ni navegación;
6. validar criterios y regresiones.

El **razonamiento operativo** que importa es comunicable y comprobable: hipótesis, decisión elegida, evidencia utilizada, incertidumbres y próximo criterio. No es necesario ni apropiado pedir cadenas privadas de pensamiento del modelo. Una justificación breve como “inspecciono el adaptador porque el dominio ya supera la prueba” permite auditar la acción.

## Planificación adaptable

Un plan inicial ordena dependencias y puntos de control, pero no debe fingir conocimiento. Después de cada observación se actualizan tareas, supuestos y riesgos. Los pasos deben ser pequeños y reversibles; combinar exploración, refactorización y nueva funcionalidad en una sola acción dificulta atribuir errores.

Antes de ejecutar, el contrato define:

- éxito observable y pruebas requeridas;
- fuera de alcance e invariantes;
- máximo de pasos o llamadas de herramienta;
- tiempo total y por operación;
- presupuesto de tokens o dinero, cuando pueda medirse;
- permisos y acciones que necesitan aprobación;
- señales de estancamiento y condiciones de escalamiento.

Un límite no tiene que agotarse. Es un techo de seguridad, no una meta de consumo.

## Recuperación frente a errores

1. Registrar acción, entrada, error y estado del entorno.
2. Clasificar: transitorio, permiso, herramienta, implementación, especificación o entorno.
3. Reintentar sólo errores transitorios, con cantidad y espera limitadas.
4. Cambiar hipótesis o volver al último punto seguro para errores lógicos.
5. Revalidar luego de reparar o revertir.
6. Escalar si falta autoridad, información o presupuesto.

La recuperación puede usar una estrategia alternativa, reducir alcance o solicitar una decisión. No consiste en ocultar el fallo ni desactivar la prueba.

## Terminación y escalamiento

| Salida | Condición | Evidencia mínima |
|---|---|---|
| Éxito | Todos los criterios obligatorios satisfechos | Pruebas, ejecución y diferencias revisadas |
| Aborto seguro | Riesgo, conflicto o entorno inválido | Estado preservado y motivo registrado |
| Presupuesto agotado | Pasos, tiempo o costo alcanzado | Consumo y trabajo pendiente |
| Estancamiento | Errores repetidos sin nueva información | Intentos e hipótesis descartadas |
| Escalamiento | Requiere permiso o decisión humana | Pregunta concreta, opciones e impacto |

Escalar no es preguntar “¿qué hago?”. Es presentar evidencia, incertidumbre y la decisión mínima necesaria. Publicar, borrar datos, usar secretos o cambiar diseño suelen requerir autorización explícita.

## Caso aplicado: caída de rendimiento

Un agente debe recuperar 60 FPS tras agregar visión. Tiene 12 pasos, 20 minutos y prohibición de cambiar calidad visual. Primero reproduce y obtiene una línea base; después perfila, identifica cálculos de línea de visión por cuadro y prueba una frecuencia acotada. Si alcanza el objetivo sin romper detección, termina con métricas. Si dos enfoques fallan o necesita cambiar el diseño perceptual, escala con perfiles y alternativas. No continúa reduciendo calidad fuera de alcance.

## Límites

- Una tarea ambigua no se vuelve segura por tener un plan detallado.
- Presupuestos demasiado bajos pueden cortar validaciones esenciales.
- Un plan no anticipa todos los estados del entorno.
- Revertir código no necesariamente revierte servicios o datos externos.
- La autoafirmación de éxito no activa una terminación válida.

## Errores frecuentes

- Descomponer por archivos sin entender resultados y dependencias.
- Ejecutar el plan original aunque nueva evidencia lo contradiga.
- Reintentar indefinidamente el mismo error.
- Omitir tiempo y costo porque existe límite de pasos.
- Declarar éxito con pruebas fallidas o no ejecutadas.
- Escalar sin una pregunta concreta.

## Comprobación

1. ¿Qué evidencia de razonamiento puede pedirse sin solicitar cadenas privadas?
2. ¿Cuándo corresponde reintentar una operación?
3. ¿Qué diferencia aborto seguro de éxito?
4. ¿Qué debe contener un buen escalamiento?

<details>
<summary>Ver orientación</summary>

1. Hipótesis, decisión, evidencia, incertidumbres y próximo criterio.
2. Cuando el error es transitorio y existe un límite explícito.
3. El aborto preserva el estado y evita daño, pero no satisface los criterios.
4. Evidencia, trabajo realizado, incertidumbre, opciones, impacto y pregunta mínima.

</details>

## Actividad relacionada

[Laboratorio: agente controlado](07-laboratorio-agente-controlado.md).

## Bibliografía comentada

- Wang, L. et al. (2024). “A Survey on Large Language Model Based Autonomous Agents”. Planificación y memoria en arquitecturas de agentes. https://doi.org/10.1007/s11704-024-40231-1
- Yao, S. et al. (2023). “ReAct”. Ajuste de acciones a partir de observaciones. https://arxiv.org/abs/2210.03629
- OpenAI. (2025). *A Practical Guide to Building Agents*. Guardas, intervención humana y operación. https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/
