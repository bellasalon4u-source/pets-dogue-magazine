begin;

alter table public.help_requests
  drop constraint if exists help_requests_category_check;

alter table public.help_requests
  add constraint help_requests_category_check
  check (
    category in (
      'lost_found',
      'veterinary',
      'food',
      'temporary_home',
      'adoption',
      'volunteers',
      'transport',
      'free_items',
      'other',
      'pet_walking_sitting'
    )
  );

commit;
