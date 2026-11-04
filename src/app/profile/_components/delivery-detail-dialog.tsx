"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { formatArgentinaDateTime } from "@/lib/date-time";
import { FeedbackForm } from "./feedback-form";
import { PublishedFeedback } from "./published-feedback";

type Props = {
  submissionId: string;
  activityId: string;
  studentName: string;
  versions: { body: string; submitted_at: string; version_number: number }[];
  feedback?: { access_unavailable: boolean; body: string; grade: number | null; published_at: string; revision_number: number };
};

export function DeliveryDetailDialog({ submissionId, activityId, studentName, versions, feedback }: Props) {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>Ver entrega</DialogTrigger>
      <DialogContent className="max-h-[calc(100svh-2rem)] w-[calc(100%-2rem)] max-w-none overflow-x-hidden overflow-y-auto sm:!max-w-2xl">
        <DialogHeader>
          <DialogTitle>{activityId}</DialogTitle>
          <DialogDescription>Entrega de {studentName}. Se muestran todas las versiones registradas.</DialogDescription>
        </DialogHeader>
        {feedback ? <PublishedFeedback feedback={feedback} /> : <p className="text-sm text-muted-foreground">Todavía no hay una devolución publicada.</p>}
        <div className="flex min-w-0 flex-col gap-4">
          <h3 className="text-sm font-medium">Versiones de la entrega</h3>
          {versions.map((version) => (
            <section key={version.version_number} className="min-w-0 rounded-lg border p-4">
              <p className="text-sm font-medium">Versión {version.version_number} - {formatArgentinaDateTime(version.submitted_at)}</p>
              <p className="mt-3 whitespace-pre-wrap break-words text-sm [overflow-wrap:anywhere]">{version.body}</p>
            </section>
          ))}
        </div>
        <Card className="min-w-0">
          <CardHeader>
            <CardTitle><h3>{feedback ? "Publicar una nueva revisión" : "Publicar devolución"}</h3></CardTitle>
            <CardDescription>
              {feedback ? "Este formulario crea una nueva revisión. No modifica ni reemplaza las devoluciones anteriores." : "Completá este formulario para publicar la primera devolución."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FeedbackForm submissionId={submissionId} hasPublishedFeedback={Boolean(feedback)} />
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
