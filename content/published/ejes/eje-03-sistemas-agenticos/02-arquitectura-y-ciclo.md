---
id: eje-03-arquitectura-y-ciclo
titulo: Arquitectura y ciclo de un agente
eje: 3
orden: 2
tipo: lectura
nivel: obligatorio
audiencia: estudiante
clases: [4]
modalidad: mixta
duracion_minutos: 22
resultados: [RA1, RA5, RA6, RA8]
prerrequisitos: [eje-03-chat-workflow-y-agente]
evaluable: true
acceso: publico
version: 1
---

# Arquitectura y ciclo de un agente

## Propósito

Representar los componentes de un agente y reconstruir su ciclo a partir de evidencia observable.

## Por qué importa

Cuando un agente cambia un videojuego, “la IA lo hizo” no explica nada. Para depurar, limitar permisos y comprobar el resultado hay que saber qué componente decidió, qué herramienta actuó y qué cambió en el entorno.

## Modelo mental

```text
objetivo + instrucciones
          ↓
modelo ↔ contexto + estado
  ↓           ↑
acción → herramienta → entorno
                    ↓
             resultado observable
                    ↓
       verificar → ajustar o terminar
```

El modelo propone decisiones durante inferencia. La aplicación que lo rodea administra el ciclo, compone contexto, ofrece herramientas y aplica límites. Por eso, cambiar el modelo no reemplaza una arquitectura defectuosa.

## Componentes centrales

- **Modelo:** produce una salida condicionada por parámetros y contexto; puede equivocarse con seguridad aparente.
- **Instrucciones:** definen objetivo, restricciones, prioridades, formato y criterios. No otorgan capacidades que el entorno no ofrece.
- **Contexto:** información disponible en una invocación: tarea, archivos, historial y resultados relevantes.
- **Estado:** representación operativa de lo ocurrido y lo pendiente: paso actual, plan, errores, presupuesto consumido y artefactos modificados.
- **Información persistida o recuperable:** datos fuera de la invocación que pueden volver a incorporarse, como decisiones, índices de documentos o registros. Persistir no garantiza recuperar lo correcto.
- **Herramientas:** operaciones tipadas para leer, buscar, editar, ejecutar o consultar. Sus permisos limitan la capacidad efectiva.
- **Entorno:** aquello que puede observarse y cambiarse: repositorio, sistema de archivos, motor, servicio o simulación.

Contexto y estado no son sinónimos. El estado puede persistir fuera del modelo; sólo la parte seleccionada entra al contexto de la siguiente inferencia.

## Ciclo operativo

1. **Observar:** obtener el estado relevante del entorno mediante fuentes autorizadas.
2. **Decidir:** seleccionar un próximo paso compatible con objetivo, evidencia y límites.
3. **Actuar:** invocar una herramienta con entradas concretas.
4. **Verificar:** interpretar el resultado y contrastarlo con una condición externa.
5. **Ajustar:** actualizar estado, contexto o plan; continuar, recuperar, terminar o escalar.

El ciclo no exige exponer una cadena privada de pensamiento. Es suficiente registrar objetivo, acción elegida, entradas y salidas de herramientas, resultado de verificaciones y decisión de continuar o detenerse.

## Caso aplicado: guardia de sigilo

Objetivo: corregir un guardia que atraviesa una pared al volver a patrulla. El agente observa una prueba fallida y la arquitectura, decide inspeccionar navegación, busca referencias, modifica una función y ejecuta validación. La prueba sigue fallando: ese resultado realimenta el estado. Ajusta la hipótesis, inspecciona el adaptador de Phaser y descubre una conversión incorrecta de coordenadas. Sólo declara éxito cuando pruebas y ejecución satisfacen el criterio.

La herramienta de edición cambió el repositorio; el modelo no lo hizo directamente. La prueba aporta evidencia, pero una cobertura insuficiente todavía requiere inspección o ejecución del juego.

## Límites

- Una observación incompleta puede orientar todo el ciclo hacia una hipótesis falsa.
- Instrucciones contradictorias requieren precedencia clara o escalamiento.
- Más contexto puede desplazar información relevante y aumentar costo.
- Una herramienta ambigua, excesiva o sin errores estructurados degrada el control.
- La memoria recuperada puede estar desactualizada o pertenecer a otra versión.
- Verificar con el mismo modelo que produjo la solución no reemplaza pruebas externas.

## Errores frecuentes

- Confundir historial de chat con memoria persistente garantizada.
- Suponer que una instrucción equivale a un permiso.
- Registrar sólo mensajes y omitir acciones y resultados.
- Tratar la ausencia de error como prueba de éxito.
- Volcar todo el repositorio al contexto.
- Permitir que texto no confiable redefina reglas superiores.

## Comprobación

1. ¿Dónde ocurre el cambio real sobre un archivo?
2. ¿Qué diferencia estado de contexto?
3. ¿Qué evidencia observable permite reconstruir el ciclo sin pedir razonamientos privados?
4. Si una prueba pasa, ¿por qué todavía podría faltar verificación?

<details>
<summary>Ver orientación</summary>

1. En el entorno, mediante una herramienta autorizada.
2. El estado representa la ejecución; el contexto es la porción disponible para una invocación.
3. Objetivos, acciones, entradas y resultados de herramientas, verificaciones y decisiones de control.
4. Puede no cubrir el criterio completo, casos límite o la integración ejecutable.

</details>

## Actividad relacionada

[Laboratorio: agente controlado](07-laboratorio-agente-controlado.md).

## Bibliografía comentada

- Wang, L. et al. (2024). “A Survey on Large Language Model Based Autonomous Agents”. Marco amplio de perfil, memoria, planificación y acción. https://doi.org/10.1007/s11704-024-40231-1
- Yao, S. et al. (2023). “ReAct”. Relación entre decisiones operativas, acciones y observaciones. No se exige reproducir razonamientos internos. https://arxiv.org/abs/2210.03629
- Yang, J. et al. (2024). “SWE-agent”. Importancia de la interfaz entre agente y computadora. https://arxiv.org/abs/2405.15793
