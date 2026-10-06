import type { ContentEntry } from "./schema";

export function acceptsDeliveries(entry: Pick<ContentEntry, "type" | "evaluable">): boolean {
  return entry.type === "actividad" || (entry.type === "laboratorio" && entry.evaluable === true);
}
