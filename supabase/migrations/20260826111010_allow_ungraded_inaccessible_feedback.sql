alter table public.activity_feedback_versions
  add column access_unavailable boolean not null default false;

comment on column public.activity_feedback_versions.access_unavailable is
  'True only when the submitted material could not be accessed for review; these feedback versions have no grade.';

drop function public.append_feedback_version(uuid, uuid, text, integer);
drop function private.append_feedback_version(uuid, uuid, text, integer);

create function private.append_feedback_version(
  next_reviewer_id uuid,
  target_submission_id uuid,
  next_body text,
  next_grade integer,
  next_access_unavailable boolean
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  next_revision_number integer;
begin
  if target_submission_id is null
    or length(btrim(next_body)) not between 1 and 20000
    or next_access_unavailable is null
    or (next_access_unavailable and next_grade is not null)
    or (not next_access_unavailable and next_grade not between 1 and 10)
  then
    raise exception 'invalid feedback';
  end if;

  if not exists (
    select 1
    from public.profiles
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
    submission_id,
    revision_number,
    reviewer_id,
    body,
    grade,
    access_unavailable
  ) values (
    target_submission_id,
    next_revision_number,
    next_reviewer_id,
    btrim(next_body),
    next_grade,
    next_access_unavailable
  );
end;
$$;

create function public.append_feedback_version(
  next_reviewer_id uuid,
  target_submission_id uuid,
  next_body text,
  next_grade integer,
  next_access_unavailable boolean
)
returns void
language sql
security invoker
set search_path = ''
as $$
  select private.append_feedback_version(
    next_reviewer_id,
    target_submission_id,
    next_body,
    next_grade,
    next_access_unavailable
  );
$$;

revoke all on function private.append_feedback_version(uuid, uuid, text, integer, boolean) from public, anon, authenticated;
revoke all on function public.append_feedback_version(uuid, uuid, text, integer, boolean) from public, anon, authenticated;

grant execute on function private.append_feedback_version(uuid, uuid, text, integer, boolean) to service_role;
grant execute on function public.append_feedback_version(uuid, uuid, text, integer, boolean) to service_role;
