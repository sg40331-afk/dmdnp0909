import { company, products } from "./dmdnp-data";

// Company pages are data-driven so non-developers can update text, specs, and links in one place.
export const companyPages = [
  { href: "/company", label: "회사 개요", title: "다양한 사인 제품을 직접 만드는 대명DnP", description: "상담, 디자인, 출력, 가공, 제작, 검수와 출고까지 한 흐름으로 관리합니다." },
  { href: "/company/greeting", label: "대표 인사말", title: "대표 인사말", description: "2002년부터 현장에서 쌓아온 경험으로 필요한 사인 제품을 책임 있게 안내합니다." },
  { href: "/company/history", label: "주요 연혁", title: "대명DnP가 걸어온 길", description: "확인된 내용은 연도와 함께, 확인이 필요한 항목은 별도 표시로 정리했습니다." },
  { href: "/company/business", label: "제작 분야", title: "공간에 맞는 사인 제품을 직접 제작합니다", description: "목재, 아크릴, 금속, LED, 출력물까지 용도에 맞게 제안합니다." },
  { href: "/company/facilities", label: "장비·시설", title: "직접 제작을 위한 전문 설비", description: "보유 장비가 어떤 제품 제작에 쓰이는지 쉽게 확인할 수 있습니다." },
  { href: "/company/quality", label: "품질관리", title: "처음부터 끝까지 꼼꼼하게 확인합니다", description: "상담 내용 확인부터 포장과 출고까지 단계별로 점검합니다." },
  { href: "/company/location", label: "오시는 길", title: "대명DnP 오시는 길", description: "방문 전 연락 후 제작 상담에 필요한 자료를 함께 준비해 주세요." },
];

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
  { year: "2002", title: "회사 설립", text: "인천 지역을 기반으로 사인 제품 제작을 시작했습니다." },
  { year: "연도 확인 필요", title: "실사출력 및 간판 제작 시작", text: "매장 홍보물과 간판 제작 영역을 확대했습니다." },
  { year: "연도 확인 필요", title: "UV 평판인쇄 설비 도입", text: "아크릴, 금속, 목재, 포맥스 등 다양한 소재 직접 출력이 가능해졌습니다." },
  { year: "연도 확인 필요", title: "CNC 가공설비 확충", text: "안내판과 사인물의 재단, 가공 대응 범위를 넓혔습니다." },
  { year: "연도 확인 필요", title: "촉지도·점자안내판 제작 확대", text: "공공시설과 건물 안내를 위한 제품 제작을 확대했습니다." },
  { year: "연도 확인 필요", title: "온라인 판매채널 확대", text: "제품 상담과 주문 접점을 넓혀 고객 접근성을 높였습니다." },
  { year: "연도 확인 필요", title: "3kW 파이버레이저 도입", text: "금속 가공과 공장 안내판 제작 대응력을 강화했습니다." },
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
