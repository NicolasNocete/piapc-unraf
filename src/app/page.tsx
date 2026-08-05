import {
  Activity,
  ArrowRight,
  Bot,
  BrainCircuit,
  CircleDot,
  Cpu,
  ExternalLink,
  Gamepad2,
  GraduationCap,
  Network,
  ShieldCheck,
  Sparkles,
  Terminal,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { signInWithGoogle } from "@/app/auth/actions";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type HomeProps = {
  searchParams: Promise<{ authError?: string }>;
};

const focusAreas = [
  {
    icon: BrainCircuit,
    number: "01",
    title: "Inteligencia artificial",
    text: "Fundamentos para comprender cómo operan los sistemas utilizados y reconocer sus límites.",
  },
  {
    icon: Gamepad2,
    number: "02",
    title: "Videojuegos",
    text: "Aplicación sobre experiencias interactivas y patrones de comportamiento controlables.",
  },
  {
    icon: ShieldCheck,
    number: "03",
    title: "Desarrollo responsable",
    text: "Procesos verificables, seguros y trazables, siempre acompañados por supervisión humana.",
  },
];

export default async function Home({ searchParams }: HomeProps) {
  const { authError } = await searchParams;

  return (
    <main className="overflow-hidden bg-[#f2f0e8] text-[#14251d]">
      <section className="ai-grid relative min-h-svh px-5 pb-12 pt-5 sm:px-8 sm:pt-8 lg:px-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_30%,rgba(217,255,87,0.3),transparent_27%),linear-gradient(to_bottom,rgba(242,240,232,0.28),#f2f0e8_92%)]" />
        <div className="pointer-events-none absolute -right-32 top-16 size-[32rem] rounded-full border border-[#14251d]/10" />
        <div className="ai-orbit pointer-events-none absolute -right-16 top-32 size-[23rem] rounded-full border border-dashed border-[#14251d]/15">
          <span className="absolute left-1/2 top-0 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d9ff57] ring-4 ring-[#14251d]" />
        </div>

        <nav className="ai-panel relative z-10 mx-auto flex max-w-7xl items-center justify-between rounded-full border border-[#14251d]/15 bg-[#fffdf6]/85 px-4 py-3 backdrop-blur-xl sm:px-5">
          <Link href="/" className="flex items-center gap-3" aria-label="PIAPC, inicio">
              <span className="relative grid size-10 place-items-center rounded-full bg-[#14251d] font-mono text-xs font-bold text-[#d9ff57]">
                AI
                <span className="ai-pulse absolute right-0 top-0 size-2 rounded-full bg-[#d9ff57] ring-2 ring-[#fffdf6]" />
              </span>
            <span className="hidden text-sm font-semibold tracking-tight sm:inline">
              PIAPC <span className="font-normal text-[#53705f]">/ UNRaf</span>
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="mr-2 hidden items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[#52705e] md:flex">
              <span className="ai-pulse size-1.5 rounded-full bg-[#38a169]" /> Sistema activo
            </span>
            <Link
              href="/dashboard"
              className={cn(buttonVariants({ variant: "ghost" }), "hidden sm:inline-flex")}
            >
              Acceso
            </Link>
            <form action={signInWithGoogle}>
              <Button type="submit" className="h-10 rounded-full px-5">
                Ingresar <ArrowRight />
              </Button>
            </form>
          </div>
        </nav>

        <div className="relative z-10 mx-auto grid max-w-7xl gap-12 pb-8 pt-16 lg:grid-cols-[1.18fr_0.82fr] lg:items-end lg:pt-24">
          <div>
            <Badge className="mb-7 rounded-full border-[#14251d]/15 bg-[#fffdf6]/55 px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-[#415c4c] backdrop-blur">
              <Sparkles className="text-[#52705e]" /> Lic. en Producción de Videojuegos
            </Badge>
            <h1 className="max-w-5xl text-[clamp(3.35rem,8.6vw,8rem)] font-semibold leading-[0.86] tracking-[-0.075em]">
              Inteligencia
              <span className="block pl-[0.38em] italic text-[#52705e]">que juega,</span>
              <span className="relative inline-block">
                código que piensa.
                <span className="ai-pulse absolute -right-5 top-0 size-3 rounded-full bg-[#d9ff57] ring-4 ring-[#14251d]/10 sm:-right-8 sm:size-5" />
              </span>
            </h1>
          </div>

          <div className="lg:pb-3">
            <p className="max-w-xl text-lg leading-8 text-[#415c4c] sm:text-xl">
              Programación de Inteligencia Artificial y Patrones de Comportamiento.
              Una cátedra sobre desarrollo agéntico, videojuegos y sistemas que pueden
              ser comprendidos, evaluados y controlados.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <form action={signInWithGoogle}>
                <Button type="submit" className="h-12 rounded-full bg-[#d9ff57] px-6 text-[#14251d] hover:bg-[#c9ef48]">
                  Continuar con Google <ArrowRight />
                </Button>
              </form>
              <a
                href="#catedra"
                className={cn(buttonVariants({ variant: "outline" }), "h-12 rounded-full px-6")}
              >
                Conocer la cátedra
              </a>
            </div>
            {authError ? (
              <p className="mt-4 text-sm font-medium text-red-700" role="alert">
                No fue posible completar el acceso. Revisá la configuración de Google y
                Supabase e intentá nuevamente.
              </p>
            ) : null}

            <div className="ai-panel relative mt-10 overflow-hidden rounded-2xl border border-[#14251d]/15 bg-[#14251d] p-1 text-[#f8f5e9]">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[#9eaea1]">
                <span className="flex items-center gap-2"><Terminal className="size-3.5 text-[#d9ff57]" /> Agent runtime</span>
                <span>PIAPC_01</span>
              </div>
              <div className="relative space-y-3 overflow-hidden px-4 py-5 font-mono text-xs">
                <div className="ai-scanline pointer-events-none absolute inset-x-0 top-0 h-16" />
                <p><span className="text-[#d9ff57]">01</span> Analizar entorno <span className="float-right text-[#79a88b]">completo</span></p>
                <p><span className="text-[#d9ff57]">02</span> Definir comportamiento <span className="float-right text-[#79a88b]">activo</span></p>
                <p className="text-[#b7c3b9]"><span className="text-[#d9ff57]">03</span> Verificar con supervisión humana<span className="ml-1 inline-block text-[#d9ff57] motion-safe:animate-pulse">_</span></p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 mx-auto mt-10 flex max-w-7xl items-center gap-4 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[#53705f]">
          <span className="flex items-center gap-2"><Cpu className="size-3.5" /> IA</span><Separator className="max-w-20 bg-[#14251d]/20" /><span>Agentes</span>
          <Separator className="max-w-20 bg-[#14251d]/20" /><span>Comportamiento</span>
        </div>
      </section>

      <section id="catedra" className="ai-grid-dark relative bg-[#14251d] px-5 py-20 text-[#f8f5e9] sm:px-8 lg:px-12 lg:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_55%,rgba(217,255,87,0.1),transparent_25%),linear-gradient(to_bottom,rgba(20,37,29,0.55),#14251d)]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr]">
            <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-[#d9ff57]">
              <Network className="size-4" /> La propuesta
            </p>
            <div>
              <h2 className="max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.045em] sm:text-6xl">
                Colaboración estructurada entre personas y agentes de inteligencia artificial.
              </h2>
              <p className="mt-8 max-w-3xl text-lg leading-8 text-[#b7c3b9]">
                PIAPC integra fundamentos de inteligencia artificial, modelos de lenguaje,
                ingeniería de software y técnicas de comportamiento para desarrollar proyectos
                de videojuegos y experiencias interactivas de manera verificable y responsable.
              </p>
            </div>
          </div>

          <div className="relative mt-16 grid gap-px overflow-hidden rounded-3xl border border-white/15 bg-white/15 md:grid-cols-3">
            {focusAreas.map(({ icon: Icon, number, title, text }) => (
              <article key={number} className="group relative bg-[#14251d]/95 p-8 transition-colors hover:bg-[#1b3026] sm:p-10">
                <div className="ai-dot-matrix pointer-events-none absolute right-0 top-0 size-24 opacity-20 transition-opacity group-hover:opacity-50" />
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-xl border border-[#d9ff57]/25 bg-[#d9ff57]/10"><Icon className="size-5 text-[#d9ff57]" /></span>
                  <span className="font-mono text-xs text-[#7e9183]">NODE_{number}</span>
                </div>
                <h3 className="mt-12 text-2xl font-semibold tracking-tight">{title}</h3>
                <p className="mt-3 leading-7 text-[#9eaea1]">{text}</p>
                <div className="mt-8 flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[#79a88b]">
                  <CircleDot className="size-3 text-[#d9ff57]" /> Módulo conectado
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-[#fffdf6] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="ai-dot-matrix pointer-events-none absolute inset-y-0 right-0 w-1/3 opacity-20 [mask-image:linear-gradient(to_left,black,transparent)]" />
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:gap-24">
          <div className="ai-panel relative min-h-[40rem] overflow-hidden rounded-[2rem] border border-[#14251d]/10 bg-[#d9ff57] p-8 sm:p-12">
            <div className="absolute -bottom-32 -right-24 size-[28rem] rounded-full border-[5rem] border-[#14251d]/10" />
            <p className="relative flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em]"><Bot className="size-4" /> Supervisión humana</p>
            <Image
              src="/nicolas-nocete.jpg"
              alt="Nicolás Nocete"
              width={460}
              height={460}
              className="absolute right-6 top-24 size-64 rounded-full object-cover grayscale sm:right-8 sm:size-80"
            />
            <div className="absolute bottom-8 left-8 z-10 max-w-[13rem] sm:bottom-12 sm:left-12 sm:max-w-xs">
              <h2 className="text-4xl font-semibold leading-none tracking-[-0.05em] sm:text-5xl">
                Nicolás Nocete
              </h2>
              <p className="mt-3 font-medium">Profesor adjunto</p>
              <a
                href="https://www.linkedin.com/in/nicolasnocete/"
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-4"
              >
                Perfil profesional <ExternalLink className="size-4" />
              </a>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <span className="grid size-14 place-items-center rounded-2xl border border-[#14251d]/15 bg-[#f2f0e8]"><GraduationCap className="size-7 text-[#52705e]" /></span>
            <p className="mt-8 font-mono text-xs uppercase tracking-[0.22em] text-[#52705e]">
              Universidad pública
            </p>
            <h2 className="mt-4 text-5xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl">
              Universidad Nacional de Rafaela
            </h2>
            <p className="mt-7 max-w-xl text-lg leading-8 text-[#53705f]">
              Facultad de Tecnologías e Innovación para el Desarrollo. Licenciatura en
              Producción de Videojuegos y Entretenimiento Digital.
            </p>
            <a
              href="https://www.unraf.edu.ar/"
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "outline" }), "mt-8 h-12 w-fit rounded-full px-6")}
            >
              Visitar UNRaf <ExternalLink />
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-[#fffdf6] px-5 pb-6 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 rounded-[1.5rem] bg-[#e7e4da] px-6 py-6 text-sm text-[#52705e] sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2"><Activity className="size-4" /> PIAPC · Universidad Nacional de Rafaela</p>
          <div className="flex gap-5">
            <a href="https://www.unraf.edu.ar/" target="_blank" rel="noreferrer" className="hover:text-[#14251d]">UNRaf</a>
            <a href="https://www.linkedin.com/in/nicolasnocete/" target="_blank" rel="noreferrer" className="hover:text-[#14251d]">Docente</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
