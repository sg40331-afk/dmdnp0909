import { company, products } from "./dmdnp-data";

// Company pages are data-driven so non-developers can update text, specs, and links in one place.
export const companyPages = [
  { href: "/company", label: "회사 개요", title: "다양한 사인 제품을 직접 만드는 대명DnP", description: `${company.name}는 ${company.since} 설립 이후 인천 남동공단 제작시설을 기반으로 다양한 사인 제품을 직접 제작해 온 사인 제품 제조업체입니다.` },
  { href: "/company/greeting", label: "대표 인사말", title: "대표 인사말", description: "2002년부터 현장에서 쌓아온 경험으로 필요한 사인 제품을 책임 있게 안내합니다." },
  { href: "/company/history", label: "주요 연혁", title: "대명DnP가 걸어온 길", description: "확인된 내용은 연도와 함께, 확인이 필요한 항목은 별도 표시로 정리했습니다." },
  { href: "/company/business", label: "제작 분야", title: "공간에 맞는 사인 제품을 직접 제작합니다", description: "목재, 아크릴, 금속, LED, 출력물까지 용도에 맞게 제안합니다." },
  { href: "/company/facilities", label: "장비·시설", title: "직접 제작을 위한 전문 설비", description: "보유 장비가 어떤 제품 제작에 쓰이는지 쉽게 확인할 수 있습니다." },
  { href: "/company/quality", label: "품질관리", title: "처음부터 끝까지 꼼꼼하게 확인합니다", description: "상담 내용 확인부터 포장과 출고까지 단계별로 점검합니다." },
  { href: "/company/location", label: "오시는 길", title: "대명DnP 오시는 길", description: "방문 전 연락 후 제작 상담에 필요한 자료를 함께 준비해 주세요." },
];

export const companyMenuPages = companyPages.filter((page) => page.href !== "/company");

export const companyStats = [
  { title: "2002년 설립", text: "20년 이상 현장에서 쌓아온 사인 제품 제작 경험" },
  { title: "자체 제작설비", text: "상담부터 출력, 가공, 제작과 검수까지 직접 관리" },
  { title: "다양한 소재 가공", text: "목재, 아크릴, 금속, 포맥스, 현수막 원단 등 용도별 제안" },
  { title: "인천·수도권 대응", text: "인천 남동공단 제작시설을 기반으로 상담과 납품 대응" },
];

export const companyIntro = {
  summary: `${company.name}는 ${company.since} 설립 이후 인천 남동공단 제작시설을 기반으로 다양한 사인 제품을 직접 제작해 온 사인 제품 제조업체입니다.`,
  workflow: "상담, 디자인, 출력, 가공, 제작, 검수, 출고 및 시공 상담까지 제품별 흐름을 한곳에서 관리합니다.",
  strengths: ["제작 전 용도와 설치환경 확인", "소재와 크기, 부착 방식 제안", "자체 설비를 활용한 직접 제작", "완성품 검수 후 안전한 출고"],
  audiences: ["카페·음식점", "회사·사무실", "공장·건설현장", "관공서·공공시설", "행사·홍보 공간", "매장 외부홍보"],
};

export const companyHistory = [
  {
    period: "2026",
    items: [
      { date: "26 09", title: "파이버레이저 도입", text: "금속 가공과 정밀 사인 제작 대응력을 강화했습니다." },
    ],
  },
  {
    period: "2022",
    items: [
      { date: "22 08", title: "CO2 레이저 도입", text: "아크릴, 목재, 포맥스 등 다양한 사인 소재의 정밀 가공 범위를 넓혔습니다." },
      { date: "22 05", title: "CNC 조각기 도입", text: "안내판과 사인물의 조각, 재단, 형상 가공 대응력을 확충했습니다." },
    ],
  },
  {
    period: "2021",
    items: [
      { date: "08", title: "조달청 나라장터 안내판 물품등록", text: "나무 안내판(목재), 벽부 안내판(석재), 시각장애인용 점자표시" },
    ],
  },
  {
    period: "2020",
    items: [
      { date: "12", title: "품질경영시스템 ISO 9001:2015 인증 취득", text: "인쇄 광고분야 디자인 및 제조" },
      { date: "11", title: "경영혁신형 중소기업(Main-Biz) 선정", text: "경영혁신 역량을 인정받았습니다." },
      { date: "11", title: "대명DnP 연구개발부서 설립", text: "기술연구소 운영을 시작했습니다." },
      { date: "05", title: "CNC 조각기 도입", text: "정밀 조각과 가공 제작 기반을 확충했습니다." },
    ],
  },
  {
    period: "2011~2019",
    items: [
      { date: "19 10", title: "CO2 레이저 커팅기 도입", text: "비금속 소재의 정밀 커팅 대응력을 높였습니다." },
      { date: "18 01", title: "V180 컬러 디지털 인쇄기 도입", text: "디지털 컬러 인쇄 제작 범위를 확대했습니다." },
      { date: "17 12", title: "인천 남동구 구월로 50 → 고잔동 148 이전", text: "확장 이전으로 제작 환경을 넓혔습니다." },
      { date: "12 03", title: "인쇄분야 직접생산 증명서 취득 및 조달청 등록", text: "공공 조달 대응 기반을 마련했습니다." },
      { date: "11 04", title: "D125 디지털 인쇄기 도입", text: "디지털 출력 제작 역량을 강화했습니다." },
      { date: "11 02", title: "사업 변경 대명DnP", text: "마이라벨 최초 장비개발 및 에어여과 사업전환" },
    ],
  },
  {
    period: "2008~2010",
    items: [
      { date: "09 04", title: "CTP 출력기 도입", text: "출력 공정의 품질과 효율을 높였습니다." },
      { date: "08 05", title: "고광택 무선제본기 도입", text: "제본과 후가공 대응 범위를 넓혔습니다." },
      { date: "08 01", title: "평판출력기 도입", text: "평판 소재 출력 제작을 시작했습니다." },
    ],
  },
  {
    period: "2002~2007",
    items: [
      { date: "07 02", title: "THE LIFE 창간", text: "정기간행물 제작 경험을 확대했습니다." },
      { date: "06 12", title: "소식지 월간 복지 창간", text: "월간 소식지 제작을 시작했습니다." },
      { date: "06 11", title: "한성프라임 인수합병", text: "각종 출력인쇄기 가동" },
      { date: "03 05", title: "통신판매업신고·사이트개발", text: "인천지역 판매법인 설립" },
      { date: "02 04", title: "회사 창립", text: "인천 남동구 구월동에서 사명 삼일인쇄사로 시작했습니다." },
    ],
  },
];

export const businessAreas = products.map((product) => ({
  ...product,
  image: product.slug.includes("wood") ? "/dmdnp-assets/product-card-wood.jpg"
    : product.slug.includes("acrylic") ? "/dmdnp-assets/product-card-acrylic.jpg"
    : product.slug.includes("led") ? "/dmdnp-assets/product-card-led.jpg"
    : product.slug.includes("uv") ? "/dmdnp-assets/product-card-uv.jpg"
    : product.slug.includes("banner") ? "/dmdnp-assets/product-card-banner.jpg"
    : product.slug.includes("tactile") ? "/dmdnp-assets/product-card-tactile.jpg"
    : "/dmdnp-assets/uv-print.png",
}));

export const facilities = [
  { name: "UV 평판프린터", image: "/dmdnp-assets/uv-print.png", function: "평평한 소재 위에 직접 출력", materials: "아크릴, 금속, 목재, 포맥스, PVC", products: "안내판, 패널, 전시물, 샘플", size: "정보 확인 후 입력", work: "소재별 출력 전 시안과 색상 확인", result: "선명한 평판 인쇄 제품" },
  { name: "3kW 파이버레이저", image: "/dmdnp-assets/hero-workshop.png", function: "금속 절단과 정밀 가공", materials: "금속 소재 중심, 세부 소재 정보 확인 후 입력", products: "금속 안내판, 공장 안내판, 부품형 사인", size: "정보 확인 후 입력", work: "가공 도면 확인 후 절단 및 후가공", result: "정밀한 금속 사인 결과물" },
  { name: "CNC 1325", image: "/dmdnp-assets/hero-workshop.png", function: "판재 재단과 형상 가공", materials: "목재, 아크릴, 포맥스 등", products: "입체 사인, 안내판, 현판", size: "정보 확인 후 입력", work: "소재 고정 후 형상 가공", result: "규격에 맞춘 판재 가공품" },
  { name: "실사출력 장비", image: "/dmdnp-assets/product-card-banner.jpg", function: "대형 출력물 제작", materials: "현수막 원단, PET, 켈지 등", products: "현수막, 배너, 홍보 출력물", size: "정보 확인 후 입력", work: "파일 확인 후 출력과 후가공", result: "홍보용 대형 출력물" },
  { name: "코팅·커팅 장비", image: "/dmdnp-assets/banner-print.png", function: "출력물 보호와 형태 재단", materials: "출력지, 필름, 시트류", products: "스티커, 안내 출력물, 배너", size: "정보 확인 후 입력", work: "출력 후 코팅과 커팅", result: "마감된 홍보 출력물" },
  { name: "절곡기", image: "/dmdnp-assets/hero-workshop.png", function: "판재 접힘과 형태 가공", materials: "금속 및 판재류, 세부 정보 확인 후 입력", products: "금속 안내판, 프레임, 사인 부속", size: "정보 확인 후 입력", work: "도면 확인 후 절곡", result: "형태가 잡힌 금속 부품" },
  { name: "후가공·조립 장비", image: "/dmdnp-assets/hero-workshop.png", function: "타공, 조립, 마감 보조", materials: "제품별 소재", products: "아크릴 안내판, 촉지도, 종합 안내판", size: "정보 확인 후 입력", work: "부속 조립과 마감 확인", result: "설치 가능한 완성 제품" },
];

export const qualitySteps = [
  { title: "상담 내용과 주문사항 확인", text: "용도, 설치 위치, 수량, 희망 납기를 먼저 정리합니다." },
  { title: "디자인 파일과 치수 검토", text: "파일 형식, 해상도, 재단 여백과 치수를 확인합니다." },
  { title: "소재와 색상 확인", text: "사용 환경에 맞는 소재와 색상 기준을 상담합니다." },
  { title: "출력·가공 상태 점검", text: "출력 번짐, 재단 상태, 가공 오차를 확인합니다." },
  { title: "조립 및 마감 확인", text: "부속, 타공, 모서리, 표면 마감 상태를 점검합니다." },
  { title: "완성품 최종 검수", text: "문구, 수량, 외관, 요청사항 반영 여부를 확인합니다." },
  { title: "안전한 포장과 출고", text: "제품 특성에 맞춰 포장하고 출고 상태를 관리합니다." },
  { title: "필요 시 설치 상태 확인", text: "설치가 필요한 제품은 현장 조건을 함께 확인합니다." },
];

export const qualityNotes = [
  "제작 전 고객 확인사항: 문구, 크기, 수량, 설치 위치, 희망 납기",
  "시안 확인 과정: 제작 전 디자인 방향과 표기 내용을 확인",
  "색상과 소재 확인 기준: 사용 환경, 내구성, 시인성을 기준으로 상담",
  "완성품 검수 항목: 외관, 수량, 마감, 부속, 포장 상태",
  "포장과 배송 기준: 제품 파손을 줄이도록 소재별 포장 방식 적용",
  "설치 제품 확인사항: 벽면, 전원, 동선, 설치 높이, 현장 접근성",
];

export const locationInfo = [
  ["회사명", company.name],
  ["대표자", company.representative],
  ["주소", company.address],
  ["운영시간", company.hours],
  ["전화", company.phone],
  ["이메일", company.email],
];
