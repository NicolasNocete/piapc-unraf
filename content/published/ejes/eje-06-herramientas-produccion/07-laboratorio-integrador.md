---
id: eje-06-laboratorio-integrador
titulo: Laboratorio integrador de herramientas y producción
eje: 6
orden: 7
tipo: laboratorio
nivel: obligatorio
audiencia: estudiante
clases: [12, 13]
modalidad: mixta
duracion_minutos: 120
resultados: [RA4, RA5, RA6, RA8, RA10, RA11]
prerrequisitos: [eje-06-herramientas-y-aci, eje-06-instrucciones-skills-comandos, eje-06-interoperabilidad-motores-servicios, eje-06-contratos-disciplinas]
evaluable: true
acceso: publico
version: 1
---

# Laboratorio integrador de herramientas y producción

## Situación problemática

Un cambio pequeño de comportamiento requiere consultar una especificación, modificar un proyecto Unity, Phaser o equivalente, coordinar al menos un activo o texto y dejar evidencia en una incidencia simulada. El equipo debe impedir que el agente publique, cierre incidencias o acceda a credenciales.

## Objetivo

Diseñar y ejecutar una integración controlada que distinga consulta de acción, use un contrato interdisciplinario y valide el producto ejecutable.

## Recursos disponibles

- Un proyecto provisto o aprobado por la cátedra, con instrucciones de ejecución.
- Una especificación y una incidencia local o simulada.
- [Registros saneados de documentación, autorización, activo y validación](../../transversales/eje-06-registros-integracion.md) para quien no disponga de integración o modelo.
- Las lecturas de este eje y herramientas locales de compilación/prueba.

## Restricciones

- No usar credenciales reales ni publicar en servicios externos.
- No modificar archivos fuera del alcance acordado.
- No aceptar como evidencia la respuesta del agente.
- Toda acción destructiva, instalación o acceso de red queda denegado o requiere confirmación docente.
- MCP y multimodalidad pueden analizarse con registros; no es obligatorio construir un servidor ni usar un modelo pago.

## Caso verificable: autenticación y autorización

- **Caso:** una integración simulada presenta una credencial ficticia válida asociada a un rol de sólo lectura.
- **Paso:** autenticar la identidad, realizar una consulta permitida e intentar una escritura fuera del alcance del rol.
- **Resultado y evidencia:** la consulta debe completarse y la escritura debe rechazarse con `403`; un registro saneado debe mostrar identidad autenticada, rol o alcance efectivo, operación y estado, sin incluir la credencial. Así se verifica que autenticar una identidad no autoriza cualquier acción.

## Procedimiento

1. Formular un criterio de comportamiento observable y un caso límite.
2. Mapear fuentes de verdad, archivos, activo relacionado y versión ejecutable.
3. Auditar una herramienta: nombre, esquema tipado, salida, errores, efectos, permisos e idempotencia.
4. Elegir y justificar una instrucción persistente, skill, comando o agente especializado. No crear más mecanismos de los necesarios.
5. Completar un contrato entre productor y consumidor del activo o texto: identidad, formato, semántica, límites, aceptación y responsables.
6. Separar consultas y acciones; registrar estado anterior y mostrar el cambio propuesto antes de aplicarlo.
7. Ejecutar el cambio mínimo. Ante resultado parcial o incierto, consultar estado antes de reintentar.
8. Correr validaciones técnicas y probar el comportamiento dentro del motor o build objetivo.
9. Comparar especificación, activo, código/pruebas y ejecutable. Registrar inconsistencias y decisión humana.
10. Simular la actualización de incidencia con referencias a diferencia, prueba y build, sin publicarla.

## Entregable

Un informe de hasta cuatro páginas o equivalente que incluya:

- mapa de integración y matriz de permisos;
- contrato de herramienta y mecanismo reutilizable elegido;
- contrato interdisciplinario;
- diferencia de archivos y registro de acciones/errores;
- matriz de consistencia;
- evidencia técnica y del producto ejecutable;
- decisión final: aceptar, corregir, revertir o escalar.

## Evidencia válida

Resultados reproducibles de compilación o pruebas, diferencia identificada, registros de herramienta, metadatos de activos y ejecución del juego con versión y condiciones. Capturas o video sirven como complemento, no como única prueba. Se excluyen secretos y razonamientos internos del modelo.

## Criterios de evaluación

- La separación consulta/acción y los permisos corresponden a efectos reales.
- Entradas, salidas, errores e idempotencia permiten operar sin ambigüedad.
- La elección entre instrucciones, skill, comando y agente está justificada.
- Autenticación y autorización se distinguen mediante permisos, resultados y evidencia de integración.
- El procedimiento se transfiere entre motores y lenguajes.
- El contrato conecta intención, activo, comportamiento y ejecutable.
- Las conclusiones se sostienen con evidencia independiente.

## Alternativa sin modelos pagos

Usar los [registros públicos provistos](../../transversales/eje-06-registros-integracion.md) y representar manualmente las decisiones del agente. Se evalúa el diseño, la auditoría y la validación, no el proveedor ni la generación automática.

## Condición de publicación

No se publica una solución única. Los ejemplos anonimizados pueden liberarse después de la puesta en común, sin credenciales, datos privados ni contenido de evaluaciones.
