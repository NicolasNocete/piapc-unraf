import "server-only";

import { readFile } from "node:fs/promises";
import { join } from "node:path";
import matter from "gray-matter";
import { cache } from "react";

import { contentManifestSchema } from "@/lib/content/schema";

export type { ContentEntry } from "@/lib/content/schema";

const CONTENT_ROOT = join(process.cwd(), "content", "published");
const getManifest = cache(async () => contentManifestSchema.parse(JSON.parse(await readFile(join(process.cwd(), "content", "manifest.json"), "utf8"))));

export const listContent = cache(async () => (await getManifest()).entries.toSorted((a, b) => (a.axis ?? 99) - (b.axis ?? 99) || (a.order ?? 99) - (b.order ?? 99) || a.title.localeCompare(b.title)));
export const getContent = cache(async (id: string) => {
  const entry = (await listContent()).find((item) => item.id === id);
  if (!entry) return null;
  const raw = await readFile(join(CONTENT_ROOT, entry.sourcePath), "utf8");
  return { entry, body: matter(raw).content };
});

export const getContentNavigation = cache(async (id: string) => {
  const entries = await listContent();
  const current = entries.find((entry) => entry.id === id);
  if (!current?.axis || !current.order) return { previous: null, next: null };
  const axisEntries = entries.filter((entry) => entry.axis === current.axis && entry.order !== undefined);
  const index = axisEntries.findIndex((entry) => entry.id === id);
  return { previous: axisEntries[index - 1] ?? null, next: axisEntries[index + 1] ?? null };
});
