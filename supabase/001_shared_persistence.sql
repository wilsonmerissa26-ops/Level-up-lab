-- Level-Up shared learner-state persistence
-- Apply inside the private Supabase project used for the Level-Up pilot.
-- Never use a service-role key in the browser.

create table if not exists public.level_up_learner_state (
  owner_id uuid not null default auth.uid(),
  learner_id text not null,
  state_revision bigint not null check (state_revision > 0),
  state_json jsonb not null,
  updated_at timestamptz not null default now(),
  primary key (owner_id, learner_id)
);

alter table public.level_up_learner_state enable row level security;

drop policy if exists "level_up_owner_select" on public.level_up_learner_state;
create policy "level_up_owner_select"
on public.level_up_learner_state
for select
to authenticated
using (owner_id = auth.uid());

drop policy if exists "level_up_owner_insert" on public.level_up_learner_state;
create policy "level_up_owner_insert"
on public.level_up_learner_state
for insert
to authenticated
with check (owner_id = auth.uid());

drop policy if exists "level_up_owner_update" on public.level_up_learner_state;
create policy "level_up_owner_update"
on public.level_up_learner_state
for update
to authenticated
using (owner_id = auth.uid())
with check (owner_id = auth.uid());

create or replace function public.level_up_save_learner_state(
  p_learner_id text,
  p_expected_revision bigint,
  p_state_revision bigint,
  p_state_json jsonb
)
returns table (
  learner_id text,
  state_revision bigint,
  updated_at timestamptz
)
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  v_owner uuid := auth.uid();
  v_current bigint;
begin
  if v_owner is null then
    raise exception 'AUTH_REQUIRED';
  end if;

  if coalesce(trim(p_learner_id), '') = '' then
    raise exception 'LEARNER_ID_REQUIRED';
  end if;

  if p_expected_revision is null or p_expected_revision < 0 then
    raise exception 'EXPECTED_REVISION_INVALID';
  end if;

  if p_state_revision is null or p_state_revision < 1 then
    raise exception 'STATE_REVISION_INVALID';
  end if;

  select s.state_revision
    into v_current
    from public.level_up_learner_state s
   where s.owner_id = v_owner
     and s.learner_id = p_learner_id
   for update;

  if found then
    if v_current <> p_expected_revision then
      raise exception 'REVISION_CONFLICT expected %, found %', p_expected_revision, v_current;
    end if;
    if p_state_revision <= v_current then
      raise exception 'REVISION_NOT_ADVANCING';
    end if;

    update public.level_up_learner_state s
       set state_revision = p_state_revision,
           state_json = p_state_json,
           updated_at = now()
     where s.owner_id = v_owner
       and s.learner_id = p_learner_id;
  else
    if p_expected_revision <> 0 then
      raise exception 'REVISION_CONFLICT expected %, found 0', p_expected_revision;
    end if;

    insert into public.level_up_learner_state(owner_id, learner_id, state_revision, state_json)
    values (v_owner, p_learner_id, p_state_revision, p_state_json);
  end if;

  return query
  select s.learner_id, s.state_revision, s.updated_at
    from public.level_up_learner_state s
   where s.owner_id = v_owner
     and s.learner_id = p_learner_id;
end;
$$;

revoke all on function public.level_up_save_learner_state(text,bigint,bigint,jsonb) from public;
grant execute on function public.level_up_save_learner_state(text,bigint,bigint,jsonb) to authenticated;
