import "server-only";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export type Profile = {
  avatar_url: string | null;
  course_year: number;
  first_name: string | null;
  is_responsible: boolean;
  last_name: string | null;
  role: "student" | "professor";
};

export type CompleteProfile = Profile & {
  first_name: string;
  last_name: string;
};

export async function getVerifiedUserId() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims?.sub) {
    redirect("/");
  }

  return data.claims.sub;
}

export async function getCurrentProfile(): Promise<Profile | null> {
  const userId = await getVerifiedUserId();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("avatar_url, course_year, first_name, is_responsible, last_name, role")
    .eq("id", userId)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return data as Profile;
}

export function isProfileComplete(profile: Profile | null) {
  return Boolean(profile?.first_name && profile.last_name);
}

export async function requireCompleteProfile(): Promise<CompleteProfile> {
  const profile = await getCurrentProfile();

  if (!profile?.first_name || !profile.last_name) {
    redirect("/profile/complete");
  }

  return profile as CompleteProfile;
}
