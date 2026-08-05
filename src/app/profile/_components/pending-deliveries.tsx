import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { createClient } from "@/lib/supabase/server";
import { DeliveryDetailDialog } from "./delivery-detail-dialog";

type Submission = { id: string; activity_id: string; updated_at: string; activity_feedback_versions: { id: string }[]; activity_submission_versions: { body: string; submitted_at: string; version_number: number }[]; profiles: { first_name: string | null; last_name: string | null } | null };

export async function PendingDeliveries() {
  const supabase = await createClient();
  const db = supabase as never as { from: (table: string) => { select: (columns: string) => { order: (column: string, options: { ascending: boolean }) => Promise<{ data: Submission[] | null }> } } };
  const { data } = await db.from("activity_submissions").select("id, activity_id, updated_at, profiles(first_name, last_name), activity_feedback_versions(id), activity_submission_versions(body, submitted_at, version_number)").order("updated_at", { ascending: false });
  const pending = (data ?? []).filter((submission) => submission.activity_feedback_versions.length === 0);
  return <Card><CardHeader><CardTitle>Entregas pendientes de devolucion</CardTitle><CardDescription>Solo se muestran entregas sin una devolucion publicada.</CardDescription></CardHeader><CardContent className="flex flex-col gap-4">{pending.length ? pending.map((submission) => { const studentName = [submission.profiles?.first_name, submission.profiles?.last_name].filter(Boolean).join(" ") || "Alumno"; return <section key={submission.id} className="rounded-lg border p-4"><p className="font-medium">{submission.activity_id}</p><p className="text-sm text-muted-foreground">{studentName} - Recibida: {new Date(submission.updated_at).toLocaleString("es-AR")}</p><div className="mt-4"><DeliveryDetailDialog submissionId={submission.id} activityId={submission.activity_id} studentName={studentName} versions={submission.activity_submission_versions.toSorted((left, right) => right.version_number - left.version_number)} /></div></section>; }) : <Empty><EmptyHeader><EmptyTitle>No hay entregas pendientes</EmptyTitle><EmptyDescription>Todas las entregas recibidas tienen una devolucion publicada.</EmptyDescription></EmptyHeader></Empty>}</CardContent></Card>;
}
