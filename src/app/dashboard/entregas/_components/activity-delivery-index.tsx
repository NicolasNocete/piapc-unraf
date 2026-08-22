import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { listContent } from "@/lib/content/server";
import { requireCompleteProfile } from "@/lib/profiles/server";
import { createClient } from "@/lib/supabase/server";

type Submission = { activity_id: string; activity_feedback_versions: { id: string }[] };

export async function ActivityDeliveryIndex() {
  const profile = await requireCompleteProfile();
  if (!profile.is_responsible || profile.role !== "professor") return null;

  const supabase = await createClient();
  const db = supabase as never as {
    from: (table: string) => {
      select: (columns: string) => Promise<{ data: Submission[] | null }>;
    };
  };
  const [entries, { data }] = await Promise.all([
    listContent(),
    db.from("activity_submissions").select("activity_id, activity_feedback_versions(id)"),
  ]);
  const submissionsByActivity = new Map<string, Submission[]>();
  for (const submission of data ?? []) {
    const submissions = submissionsByActivity.get(submission.activity_id) ?? [];
    submissions.push(submission);
    submissionsByActivity.set(submission.activity_id, submissions);
  }
  const activities = entries.filter((entry) => entry.type === "actividad");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Actividades</CardTitle>
        <CardDescription>Elegi una actividad para consultar su historial completo de entregas.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {activities.length ? activities.map((activity) => {
          const submissions = submissionsByActivity.get(activity.id) ?? [];
          const pending = submissions.filter((submission) => submission.activity_feedback_versions.length === 0).length;
          const reviewed = submissions.length - pending;
          return (
            <Link key={activity.id} href={`/dashboard/entregas/${activity.id}`} className="flex flex-wrap items-center justify-between gap-4 rounded-lg border p-4 transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
              <div>
                <p className="font-medium">{activity.title}</p>
                <p className="text-sm text-muted-foreground">{submissions.length} {submissions.length === 1 ? "entrega" : "entregas"}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{pending} pendientes</Badge>
                <Badge variant="secondary">{reviewed} revisadas</Badge>
              </div>
            </Link>
          );
        }) : (
          <Empty>
            <EmptyHeader>
              <EmptyTitle>No hay actividades publicadas</EmptyTitle>
              <EmptyDescription>Las actividades de la materia apareceran aca.</EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}
      </CardContent>
    </Card>
  );
}
