create table if not exists public.board_gateway_secrets (
 name text primary key, value text not null
);
alter table public.board_gateway_secrets enable row level security;
revoke all on public.board_gateway_secrets from anon, authenticated;
grant all on public.board_gateway_secrets to service_role;
create policy board_gateway_secrets_private on public.board_gateway_secrets
 for all to anon, authenticated using (false) with check (false);
