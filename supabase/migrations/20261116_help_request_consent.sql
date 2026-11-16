alter table public.help_requests
  add column if not exists privacy_policy_accepted_at timestamptz,
  add column if not exists privacy_policy_version text;

comment on column public.help_requests.privacy_policy_accepted_at
  is 'Server timestamp recorded when the requester accepts the Privacy Policy';

comment on column public.help_requests.privacy_policy_version
  is 'Version of the Privacy Policy accepted by the requester';
