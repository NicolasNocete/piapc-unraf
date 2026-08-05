alter table public.profiles
  add column first_name text,
  add column last_name text,
  add column role text not null default 'student',
  add column course_year smallint,
  add column is_responsible boolean not null default false;

alter table public.profiles
  add constraint profiles_first_name_not_blank
    check (first_name is null or length(btrim(first_name)) > 0),
  add constraint profiles_last_name_not_blank
    check (last_name is null or length(btrim(last_name)) > 0),
  add constraint profiles_role_check
    check (role in ('student', 'professor')),
  add constraint profiles_course_year_check
    check (course_year between 1000 and 9999),
  add constraint profiles_responsible_is_professor
    check (not is_responsible or role = 'professor');

create table private.profile_change_audit (
  id bigint generated always as identity primary key,
  target_user_id uuid not null references auth.users (id) on delete cascade,
  actor_user_id uuid references auth.users (id) on delete cascade,
  external_actor_identifier text,
  actor_kind text not null check (actor_kind in ('authenticated', 'external')),
  change_kind text not null check (change_kind in ('role', 'responsibility', 'course_year')),
  old_value text not null,
  new_value text not null,
  changed_at timestamptz not null default now(),
  check (
    (actor_kind = 'authenticated' and actor_user_id is not null and external_actor_identifier is null)
    or
    (actor_kind = 'external' and actor_user_id is null and external_actor_identifier is not null)
  )
);

create index profile_change_audit_target_user_id_idx
  on private.profile_change_audit (target_user_id);

create index profile_change_audit_actor_user_id_idx
  on private.profile_change_audit (actor_user_id)
  where actor_user_id is not null;

alter table private.profile_change_audit enable row level security;

revoke all on table private.profile_change_audit from public, anon, authenticated;

revoke update on table public.profiles from authenticated;
grant update (first_name, last_name, avatar_url) on table public.profiles to authenticated;

create or replace function private.profile_course_year(created_at timestamptz)
returns smallint
language sql
immutable
set search_path = ''
as $$
  select extract(year from timezone('America/Argentina/Buenos_Aires', created_at))::smallint;
$$;

create or replace function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (
    id,
    display_name,
    avatar_url,
    first_name,
    last_name,
    role,
    course_year,
    is_responsible
  )
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name'),
    new.raw_user_meta_data ->> 'avatar_url',
    nullif(btrim(new.raw_user_meta_data ->> 'given_name'), ''),
    nullif(btrim(new.raw_user_meta_data ->> 'family_name'), ''),
    'student',
    private.profile_course_year(new.created_at),
    false
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

update public.profiles as profile
set
  first_name = nullif(btrim(user_record.raw_user_meta_data ->> 'given_name'), ''),
  last_name = nullif(btrim(user_record.raw_user_meta_data ->> 'family_name'), ''),
  role = 'student',
  course_year = private.profile_course_year(user_record.created_at),
  is_responsible = false
from auth.users as user_record
where profile.id = user_record.id;

insert into public.profiles (
  id,
  display_name,
  avatar_url,
  first_name,
  last_name,
  role,
  course_year,
  is_responsible
)
select
  id,
  coalesce(raw_user_meta_data ->> 'full_name', raw_user_meta_data ->> 'name'),
  raw_user_meta_data ->> 'avatar_url',
  nullif(btrim(raw_user_meta_data ->> 'given_name'), ''),
  nullif(btrim(raw_user_meta_data ->> 'family_name'), ''),
  'student',
  private.profile_course_year(created_at),
  false
from auth.users
on conflict (id) do nothing;

alter table public.profiles
  alter column course_year set not null;

create or replace function private.enforce_profile_responsibility()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.role = 'student' then
    new.is_responsible = false;
  end if;

  return new;
end;
$$;

create trigger enforce_profile_responsibility
  before update of role, is_responsible on public.profiles
  for each row execute procedure private.enforce_profile_responsibility();

create or replace function private.audit_profile_change()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_actor uuid := auth.uid();
  external_actor text := nullif(current_setting('app.profile_external_actor', true), '');
begin
  if current_actor is null and external_actor is null then
    raise exception 'profile changes require an actor';
  end if;

  if old.role is distinct from new.role then
    insert into private.profile_change_audit (
      target_user_id, actor_user_id, external_actor_identifier, actor_kind, change_kind, old_value, new_value
    ) values (
      new.id, current_actor, external_actor,
      case when current_actor is null then 'external' else 'authenticated' end,
      'role', old.role, new.role
    );
  end if;

  if old.is_responsible is distinct from new.is_responsible then
    insert into private.profile_change_audit (
      target_user_id, actor_user_id, external_actor_identifier, actor_kind, change_kind, old_value, new_value
    ) values (
      new.id, current_actor, external_actor,
      case when current_actor is null then 'external' else 'authenticated' end,
      'responsibility', old.is_responsible::text, new.is_responsible::text
    );
  end if;

  if old.course_year is distinct from new.course_year then
    insert into private.profile_change_audit (
      target_user_id, actor_user_id, external_actor_identifier, actor_kind, change_kind, old_value, new_value
    ) values (
      new.id, current_actor, external_actor,
      case when current_actor is null then 'external' else 'authenticated' end,
      'course_year', old.course_year::text, new.course_year::text
    );
  end if;

  return new;
end;
$$;

create trigger audit_profile_change
  after update of role, is_responsible, course_year on public.profiles
  for each row execute procedure private.audit_profile_change();

create or replace function private.require_responsible_actor()
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_actor uuid := auth.uid();
begin
  if current_actor is null or not exists (
    select 1
    from public.profiles
    where id = current_actor
      and role = 'professor'
      and is_responsible
      and first_name is not null
      and last_name is not null
  ) then
    raise exception 'not authorized';
  end if;

  return current_actor;
end;
$$;

create or replace function private.target_user_id_for_email(target_email text)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  target_id uuid;
begin
  select id into target_id
  from auth.users
  where lower(email) = lower(btrim(target_email));

  if target_id is null then
    raise exception 'invalid target';
  end if;

  return target_id;
end;
$$;

create or replace function private.set_profile_role_by_email(target_email text, next_role text)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  target_id uuid;
begin
  perform private.require_responsible_actor();
  target_id := private.target_user_id_for_email(target_email);

  update public.profiles
  set role = next_role
  where id = target_id
    and next_role in ('student', 'professor');

  if not found then
    raise exception 'invalid role';
  end if;
end;
$$;

create or replace function private.set_profile_responsibility_by_email(target_email text, next_responsible boolean)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  target_id uuid;
begin
  perform private.require_responsible_actor();
  target_id := private.target_user_id_for_email(target_email);

  update public.profiles
  set is_responsible = next_responsible
  where id = target_id
    and (not next_responsible or role = 'professor');

  if not found then
    raise exception 'invalid responsibility';
  end if;
end;
$$;

create or replace function private.set_profile_course_year_by_email(target_email text, next_course_year smallint)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  target_id uuid;
begin
  perform private.require_responsible_actor();
  target_id := private.target_user_id_for_email(target_email);

  update public.profiles
  set course_year = next_course_year
  where id = target_id
    and next_course_year between 1000 and 9999;

  if not found then
    raise exception 'invalid course year';
  end if;
end;
$$;

create or replace function public.set_profile_role_by_email(target_email text, next_role text)
returns void
language sql
security invoker
set search_path = ''
as $$
  select private.set_profile_role_by_email(target_email, next_role);
$$;

create or replace function public.set_profile_responsibility_by_email(target_email text, next_responsible boolean)
returns void
language sql
security invoker
set search_path = ''
as $$
  select private.set_profile_responsibility_by_email(target_email, next_responsible);
$$;

create or replace function public.set_profile_course_year_by_email(target_email text, next_course_year smallint)
returns void
language sql
security invoker
set search_path = ''
as $$
  select private.set_profile_course_year_by_email(target_email, next_course_year);
$$;

create or replace function private.bootstrap_first_responsible(target_email text, operator_identifier text)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  target_id uuid;
begin
  if nullif(btrim(operator_identifier), '') is null then
    raise exception 'operator identifier is required';
  end if;

  if exists (select 1 from public.profiles where is_responsible) then
    raise exception 'a responsible professor already exists';
  end if;

  target_id := private.target_user_id_for_email(target_email);
  perform set_config('app.profile_external_actor', btrim(operator_identifier), true);

  update public.profiles
  set role = 'professor', is_responsible = true
  where id = target_id;
end;
$$;

revoke all on function private.profile_course_year(timestamptz) from public, anon, authenticated;
revoke all on function private.handle_new_user() from public, anon, authenticated;
revoke all on function private.enforce_profile_responsibility() from public, anon, authenticated;
revoke all on function private.audit_profile_change() from public, anon, authenticated;
revoke all on function private.require_responsible_actor() from public, anon, authenticated;
revoke all on function private.target_user_id_for_email(text) from public, anon, authenticated;
revoke all on function private.set_profile_role_by_email(text, text) from public, anon, authenticated;
revoke all on function private.set_profile_responsibility_by_email(text, boolean) from public, anon, authenticated;
revoke all on function private.set_profile_course_year_by_email(text, smallint) from public, anon, authenticated;
revoke all on function private.bootstrap_first_responsible(text, text) from public, anon, authenticated;

grant usage on schema private to authenticated;
grant execute on function private.set_profile_role_by_email(text, text) to authenticated;
grant execute on function private.set_profile_responsibility_by_email(text, boolean) to authenticated;
grant execute on function private.set_profile_course_year_by_email(text, smallint) to authenticated;

revoke all on function public.set_profile_role_by_email(text, text) from public, anon;
revoke all on function public.set_profile_responsibility_by_email(text, boolean) from public, anon;
revoke all on function public.set_profile_course_year_by_email(text, smallint) from public, anon;

grant execute on function public.set_profile_role_by_email(text, text) to authenticated;
grant execute on function public.set_profile_responsibility_by_email(text, boolean) to authenticated;
grant execute on function public.set_profile_course_year_by_email(text, smallint) to authenticated;
