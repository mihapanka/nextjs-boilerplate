create extension if not exists pgcrypto;

create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  class_type text not null check (class_type in ('A', 'B', 'NY')),
  status text not null default 'új jelentkezés' check (
    status in (
      'új jelentkezés',
      'visszaigazolva',
      'hiányos adat',
      'beiratkozásra vár',
      'beiratkozott',
      'lemondta',
      'várólista'
    )
  ),
  student_name text not null,
  student_email text not null,
  student_phone text not null default '',
  guardian_name text not null,
  guardian_email text not null,
  guardian_phone text not null,
  food_allergy text not null default '',
  health_note text not null default '',
  other_note text not null default '',
  consent_privacy boolean not null,
  consent_parent boolean not null,
  consent_photo_video boolean not null default false,
  organizer_notes text not null default '',
  enrolled boolean not null default false
);

create or replace function public.set_registrations_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists registrations_set_updated_at on public.registrations;

create trigger registrations_set_updated_at
before update on public.registrations
for each row
execute function public.set_registrations_updated_at();

alter table public.registrations enable row level security;

drop policy if exists "Public read registrations" on public.registrations;
create policy "Public read registrations"
on public.registrations
for select
using (true);

drop policy if exists "Public insert registrations" on public.registrations;
create policy "Public insert registrations"
on public.registrations
for insert
with check (true);

drop policy if exists "Public update registrations" on public.registrations;
create policy "Public update registrations"
on public.registrations
for update
using (true)
with check (true);
