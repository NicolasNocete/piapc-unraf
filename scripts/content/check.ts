import { createHash } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import { dirname, join, normalize, relative, resolve, sep } from "node:path";
import matter from "gray-matter";

import { contentFrontmatterSchema, contentManifestSchema } from "../../src/lib/content/schema";

const CONTENT_ROOT = join(process.cwd(), "content", "published");
const SAFE_PROTOCOLS = new Set(["http:", "https:", "mailto:"]);

async function markdownFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map(async (entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? markdownFiles(path) : entry.name.endsWith(".md") ? [path] : [];
  }))).flat();
}

function validateLink(sourcePath: string, href: string, publishedPaths: Set<string>) {
  if (href.startsWith("#")) return;
  const url = new URL(href, "https://piapc.invalid");
  if (url.origin !== "https://piapc.invalid") {
    if (!SAFE_PROTOCOLS.has(url.protocol)) throw new Error(`${sourcePath}: protocolo no permitido: ${href}`);
    return;
  }
  if (href.startsWith("/")) throw new Error(`${sourcePath}: enlace absoluto no permitido: ${href}`);
  const targetPath = decodeURIComponent(href.split(/[?#]/, 1)[0]);
  const target = normalize(join("/", dirname(sourcePath), targetPath)).replaceAll("\\", "/").replace(/^\//, "");
  if (!target.endsWith(".md") || !publishedPaths.has(target)) throw new Error(`${sourcePath}: destino interno no publicado: ${href}`);
}

async function main() {
  const manifest = contentManifestSchema.parse(JSON.parse(await readFile(join(process.cwd(), "content", "manifest.json"), "utf8")));
  const ids = new Set<string>();
  const publishedPaths = new Set(manifest.entries.map((entry) => entry.sourcePath));
  for (const entry of manifest.entries) {
    if (ids.has(entry.id)) throw new Error(`Entrada invalida: ${entry.id}`);
    ids.add(entry.id);
    const filePath = resolve(CONTENT_ROOT, entry.sourcePath);
    if (!filePath.startsWith(`${resolve(CONTENT_ROOT)}${sep}`)) throw new Error(`Ruta fuera del contenido publicado: ${entry.sourcePath}`);
    const raw = await readFile(filePath, "utf8");
    const digest = createHash("sha256").update(raw).digest("hex");
    if (digest !== entry.digest) throw new Error(`Replica divergente: ${entry.sourcePath}`);
    const parsed = matter(raw);
    const frontmatter = contentFrontmatterSchema.parse(parsed.data);
    if (frontmatter.id !== entry.id || frontmatter.acceso !== "publico" || frontmatter.version !== entry.version) throw new Error(`Metadatos divergentes: ${entry.sourcePath}`);
    for (const match of parsed.content.matchAll(/!?\[[^\]]*\]\(([^\s)]+)(?:\s+[^)]*)?\)/g)) validateLink(entry.sourcePath, match[1], publishedPaths);
  }

  const replicatedFiles = await markdownFiles(CONTENT_ROOT);
  for (const file of replicatedFiles) {
    const sourcePath = relative(CONTENT_ROOT, file).replaceAll("\\", "/");
    if (!publishedPaths.has(sourcePath)) throw new Error(`Archivo sin manifest: ${sourcePath}`);
  }
}

main().catch((error: unknown) => { console.error(error); process.exitCode = 1; });
