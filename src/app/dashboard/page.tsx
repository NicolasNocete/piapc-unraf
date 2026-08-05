import {
  ArrowLeft,
  ArrowRight,
  Bot,
  BookOpen,
  CalendarDays,
  CircleDot,
  ExternalLink,
  FileText,
  GraduationCap,
  LogOut,
  MapPin,
  Network,
  Sparkles,
  University,
  BookMarked,
  ClipboardCheck,
  ListTodo,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { signOut } from "@/app/auth/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { requireCompleteProfile } from "@/lib/profiles/server";
import { getUpcomingActions } from "@/lib/upcoming-actions/server";
import { cn } from "@/lib/utils";

const quickLinks = [
  { href: "/contenidos", icon: BookOpen, label: "Ejes", number: "01", available: true },
  { href: "/dashboard/programa", icon: FileText, label: "Programa", number: "02", available: true },
  { href: "/dashboard/cronograma", icon: CalendarDays, label: "Cronograma", number: "03", available: true },
  { href: "/glosario", icon: BookMarked, label: "Glosario", number: "04", available: true },
];

export default async function DashboardPage() {
  const profile = await requireCompleteProfile();
  const upcomingActions = await getUpcomingActions();
  const displayName = `${profile.first_name} ${profile.last_name}`;
  const avatarUrl = profile.avatar_url ?? undefined;
  const firstName = profile.first_name;
  const dashboardLinks = profile.is_responsible
    ? [...quickLinks, { href: "/dashboard/entregas", icon: ClipboardCheck, label: "Entregas", number: "05", available: true }]
    : quickLinks;

  return (
    <main className="ai-grid relative min-h-svh overflow-hidden bg-[#f2f0e8] px-4 py-4 text-[#14251d] sm:px-8 sm:py-6 lg:px-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_4%,rgba(217,255,87,0.36),transparent_22%),linear-gradient(to_bottom,rgba(242,240,232,0.12),#f2f0e8_96%)]" />

      <div className="ai-panel relative mx-auto max-w-7xl overflow-hidden rounded-[1.5rem] border border-[#14251d]/15 bg-[#fffdf6]/95 sm:rounded-[2rem]">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#14251d]/10 px-5 py-4 sm:px-8 lg:px-10">
          <Link href="/" className="flex items-center gap-3 font-semibold tracking-tight">
            <span className="relative grid size-9 place-items-center rounded-full bg-[#14251d] font-mono text-xs font-black text-[#d9ff57]">
              AI
              <span className="ai-pulse absolute right-0 top-0 size-2 rounded-full bg-[#d9ff57] ring-2 ring-[#fffdf6]" />
            </span>
            PIAPC
          </Link>

          <div className="flex items-center gap-2">
            <Link href="/" className={buttonVariants({ variant: "ghost", size: "sm" })}>
              <ArrowLeft data-icon="inline-start" /> Inicio
            </Link>
            <Link href="/profile" className={buttonVariants({ variant: "ghost", size: "sm" })}>
              Perfil
            </Link>
            <form action={signOut}>
              <Button type="submit" variant="outline" size="sm">
                <LogOut data-icon="inline-start" /> Salir
              </Button>
            </form>
          </div>
        </header>

        <div className="px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          <section aria-labelledby="course-title" className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <Badge variant="outline" className="mb-5 font-mono uppercase tracking-[0.16em]">
                <Sparkles data-icon="inline-start" /> Espacio de cátedra
              </Badge>
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#52705e]">
                Hola, {firstName}
              </p>
              <h1 id="course-title" className="mt-3 max-w-5xl text-4xl font-semibold leading-[0.96] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
                Programación de Inteligencia Artificial
                <span className="block italic text-[#52705e]">y Patrones de Comportamiento</span>
              </h1>
            </div>

            <Avatar className="size-14 border-2 border-[#d9ff57] shadow-[0_0_0_5px_rgba(217,255,87,0.18)] sm:size-16">
              <AvatarImage src={avatarUrl} alt={displayName} />
              <AvatarFallback>{displayName.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          </section>

          <section aria-labelledby="intro-title" className="ai-grid-dark relative mt-10 overflow-hidden rounded-[1.75rem] bg-[#14251d] text-[#f8f5e9]">
            <div className="ai-scanline pointer-events-none absolute inset-x-0 top-0 h-20" />
            <div className="relative grid gap-10 p-7 sm:p-10 lg:grid-cols-[1.15fr_0.85fr] lg:p-14">
              <div>
                <p className="flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[#d9ff57]">
                  <CircleDot className="size-3.5" /> Introducción / 01
                </p>
                <h2 id="intro-title" className="mt-6 max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">
                  Inteligencia que observa, decide y actúa dentro del juego.
                </h2>
                <p className="mt-6 max-w-2xl text-base leading-7 text-[#b7c3b9] sm:text-lg sm:leading-8">
                  Una introducción al diseño y programación de inteligencia artificial para videojuegos, con foco inicial en agentes y máquinas de estados para modelar comportamientos.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <article className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] p-6">
                  <div className="ai-dot-matrix pointer-events-none absolute inset-y-0 right-0 w-24 opacity-20" />
                  <Bot className="size-6 text-[#d9ff57]" />
                  <h3 className="mt-8 text-2xl font-semibold">Agentes</h3>
                  <p className="mt-2 leading-7 text-[#9eaea1]">Entidades capaces de percibir su entorno y elegir cómo responder.</p>
                </article>
                <article className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] p-6">
                  <div className="ai-dot-matrix pointer-events-none absolute inset-y-0 right-0 w-24 opacity-20" />
                  <Network className="size-6 text-[#d9ff57]" />
                  <h3 className="mt-8 text-2xl font-semibold">Máquinas de estados</h3>
                  <p className="mt-2 leading-7 text-[#9eaea1]">Reglas y transiciones para construir conductas claras y controlables.</p>
                </article>
              </div>
            </div>
          </section>

          <section aria-labelledby="upcoming-actions-title" className="mt-5 overflow-hidden rounded-[1.75rem] border border-[#14251d]/10 bg-[#d9ff57] p-7 sm:p-9">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div>
                <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[#415c4c]">
                  <ListTodo className="size-4" /> Cursada en curso
                </p>
                <h2 id="upcoming-actions-title" className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">Próximas acciones</h2>
                <p className="mt-4 max-w-3xl leading-7 text-[#415c4c]">{upcomingActions.summary}</p>
              </div>
              <p className="flex items-center gap-2 rounded-full border border-[#14251d]/15 bg-[#fffdf6]/70 px-4 py-2 text-sm font-medium text-[#415c4c]">
                <CalendarDays className="size-4" /> {upcomingActions.deadline}
              </p>
            </div>

            <ol className="mt-7 grid gap-3 sm:grid-cols-2">
              {upcomingActions.actions.map((action, index) => (
                <li key={action.href}>
                  <Link href={action.href} className="group flex min-h-24 items-center gap-4 rounded-2xl border border-[#14251d]/15 bg-[#fffdf6]/75 p-5 transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#52705e]/35">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#14251d] font-mono text-xs font-bold text-[#d9ff57]">{String(index + 1).padStart(2, "0")}</span>
                    <span className="font-semibold">{action.title}<ArrowRight className="ml-2 inline size-4 transition-transform group-hover:translate-x-1" /></span>
                  </Link>
                </li>
              ))}
            </ol>

            <p className="mt-5 max-w-3xl text-sm leading-6 text-[#415c4c]">{upcomingActions.note}</p>
          </section>

          <nav aria-label="Accesos rápidos de la materia" className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {dashboardLinks.map(({ href, icon: Icon, label, number, available }) => {
              const content = (
                <>
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#14251d] text-[#d9ff57]">
                    <Icon className="size-5" />
                  </span>
                  <span>
                    <span className="block font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[#7b8b81]">{available ? `Acceso ${number}` : "Próximamente"}</span>
                    <span className="mt-1 flex items-center gap-2 font-semibold">{label} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span>
                  </span>
                </>
              );

              return available ? (
                <Link key={href} href={href} className="group flex min-h-24 items-center gap-4 rounded-2xl border border-[#14251d]/10 bg-[#f2f0e8]/65 p-5 transition-colors hover:bg-[#e7e4da] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#52705e]/35">
                  {content}
                </Link>
              ) : (
                <span key={href} aria-disabled="true" className="group flex min-h-24 items-center gap-4 rounded-2xl border border-[#14251d]/10 bg-[#f2f0e8]/65 p-5 opacity-65">
                  {content}
                </span>
              );
            })}
          </nav>

          <Separator className="my-12 bg-[#14251d]/10" />

          <section aria-label="Cátedra e institución" className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
            <article className="relative overflow-hidden rounded-[1.75rem] border border-[#14251d]/10 bg-[#d9ff57] p-7 sm:p-9">
              <div className="absolute -bottom-24 -right-20 size-72 rounded-full border-[3rem] border-[#14251d]/10" />
              <p className="relative flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em]">
                <GraduationCap className="size-4" /> Profesor a cargo
              </p>
              <div className="relative mt-24 sm:mt-32">
                <p className="text-sm text-[#415c4c]">Acompañamiento y revisión académica</p>
                <h2 className="mt-3 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">Nicolás Nocete</h2>
              </div>
            </article>

            <article className="rounded-[1.75rem] border border-[#14251d]/10 bg-[#f2f0e8]/55 p-7 sm:p-9">
              <div className="flex flex-wrap items-start justify-between gap-6">
                <div>
                  <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[#52705e]">
                    <University className="size-4" /> Universidad pública
                  </p>
                  <h2 className="mt-5 max-w-xl text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-4xl">Universidad Nacional de Rafaela</h2>
                </div>
                <div className="rounded-xl border border-[#14251d]/10 bg-white px-4 py-3">
                  <Image src="/unraf-logo.png" alt="Logo oficial de la Universidad Nacional de Rafaela" width={270} height={34} className="h-auto w-44 sm:w-52" />
                </div>
              </div>

              <div className="mt-8 grid gap-5 border-t border-[#14251d]/10 pt-7 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-semibold">Facultad</p>
                  <p className="mt-2 leading-7 text-[#53705f]">Tecnologías e Innovación para el Desarrollo</p>
                </div>
                <div>
                  <p className="text-sm font-semibold">Carrera</p>
                  <p className="mt-2 leading-7 text-[#53705f]">Licenciatura en Producción de Videojuegos y Entretenimiento Digital</p>
                </div>
              </div>

              <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
                <p className="flex items-center gap-2 text-sm text-[#53705f]"><MapPin className="size-4" /> Rafaela, Santa Fe</p>
                <a href="https://www.unraf.edu.ar/" target="_blank" rel="noreferrer" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full")}>
                  Sitio oficial <ExternalLink data-icon="inline-end" />
                </a>
              </div>
            </article>
          </section>

        </div>
      </div>
    </main>
  );
}
