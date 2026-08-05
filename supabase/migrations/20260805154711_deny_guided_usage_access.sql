create policy "Guided usage is not directly accessible"
on public.guided_consultation_usage
as restrictive
for all
to authenticated
using (false)
with check (false);
