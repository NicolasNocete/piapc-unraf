import { z } from "zod";

const contentTypes = ["indice", "lectura", "actividad", "laboratorio", "referencia", "plantilla", "guia-docente", "solucion", "rubrica"] as const;
const learningTypes = new Set(["lectura", "actividad", "laboratorio"]);

const civilDate = z.preprocess((value) => value instanceof Date ? value.toISOString().slice(0, 10) : value, z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Debe usar el formato YYYY-MM-DD").refine((value) => {
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}, "Debe ser una fecha valida"));

export const contentFrontmatterSchema = z.object({
  id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Debe ser un identificador kebab-case"),
  titulo: z.string().trim().min(1),
  tipo: z.enum(contentTypes),
  audiencia: z.enum(["estudiante", "docente", "publica"]),
  acceso: z.enum(["publico", "diferido", "privado"]),
  version: z.number().int().positive(),
  eje: z.number().int().min(1).max(7).optional(),
  orden: z.number().int().positive().optional(),
  nivel: z.enum(["obligatorio", "demostrativo", "ampliacion"]).optional(),
  clases: z.array(z.number().int().positive()).optional(),
  modalidad: z.enum(["presencial", "virtual-asincronica", "mixta"]).optional(),
  duracion_minutos: z.number().int().positive().optional(),
  resultados: z.array(z.string().min(1)).optional(),
  prerrequisitos: z.array(z.string()).optional(),
  evaluable: z.boolean().optional(),
  disponible_desde: civilDate.optional(),
  disponible_hasta: civilDate.optional(),
  publicar_desde: civilDate.optional(),
  solucion: z.string().min(1).optional(),
}).strict().superRefine((entry, context) => {
  if (learningTypes.has(entry.tipo)) {
    for (const field of ["eje", "orden", "nivel", "clases", "modalidad", "duracion_minutos", "resultados", "prerrequisitos", "evaluable"] as const) {
      if (entry[field] === undefined) {
        context.addIssue({ code: "custom", path: [field], message: `${field} es obligatorio para ${entry.tipo}` });
      }
    }
  }

  if (entry.publicar_desde && (entry.tipo !== "solucion" || entry.acceso !== "diferido")) {
    context.addIssue({ code: "custom", path: ["publicar_desde"], message: "Solo se admite para soluciones diferidas" });
  }

  if (entry.tipo === "actividad") {
    for (const field of ["disponible_desde", "disponible_hasta"] as const) {
      if (entry[field] === undefined) {
        context.addIssue({ code: "custom", path: [field], message: `${field} es obligatorio para actividad` });
      }
    }
    if (entry.disponible_desde && entry.disponible_hasta && entry.disponible_desde > entry.disponible_hasta) {
      context.addIssue({ code: "custom", path: ["disponible_hasta"], message: "disponible_hasta no puede ser anterior a disponible_desde" });
    }
  }
});

export type ContentFrontmatter = z.infer<typeof contentFrontmatterSchema>;

export type ContentEntry = {
  id: string;
  title: string;
  type: ContentFrontmatter["tipo"];
  audience: ContentFrontmatter["audiencia"];
  access: "publico";
  version: number;
  sourcePath: string;
  digest: string;
  axis?: number;
  order?: number;
  level?: ContentFrontmatter["nivel"];
  classes?: number[];
  modality?: ContentFrontmatter["modalidad"];
  durationMinutes?: number;
  outcomes?: string[];
  prerequisites?: string[];
  evaluable?: boolean;
  availableFrom?: string;
  availableUntil?: string;
};

export const contentEntrySchema = z.object({
  id: z.string(),
  title: z.string(),
  type: z.enum(contentTypes),
  audience: z.enum(["estudiante", "docente", "publica"]),
  access: z.literal("publico"),
  version: z.number().int().positive(),
  sourcePath: z.string().regex(/^(?!\/)(?!.*(?:^|\/)\.\.(?:\/|$)).+\.md$/),
  digest: z.string().regex(/^[a-f0-9]{64}$/),
  axis: z.number().int().min(1).max(7).optional(),
  order: z.number().int().positive().optional(),
  level: z.enum(["obligatorio", "demostrativo", "ampliacion"]).optional(),
  classes: z.array(z.number().int().positive()).optional(),
  modality: z.enum(["presencial", "virtual-asincronica", "mixta"]).optional(),
  durationMinutes: z.number().int().positive().optional(),
  outcomes: z.array(z.string()).optional(),
  prerequisites: z.array(z.string()).optional(),
  evaluable: z.boolean().optional(),
  availableFrom: civilDate.optional(),
  availableUntil: civilDate.optional(),
}).strict();

export const contentManifestSchema = z.object({
  entries: z.array(contentEntrySchema),
}).strict();

export type ContentManifest = z.infer<typeof contentManifestSchema>;
