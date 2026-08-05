import { ArrowLeft, CalendarDays } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { program, schedule } from "@/content/generated/academic-content";
import { createClient } from "@/lib/supabase/server";

async function requireDashboardAccess() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims?.sub) {
    redirect("/");
  }
}

export default async function SchedulePage() {
  await requireDashboardAccess();

  return (
    <main className="min-h-svh bg-[#f2f0e8] px-4 py-6 text-[#14251d] sm:px-8 sm:py-10">
      <article className="mx-auto max-w-[90rem] rounded-[2rem] border border-[#14251d]/10 bg-[#fffdf6] p-6 sm:p-10">
        <Link href="/dashboard" className={buttonVariants({ variant: "ghost", size: "sm" })}>
          <ArrowLeft data-icon="inline-start" /> Dashboard
        </Link>
        <div className="mt-10 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[#52705e]"><CalendarDays className="size-4" /> Organización de la cursada</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">Cronograma {program.year}</h1>
          </div>
          <Badge variant="outline">14 encuentros</Badge>
        </div>
        <p className="mt-6 max-w-4xl leading-7 text-[#415c4c]">{schedule.introduction}</p>

        <div className="mt-8 rounded-xl border border-[#14251d]/10">
          <Table>
            <TableHeader>
              <TableRow>
                {schedule.headers.map((header) => <TableHead key={header}>{header}</TableHead>)}
              </TableRow>
            </TableHeader>
            <TableBody>
              {schedule.rows.map((row) => (
                <TableRow key={row["N.º de clase"]}>
                  {schedule.headers.map((header) => <TableCell key={header} className="whitespace-normal align-top leading-6">{row[header]}</TableCell>)}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </article>
    </main>
  );
}
