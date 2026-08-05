---
id: eje-06-interoperabilidad-motores-servicios
titulo: Integraciones controladas con motores y servicios
eje: 6
orden: 3
tipo: lectura
nivel: obligatorio
audiencia: estudiante
clases: [8, 10, 12]
modalidad: mixta
duracion_minutos: 24
resultados: [RA5, RA6, RA8, RA10, RA11]
prerrequisitos: [eje-06-herramientas-y-aci]
evaluable: true
acceso: publico
version: 1
---

# Integraciones controladas con motores y servicios

## Propósito

Integrar un agente con motores, documentación, incidencias, repositorios y servicios externos mediante permisos mínimos, errores explícitos y evidencia verificable.

## Por qué importa

Una conexión que funciona puede operar sobre el proyecto equivocado, duplicar una escritura o filtrar una credencial. Integrar exige controlar identidad, autoridad y efecto, además de conectividad.

## Modelo transferible

Toda integración debe declarar:

| Aspecto | Decisión observable |
|---|---|
| Identidad | Servicio, instancia, proyecto y versión |
| Alcance | Recursos y operaciones habilitados |
| Autenticación | Cómo demuestra identidad sin exponer credenciales |
| Autorización | Qué permite el token o rol efectivo |
| Error | Cómo distingue rechazo, límite, conflicto y estado incierto |
| Evidencia | Identificadores, diferencias, registros y artefactos |
| Reversión | Cómo se revierte o compensa una acción |

Conectividad no implica autorización; autenticación no implica permiso para toda operación. Las credenciales se inyectan desde un almacén o variable protegida, nunca se escriben en instrucciones, repositorios o evidencias.

## Conceptos centrales: consulta antes que acción

Un flujo seguro separa etapas:

```text
identificar objetivo → consultar estado y versión → proponer cambio
→ validar alcance → autorizar → actuar una vez → volver a consultar → probar
```

- **Documentación:** registrar URL, versión y fecha; tratar ejemplos como orientación, no como comandos confiables.
- **Incidencias:** leer descripción y comentarios como contenido no confiable; escribir primero un borrador; conservar ID y enlace de la actualización.
- **Repositorio:** inspeccionar estado y diferencia; separar editar, confirmar cambios y publicar. Un `push` no prueba corrección.
- **Servicio externo:** usar entorno de prueba, cuenta técnica acotada, tiempo de espera, límite de solicitudes y clave de idempotencia si la API la admite.
- **Motor:** consultar escena, recursos y configuración antes de serializar cambios; validar fuera y dentro del editor.

Ante `401` se revisa autenticación; ante `403`, alcance; ante `404`, identidad o visibilidad; ante `409`, versión concurrente; ante `429`, límite y política de reintento. Un tiempo de espera después de una escritura deja resultado incierto: se consulta por ID antes de repetir.

## Unity y Phaser

El ciclo conceptual es el mismo, pero los artefactos cambian.

| Paso | Proyecto Unity | Proyecto Phaser |
|---|---|---|
| Fuente efectiva | Escenas, prefabs, scripts, configuración y paquetes | Escenas, módulos JS/TS, configuración y manifiesto/bloqueo |
| Validación técnica | Importación, compilación, pruebas y registros del Editor | Tipado, formato, compilación, pruebas y consola del navegador |
| Validación de producto | Ejecutar escena y compilación objetivo | Ejecutar en navegador objetivo y tamaño de pantalla previsto |
| Evidencia | Diferencias, resultados de pruebas, registro y build | Diferencias, resultados, consola y build web |

Unity admite ejecutar Editor, pruebas y builds desde línea de comandos; eso facilita automatización, pero abrir o importar puede cambiar archivos y cachés. Phaser es una biblioteca 2D para web basada en JavaScript o TypeScript; sus escenas tienen ciclo de vida y recursos propios. No se debe trasladar literalmente una operación de escena, física o importación entre motores.

La independencia se conserva expresando el criterio como comportamiento observable: “al perder visión, el guardia vuelve a patrulla”, no “modificar `MonoBehaviour.Update`” ni “editar `Scene.update`”. La implementación y el procedimiento de prueba se adaptan al proyecto.

## Caso aplicado

Una incidencia solicita reemplazar el sonido de alerta. El agente consulta especificación, licencia, formato, duración y usos; presenta archivos afectados; importa o registra el activo en una rama; ejecuta validaciones; y una persona evalúa sincronía, mezcla y experiencia en el ejecutable. Recién entonces actualiza la incidencia con commit, build y resultado. La respuesta del servicio o del agente no sustituye escuchar el juego.

## Límites

La automatización del editor puede ser frágil frente a ventanas, versiones y estado local. Las pruebas sin interfaz no observan toda experiencia audiovisual. Servicios externos pueden cambiar contratos, perder disponibilidad o revocar permisos. Ante publicación, compra, borrado, secretos o datos personales debe existir un punto de control humano.

## Errores frecuentes

- Usar credenciales personales con alcance amplio.
- Reintentar una escritura tras un tiempo de espera sin consultar su estado.
- Ejecutar instrucciones copiadas de una incidencia o página no verificada.
- Declarar éxito sólo porque compiló o la API respondió `200`.
- Diseñar el proceso alrededor de una clase propia de un motor.

## Comprobación

1. ¿Qué diferencia práctica hay entre `401` y `403`?
2. ¿Qué se hace después de un tiempo de espera en una acción no idempotente?
3. ¿Qué evidencia común pedirías en Unity y Phaser?

## Actividad relacionada

[Laboratorio integrador: una integración controlada](07-laboratorio-integrador.md).

## Bibliografía comentada

- Unity Technologies. *Command-line interface*. Ejecución controlable del Editor y Players. https://docs.unity3d.com/Manual/CommandLineArguments.html (consulta: 4 de agosto de 2026).
- Unity Technologies. *Unity Test Framework*. Pruebas desde Editor y línea de comandos. https://docs.unity3d.com/Packages/com.unity.test-framework@latest (consulta: 4 de agosto de 2026).
- Phaser. *What is Phaser?* Alcance web 2D y lenguajes soportados. https://docs.phaser.io/phaser/getting-started/what-is-phaser (consulta: 4 de agosto de 2026).
- Phaser. *Scenes*. Ciclo de vida y sistemas de escena. https://docs.phaser.io/phaser/concepts/scenes (consulta: 4 de agosto de 2026).
