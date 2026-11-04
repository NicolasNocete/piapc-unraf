import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FeedbackMarkdown } from "@/components/feedback-markdown";
import { formatArgentinaDateTime } from "@/lib/date-time";
import { createClient } from "@/lib/supabase/server";
import { getVerifiedUserId } from "@/lib/profiles/server";
import { DeliveryForm } from "./delivery-form";

export async function DeliverySection({ activityId }: { activityId: string }) {
  const userId = await getVerifiedUserId();
  const supabase = await createClient();
  const db = supabase as never as {
    from: (table: string) => { select: (columns: string) => { eq: (column: string, value: string) => { eq: (column: string, value: string) => { maybeSingle: () => Promise<{ data: { updated_at: string; activity_feedback_versions: { body: string; published_at: string; revision_number: number }[]; activity_submission_versions: { body: string; submitted_at: string; version_number: number }[] } | null }> } } } };
  };
  const { data } = await db.from("activity_submissions").select("updated_at, activity_feedback_versions(body, published_at, revision_number), activity_submission_versions(body, submitted_at, version_number)").eq("activity_id", activityId).eq("student_id", userId).maybeSingle();
  const feedback = data?.activity_feedback_versions.toSorted((left, right) => right.revision_number - left.revision_number)[0];
  const submission = data?.activity_submission_versions.toSorted((left, right) => right.version_number - left.version_number)[0];
  return <Card className="mt-10 min-w-0"><CardHeader><CardTitle>Entrega</CardTitle><CardDescription>{data ? `Ultima version registrada: ${formatArgentinaDateTime(data.updated_at)}.` : "Todavia no registraste una entrega."}</CardDescription></CardHeader><CardContent className="flex min-w-0 flex-col gap-4">{submission ? <Alert><AlertTitle>Tu entrega</AlertTitle><AlertDescription><p className="whitespace-pre-wrap break-words">{submission.body}</p><p className="mt-2 text-xs">Version {submission.version_number} - {formatArgentinaDateTime(submission.submitted_at)}</p></AlertDescription></Alert> : null}{feedback ? <Alert className="min-w-0"><AlertTitle>Devolucion del profesor</AlertTitle><AlertDescription className="min-w-0"><FeedbackMarkdown>{feedback.body}</FeedbackMarkdown><p className="mt-2 text-xs">Publicada: {formatArgentinaDateTime(feedback.published_at)}</p></AlertDescription></Alert> : null}<DeliveryForm activityId={activityId} /></CardContent></Card>;
}
