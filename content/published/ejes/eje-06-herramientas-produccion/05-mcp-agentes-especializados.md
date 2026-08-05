---
id: eje-06-mcp-agentes-especializados
titulo: MCP y separación de responsabilidades
eje: 6
orden: 5
tipo: lectura
nivel: demostrativo
audiencia: estudiante
clases: [12]
modalidad: mixta
duracion_minutos: 24
resultados: [RA6, RA10, RA11]
prerrequisitos: [eje-06-herramientas-y-aci, eje-06-instrucciones-skills-comandos]
evaluable: true
acceso: publico
version: 1
---

# MCP y separación de responsabilidades

## Propósito

Explicar la arquitectura cliente-servidor y las primitivas de MCP, y evaluar una conexión sin confundir interoperabilidad con confianza.

## Por qué importa

MCP permite descubrir capacidades de sistemas distintos con una interfaz común. Esa comodidad aumenta el impacto de una configuración excesiva y vuelve esencial saber qué garantiza el protocolo y qué debe controlar la aplicación.

## Modelo mental

El Protocolo de Contexto de Modelo (*Model Context Protocol*, MCP) estandariza mensajes entre una aplicación de IA y servidores que exponen contexto o capacidades.

```text
aplicación anfitriona
├── cliente MCP A ↔ servidor local A
└── cliente MCP B ↔ servidor remoto B ↔ sistema externo
```

La aplicación anfitriona coordina modelo, interfaz, consentimiento y varios clientes. Cada cliente mantiene la conexión con un servidor. El servidor puede correr como proceso local mediante entrada/salida estándar o ser remoto mediante HTTP. Que sea “local” describe despliegue, no confianza: un paquete local también puede leer datos o ejecutar código.

## Conceptos centrales: primitivas del servidor

| Primitiva | Control típico | Función | Ejemplo de producción |
|---|---|---|---|
| Herramienta (*tool*) | Modelo, mediado por cliente | Ejecutar una función con esquema | Crear borrador de incidencia |
| Recurso (*resource*) | Aplicación | Entregar contexto identificado por URI | Especificación o esquema de proyecto |
| Plantilla de instrucción (*prompt*) | Persona | Ofrecer mensajes reutilizables | Preparar revisión de hito |

El servidor declara capacidades y el cliente descubre listas. Una herramienta define nombre, descripción y `inputSchema`; puede declarar `outputSchema` y devolver contenido estructurado. Un recurso se lee, no es sinónimo de permiso para modificar su origen. Una plantilla de instrucción devuelve mensajes parametrizados; no es una herramienta ni una política de seguridad.

MCP define el intercambio. No determina qué modelo usar, cómo seleccionar contexto, si una respuesta es cierta, cuándo integrar un cambio ni si debe existir un agente. Tampoco convierte una API insegura en segura.

## Confianza, alcance y límites

Antes de habilitar un servidor se auditan procedencia, versión, código o proveedor, transporte, datos accesibles, herramientas expuestas, destino de red y política de actualización. Luego se aplica:

1. habilitación explícita y sólo para el proyecto necesario;
2. cuenta y alcance mínimos;
3. separación entre lectura y escritura;
4. confirmación con parámetros visibles para acciones sensibles;
5. validación de entradas y resultados, tiempos de espera y límites;
6. registros sin secretos y evidencia del efecto real;
7. revocación y procedimiento de incidente.

En HTTP remoto, la autorización de MCP puede usar OAuth; el token debe estar destinado al servidor correcto y sus alcances deben limitarse. En transporte local, las credenciales suelen llegar por entorno. Autenticar un servidor no vuelve confiables sus descripciones, anotaciones, recursos o salidas. La especificación indica tratar anotaciones como no confiables y mantener capacidad humana de negar invocaciones.

## MCP y agentes especializados

Son dimensiones distintas. MCP conecta capacidades; un agente especializado configura responsabilidad, contexto y permisos. Un agente de incidencias puede recibir sólo herramientas MCP de lectura y creación de borradores, mientras publicación queda en otro rol humano. No hace falta crear varios agentes para usar varios servidores, ni usar MCP para especializar un agente.

## Caso aplicado

Un servidor expone documentación, lectura de incidencias y `cerrar_incidencia`. Para diagnosticar un error sólo se habilitan las dos consultas. El agente cita URI, ID y versión; reproduce localmente y prepara un comentario. `cerrar_incidencia` permanece denegada hasta que una persona verifica el build. La conexión funcionaba desde el inicio; la confianza se obtuvo por controles y evidencia, no por el protocolo.

## Errores frecuentes

- Confundir servidor con aplicación anfitriona o con modelo.
- Tratar un recurso como verdad o una plantilla de instrucción como regla superior.
- Habilitar todo un servidor para usar una única consulta.
- Exponer tokens en configuración versionada o registros.
- Suponer que OAuth autoriza toda herramienta.
- Construir un servidor MCP cuando una función local simple alcanza.

## Comprobación

1. ¿Quién mantiene una conexión con cada servidor?
2. ¿Qué diferencia operativa hay entre recurso y herramienta?
3. ¿Por qué un servidor autenticado todavía puede devolver contenido no confiable?

## Actividad relacionada

[Laboratorio integrador: una integración controlada](07-laboratorio-integrador.md).

## Bibliografía comentada

- Model Context Protocol. *Architecture overview*. Participantes, capas, transportes y alcance. https://modelcontextprotocol.io/docs/learn/architecture (consulta: 4 de agosto de 2026).
- Model Context Protocol. *Tools*, *Resources* y *Prompts*. Primitivas normativas, versión 2025-06-18. https://modelcontextprotocol.io/specification/2025-06-18/server/tools, https://modelcontextprotocol.io/specification/2025-06-18/server/resources y https://modelcontextprotocol.io/specification/2025-06-18/server/prompts (consulta: 4 de agosto de 2026).
- Model Context Protocol. *Authorization*. Alcance de OAuth para transporte HTTP. https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization (consulta: 4 de agosto de 2026).
- OpenCode. *MCP servers*. Ejemplo concreto de cliente con servidores locales y remotos. https://opencode.ai/docs/mcp-servers/ (consulta: 4 de agosto de 2026).
