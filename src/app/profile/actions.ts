"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { getCurrentProfile, getVerifiedUserId } from "@/lib/profiles/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

const namesSchema = z.object({
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
});

const emailSchema = z.string().trim().email().max(320);

function invalidFormData() {
  return new Error("Los datos ingresados no son válidos.");
}

export async function saveOwnProfile(formData: FormData) {
  const parsed = namesSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
  });

  if (!parsed.success) {
    throw invalidFormData();
  }

  const userId = await getVerifiedUserId();
  const supabase = await createClient();
  const { error } = await supabase
    .from("profiles")
    .update({ first_name: parsed.data.firstName, last_name: parsed.data.lastName })
    .eq("id", userId);

  if (error) {
    throw new Error("No se pudo actualizar el perfil.");
  }

  revalidatePath("/dashboard");
  revalidatePath("/profile");
  revalidatePath("/profile/complete");
}

export async function completeOwnProfile(formData: FormData) {
  await saveOwnProfile(formData);
  redirect("/dashboard");
}

const roleSchema = z.object({
  email: emailSchema,
  role: z.enum(["student", "professor"]),
});

export async function setRoleByEmail(formData: FormData) {
  const parsed = roleSchema.safeParse({ email: formData.get("email"), role: formData.get("role") });
  if (!parsed.success) throw invalidFormData();

  await getVerifiedUserId();
  const supabase = await createClient();
  const { error } = await supabase.rpc("set_profile_role_by_email", {
    target_email: parsed.data.email,
    next_role: parsed.data.role,
  });
  if (error) throw new Error("No se pudo realizar la operación.");
  revalidatePath("/profile");
}

const responsibilitySchema = z.object({
  email: emailSchema,
  isResponsible: z.enum(["true", "false"]),
});

export async function setResponsibilityByEmail(formData: FormData) {
  const parsed = responsibilitySchema.safeParse({
    email: formData.get("email"),
    isResponsible: formData.get("isResponsible"),
  });
  if (!parsed.success) throw invalidFormData();

  await getVerifiedUserId();
  const supabase = await createClient();
  const { error } = await supabase.rpc("set_profile_responsibility_by_email", {
    target_email: parsed.data.email,
    next_responsible: parsed.data.isResponsible === "true",
  });
  if (error) throw new Error("No se pudo realizar la operación.");
  revalidatePath("/profile");
}

const courseYearSchema = z.object({
  email: emailSchema,
  courseYear: z.coerce.number().int().min(1000).max(9999),
});

export async function setCourseYearByEmail(formData: FormData) {
  const parsed = courseYearSchema.safeParse({
    email: formData.get("email"),
    courseYear: formData.get("courseYear"),
  });
  if (!parsed.success) throw invalidFormData();

  await getVerifiedUserId();
  const supabase = await createClient();
  const { error } = await supabase.rpc("set_profile_course_year_by_email", {
    target_email: parsed.data.email,
    next_course_year: parsed.data.courseYear,
  });
  if (error) throw new Error("No se pudo realizar la operación.");
  revalidatePath("/profile");
}

const feedbackSchema = z.object({ submissionId: z.string().uuid(), body: z.string().trim().min(1).max(20000) });

export async function publishFeedback(formData: FormData) {
  const parsed = feedbackSchema.safeParse({ submissionId: formData.get("submissionId"), body: formData.get("body") });
  if (!parsed.success) throw invalidFormData();
  const [userId, profile] = await Promise.all([getVerifiedUserId(), getCurrentProfile()]);
  if (!profile?.is_responsible || profile.role !== "professor") throw new Error("No tenes permiso para publicar devoluciones.");
  const admin = createAdminClient() as never as { rpc: (name: string, args: Record<string, unknown>) => Promise<{ error: { message: string } | null }> };
  const { error } = await admin.rpc("append_feedback_version", { next_reviewer_id: userId, target_submission_id: parsed.data.submissionId, next_body: parsed.data.body });
  if (error) throw new Error("No se pudo publicar la devolucion.");
  revalidatePath("/profile");
  revalidatePath("/dashboard/entregas");
}
