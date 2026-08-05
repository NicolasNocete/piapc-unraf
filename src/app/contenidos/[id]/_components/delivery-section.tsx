import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
  return <Card className="mt-10"><CardHeader><CardTitle>Entrega</CardTitle><CardDescription>{data ? `Ultima version registrada: ${new Date(data.updated_at).toLocaleString("es-AR")}.` : "Todavia no registraste una entrega."}</CardDescription></CardHeader><CardContent className="flex flex-col gap-4">{submission ? <Alert><AlertTitle>Tu entrega</AlertTitle><AlertDescription><p className="whitespace-pre-wrap break-words">{submission.body}</p><p className="mt-2 text-xs">Version {submission.version_number} - {new Date(submission.submitted_at).toLocaleString("es-AR")}</p></AlertDescription></Alert> : null}{feedback ? <Alert><AlertTitle>Devolucion del profesor</AlertTitle><AlertDescription><p className="whitespace-pre-wrap break-words">{feedback.body}</p><p className="mt-2 text-xs">Publicada: {new Date(feedback.published_at).toLocaleString("es-AR")}</p></AlertDescription></Alert> : null}<DeliveryForm activityId={activityId} /></CardContent></Card>;
}
