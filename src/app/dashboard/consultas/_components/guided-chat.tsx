"use client";

import { LoaderCircle, Plus, Send } from "lucide-react";
import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export type ChatSource = { href: string; kind: "content" | "reference"; title: string };
export type ChatMessage = { body: string; id: string; role: "assistant" | "user"; sources: ChatSource[] };
export type Conversation = { id: string; messages: ChatMessage[]; updatedAt: string };

type GuidedChatProps = { conversations: Conversation[] };

export function GuidedChat({ conversations: initialConversations }: GuidedChatProps) {
  const [conversations, setConversations] = useState(initialConversations);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(initialConversations[0]?.id ?? null);
  const [question, setQuestion] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const activeConversation = conversations.find((conversation) => conversation.id === activeConversationId) ?? null;

  function startConversation() {
    setActiveConversationId(null);
    setQuestion("");
    setError(null);
  }

  function submitQuestion(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextQuestion = question.trim();
    if (!nextQuestion || isPending) return;

    setError(null);
    startTransition(async () => {
      try {
        const response = await fetch("/api/guided-consultations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ conversationId: activeConversationId, question: nextQuestion }),
        });
        const result = await response.json() as { answer?: string; conversationId?: string; error?: string; sources?: ChatSource[] };
        if (!response.ok || !result.answer || !result.conversationId) {
          setError(result.error ?? "No se pudo procesar la consulta.");
          return;
        }

        const now = new Date().toISOString();
        const messages: ChatMessage[] = [
          { body: nextQuestion, id: `${result.conversationId}-question-${now}`, role: "user", sources: [] },
          { body: result.answer, id: `${result.conversationId}-answer-${now}`, role: "assistant", sources: result.sources ?? [] },
        ];
        setConversations((current) => {
          const existing = current.find((conversation) => conversation.id === result.conversationId);
          const next = existing
            ? current.map((conversation) => conversation.id === result.conversationId ? { ...conversation, messages: [...conversation.messages, ...messages], updatedAt: now } : conversation)
            : [{ id: result.conversationId!, messages, updatedAt: now }, ...current];
          return next.toSorted((left, right) => right.updatedAt.localeCompare(left.updatedAt));
        });
        setActiveConversationId(result.conversationId!);
        setQuestion("");
      } catch {
        setError("No se pudo conectar con la guía. Probá de nuevo más tarde.");
      }
    });
  }

  return (
    <div className="grid min-h-[38rem] overflow-hidden rounded-2xl border bg-background lg:grid-cols-[15rem_1fr]">
      <aside className="border-b bg-muted/30 p-4 lg:border-b-0 lg:border-r">
        <Button type="button" variant="outline" className="w-full justify-start" onClick={startConversation}>
          <Plus data-icon="inline-start" /> Nueva consulta
        </Button>
        <div className="mt-5 space-y-2">
          {conversations.map((conversation) => (
            <button key={conversation.id} type="button" onClick={() => { setActiveConversationId(conversation.id); setError(null); }} className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${conversation.id === activeConversationId ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>
              {conversation.messages.find((message) => message.role === "user")?.body ?? "Consulta"}
            </button>
          ))}
        </div>
      </aside>

      <section className="flex min-w-0 flex-col">
        <div className="flex-1 space-y-5 p-5 sm:p-7">
          {activeConversation?.messages.length ? activeConversation.messages.map((message) => (
            <article key={message.id} className={message.role === "user" ? "ml-auto max-w-2xl rounded-2xl bg-primary px-4 py-3 text-primary-foreground" : "max-w-3xl rounded-2xl border bg-muted/40 px-4 py-3"}>
              <p className="whitespace-pre-wrap text-sm leading-6">{message.body}</p>
              {message.role === "assistant" && message.sources.length ? <div className="mt-4 border-t pt-3"><p className="text-xs font-medium text-muted-foreground">Fuentes</p><ul className="mt-2 flex flex-wrap gap-2">{message.sources.map((source) => <li key={source.href}><a href={source.href} target={source.kind === "reference" ? "_blank" : undefined} rel={source.kind === "reference" ? "noreferrer" : undefined} className="text-xs underline underline-offset-4 hover:text-primary">{source.title}</a></li>)}</ul></div> : null}
            </article>
          )) : <div className="grid min-h-72 place-items-center text-center"><div><p className="text-lg font-semibold">¿Qué querés repasar?</p><p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">Preguntá sobre los contenidos publicados. Cada respuesta mostrará las fuentes que la respaldan.</p></div></div>}
        </div>

        <form onSubmit={submitQuestion} className="border-t p-4 sm:p-5">
          <Textarea value={question} onChange={(event) => setQuestion(event.target.value)} maxLength={2000} placeholder="Escribí una pregunta sobre los materiales..." aria-label="Pregunta para la guía" disabled={isPending} />
          {error ? <p role="alert" className="mt-2 text-sm text-destructive">{error}</p> : null}
          <div className="mt-3 flex items-center justify-between gap-4"><p className="text-xs leading-5 text-muted-foreground">Tu pregunta y el contexto mínimo necesario se procesarán mediante OpenAI. La guía no reemplaza las consignas ni decisiones de la cátedra.</p><Button type="submit" disabled={isPending || !question.trim()}>{isPending ? <LoaderCircle className="animate-spin" /> : <Send />} {isPending ? "Consultando" : "Enviar"}</Button></div>
        </form>
      </section>
    </div>
  );
}
