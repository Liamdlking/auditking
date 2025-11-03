
-- Minimal schema to support admin checks
create table if not exists profiles (
  user_id uuid primary key,
  is_admin boolean not null default false,
  is_banned boolean not null default false,
  created_at timestamp with time zone default now()
);
alter table profiles enable row level security;
create policy "profiles readable by user" on profiles
  for select using (auth.uid() = user_id);
-- Seed your own user as admin after first login:
-- insert into profiles (user_id, is_admin) values ('<YOUR-UID>', true)
