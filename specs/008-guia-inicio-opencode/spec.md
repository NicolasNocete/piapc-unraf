# Guía de inicio de OpenCode para el laboratorio

**Status:** Approved

## Objetivo

Incorporar una orientación operativa breve antes del laboratorio del Eje 3 para que el estudiantado pueda preparar y usar OpenCode, o una herramienta equivalente, con permisos mínimos y evidencia verificable.

## Valor para el usuario

- El estudiantado cuenta con pasos previos explícitos en lugar de encontrar OpenCode sólo nombrado en la consigna del laboratorio.
- La actividad práctica comienza con una configuración segura de sólo lectura y criterios de detención claros.
- El contenido conceptual conserva su independencia respecto de un proveedor o producto concreto.

## Escenarios de usuario

### US-001 - Preparación del laboratorio

Una estudiante que aún no usó OpenCode consulta una guía breve, verifica la herramienta, abre el repositorio del laboratorio y conoce la configuración inicial permitida antes de realizar la actividad.

### US-002 - Uso de herramienta equivalente

Un equipo que no dispone de OpenCode aplica los mismos límites de permisos, evidencia y alternativa sin modelo con una herramienta compatible o con la traza provista.

## Requisitos funcionales

- **FR-001:** Debe existir una lectura pública, ubicada antes del laboratorio del Eje 3, que explique el rol limitado de OpenCode como herramienta de laboratorio.
- **FR-002:** La lectura debe indicar cómo consultar las instrucciones del proyecto, iniciar el trabajo en el repositorio y comenzar con lectura y búsqueda, sin prescribir cambios ni comandos no autorizados.
- **FR-003:** La lectura debe indicar permisos iniciales, límites de seguridad, evidencia a registrar y condiciones de detención aplicables al laboratorio.
- **FR-004:** La lectura debe enlazar la documentación oficial vigente de OpenCode y declarar la alternativa con herramientas equivalentes o la traza pública.
- **FR-005:** El índice y los prerrequisitos del laboratorio deben reflejar que la guía se consulta antes de la práctica.

## Fuera de alcance

- Enseñar programación, configuración avanzada o automatización de OpenCode.
- Exigir una cuenta, proveedor pago o modelo concreto.
- Cambiar la consigna, los criterios de evaluación o los límites del laboratorio.
- Sustituir la documentación oficial de OpenCode.

## Impacto en datos

- Se agregan y actualizan documentos Markdown y el manifiesto generado de contenido académico.
- No se crean tablas ni se procesan datos personales.

## Seguridad y privacidad

- La guía mantiene denegados inicialmente escritura, red, instalación, publicación y acceso a secretos.
- No solicita credenciales, claves de API ni información privada.
- El enlace externo se limita a documentación oficial pública.

## Ambigüedades abiertas

No quedan ambigüedades abiertas.

## Criterios de aceptación

- **AC-001 (FR-001):** El recorrido del Eje 3 presenta la guía antes del laboratorio y su material se puede leer de forma independiente.
- **AC-002 (FR-002, FR-003):** La guía indica una secuencia inicial de apertura, lectura, permisos mínimos, registro de evidencia y detención segura.
- **AC-003 (FR-004):** La guía contiene enlaces oficiales pertinentes y una alternativa explícita para quien no use OpenCode.
- **AC-004 (FR-005):** El laboratorio declara la guía como prerrequisito y el contenido académico se genera y valida correctamente.
