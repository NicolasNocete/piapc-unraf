"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FeedbackForm } from "./feedback-form";

type Props = {
  submissionId: string;
  activityId: string;
  studentName: string;
  versions: { body: string; submitted_at: string; version_number: number }[];
  feedback?: { grade: number | null; published_at: string; revision_number: number };
};

export function DeliveryDetailDialog({ submissionId, activityId, studentName, versions, feedback }: Props) {
  return <Dialog><DialogTrigger render={<Button variant="outline" />}>Ver entrega</DialogTrigger><DialogContent className="max-h-[calc(100svh-2rem)] w-[calc(100%-2rem)] max-w-none overflow-x-hidden overflow-y-auto sm:!max-w-2xl"><DialogHeader><DialogTitle>{activityId}</DialogTitle><DialogDescription>Entrega de {studentName}. Se muestran todas las versiones registradas.</DialogDescription></DialogHeader>{feedback ? <section className="rounded-lg border p-4"><p className="text-sm font-medium">Ultima devolucion publicada: {new Date(feedback.published_at).toLocaleString("es-AR")}</p><p className="mt-2 text-sm">Nota: {feedback.grade ?? "Sin nota"}</p></section> : null}<div className="flex flex-col gap-4">{versions.map((version) => <section key={version.version_number} className="rounded-lg border p-4"><p className="text-sm font-medium">Version {version.version_number} - {new Date(version.submitted_at).toLocaleString("es-AR")}</p><p className="mt-3 whitespace-pre-wrap break-words text-sm">{version.body}</p></section>)}</div><FeedbackForm submissionId={submissionId} /></DialogContent></Dialog>;
}
