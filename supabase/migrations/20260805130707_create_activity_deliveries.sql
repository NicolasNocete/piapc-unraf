create table public.activity_submissions (
  id uuid primary key default gen_random_uuid(),
  activity_id text not null check (activity_id ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  activity_version integer not null check (activity_version > 0),
  student_id uuid not null references public.profiles (id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (activity_id, student_id)
);

create table public.activity_submission_versions (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.activity_submissions (id) on delete restrict,
  version_number integer not null check (version_number > 0),
  activity_version integer not null check (activity_version > 0),
  body text not null check (length(btrim(body)) between 1 and 20000),
  submitted_at timestamptz not null default now(),
  unique (submission_id, version_number)
);

create table public.activity_feedback_versions (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.activity_submissions (id) on delete restrict,
  revision_number integer not null check (revision_number > 0),
  reviewer_id uuid not null references public.profiles (id) on delete restrict,
  body text not null check (length(btrim(body)) between 1 and 20000),
  published_at timestamptz not null default now(),
  unique (submission_id, revision_number)
);

create index activity_submission_versions_submission_id_version_number_idx
  on public.activity_submission_versions (submission_id, version_number desc);

create index activity_feedback_versions_submission_id_revision_number_idx
  on public.activity_feedback_versions (submission_id, revision_number desc);

create index activity_submissions_activity_id_updated_at_idx
  on public.activity_submissions (activity_id, updated_at desc);

alter table public.activity_submissions enable row level security;
alter table public.activity_submission_versions enable row level security;
alter table public.activity_feedback_versions enable row level security;

revoke all on table public.activity_submissions from public, anon, authenticated;
revoke all on table public.activity_submission_versions from public, anon, authenticated;
revoke all on table public.activity_feedback_versions from public, anon, authenticated;

grant select on table public.activity_submissions to authenticated;
grant select on table public.activity_submission_versions to authenticated;
grant select on table public.activity_feedback_versions to authenticated;

create or replace function private.is_responsible_actor()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'professor'
      and is_responsible
      and first_name is not null
      and last_name is not null
  );
$$;

create policy "Students and responsible professors can read submissions"
on public.activity_submissions
for select
to authenticated
using (
  (select auth.uid()) = student_id
  or (select private.is_responsible_actor())
);

create policy "Students and responsible professors can read submission versions"
on public.activity_submission_versions
for select
to authenticated
using (
  exists (
    select 1
    from public.activity_submissions
    where id = submission_id
      and (
        student_id = (select auth.uid())
        or (select private.is_responsible_actor())
      )
  )
);

create policy "Students and responsible professors can read feedback versions"
on public.activity_feedback_versions
for select
to authenticated
using (
  exists (
    select 1
    from public.activity_submissions
    where id = submission_id
      and (
        student_id = (select auth.uid())
        or (select private.is_responsible_actor())
      )
  )
);

create or replace function private.append_submission_version(
  next_student_id uuid,
  next_activity_id text,
  next_activity_version integer,
  next_body text
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  target_submission_id uuid;
  next_version_number integer;
begin
  if next_student_id is null
    or next_activity_id !~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'
    or next_activity_version is null
    or next_activity_version <= 0
    or length(btrim(next_body)) not between 1 and 20000
  then
    raise exception 'invalid submission';
  end if;

  if not exists (
    select 1 from public.profiles
    where id = next_student_id
      and role = 'student'
      and first_name is not null
      and last_name is not null
  ) then
    raise exception 'not authorized';
  end if;

  insert into public.activity_submissions (activity_id, activity_version, student_id)
  values (next_activity_id, next_activity_version, next_student_id)
  on conflict (activity_id, student_id)
  do update set activity_version = excluded.activity_version, updated_at = now()
  returning id into target_submission_id;

  select coalesce(max(version_number), 0) + 1
  into next_version_number
  from public.activity_submission_versions
  where submission_id = target_submission_id;

  insert into public.activity_submission_versions (
    submission_id, version_number, activity_version, body
  ) values (
    target_submission_id, next_version_number, next_activity_version, btrim(next_body)
  );

  return target_submission_id;
end;
$$;

create or replace function private.append_feedback_version(
  next_reviewer_id uuid,
  target_submission_id uuid,
  next_body text
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  next_revision_number integer;
begin
  if target_submission_id is null or length(btrim(next_body)) not between 1 and 20000 then
    raise exception 'invalid feedback';
  end if;

  if not exists (
    select 1 from public.profiles
    where id = next_reviewer_id
      and role = 'professor'
      and is_responsible
      and first_name is not null
      and last_name is not null
  ) then
    raise exception 'not authorized';
  end if;

  perform 1
  from public.activity_submissions
  where id = target_submission_id
  for update;
  if not found then
    raise exception 'submission not found';
  end if;

  select coalesce(max(revision_number), 0) + 1
  into next_revision_number
  from public.activity_feedback_versions
  where submission_id = target_submission_id;

  insert into public.activity_feedback_versions (
    submission_id, revision_number, reviewer_id, body
  ) values (
    target_submission_id, next_revision_number, next_reviewer_id, btrim(next_body)
  );
end;
$$;

create or replace function public.append_submission_version(
  next_student_id uuid,
  next_activity_id text,
  next_activity_version integer,
  next_body text
)
returns uuid
language sql
security invoker
set search_path = ''
as $$
  select private.append_submission_version(
    next_student_id, next_activity_id, next_activity_version, next_body
  );
$$;

create or replace function public.append_feedback_version(
  next_reviewer_id uuid,
  target_submission_id uuid,
  next_body text
)
returns void
language sql
security invoker
set search_path = ''
as $$
  select private.append_feedback_version(next_reviewer_id, target_submission_id, next_body);
$$;

revoke all on function private.is_responsible_actor() from public, anon;
revoke all on function private.append_submission_version(uuid, text, integer, text) from public, anon, authenticated;
revoke all on function private.append_feedback_version(uuid, uuid, text) from public, anon, authenticated;
revoke all on function public.append_submission_version(uuid, text, integer, text) from public, anon, authenticated;
revoke all on function public.append_feedback_version(uuid, uuid, text) from public, anon, authenticated;

grant execute on function private.is_responsible_actor() to authenticated;
grant usage on schema private to service_role;
grant execute on function private.append_submission_version(uuid, text, integer, text) to service_role;
grant execute on function private.append_feedback_version(uuid, uuid, text) to service_role;
grant execute on function public.append_submission_version(uuid, text, integer, text) to service_role;
grant execute on function public.append_feedback_version(uuid, uuid, text) to service_role;
