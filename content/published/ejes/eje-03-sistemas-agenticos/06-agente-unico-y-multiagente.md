---
id: eje-03-agente-unico-y-multiagente
titulo: Agente único y sistemas multiagente
eje: 3
orden: 6
tipo: lectura
nivel: demostrativo
audiencia: estudiante
clases: [12]
modalidad: mixta
duracion_minutos: 22
resultados: [RA2, RA5, RA8, RA9, RA10]
prerrequisitos: [eje-03-patrones-agenticos]
evaluable: true
acceso: publico
version: 1
---

# Agente único y sistemas multiagente

## Propósito

Justificar cuándo conservar un agente único y cuándo la especialización multiagente compensa sus costos de coordinación.

## Por qué importa

Asignar “un agente por rol del estudio” resulta atractivo, pero arte, código, diseño y pruebas comparten restricciones. Sin contratos y una fuente de verdad, más participantes producen contradicciones más rápido.

## Modelo mental

Un **agente único** mantiene un ciclo principal de decisión, aunque use muchas herramientas o ejecute workflows. Un **sistema multiagente** contiene varios ciclos con objetivos, estado o herramientas propios que intercambian tareas y resultados.

```text
único: objetivo → agente → herramientas → evidencia

multiagente: objetivo → coordinador
                    ↔ agente A ↔ entorno A
                    ↔ agente B ↔ entorno B
                    → integración → evidencia
```

La cantidad de modelos, prompts o llamadas no define por sí sola la arquitectura. Dos revisiones independientes y codificadas en un workflow pueden ser paralelización sin agentes autónomos.

## Ventajas del agente único

- un estado y una jerarquía de instrucciones;
- menos mensajes, duplicación de contexto y latencia;
- permisos y trazas más fáciles de auditar;
- menor riesgo de ediciones concurrentes;
- terminación y responsabilidad claras.

Es la opción inicial cuando el problema cabe en un contexto manejable, las herramientas son compatibles y las subtareas están estrechamente acopladas.

## Cuándo considerar varios agentes

- dominios realmente separables con herramientas o permisos diferentes;
- subtareas independientes que justifican paralelización;
- contexto total demasiado amplio, pero divisible mediante interfaces estables;
- necesidad de aislamiento, por ejemplo un revisor sin permiso de escritura;
- volumen repetido que amortiza construir coordinación y evaluación.

La especialización debe expresarse en capacidades y contratos, no en personajes. “Revisor de seguridad que sólo lee y devuelve hallazgos con evidencia” es más útil que “agente escéptico”.

## Costos de coordinación

Para `n` agentes no siempre hay `n` relaciones: si todos se comunican entre sí, los canales potenciales crecen aproximadamente como `n(n-1)/2`. Un coordinador central reduce conexiones, pero se vuelve cuello de botella y punto único de fallo.

Los costos incluyen:

- contexto duplicado, tokens y llamadas adicionales;
- serialización, colas y mayor latencia;
- pérdida de información al transferir tareas;
- resultados incompatibles y conflictos de edición;
- observabilidad distribuida y depuración más difícil;
- nuevas superficies de permisos y contenido no confiable;
- evaluación de cada trabajador y de la integración.

## Contrato de coordinación

Antes de adoptar multiagente deben definirse:

1. responsable de descomponer y aceptar resultados;
2. fuente de verdad y formato de cada entrega;
3. propiedad o aislamiento de archivos y recursos;
4. información compartida y estrategia de actualización;
5. permisos, presupuesto y terminación por agente;
6. resolución de conflicto, reintento y escalamiento;
7. validación de integración de extremo a extremo.

Un mensaje “terminado” no es un entregable. Debe acompañarse con artefactos, evidencia y limitaciones.

## Caso aplicado: producción vertical

Un prototipo requiere una nueva habilidad, efectos visuales y telemetría. Si una sola persona integra todo en un repositorio pequeño, un agente único con herramientas acotadas minimiza coordinación. Un sistema multiagente podría justificarse si el efecto se produce en un entorno aislado, la lógica tiene pruebas de dominio y la telemetría usa un esquema estable. El coordinador entrega contratos distintos y ningún trabajador publica.

Si los tres editan la misma escena y deciden nombres de eventos de forma independiente, la división es falsa: la integración absorberá el ahorro. Primero conviene estabilizar interfaces o volver a un único agente.

## Criterio de adopción

Compará contra una línea base de agente único o workflow:

- tasa de éxito de extremo a extremo;
- calidad por criterios y regresiones;
- tiempo total, no sólo del trabajador más rápido;
- tokens, costo monetario e intervención humana;
- conflictos, reintentos e incidentes;
- esfuerzo de construcción y mantenimiento.

Adoptá multiagente sólo si mejora de forma repetible una necesidad relevante y el beneficio supera coordinación y riesgo. La complejidad arquitectónica no es un resultado de aprendizaje por sí misma.

## Límites

- Especialistas pueden compartir los mismos sesgos o errores del modelo base.
- Votar aumenta confianza estadística sólo bajo supuestos que deben evaluarse.
- Aislar contexto puede eliminar dependencias importantes.
- Un coordinador no puede verificar lo que el entorno no hace observable.
- Más agentes no amplían automáticamente permisos, conocimiento ni ventana de contexto útil.

## Errores frecuentes

- Adoptar multiagente antes de medir una alternativa simple.
- Confundir roles narrativos con especialización técnica.
- Compartir escritura sobre los mismos archivos sin aislamiento.
- Medir velocidad e ignorar costo total e integración.
- Propagar instrucciones no confiables entre agentes.
- Validar cada pieza y omitir la prueba de extremo a extremo.

## Comprobación

1. ¿Muchas llamadas al mismo modelo implican multiagente?
2. ¿Qué ventaja ofrece un revisor sin permiso de escritura?
3. ¿Por qué los canales de coordinación pueden crecer rápido?
4. ¿Qué comparación mínima justifica adoptar multiagente?

<details>
<summary>Ver orientación</summary>

1. No; importan los ciclos de decisión y estados independientes.
2. Aislamiento: puede analizar sin modificar el artefacto evaluado.
3. Porque cada par puede necesitar intercambiar y reconciliar información.
4. Una línea base simple medida con calidad, éxito, tiempo, costo, intervención y riesgo.

</details>

## Actividad relacionada

[Laboratorio: agente controlado](07-laboratorio-agente-controlado.md).

## Bibliografía comentada

- Wang, L. et al. (2024). “A Survey on Large Language Model Based Autonomous Agents”. Arquitecturas y aplicaciones de agentes basados en LLM. https://doi.org/10.1007/s11704-024-40231-1
- Anthropic. (2024). *Building Effective Agents*. Recomendación industrial de comenzar con soluciones simples. https://www.anthropic.com/research/building-effective-agents
- OpenAI. (2025). *A Practical Guide to Building Agents*. Consideraciones prácticas para agente único, herramientas y orquestación. https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/
