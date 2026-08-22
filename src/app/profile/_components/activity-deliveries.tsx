import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { requireCompleteProfile } from "@/lib/profiles/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { DeliveryDetailDialog } from "./delivery-detail-dialog";

type Submission = {
  id: string;
  updated_at: string;
  profiles: { first_name: string | null; last_name: string | null } | null;
  activity_feedback_versions: { id: string }[];
  activity_submission_versions: { body: string; submitted_at: string; version_number: number }[];
};
type Feedback = { grade: number | null; published_at: string; revision_number: number; submission_id: string };

type Props = { activityId: string; activityTitle: string };

export async function ActivityDeliveries({ activityId, activityTitle }: Props) {
  const profile = await requireCompleteProfile();
  if (!profile.is_responsible || profile.role !== "professor") return null;

  const supabase = await createClient();
  const db = supabase as never as {
    from: (table: string) => {
      select: (columns: string) => {
        eq: (column: string, value: string) => {
          order: (column: string, options: { ascending: boolean }) => Promise<{ data: Submission[] | null }>;
        };
      };
    };
  };
  const [{ data }, { data: feedbackData, error: feedbackError }] = await Promise.all([
    db.from("activity_submissions").select("id, updated_at, profiles(first_name, last_name), activity_feedback_versions(id), activity_submission_versions(body, submitted_at, version_number)").eq("activity_id", activityId).order("updated_at", { ascending: false }),
    createAdminClient().from("activity_feedback_versions").select("submission_id, revision_number, grade, published_at"),
  ]);
  if (feedbackError) throw new Error("No se pudieron consultar las notas.");

  const latestFeedback = new Map<string, Feedback>();
  for (const feedback of feedbackData ?? []) {
    const current = latestFeedback.get(feedback.submission_id);
    if (!current || feedback.revision_number > current.revision_number) latestFeedback.set(feedback.submission_id, feedback);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{activityTitle}</CardTitle>
        <CardDescription>Historial completo de entregas de esta actividad.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {data?.length ? data.map((submission) => {
          const studentName = [submission.profiles?.first_name, submission.profiles?.last_name].filter(Boolean).join(" ") || "Alumno";
          const feedback = latestFeedback.get(submission.id);
          return (
            <section key={submission.id} className="flex flex-wrap items-center justify-between gap-4 rounded-lg border p-4">
              <div className="flex flex-col gap-1">
                <p className="font-medium">{studentName}</p>
                <p className="text-sm text-muted-foreground">Ultima entrega: {new Date(submission.updated_at).toLocaleString("es-AR")}</p>
                <Badge variant={feedback ? "secondary" : "outline"}>{feedback ? `Revisada${feedback.grade ? ` - Nota ${feedback.grade}` : ""}` : "Pendiente de devolucion"}</Badge>
              </div>
              <DeliveryDetailDialog submissionId={submission.id} activityId={activityId} studentName={studentName} versions={submission.activity_submission_versions.toSorted((left, right) => right.version_number - left.version_number)} feedback={feedback} />
            </section>
          );
        }) : (
          <Empty>
            <EmptyHeader>
              <EmptyTitle>No hay entregas para esta actividad</EmptyTitle>
              <EmptyDescription>Las entregas recibidas apareceran en este historial.</EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}
      </CardContent>
    </Card>
  );
}
