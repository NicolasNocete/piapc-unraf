"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { getContent } from "@/lib/content/server";
import { getCurrentProfile, getVerifiedUserId } from "@/lib/profiles/server";
import { createAdminClient } from "@/lib/supabase/admin";

const deliverySchema = z.object({ activityId: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/), body: z.string().trim().min(1).max(20000) });

export type DeliveryState = { error?: string };

export async function submitDelivery(_: DeliveryState, formData: FormData): Promise<DeliveryState> {
  const parsed = deliverySchema.safeParse({ activityId: formData.get("activityId"), body: formData.get("body") });
  if (!parsed.success) return { error: "Escribi una entrega de hasta 20.000 caracteres." };

  const [userId, profile, content] = await Promise.all([getVerifiedUserId(), getCurrentProfile(), getContent(parsed.data.activityId)]);
  if (!profile || profile.role !== "student" || !content || content.entry.type !== "actividad") return { error: "No tenes permiso para entregar esta actividad." };

  const admin = createAdminClient() as never as { rpc: (name: string, args: Record<string, unknown>) => Promise<{ error: { message: string } | null }> };
  const { error } = await admin.rpc("append_submission_version", {
    next_student_id: userId,
    next_activity_id: content.entry.id,
    next_activity_version: content.entry.version,
    next_body: parsed.data.body,
  });
  if (error) return { error: "No se pudo registrar la entrega." };
  revalidatePath(`/contenidos/${content.entry.id}`);
  return {};
}
