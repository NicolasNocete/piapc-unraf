# Guía docente: clase 4 - Sistemas agénticos

**Fecha:** 26 de agosto de 2026<br>
**Modalidad:** presencial<br>
**Duración:** 120 minutos<br>
**Actividad práctica central:** 75 minutos<br>
**Repositorio:** https://github.com/NicolasNocete/piapc-guardia-sigilo

## Propósito

Que los equipos distingan modelo, agente, herramientas, contexto, estado y entorno; utilicen un agente con permisos mínimos; y produzcan evidencia verificable sin delegar el juicio técnico.

## Preparación previa

1. Confirmar Node.js 22 o superior en las computadoras disponibles.
2. Tener disponible una copia local o clon del repositorio con estado limpio.
3. Verificar previamente `npm ci` y `npm run validate`.
4. Formar equipos de dos o tres personas.
5. Preparar la traza pública del laboratorio como alternativa sin modelo.
6. Recordar que no se leen secretos, no se instalan dependencias, no se publica, no se hacen commits y no se da escritura sin autorización docente.

## Materiales

- Lectura "Chat, workflow y agente".
- Lectura "Arquitectura y ciclo de un agente".
- Laboratorio "Agente controlado".
- Repositorio Guardia de Sigilo.
- OpenCode o herramienta equivalente.
- Traza saneada de agente controlado para la alternativa sin modelo.

## Secuencia

### 1. Apertura y encuadre - 10 minutos

Presentar el objetivo: no se evalúa cuánto código produce la herramienta, sino la capacidad de controlar el proceso y justificar decisiones con evidencia.

Preguntas iniciales:

- ¿Qué diferencia hay entre que un modelo sugiera un cambio y que una herramienta lo aplique?
- ¿Qué puede salir mal si se habilita escritura antes de entender el proyecto?
- ¿Qué evidencia demuestra que una afirmación del agente es correcta?

### 2. Modelo conceptual - 15 minutos

Construir en pizarra el ciclo:

```text
objetivo e instrucciones
        ↓
modelo ↔ contexto y estado
        ↓
acción → herramienta → entorno
        ↓
resultado observable → verificar → continuar, ajustar, terminar o escalar
```

Recordar que el modelo no modifica archivos directamente, los permisos pertenecen a la herramienta y al entorno, y una prueba aprobada puede no cubrir todos los criterios de aceptación.

### 3. Demostración docente breve - 15 minutos

Abrir `README.md`, `AGENTS.md`, `docs/arquitectura.md`, `docs/permisos-recomendados.md`, `package.json` y las pruebas de navegación. Ejecutar únicamente:

```bash
npm run validate
```

Mostrar el estado de Git antes y después. No realizar cambios. Señalar que el proyecto permite elegir el destino con clic, alternar BFS y A* con espacio, emitir sonido con `Q` y reiniciar con `R`.

### 4. Trabajo de equipos - 55 minutos

Entregar el encargo: explicar cómo se determina el destino del guardia y comprobar si la validación disponible respalda esa explicación.

Cada equipo debe:

1. Redactar un contrato breve con objetivo, fuera de alcance, evidencia de éxito, permisos y condiciones de detención.
2. Clasificar si la tarea requiere chat, workflow o agente, y justificar la autonomía mínima.
3. Trabajar inicialmente sólo con lectura y búsqueda.
4. Mapear el recorrido desde una entrada o evento perceptual hasta el destino del guardia, citando rutas y símbolos.
5. Contrastar al menos dos afirmaciones del agente contra archivos, búsquedas o ejecución.
6. Solicitar un plan de validación con comandos documentados y criterios observables.
7. Ejecutar sólo comandos autorizados por la documentación o por el docente.
8. Registrar observación, acción, herramienta, resultado, verificación y decisión de cada ciclo.

El equipo sin modelo analiza la traza pública con los mismos criterios.

### 5. Puesta en común - 15 minutos

Pedir a cada equipo una afirmación comprobada, una refutada o todavía supuesta, un permiso que decidió no habilitar y una condición de detención o escalamiento.

### 6. Cierre - 10 minutos

Recuperar estas ideas:

- El agente es un ciclo controlado, no un chat con más autonomía.
- La persona establece alcance, permisos y condiciones de salida.
- La evidencia proviene del entorno: archivos, pruebas, resultados y diferencias.
- Detenerse ante ambigüedad o falta de permisos es una decisión correcta.

## Entregable

Informe breve en Markdown con clasificación de la tarea, contrato de ejecución, flujo observado, tabla de ciclos, dos afirmaciones con evidencia, dudas pendientes, comandos y resultados, y decisión humana final.

## Criterios de observación docente

- Distingue modelo, herramienta y entorno.
- Mantiene permisos mínimos.
- No acepta afirmaciones sin contrastarlas.
- Registra evidencia sin incluir razonamientos privados, secretos ni datos personales.
- Reconoce cuándo continuar, ajustar, terminar o escalar.
