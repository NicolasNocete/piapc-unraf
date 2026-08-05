---
id: eje-07-seguridad-permisos-y-secretos
titulo: Permisos, aislamiento y protección de información
eje: 7
orden: 2
tipo: lectura
nivel: obligatorio
audiencia: estudiante
clases: [4, 7, 12]
modalidad: mixta
duracion_minutos: 22
resultados: [RA6, RA10]
prerrequisitos: [eje-06-herramientas-y-aci]
evaluable: true
acceso: publico
version: 1
---

# Permisos, aislamiento y protección de información

## Propósito

Diseñar un entorno de trabajo con menor privilegio y evitar que secretos, datos personales o contenido privado entren en contextos, registros o artefactos.

## Por qué importa

Un agente que puede leer una clave, ejecutar código y usar la red puede filtrar esa clave por error o por contenido malicioso. En un videojuego, el repositorio también puede contener telemetría de jugadores, claves de publicación, acuerdos, arte no anunciado y servicios de producción.

## Modelo mental: capacidad, alcance y tiempo

El principio de **menor privilegio** concede sólo la capacidad necesaria, sobre el alcance necesario y durante el tiempo necesario. “Acceso al proyecto” es demasiado amplio.

| Capacidad | Alcance mínimo de ejemplo | Control |
|---|---|---|
| Leer | copia de trabajo sin archivos privados | denegar credenciales y directorios ajenos |
| Escribir | rama y archivos declarados | revisar diferencias y bloquear fuera de alcance |
| Ejecutar | scripts conocidos con recursos limitados | lista permitida, tiempo y salida registrados |
| Red | documentación pública o destinos definidos | denegada por defecto; registrar destino |
| Instalar | dependencia y versión justificadas | revisión humana y archivo de bloqueo |
| Publicar | entorno de prueba, nunca producción por defecto | identidad separada y confirmación humana |

Separar identidades evita que una herramienta de lectura herede permisos de administración. Los permisos del modelo no deben depender de que “recuerde” una prohibición: la herramienta y el entorno deben hacerla cumplir.

## Aislamiento práctico

Trabajá sobre una copia, rama o *worktree* descartable. Para código o dependencias no confiables, preferí una máquina virtual, contenedor o cuenta separada sin secretos, con red y recursos limitados. Un contenedor reduce superficie, pero no es una frontera perfecta si monta el equipo anfitrión o usa privilegios elevados.

Antes de habilitar una acción:

1. inventariá archivos, servicios y efectos alcanzables;
2. retirá credenciales y datos innecesarios del entorno;
3. definí comandos, rutas y destinos permitidos;
4. fijá límites de tiempo, pasos, costo y almacenamiento;
5. registrá acciones y resultados sin guardar valores secretos;
6. probá restauración y revocación.

## Secretos y credenciales

Una clave de API, token, contraseña, certificado o cookie de sesión no es contexto ni evidencia. Usá un gestor de secretos o variables inyectadas en ejecución, permisos de corta duración cuando estén disponibles y credenciales distintas para desarrollo, prueba y producción.

Controles mínimos:

- excluir archivos locales de credenciales del control de versiones;
- escanear diferencias e historial antes de compartir;
- ocultar valores en registros y capturas;
- no pegar secretos en instrucciones, incidencias ni conversaciones;
- rotar y revocar de inmediato ante exposición; borrar el archivo no invalida la credencial;
- verificar que las compilaciones no incorporen secretos del servidor al cliente.

## Datos personales y repositorios privados

Minimizá: si una tarea funciona con datos sintéticos, no uses datos reales. Antes de enviar información a un servicio externo, verificá qué datos saldrán, con qué finalidad, quién puede acceder, cuánto se conservarán y qué reglas institucionales o contractuales aplican. Anonimizar no es sólo quitar nombres: combinaciones de identificadores, texto libre o telemetría pueden reidentificar.

Que un repositorio sea privado no autoriza enviarlo completo a un proveedor. Seleccioná fragmentos necesarios, evitá ramas y activos ajenos a la tarea y confirmá las condiciones aprobadas por la organización.

## Caso aplicado

Un agente debe corregir el patrullaje en Phaser. Recibe lectura del código y escritura en `src/ai/`; puede ejecutar pruebas locales, pero no usar red ni publicar. El archivo `.env`, los registros reales de jugadores y el token de la plataforma no están montados. La prueba usa eventos sintéticos. Una persona revisa el cambio antes de fusionar.

Para una escena Unity descargada, la importación se realiza primero en una copia aislada: abrir el editor puede ejecutar scripts e importar paquetes, aun sin pulsar “Play”.

## Límites

No existe un permiso “seguro” sin considerar efectos laterales. Un comando permitido puede invocar otros procesos; una herramienta de consulta puede producir cachés o realizar red. El aislamiento complementa, no reemplaza, la revisión de entradas, salidas y dependencias.

## Errores frecuentes

- Dar terminal y red completas para evitar confirmaciones.
- Confiar en instrucciones textuales como única barrera.
- Usar una credencial de producción para una prueba.
- Publicar registros con tokens parcialmente visibles.
- Suponer que “privado” significa aprobado para cualquier modelo.
- Montar todo el disco dentro de un contenedor.

## Comprobación

1. ¿Qué tres dimensiones limitan un permiso?
2. ¿Por qué borrar una clave expuesta no alcanza?
3. ¿Qué datos sintéticos usarías para probar telemetría?
4. ¿Qué capacidad necesita confirmación humana en tu proyecto?

## Actividad relacionada

Aplicá la matriz y los controles en el [laboratorio de equipo rojo](07-caso-red-team.md).

## Bibliografía comentada

- NIST (2024). *Generative AI Profile*. Secciones de gobernanza, privacidad, seguridad y gestión de incidentes. https://doi.org/10.6028/NIST.AI.600-1
- OWASP (2025). *Agentic AI: Threats and Mitigations*. Amenazas derivadas de herramientas, identidad y autonomía. https://genai.owasp.org/resource/agentic-ai-threats-and-mitigations/
- OpenCode. *Permissions*. Documentación del laboratorio de referencia; sus opciones concretas deben contrastarse con las capacidades reales del entorno. https://opencode.ai/docs/permissions/ (consulta: 4 de agosto de 2026).
