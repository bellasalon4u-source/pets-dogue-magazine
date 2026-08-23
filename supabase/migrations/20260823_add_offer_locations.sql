-- =========================================================
-- PETS & DOGUE
-- OFFER LOCATION SUPPORT
-- =========================================================
--
-- Adds geographic targeting for Club partner offers.
--
-- location_scope:
--
-- country       = valid in one selected country
-- international = online offer available internationally
--
-- Offline offers will use:
-- country_code + country_name + city
--
-- Online offers can use:
-- country
-- OR
-- international
--
-- =========================================================


-- =========================================================
-- 1. ADD LOCATION COLUMNS
-- =========================================================

alter table public.offers
add column if not exists location_scope text;

alter table public.offers
add column if not exists country_code text;

alter table public.offers
add column if not exists country_name text;

alter table public.offers
add column if not exists city text;


-- =========================================================
-- 2. NORMALIZE EXISTING DATA
-- =========================================================
--
-- Existing online offers are treated as international
-- until a more specific country is assigned.
--
-- Existing offline offers are treated as country-based.
-- Their country/city can be filled in during moderation.
-- =========================================================

update public.offers
set location_scope = 'international'
where location_scope is null
and redemption_type = 'online';


update public.offers
set location_scope = 'country'
where location_scope is null
and redemption_type = 'offline';


-- =========================================================
-- 3. DEFAULT FOR NEW ROWS
-- =========================================================

alter table public.offers
alter column location_scope
set default 'country';


-- =========================================================
-- 4. VALID LOCATION SCOPES
-- =========================================================

alter table public.offers
drop constraint if exists offers_location_scope_check;


alter table public.offers
add constraint offers_location_scope_check
check (
  location_scope in (
    'country',
    'international'
  )
);


-- =========================================================
-- 5. COUNTRY CODE FORMAT
-- =========================================================
--
-- ISO 3166-1 alpha-2:
--
-- GB
-- FR
-- DE
-- ES
-- IT
-- US
-- etc.
--
-- NULL remains allowed for:
-- - international online offers
-- - old pending offers awaiting correction
-- =========================================================

alter table public.offers
drop constraint if exists offers_country_code_check;


alter table public.offers
add constraint offers_country_code_check
check (
  country_code is null
  or country_code ~ '^[A-Z]{2}$'
);


-- =========================================================
-- 6. INTERNATIONAL OFFERS MUST BE ONLINE
-- =========================================================

alter table public.offers
drop constraint if exists offers_international_online_check;


alter table public.offers
add constraint offers_international_online_check
check (
  location_scope <> 'international'
  or redemption_type = 'online'
);


-- =========================================================
-- 7. CLEAN LOCATION TEXT
-- =========================================================

update public.offers
set country_code = upper(trim(country_code))
where country_code is not null;


update public.offers
set country_name = trim(country_name)
where country_name is not null;


update public.offers
set city = trim(city)
where city is not null;


-- =========================================================
-- 8. INDEXES FOR FAST LOCATION FILTERING
-- =========================================================

create index if not exists offers_location_scope_idx
on public.offers(location_scope);


create index if not exists offers_country_code_idx
on public.offers(country_code);


create index if not exists offers_city_idx
on public.offers(city);


create index if not exists offers_active_country_idx
on public.offers(status, country_code)
where status = 'active';


create index if not exists offers_active_international_idx
on public.offers(status, location_scope)
where status = 'active'
and location_scope = 'international';


-- =========================================================
-- 9. DOCUMENTATION
-- =========================================================

comment on column public.offers.location_scope is
'PETS & DOGUE offer geography: country or international. International is allowed only for online offers.';


comment on column public.offers.country_code is
'ISO 3166-1 alpha-2 country code, for example GB, FR, DE, ES.';


comment on column public.offers.country_name is
'Human-readable country name selected by the partner.';


comment on column public.offers.city is
'City for local/offline offers. Optional for country-wide online offers.';


-- =========================================================
-- 10. VERIFY
-- =========================================================

select
  column_name,
  data_type,
  column_default
from information_schema.columns
where table_schema = 'public'
and table_name = 'offers'
and column_name in (
  'location_scope',
  'country_code',
  'country_name',
  'city'
)
order by column_name;
