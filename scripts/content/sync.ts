import { createHash } from "node:crypto";
import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { join, relative, resolve, sep } from "node:path";
import matter from "gray-matter";
import { contentFrontmatterSchema, type ContentEntry } from "../../src/lib/content/schema";

const root = join(process.cwd(), "..");
const source = join(root, "contenidos");
const target = join(process.cwd(), "content", "published");

const allowedRoots = new Set(["ejes", "transversales", "plantillas", "soluciones"]);

async function files(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map(async (entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? files(path) : entry.name.endsWith(".md") ? [path] : [];
  }))).flat();
}

async function main() {
  const entries: ContentEntry[] = [];
  const ids = new Set<string>();
  await rm(target, { recursive: true, force: true });

  for (const file of await files(source)) {
    const path = relative(source, file).replaceAll("\\", "/");
    const [firstSegment] = path.split("/");
    if (path !== "README.md" && path !== "glosario.md" && !allowedRoots.has(firstSegment)) continue;

    const raw = await readFile(file, "utf8");
    const parsed = matter(raw);
    const result = contentFrontmatterSchema.safeParse(parsed.data);
    if (!result.success) throw new Error(`${path}: ${result.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join("; ")}`);
    const data = result.data;
    if (ids.has(data.id)) throw new Error(`${path}: id duplicado: ${data.id}`);
    ids.add(data.id);
    if (data.acceso === "privado") continue;
    // Deferred material needs an explicit release workflow and is not copied by default.
    if (data.acceso === "diferido") continue;
    const destination = join(target, path);
    if (!resolve(destination).startsWith(`${resolve(target)}${sep}`)) throw new Error(`${path}: ruta fuera del destino permitido`);
    await mkdir(join(destination, ".."), { recursive: true });
    await cp(file, destination);
    entries.push({
      id: data.id,
      title: data.titulo,
      type: data.tipo,
      audience: data.audiencia,
      access: "publico",
      version: Number(data.version),
      sourcePath: path,
      digest: createHash("sha256").update(raw).digest("hex"),
      axis: typeof data.eje === "number" ? data.eje : undefined,
      order: typeof data.orden === "number" ? data.orden : undefined,
      level: data.nivel,
      classes: data.clases,
      modality: data.modalidad,
      durationMinutes: data.duracion_minutos,
      outcomes: data.resultados,
      prerequisites: data.prerrequisitos,
      evaluable: data.evaluable,
      availableFrom: data.disponible_desde,
      availableUntil: data.disponible_hasta,
    });
  }

  entries.sort((a, b) => (a.axis ?? 99) - (b.axis ?? 99) || (a.order ?? 99) - (b.order ?? 99) || a.title.localeCompare(b.title));
  await mkdir(join(process.cwd(), "content"), { recursive: true });
  await writeFile(join(process.cwd(), "content", "manifest.json"), `${JSON.stringify({ entries }, null, 2)}\n`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
