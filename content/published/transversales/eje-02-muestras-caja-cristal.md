---
id: transversal-eje-02-muestras-caja-cristal
titulo: Muestras para el laboratorio de tokenización, contexto y variabilidad
tipo: referencia
audiencia: estudiante
acceso: publico
version: 1
---

# Muestras para la caja de cristal

Paquete autocontenido para ejecutar el laboratorio sin consultar un modelo ni un tokenizador externo. Todos los conteos y textos siguientes son **datos de ejercicio producidos por simuladores didácticos**, no respuestas correctas ni afirmaciones sobre un modelo comercial. Las salidas se conservan tal como fueron registradas y pueden contener omisiones, contradicciones o hechos inventados.

## Condiciones comunes

- Fecha del registro: `2026-03-12`.
- Generador simulado: `AulaLM-0.4`, instantánea `2026-03-01`.
- Límite de salida: 60 tokens.
- Instrucción de sistema simulada: `Responde sólo la solicitud. No agregues fuentes.`
- No hubo herramientas, recuperación ni acceso a red, salvo donde se indica el contexto suministrado.

## Estación 1: tokenización

Los tokenizadores didácticos `Ficha-A` y `Ficha-B` no representan un proveedor. El símbolo `▁` marca un segmento que comienza después de un espacio; cada elemento entre corchetes cuenta como un token.

### Texto base

```text
Objeto: Llave_del_Santuario🔑
Descripción: abre una cámara después de la misión «Ecos».
Código: if (inventory.has("sanctuary_key")) openDoor();
```

| Tokenizador | Segmentación registrada | Total |
|---|---|---:|
| Ficha-A | `[Objeto][:][▁Llave][_del][_Santu][ario][🔑][\n][Descripción][:][▁abre][▁una][▁cámara][▁después][▁de][▁la][▁misión][▁«][Ecos][»][.][\n][Código][:][▁if][▁(][inventory][.has][(\"] [sanctuary][_key][\")] [)][▁open][Door][(][)][;]` | 38 |
| Ficha-B | `[Objeto][:][▁Ll][ave][_][del][_][Sant][uario][�][�][\n][Descripción][:][▁abre][▁una][▁cámara][▁después][▁de][▁la][▁misión][▁«E][cos][»][.][\n][Código][:][▁if][▁(][inventory][.][has][(][\"][sanctuary][_][key][\"][)][)][▁open][Door][(][)][;]` | 46 |

Los espacios visibles dentro de algunos corchetes separan columnas tipográficas, no tokens adicionales. Para el análisis debe usarse el total registrado y señalarse cualquier ambigüedad de representación.

### Variante

```text
Objeto: SanctuaryKey
Descripción: abre una cámara después de la misión «Ecos».
Código: if (inventory.has("sanctuary_key")) openDoor();
```

| Tokenizador | Segmentación registrada | Total |
|---|---|---:|
| Ficha-A | `[Objeto][:][▁Sanctuary][Key][\n][Descripción][:][▁abre][▁una][▁cámara][▁después][▁de][▁la][▁misión][▁«][Ecos][»][.][\n][Código][:][▁if][▁(][inventory][.has][(\"] [sanctuary][_key][\")] [)][▁open][Door][(][)][;]` | 35 |
| Ficha-B | `[Objeto][:][▁Sanct][uary][Key][\n][Descripción][:][▁abre][▁una][▁cámara][▁después][▁de][▁la][▁misión][▁«E][cos][»][.][\n][Código][:][▁if][▁(][inventory][.][has][(][\"][sanctuary][_][key][\"][)][)][▁open][Door][(][)][;]` | 40 |

## Estación 2: contexto contradictorio

Consigna exacta en las tres ejecuciones: `Propón una guarda antes de abrir la puerta y explica en dos frases`.

| Ejecución | Contexto suministrado, además de la consigna | Salida cruda del simulador |
|---|---|---|
| C1 | `if (inventory.has("sanctuary_key")) openDoor();` | `Comprueba que la llave exista antes de abrir: if (!inventory.has("sanctuary_key")) return; openDoor();. Así la puerta sólo se abre con la llave.` |
| C2 | Código de C1. `Regla vigente: la llave se consume al usarla`. | `Valida la llave, abre la puerta y luego quítala: if (inventory.has("sanctuary_key")) { openDoor(); inventory.remove("sanctuary_key"); }. Esto respeta el consumo indicado.` |
| C3 | Código y regla de C2. `Documento antiguo: las llaves nunca se consumen`. | `Como las llaves nunca se consumen, basta con mantener la comprobación existente antes de openDoor(). La regla de consumo parece opcional para este objeto.` |

Configuración: `variacion=0.2`, `semilla=no expuesta`. No se ejecutó el código y no se suministró la API real de `inventory`.

## Estación 3: variabilidad

Entrada exacta: texto base y `Escribe una descripción del objeto de máximo 25 palabras.`

| ID | Variación | Semilla visible | Salida cruda | Conteo por espacios registrado |
|---|---:|---|---|---:|
| B1 | 0.2 | no expuesta | `Llave obtenida tras Ecos que abre la cámara oculta del Santuario.` | 11 |
| B2 | 0.2 | no expuesta | `Llave de Ecos: permite abrir la cámara del Santuario.` | 9 |
| B3 | 0.2 | no expuesta | `Abre la cámara del Santuario después de completar Ecos.` | 9 |
| A1 | 0.9 | 4815 | `Una llave de obsidiana que despierta el Santuario tras derrotar al Guardián de Ecos.` | 14 |
| A2 | 0.9 | 9270 | `El premio de Ecos abre una cámara secreta del Santuario y revela un mapa antiguo bajo el altar.` | 18 |
| A3 | 0.9 | 4815 | `Llave del Santuario: abre la cámara tras Ecos, pero se rompe al primer uso y alerta a los guardianes cercanos.` | 20 |

Las ejecuciones A1 y A3 declaran la misma semilla y configuración. El registro no informa versión del motor de inferencia ni garantía de determinismo.

## Estación 4: recuperación simulada

Consulta: `¿cuándo se abre el santuario?`

| ID | Similitud léxica simulada | Metadatos | Fragmento |
|---|---:|---|---|
| A | 0.81 | `version=0.8`, `estado=archivado`, `fecha=2025-06-10` | `Versión 0.8: el santuario se abre al vencer al guardián.` |
| B | 0.74 | `version=1.0`, `estado=vigente`, `fecha=2026-02-02` | `Versión 1.0 vigente: se abre con sanctuary_key después de Ecos.` |
| C | 0.86 | `version=1.0`, `estado=vigente`, `fecha=2026-02-02` | `La llave del depósito abre una puerta cerca del santuario.` |

No se provee un orden resuelto. El equipo debe conservar identificador, versión y estado cuando construya su contexto final.

## Uso del paquete

Analiza exactamente las cuatro estaciones del laboratorio. En vez de generar nuevas respuestas, documenta qué comparación permite cada registro, sus límites y qué repetición diseñarías. Este paquete no incluye diagnósticos ni controles recomendados.
