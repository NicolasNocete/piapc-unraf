import { ArrowLeft, BadgeCheck, CalendarDays, FileText } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { program } from "@/content/generated/academic-content";
import { createClient } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";

async function requireDashboardAccess() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims?.sub) {
    redirect("/");
  }
}

function ProgramText({ markdown }: { markdown: string }) {
  return markdown.split(/\n{2,}/).map((block) => {
    if (block.startsWith("# ")) {
      return (
        <h1 key={block} className="text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">
          {block.slice(2)}
        </h1>
      );
    }

    if (block.startsWith("## ")) {
      return (
        <h2 key={block} className="scroll-mt-8 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
          {block.slice(3)}
        </h2>
      );
    }

    if (block.startsWith("### ")) {
      return <h3 key={block} className="text-xl font-semibold">{block.slice(4)}</h3>;
    }

    if (block.startsWith("|")) {
      return <pre key={block} className="overflow-x-auto rounded-xl bg-[#f2f0e8] p-4 font-mono text-xs leading-6 text-[#415c4c]">{block}</pre>;
    }

    if (block.startsWith("- ")) {
      return <ul key={block} className="list-disc space-y-2 pl-5 leading-7 text-[#415c4c]">{block.split("\n").map((line) => <li key={line}>{line.slice(2)}</li>)}</ul>;
    }

    return <p key={block} className="leading-7 text-[#415c4c]">{block}</p>;
  });
}

export default async function ProgramPage() {
  await requireDashboardAccess();

  return (
    <main className="min-h-svh bg-[#f2f0e8] px-4 py-6 text-[#14251d] sm:px-8 sm:py-10">
      <article className="mx-auto max-w-5xl rounded-[2rem] border border-[#14251d]/10 bg-[#fffdf6] p-6 sm:p-10 lg:p-14">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link href="/dashboard" className={buttonVariants({ variant: "ghost", size: "sm" })}>
            <ArrowLeft data-icon="inline-start" /> Dashboard
          </Link>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline"><BadgeCheck data-icon="inline-start" /> Aprobado</Badge>
            <Badge variant="outline">Ciclo {program.year}</Badge>
            <Badge variant="outline">Versión {program.version}</Badge>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-5 border-b border-[#14251d]/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[#52705e]"><FileText className="size-4" /> Documento académico vigente</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">{program.title}</h1>
          </div>
          <Link href="/dashboard/cronograma" className={cn(buttonVariants({ variant: "outline" }), "w-fit")}>
            Ver cronograma <CalendarDays data-icon="inline-end" />
          </Link>
        </div>

        <div className="mt-10 flex flex-col gap-6">
          <ProgramText markdown={program.markdown} />
        </div>
      </article>
    </main>
  );
}
