# 대명DnP 게시판 운영

소스: 구글드라이브 `대명DnP/2.github`.

관리자 주소는 `/admin`입니다. 기존 `/admin/blog`는 여기로 연결됩니다.
Supabase Auth 계정과 `board_admins`에 승인된 사용자만 관리할 수 있습니다.
공개 회원가입으로는 관리자 권한을 얻을 수 없습니다.

## 서버 설정

Vercel 프로젝트 `dmdnp0909`의 Production 및 Preview에 다음 환경변수를 설정합니다.

- `SUPABASE_URL`: 대명DnP 프로젝트 API URL
- `SUPABASE_PUBLISHABLE_KEY`: 해당 프로젝트의 publishable key
- `SUPABASE_SERVICE_ROLE_KEY`: 해당 프로젝트의 서버용 secret 또는 service_role key
- `INQUIRY_RATE_SECRET`: 무작위 32바이트 이상의 서버 보안값

모든 값은 서버에서 사용하며, 키를 Git이나 브라우저 코드에 넣지 않습니다.
환경변수를 설정한 후 새로 배포해야 반영됩니다.

## 관리자 승인

Authentication → Users에서 `sg40331@gmail.com` 사용자를 비밀번호와 함께 생성한 뒤,
다음 SQL로 해당 사용자만 승인합니다.

```sql
insert into public.board_admins(user_id)
select id from auth.users where email='sg40331@gmail.com'
on conflict(user_id) do nothing;
```

## 사용

- 고객지원: 견적 문의 작성 및 접수번호·비밀번호 조회, 자료실 다운로드, 공지, FAQ.
- 관리자: 문의 선택 후 상태·답변 저장. 각 게시판에서 새 글, 초안 저장, 게시, 수정, 삭제.
- 첨부: 글을 먼저 저장한 뒤 JPG·PNG·WEBP·PDF 파일을 업로드. 파일별 4MB, 글별 최대 10개.
- 게시일이 미래인 글은 게시일 이후 공개됩니다. 기존 글의 주소 ID는 유지됩니다.
- 기존 게시물 가져오기는 중복을 건너뜁니다. 브라우저 초안 가져오기는 검토 후 수동 게시합니다.
- 문의 개인정보·첨부파일은 비공개입니다. 문의 비밀번호는 해시로 저장합니다.
- 관리자는 상담 종료 후 1년이 지난 문의를 문의 삭제 기능으로 정리합니다. 첨부파일도 함께 삭제됩니다.

## 검증

`supabase/board-schema.sql`은 초기 스키마이며 새 프로젝트에만 적용합니다.
`supabase/board-security-tests.sql`은 트랜잭션 내에서 검사하고 테스트 자료를 롤백합니다.
`tests/board-smoke.mjs`는 Playwright가 설치된 검증 환경에서 실행합니다.
서비스 키와 관리자 계정이 없으면 실제 문의 접수·관리자 답변의 전체 검증을 완료할 수 없습니다.

## 배포 전 확인

- 관리자 로그인 → 초안 저장 → 공개 게시 → 목록·상세 확인 → 수정·삭제.
- 문의 접수 → 첨부 업로드 → 접수번호·비밀번호 조회 → 관리자 답변 → 고객 답변 확인.
- 다른 접수번호·틀린 비밀번호·미승인 계정으로 비공개 자료 접근이 차단되는지 확인.
- 테스트 글·문의·첨부파일을 검증 후 관리자에서 삭제.
- 파일 보안값은 채팅에 보내지 않고 Vercel 설정에 입력.
