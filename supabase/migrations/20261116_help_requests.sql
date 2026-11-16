create extension if not exists pgcrypto;

create table if not exists public.help_requests (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('request', 'free_offer')),
  category text not null check (
    category in (
      'lost_found',
      'veterinary',
      'food',
      'temporary_home',
      'adoption',
      'volunteers',
      'free_items',
      'other'
    )
  ),
  animal_type text not null check (
    animal_type in ('dog', 'cat', 'bird', 'rabbit', 'small_pet', 'reptile', 'other')
  ),
  title text not null check (char_length(title) between 3 and 120),
  description text not null check (char_length(description) between 10 and 2500),
  location_label text not null check (char_length(location_label) between 2 and 180),
  latitude double precision not null check (latitude between -90 and 90),
  longitude double precision not null check (longitude between -180 and 180),
  food_expiry date,
  food_sealed boolean not null default false,
  image_url text check (image_url is null or image_url ~ '^https://'),
  status text not null default 'pending' check (
    status in ('pending', 'approved', 'resolved', 'rejected')
  ),
  created_by uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint help_food_offers_must_be_safe check (
    not (kind = 'free_offer' and category = 'food')
    or (food_sealed = true and food_expiry is not null)
  ),
  constraint help_free_goods_are_offers check (
    category <> 'free_items' or kind = 'free_offer'
  )
);

create index if not exists help_requests_public_feed_idx
  on public.help_requests (status, created_at desc);

create index if not exists help_requests_filter_idx
  on public.help_requests (category, animal_type, kind, status);

create index if not exists help_requests_location_idx
  on public.help_requests (latitude, longitude);

alter table public.help_requests enable row level security;

create or replace function public.set_help_requests_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists help_requests_set_updated_at on public.help_requests;
create trigger help_requests_set_updated_at
  before update on public.help_requests
  for each row
  execute function public.set_help_requests_updated_at();

grant select on public.help_requests to anon, authenticated;
grant insert (
  kind,
  category,
  animal_type,
  title,
  description,
  location_label,
  latitude,
  longitude,
  food_expiry,
  food_sealed,
  image_url,
  status,
  created_by
) on public.help_requests to authenticated;
grant update (title, description, location_label, food_expiry, food_sealed, image_url, status)
  on public.help_requests to authenticated;

drop policy if exists "Public can read approved help requests" on public.help_requests;
create policy "Public can read approved help requests"
  on public.help_requests
  for select
  to anon, authenticated
  using (
    status = 'approved'
    and (
      not (kind = 'free_offer' and category = 'food')
      or food_expiry >= current_date
    )
  );

drop policy if exists "Owners can read their help requests" on public.help_requests;
create policy "Owners can read their help requests"
  on public.help_requests
  for select
  to authenticated
  using (created_by = auth.uid());

drop policy if exists "Signed-in users can submit pending help requests" on public.help_requests;
create policy "Signed-in users can submit pending help requests"
  on public.help_requests
  for insert
  to authenticated
  with check (
    created_by = auth.uid()
    and status = 'pending'
    and (
      not (kind = 'free_offer' and category = 'food')
      or (food_sealed = true and food_expiry is not null and food_expiry >= current_date)
    )
  );

drop policy if exists "Owners can update their pending help requests" on public.help_requests;
create policy "Owners can update their pending help requests"
  on public.help_requests
  for update
  to authenticated
  using (created_by = auth.uid() and status = 'pending')
  with check (created_by = auth.uid() and status = 'pending');

drop policy if exists "Admins can moderate help requests" on public.help_requests;
create policy "Admins can moderate help requests"
  on public.help_requests
  for update
  to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
