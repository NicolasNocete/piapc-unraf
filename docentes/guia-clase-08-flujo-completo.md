# Guía docente: clase 8 - Flujo completo de desarrollo agéntico

**Fecha:** 30 de septiembre de 2026<br>
**Modalidad:** presencial<br>
**Duración:** 120 minutos

## Propósito

Retomar la producción de especificaciones que no quedó consolidada en la clase recuperada y practicar un ciclo completo de exploración, especificación, planificación, implementación, validación y revisión sobre upgrades visibles y jugables de Guardia de Sigilo.

## Preparación previa

1. Confirmar que cada estudiante dispone de un repositorio individual basado en Guardia de Sigilo, con commit inicial y estado conocido.
2. Revisar laboratorio, plantillas, lectura de especificaciones y lectura de jugo de juego.
3. Confirmar los diez upgrades, el mínimo obligatorio de cinco y la entrega del 6 de octubre a las 23:59.
4. Definir límites de permisos y reversibilidad para el ejercicio.

## Materiales

- Especificaciones y planes verificables.
- Validación, depuración y revisión por evidencia.
- Laboratorio de intervención agéntica completa.
- Listas de verificación operativas.
- Jugo de juego, feedback y evidencia de una mejora.
- Catálogo de upgrades, prompt inicial y herramienta `question`.

## Secuencia

1. **Recuperar specs y planes (10 min).** Explicar que un prompt ayuda a explorar, pero una spec versionada conserva objetivo, alcance y aceptación entre sesiones. Diferenciar evidencia, supuesto y decisión de diseño.
2. **Presentar jugo de juego (15 min).** Mostrar anticipación, impacto y recuperación. Usar el impacto visual extremo de alerta como ejemplo técnico: shake, flash, zoom y partículas no reemplazan la regla del juego.
3. **Elegir práctica y entrega (15 min).** Presentar los diez upgrades. Cada estudiante selecciona cinco para su repositorio individual; los cinco completos se entregan antes del 6 de octubre a las 23:59.
4. **Explorar antes de especificar (20 min).** Leer `README.md`, `AGENTS.md`, arquitectura, hitos, pruebas, scripts y estado de Git. Usar el prompt inicial sólo en lectura; el agente debe citar rutas, separar evidencia y usar `question` para decisiones abiertas.
5. **Especificar y planificar (20 min).** Crear la spec y el plan del primer upgrade. Revisar al menos un criterio por estudiante o pareja; impedir que se autorice escritura sin alcance, restricciones y evidencia prevista.
6. **Construir un primer incremento (20 min).** Implementar sólo el incremento autorizado, ejecutar la comprobación cercana y revisar el diff.
7. **Registrar y continuar (20 min).** Conservar resultado, limitaciones y siguiente paso. Organizar los cuatro upgrades restantes para completarlos de forma individual antes del vencimiento.

## Preguntas y respuestas esperables

- ¿Por qué una spec no se reemplaza por un prompt? Porque registra un acuerdo revisable y versionado; el historial de una conversación puede perder contexto, resumirse o no estar disponible.
- ¿Qué diferencia una mecánica de su jugo? La mecánica cambia una regla o decisión; el jugo comunica y enfatiza sus consecuencias mediante feedback.
- ¿Una prueba aprobada demuestra que el cambio es correcto? Solo demuestra lo cubierto por esa prueba; hay que contrastarla con los criterios de aceptación.
- ¿Cuándo se debe detener el agente? Ante ambigüedad, falta de permiso, resultado inesperado o condición de riesgo definida.

## Entregable o resultado esperado

Un primer upgrade iniciado en clase y un portafolio individual de al menos cinco upgrades completos: spec, plan, build, validación, evidencia y revisión crítica por cada uno.

## Criterios de observación docente

- Mantiene trazabilidad de decisiones y herramientas.
- Revisa diferencias antes de concluir.
- No confunde finalización del comando con aceptación del cambio.
- Relaciona cada efecto visual con un disparador, una duración, un límite y una condición de retorno.
- No presenta una animación, cámara o interfaz como fuente de verdad de la lógica.
