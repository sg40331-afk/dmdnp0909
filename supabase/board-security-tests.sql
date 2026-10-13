begin;
insert into public.board_inquiries(receipt,password_hash,name,contact,product,title,message) values('test-security-only','test-hash','Test','0000000000','기타','Private policy test','Private test content');
insert into public.board_entries(kind,slug,title,published,published_at) values
 ('notices','test-public-policy','Policy test public',true,now()-interval '1 day'),
 ('notices','test-draft-policy','Policy test draft',false,now()),
 ('notices','test-future-policy','Policy test future',true,now()+interval '1 day');
set local role anon;
do $$ begin
 if (select count(*) from public.board_entries where slug like 'test-%-policy') <> 1 then raise exception 'Anonymous publication isolation failed'; end if;
 begin
  perform id from public.board_inquiries;
  raise exception 'Anonymous inquiry read allowed';
 exception when insufficient_privilege then null; end;
 begin
  insert into public.board_entries(kind,slug,title) values('notices','test-unapproved-write','Forbidden');
  raise exception 'Anonymous content write allowed';
 exception when insufficient_privilege then null; end;
end $$;
reset role;
set local role authenticated;
do $$ begin
 if (select count(*) from public.board_inquiries) <> 0 then raise exception 'Unapproved inquiry read allowed'; end if;
 if (select count(*) from public.board_entries where slug like 'test-%-policy') <> 1 then raise exception 'Unapproved draft read allowed'; end if;
 begin
  insert into public.board_entries(kind,slug,title) values('notices','test-unapproved-write','Forbidden');
  raise exception 'Unapproved content write allowed';
 exception when insufficient_privilege then null; end;
 begin
  insert into public.board_admins(user_id) values(gen_random_uuid());
  raise exception 'Self approval allowed';
 exception when insufficient_privilege then null; end;
 begin
  perform public.board_rate_limit('forbidden',1);
  raise exception 'Direct rate limiter call allowed';
 exception when insufficient_privilege then null; end;
end $$;
reset role;
rollback;
