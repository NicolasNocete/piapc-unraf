---
id: eje-04-infraestructura-de-validacion
titulo: Infraestructura de desarrollo y validación
eje: 4
orden: 5
tipo: lectura
nivel: obligatorio
audiencia: estudiante
clases: [7, 8]
modalidad: mixta
duracion_minutos: 22
resultados: [RA4, RA5, RA6, RA8]
prerrequisitos: [eje-04-repositorios-y-contexto]
evaluable: true
acceso: publico
version: 1
---

# Infraestructura de desarrollo y validación

## Propósito

Preparar una infraestructura de desarrollo y validación (*engineering harness*) que haga comprensible, ejecutable y comprobable un repositorio para personas y agentes.

## Por qué importa

La capacidad del modelo no compensa comandos ambiguos, dependencias irreproducibles o pruebas inaccesibles. Un buen entorno reduce decisiones innecesarias y convierte resultados de herramientas en evidencia interpretable.

## Modelo mental

El *harness* es el conjunto que rodea al código de producto:

```text
documentación operativa + estructura + dependencias fijadas
+ comandos estables + pruebas + análisis + registros + controles
= ciclo de cambio reproducible
```

No es una aplicación adicional ni una colección de instrucciones para un proveedor. Es infraestructura compartida por desarrolladores, integración continua y agentes.

## Conceptos centrales: componentes mínimos

### Documentación operativa

Debe indicar requisitos, instalación, ejecución, validación completa, arquitectura no obvia y permisos. Las instrucciones de proyecto son breves y accionables; enlazan fuentes detalladas en lugar de duplicarlas. Una instrucción de tarea se entrega aparte para no convertir una necesidad temporal en regla permanente.

### Estructura y contratos

Directorios claros, puntos de entrada identificables y límites verificables reducen exploración. En Guardia de Sigilo, el dominio no depende de Phaser: esa regla puede comprobarse con tipos, lint o pruebas, no sólo escribirse en un README.

### Entorno reproducible

Versión de runtime, manifiesto, archivo de bloqueo y configuración versionada permiten reconstruir el entorno. Los secretos se referencian por nombre y se suministran fuera del repositorio. Instalar “la última versión” introduce variación evitable.

### Comandos estables

Los comandos encapsulan operaciones frecuentes con nombres, códigos de salida y resultados claros:

| Propósito | Propiedad deseable |
|---|---|
| Formatear | alcance explícito; no ocultar cambios masivos |
| Lint/tipos | fallo con ubicación y regla |
| Compilar | artefactos y errores identificables |
| Prueba enfocada | filtro documentado y ejecución rápida |
| Validación completa | orden estable de controles obligatorios |

Un comando `validate` facilita repetición, pero no debe esconder qué ejecuta ni borrar estado para “arreglar” resultados.

### Controles y observaciones

Permisos separados para lectura, escritura, ejecución y publicación; límites de tiempo; entornos aislados; salidas estructuradas; puntos de revisión humana y estado de Git forman parte del *harness*. También importa que un fallo sea visible: código de salida exitoso con errores sólo impresos es una interfaz defectuosa.

## Diseño y auditoría

Para cada tarea preguntá:

1. ¿Una persona nueva puede instalar y ejecutar con documentación versionada?
2. ¿El agente puede localizar especificación, arquitectura y pruebas sin cargar todo?
3. ¿Existe un comando rápido y otro completo?
4. ¿Los fallos indican causa y ubicación?
5. ¿Los efectos laterales y permisos están declarados?
6. ¿La ejecución local y la integración continua usan controles equivalentes?
7. ¿Se puede recuperar un estado conocido?

Mejorar el *harness* es trabajo de ingeniería: debe tener alcance, revisión y pruebas. No conviene reconfigurar toda la infraestructura mientras se corrige una conducta, salvo que el bloqueo forme parte explícita de la tarea.

## Caso aplicado

Un proyecto Phaser exige recordar cinco comandos y una variable no documentada. La auditoría propone fijar Node, conservar el archivo de bloqueo, documentar la variable con un valor de prueba, agregar `test:domain` y hacer que `validate` ejecute formato comprobado, tipos, pruebas y compilación. La corrección del guardia queda fuera de este cambio. El resultado reduce iteraciones para cualquier herramienta, no sólo para OpenCode.

## Límites

Un *harness* no elimina fallos no modelados ni vuelve segura una herramienta con permisos excesivos. Automatizar una comprobación incorrecta sólo reproduce el error con más consistencia. Proyectos gráficos todavía requieren inspección de ejecución y criterios de diseño.

## Errores frecuentes

- Confundir instrucciones extensas con un entorno bien preparado.
- Depender de estado local no documentado.
- Crear un comando que siempre termina con éxito.
- Ocultar acciones destructivas dentro de scripts convenientes.
- Acoplar la validación a un único agente o proveedor.
- Duplicar reglas hasta que se contradicen.
- Mezclar preparación del repositorio y cambio funcional sin necesidad.

## Comprobación

1. ¿Qué diferencia al *harness* de una instrucción al modelo?
2. ¿Por qué un único comando `validate` no alcanza si oculta sus pasos?
3. ¿Qué parte del límite arquitectónico puede automatizarse?
4. ¿Qué estado local impediría hoy reproducir tu proyecto?

## Actividad relacionada

Completá la [auditoría de repositorio](../../plantillas/03-auditoria-repositorio.md) y justificá tres mejoras priorizadas antes del [laboratorio](07-laboratorio-flujo-completo.md).

## Bibliografía comentada

- Yang, J. et al. (2024). “SWE-agent”. Introduce la relevancia de la interfaz entre agente y entorno para tareas de software. https://arxiv.org/abs/2405.15793
- Jimenez, C. et al. (2024). “SWE-bench”. Muestra la dificultad de preparar entornos y pruebas reproducibles de repositorios reales. https://arxiv.org/abs/2310.06770
- OpenCode. *Rules* y *Commands*. Ejemplos de laboratorio para instrucciones y automatizaciones; las prácticas deben transferirse. https://opencode.ai/docs/rules/ y https://opencode.ai/docs/commands/ (consulta: 4 de agosto de 2026).
