"use client";

import Link from "next/link";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { ContentEntry } from "@/lib/content/schema";

type View = "axes" | "classes";

const classContentTypes = new Set<ContentEntry["type"]>(["lectura", "referencia", "actividad"]);

type Group = {
  id: string;
  label: string;
  entries: ContentEntry[];
};

function byCourseOrder(left: ContentEntry, right: ContentEntry) {
  return Number(left.type === "referencia") - Number(right.type === "referencia") || (left.axis ?? 99) - (right.axis ?? 99) || (left.order ?? 99) - (right.order ?? 99) || left.title.localeCompare(right.title);
}

function ContentCard({ entry }: { entry: ContentEntry }) {
  return (
    <Link href={`/contenidos/${entry.id}`} className="rounded-xl focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring">
      <Card className="h-full transition-transform hover:-translate-y-1">
        <CardHeader>
          <CardDescription>{entry.type} · v{entry.version}</CardDescription>
          <CardTitle>{entry.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
          <span>{entry.audience}</span>
          {entry.classes?.length ? <span className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-[#52705e]">Clases {entry.classes.join(", ")}</span> : null}
        </CardContent>
      </Card>
    </Link>
  );
}

function ContentGroups({ groups }: { groups: Group[] }) {
  return (
    <div className="mt-12 flex flex-col gap-12">
      {groups.map((group) => (
        <section key={group.id} id={group.id} aria-labelledby={`${group.id}-title`} className="scroll-mt-6">
          <h2 id={`${group.id}-title`} className="font-mono text-sm uppercase tracking-[0.18em] text-[#52705e]">{group.label}</h2>
          <p className="mt-2 text-sm text-[#52705e]">{group.entries.length} {group.entries.length === 1 ? "material disponible" : "materiales disponibles"}</p>
          {group.entries.length ? (
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.entries.map((entry) => <ContentCard key={`${group.id}-${entry.id}`} entry={entry} />)}
            </div>
          ) : <p className="mt-4 text-sm text-[#52705e]">No hay materiales publicados para esta clase.</p>}
        </section>
      ))}
    </div>
  );
}

export function ContentCatalog({ entries, classNumbers }: { entries: ContentEntry[]; classNumbers: number[] }) {
  const [view, setView] = useState<View>("axes");
  const axes = new Map<number | undefined, ContentEntry[]>();
  const classes = new Map<number, ContentEntry[]>();
  const generalEntries: ContentEntry[] = [];

  for (const entry of entries) {
    axes.set(entry.axis, [...(axes.get(entry.axis) ?? []), entry]);
    if (!classContentTypes.has(entry.type)) continue;

    if (entry.classes?.length) {
      for (const classNumber of entry.classes) classes.set(classNumber, [...(classes.get(classNumber) ?? []), entry]);
    } else {
      generalEntries.push(entry);
    }
  }

  const axisGroups = [...axes.entries()]
    .map(([axis, group]) => ({ id: `axis-${axis ? String(axis).padStart(2, "0") : "general"}`, label: axis ? `Eje ${String(axis).padStart(2, "0")}` : "Recursos generales", entries: group.toSorted(byCourseOrder), axis }))
    .toSorted((left, right) => (left.axis ?? Number.POSITIVE_INFINITY) - (right.axis ?? Number.POSITIVE_INFINITY));
  const classGroups = classNumbers.map((classNumber) => {
    const group = classes.get(classNumber) ?? [];
    return { id: `class-${String(classNumber).padStart(2, "0")}`, label: `Clase ${String(classNumber).padStart(2, "0")}`, entries: group.toSorted(byCourseOrder) };
  });

  if (generalEntries.length) classGroups.push({ id: "class-general", label: "Recursos generales", entries: generalEntries.toSorted(byCourseOrder) });

  const groups = view === "axes" ? axisGroups : classGroups;
  const label = view === "axes" ? "los ejes" : "las clases";

  return (
    <>
      <Link href="/" className="font-mono text-xs uppercase tracking-[0.2em] text-[#52705e]">PIAPC / Inicio</Link>
      <header className="mt-8 max-w-3xl">
        <Badge variant="outline">Recorrido academico</Badge>
        <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em] sm:text-6xl">Contenidos de la materia</h1>
        <p className="mt-5 text-lg leading-8 text-[#52705e]">Materiales vigentes organizados para recorrer la cursada.</p>
      </header>
      <div role="group" aria-label="Vista del catalogo" className="mt-8 inline-flex rounded-xl border border-[#14251d]/10 bg-[#fffdf6]/60 p-1">
        <button type="button" aria-pressed={view === "axes"} onClick={() => setView("axes")} className="rounded-lg px-3 py-2 font-mono text-xs font-semibold uppercase tracking-[0.12em] transition-colors aria-pressed:bg-[#14251d] aria-pressed:text-[#fffdf6] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#52705e]/35">Por eje</button>
        <button type="button" aria-pressed={view === "classes"} onClick={() => setView("classes")} className="rounded-lg px-3 py-2 font-mono text-xs font-semibold uppercase tracking-[0.12em] transition-colors aria-pressed:bg-[#14251d] aria-pressed:text-[#fffdf6] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#52705e]/35">Por clase</button>
      </div>
      <nav aria-label={`Acceso directo a ${label}`} className="mt-4 rounded-2xl border border-[#14251d]/10 bg-[#fffdf6]/60 p-4 sm:p-5">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[#52705e]">Ir a {view === "axes" ? "un eje" : "una clase"}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {groups.filter((group) => group.id !== "axis-general" && group.id !== "class-general").map((group) => (
            <Link key={group.id} href={`#${group.id}`} className="rounded-lg border border-[#14251d]/10 bg-[#fffdf6] px-3 py-2 font-mono text-xs font-semibold uppercase tracking-[0.12em] transition-colors hover:bg-[#d9ff57] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#52705e]/35">{group.label}</Link>
          ))}
        </div>
      </nav>
      <ContentGroups groups={groups} />
    </>
  );
}
