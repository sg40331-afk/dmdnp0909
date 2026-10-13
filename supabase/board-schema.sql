begin;
create table public.board_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.board_admins enable row level security;
revoke all on public.board_admins from anon, authenticated;
grant select on public.board_admins to authenticated;
grant all on public.board_admins to service_role;
create policy "admin reads own membership" on public.board_admins for select to authenticated using (user_id = (select auth.uid()));

create table public.board_entries (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('blog','portfolio','resources','faq','notices')),
  slug text not null check (slug ~ '^[a-z0-9][a-z0-9-]{1,119}$'),
  title text not null check (length(title) between 1 and 200),
  category text not null default '', summary text not null default '',
  body jsonb not null default '[]', payload jsonb not null default '{}',
  published boolean not null default false, pinned boolean not null default false,
  sort_order integer not null default 0,
  published_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  unique(kind,slug), check (jsonb_typeof(body) = 'array')
);
create index board_entries_public_idx on public.board_entries(kind,published,published_at desc);
alter table public.board_entries enable row level security;
revoke all on public.board_entries from anon, authenticated;
grant select on public.board_entries to anon;
grant select, insert, update, delete on public.board_entries to authenticated;
grant all on public.board_entries to service_role;
create policy "public reads published content" on public.board_entries for select to anon, authenticated using (published and published_at <= now());
create policy "approved admins manage content" on public.board_entries for all to authenticated
 using (exists(select 1 from public.board_admins where user_id=(select auth.uid())))
 with check (exists(select 1 from public.board_admins where user_id=(select auth.uid())));

create table public.board_inquiries (
  id uuid primary key default gen_random_uuid(), receipt text not null unique,
  password_hash text not null, name text not null, contact text not null, product text not null,
  title text not null, message text not null, size text not null default '', quantity text not null default '',
  location text not null default '', desired_date text not null default '',
  status text not null default 'received' check(status in ('received','reviewing','answered')),
  answer text not null default '', created_at timestamptz not null default now(),
  consent_at timestamptz not null default now()
);
create index board_inquiries_date_idx on public.board_inquiries(created_at desc);
alter table public.board_inquiries enable row level security;
revoke all on public.board_inquiries from anon, authenticated;
grant select, update, delete on public.board_inquiries to authenticated;
grant all on public.board_inquiries to service_role;
create policy "approved admins read inquiries" on public.board_inquiries for select to authenticated using (exists(select 1 from public.board_admins where user_id=(select auth.uid())));
create policy "approved admins answer inquiries" on public.board_inquiries for update to authenticated using (exists(select 1 from public.board_admins where user_id=(select auth.uid()))) with check(exists(select 1 from public.board_admins where user_id=(select auth.uid())));
create policy "approved admins delete inquiries" on public.board_inquiries for delete to authenticated using (exists(select 1 from public.board_admins where user_id=(select auth.uid())));

create table public.board_files (
  id uuid primary key default gen_random_uuid(),
  entry_id uuid references public.board_entries(id) on delete cascade,
  inquiry_id uuid references public.board_inquiries(id) on delete cascade,
  path text not null unique, name text not null, mime text not null,
  size integer not null check(size>0 and size<=4194304),
  created_at timestamptz not null default now(),
  check ((entry_id is null) <> (inquiry_id is null))
);
create index board_files_entry_idx on public.board_files(entry_id);
create index board_files_inquiry_idx on public.board_files(inquiry_id);
alter table public.board_files enable row level security;
revoke all on public.board_files from anon, authenticated;
grant select on public.board_files to anon;
grant select, delete on public.board_files to authenticated;
grant all on public.board_files to service_role;
create policy "public reads published file metadata" on public.board_files for select to anon, authenticated using (entry_id is not null and exists(select 1 from public.board_entries e where e.id=entry_id and e.published and e.published_at<=now()));
create policy "approved admins read files" on public.board_files for select to authenticated using(exists(select 1 from public.board_admins where user_id=(select auth.uid())));
create policy "approved admins delete files" on public.board_files for delete to authenticated using(exists(select 1 from public.board_admins where user_id=(select auth.uid())));

create table public.board_rate_limits (key text primary key, requests integer not null, expires_at timestamptz not null);
alter table public.board_rate_limits enable row level security;
revoke all on public.board_rate_limits from anon, authenticated;
grant all on public.board_rate_limits to service_role;
create policy "block direct rate limit access" on public.board_rate_limits for all to anon, authenticated using(false) with check(false);
create function public.board_rate_limit(bucket_key text, maximum integer) returns boolean language plpgsql security invoker set search_path='' as $$
declare hits integer;
begin
  delete from public.board_rate_limits where expires_at < now()-interval '1 hour';
  insert into public.board_rate_limits as r (key,requests,expires_at) values(bucket_key,1,now()+interval '15 minutes')
  on conflict(key) do update set requests=case when r.expires_at<=now() then 1 else r.requests+1 end,
  expires_at=case when r.expires_at<=now() then now()+interval '15 minutes' else r.expires_at end returning requests into hits;
  return hits<=maximum;
end $$;
revoke all on function public.board_rate_limit(text,integer) from public,anon,authenticated;
grant execute on function public.board_rate_limit(text,integer) to service_role;

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
 values('board-assets','board-assets',false,4194304,array['image/jpeg','image/png','image/webp','application/pdf']);
-- Private objects are served only through the server after entry or inquiry authorization.
commit;
