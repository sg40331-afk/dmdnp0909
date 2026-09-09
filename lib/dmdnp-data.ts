export const siteUrl = "https://dmdnp.co.kr";

export const company = {
  name: "대명DnP",
  representative: "이태윤",
  since: "2002년",
  region: "인천광역시 남동구",
  serviceArea: "인천 및 수도권",
  domain: "dmdnp.co.kr",
  address: "[추후 입력: 인천광역시 남동구 상세 주소]",
  phone: "[추후 입력: 전화번호]",
  email: "[추후 입력: 이메일]",
  kakao: "[추후 입력: 카카오톡 상담 주소]",
  hours: "[추후 입력: 운영시간]",
  businessNumber: "[추후 입력: 사업자등록번호]",
  sns: "[추후 입력: SNS 주소]",
};

export const navItems = [
  { href: "/company", label: "회사소개" },
  { href: "/products", label: "제품안내" },
  { href: "/portfolio", label: "제작사례" },
  { href: "/process", label: "제작과정" },
  { href: "/blog", label: "블로그" },
  { href: "/contact", label: "문의하기" },
];

export const productCategories = ["나무현판", "아크릴", "LED 전광판", "UV인쇄", "실사출력", "촉지도·안내판"];

export const products = [
  {
    slug: "wood-sign-menu",
    name: "나무현판·메뉴판",
    category: "나무현판",
    summary: "원목의 질감과 브랜드 분위기를 살린 현판, 메뉴판, 매장 사인입니다.",
    uses: ["카페", "음식점", "공방", "숙박업소", "브랜드 매장"],
    materials: ["원목", "합판", "우드 필름", "무광 코팅", "각인 및 UV 인쇄"],
    custom: ["문구", "크기", "두께", "마감", "걸이 방식"],
    period: "사양과 수량 확인 후 안내합니다.",
  },
  {
    slug: "acrylic-sign",
    name: "아크릴 안내판",
    category: "아크릴",
    summary: "투명, 컬러, 포맥스 조합으로 제작하는 회의실, 사무실, 건물 안내 사인입니다.",
    uses: ["회사", "병원", "학교", "상가", "관공서"],
    materials: ["투명 아크릴", "컬러 아크릴", "포맥스", "스테인리스 부속", "실사 출력"],
    custom: ["판 크기", "두께", "타공", "스탠드오프", "벽부착 방식"],
    period: "디자인 확정 후 제작 기간을 안내합니다.",
  },
  {
    slug: "led-display",
    name: "LED 전광판",
    category: "LED 전광판",
    summary: "매장 홍보, 공지, 안내 문구를 선명하게 보여주는 LED 전광판입니다.",
    uses: ["매장", "학원", "병원", "행사장", "공장"],
    materials: ["LED 모듈", "컨트롤러", "프레임", "전원장치", "보호 커버"],
    custom: ["규격", "색상", "해상도", "설치 위치", "문구 운영 방식"],
    period: "설치 환경 확인 후 일정과 제작 방식을 안내합니다.",
  },
  {
    slug: "uv-flatbed-print",
    name: "UV 평판인쇄",
    category: "UV인쇄",
    summary: "아크릴, 금속, 목재, 포맥스 등 다양한 소재 위에 직접 출력합니다.",
    uses: ["제품 샘플", "안내판", "패널", "기념품", "전시물"],
    materials: ["아크릴", "금속", "목재", "포맥스", "PVC"],
    custom: ["소재", "인쇄 영역", "화이트 잉크", "후가공", "수량"],
    period: "소재 수급과 출력 범위 확인 후 안내합니다.",
  },
  {
    slug: "banner-large-print",
    name: "실사출력·현수막",
    category: "실사출력",
    summary: "홍보물, 배너, 현수막, 대형 출력물을 용도에 맞게 제작합니다.",
    uses: ["행사", "전시", "매장 홍보", "분양 홍보", "단기 안내"],
    materials: ["현수막 원단", "PET", "켈지", "배너 거치대", "라미네이팅"],
    custom: ["폭과 높이", "후가공", "아일렛", "거치대", "설치 여부"],
    period: "파일 상태와 수량에 따라 안내합니다.",
  },
  {
    slug: "braille-tactile-map",
    name: "촉지도·점자안내판",
    category: "촉지도·안내판",
    summary: "공공시설과 건물 이용자를 위한 촉지도, 점자 안내판, 종합안내판입니다.",
    uses: ["관공서", "학교", "병원", "공공시설", "복지시설"],
    materials: ["아크릴", "점자 부속", "스테인리스", "UV 인쇄", "양각 가공"],
    custom: ["평면도", "점자 표기", "설치 높이", "규격", "법정 기준 확인"],
    period: "도면과 표기 내용을 확인한 뒤 안내합니다.",
  },
  {
    slug: "metal-factory-sign",
    name: "금속·공장 안내판",
    category: "UV인쇄",
    summary: "공장, 창고, 건설현장에 필요한 안전표지와 금속 안내판입니다.",
    uses: ["공장", "건설현장", "물류창고", "설비실", "주차장"],
    materials: ["알루미늄", "스테인리스", "포맥스", "반사 시트", "UV 인쇄"],
    custom: ["문구", "규격", "내후성", "부착 방식", "수량"],
    period: "현장 환경과 수량 확인 후 안내합니다.",
  },
  {
    slug: "indoor-outdoor-sign",
    name: "실내외 사인물",
    category: "아크릴",
    summary: "브랜드 노출과 공간 안내를 위한 실내외 맞춤 사인물입니다.",
    uses: ["사무실", "상가", "쇼룸", "전시장", "매장"],
    materials: ["아크릴", "금속", "포맥스", "시트", "조명 부품"],
    custom: ["디자인", "크기", "소재", "설치 방식", "후가공"],
    period: "상담 후 제작 방식에 맞춰 안내합니다.",
  },
];

export const portfolioItems = [
  { slug: "sample-cafe-wood-sign", title: "샘플 제작사례: 카페 나무현판", category: "나무현판", place: "카페·매장", request: "따뜻한 분위기의 입구 현판과 메뉴판 제작", material: "원목, UV 인쇄", method: "시안 확인 후 목재 재단과 표면 마감", productSlug: "wood-sign-menu" },
  { slug: "sample-office-acrylic", title: "샘플 제작사례: 사무실 아크릴 사인", category: "아크릴", place: "회사·사무실", request: "회의실명과 층별 안내 사인 통일", material: "투명 아크릴, 스테인리스 부속", method: "아크릴 재단, 후면 출력, 벽부착 부속 적용", productSlug: "acrylic-sign" },
  { slug: "sample-led-store", title: "샘플 제작사례: 매장 LED 전광판", category: "LED 전광판", place: "상가 외부", request: "원거리에서도 보이는 홍보 문구 표시", material: "LED 모듈, 프레임", method: "설치 환경 확인 후 규격 제안", productSlug: "led-display" },
  { slug: "sample-uv-panel", title: "샘플 제작사례: UV 패널 출력", category: "UV인쇄", place: "전시·홍보 공간", request: "단단한 패널 위에 선명한 이미지 출력", material: "포맥스, UV 잉크", method: "평판 출력 후 재단과 검수", productSlug: "uv-flatbed-print" },
  { slug: "sample-banner-event", title: "샘플 제작사례: 행사 현수막", category: "실사출력", place: "행사장", request: "짧은 납기의 대형 안내 현수막 제작", material: "현수막 원단, 아일렛", method: "파일 확인 후 출력과 후가공", productSlug: "banner-large-print" },
  { slug: "sample-tactile-map", title: "샘플 제작사례: 촉지도 안내판", category: "촉지도·안내판", place: "공공시설", request: "이용자를 위한 층별 촉지도와 점자 표기", material: "아크릴, 점자 부속", method: "도면 확인, 점자 표기 검토, 제작", productSlug: "braille-tactile-map" },
];

export const processSteps = [
  "문의 접수",
  "용도와 설치환경 확인",
  "소재·크기·방식 제안",
  "견적 안내",
  "디자인 시안",
  "고객 확인",
  "제작",
  "품질 검수",
  "포장·출고",
  "필요 시 설치",
];

export const faqs = [
  { question: "맞춤 크기로 제작할 수 있나요?", answer: "가능합니다. 설치 장소와 용도를 알려주시면 소재, 두께, 크기, 부착 방식을 함께 제안합니다." },
  { question: "디자인 파일이 없어도 가능한가요?", answer: "기본 문구와 로고 자료가 있으면 시안 작업 방향을 상담할 수 있습니다. 완성 파일이 있다면 더 빠르게 진행됩니다." },
  { question: "제작 기간은 얼마나 걸리나요?", answer: "제품 종류, 수량, 소재 수급, 후가공 방식에 따라 달라집니다. 문의 시 희망 납기를 함께 알려주세요." },
  { question: "한 개만 주문해도 되나요?", answer: "제품과 소재에 따라 소량 제작이 가능합니다. 1개 제작 가능 여부는 상담 후 안내합니다." },
  { question: "설치도 가능한가요?", answer: "설치 위치와 현장 조건을 확인한 뒤 가능 범위와 일정을 안내합니다." },
  { question: "인천 외 지역도 주문할 수 있나요?", answer: "인천과 수도권을 중심으로 대응합니다. 그 외 지역은 제품과 납품 방식에 따라 상담이 필요합니다." },
];

export const blogPosts = [
  { slug: "wood-sign-checklist", title: "나무현판 주문 전 확인할 다섯 가지", category: "제품 선택 가이드", date: "2026-09-09", summary: "원목 현판과 메뉴판을 주문하기 전 크기, 마감, 설치 위치, 문구, 관리 방법을 확인하는 법을 정리했습니다.", relatedProduct: "wood-sign-menu", body: ["나무현판은 소재의 결, 두께, 마감 방식에 따라 분위기가 크게 달라집니다. 실내인지 실외인지 먼저 정하면 필요한 코팅과 부착 방식을 더 정확히 고를 수 있습니다.", "문구와 로고는 너무 작게 넣으면 멀리서 읽기 어렵습니다. 설치 거리와 보는 방향을 기준으로 글자 크기를 정하는 것이 좋습니다.", "메뉴판은 교체 가능성이 있는 항목과 고정 문구를 구분하면 유지 관리가 쉬워집니다."] },
  { slug: "acrylic-thickness-install", title: "아크릴 안내판 두께와 설치 방법 선택하기", category: "제작 방법", date: "2026-09-09", summary: "투명 아크릴, 컬러 아크릴, 벽부착 부속 선택 기준을 안내합니다.", relatedProduct: "acrylic-sign", body: ["아크릴 안내판은 두께와 모서리 마감이 전체 인상을 좌우합니다. 작은 실명판은 얇은 소재도 가능하지만, 큰 안내판은 휨과 고정 방식을 함께 봐야 합니다.", "스탠드오프 부속은 입체감이 있고 깔끔하지만 벽면 타공이 필요할 수 있습니다. 부착 위치의 벽 재질을 미리 확인해 주세요."] },
  { slug: "led-size-resolution", title: "LED 전광판 크기와 해상도 정하는 방법", category: "간판·사인 정보", date: "2026-09-09", summary: "설치 거리, 문구량, 시야각을 기준으로 LED 전광판 규격을 정하는 방법입니다.", relatedProduct: "led-display", body: ["LED 전광판은 멀리서 읽을 문구인지, 가까운 보행자가 볼 문구인지에 따라 필요한 크기와 해상도가 달라집니다.", "문구를 많이 넣는 것보다 핵심 안내를 짧게 반복하는 구성이 더 잘 보이는 경우가 많습니다."] },
  { slug: "uv-flatbed-products", title: "UV 평판인쇄로 제작할 수 있는 제품", category: "장비와 제작현장", date: "2026-09-09", summary: "아크릴, 목재, 금속, 포맥스 등 다양한 소재 위 직접 인쇄의 활용처를 소개합니다.", relatedProduct: "uv-flatbed-print", body: ["UV 평판인쇄는 평평한 소재 위에 직접 출력할 수 있어 안내판, 패널, 굿즈, 전시물 제작에 폭넓게 쓰입니다.", "소재의 색과 표면 상태에 따라 화이트 잉크나 코팅 방식이 필요할 수 있습니다."] },
  { slug: "large-print-file-guide", title: "실사출력과 현수막 제작 파일 준비 방법", category: "제작 방법", date: "2026-09-09", summary: "대형 출력물 제작 전 해상도, 여백, 재단선, 문구 검수 기준을 설명합니다.", relatedProduct: "banner-large-print", body: ["현수막과 배너는 멀리서 보는 매체라 핵심 문구가 선명해야 합니다. 작은 글씨와 복잡한 배경은 피하는 것이 좋습니다.", "완성 크기, 재단 여백, 아일렛 위치를 미리 정하면 출력 후 수정 가능성을 줄일 수 있습니다."] },
  { slug: "tactile-map-before-order", title: "촉지도와 점자안내판 제작 전 확인사항", category: "자주 묻는 질문", date: "2026-09-09", summary: "도면, 표기 내용, 설치 위치, 이용자 동선을 확인하는 체크리스트입니다.", relatedProduct: "braille-tactile-map", body: ["촉지도와 점자안내판은 보기 좋은 디자인뿐 아니라 실제 이용자가 길을 찾는 흐름이 중요합니다.", "층별 도면, 출입구 위치, 주요 시설명, 설치 높이와 방향을 함께 확인해야 합니다."] },
];

export function getProduct(slug: string) {
  return products.find((item) => item.slug === slug);
}

export function getPortfolio(slug: string) {
  return portfolioItems.find((item) => item.slug === slug);
}

export function getPost(slug: string) {
  return blogPosts.find((item) => item.slug === slug);
}
