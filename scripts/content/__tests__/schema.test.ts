import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { contentFrontmatterSchema, contentManifestSchema, type ContentEntry } from "../../../src/lib/content/schema";
import { acceptsDeliveries } from "../../../src/lib/content/delivery";

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

test("admite laboratorios evaluables sin habilitar entregas en otros materiales", () => {
  const cases: { entry: Pick<ContentEntry, "type" | "evaluable">; expected: boolean }[] = [
    { entry: { type: "actividad", evaluable: true }, expected: true },
    { entry: { type: "actividad", evaluable: false }, expected: true },
    { entry: { type: "laboratorio", evaluable: true }, expected: true },
    { entry: { type: "laboratorio", evaluable: false }, expected: false },
    { entry: { type: "laboratorio" }, expected: false },
    { entry: { type: "lectura", evaluable: true }, expected: false },
    { entry: { type: "referencia", evaluable: true }, expected: false },
  ];

  for (const { entry, expected } of cases) {
    assert.equal(acceptsDeliveries(entry), expected, `${entry.type}: ${String(entry.evaluable)}`);
  }
});

test("las consignas publicadas de upgrades y navegacion admiten entregas con sus IDs originales", () => {
  const manifest = contentManifestSchema.parse(JSON.parse(readFileSync(join(process.cwd(), "content", "manifest.json"), "utf8")));
  for (const id of ["eje-04-laboratorio-flujo-completo", "eje-05-practica-guiada-navegacion"]) {
    const entry = manifest.entries.find((item) => item.id === id);
    assert.ok(entry, `Consigna publicada: ${id}`);
    assert.equal(acceptsDeliveries(entry), true, id);
  }
  const theory = manifest.entries.find((item) => item.id === "eje-05-teoria-navegacion-comportamiento");
  assert.ok(theory);
  assert.equal(acceptsDeliveries(theory), false);
});
