"use client";

import { useActionState } from "react";

import { submitDelivery, type DeliveryState } from "@/app/contenidos/[id]/actions";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";

const initialState: DeliveryState = {};

export function DeliveryForm({ activityId }: { activityId: string }) {
  const [state, action, pending] = useActionState(submitDelivery, initialState);
  return <form action={action}><FieldGroup><input type="hidden" name="activityId" value={activityId} />
    <Field data-invalid={Boolean(state.error)}><FieldLabel htmlFor="delivery">Tu entrega</FieldLabel><Textarea id="delivery" name="body" required maxLength={20000} aria-invalid={Boolean(state.error)} rows={10} placeholder="Escribi tu entrega y los enlaces a Drive, repositorios u otros recursos." /><FieldDescription>Los enlaces se conservan como texto. Podes reemplazar esta entrega despues.</FieldDescription>{state.error ? <p className="text-sm text-destructive">{state.error}</p> : null}</Field>
    <Button type="submit" disabled={pending}>{pending ? "Guardando..." : "Registrar entrega"}</Button>
  </FieldGroup></form>;
}
