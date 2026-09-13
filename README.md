# 대명DnP 홈페이지

Next.js 기반의 대명DnP 공식 홈페이지입니다. 기존 프로젝트 구조를 유지하면서 회사소개, 제품안내, 제작사례, 제작과정, 블로그, FAQ, 문의 페이지를 다페이지 구조로 구성했습니다.

## 주요 경로

- `/` 홈
- `/company` 회사 개요
- `/company/greeting` 대표 인사말
- `/company/history` 주요 연혁
- `/company/business` 제작 분야
- `/company/facilities` 장비·시설
- `/company/quality` 품질관리
- `/company/location` 오시는 길
- `/products` 제품안내
- `/products/[slug]` 제품 상세
- `/portfolio` 제작사례
- `/portfolio/[slug]` 제작사례 상세
- `/process` 제작과정
- `/blog` 블로그
- `/blog/[slug]` 블로그 상세
- `/faq` 자주 묻는 질문
- `/contact` 문의하기

## 데이터 관리

회사 정보, 제품 목록, 제작사례, FAQ, 블로그 글은 `lib/dmdnp-data.ts`에서 관리합니다. 회사소개 하위 메뉴, 연혁, 제작 분야, 보유 장비, 품질관리 단계, 오시는 길 표시는 `lib/company-data.ts`에서 관리합니다. 전화번호, 이메일, 카카오톡 주소, 상세 주소, 사업자등록번호, 운영시간, SNS 주소는 확인 후 같은 파일에서 교체하세요.

## 지도 연결

`/company/location` 지도 영역은 현재 교체용 안내 영역입니다. 네이버지도, 카카오맵 또는 구글지도 링크가 확정되면 `lib/dmdnp-data.ts` 또는 `lib/company-data.ts`에 링크를 추가하고 새 창으로 열리도록 연결하세요. 지도 API 키가 필요한 방식은 환경변수와 지도 SDK 설정이 추가로 필요합니다.

## 문의 폼

현재 문의 폼은 화면 구성만 제공하며 실제 전송 서비스에 연결되어 있지 않습니다. 실제 문의 수신을 위해 이메일 API, 폼 서비스, 서버 액션, 또는 별도 백엔드 연결이 필요합니다.

## 확인 명령

```bash
npm run build
npm run lint
```
