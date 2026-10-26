create table if not exists public.community_posts (
  id uuid primary key default gen_random_uuid(),
  category text not null check (
    category in (
      'lost', 'seen', 'found', 'event', 'group',
      'help', 'volunteers', 'foster', 'adoption', 'news'
    )
  ),
  title text not null check (char_length(title) between 1 and 120),
  description text not null check (char_length(description) between 1 and 2500),
  location text not null check (char_length(location) between 1 and 180),
  event_start timestamptz,
  latitude double precision check (latitude between -90 and 90),
  longitude double precision check (longitude between -180 and 180),
  media_type text not null default 'none'
    check (media_type in ('none', 'photo', 'video')),
  media_path text,
  submitted_by uuid references auth.users(id) on delete set null,
  status text not null default 'pending'
    check (status in ('pending', 'published', 'rejected')),
  created_at timestamptz not null default now()
);

alter table public.community_posts enable row level security;

grant select on public.community_posts to anon, authenticated;
grant insert (
  category, title, description, location, event_start,
  latitude, longitude, media_type, media_path, submitted_by
) on public.community_posts to anon, authenticated;
grant update, delete on public.community_posts to authenticated;

drop policy if exists "Anyone can read published community posts"
  on public.community_posts;
create policy "Anyone can read published community posts"
  on public.community_posts
  for select
  to anon, authenticated
  using (status = 'published');

drop policy if exists "Anyone can submit pending community posts"
  on public.community_posts;
create policy "Anyone can submit pending community posts"
  on public.community_posts
  for insert
  to anon, authenticated
  with check (
    status = 'pending'
    and (submitted_by is null or submitted_by = auth.uid())
  );

drop policy if exists "Admins can read all community posts"
  on public.community_posts;
create policy "Admins can read all community posts"
  on public.community_posts
  for select
  to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Admins can update community posts"
  on public.community_posts;
create policy "Admins can update community posts"
  on public.community_posts
  for update
  to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Admins can delete community posts"
  on public.community_posts;
create policy "Admins can delete community posts"
  on public.community_posts
  for delete
  to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
