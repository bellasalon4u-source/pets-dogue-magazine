alter table public.community_posts
  add column if not exists animal_types text[]
  not null default '{}';

grant insert (
  category,
  title,
  description,
  location,
  event_start,
  latitude,
  longitude,
  media_type,
  media_path,
  submitted_by,
  animal_types
) on public.community_posts to anon, authenticated;
