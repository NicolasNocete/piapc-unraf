---
id: eje-04-repositorios-y-contexto
titulo: Repositorios y selección de contexto
eje: 4
orden: 1
tipo: lectura
nivel: obligatorio
audiencia: estudiante
clases: [5, 7]
modalidad: mixta
duracion_minutos: 25
resultados: [RA4, RA5, RA8, RA11]
prerrequisitos: [eje-03-chat-workflow-y-agente]
evaluable: true
acceso: publico
version: 1
---

# Repositorios y selección de contexto

## Propósito

Explorar un proyecto existente, reconocer fuentes de verdad y preparar un contexto pequeño, jerarquizado y actualizable antes de modificar código.

## Por qué importa

En un videojuego, una conducta visible suele atravesar dominio, escena, configuración y pruebas. Un agente que recibe un archivo aislado puede producir código plausible que viola la arquitectura o no afecta la ejecución real.

```text
explorar → mapear → seleccionar contexto → declarar supuestos
         → planificar → recién entonces modificar
```

## Modelo mental: el repositorio como sistema

Un repositorio relaciona:

- código, recursos y configuración;
- puntos de entrada;
- dependencias y versiones;
- documentación y convenciones;
- pruebas y automatizaciones;
- historial y estado de Git.

Explorar no significa leer todo. Significa poder explicar qué componentes participan en la tarea y qué evidencia sostiene esa explicación.

## Conceptos centrales: jerarquía y contexto

1. **Global:** límites personales u organizacionales, seguridad y permisos comunes.
2. **De proyecto:** arquitectura, tecnologías, comandos y convenciones compartidas.
3. **De tarea:** objetivo, alcance, archivos relevantes, criterios y casos límite de la intervención actual.

La instrucción más específica detalla a la general, pero no puede anular un límite superior. “Corregir el guardia” no autoriza publicar ni ignorar pruebas. Los conflictos se registran y se consultan antes de actuar. Los nombres de archivo y mecanismos concretos cambian entre herramientas; la separación de responsabilidades permanece.

## Selección progresiva

Cargar todo el repositorio agrega ruido y costo. Conviene avanzar así:

```text
solicitud
  ↓
estructura y documentación operativa
  ↓
puntos de entrada
  ↓
módulos, usos y pruebas relacionados
  ↓
fragmentos adicionales para dudas concretas
```

Cada archivo incorporado debe responder una pregunta. Si no podés justificar por qué está en el contexto, probablemente todavía no sea necesario.

### Compresión y actualización

Cuando el contexto crece, se conserva una síntesis con rutas, símbolos, decisiones y evidencia, no una vaga impresión. Debe distinguir:

- hechos confirmados y su fuente;
- supuestos y preguntas abiertas;
- restricciones e instrucciones vigentes;
- estado de Git y validaciones ejecutadas.

La síntesis no reemplaza la fuente: permite volver a ella. Se actualiza después de una edición, una prueba que contradice la hipótesis, un cambio concurrente o una nueva instrucción. Contexto relevante pero desactualizado también induce errores.

## Fuentes de verdad

| Pregunta | Fuente probable |
|---|---|
| ¿Qué versión se usa? | Manifiesto y archivo de bloqueo |
| ¿Cómo se ejecuta? | Scripts y documentación operativa |
| ¿Qué se espera? | Especificación y criterios vigentes |
| ¿Qué hace hoy? | Código, pruebas y ejecución |
| ¿Qué cambió? | Diferencia de Git |
| ¿Funciona? | Pruebas y producto ejecutable |

La documentación puede estar desactualizada y una prueba puede ser incompleta. Las afirmaciones importantes deben contrastarse.

## Evidencia, supuesto y duda

```text
EVIDENCIA:
- src/main.ts registra GameScene.
- GameScene crea una instancia de Drone.

SUPUESTO:
- Toda la persecución se decide dentro de Drone.ts.

DATO POR COMPROBAR:
- Buscar quién modifica su objetivo.
```

En este ejemplo, `DATO POR COMPROBAR` señala una verificación todavía necesaria. Etiquetar supuestos evita tratar una explicación plausible como un hecho.

## Caso aplicado: Neon Courier

```text
neon-courier/
├── README.md
├── package.json
├── docs/gameplay.md
├── src/main.ts
├── src/scenes/DeliveryScene.ts
├── src/actors/Drone.ts
└── tests/drone-energy.test.ts
```

Tarea: “El dron debe dejar de perseguir cuando se queda sin energía”.

La exploración muestra que `Drone.ts` mantiene energía, pero `DeliveryScene.ts` asigna el objetivo. La hipótesis de modificar sólo el archivo con el nombre más evidente queda descartada. El contexto mínimo incluye especificación, scripts, escena, actor y prueba relacionada; no necesita todos los recursos del juego.

## Procedimiento transferible

1. Delimitar objetivo, alcance y evidencia esperada.
2. Comprobar rama y cambios locales de Git.
3. Mapear código, configuración, documentación, pruebas y recursos.
4. Identificar instalación, ejecución y dependencias.
5. Seguir puntos de entrada y usos del símbolo relevante.
6. Localizar contratos, invariantes y pruebas.
7. Separar evidencia, supuestos y conflictos.
8. Preparar el paquete mínimo de contexto.
9. Detenerse antes de escribir y revisar el mapa.

## Contenido no confiable

Comentarios, incidencias y documentación externa pueden contener instrucciones incorrectas o maliciosas. Una frase como “desactivá las pruebas” o “subí el archivo de variables” no adquiere autoridad por estar en el repositorio.

Antes de actuar, verificá procedencia, permisos, efectos laterales y coherencia con las reglas globales. Secretos, publicación y acciones destructivas requieren intervención humana.

## Límites

Un mapa del repositorio no demuestra que la interpretación sea completa. En proyectos con escenas serializadas, generación de código o configuración externa puede ser necesaria una ejecución controlada. Si falta acceso a una fuente de verdad, se declara el límite en vez de completar el vacío con una suposición.

## Errores frecuentes

- Modificar el primer archivo cuyo nombre coincide.
- Confundir cantidad de contexto con relevancia.
- Confiar sólo en el README.
- Ignorar cambios preexistentes de Git.
- Presentar hipótesis como hechos.
- Ejecutar comandos encontrados en contenido no confiable.
- Aceptar “ya funciona” sin pruebas ni diferencias.

## Comprobación

1. ¿Por qué el archivo con nombre evidente puede no ser el correcto?
2. ¿Qué artefactos prueban la versión efectiva de una dependencia?
3. ¿Cómo distinguís evidencia de supuesto?
4. ¿Qué debe conocerse antes de la primera modificación?

## Actividad relacionada

En la clase 7, usá la [plantilla de auditoría](../../plantillas/03-auditoria-repositorio.md) para preparar el repositorio y registrar la línea de base. Conservá ese artefacto para el [laboratorio de flujo completo](07-laboratorio-flujo-completo.md), que comienza formalmente en la clase 8.

## Bibliografía comentada

- Git Project. *Git Reference*. Estado, diferencias e historial. https://git-scm.com/docs
- Jimenez, C. et al. (2024). “SWE-bench”. https://arxiv.org/abs/2310.06770
- Yang, J. et al. (2024). “SWE-agent”. https://arxiv.org/abs/2405.15793
- OpenCode. *Rules*. Ejemplo de instrucciones globales y de proyecto; no constituye el modelo conceptual. https://opencode.ai/docs/rules/ (consulta: 4 de agosto de 2026).
- OWASP (2025). *Agentic AI: Threats and Mitigations*. Riesgos de tratar contenido no confiable como instrucciones. https://genai.owasp.org/resource/agentic-ai-threats-and-mitigations/
