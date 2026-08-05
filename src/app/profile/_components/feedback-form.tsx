"use client";

import { publishFeedback } from "@/app/profile/actions";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";

export function FeedbackForm({ submissionId }: { submissionId: string }) {
  return <form action={publishFeedback} className="mt-4"><FieldGroup><input type="hidden" name="submissionId" value={submissionId} /><Field><FieldLabel htmlFor={`feedback-${submissionId}`}>Devolucion</FieldLabel><Textarea id={`feedback-${submissionId}`} name="body" required maxLength={20000} rows={4} /></Field><Button type="submit">Publicar devolucion</Button></FieldGroup></form>;
}
