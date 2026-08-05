import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { ContentMarkdown } from "@/app/contenidos/_components/content-markdown";
import { DeliverySection } from "@/app/contenidos/[id]/_components/delivery-section";
import { getContent, getContentNavigation, listContent } from "@/lib/content/server";

type Props = { params: Promise<{ id: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const content = await getContent(id);
  return content ? { title: `${content.entry.title} | PIAPC` } : {};
}

export default async function ContentPage({ params }: Props) {
  const { id } = await params;
  const content = await getContent(id);
  if (!content) notFound();
  const { entry, body } = content;
  const [entries, navigation] = await Promise.all([listContent(), getContentNavigation(id)]);
  const links = Object.fromEntries(entries.map((item) => [item.sourcePath, item.id]));
  const details = [
    entry.axis ? `Eje ${String(entry.axis).padStart(2, "0")}` : null,
    entry.level,
    entry.classes?.length ? `Clase${entry.classes.length > 1 ? "s" : ""} ${entry.classes.join(", ")}` : null,
    entry.durationMinutes ? `${entry.durationMinutes} min` : null,
  ].filter(Boolean);
  return (
    <main className="min-h-svh bg-[#fffdf6] px-5 py-10 text-[#14251d] sm:px-8 lg:px-12">
      <article className="mx-auto max-w-3xl">
        <Link href="/contenidos" className="font-mono text-xs uppercase tracking-[0.2em] text-[#52705e]">Contenidos</Link>
        <div className="mt-8 flex flex-wrap gap-2"><Badge variant="outline">{entry.type}</Badge><Badge variant="secondary">Version {entry.version}</Badge></div>
        <h1 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-6xl">{entry.title}</h1>
        {details.length > 0 ? <p className="mt-4 font-mono text-xs uppercase tracking-[0.15em] text-[#52705e]">{details.join(" · ")}</p> : null}
        <div className="mt-10"><ContentMarkdown sourcePath={entry.sourcePath} links={links}>{body}</ContentMarkdown></div>
        {entry.type === "actividad" ? <DeliverySection activityId={entry.id} /> : null}
        {navigation.previous || navigation.next ? (
          <nav aria-label="Navegacion entre contenidos" className="mt-14 grid gap-4 border-t border-[#14251d]/10 pt-6 sm:grid-cols-2">
            {navigation.previous ? <Link href={`/contenidos/${navigation.previous.id}`} className="rounded-lg border border-[#14251d]/10 p-4 text-sm transition-colors hover:bg-[#f2f0e8]"><span className="block font-mono text-xs uppercase tracking-[0.14em] text-[#52705e]">Anterior</span><span className="mt-1 block font-medium">{navigation.previous.title}</span></Link> : <span />}
            {navigation.next ? <Link href={`/contenidos/${navigation.next.id}`} className="rounded-lg border border-[#14251d]/10 p-4 text-right text-sm transition-colors hover:bg-[#f2f0e8]"><span className="block font-mono text-xs uppercase tracking-[0.14em] text-[#52705e]">Siguiente</span><span className="mt-1 block font-medium">{navigation.next.title}</span></Link> : null}
          </nav>
        ) : null}
      </article>
    </main>
  );
}
