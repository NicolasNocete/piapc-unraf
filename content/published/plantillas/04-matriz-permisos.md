---
id: plantilla-matriz-permisos
titulo: Plantilla de matriz de permisos
tipo: plantilla
audiencia: estudiante
acceso: publico
version: 1
---

# Matriz de permisos

## Contexto

- Tarea: [descripción].
- Entorno aislado: [rama, copia o contenedor].
- Responsable humano: [rol].

| Acción | Alcance | Decisión | Condición o motivo |
|---|---|---|---|
| Leer archivos | [rutas] | permitir | [motivo] |
| Buscar contenido | [rutas] | permitir | [motivo] |
| Editar | [rutas] | permitir / preguntar / denegar | [condición] |
| Ejecutar pruebas | [comandos] | permitir / preguntar / denegar | [condición] |
| Instalar dependencias | [gestor] | preguntar | [condición] |
| Acceder a red | [destinos] | preguntar / denegar | [condición] |
| Leer secretos | [ninguno] | denegar | [motivo] |
| Eliminar archivos | [alcance] | preguntar / denegar | [condición] |
| Commit | [rama] | preguntar / denegar | [condición] |
| Publicar o desplegar | [destino] | denegar | [motivo] |

## Recuperación

- Copia o control de versión disponible: [sí/no y ubicación].
- Procedimiento ante una acción inesperada: [pasos].
