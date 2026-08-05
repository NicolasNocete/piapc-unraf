create policy "No direct access to profile audit"
on private.profile_change_audit
as restrictive
for all
to authenticated
using (false)
with check (false);
