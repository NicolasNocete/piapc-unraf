import Link from "next/link";

import {
  setCourseYearByEmail,
  setResponsibilityByEmail,
  setRoleByEmail,
  saveOwnProfile,
} from "@/app/profile/actions";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { requireCompleteProfile } from "@/lib/profiles/server";

const roleLabel = { professor: "Profesor", student: "Alumno" } as const;

export default async function ProfilePage() {
  const profile = await requireCompleteProfile();

  return (
    <main className="min-h-svh bg-muted/40 p-4 sm:p-8">
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Espacio de cátedra</p>
            <h1 className="text-3xl font-semibold tracking-tight">Mi perfil</h1>
          </div>
          <Link href="/dashboard" className={buttonVariants({ variant: "outline" })}>Volver al dashboard</Link>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Datos personales</CardTitle>
            <CardDescription>Estos datos solo están disponibles para vos.</CardDescription>
          </CardHeader>
          <form action={saveOwnProfile}>
            <CardContent>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="firstName">Nombre</FieldLabel>
                  <Input id="firstName" name="firstName" required autoComplete="given-name" defaultValue={profile.first_name ?? ""} />
                </Field>
                <Field>
                  <FieldLabel htmlFor="lastName">Apellido</FieldLabel>
                  <Input id="lastName" name="lastName" required autoComplete="family-name" defaultValue={profile.last_name ?? ""} />
                </Field>
              </FieldGroup>
            </CardContent>
            <CardFooter className="justify-end"><Button type="submit">Guardar cambios</Button></CardFooter>
          </form>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Información académica</CardTitle>
            <CardDescription>Estos valores los administra la cátedra.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div><p className="text-sm text-muted-foreground">Rol</p><p className="font-medium">{roleLabel[profile.role]}</p></div>
            <div><p className="text-sm text-muted-foreground">Año de cursada</p><p className="font-medium">{profile.course_year}</p></div>
          </CardContent>
        </Card>

        {profile.is_responsible ? <ResponsibleOperations /> : null}
      </div>
    </main>
  );
}

function ResponsibleOperations() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Operaciones de responsable</CardTitle>
        <CardDescription>Ingresá un email conocido. No se muestran listas, sugerencias ni datos de otras cuentas.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-8">
        <form action={setRoleByEmail}>
          <FieldGroup>
            <Field><FieldLabel htmlFor="role-email">Email</FieldLabel><Input id="role-email" name="email" type="email" required /></Field>
            <Field><FieldLabel htmlFor="role">Rol</FieldLabel><Select name="role" defaultValue="student"><SelectTrigger id="role"><SelectValue /></SelectTrigger><SelectContent><SelectGroup><SelectItem value="student">Alumno</SelectItem><SelectItem value="professor">Profesor</SelectItem></SelectGroup></SelectContent></Select></Field>
            <Field><FieldDescription>El resultado no revela datos de la cuenta afectada.</FieldDescription><Button type="submit">Actualizar rol</Button></Field>
          </FieldGroup>
        </form>
        <form action={setResponsibilityByEmail}>
          <FieldGroup>
            <Field><FieldLabel htmlFor="responsibility-email">Email</FieldLabel><Input id="responsibility-email" name="email" type="email" required /></Field>
            <Field><FieldLabel htmlFor="isResponsible">Responsabilidad</FieldLabel><Select name="isResponsible" defaultValue="true"><SelectTrigger id="isResponsible"><SelectValue /></SelectTrigger><SelectContent><SelectGroup><SelectItem value="true">Otorgar</SelectItem><SelectItem value="false">Retirar</SelectItem></SelectGroup></SelectContent></Select></Field>
            <Field><Button type="submit">Actualizar responsabilidad</Button></Field>
          </FieldGroup>
        </form>
        <form action={setCourseYearByEmail}>
          <FieldGroup>
            <Field><FieldLabel htmlFor="year-email">Email</FieldLabel><Input id="year-email" name="email" type="email" required /></Field>
            <Field><FieldLabel htmlFor="courseYear">Año de cursada</FieldLabel><Input id="courseYear" name="courseYear" type="number" min="1000" max="9999" required /></Field>
            <Field><Button type="submit">Corregir año</Button></Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
