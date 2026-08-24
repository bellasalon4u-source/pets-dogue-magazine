begin;

create extension if not exists pgcrypto;

create table if not exists public.cover_star_candidates (
  id uuid primary key default gen_random_uuid(),

  name text not null,
  species text not null,
  breed text,

  image_url text not null,

  preview text,
  story text,

  status text not null default 'active'
    check (
      status in (
        'draft',
        'active',
        'paused',
        'winner',
        'archived'
      )
    ),

  display_order integer not null default 0,

  voting_starts_at timestamptz,
  voting_ends_at timestamptz,

  votes_count bigint not null default 0
    check (votes_count >= 0),

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.cover_star_votes (
  id uuid primary key default gen_random_uuid(),

  candidate_id uuid not null
    references public.cover_star_candidates(id)
    on delete cascade,

  voter_hash text not null,

  created_at timestamptz not null default now(),

  unique(candidate_id, voter_hash)
);

/*
=========================================================
UPDATED_AT
=========================================================
*/

create or replace function public.set_cover_star_updated_at()
returns trigger
language plpgsql
as $$
begin

  new.updated_at = now();

  return new;

end;
$$;

drop trigger if exists cover_star_candidates_updated_at
on public.cover_star_candidates;

create trigger cover_star_candidates_updated_at
before update
on public.cover_star_candidates
for each row
execute function public.set_cover_star_updated_at();

/*
=========================================================
VOTE COUNT FUNCTION
=========================================================

The counter is maintained from real vote rows.

The API will insert one row into cover_star_votes.

If the same voter tries to vote for the same candidate
again, the unique constraint blocks the duplicate.
=========================================================
*/

create or replace function public.refresh_cover_star_vote_count()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  target_candidate uuid;
begin

  target_candidate =
    coalesce(
      new.candidate_id,
      old.candidate_id
    );

  update public.cover_star_candidates
  set
    votes_count = (
      select count(*)
      from public.cover_star_votes
      where candidate_id = target_candidate
    ),
    updated_at = now()
  where id = target_candidate;

  return coalesce(new, old);

end;
$$;

drop trigger if exists cover_star_vote_count_after_insert
on public.cover_star_votes;

create trigger cover_star_vote_count_after_insert
after insert
on public.cover_star_votes
for each row
execute function public.refresh_cover_star_vote_count();

drop trigger if exists cover_star_vote_count_after_delete
on public.cover_star_votes;

create trigger cover_star_vote_count_after_delete
after delete
on public.cover_star_votes
for each row
execute function public.refresh_cover_star_vote_count();

/*
=========================================================
INDEXES
=========================================================
*/

create index if not exists
cover_star_candidates_status_idx
on public.cover_star_candidates(status);

create index if not exists
cover_star_candidates_order_idx
on public.cover_star_candidates(
  status,
  display_order,
  created_at
);

create index if not exists
cover_star_candidates_vote_window_idx
on public.cover_star_candidates(
  voting_starts_at,
  voting_ends_at
);

create index if not exists
cover_star_candidates_votes_idx
on public.cover_star_candidates(
  votes_count desc
);

create index if not exists
cover_star_votes_candidate_idx
on public.cover_star_votes(candidate_id);

create index if not exists
cover_star_votes_created_idx
on public.cover_star_votes(created_at);

/*
=========================================================
ROW LEVEL SECURITY
=========================================================

No direct browser access.

The website will use Vercel server endpoints with
SUPABASE_SECRET_KEY.

This prevents users from directly changing:
- votes_count
- candidate status
- candidate details
- vote rows
=========================================================
*/

alter table public.cover_star_candidates
enable row level security;

alter table public.cover_star_votes
enable row level security;

drop policy if exists
"Public read cover star candidates"
on public.cover_star_candidates;

drop policy if exists
"Public insert cover star votes"
on public.cover_star_votes;

drop policy if exists
"Anyone can vote cover star"
on public.cover_star_votes;

revoke all
on table public.cover_star_candidates
from anon;

revoke all
on table public.cover_star_candidates
from authenticated;

revoke all
on table public.cover_star_votes
from anon;

revoke all
on table public.cover_star_votes
from authenticated;

/*
=========================================================
INITIAL PETS & DOGUE CANDIDATES
=========================================================

These are starter records so the redesigned
members-gallery.html can immediately receive real IDs
and global vote totals from Supabase.

Later the admin/contest workflow can replace them with
real submitted pets.
=========================================================
*/

insert into public.cover_star_candidates (
  name,
  species,
  breed,
  image_url,
  preview,
  story,
  status,
  display_order,
  voting_starts_at,
  voting_ends_at
)
select
  'Bella',
  'Dog',
  'Pomeranian',
  'https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?auto=format&fit=crop&w=1300&q=88',
  'Small in size, enormous in personality.',
  'Bella is happiest when every person in the room becomes her friend. Curious, expressive and endlessly affectionate, she brings a little theatre everywhere she goes.',
  'active',
  1,
  now(),
  now() + interval '30 days'
where not exists (
  select 1
  from public.cover_star_candidates
  where lower(name) = 'bella'
    and status in ('active','paused')
);

insert into public.cover_star_candidates (
  name,
  species,
  breed,
  image_url,
  preview,
  story,
  status,
  display_order,
  voting_starts_at,
  voting_ends_at
)
select
  'Oliver',
  'Cat',
  'British Shorthair',
  'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=1300&q=88',
  'Quiet elegance with a very independent point of view.',
  'Oliver has perfected the art of appearing completely relaxed while noticing absolutely everything. His family describes him as calm, loyal and surprisingly funny.',
  'active',
  2,
  now(),
  now() + interval '30 days'
where not exists (
  select 1
  from public.cover_star_candidates
  where lower(name) = 'oliver'
    and status in ('active','paused')
);

insert into public.cover_star_candidates (
  name,
  species,
  breed,
  image_url,
  preview,
  story,
  status,
  display_order,
  voting_starts_at,
  voting_ends_at
)
select
  'Milo',
  'Dog',
  'French Bulldog',
  'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1300&q=88',
  'A playful city dog with impeccable confidence.',
  'Milo loves people, cafés and any walk that ends somewhere interesting. His bold expression and gentle temperament make him impossible to overlook.',
  'active',
  3,
  now(),
  now() + interval '30 days'
where not exists (
  select 1
  from public.cover_star_candidates
  where lower(name) = 'milo'
    and status in ('active','paused')
);

insert into public.cover_star_candidates (
  name,
  species,
  breed,
  image_url,
  preview,
  story,
  status,
  display_order,
  voting_starts_at,
  voting_ends_at
)
select
  'Rio',
  'Bird',
  'Green Parrot',
  'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=1300&q=88',
  'Colour, curiosity and plenty of opinions.',
  'Rio is sociable, clever and fascinated by everything his family does. He has a remarkable ability to turn an ordinary morning into an event.',
  'active',
  4,
  now(),
  now() + interval '30 days'
where not exists (
  select 1
  from public.cover_star_candidates
  where lower(name) = 'rio'
    and status in ('active','paused')
);

/*
=========================================================
FINAL SAFETY SYNC
=========================================================
*/

update public.cover_star_candidates c
set votes_count = (
  select count(*)
  from public.cover_star_votes v
  where v.candidate_id = c.id
);

/*
=========================================================
VERIFY
=========================================================
*/

commit;

select
  id,
  name,
  species,
  breed,
  status,
  display_order,
  votes_count,
  voting_starts_at,
  voting_ends_at
from public.cover_star_candidates
order by
  display_order asc,
  created_at asc;
