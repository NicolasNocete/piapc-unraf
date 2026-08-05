import Link from "next/link";
import { redirect } from "next/navigation";

import { PendingDeliveries } from "@/app/profile/_components/pending-deliveries";
import { buttonVariants } from "@/components/ui/button";
import { requireCompleteProfile } from "@/lib/profiles/server";

export default async function DashboardDeliveriesPage() {
  const profile = await requireCompleteProfile();
  if (!profile.is_responsible) redirect("/dashboard");

  return <main className="min-h-svh bg-muted/40 p-4 sm:p-8"><div className="mx-auto flex max-w-4xl flex-col gap-6"><header className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-sm text-muted-foreground">Espacio de catedra</p><h1 className="text-3xl font-semibold tracking-tight">Entregas</h1></div><Link href="/dashboard" className={buttonVariants({ variant: "outline" })}>Volver al dashboard</Link></header><PendingDeliveries /></div></main>;
}
