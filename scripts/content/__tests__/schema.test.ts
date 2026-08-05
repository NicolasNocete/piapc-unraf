import assert from "node:assert/strict";
import test from "node:test";

import { contentFrontmatterSchema } from "../../../src/lib/content/schema";

const baseEntry = {
  id: "eje-01-ejemplo",
  titulo: "Ejemplo",
  tipo: "lectura",
  audiencia: "estudiante",
  acceso: "publico",
  version: 1,
  eje: 1,
  orden: 1,
  nivel: "obligatorio",
  clases: [1],
  modalidad: "mixta",
  duracion_minutos: 10,
  resultados: ["RA1"],
  prerrequisitos: [],
  evaluable: false,
};

test("acepta un material de aprendizaje con metadatos completos", () => {
  assert.equal(contentFrontmatterSchema.safeParse(baseEntry).success, true);
});

test("rechaza un material de aprendizaje sin sus metadatos pedagogicos", () => {
  const invalidEntry = { ...baseEntry, clases: undefined };
  assert.equal(contentFrontmatterSchema.safeParse(invalidEntry).success, false);
});

test("solo permite publicar_desde en soluciones diferidas", () => {
  const invalidEntry = { ...baseEntry, publicar_desde: "2026-08-12" };
  const validEntry = {
    id: "solucion-eje-01",
    titulo: "Solucion",
    tipo: "solucion",
    audiencia: "estudiante",
    acceso: "diferido",
    version: 1,
    publicar_desde: "2026-08-12",
  };

  assert.equal(contentFrontmatterSchema.safeParse(invalidEntry).success, false);
  assert.equal(contentFrontmatterSchema.safeParse(validEntry).success, true);
});

test("exige y valida el periodo de disponibilidad de una actividad", () => {
  const activity = { ...baseEntry, tipo: "actividad", disponible_desde: "2026-08-01", disponible_hasta: "2026-08-11" };

  assert.equal(contentFrontmatterSchema.safeParse(activity).success, true);
  assert.equal(contentFrontmatterSchema.safeParse({ ...activity, disponible_hasta: undefined }).success, false);
  assert.equal(contentFrontmatterSchema.safeParse({ ...activity, disponible_desde: "2026-08-12" }).success, false);
});
