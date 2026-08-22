import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { ActivityDeliveries } from "@/app/profile/_components/activity-deliveries";
import { buttonVariants } from "@/components/ui/button";
import { getContent } from "@/lib/content/server";
import { requireCompleteProfile } from "@/lib/profiles/server";

type Props = { params: Promise<{ activityId: string }> };

export const dynamic = "force-dynamic";

export default async function ActivityDeliveriesPage({ params }: Props) {
  const [{ activityId }, profile] = await Promise.all([params, requireCompleteProfile()]);
  if (!profile.is_responsible || profile.role !== "professor") redirect("/dashboard");

  const activity = await getContent(activityId);
  if (!activity || activity.entry.type !== "actividad") notFound();

  return <main className="min-h-svh bg-muted/40 p-4 sm:p-8"><div className="mx-auto flex max-w-4xl flex-col gap-6"><header className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-sm text-muted-foreground">Entregas por actividad</p><h1 className="text-3xl font-semibold tracking-tight">{activity.entry.title}</h1></div><Link href="/dashboard/entregas" className={buttonVariants({ variant: "outline" })}>Volver a actividades</Link></header><ActivityDeliveries activityId={activity.entry.id} activityTitle={activity.entry.title} /></div></main>;
}
