import { BookOpen, Home } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { glossary } from "@/content/generated/academic-content";

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

type GlossaryTerm = (typeof glossary.terms)[number];

const termsByLetter = glossary.terms.reduce<Record<string, GlossaryTerm[]>>(
  (groups, term) => {
    const letter = term.term.normalize("NFD").replace(/[\u0300-\u036f]/g, "")[0]?.toUpperCase() ?? "#";
    (groups[letter] ??= []).push(term);
    return groups;
  },
  {},
);

const letters = Object.keys(termsByLetter).sort();

export default function GlossaryPage() {
  return (
    <main className="min-h-svh bg-[#f2f0e8] px-4 py-6 text-[#14251d] sm:px-8 sm:py-10">
      <article className="mx-auto max-w-6xl rounded-[2rem] border border-[#14251d]/10 bg-[#fffdf6] p-6 sm:p-10 lg:p-14">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className={buttonVariants({ variant: "ghost", size: "sm" })}>
            <Home data-icon="inline-start" /> Inicio
          </Link>
          <Badge variant="outline">Versión {glossary.version}</Badge>
        </div>
        <header className="mt-10 border-b border-[#14251d]/10 pb-8">
          <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[#52705e]"><BookOpen className="size-4" /> Referencia pública</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">{glossary.title}</h1>
          <p className="mt-5 max-w-3xl leading-7 text-[#415c4c]">{glossary.introduction}</p>
        </header>

        <nav aria-label="Índice alfabético del glosario" className="mt-8 rounded-2xl border border-[#14251d]/10 bg-[#f2f0e8]/60 p-4 sm:p-5">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[#52705e]">Índice alfabético</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {letters.map((letter) => (
              <a
                key={letter}
                href={`#letra-${letter}`}
                className="grid size-9 place-items-center rounded-lg border border-[#14251d]/10 bg-[#fffdf6] text-sm font-semibold transition-colors hover:bg-[#d9ff57] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#52705e]/35"
              >
                {letter}
              </a>
            ))}
          </div>
        </nav>

        <div className="mt-12 flex flex-col gap-12">
          {letters.map((letter) => (
            <section key={letter} id={`letra-${letter}`} className="scroll-mt-6">
              <div className="flex items-center gap-4">
                <span className="grid size-12 place-items-center rounded-xl bg-[#14251d] font-mono text-xl font-bold text-[#d9ff57]">{letter}</span>
                <div className="h-px flex-1 bg-[#14251d]/15" />
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-[#52705e]">{termsByLetter[letter].length} conceptos</p>
              </div>

              <dl className="mt-5 divide-y divide-[#14251d]/10 border-y border-[#14251d]/10">
                {termsByLetter[letter].map(({ term, definition }, index) => {
                  const id = slugify(term);

                  return (
                    <div key={term} id={id} className="scroll-mt-6 grid gap-3 py-6 sm:grid-cols-[minmax(12rem,0.45fr)_1fr] sm:gap-8">
                      <dt className="flex items-start gap-3 text-xl font-semibold leading-7 tracking-[-0.02em] sm:text-2xl">
                        <span aria-hidden="true" className="mt-1 font-mono text-[0.65rem] font-normal tracking-normal text-[#52705e]">{String(index + 1).padStart(2, "0")}</span>
                        <a href={`#${id}`} className="underline decoration-[#d9ff57] decoration-4 underline-offset-4 hover:text-[#52705e] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#52705e]/35">{term}</a>
                      </dt>
                      <dd className="max-w-2xl leading-7 text-[#415c4c] sm:text-[1.05rem]">{definition}</dd>
                    </div>
                  );
                })}
              </dl>
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
