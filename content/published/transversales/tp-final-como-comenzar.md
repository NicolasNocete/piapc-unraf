---
id: tp-final-como-comenzar
titulo: Cómo comenzar el TP final
tipo: lectura
audiencia: estudiante
acceso: publico
version: 2
eje: 5
orden: 13
nivel: obligatorio
clases: [11, 12, 13]
modalidad: mixta
duracion_minutos: 20
resultados: [RA7, RA8, RA11]
prerrequisitos: [tp-final-integrador-npc]
evaluable: false
---

# Cómo comenzar el TP final

Esta guía te acompaña desde la creación del repositorio hasta la implementación de las primeras funcionalidades con OpenCode. **No es otra actividad ni tiene una entrega separada.**

Antes de empezar, leé la [consigna del TP final y sus condiciones de entrega](tp-final-integrador-npc.md). Allí están los requisitos completos, el ejemplo de spec y las fechas vigentes.

## 1. Crear un repositorio público

Necesitás una cuenta de GitHub, Git instalado y OpenCode instalado y configurado con un modelo disponible.

En GitHub:

1. Creá un repositorio para el proyecto con un nombre descriptivo.
2. Seleccioná **Public** para que la cátedra pueda acceder.
3. Incluí un `README.md` con una descripción inicial y los integrantes.
4. Si trabajan en pareja, agregá al otro integrante como colaborador desde la configuración del repositorio. Esperá a que acepte la invitación.

No publiques contraseñas, claves de servicios ni información privada. No hace falta pagar un servicio o usar un motor específico para este trabajo.

Si van a continuar un proyecto existente, revisen sus permisos y licencias, conserven la atribución y asegúrense de que el repositorio del equipo sea público. No sobrescriban el trabajo previo para seguir esta guía.

## 2. Clonar el repositorio

En GitHub, abrí **Code → HTTPS** y copiá la URL de tu repositorio. Desde una terminal, ubicada en la carpeta donde guardás tus proyectos, ejecutá los siguientes comandos reemplazando `USUARIO` y `REPOSITORIO`:

```bash
git clone https://github.com/USUARIO/REPOSITORIO.git
cd REPOSITORIO
```

Clonar crea una copia local del repositorio. En equipos de dos, cada integrante puede clonarlo en su computadora; acuerden qué archivos cambia cada uno y compartan los avances mediante Git.

Si ya tenés el repositorio clonado, abrí su carpeta en lugar de clonarlo otra vez.

## 3. Iniciar OpenCode dentro del repositorio

En la terminal, dentro de la carpeta del proyecto, ejecutá:

```bash
opencode
```

Comprobá que OpenCode esté trabajando en la carpeta correcta. El objetivo es que pueda leer el proyecto y sus documentos, no una carpeta general de tu computadora.

## 4. Copiar este prompt en OpenCode

El prompt inicia una conversación para definir el proyecto; **no debería generar todo el juego de una vez**. Copialo completo y respondé las preguntas con tus decisiones.

```text
Quiero desarrollar el TP final integrador de PIAPC.
Ayudame a definir un proyecto pequeño, realizable y que pueda explicar.

Antes de crear archivos o implementar, utilizá la herramienta question
para preguntarme por mi idea, experiencia, motor o tecnología,
integrantes y alcance. Hacé pocas preguntas por vez, ofrecé alternativas
concretas y no decidas por mí. Si question no está disponible,
haceme las preguntas en el chat.

Primero explorá el repositorio sin modificarlo. Si ya hay un proyecto,
identificá qué se puede aprovechar y no sobrescribas trabajo existente.

Estos son los requisitos del trabajo:

- Individual o equipo de hasta 2 integrantes.
- Prototipo pequeño y funcional de videojuego con uno o más NPC
  que tengan percepción, objetivos y comportamientos definidos.
- Al menos 2 algoritmos de búsqueda seleccionables, como BFS,
  DFS, Dijkstra o A*. Podemos incorporar más.
- Al menos 2 alternativas de navegación seleccionables.
  Cambiar el algoritmo de búsqueda no cuenta por sí solo
  como otra alternativa de navegación.
- Comportamiento organizado con FSM, árboles de comportamiento,
  utilidad o GOAP. No es necesario implementar todas las técnicas.
- Generar escenarios variables que cambien obstáculos, caminos
  u otros elementos que afecten los recorridos, no sólo la apariencia.
- Los escenarios deben ser jugables y permitir cumplir los objetivos.
- Si hay patrullaje, sus rutas deben adaptarse al escenario:
  no alcanza con una trayectoria fija preparada.
- Las alternativas deben poder seleccionarse y observarse jugando.
- No se exigen semillas, guardado de escenarios, comparaciones
  con condiciones idénticas, tablas ni métricas adicionales.
- Usar OpenCode y un proceso spec-driven básico.
- Entrega del GDD antes del martes 27/10/2026 a las 12:00 hs
  (hora de Argentina), en su apartado independiente de la plataforma.
- Entrega final del proyecto el 3/11/2026 y exposición el 4/11/2026.
  El 11/11 no hay actividades ni entregas.
- Repositorio público con prototipo, instrucciones de ejecución,
  README, GDD breve, specs y presentación.
- No se pide un informe extenso ni una carpeta de evidencias.
- No se exige MCP, un modelo de lenguaje dentro del juego
  ni servicios pagos.

Trabajemos en este orden:

1. Usá question para ayudarme a elegir y acotar la propuesta.
2. Ayudame a pulir un GDD breve: idea, interacción, escenario,
   NPC, percepción, objetivos, comportamientos, búsquedas,
   alternativas de navegación y qué cambia entre escenarios.
3. Señalá qué conviene recortar para que el proyecto sea realizable.
4. Proponé el contenido de GDD.md y esperá mi aprobación
   antes de guardarlo. No implementes código todavía.
5. Con el GDD aprobado, proponé un SDD básico: dividir el desarrollo
   en specs pequeñas dentro de specs/, ordenadas por dependencias.
   No instales herramientas ni frameworks para gestionar las specs.
6. Cada spec debe incluir objetivo, comportamiento esperado,
   fuera de alcance y cómo comprobarla jugando.
7. Revisemos las specs y esperá mi aprobación antes de implementarlas.
8. Implementá una spec por vez. Antes de cada una, proponé un plan
   corto y esperá mi aprobación para ejecutar los cambios.
9. Después de cada spec, revisá los cambios, ejecutá las comprobaciones
   disponibles y explicame cómo iniciar el prototipo y probarla jugando.
   Si no podés comprobar algo por tu cuenta, decímelo y pedime
   que lo pruebe. No afirmes que funciona sin verificarlo.
10. Resolvamos los problemas antes de avanzar a la siguiente spec.
    Si cambia lo que queremos construir, actualicemos GDD y specs.

Al terminar, ayudame a preparar instrucciones claras de ejecución
y una presentación de búsqueda, navegación, percepción, objetivos,
decisiones, comportamiento, escenarios variables y uso de OpenCode,
mostrando una spec y las limitaciones del prototipo.

No implementes todo de una vez ni agregues funcionalidades
fuera del alcance acordado. No publiques secretos ni hagas
commits o push sin que te lo pida.

Empezá ahora utilizando question para ayudarme a definir la propuesta.
```

## 5. Pulir y aprobar el GDD

El **GDD** (*Game Design Document*) explica la intención del juego. Conversá con OpenCode hasta que la idea sea clara y acotada. Pedile alternativas si una propuesta resulta muy compleja y elegí vos.

Antes de aprobarlo, deberías poder explicar:

- Qué se juega y cuáles son los objetivos.
- Qué perciben y cómo se comportan los NPC.
- Qué búsquedas y alternativas de navegación vas a implementar.
- Qué cambia al generar otro escenario y cómo se mantiene jugable.
- Qué queda afuera para llegar a una versión funcional.

No aceptes un alcance enorme sólo porque el agente propone implementarlo. El GDD puede ser breve y debe describir tu proyecto, no un listado de todas las técnicas posibles.

Registrá el documento en [Entrega del GDD](tp-final-entrega-gdd.md) **antes del martes 27/10/2026 a las 12:00 hs (hora de Argentina)**. Esa actividad tiene su propio formulario y versiones; no uses el de la entrega final para esta instancia.

## 6. Preparar un SDD básico

**SDD** (*Spec-Driven Development*, desarrollo guiado por especificaciones) significa definir qué debe hacer una funcionalidad antes de implementarla y usar esa definición para revisarla.

Alcanza con `GDD.md` y archivos Markdown en `specs/`. No necesitás un framework, una herramienta especial ni una spec para cada cambio pequeño. La [consigna incluye un ejemplo de spec](tp-final-integrador-npc.md).

Pedile a OpenCode que proponga funcionalidades pequeñas y un orden que respete sus dependencias. Por ejemplo, primero un escenario transitable, luego búsqueda y movimiento, después comportamiento y variantes. Es una orientación: el orden concreto depende de tu proyecto y puede integrar varias partes en una misma funcionalidad.

Revisá cada spec: **objetivo, comportamiento esperado, fuera de alcance y cómo comprobarlo jugando**. Si no entendés una decisión técnica, pedí que te la explique antes de aprobarla.

## 7. Implementar una spec por vez

Seguí este ciclo:

**GDD aprobado → specs revisadas → plan corto → implementar una spec → jugar, revisar y corregir → siguiente spec.**

Para continuar la conversación podés pedir:

```text
Tomemos la siguiente spec pendiente según el orden acordado.
Leela junto con el GDD y revisá lo que ya existe en el proyecto.
Proponé un plan corto, indicá cómo vamos a comprobarla jugando
y esperá mi aprobación antes de implementar.
No avances a la siguiente spec hasta que revisemos el resultado.
```

Después de cada implementación, ejecutá el prototipo y comprobá lo pedido. No alcanza con que OpenCode diga «terminado». Corregí errores antes de agregar más funciones; si cambia la intención, actualizá el GDD o la spec con su ayuda.

Durante el desarrollo, guardá y compartí los avances mediante commits y push. Antes de subirlos, revisá los archivos para no incluir secretos ni archivos generados innecesarios. No se pide guardar el historial completo de conversaciones con el agente.

## Volver a la consigna y entregar

Esta guía no tiene formulario propio. Para el diseño, usá [Entrega del GDD](tp-final-entrega-gdd.md), antes del **27/10/2026 a las 12:00 hs (hora de Argentina)**. Para registrar el proyecto completo, volvé a la [consigna del TP final y su formulario de entrega final](tp-final-integrador-npc.md). Son actividades independientes: una entrega no reemplaza la otra.

En equipos de dos, cada integrante registra su envío en cada actividad con el mismo enlace del equipo e identifica a ambos. **Entrega final: 3/11/2026. Presentación y exposición: 4/11/2026.**
