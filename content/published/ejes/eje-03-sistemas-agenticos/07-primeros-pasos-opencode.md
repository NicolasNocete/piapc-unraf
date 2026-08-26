---
id: eje-03-primeros-pasos-opencode
titulo: Primeros pasos con OpenCode para el laboratorio
eje: 3
orden: 7
tipo: lectura
nivel: obligatorio
audiencia: estudiante
clases: [4]
modalidad: presencial
duracion_minutos: 15
resultados: [RA1, RA2, RA5, RA6]
prerrequisitos: [eje-03-herramientas-estado-y-realimentacion, eje-03-terminacion-planificacion-y-recuperacion]
evaluable: true
acceso: publico
version: 1
---

# Primeros pasos con OpenCode para el laboratorio

## Propósito

Preparar una herramienta de agente para el laboratorio sin delegar el control de la tarea. OpenCode es el laboratorio de referencia de la materia; sus nombres, interfaz y archivos no son requisitos conceptuales ni estándares universales.

## Antes de comenzar

1. Consultá la [introducción oficial de OpenCode](https://opencode.ai/docs/) y, si usás Windows, la guía oficial de [Windows y WSL](https://opencode.ai/docs/windows-wsl). Seguí allí la instalación correspondiente a tu equipo.
2. Verificá con el docente qué proveedor o alternativa está habilitado. No publiques claves, tokens, conversaciones ni archivos de configuración con secretos.
3. Trabajá sobre la copia o rama del [laboratorio Guardia de Sigilo](https://github.com/NicolasNocete/piapc-guardia-sigilo) preparada por la cátedra. Antes de usar un agente, comprobá el estado de Git y leé `README.md`, `AGENTS.md`, la arquitectura, los permisos recomendados y los comandos documentados por el proyecto.

## Inicio seguro

Abrí OpenCode desde la carpeta del proyecto. Si es la primera vez que usás la herramienta en un repositorio, consultá su documentación de [configuración inicial](https://opencode.ai/docs/) y de [reglas](https://opencode.ai/docs/rules/) antes de crear o aceptar instrucciones del proyecto.

Para este laboratorio, el punto de partida es:

| Capacidad | Estado inicial | Motivo |
|---|---|---|
| Lectura y búsqueda dentro del proyecto | Permitida | Comprender arquitectura, rutas y pruebas existentes. |
| Escritura | Denegada hasta autorización docente | Evitar cambios antes de definir alcance y evidencia. |
| Ejecución de comandos | Sólo comandos documentados y autorizados | Conservar una validación reproducible. |
| Red, instalación y publicación | Denegadas | No son necesarias para la consigna. |
| Secretos y archivos fuera del proyecto | Denegados | Proteger información ajena al laboratorio. |

Los permisos pertenecen a la herramienta y al entorno, no al modelo. Revisá la [documentación de permisos](https://opencode.ai/docs/permissions/) antes de autorizar una capacidad adicional.

## Primera consulta

Usá una solicitud de sólo lectura, concreta y verificable. Por ejemplo:

> Mapeá el recorrido desde la entrada del jugador hasta el destino del guardia. Citá rutas y símbolos; no modifiques archivos ni ejecutes comandos. Separá evidencia observada, supuestos y dudas.

La respuesta del agente es una hipótesis de trabajo. Contrastá al menos dos afirmaciones con archivos, búsquedas o validaciones autorizadas. La sintaxis concreta para referenciar archivos, seleccionar agentes o cambiar permisos puede variar: consultá las guías oficiales de [agentes](https://opencode.ai/docs/agents/) y [herramientas](https://opencode.ai/docs/tools/) si la interfaz no resulta clara.

## Registro y detención

Por cada ciclo, registrá observación, acción solicitada, herramienta utilizada, resultado, verificación y decisión: `continuar`, `ajustar`, `terminar` o `escalar`. No entregues razonamientos internos privados; registrá decisiones breves y evidencia observable.

Detené la ejecución y consultá al docente si ocurre cualquiera de estas situaciones:

- hace falta escritura, instalación, red, publicación o acceso a secretos;
- el agente propone un comando que no está documentado;
- hay cambios existentes o una acción podría ser destructiva;
- falta evidencia para continuar o se repite un intento sin información nueva;
- se alcanza el límite de tiempo, llamadas o presupuesto indicado.

## Alternativa sin OpenCode

Podés usar una herramienta equivalente con registro de herramientas y los mismos permisos mínimos. Si no hay un modelo disponible, analizá la [traza saneada de agente controlado](../../transversales/eje-03-traza-agente-controlado.md): la evidencia exigida y los criterios de evaluación son los mismos.

## Actividad relacionada

[Laboratorio: agente controlado](07-laboratorio-agente-controlado.md).

## Comprobación

1. ¿Qué archivos del proyecto debés leer antes de pedir un cambio?
2. ¿Qué capacidad se habilita inicialmente y cuáles permanecen denegadas?
3. ¿Por qué una respuesta del agente no basta como evidencia?
4. ¿Cuándo corresponde detenerse y escalar?

## Bibliografía comentada

- OpenCode. [*Documentation*](https://opencode.ai/docs/). Instalación, configuración inicial y uso general del laboratorio de referencia.
- OpenCode. [*Permissions*](https://opencode.ai/docs/permissions/). Capacidades que requieren revisión y autorización explícita.
- OpenCode. [*Rules*](https://opencode.ai/docs/rules/) y [*Agents*](https://opencode.ai/docs/agents/). Configuración de instrucciones y modos de trabajo; sus detalles no sustituyen los conceptos del eje.
