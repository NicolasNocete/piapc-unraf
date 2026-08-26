"use client";

import { useState } from "react";

import { publishFeedback } from "@/app/profile/actions";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function FeedbackForm({ submissionId }: { submissionId: string }) {
  const [accessUnavailable, setAccessUnavailable] = useState(false);

  return (
    <form action={publishFeedback} className="mt-4">
      <FieldGroup>
        <input type="hidden" name="submissionId" value={submissionId} />
        <Field>
          <FieldLabel htmlFor={`feedback-${submissionId}`}>Devolucion</FieldLabel>
          <Textarea id={`feedback-${submissionId}`} name="body" required maxLength={20000} rows={4} />
        </Field>
        <Field>
          <label className="flex items-center gap-2 text-sm" htmlFor={`access-unavailable-${submissionId}`}>
            <input
              checked={accessUnavailable}
              id={`access-unavailable-${submissionId}`}
              name="accessUnavailable"
              onChange={(event) => setAccessUnavailable(event.target.checked)}
              type="checkbox"
              value="true"
            />
            Material inaccesible
          </label>
          <FieldDescription>Usalo solo si no fue posible abrir el material entregado. Se publicara la devolucion sin nota.</FieldDescription>
        </Field>
        <Field data-disabled={accessUnavailable}>
          <FieldLabel htmlFor={`grade-${submissionId}`}>Nota (1-10)</FieldLabel>
          <Input disabled={accessUnavailable} id={`grade-${submissionId}`} name="grade" type="number" min={1} max={10} step={1} required={!accessUnavailable} />
        </Field>
        <Button className="w-full" type="submit">Publicar devolucion</Button>
      </FieldGroup>
    </form>
  );
}
