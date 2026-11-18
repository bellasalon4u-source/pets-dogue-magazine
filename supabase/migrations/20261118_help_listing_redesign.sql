begin;

alter table public.help_requests
  add column if not exists photo_urls text[] not null default '{}',
  add column if not exists poster_type text,
  add column if not exists display_name text,
  add column if not exists contact_name text,
  add column if not exists preferred_contact text,
  add column if not exists contact_phone text,
  add column if not exists contact_email text,
  add column if not exists contact_whatsapp text,
  add column if not exists contact_viber text,
  add column if not exists contact_telegram text,
  add column if not exists website_url text,
  add column if not exists facebook_url text,
  add column if not exists instagram_url text,
  add column if not exists publication_consent_accepted_at timestamptz,
  add column if not exists publication_consent_version text;

update public.help_requests
set photo_urls = array[image_url]
where image_url is not null
  and coalesce(cardinality(photo_urls), 0) = 0;

alter table public.help_requests
  drop constraint if exists help_requests_photo_urls_limit_check;

alter table public.help_requests
  add constraint help_requests_photo_urls_limit_check
  check (
    cardinality(photo_urls) <= 5
    and array_position(photo_urls, null) is null
  );

alter table public.help_requests
  drop constraint if exists help_requests_poster_type_check;

alter table public.help_requests
  add constraint help_requests_poster_type_check
  check (
    poster_type is null
    or poster_type in ('person', 'organization')
  );

alter table public.help_requests
  drop constraint if exists help_requests_preferred_contact_check;

alter table public.help_requests
  add constraint help_requests_preferred_contact_check
  check (
    preferred_contact is null
    or preferred_contact in (
      'phone',
      'email',
      'whatsapp',
      'viber',
      'telegram'
    )
  );

comment on column public.help_requests.photo_urls
  is 'Public listing photos. New Help listings may contain up to five HTTPS image URLs.';

comment on column public.help_requests.poster_type
  is 'Whether the listing is posted by a person or an organization.';

comment on column public.help_requests.display_name
  is 'Public display name or organization name shown on the listing.';

comment on column public.help_requests.contact_name
  is 'Optional contact person name for an organization listing.';

comment on column public.help_requests.publication_consent_accepted_at
  is 'Server timestamp recorded when the poster accepts the publication terms.';

comment on column public.help_requests.publication_consent_version
  is 'Version of the publication terms accepted by the poster.';

commit;
