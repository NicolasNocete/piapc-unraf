import { redirect } from "next/navigation";

import { completeOwnProfile } from "@/app/profile/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { getCurrentProfile, isProfileComplete } from "@/lib/profiles/server";

export default async function CompleteProfilePage() {
  const profile = await getCurrentProfile();

  if (isProfileComplete(profile)) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-svh items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Completá tu perfil</CardTitle>
          <CardDescription>Necesitamos tu nombre y apellido para habilitar el espacio de cátedra.</CardDescription>
        </CardHeader>
        <form action={completeOwnProfile}>
          <CardContent>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="firstName">Nombre</FieldLabel>
                <Input id="firstName" name="firstName" required autoComplete="given-name" defaultValue={profile?.first_name ?? ""} />
              </Field>
              <Field>
                <FieldLabel htmlFor="lastName">Apellido</FieldLabel>
                <Input id="lastName" name="lastName" required autoComplete="family-name" defaultValue={profile?.last_name ?? ""} />
              </Field>
            </FieldGroup>
          </CardContent>
          <CardFooter className="justify-end">
            <Button type="submit">Continuar</Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}
