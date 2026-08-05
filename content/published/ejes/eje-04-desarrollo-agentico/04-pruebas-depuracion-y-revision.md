---
id: eje-04-pruebas-depuracion-y-revision
titulo: Validación, depuración y revisión por evidencia
eje: 4
orden: 4
tipo: lectura
nivel: obligatorio
audiencia: estudiante
clases: [8, 11]
modalidad: mixta
duracion_minutos: 25
resultados: [RA5, RA8, RA11]
prerrequisitos: [eje-04-implementacion-git-y-reversibilidad]
evaluable: true
acceso: publico
version: 1
---

# Validación, depuración y revisión por evidencia

## Propósito

Validar cambios con controles complementarios y depurar fallos mediante reproducción, hipótesis, instrumentación y verificación de la corrección.

## Por qué importa

Un juego puede compilar y fallar en ejecución; una prueba puede aprobar y no cubrir la experiencia buscada. La validación combina evidencia mecánica y revisión humana en lugar de confiar en el informe del agente.

## Modelo mental: capas de validación

Conviene ejecutar primero el control más rápido y cercano al cambio y luego ampliar:

1. **Formato:** representación consistente; no demuestra corrección.
2. **Análisis estático o lint:** patrones inválidos, tipos o convenciones.
3. **Compilación:** el programa puede transformarse en un artefacto ejecutable.
4. **Prueba enfocada:** comprueba el criterio modificado con diagnóstico rápido.
5. **Suite completa:** busca regresiones conocidas.
6. **Ejecución del juego:** observa integración, tiempos, entradas y experiencia.
7. **Revisión del diff:** detecta alcance indebido, deuda, secretos y pruebas débiles.

El orden puede variar por proyecto, pero cada omisión se justifica. “Todos los tests pasan” sólo significa que las pruebas ejecutadas no detectaron un fallo.

## Conceptos centrales: depuración dirigida por evidencia

```text
reproducir → observar → formular hipótesis → predecir
→ instrumentar → ejecutar → descartar o sostener
→ corregir mínimo → repetir reproducción → buscar regresiones
```

### Reproducción

Definí versión, entorno, estado inicial, entradas y resultado esperado/obtenido. Reducí el caso sin eliminar la condición que causa el fallo. Si no se reproduce, registrá frecuencia y datos faltantes; no edites al azar.

### Hipótesis y predicción

Una hipótesis debe poder fallar. “La marca temporal se reinicia cada cuadro” predice múltiples escrituras durante investigación. “Hay algo mal con el tiempo” no orienta una observación.

### Instrumentación y registros

Agregá temporalmente observaciones en límites relevantes: estado anterior/nuevo, evento, tiempo y entidad. Los registros deben ser estructurados, acotados y libres de secretos. Un exceso de logs oculta la señal y puede alterar rendimiento o temporización.

### Corrección y verificación

La misma reproducción debe pasar después del cambio y, de ser posible, convertirse en prueba de regresión. Luego se ejecutan controles amplios. Se retira instrumentación temporal o se justifica su permanencia.

## Caso aplicado

El guardia vuelve a patrulla instantáneamente. Reproducción: perder visión a los 1200 ms; resultado esperado, investigar hasta 4200 ms; obtenido, patrullar a los 1216 ms. Hipótesis: se comparan milisegundos con un plazo expresado en segundos. Un log temporal de `elapsed` y `timeout` confirma `16 >= 3`. Se unifican unidades, la reproducción pasa a los 3000 ms y una prueba de regresión cubre el límite exacto. La suite y la ejecución verifican que recuperar visión todavía interrumpe la espera.

## Revisar más que corrección local

La revisión conecta:

- criterio y evidencia;
- cambio y arquitectura;
- alcance declarado y archivos reales;
- manejo de errores y casos límite;
- claridad, mantenibilidad y rendimiento;
- riesgos pendientes y validaciones omitidas.

Las observaciones se apoyan en rutas, líneas, salidas o pasos reproducibles. Una preferencia de estilo no debe presentarse como defecto funcional.

## Límites

La instrumentación puede cambiar un fallo sensible al tiempo. Las pruebas automatizadas no sustituyen la evaluación visual o jugable, y una sesión manual no ofrece cobertura repetible. Los fallos intermitentes requieren múltiples ejecuciones y control del entorno.

## Errores frecuentes

- Corregir antes de reproducir.
- Cambiar varias causas posibles simultáneamente.
- Registrar datos sin una hipótesis ni predicción.
- Conservar logs ruidosos o información sensible.
- Ejecutar sólo la nueva prueba.
- Revisar el código sin leer el diff completo.
- Aceptar la afirmación “todo pasó” sin salida verificable.

## Comprobación

1. ¿Qué demuestra compilar y qué no demuestra?
2. ¿Cómo se vuelve refutable una hipótesis?
3. ¿Por qué repetir exactamente la reproducción después del cambio?
4. ¿Qué evidencia exigirías para un fallo intermitente?

## Actividad relacionada

Documentá cada criterio y resultado con la [plantilla de evidencia](../../plantillas/06-evidencia-pruebas.md) durante el [laboratorio](07-laboratorio-flujo-completo.md).

## Bibliografía comentada

- Jimenez, C. et al. (2024). “SWE-bench”. Discute evaluación de resoluciones mediante pruebas asociadas a tareas reales. https://arxiv.org/abs/2310.06770
- Zeller, A. (2009). *Why Programs Fail* (2.ª ed.). Método sistemático de depuración y causalidad; lectura de ampliación.
- Git Project. *git-diff*. Fuente primaria para inspeccionar cambios antes de integrar. https://git-scm.com/docs/git-diff
