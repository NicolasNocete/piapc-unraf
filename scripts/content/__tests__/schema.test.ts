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

test("GDD y proyecto final son actividades entregables independientes con sus propios plazos", () => {
  const manifest = contentManifestSchema.parse(JSON.parse(readFileSync(join(process.cwd(), "content", "manifest.json"), "utf8")));
  const gdd = manifest.entries.find((entry) => entry.id === "tp-final-entrega-gdd");
  const final = manifest.entries.find((entry) => entry.id === "tp-final-integrador-npc");
  assert.ok(gdd);
  assert.ok(final);
  assert.notEqual(gdd.id, final.id);
  assert.notEqual(gdd.sourcePath, final.sourcePath);
  for (const entry of [gdd, final]) {
    assert.equal(entry.type, "actividad");
    assert.equal(entry.evaluable, true);
    assert.equal(acceptsDeliveries(entry), true);
  }
  assert.equal(gdd.title, "Entrega del GDD");
  assert.equal(gdd.availableFrom, "2026-10-21");
  assert.equal(gdd.availableUntil, "2026-10-27");
  assert.equal(final.availableFrom, "2026-10-19");
  assert.equal(final.availableUntil, "2026-11-03");
});

test("la entrega del GDD comunica hora, materiales y versiones separadas de la entrega final", () => {
  const gdd = readFileSync(join(process.cwd(), "content", "published", "transversales", "tp-final-entrega-gdd.md"), "utf8");
  assert.match(gdd, /antes del martes 27 de octubre de 2026 a las 12:00 hs \(hora de Argentina\)/);
  assert.match(gdd, /No hace falta tener el prototipo terminado, las specs ni la presentación/);
  assert.match(gdd, /versiones y devoluciones se conservan separadas/);
  assert.match(gdd, /cada integrante registra su propia entrega/);
  assert.match(gdd, /\]\(tp-final-integrador-npc\.md\)/);
  assert.match(gdd, /\]\(tp-final-como-comenzar\.md\)/);
});

test("consigna, guia e indice enlazan la entrega del GDD sin convertir la guia en otra actividad", () => {
  const directory = join(process.cwd(), "content", "published", "transversales");
  for (const file of ["tp-final-integrador-npc.md", "tp-final-como-comenzar.md", "README.md"]) {
    const raw = readFileSync(join(directory, file), "utf8");
    assert.match(raw, /\]\(tp-final-entrega-gdd\.md\)/, file);
    assert.doesNotMatch(raw, /No hay una entrega intermedia separada/, file);
  }
  const manifest = contentManifestSchema.parse(JSON.parse(readFileSync(join(process.cwd(), "content", "manifest.json"), "utf8")));
  const guide = manifest.entries.find((entry) => entry.id === "tp-final-como-comenzar");
  assert.ok(guide);
  assert.equal(guide.type, "lectura");
  assert.equal(guide.evaluable, false);
  assert.equal(acceptsDeliveries(guide), false);
});
