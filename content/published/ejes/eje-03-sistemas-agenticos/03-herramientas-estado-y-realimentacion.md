---
id: eje-03-herramientas-estado-y-realimentacion
titulo: Herramientas, estado y realimentación
eje: 3
orden: 3
tipo: lectura
nivel: obligatorio
audiencia: estudiante
clases: [4, 8]
modalidad: mixta
duracion_minutos: 20
resultados: [RA5, RA6, RA8, RA10]
prerrequisitos: [eje-03-arquitectura-y-ciclo]
evaluable: true
acceso: publico
version: 1
---

# Herramientas, estado y realimentación

## Propósito

Diseñar herramientas y registros de estado que produzcan realimentación útil, con permisos y efectos laterales explícitos.

## Por qué importa

En un proyecto de videojuegos, leer una escena, editar un controlador, ejecutar pruebas y publicar una compilación tienen riesgos distintos. Si todas las acciones se ofrecen como una terminal irrestricta, el agente tiene más capacidad que control.

## Modelo mental

```text
intención → llamada estructurada → validación y permiso
          → efecto en el entorno → resultado o error
          → estado actualizado → próxima decisión
```

La **realimentación** es información posterior a una acción que permite corregir decisiones siguientes. No toda salida es buena realimentación: “falló” informa menos que un código de salida, la prueba afectada y un mensaje localizable.

## Contrato de herramienta

Una herramienta debería declarar:

| Campo | Pregunta |
|---|---|
| Propósito | ¿Qué operación acotada ofrece? |
| Entradas | ¿Qué campos y límites acepta? |
| Resultado | ¿Qué devuelve si tiene éxito? |
| Errores | ¿Cómo distingue causas recuperables? |
| Permisos | ¿Qué puede leer, modificar o ejecutar? |
| Efectos laterales | ¿Qué cambia fuera de la respuesta? |
| Reversión | ¿Cómo se deshace o contiene el cambio? |

Conviene separar lectura, escritura, ejecución y publicación. Una herramienta pequeña permite validaciones específicas y aplica el principio de mínimo privilegio.

## Estado operativo y persistencia

El estado mínimo puede incluir:

- objetivo y criterios vigentes;
- acciones intentadas y resultados;
- archivos modificados;
- hipótesis abiertas y descartadas;
- pasos, tiempo y costo consumidos;
- último punto seguro y motivo de terminación.

Parte de ese estado puede persistirse en un archivo, base de datos o registro de ejecución. La **memoria recuperable** agrega un mecanismo de búsqueda: consulta registros o documentos y selecciona elementos para el contexto actual. Debe conservar procedencia, fecha y versión; una decisión de otra rama puede ser perjudicial aunque sea semánticamente similar.

No debe persistirse todo. Secretos, datos personales y texto no confiable requieren exclusión o tratamiento específico. Los resúmenes pierden detalle y deben enlazar a evidencia original.

## Realimentación de calidad

Una acción de validación debería informar comando, entorno, duración, salida relevante y estado final. El agente utiliza esos datos para distinguir:

- éxito comprobado;
- error de implementación;
- fallo del entorno;
- resultado ambiguo;
- permiso denegado;
- presupuesto agotado.

Repetir exactamente una acción ante el mismo error no constituye recuperación. Debe cambiar una hipótesis, el contexto, una entrada o escalar.

## Caso aplicado: importación de mapas

Un agente debe corregir un mapa Tiled que no carga. La lectura está restringida al proyecto y la escritura a `assets/maps/`. Primero inspecciona el registro del juego; luego una herramienta valida el JSON sin abrir el motor. Detecta una ruta inválida, edita sólo ese campo y vuelve a validar. Finalmente ejecuta una escena de prueba y registra el resultado.

Si el agente sólo recibiera “pantalla negra”, podría modificar código al azar. La herramienta de validación transforma un síntoma en realimentación accionable. No se le concede publicación ni acceso a credenciales porque no son necesarios.

## Límites

- Una interfaz demasiado rígida puede impedir observaciones necesarias.
- Salidas enormes saturan contexto; deben resumirse sin ocultar el error relevante.
- Persistencia no equivale a exactitud ni vigencia.
- Un permiso de confirmación humana no vuelve segura una acción mal explicada.
- Las herramientas también contienen errores y necesitan pruebas.

## Errores frecuentes

- Ofrecer una herramienta genérica cuando alcanza una operación acotada.
- Ocultar códigos de salida o efectos laterales.
- Incorporar memoria recuperada sin comprobar fuente y versión.
- Sobrescribir el estado sin conservar evidencia previa.
- Guardar credenciales en trazas.
- Interpretar “sin resultados” como “no existe”.

## Comprobación

1. ¿Qué distingue una salida de una realimentación útil?
2. ¿Por qué separar lectura, edición y publicación?
3. ¿Qué metadatos necesita una memoria recuperada?
4. ¿Qué debería cambiar antes de repetir una acción fallida?

<details>
<summary>Ver orientación</summary>

1. Permite relacionar la acción con un resultado e informar la próxima decisión.
2. Para aplicar permisos y controles acordes a efectos diferentes.
3. Procedencia, fecha, versión y vínculo con la evidencia original.
4. La hipótesis, el contexto, la entrada o el nivel de intervención.

</details>

## Actividad relacionada

[Laboratorio: agente controlado](07-laboratorio-agente-controlado.md).

## Bibliografía comentada

- Yang, J. et al. (2024). “SWE-agent”. Diseño de interfaces de acción para ingeniería de software. https://arxiv.org/abs/2405.15793
- Yao, S. et al. (2023). “ReAct”. Uso intercalado de acciones y observaciones. https://arxiv.org/abs/2210.03629
- OpenAI. (2025). *A Practical Guide to Building Agents*. Herramientas, instrucciones y guardas desde una perspectiva industrial. https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/
