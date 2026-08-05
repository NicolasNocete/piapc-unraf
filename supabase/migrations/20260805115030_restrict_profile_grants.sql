revoke all on table public.profiles from anon, authenticated;
grant select on table public.profiles to authenticated;
grant update (first_name, last_name, avatar_url) on table public.profiles to authenticated;
