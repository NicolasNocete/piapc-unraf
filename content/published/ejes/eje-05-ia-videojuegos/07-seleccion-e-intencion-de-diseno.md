---
id: eje-05-seleccion-intencion-diseno
titulo: Selección de técnicas e intención de diseño
eje: 5
orden: 7
tipo: lectura
nivel: obligatorio
audiencia: estudiante
clases: [10]
modalidad: mixta
duracion_minutos: 25
resultados: [RA7, RA8, RA11]
prerrequisitos: [eje-05-maquinas-de-estados, eje-05-behavior-trees, eje-05-utility-ai, eje-05-goap]
evaluable: true
acceso: publico
version: 1
---

# Selección de técnicas e intención de diseño

## Propósito

Comparar FSM/HFSM, árboles de comportamiento (*behavior trees*), sistemas de utilidad (*Utility AI*) y GOAP según criterios técnicos y de experiencia, y distinguir agentes de desarrollo de agentes que operan dentro del juego.

## Por qué importa

No existe una arquitectura universalmente mejor. La técnica correcta es la solución más simple que expresa la conducta buscada, cumple el presupuesto y permite que el equipo y el jugador comprendan lo necesario.

## Comparación orientativa

Las valoraciones son tendencias, no garantías; una mala implementación invierte cualquier ventaja.

| Criterio | FSM / HFSM | Árbol de comportamiento | Sistema de utilidad | GOAP |
|---|---|---|---|---|
| Previsibilidad | Alta; transiciones enumeradas | Alta/media; depende de abortos | Media; sensible a curvas | Media/baja; planes emergentes |
| Expresividad | Buena para modos discretos | Alta para composición y prioridad | Alta para preferencias continuas | Alta para secuencias recombinables |
| Rendimiento | Bajo costo habitual | Reevaluación configurable | Puntúa alternativas | Búsqueda potencialmente costosa |
| Depuración | Estado y transición visibles | Camino de ticks y pizarrón | Desglose de puntuaciones | frontera, plan y ejecución |
| Diseño y ajuste | Tablas/diagramas | Árbol visual y nodos | Curvas, pesos y escenarios | acciones, hechos y costos |
| Legibilidad técnica | Alta si es pequeña | Alta si contratos son explícitos | Media; interacción numérica | Media; resultados indirectos |
| Dificultad de implementación | Baja; sube con jerarquía | Media por `EnCurso` y abortos | Media por estabilidad y ajuste | Alta por búsqueda y sincronización |
| Experiencia típica | Conducta reconocible | Prioridades y secuencias claras | Variación sensible al contexto | Resolución flexible de objetivos |

El rendimiento debe medirse con número real de agentes, frecuencia de actualización y hardware objetivo. La legibilidad tiene dos audiencias: el equipo debe depurar la causa; el jugador debe poder anticipar la conducta lo suficiente para aprender y decidir.

## Método de selección

1. Definir la experiencia: ¿enemigo justo y reconocible, compañero adaptable o simulación emergente?
2. Enumerar decisiones y escalas: discretas, secuenciales, continuas o combinatorias.
3. Establecer presupuesto: CPU por cuadro, memoria, latencia tolerable y cantidad de agentes.
4. Definir observabilidad: qué explicación y traza necesita diseño, QA y jugador.
5. Prototipar la técnica más simple con escenarios extremos.
6. Medir y jugar; cambiar de arquitectura sólo ante evidencia de límite.

### Ejemplos de decisión

- Jefe con tres fases y ataques guionados: FSM/HFSM. La previsibilidad permite aprender patrones.
- Soldado con prioridades `sobrevivir → combatir → patrullar`: BT, si las secuencias son reutilizables.
- Habitante que elige descansar, comer o socializar según necesidades graduales: Utility AI.
- Personaje que puede conseguir, comprar o fabricar una herramienta para alcanzar un objetivo: GOAP.

Una arquitectura híbrida puede ser válida: Utility AI elige objetivo, GOAP arma un plan y una FSM ejecuta cada acción. Pero cada frontera agrega contratos, fallos y telemetría. No combinar por moda.

## Dificultad, justicia y legibilidad

Más inteligencia aparente no equivale a mejor experiencia. Un enemigo que siempre conoce todo y toma la ruta óptima puede sentirse injusto. Herramientas de diseño:

- limitar percepción y memoria;
- introducir tiempos de reacción visibles;
- comunicar estados con postura, sonido o interfaz;
- permitir errores deliberados consistentes;
- variar costos o preferencias dentro de rangos controlados;
- conservar contrajuego: toda amenaza importante debe admitir respuesta.

La dificultad debería surgir de reglas comprensibles, presión y decisiones, no de información secreta o latencia impredecible. El *playtesting* debe registrar dónde el jugador atribuye correctamente la causa de captura o fracaso.

## Agentes de desarrollo y agentes dentro del juego

Un **agente de desarrollo** ayuda a explorar un repositorio, modificar código, ejecutar pruebas y revisar resultados. Opera durante producción, con herramientas, permisos, trazabilidad y supervisión humana.

Un **agente dentro del juego** percibe el mundo simulado y decide acciones durante la partida. Tiene presupuesto estricto por cuadro, debe ser reproducible cuando corresponde y está sujeto a reglas de diseño.

| Aspecto | Agente de desarrollo | Agente dentro del juego |
|---|---|---|
| Entorno | repositorio y herramientas | mundo simulado |
| Objetivo | producir artefactos verificables | sostener la experiencia |
| Tiempo | segundos o minutos tolerables | milisegundos por cuadro |
| Control | permisos y revisión humana | reglas, presupuestos y telemetría |
| Fallo | cambio rechazable/reversible | afecta inmediatamente la partida |

Que un agente de desarrollo implemente una FSM no convierte esa FSM en un agente generativo ni traslada el modelo al producto final.

## Cuándo evitar modelos generativos durante la ejecución (*runtime*)

Preferir FSM, BT, utilidad, GOAP o código convencional cuando se necesita:

- respuesta de baja latencia y costo predecible;
- ejecución local o sin conectividad;
- reproducibilidad para pruebas, repeticiones o competencia;
- control estricto de contenido, clasificación etaria y tono;
- privacidad de datos del jugador;
- comportamiento acotado que reglas simples expresan mejor;
- evitar dependencia de proveedor, consumo por consulta o cambios del modelo;
- una explicación exacta de por qué ocurrió la acción.

Un modelo generativo durante la ejecución puede justificarse para lenguaje abierto u otra variación que sea central a la propuesta y no pueda resolverse razonablemente con contenido autoral o sistemas clásicos. Aun así requiere límites de contenido, presupuesto y tiempo, recuperación ante indisponibilidad, pruebas adversariales, declaración de datos y una conducta de reserva. No debe tener autoridad directa sobre compras, archivos o servicios sensibles.

## Comprobación mediante evidencia

Comparar técnicas sobre los mismos escenarios e intención, no por cantidad de código. Registrar:

- tasa de éxito y conducta elegida;
- tiempo por actualización, picos y memoria;
- cambios de decisión por minuto;
- trazas necesarias para explicar fallos;
- tiempo de autoría y ajuste;
- errores encontrados por pruebas y *playtesting*;
- capacidad del jugador para anticipar y responder.

## Límites y errores frecuentes

- Elegir GOAP porque “parece más inteligente” sin necesitar recombinación.
- Evaluar sólo rendimiento y omitir experiencia y costo de autoría.
- Confundir variabilidad con expresividad o dificultad con trampa.
- Ocultar decisiones ilegibles detrás de aleatoriedad.
- Incorporar un modelo generativo cuando una tabla determinista satisface el problema.
- Concluir a partir de un único mapa o una sola partida.

## Comprobación

1. ¿Qué arquitectura elegirías para un jefe aprendible y por qué?
2. ¿Qué telemetría específica exige Utility AI frente a una FSM?
3. ¿Qué diferencia de responsabilidad separa ambos tipos de agentes?
4. Nombrá tres razones para no usar un modelo generativo durante la partida.

## Actividad relacionada

Aplicá estos criterios al [caso integrador del guardia](08-caso-integrador-guardia.md).

## Bibliografía comentada

- Millington, I. y Funge, J. (2016). *Artificial Intelligence for Games* (3.ª ed.). Comparar capítulos de toma de decisiones, planificación y ejecución desde su costo y control.
- Rabin, S. (ed.). (2013). *Game AI Pro: Collected Wisdom of Game AI Professionals*. Consultar estudios de producción para contrastar decisiones arquitectónicas y experiencia.
- Poole, D. L. y Mackworth, A. K. (2023). *Artificial Intelligence: Foundations of Computational Agents* (3.ª ed.). Recuperar el marco de agente, objetivo, entorno y medida de desempeño. https://artint.info/
