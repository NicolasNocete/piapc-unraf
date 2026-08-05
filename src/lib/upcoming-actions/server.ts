import "server-only";

import { readFile } from "node:fs/promises";
import { join } from "node:path";
import matter from "gray-matter";
import { cache } from "react";
import { z } from "zod";

const upcomingActionsSchema = z.object({
  summary: z.string().trim().min(1),
  actions: z.array(z.object({
    title: z.string().trim().min(1),
    href: z.string().startsWith("/contenidos/"),
  })).min(1),
  deadline: z.string().trim().min(1),
  note: z.string().trim().min(1),
}).strict();

export const getUpcomingActions = cache(async () => {
  const source = await readFile(join(process.cwd(), "content", "upcoming-actions.md"), "utf8");
  return upcomingActionsSchema.parse(matter(source).data);
});
