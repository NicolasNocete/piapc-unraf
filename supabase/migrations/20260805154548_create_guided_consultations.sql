create table public.guided_conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.guided_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.guided_conversations (id) on delete restrict,
  role text not null check (role in ('user', 'assistant')),
  body text not null check (length(btrim(body)) between 1 and 12000),
  sources jsonb not null default '[]'::jsonb check (jsonb_typeof(sources) = 'array'),
  created_at timestamptz not null default now()
);

create table public.guided_consultation_usage (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete restrict,
  usage_day date not null,
  outcome text not null check (outcome in ('accepted', 'rejected')),
  rejection_category text check (
    rejection_category is null
    or rejection_category in ('academic-private', 'instruction-override', 'unsafe-or-abusive')
  ),
  created_at timestamptz not null default now(),
  check (
    (outcome = 'accepted' and rejection_category is null)
    or (outcome = 'rejected' and rejection_category is not null)
  )
);

create index guided_conversations_user_id_updated_at_idx
  on public.guided_conversations (user_id, updated_at desc);

create index guided_messages_conversation_id_created_at_idx
  on public.guided_messages (conversation_id, created_at);

create index guided_consultation_usage_user_id_usage_day_idx
  on public.guided_consultation_usage (user_id, usage_day);

alter table public.guided_conversations enable row level security;
alter table public.guided_messages enable row level security;
alter table public.guided_consultation_usage enable row level security;

revoke all on table public.guided_conversations from public, anon, authenticated;
revoke all on table public.guided_messages from public, anon, authenticated;
revoke all on table public.guided_consultation_usage from public, anon, authenticated;

grant select on table public.guided_conversations to authenticated;
grant select on table public.guided_messages to authenticated;

create policy "Users can read their guided conversations"
on public.guided_conversations
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Users can read messages from their guided conversations"
on public.guided_messages
for select
to authenticated
using (
  exists (
    select 1
    from public.guided_conversations
    where id = conversation_id
      and user_id = (select auth.uid())
  )
);

create or replace function private.require_guided_consultation_actor()
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  actor uuid := auth.uid();
begin
  if actor is null or not exists (
    select 1
    from public.profiles
    where id = actor
      and first_name is not null
      and last_name is not null
  ) then
    raise exception 'not authorized';
  end if;

  -- Locking the profile row serializes daily quota checks for this user.
  perform 1
  from public.profiles
  where id = actor
  for update;

  return actor;
end;
$$;

create or replace function private.reserve_guided_consultation(
  next_conversation_id uuid,
  next_question text
)
returns table (conversation_id uuid, question_id uuid, remaining integer)
language plpgsql
security definer
set search_path = ''
as $$
declare
  actor uuid;
  target_conversation_id uuid;
  target_question_id uuid;
  target_usage_day date := (now() at time zone 'America/Argentina/Buenos_Aires')::date;
  usage_count integer;
begin
  if length(btrim(next_question)) not between 1 and 2000 then
    raise exception 'invalid question';
  end if;

  actor := private.require_guided_consultation_actor();

  select count(*)
  into usage_count
  from public.guided_consultation_usage
  where user_id = actor
    and guided_consultation_usage.usage_day = target_usage_day;

  if usage_count >= 10 then
    raise exception 'daily limit reached';
  end if;

  if next_conversation_id is null then
    insert into public.guided_conversations (user_id)
    values (actor)
    returning id into target_conversation_id;
  else
    select id
    into target_conversation_id
    from public.guided_conversations
    where id = next_conversation_id
      and user_id = actor;

    if target_conversation_id is null then
      raise exception 'conversation not found';
    end if;
  end if;

  insert into public.guided_messages (conversation_id, role, body)
  values (target_conversation_id, 'user', btrim(next_question))
  returning id into target_question_id;

  insert into public.guided_consultation_usage (user_id, usage_day, outcome)
  values (actor, target_usage_day, 'accepted');

  update public.guided_conversations
  set updated_at = now()
  where id = target_conversation_id;

  return query select target_conversation_id, target_question_id, 9 - usage_count;
end;
$$;

create or replace function private.append_guided_response(
  target_conversation_id uuid,
  target_question_id uuid,
  next_body text,
  next_sources jsonb
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  actor uuid;
  target_response_id uuid;
begin
  if length(btrim(next_body)) not between 1 and 12000
    or jsonb_typeof(next_sources) <> 'array'
  then
    raise exception 'invalid response';
  end if;

  actor := private.require_guided_consultation_actor();

  if not exists (
    select 1
    from public.guided_messages
    join public.guided_conversations
      on guided_conversations.id = guided_messages.conversation_id
    where guided_messages.id = target_question_id
      and guided_messages.conversation_id = target_conversation_id
      and guided_messages.role = 'user'
      and guided_conversations.user_id = actor
  ) then
    raise exception 'conversation not found';
  end if;

  insert into public.guided_messages (conversation_id, role, body, sources)
  values (target_conversation_id, 'assistant', btrim(next_body), next_sources)
  returning id into target_response_id;

  update public.guided_conversations
  set updated_at = now()
  where id = target_conversation_id;

  return target_response_id;
end;
$$;

create or replace function private.reserve_guided_rejection(next_category text)
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  actor uuid;
  target_usage_day date := (now() at time zone 'America/Argentina/Buenos_Aires')::date;
  usage_count integer;
begin
  if next_category not in ('academic-private', 'instruction-override', 'unsafe-or-abusive') then
    raise exception 'invalid rejection';
  end if;

  actor := private.require_guided_consultation_actor();

  select count(*)
  into usage_count
  from public.guided_consultation_usage
  where user_id = actor
    and guided_consultation_usage.usage_day = target_usage_day;

  if usage_count >= 10 then
    raise exception 'daily limit reached';
  end if;

  insert into public.guided_consultation_usage (
    user_id, usage_day, outcome, rejection_category
  ) values (
    actor, target_usage_day, 'rejected', next_category
  );

  return 9 - usage_count;
end;
$$;

create or replace function public.reserve_guided_consultation(
  next_conversation_id uuid,
  next_question text
)
returns table (conversation_id uuid, question_id uuid, remaining integer)
language sql
security invoker
set search_path = ''
as $$
  select * from private.reserve_guided_consultation(next_conversation_id, next_question);
$$;

create or replace function public.append_guided_response(
  target_conversation_id uuid,
  target_question_id uuid,
  next_body text,
  next_sources jsonb
)
returns uuid
language sql
security invoker
set search_path = ''
as $$
  select private.append_guided_response(
    target_conversation_id,
    target_question_id,
    next_body,
    next_sources
  );
$$;

create or replace function public.reserve_guided_rejection(next_category text)
returns integer
language sql
security invoker
set search_path = ''
as $$
  select private.reserve_guided_rejection(next_category);
$$;

revoke all on function private.require_guided_consultation_actor() from public, anon, authenticated;
revoke all on function private.reserve_guided_consultation(uuid, text) from public, anon, authenticated;
revoke all on function private.append_guided_response(uuid, uuid, text, jsonb) from public, anon, authenticated;
revoke all on function private.reserve_guided_rejection(text) from public, anon, authenticated;
revoke all on function public.reserve_guided_consultation(uuid, text) from public, anon, authenticated;
revoke all on function public.append_guided_response(uuid, uuid, text, jsonb) from public, anon, authenticated;
revoke all on function public.reserve_guided_rejection(text) from public, anon, authenticated;

grant usage on schema private to service_role;
grant execute on function private.require_guided_consultation_actor() to service_role;
grant execute on function private.reserve_guided_consultation(uuid, text) to service_role;
grant execute on function private.append_guided_response(uuid, uuid, text, jsonb) to service_role;
grant execute on function private.reserve_guided_rejection(text) to service_role;
grant execute on function public.reserve_guided_consultation(uuid, text) to authenticated, service_role;
grant execute on function public.append_guided_response(uuid, uuid, text, jsonb) to authenticated, service_role;
grant execute on function public.reserve_guided_rejection(text) to authenticated, service_role;
