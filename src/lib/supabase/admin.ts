import "server-only";

import { createClient } from "@supabase/supabase-js";

import type { Database } from "@/lib/supabase/database.types";

export function createAdminClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey) throw new Error("Falta configurar SUPABASE_SERVICE_ROLE_KEY.");
  return createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
