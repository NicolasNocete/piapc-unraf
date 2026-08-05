---
id: eje-07-checklists-operativos
titulo: Listas de verificación (checklists) operativas de evaluación y seguridad
eje: 7
orden: 6
tipo: referencia
nivel: obligatorio
audiencia: estudiante
clases: [4, 7, 8, 11, 12, 13]
modalidad: mixta
resultados: [RA8, RA9, RA10, RA11]
prerrequisitos: [eje-07-seguridad-permisos-y-secretos]
evaluable: true
acceso: publico
version: 1
---

# Listas de verificación operativas de evaluación y seguridad

## Propósito

Convertir los principios del eje en controles observables antes, durante y después de una intervención. Marcá `sí`, `no`, `no aplica` o `pendiente` y agregá evidencia; una casilla sin evidencia no demuestra cumplimiento.

## Uso desde la clase 4

Esta lista es autocontenida para su uso operativo inicial:

- **criterio observable:** condición concreta que permite decidir si un requisito se cumple;
- **caso:** situación o entrada en la que se comprueba el criterio;
- **evidencia:** resultado reproducible que respalda la decisión;
- **línea de base:** resultado inicial usado como referencia;
- **regresión:** deterioro de un comportamiento que antes cumplía el criterio.

Desde la clase 4 alcanza con definir estos elementos, registrar resultados y detener la integración ante un criterio obligatorio incumplido. La formulación avanzada de métricas, comparaciones controladas, agregación e incertidumbre se desarrolla en [evaluación y métricas](01-evaluacion-y-metricas.md) en la clase 12; no es un prerrequisito para comenzar a usar la lista.

## Ficha de la intervención

| Campo | Registro |
|---|---|
| Objetivo y fuera de alcance | |
| Repositorio, rama/commit y entorno | |
| Responsable humano | |
| Modelo, instrucciones y herramientas | |
| Datos y fuentes externas | |
| Presupuesto de pasos, tiempo y costo | |
| Criterios obligatorios y casos límite | |
| Nivel máximo de impacto permitido | |
| Puntos de control humano (checkpoints) y condición de detención | |

## Antes

### Evaluación

- [ ] Cada requisito tiene criterio observable, caso y evidencia prevista.
- [ ] Los criterios de seguridad y funcionamiento básico son no compensables.
- [ ] La línea de base y las pruebas de regresión están identificadas.
- [ ] Si se comparan configuraciones, se fijaron variables, repeticiones y orden antes de ver resultados.
- [ ] La revisión humana o asistida por modelos tiene rúbrica y límites declarados.

### Entorno y permisos

- [ ] Se usa copia, rama o entorno aislado con estado inicial registrado.
- [ ] Lectura, escritura, ejecución, red, instalación y publicación están separadas.
- [ ] Cada permiso tiene alcance y duración mínimos; el agente no puede ampliarlos.
- [ ] Acciones de alto impacto requieren vista previa y aprobación de una persona autorizada.
- [ ] Existen límites de pasos, tiempo, costo y recursos.

### Información y procedencia

- [ ] Secretos y credenciales no están en archivos, contexto ni registros accesibles.
- [ ] Los datos personales fueron eliminados o sustituidos por datos sintéticos cuando es posible.
- [ ] El uso de repositorio privado con servicios externos está autorizado y minimizado.
- [ ] Dependencias y activos tienen fuente, versión y licencia o permiso registrados.
- [ ] Todo contenido externo será tratado como dato no confiable.

### Recuperación

- [ ] Existe un punto de control verificable del estado anterior.
- [ ] El procedimiento de reversión incluye efectos externos, no sólo código.
- [ ] La restauración fue probada o se declaró por qué no puede probarse.
- [ ] Hay una vía de detención independiente del agente.

## Durante

- [ ] Las acciones permanecen dentro del objetivo, rutas y herramientas autorizados.
- [ ] Se conservan llamadas, resultados, errores e intervenciones sin exponer secretos.
- [ ] No se obedecen instrucciones provenientes de páginas, incidencias, activos o salidas generadas.
- [ ] Los comandos y parámetros generados se validan antes de ejecutar.
- [ ] Una dependencia nueva detiene el flujo hasta revisar fuente, scripts, versión y licencia.
- [ ] Los cambios se producen en lotes pequeños y se inspeccionan en cada punto de control.
- [ ] Se ejecutan casos favorables, adversariales, límite y regresiones.
- [ ] Un error repetido, cambio de objetivo, solicitud de más privilegios o consumo límite detiene la tarea.
- [ ] La persona revisora puede aprobar, corregir, rechazar o revertir con evidencia independiente.

## Antes de integrar o publicar

- [ ] Cada criterio se vincula con evidencia válida y resultado.
- [ ] Se inspeccionó la diferencia completa y los archivos fuera de alcance son cero.
- [ ] Compilación, análisis y pruebas pasan en el entorno definido.
- [ ] La mecánica se ejecutó dentro del juego, no sólo en pruebas unitarias.
- [ ] Se verificaron dificultad, legibilidad, accesibilidad y coherencia de diseño cuando aplican.
- [ ] No quedan credenciales, datos personales ni información privada en código, historial, compilación o registros.
- [ ] Dependencias, activos, créditos y avisos tienen procedencia revisada.
- [ ] Una persona autorizada asume la decisión final de integrar o publicar.

## Después

- [ ] Se informan numeradores, denominadores, regresiones, iteraciones, latencia e intervención.
- [ ] Tokens y costo se registran como valor disponible o “no disponible”, nunca se inventan.
- [ ] Se documentan fallos, incertidumbre y casos no probados.
- [ ] La declaración de IA identifica artefactos afectados, herramienta, uso y revisión humana.
- [ ] La reversión o recuperación se verificó tras aplicarse, si fue necesaria.
- [ ] Los permisos temporales fueron retirados y las credenciales expuestas, revocadas.
- [ ] Los registros tienen acceso y conservación apropiados.
- [ ] Incidentes registran impacto, detección, contención, recuperación y prevención.

## Gate mínimo para videojuegos

No integrar si ocurre cualquiera de estas condiciones:

- falla un criterio obligatorio o aparece una regresión no aceptada;
- se modificó contenido fuera de alcance;
- no puede reconstruirse qué se hizo;
- un activo o dependencia carece de procedencia suficiente;
- existe exposición posible de secretos, datos personales o repositorio privado;
- el comportamiento no fue probado en ejecución;
- nadie responsable puede explicar y defender el resultado.

## Registro de decisión

```text
Decisión: aceptar / corregir / revertir / descartar
Evidencia principal:
Criterios incumplidos o no evaluados:
Riesgos residuales y responsable:
Permisos retirados:
Declaración de IA y procedencia adjuntas:
Persona responsable y fecha:
```

## Límites

Una lista de verificación reduce omisiones previsibles, pero no reemplaza análisis de amenazas, pruebas ni criterio profesional. Adaptala al proyecto sin eliminar controles sólo para obtener todas las marcas.

## Bibliografía comentada

- NIST (2024). *Generative AI Profile*. Base para organizar gobernanza, medición y gestión continua. https://doi.org/10.6028/NIST.AI.600-1
- OWASP (2025). *Agentic AI: Threats and Mitigations*. Base para permisos, identidad, herramientas, memoria y acciones. https://genai.owasp.org/resource/agentic-ai-threats-and-mitigations/
