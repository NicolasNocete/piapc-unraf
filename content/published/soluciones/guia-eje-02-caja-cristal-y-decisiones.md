---
id: solucion-eje-02-caja-cristal-y-decisiones
titulo: Guía de análisis y soluciones modelo del Eje 2
tipo: solucion
audiencia: estudiante
acceso: publico
version: 1
---

# Guía de análisis y soluciones modelo del Eje 2

## Condición de publicación y alcance

Esta guía se publica después del cierre de las actividades del Eje 2. Reúne orientaciones y soluciones modelo para el [laboratorio de caja de cristal](../ejes/eje-02-redes-y-llm/05-laboratorio-caja-de-cristal.md) y la [actividad de errores conceptuales](../ejes/eje-02-redes-y-llm/06-errores-conceptuales.md).

No hay una respuesta textual única. Los conteos, salidas y decisiones de esta página se limitan a las [muestras del laboratorio](../transversales/eje-02-muestras-caja-cristal.md) y a las [fichas de alternativas](../transversales/eje-02-fichas-seleccion-modelos.md). Una respuesta diferente puede ser correcta si declara sus supuestos, usa evidencia pertinente y reconoce sus límites.

## 1. Laboratorio: caja de cristal

### Orientación para el análisis

- Registrar una comparación no basta: debe indicarse qué variable cambió y qué se mantuvo fija.
- El resultado observable no autoriza una afirmación sobre todos los modelos, tokenizadores o ejecuciones futuras.
- Ante reglas contradictorias, la respuesta del modelo no decide cuál es válida. La vigencia y versión de la fuente son controles externos.
- La recuperación debe separar semejanza textual, pertinencia para la consulta y validez del documento.

### Solución modelo con las muestras públicas

| Estación | Observación modelo | Interpretación limitada | Control externo necesario |
|---|---|---|---|
| Tokenización | `Ficha-A` pasa de 38 a 35 tokens y `Ficha-B` de 46 a 40 al reemplazar `Llave_del_Santuario🔑` por `SanctuaryKey`. | El identificador, el guion bajo y el emoji afectan la segmentación de estos dos tokenizadores didácticos; una palabra, carácter o emoji no equivale necesariamente a un token. | Medir con el tokenizador y la versión del modelo que se utilizarán realmente. |
| Contexto | C1 comprueba la llave; C2 agrega su consumo; C3 sigue el documento antiguo y omite la regla vigente. | La salida es sensible al contexto y puede priorizar una afirmación contradictoria. No prueba que el modelo comprenda la jerarquía de fuentes. | Seleccionar sólo reglas vigentes, conservar versión y estado, y validar la operación contra la API real de inventario. |
| Variabilidad | Las salidas B cumplen el máximo de 25 palabras y no agregan hechos del registro. A2 inventa un mapa y A3 agrega rotura y guardianes; A1 y A3 difieren aun con semilla 4815 registrada. | En esta muestra, la configuración de mayor variación produjo hechos no respaldados. La misma semilla registrada no garantiza bytes idénticos sin versión de inferencia y garantía del proveedor. | Repetir en el entorno objetivo, fijar lo que el servicio permita y contrastar cada hecho con fuentes vigentes. |
| Recuperación | B es la fuente para responder la consulta: es vigente y menciona la llave y `Ecos`. A coincide más con la pregunta que B, pero está archivada. C tiene mayor similitud léxica, pero trata otra llave. | La similitud no decide por sí sola qué fragmento debe usarse. | Filtrar por estado vigente, conservar identificador y versión, y revisar la pertinencia antes de construir el contexto. |

Una conclusión modelo es: antes de integrar la apertura de la puerta, el equipo debe usar una fuente versionada de reglas vigentes y ejecutar pruebas contra la función real de inventario. También debe registrar configuración, entradas y salidas para detectar cambios de tokenización o generación.

### Errores frecuentes

- Informar los totales de tokens sin indicar tokenizador, versión o texto exacto.
- Decir que C3 es correcta porque la respuesta parece coherente, sin resolver la contradicción documental.
- Usar tres ejecuciones como estimación concluyente de calidad o seguridad.
- Elegir C sólo por su similitud, aunque no responda cuándo se abre el santuario.

## 2. Errores conceptuales y decisiones sobre modelos

### Orientación para el diagnóstico

Una reformulación defendible nombra el mecanismo, conserva las condiciones que siguen siendo inciertas y señala cómo se comprobaría. No reemplaza la evidencia con expresiones como "la IA entiende" o "el modelo sabe".

### Solución modelo de afirmaciones

| Afirmación | Diagnóstico y reformulación modelo | Evidencia o prueba pertinente |
|---|---|---|
| Adjuntar la biblia narrativa ajusta los parámetros. | Incorrecta. Adjuntar texto al contexto cambia las entradas de la inferencia, no los parámetros. Ajustar parámetros requiere un proceso de entrenamiento o adaptación con artefactos y configuración específicos. | Registro de entrenamiento o documentación de un adaptador. |
| Cada palabra ocupa un token. | Incorrecta. Un tokenizador puede dividir una palabra, agrupar segmentos o representar símbolos de forma distinta según su vocabulario. | Conteo con el tokenizador y versión concretos. |
| El documento con embedding más cercano contiene la respuesta correcta. | Insuficiente. La cercanía ordena según una representación y una medida, pero la fuente puede estar archivada o ser irrelevante. | Metadatos de vigencia, versión y revisión de pertinencia. |
| El siguiente token más probable es el dato más verdadero. | Incorrecta. La probabilidad de generación depende del contexto y no verifica la verdad del contenido. | Contraste con una fuente primaria o una ejecución verificable. |
| Con temperatura cero siempre obtenemos los mismos bytes. | Insuficiente. Puede reducir la variación, pero el proveedor, la versión, la semilla, el muestreo y la infraestructura pueden alterar el resultado. | Repeticiones documentadas y garantía explícita del proveedor. |
| Pesos abiertos significa código y datos abiertos. | Incorrecta. Pesos, código, datos y licencia son componentes distintos que deben verificarse por separado. | Licencias y documentación de cada componente. |
| Local significa privado y gratuito. | Incorrecta. Ejecutar localmente puede evitar una llamada remota, pero puede conservar historiales, requerir hardware y tener restricciones de licencia o costos de operación. | Configuración de retención, licencia, costo total y auditoría del entorno. |
| Una respuesta fluida indica conocimiento actualizado. | Incorrecta. La fluidez no prueba fecha, fuente ni cobertura de la información. | Fuente versionada recuperada y fecha de consulta. |

### Solución modelo para el caso de selección

Con las fichas disponibles, una decisión defendible es seleccionar `Tabla-R` para el bucle principal y no usar un LLM generativo en tiempo real. Cumple la operación sin red, su p95 de 4 ms queda bajo el máximo de 500 ms, usa 18 MB adicionales y tuvo 1 contradicción en 120 solicitudes. Su repetición de rumores y la etiqueta desactualizada siguen siendo límites que deben controlarse.

`Lumbre-3B Q4` satisface el requisito sin red y completó las solicitudes, pero su p95 de 4.7 s excede el presupuesto del bucle principal y observó 14 contradicciones en 120 casos. `Nube-R` presenta menor latencia observada, pero exige red, dejó 3 solicitudes sin completar y conserva entradas y salidas durante 30 días en el plan medido. Ninguna de estas alternativas debe incorporarse al bucle principal con los datos actuales.

Un diseño mínimo usa rumores preproducidos etiquetados por misión, consulta hechos vigentes antes de seleccionar, filtra expresiones prohibidas y devuelve `Hoy no corre ningún rumor fiable.` ante una etiqueta inválida, demora o ausencia de un rumor válido. Dos evidencias pendientes son una prueba de carga con el contenido definitivo y una revisión de que las etiquetas no habiliten hechos antes de tiempo. Persisten el riesgo de repetición y los errores de mantenimiento de la base de rumores.

### Errores frecuentes

- Seleccionar la alternativa con el menor p50 sin comparar el p95 con el presupuesto de 500 ms.
- Llamar privado a un servicio remoto sin revisar su retención.
- Declarar que los pesos descargables resuelven por sí solos licencia, integración y costo.
- Omitir la decisión de no usar un LLM cuando satisface mejor los requisitos del caso.

## Qué sigue requiriendo producción propia

Cada estudiante o equipo debe documentar sus propias entradas, condiciones, fuentes, mediciones y límites. Esta guía no reemplaza la trazabilidad de una entrega ni convierte sus valores de ejemplo en resultados de otro modelo, versión o proyecto.
