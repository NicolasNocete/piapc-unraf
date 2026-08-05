import Link from "next/link";

import { GuidedChat, type ChatMessage, type ChatSource, type Conversation } from "@/app/dashboard/consultas/_components/guided-chat";
import { buttonVariants } from "@/components/ui/button";
import { requireCompleteProfile } from "@/lib/profiles/server";
import { createClient } from "@/lib/supabase/server";
import type { Json } from "@/lib/supabase/database.types";

function getSources(value: Json): ChatSource[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (!item || typeof item !== "object" || Array.isArray(item)) return [];
    const { href, kind, title } = item;
    return typeof href === "string" && (kind === "content" || kind === "reference") && typeof title === "string" ? [{ href, kind, title }] : [];
  });
}

export default async function GuidedConsultationsPage() {
  await requireCompleteProfile();
  const supabase = await createClient();
  const { data: storedConversations } = await supabase
    .from("guided_conversations")
    .select("id, updated_at")
    .order("updated_at", { ascending: false });
  const conversationIds = (storedConversations ?? []).map((conversation) => conversation.id);
  const { data: storedMessages } = conversationIds.length
    ? await supabase.from("guided_messages").select("body, conversation_id, created_at, id, role, sources").in("conversation_id", conversationIds).order("created_at", { ascending: true })
    : { data: [] };
  const messagesByConversation = new Map<string, ChatMessage[]>();
  for (const message of storedMessages ?? []) {
    const messages = messagesByConversation.get(message.conversation_id) ?? [];
    messages.push({ body: message.body, id: message.id, role: message.role as "assistant" | "user", sources: getSources(message.sources) });
    messagesByConversation.set(message.conversation_id, messages);
  }
  const conversations: Conversation[] = (storedConversations ?? []).map((conversation) => ({ id: conversation.id, messages: messagesByConversation.get(conversation.id) ?? [], updatedAt: conversation.updated_at }));

  return <main className="min-h-svh bg-muted/40 p-4 sm:p-8"><div className="mx-auto flex max-w-6xl flex-col gap-6"><header className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-sm text-muted-foreground">Espacio de cátedra</p><h1 className="text-3xl font-semibold tracking-tight">Consultas guiadas</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">Respuestas basadas en los contenidos y referencias publicadas por la materia.</p></div><Link href="/dashboard" className={buttonVariants({ variant: "outline" })}>Volver al dashboard</Link></header><GuidedChat conversations={conversations} /></div></main>;
}
