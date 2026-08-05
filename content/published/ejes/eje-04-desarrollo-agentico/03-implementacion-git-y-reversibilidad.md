---
id: eje-04-implementacion-git-y-reversibilidad
titulo: Implementación incremental, Git y reversibilidad
eje: 4
orden: 3
tipo: lectura
nivel: obligatorio
audiencia: estudiante
clases: [7, 8]
modalidad: mixta
duracion_minutos: 22
resultados: [RA4, RA5, RA8, RA11]
prerrequisitos: [eje-04-especificaciones-y-planes]
evaluable: true
acceso: publico
version: 1
---

# Implementación incremental, Git y reversibilidad

## Propósito

Producir cambios pequeños y revisables, usar Git como evidencia y recuperar un estado conocido sin perder trabajo ajeno.

## Por qué importa

Una modificación amplia puede funcionar y aun ser imposible de explicar. En videojuegos, mezclar reglas del dominio, integración con el motor y ajustes visuales dificulta detectar regresiones y revertir sólo la causa.

## Modelo mental

```text
estado conocido → cambio mínimo → verificación enfocada
       → inspección del diff → siguiente incremento
```

Un incremento implementa una decisión coherente y deja el proyecto en un estado validable. No se mide por cantidad fija de líneas. Extraer un reloj controlable y agregar la transición que lo usa pueden ser dos incrementos si cada uno conserva comportamiento y tiene comprobación propia.

Antes de escribir se inspeccionan estado, rama y cambios existentes. Los cambios preexistentes no se descartan ni se incorporan como propios. Si interfieren con la tarea, se detiene la integración y se coordina.

## Conceptos centrales: rama, commit y diferencia

- **Rama:** nombre móvil que permite aislar una línea de trabajo; no es una copia de seguridad externa.
- **Commit:** instantánea identificada, con cambios relacionados y propósito explicable.
- **Diferencia (*diff*):** comparación que muestra qué líneas o archivos cambiaron; es el centro de la revisión.
- **Estado de trabajo:** incluye modificaciones preparadas, no preparadas y archivos nuevos; debe observarse durante toda la intervención.

Una secuencia prudente puede consultar `git status`, crear una rama autorizada, inspeccionar `git diff` durante la edición y registrar commits sólo cuando la persona responsable lo haya pedido. Un agente no debe publicar ni integrar por iniciativa propia.

## Qué hace revisable un cambio

1. Responde a uno o pocos criterios relacionados.
2. Toca sólo archivos justificados por la exploración.
3. Separa cambios funcionales de formato masivo o refactorizaciones.
4. Incluye o actualiza pruebas cuando cambia un comportamiento.
5. Explica el porqué; el diff ya muestra el qué.
6. Evita artefactos generados, secretos y dependencias accidentales.

En el guardia de sigilo, cambiar la transición temporal, renombrar todos los estados y reemplazar el algoritmo de rutas en un mismo commit impide atribuir resultados. La corrección del plazo debe poder revisarse sin aceptar los otros cambios.

## Reversibilidad real

Reversible no significa “Git existe”. Antes de actuar hay que identificar:

- punto de retorno: commit, copia de una escena binaria o respaldo de datos;
- alcance: código, recursos, dependencias, migraciones y servicios externos;
- procedimiento de recuperación;
- verificación posterior.

Revertir un commit crea un cambio inverso y conserva historia. Restaurar archivos locales puede borrar trabajo y requiere autorización. Volver código atrás no revierte una publicación, una compra, un mensaje externo ni una migración destructiva. Esas acciones necesitan controles específicos y, cuando sea posible, vista previa o entorno aislado.

## Caso aplicado

Un agente propone modificar `GuardStateMachine.ts`, la escena y el archivo de bloqueo. La especificación sólo exige una transición de dominio y prohíbe dependencias nuevas. La revisión rechaza escena y bloqueo, conserva el cambio de dominio, ejecuta su prueba y verifica el diff. El valor no está en aceptar “la solución completa”, sino en integrar sólo evidencia alineada con el alcance.

## Límites

Commits pequeños pero dependientes pueden fragmentar artificialmente una decisión. Un diff limpio tampoco prueba comportamiento. Git rastrea archivos, no todos los efectos externos ni la intención de diseño.

## Errores frecuentes

- Editar sin comprobar rama y estado.
- Mezclar corrección, refactorización y formato global.
- Usar el mensaje “fix” sin explicar propósito.
- Tratar un commit como prueba funcional.
- Revertir cambios concurrentes que no pertenecen a la tarea.
- Suponer que toda acción de herramienta queda cubierta por Git.
- Publicar una rama sin autorización.

## Comprobación

1. ¿Por qué una rama no vuelve reversible una publicación externa?
2. ¿Qué información aporta el diff que no aporta una prueba?
3. ¿Cuándo conviene separar formato y conducta?
4. ¿Qué debe verificarse después de una reversión?

## Actividad relacionada

Registrá estado inicial, incrementos y diferencias en la [plantilla de intervención](../../plantillas/05-registro-intervencion.md). Aplicalo en el [laboratorio de flujo completo](07-laboratorio-flujo-completo.md).

## Bibliografía comentada

- Chacon, S. y Straub, B. *Pro Git*, capítulos 2 y 3. Uso de estado, commits y ramas. https://git-scm.com/book/es/v2
- Git Project. *git-diff* y *git-revert*. Referencia operativa para inspección y reversión no destructiva. https://git-scm.com/docs/git-diff y https://git-scm.com/docs/git-revert
- Yang, J. et al. (2024). “SWE-agent”. Ejemplos de interacción de agentes con repositorios reales. https://arxiv.org/abs/2405.15793
