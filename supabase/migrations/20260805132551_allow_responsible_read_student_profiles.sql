create policy "Responsible professors can read student profiles"
on public.profiles
for select
to authenticated
using ((select private.is_responsible_actor()));
