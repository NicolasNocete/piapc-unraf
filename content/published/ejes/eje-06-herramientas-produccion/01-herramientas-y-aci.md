---
id: eje-06-herramientas-y-aci
titulo: Herramientas e interfaces entre agentes y computadoras
eje: 6
orden: 1
tipo: lectura
nivel: obligatorio
audiencia: estudiante
clases: [4, 7, 12]
modalidad: mixta
duracion_minutos: 22
resultados: [RA6, RA10]
prerrequisitos: [eje-03-chat-workflow-y-agente]
evaluable: true
acceso: publico
version: 1
---

# Herramientas e interfaces entre agentes y computadoras

## Propósito

Diseñar y auditar herramientas con contratos tipados, efectos explícitos y resultados verificables.

## Por qué importa

Un modelo produce salidas; para actuar sobre un repositorio o motor necesita herramientas externas.

## Modelo mental: consulta y acción

Una herramienta de consulta obtiene información: leer código, buscar referencias o consultar una versión. Una herramienta de acción intenta cambiar el entorno: editar, crear una escena, importar un recurso o publicar.

La distinción depende de efectos reales. Compilar o abrir Unity puede generar cachés aunque no edite código fuente.

## Conceptos centrales: anatomía de una herramienta

| Elemento | Pregunta |
|---|---|
| Nombre | ¿Qué operación concreta representa? |
| Descripción | ¿Cuándo debe usarse y cuándo no? |
| Parámetros | ¿Qué entradas, tipos y límites acepta? |
| Precondiciones | ¿Qué debe cumplirse antes? |
| Salida | ¿Qué resultado estructurado devuelve? |
| Error | ¿Cómo comunica un fallo o cambio parcial? |
| Efectos | ¿Qué estado puede modificar? |
| Idempotencia | ¿Qué ocurre si se repite la llamada? |

“Arreglar juego” con un parámetro de texto libre mezcla diagnóstico, edición y publicación. “Establecer velocidad del jugador” con escena, objeto, valor acotado y lista de archivos modificados resulta más verificable.

## Esquemas tipados

Un esquema separa una llamada válida de una frase plausible. Debe expresar campos requeridos, tipos, enumeraciones, rangos y si se admiten propiedades adicionales. Por ejemplo:

```json
{
  "type": "object",
  "properties": {
    "actorId": { "type": "string", "minLength": 1 },
    "speed": { "type": "number", "minimum": 0, "maximum": 20 },
    "mode": { "enum": ["preview", "apply"] }
  },
  "required": ["actorId", "speed", "mode"],
  "additionalProperties": false
}
```

Validar el esquema evita valores mal formados, pero no prueba que `actorId` exista ni que la velocidad sea adecuada para el diseño. Esas son precondiciones del dominio. Los tipos del lenguaje y JSON Schema son implementaciones posibles del mismo principio transferible: validar antes de producir efectos.

## Salidas y errores

Una salida útil no se limita a “completado”. Debe distinguir estado y evidencia:

```json
{
  "status": "applied",
  "changed": [{ "path": "actors/player", "before": 6, "after": 8 }],
  "warnings": [],
  "evidence": ["build://run/184"]
}
```

Un error de contrato, como un parámetro desconocido, debe impedir la ejecución. Un error del dominio, como “actor inexistente”, puede devolverse de forma estructurada y corregible. Un fallo técnico, como tiempo de espera, no autoriza a suponer que nada cambió: la salida debe indicar `not_applied`, `partially_applied` o `unknown` cuando pueda determinarlo, junto con un identificador de operación. No se debe reintentar a ciegas un resultado parcial o incierto.

Las salidas estructuradas facilitan validación automática, pero los mensajes legibles siguen siendo útiles para diagnóstico. Ninguno reemplaza evidencia independiente.

## Interfaz entre agente y computadora

La interfaz entre agente y computadora (*Agent-Computer Interface*, ACI) reúne herramientas, formatos y observaciones:

```text
agente selecciona herramienta
        ↓
ACI valida parámetros y permisos
        ↓
entorno ejecuta o rechaza
        ↓
resultado estructurado
        ↓
verificar, ajustar, terminar o escalar
```

Dar acceso irrestricto a una terminal no es diseñar una buena ACI. Conviene ofrecer operaciones relevantes, limitadas y observables. Una ACI eficaz reduce ambigüedad: nombres verbales específicos, descripciones que incluyen cuándo no usar la operación, unidades explícitas, valores acotados, respuestas estables y observaciones suficientes para decidir el paso siguiente.

## Idempotencia

Una operación es idempotente si repetirla con la misma entrada conserva el mismo estado final. `establecer_velocidad(8)` puede serlo; `incrementar_velocidad(2)` acumula efectos.

Para acciones no idempotentes se necesitan identificadores, detección de duplicados, vista previa, registro anterior y confirmación antes de reintentar.

Idempotencia no equivale a inocuidad: sobrescribir siempre el mismo archivo puede ser idempotente y destructivo. Tampoco garantiza éxito ante concurrencia. Cuando el estado puede cambiar entre consulta y acción, conviene incluir una versión esperada o huella del recurso y rechazar la escritura si ya no coincide.

## Permisos y confirmaciones

Separá lectura, escritura, ejecución, red, credenciales y publicación. Aplicá menor privilegio: sólo capacidades necesarias durante el tiempo necesario.

Confirmá antes de eliminar, sobrescribir, instalar dependencias, acceder a secretos o publicar. La solicitud debe mostrar acción, alcance, efectos y reversibilidad; “¿continuar?” no alcanza.

## Casos

### Unity

Consultar si una escena contiene un componente debe preceder a modificarla. Evidencia: diferencia de escena, valor anterior/nuevo, compilación y prueba en ejecución.

### Phaser

Para cambiar `Player.ts`, primero se consulta definición y usos; luego se aplica una edición acotada y se ejecutan compilación y pruebas. Compilar no demuestra que la experiencia sea correcta: todavía hace falta comprobación dentro del juego.

## Límites

Un contrato no puede enumerar toda intención humana ni neutralizar una implementación maliciosa. Esquemas, permisos, aislamiento, registros y pruebas son capas complementarias. Una herramienta amplia puede ser apropiada para exploración local supervisada; no por eso debe conservar el mismo permiso al publicar o acceder a producción.

## Actividad breve

Auditá una herramienta llamada `actualizar_proyecto` que recibe texto libre, ejecuta comandos y responde “completado”. Proponé:

- nombre más preciso;
- parámetros y límites;
- salida y errores;
- efectos laterales;
- permisos mínimos;
- confirmación necesaria;
- evidencia independiente.

## Errores frecuentes

- Nombres amplios que ocultan capacidades.
- Salidas sólo en texto libre.
- Reintentos automáticos de acciones no idempotentes.
- Confirmaciones sin alcance.
- Considerar consulta toda operación que no edita código.
- Aceptar el reporte del agente como prueba.

## Comprobación

1. ¿Una consulta nunca tiene efectos laterales?
2. ¿Por qué establecer un valor es más seguro de reintentar que incrementarlo?
3. ¿Compilar demuestra funcionamiento dentro del juego?
4. ¿Qué diferencia hay entre un error de contrato y un resultado de estado desconocido?

## Actividad relacionada

[Laboratorio integrador: una integración controlada](07-laboratorio-integrador.md).

## Bibliografía comentada

- Yang, J. et al. (2024). “SWE-agent”. https://arxiv.org/abs/2405.15793
- Anthropic. (2024). *Building Effective Agents*. Perspectiva técnica complementaria. https://www.anthropic.com/research/building-effective-agents
- Model Context Protocol. *Tools*. Esquemas de entrada y salida, resultados estructurados y errores. https://modelcontextprotocol.io/specification/2025-06-18/server/tools (consulta: 4 de agosto de 2026).
- NIST (2024). *Generative AI Profile*. https://doi.org/10.6028/NIST.AI.600-1
- Unity Technologies. *Unity Manual*. Referencia para contrastar operaciones y efectos dentro del motor. https://docs.unity3d.com/ (consulta: 4 de agosto de 2026).
- Phaser. *Phaser Documentation*. Referencia para estructura, ejecución y validación de proyectos Phaser. https://docs.phaser.io/ (consulta: 4 de agosto de 2026).
