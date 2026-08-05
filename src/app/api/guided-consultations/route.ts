import { z } from "zod";

import { buildGuidedPrompt, getConversationHistory, getGuidedContext } from "@/lib/guided-consultations/server";
import { createClient } from "@/lib/supabase/server";

const requestSchema = z.object({
  conversationId: z.string().uuid().nullable(),
  question: z.string().trim().min(1).max(2000),
}).strict();

const blockedQuestionPatterns: Array<[RegExp, "academic-private" | "instruction-override" | "unsafe-or-abusive"]> = [
  [/ignora (las |tus )?(instrucciones|reglas)|prompt|system message|mensaje del sistema/i, "instruction-override"],
  [/calificaci[oó]n|nota de |entrega de |datos personales|contraseñ|token|credencial/i, "academic-private"],
  [/amenaza|odio|violencia|autolesi[oó]n|suicid/i, "unsafe-or-abusive"],
];

function getBlockedCategory(question: string) {
  return blockedQuestionPatterns.find(([pattern]) => pattern.test(question))?.[1] ?? null;
}

function getOpenAIText(response: unknown) {
  if (!response || typeof response !== "object") return null;
  const output = "output" in response && Array.isArray(response.output) ? response.output : [];
  const text = output.flatMap((item) => {
    if (!item || typeof item !== "object" || !("content" in item) || !Array.isArray(item.content)) return [];
    return item.content.flatMap((content: unknown) => content && typeof content === "object" && "type" in content && content.type === "output_text" && "text" in content && typeof content.text === "string" ? [content.text] : []);
  }).join("\n").trim();
  return text || null;
}

export async function POST(request: Request) {
  const parsed = requestSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "La pregunta no tiene un formato válido." }, { status: 400 });

  const supabase = await createClient();
  const { data: claims, error: claimsError } = await supabase.auth.getClaims();
  if (claimsError || !claims?.claims?.sub) return Response.json({ error: "Necesitás iniciar sesión para consultar." }, { status: 401 });
  if (!process.env.OPENAI_API_KEY) return Response.json({ error: "La guía no está disponible en este momento. Probá de nuevo más tarde." }, { status: 503 });

  const category = getBlockedCategory(parsed.data.question);
  if (category) {
    const { error } = await supabase.rpc("reserve_guided_rejection", { next_category: category });
    if (error) return Response.json({ error: "Alcanzaste el límite diario de diez consultas." }, { status: 429 });
    return Response.json({ error: "No puedo procesar esa consulta. Usá esta sección solo para estudiar los materiales publicados." }, { status: 422 });
  }

  const { data: reservation, error: reservationError } = await supabase.rpc("reserve_guided_consultation", {
    next_conversation_id: parsed.data.conversationId,
    next_question: parsed.data.question,
  });
  const reserved = reservation?.[0];
  if (reservationError || !reserved) return Response.json({ error: "Alcanzaste el límite diario de diez consultas." }, { status: 429 });

  const context = await getGuidedContext(parsed.data.question);
  const sources = context.flatMap((source) => [
    { href: source.href, kind: source.kind, title: source.title },
    ...source.references,
  ]);
  const uniqueSources = [...new Map(sources.map((source) => [source.href, source])).values()];

  const answer = context.length === 0
    ? "No encuentro material publicado suficiente para fundamentar esa respuesta. Revisá los contenidos de la materia o consultá a la cátedra."
    : await generateAnswer(parsed.data.question, parsed.data.conversationId, context);

  if (!answer) return Response.json({ error: "La guía no está disponible en este momento. Probá de nuevo más tarde." }, { status: 503 });

  const { error: appendError } = await supabase.rpc("append_guided_response", {
    next_body: answer,
    next_sources: uniqueSources,
    target_conversation_id: reserved.conversation_id,
    target_question_id: reserved.question_id,
  });
  if (appendError) return Response.json({ error: "No se pudo guardar la respuesta. Probá de nuevo más tarde." }, { status: 500 });

  return Response.json({
    answer,
    conversationId: reserved.conversation_id,
    remaining: reserved.remaining,
    sources: uniqueSources,
  });
}

async function generateAnswer(question: string, conversationId: string | null, context: Awaited<ReturnType<typeof getGuidedContext>>) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  const history = conversationId ? await getConversationHistory(conversationId) : [];
  const prompt = buildGuidedPrompt(question, context, history);
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      store: false,
      input: [
        { role: "developer", content: prompt.developer },
        { role: "user", content: prompt.user },
      ],
      max_output_tokens: 700,
    }),
  });
  if (!response.ok) return null;
  return getOpenAIText(await response.json());
}
