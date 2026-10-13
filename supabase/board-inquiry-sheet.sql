alter table public.board_inquiries
 add column if not exists sheet_synced_at timestamptz,
 add column if not exists sheet_sync_error text;
create index if not exists board_inquiries_sheet_pending_idx
 on public.board_inquiries(created_at) where sheet_synced_at is null;
