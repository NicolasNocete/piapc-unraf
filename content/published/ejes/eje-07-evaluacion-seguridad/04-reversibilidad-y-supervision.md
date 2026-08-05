---
id: eje-07-reversibilidad-y-supervision
titulo: Reversibilidad, supervisión y riesgos de autonomía
eje: 7
orden: 4
tipo: lectura
nivel: obligatorio
audiencia: estudiante
clases: [4, 8, 12, 13]
modalidad: mixta
duracion_minutos: 20
resultados: [RA5, RA8, RA10]
prerrequisitos: [eje-07-seguridad-permisos-y-secretos]
evaluable: true
acceso: publico
version: 1
---

# Reversibilidad, supervisión y riesgos de autonomía

## Propósito

Diseñar acciones recuperables, límites de autonomía y puntos de control humano (checkpoints) proporcionales al impacto.

## Por qué importa

Un agente puede repetir un error más rápido que una persona: modificar cien escenas, borrar partidas, consumir presupuesto o publicar una compilación defectuosa. La autonomía útil no es ausencia de supervisión, sino capacidad acotada para avanzar y detenerse con evidencia.

## Modelo mental: radio de impacto

Evaluá cada acción por alcance, sensibilidad, velocidad de propagación y dificultad de recuperación. A mayor radio de impacto, menor autonomía y mayor exigencia de confirmación.

| Nivel | Ejemplo | Control mínimo |
|---|---|---|
| Bajo | leer código público, proponer un parche | registro y límites de alcance |
| Medio | editar una rama, ejecutar pruebas | copia aislada, diferencia y punto de control |
| Alto | migrar datos, instalar, usar credenciales | vista previa, respaldo probado y aprobación explícita |
| Crítico | borrar, desplegar, publicar o afectar jugadores | separación de funciones; persona autorizada ejecuta |

## Reversibilidad real

Una acción es reversible sólo si existe un estado anterior recuperable y se probó que restaurarlo devuelve el sistema a condiciones válidas. `git revert` puede recuperar código, pero no retira un paquete ya publicado ni restaura una base de datos modificada.

Antes de actuar:

1. identificá estado y dependencias afectados;
2. creá un punto de control: commit, instantánea, copia o exportación verificable;
3. definí procedimiento de reversión, responsable y tiempo tolerable;
4. aplicá el cambio más pequeño posible;
5. validá tanto el resultado como el camino de vuelta.

Preferí operaciones idempotentes y despliegues por etapas. Para datos, practicá con copias y considerá migraciones compensatorias. Nunca pruebes restauración por primera vez durante un incidente real.

## Confirmaciones informadas

Una confirmación útil muestra:

- acción exacta y motivo;
- archivos, servicio, entorno y destinatario;
- datos que se leerán o enviarán;
- efecto esperado y peor resultado razonable;
- punto de control disponible y procedimiento de reversión;
- alternativas menos riesgosas.

“¿Continuar? sí/no” favorece la aprobación automática. Agrupar diez acciones distintas en una confirmación también oculta decisiones.

## Puntos de control humano

Ubicá un punto de control antes de cruzar una frontera de confianza o aumentar impacto: ampliar alcance, habilitar red, instalar, acceder a datos, ejecutar una migración, fusionar, publicar o cambiar un criterio. La persona debe poder **aprobar, modificar, rechazar o detener**, con información suficiente y sin depender del resumen del agente.

La revisión final no reemplaza puntos de control intermedios si para entonces el daño ya ocurrió.

## Riesgos propios de la autonomía

- **Objetivo incompleto:** optimiza velocidad y rompe accesibilidad o diseño.
- **Propagación:** aplica una suposición errónea a muchos activos.
- **Bucle y consumo:** reintenta sin aprender y agota tiempo, tokens o cuotas.
- **Escalada de herramientas:** busca permisos más amplios para superar un fallo.
- **Pérdida de control:** encadena acciones cuyo estado ya no puede reconstruirse.
- **Coordinación defectuosa:** varios agentes pisan cambios o aceptan mutuamente errores.

Controles: límites de pasos, tiempo y costo; condiciones de terminación; prohibición de autoampliar permisos; bloqueo ante errores repetidos; un responsable humano; estado observable; y una vía de detención que no dependa del agente.

## Caso aplicado

Un agente ajusta dificultad en veinte niveles. Primero modifica dos niveles en una rama, produce diferencias y ejecuta pruebas de carga. Diseño revisa la experiencia y autoriza el siguiente lote. La publicación permanece fuera de sus permisos. Si un criterio cambia, se vuelve al último punto de control en lugar de parchear en cascada.

Para partidas guardadas, el agente sólo genera y prueba una migración sobre copias sintéticas. Una persona revisa conteos, casos límite y plan de restauración antes de cualquier entorno compartido.

## Límites

No todo efecto puede revertirse: una filtración, un correo enviado o una publicación vista por jugadores persiste. En esos casos se priorizan prevención, simulación, despliegue gradual y capacidad de contención. Un punto de control humano tampoco garantiza acierto; necesita tiempo, competencia y evidencia independiente.

## Errores frecuentes

- Llamar respaldo a una copia nunca restaurada.
- Confiar en Git para revertir efectos externos.
- Pedir aprobación después de ejecutar.
- Permitir reintentos ilimitados.
- Medir autonomía por cantidad de pasos sin humanos.
- Dar a varios agentes permisos de integración sin coordinación.

## Comprobación

1. ¿Qué vuelve irreversible una acción aunque el código esté versionado?
2. ¿Qué debe mostrar una confirmación informada?
3. ¿Dónde pondrías puntos de control al publicar una demo?
4. ¿Qué condición detendría automáticamente un bucle?

## Actividad relacionada

Usá las [listas de verificación (checklists) operativas](06-checklists-operativos.md) para preparar y cerrar una intervención.

## Bibliografía comentada

- OWASP (2025). *Agentic AI: Threats and Mitigations*. Analiza amenazas de agencia, herramientas y acciones encadenadas. https://genai.owasp.org/resource/agentic-ai-threats-and-mitigations/
- NIST (2024). *Generative AI Profile*. Prácticas de gobernanza, medición, gestión y respuesta a incidentes. https://doi.org/10.6028/NIST.AI.600-1
- OpenAI (2025). *A Practical Guide to Building Agents*. Referencia complementaria sobre guardrails e intervención humana, no sustento único. https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/
