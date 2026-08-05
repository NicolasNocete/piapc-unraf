---
id: eje-06-instrucciones-skills-comandos
titulo: Instrucciones, habilidades, comandos y agentes especializados
eje: 6
orden: 2
tipo: lectura
nivel: obligatorio
audiencia: estudiante
clases: [7, 12]
modalidad: mixta
duracion_minutos: 20
resultados: [RA4, RA6, RA10]
prerrequisitos: [eje-06-herramientas-y-aci]
evaluable: true
acceso: publico
version: 1
---

# Instrucciones, habilidades, comandos y agentes especializados

## Propósito

Distinguir cuatro mecanismos de configuración y elegir el de menor complejidad que resuelva una necesidad repetida.

## Por qué importa

Una convención de nombres, una revisión de activos y una publicación no requieren el mismo alcance ni los mismos permisos. Mezclarlas en un único texto produce contexto ruidoso y responsabilidades difíciles de auditar.

## Modelo mental

| Mecanismo | Se activa | Contiene | Conviene cuando |
|---|---|---|---|
| Instrucción persistente | Siempre dentro de su alcance | Reglas y convenciones | Debe regir casi toda tarea del proyecto |
| Habilidad reutilizable (*skill*) | Se descubre y carga cuando corresponde | Procedimiento y referencias | Una clase de tareas reaparece, pero no siempre |
| Comando | Una persona o flujo lo invoca | Plantilla parametrizable | El inicio debe ser explícito y repetible |
| Agente especializado | Se selecciona o delega | Rol, instrucciones, herramientas, permisos y límites | Hace falta aislar contexto o responsabilidad |

Todos condicionan inferencia; ninguno entrena el modelo ni garantiza cumplimiento. Sus nombres concretos y formatos dependen del producto.

## Conceptos centrales y criterios

1. Colocar como instrucción persistente sólo información estable y transversal: arquitectura, comandos válidos, límites y fuentes de verdad.
2. Extraer a una skill un procedimiento extenso que deba cargarse bajo demanda, por ejemplo auditar importación de audio.
3. Crear un comando para una entrada humana repetida, como “revisar hito”, con argumentos y entregable definidos.
4. Crear un agente especializado sólo si necesita contexto, permisos, herramientas o condición de salida diferentes.

La especialización útil reduce capacidades. Un revisor de arte puede leer especificaciones, metadatos y capturas sin editar código ni publicar. Su descripción debe decir cuándo usarlo, qué entrega, qué no decide y cuándo escala a una persona.

## Caso aplicado

Un equipo necesita conservar resolución objetivo, auditar sprites y preparar una revisión semanal.

- La resolución y las convenciones de rutas son instrucciones de proyecto.
- “Auditar sprite” es una skill: consulta ficha, dimensiones, licencia y uso en escenas; entrega hallazgos con evidencia.
- “Revisar hito 3” es un comando invocado por producción con el identificador del hito.
- Un agente de QA de sólo lectura se justifica si debe ejecutar una batería acotada y devolver fallos, sin corregirlos.

En OpenCode, `AGENTS.md` sirve como regla de proyecto; las skills se descubren y cargan bajo demanda; los comandos personalizados son plantillas invocables; y los agentes pueden definir modo y permisos. Es una implementación de las distinciones anteriores, no su definición universal.

## Límites

Más archivos de configuración no implican mejor contexto. Reglas duplicadas pueden entrar en conflicto; una skill puede quedar obsoleta; un comando puede incorporar salida no confiable; y varios agentes agregan costo y coordinación. Si una lista breve en la documentación operativa alcanza, no hace falta otro mecanismo.

## Errores frecuentes

- Poner toda la documentación en instrucciones siempre activas.
- Llamar “skill” a una herramienta ejecutable o a conocimiento aprendido por el modelo.
- Suponer que un comando es determinista porque siempre comienza igual.
- Especializar por profesión sin separar decisiones, entradas y permisos.
- Permitir que un subagente publique o integre su propio resultado.

## Comprobación

1. ¿Qué mecanismo usarías para una política de secretos que rige toda tarea?
2. ¿Cuándo una skill es preferible a un agente especializado?
3. ¿Por qué repetir un comando no garantiza la misma salida?

## Actividad relacionada

[Laboratorio integrador: una integración controlada](07-laboratorio-integrador.md).

## Bibliografía comentada

- OpenCode. *Rules*. Alcance y precedencia de instrucciones. https://opencode.ai/docs/rules/ (consulta: 4 de agosto de 2026).
- OpenCode. *Agent Skills*. Descubrimiento, carga bajo demanda y permisos. https://opencode.ai/docs/skills/ (consulta: 4 de agosto de 2026).
- OpenCode. *Commands*. Plantillas, argumentos e invocación explícita. https://opencode.ai/docs/commands/ (consulta: 4 de agosto de 2026).
- OpenCode. *Agents*. Modos, delegación y permisos especializados. https://opencode.ai/docs/agents/ (consulta: 4 de agosto de 2026).
