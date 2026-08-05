---
id: eje-07-licencias-autoria-e-integridad
titulo: Procedencia, autoría e integridad profesional
eje: 7
orden: 5
tipo: lectura
nivel: obligatorio
audiencia: estudiante
clases: [7, 11, 13, 14]
modalidad: mixta
duracion_minutos: 22
resultados: [RA10, RA11]
prerrequisitos: [eje-04-repositorios-y-contexto]
evaluable: true
acceso: publico
version: 1
---

# Procedencia, autoría e integridad profesional

## Propósito

Registrar procedencia, licencias, contribuciones y uso de IA para sostener integridad académica, autoría defendible y responsabilidad profesional.

## Por qué importa

Un videojuego combina código, tipografías, música, voces, imágenes, modelos, datos y herramientas. Que un modelo entregue un activo o que un archivo sea accesible en Internet no demuestra que pueda incorporarse, modificarse o distribuirse.

Este material ofrece controles de producción y estudio, no asesoramiento legal. Ante dudas sobre derechos, contratos, datos o políticas institucionales, detené la integración y consultá a la persona o área competente.

## Procedencia antes que apariencia

La **procedencia** permite reconstruir origen y transformaciones de un artefacto. Para cada componente externo o generado registrá:

| Campo | Ejemplo de evidencia |
|---|---|
| Artefacto y versión | nombre, hash o commit |
| Fuente | URL, repositorio o responsable |
| Autoría declarada | créditos disponibles, sin inferir identidad |
| Licencia o permiso | texto/identificador y versión; “sin identificar” si falta |
| Fecha de acceso | momento de obtención |
| Transformaciones | recorte, conversión, generación o edición |
| Uso previsto | prototipo, entrega, distribución |
| Revisión humana | quién decidió integrar y con qué límites |

No inventes una licencia ausente. “Libre”, “royalty-free”, “open source” y “generado por IA” no son licencias específicas. Conservá avisos existentes. Los identificadores SPDX ayudan a nombrar licencias de software de forma inequívoca, pero no deciden compatibilidad ni sustituyen la lectura de sus condiciones.

## Propiedad intelectual, activos y dependencias

Antes de integrar:

1. localizá la fuente original, no sólo una copia;
2. identificá licencia, atribución, restricciones y alcance del permiso;
3. verificá que el uso previsto y la distribución sean compatibles según la política aplicable;
4. registrá dependencias y materiales incorporados;
5. ante origen o permiso inciertos, reemplazá, obtené autorización o escalá la consulta.

Una salida generada puede parecerse a obras o marcas conocidas. La declaración de la herramienta no garantiza originalidad ni habilitación. Revisá indicios, evitá pedir imitaciones de artistas o franquicias y conservá las decisiones tomadas.

## Declaración de uso de IA

Declarar IA no transfiere responsabilidad al modelo. Una declaración breve y verificable puede usar:

```text
Tarea y artefactos afectados:
Herramienta, proveedor y modelo/versión disponible:
Uso realizado: exploración / propuesta / código / activo / revisión
Entradas o instrucciones relevantes conservadas:
Acciones y cambios aceptados, modificados o rechazados:
Fuentes y procedencia verificadas:
Pruebas y revisión humana:
Limitaciones, incidentes o datos no disponibles:
Responsable de la integración:
```

No incluyas secretos, datos personales ni razonamientos internos privados. Si la versión exacta no está disponible, declará ese límite.

## Integridad académica y autoría

La autoría académica exige comprender, seleccionar y defender lo entregado, respetar la consigna y reconocer aportes. Registrar todo un chat no prueba comprensión; ocultar una intervención relevante impide evaluar el proceso.

Conservá:

- especificación y decisiones propias;
- fuentes y atribuciones;
- instrucciones relevantes y resultados utilizados;
- historial de cambios y contribuciones del equipo;
- pruebas, errores, correcciones y desacuerdos;
- declaración final de IA y limitaciones.

En trabajos grupales, distinguí contribuciones sin convertir el registro en vigilancia. Cada integrante debe poder explicar el código, el comportamiento y las decisiones que presenta. La defensa individual y la evidencia observable sostienen la atribución mejor que un detector automático de “texto de IA”, cuyos resultados no prueban autoría.

## Responsabilidad profesional

La persona que integra o publica debe revisar funcionamiento, seguridad, privacidad, licencias y adecuación al diseño. “Lo sugirió el agente” no justifica una decisión. Si no puede explicar un cambio crítico, debe rechazarlo, reducirlo o pedir revisión especializada.

Trazabilidad no significa acumular registros sin criterio: debe permitir reconstruir objetivo, acciones, evidencia y decisiones. Definí también acceso y conservación; los registros pueden contener propiedad privada o datos sensibles.

## Caso aplicado

Un modelo propone música “al estilo exacto” de una compositora y un paquete sin licencia visible. El equipo no los integra. Sustituye la solicitud por atributos musicales propios del diseño, usa un activo con fuente y permiso verificables y registra las transformaciones. En la entrega declara qué partes fueron asistidas, cómo se revisaron y quién aprobó su incorporación.

## Límites

La trazabilidad no resuelve por sí sola titularidad, compatibilidad de licencias ni validez contractual. Las reglas cambian según institución, jurisdicción, proveedor y tipo de obra. El control correcto ante incertidumbre no es adivinar: es detener y consultar.

## Errores frecuentes

- Citar al modelo como fuente factual.
- Suponer que gratuito equivale a reutilizable.
- Borrar avisos al copiar código.
- Declarar “se usó IA” sin indicar dónde ni cómo.
- Presentar registros extensos sin decisiones ni evidencia.
- Delegar en un detector automático la decisión de autoría.
- Integrar algo que nadie del equipo puede explicar.

## Comprobación

1. ¿Qué diferencia fuente, autoría declarada y licencia?
2. ¿Qué debe incluir una declaración útil de IA?
3. ¿Por qué un detector no demuestra autoría?
4. ¿Qué hacés cuando el permiso de un activo no puede verificarse?

## Actividad relacionada

Las [listas de verificación (checklists) operativas](06-checklists-operativos.md) integran procedencia y declaración al cierre de cada intervención.

## Bibliografía comentada

- NIST (2024). *Generative AI Profile*. Recomendaciones sobre procedencia, transparencia, propiedad intelectual y documentación de riesgos. https://doi.org/10.6028/NIST.AI.600-1
- SPDX. *Handling License Info*. Identificadores estandarizados para comunicar licencias; no reemplazan evaluación jurídica. https://spdx.dev/learn/handling-license-info/ (consulta: 4 de agosto de 2026).
- Creative Commons. *CC Licenses*. Referencia primaria para distinguir permisos y condiciones de sus seis licencias; debe leerse la licencia concreta. https://creativecommons.org/share-your-work/cclicenses/ (consulta: 4 de agosto de 2026).
