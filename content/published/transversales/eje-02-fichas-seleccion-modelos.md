---
id: transversal-eje-02-fichas-seleccion-modelos
titulo: Fichas de alternativas para selección de modelos
tipo: referencia
audiencia: estudiante
acceso: publico
version: 1
---

# Fichas de alternativas para selección

Datos autocontenidos para la Parte B de la actividad del Eje 2. `Lumbre-3B`, `Nube-R` y `Tabla-R` son alternativas ficticias comparables: no son recomendaciones ni describen productos reales. Las mediciones son **datos de ejercicio** y contienen vacíos deliberados que deben identificarse. No se requiere instalar software, crear una cuenta ni usar credenciales.

## Escenario de medición

- Equipo: CPU de 6 núcleos, 8 GB de RAM, sin GPU dedicada, Windows 11.
- Lote: 120 solicitudes de un rumor, 40 hechos narrativos vigentes y 12 hechos prohibidos.
- Criterio de contradicción: contradice o agrega como cierto un hecho verificable ausente de la ficha vigente.
- Tiempo: desde solicitud hasta texto disponible; 117 de las 120 solicitudes de `Nube-R` tuvieron conectividad.
- Revisión: dos integrantes etiquetaron cada salida; no se registró acuerdo entre evaluadores.
- Las tasas observadas no garantizan comportamiento futuro.

## Ficha L: `Lumbre-3B Q4`

| Campo | Dato provisto |
|---|---|
| Distribución | pesos descargables; ejecutor separado |
| Licencia de pesos | `Lumbre Community 1.1`: uso y modificación, atribución requerida, prohibición de usar salidas para entrenar un modelo competidor |
| Código del ejecutor | licencia MIT |
| Datos de entrenamiento | resumen de categorías; lista completa no publicada |
| Tamaño de descarga | 2.4 GB |
| Pico de RAM observado | 5.9 GB |
| Latencia p50 / p95 | 1.8 s / 4.7 s |
| Solicitudes completadas | 120/120 |
| Contradicciones etiquetadas | 14/120 |
| Salidas fuera de 25 palabras | 9/120 |
| Red durante inferencia | no requerida después de copiar los archivos |
| Retención | el ejecutor no envía telemetría en la configuración probada; conserva historial local si no se desactiva |
| Costo informado | sin tarifa por solicitud; electricidad, integración y revisión no calculadas |
| Fallo observado | en 3 casos devolvió texto vacío tras alcanzar el límite interno |

No se adjuntó opinión legal sobre la compatibilidad de la restricción de entrenamiento con la distribución comercial prevista.

## Ficha S: `Nube-R 2026-02`

| Campo | Dato provisto |
|---|---|
| Distribución | servicio propietario remoto |
| Condiciones | uso comercial permitido mientras la cuenta esté activa; no se distribuyen pesos |
| Datos de entrenamiento | no detallados en la ficha del ejercicio |
| Memoria local | 0.3 GB para cliente y caché |
| Latencia p50 / p95 sobre 117 respuestas | 0.7 s / 2.6 s |
| Solicitudes completadas | 117/120; tres agotaron 8 s sin red estable |
| Contradicciones etiquetadas | 7/117 respuestas |
| Salidas fuera de 25 palabras | 2/117 respuestas |
| Red durante inferencia | obligatoria |
| Retención declarada | entradas y salidas hasta 30 días para abuso; exclusión disponible sólo en otro plan |
| Costo de muestra | USD 0.004 por solicitud; impuestos, conectividad y revisión no incluidos |
| Disponibilidad declarada | objetivo mensual de 99.5 %, sin compensación en el plan medido |
| Fallo observado | el cliente reintentó automáticamente una solicitud y produjo dos identificadores |

La ficha no informa una región fija de procesamiento ni comportamiento exacto ante cambios de versión.

## Ficha R: `Tabla-R`

| Campo | Dato provisto |
|---|---|
| Mecanismo | 80 rumores escritos, etiquetados por misión y seleccionados con reglas y semilla local |
| Licencia | textos originales del estudio; tipografía y audio se evalúan por separado |
| Pico de RAM observado | 18 MB adicionales |
| Latencia p50 / p95 | 2 ms / 4 ms |
| Solicitudes completadas | 120/120 |
| Contradicciones etiquetadas | 1/120 |
| Repeticiones antes de cinco usos | 31/120 |
| Red | no requerida |
| Costo | 14 horas iniciales de escritura y 3 de revisión; mantenimiento no estimado |
| Fallo observado | una etiqueta de misión desactualizada habilitó un rumor antes de tiempo |

## Hechos y controles disponibles

La versión vigente del escenario establece: `Ecos` debe estar completa; Iara no conoce la cámara; la llave no aparece en diálogos; ningún rumor puede nombrar visitantes reales. El bucle principal dispone de un tiempo máximo de 500 ms: una demora debe devolver inmediatamente `Hoy no corre ningún rumor fiable.`

El prototipo admite recuperación de hasta cuatro hechos, lista de expresiones prohibidas, límite de palabras y descarte previo a mostrar. No hay todavía medición del efecto combinado de esos controles.

## Uso del paquete

Completa los requisitos medibles y la matriz solicitada en la actividad. Conserva denominadores, distingue dato observado de declaración de la ficha y registra qué ausencia impide decidir. El paquete no clasifica ni selecciona una alternativa.
