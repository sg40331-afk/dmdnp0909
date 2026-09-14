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
  { href: "/blog", label: "블로그" },
  { href: "/contact", label: "문의하기" },
  { href: "https://smartstore.naver.com/prfirst", label: "쇼핑몰", external: true },
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

type BlogTopic = {
  slug: string;
  title: string;
  category: string;
  date: string;
  summary: string;
  relatedProduct: string;
  focus: string;
  material: string;
  setting: string;
  imageTone: "wood" | "blue" | "led" | "print" | "map";
};

function createBlogBody(topic: BlogTopic) {
  return [
    `${topic.title}를 준비할 때는 먼저 제품이 놓일 공간과 보는 사람의 동선을 함께 확인해야 합니다. ${topic.setting}에서는 문구를 읽는 거리, 조명의 밝기, 벽면이나 유리면의 상태가 결과 품질에 직접 영향을 줍니다. 같은 디자인이라도 설치 위치가 달라지면 글자 크기, 여백, 마감 방식이 달라지므로 주문 전에 현장 사진과 대략적인 치수를 함께 정리해 두는 것이 좋습니다.`,
    `${topic.focus}는 상담 단계에서 가장 먼저 맞춰야 하는 기준입니다. 제작자는 용도와 예산만으로 제품을 바로 정하지 않고, 실제 사용 기간과 관리 방식까지 살펴본 뒤 ${topic.material}의 두께, 표면 처리, 출력 방식, 고정 방법을 제안합니다. 이 과정을 건너뛰면 완성 후에는 보기에는 좋아도 설치가 어렵거나 유지 관리가 번거로운 제품이 될 수 있습니다.`,
    `파일을 준비할 때는 로고 원본, 사용 문구, 색상 기준, 완성 크기를 한 번에 전달하는 편이 좋습니다. 이미지 파일만 보내는 경우 확대했을 때 깨지는지 확인이 필요하고, 글자가 포함된 디자인은 오타와 줄바꿈을 제작 전에 확정해야 합니다. 특히 사인 제품은 인쇄 후 바로 수정하기 어렵기 때문에 시안 확인 단계에서 문구, 방향, 수량, 납품 형태를 꼼꼼히 보는 것이 중요합니다.`,
    `제작 방식은 소재에 따라 달라집니다. 평판 인쇄는 표면 위에 직접 색을 올리는 방식이라 작은 안내문이나 패널에 적합하고, 실사출력은 넓은 면적의 홍보물에 유리합니다. 레이저나 CNC 가공이 필요한 제품은 절단선, 모서리, 타공 위치가 정확해야 하며, ${topic.material}의 표면 상태에 따라 후가공 시간이 달라질 수 있습니다.`,
    `견적을 빠르게 받으려면 설치 장소, 가로세로 크기, 수량, 원하는 납기, 실내용 또는 실외용 여부를 함께 알려 주세요. 기존 사인이 있다면 교체 전 사진을 보내는 것도 좋습니다. 제작자는 그 정보를 바탕으로 같은 크기라도 더 적합한 소재를 제안하거나, 문구를 줄여 시인성을 높이는 방식으로 결과를 조정할 수 있습니다.`,
    `${topic.setting}에서 자주 생기는 문제는 완성품 자체보다 설치 조건에서 시작됩니다. 벽면이 고르지 않거나, 전원이 필요한 위치가 멀거나, 통행 동선 때문에 돌출 부속을 쓰기 어려운 경우가 있습니다. 그래서 제작 전 상담에서는 제품의 모양뿐 아니라 부착 방식, 포장, 운반, 현장 작업 가능 시간까지 함께 확인해야 일정이 안정적으로 진행됩니다.`,
    `완성품 검수는 색상, 재단, 타공, 수량, 포장 상태를 기준으로 봅니다. 고객이 확인해야 할 부분은 주문한 문구가 맞는지, 설치 방향이 맞는지, 부속이 빠지지 않았는지입니다. 대명DnP는 상담부터 출력, 가공, 검수와 출고까지 한 흐름으로 관리해 제품별로 필요한 확인 과정을 줄이고 결과의 편차를 낮추는 데 집중합니다.`,
    `정리하면 ${topic.title}의 핵심은 예쁜 시안을 만드는 것에서 끝나지 않습니다. 현장 조건에 맞는 소재를 고르고, 읽히는 크기로 문구를 정리하며, 제작 전 확인할 내용을 빠짐없이 정돈하는 것이 더 중요합니다. 주문 전 작은 정보라도 미리 공유하면 불필요한 재작업을 줄이고, 공간에 오래 어울리는 사인 제품을 만들 수 있습니다.`,
  ];
}

const blogTopics: BlogTopic[] = [
  { slug: "may-01-wood-sign-size", title: "나무현판 크기 정할 때 먼저 볼 기준", category: "제품 선택 가이드", date: "2026-05-01", summary: "매장 입구, 카운터, 벽면 위치에 따라 나무현판 크기와 글자 비율을 정하는 방법입니다.", relatedProduct: "wood-sign-menu", focus: "크기와 글자 비율", material: "원목과 합판, 오일 마감", setting: "카페와 음식점 입구", imageTone: "wood" },
  { slug: "may-05-acrylic-door-sign", title: "아크릴 실명판을 깔끔하게 만드는 조건", category: "제작 방법", date: "2026-05-05", summary: "사무실 문패와 회의실 안내판을 제작할 때 두께, 모서리, 부착 방식을 확인하는 글입니다.", relatedProduct: "acrylic-sign", focus: "두께와 벽부착 방식", material: "투명 아크릴과 컬러 아크릴", setting: "사무실 복도와 회의실 문 앞", imageTone: "blue" },
  { slug: "may-08-led-text-visibility", title: "LED 전광판 문구가 잘 보이는 구성", category: "간판·사인 정보", date: "2026-05-08", summary: "전광판 문구량, 글자 크기, 반복 속도를 조정해 멀리서도 읽히게 만드는 기준입니다.", relatedProduct: "led-display", focus: "시인성과 문구 반복", material: "LED 모듈과 컨트롤러", setting: "도로변 매장과 건물 외부", imageTone: "led" },
  { slug: "may-12-uv-acrylic-print", title: "아크릴 위 UV 인쇄가 필요한 경우", category: "장비와 제작현장", date: "2026-05-12", summary: "투명 소재 위에 로고와 색상을 선명하게 표현할 때 확인해야 할 화이트 인쇄 기준입니다.", relatedProduct: "uv-flatbed-print", focus: "화이트 인쇄와 색상 선명도", material: "투명 아크릴과 UV 잉크", setting: "브랜드 안내판과 쇼룸 진열대", imageTone: "print" },
  { slug: "may-15-banner-file-check", title: "현수막 파일 보내기 전 체크리스트", category: "제작 방법", date: "2026-05-15", summary: "해상도, 재단 여백, 아일렛 위치, 문구 검수를 제작 전에 확인하는 방법입니다.", relatedProduct: "banner-large-print", focus: "해상도와 여백", material: "현수막 원단과 실사출력", setting: "행사장과 외부 홍보 공간", imageTone: "print" },
  { slug: "may-19-tactile-map-layout", title: "촉지도 배치에서 중요한 동선 기준", category: "공공시설 안내", date: "2026-05-19", summary: "출입구, 엘리베이터, 화장실 위치를 기준으로 촉지도 정보를 정리하는 방법입니다.", relatedProduct: "braille-tactile-map", focus: "이용자 동선과 정보 우선순위", material: "촉지도 패널과 점자 표기", setting: "공공시설 로비와 층별 안내 공간", imageTone: "map" },
  { slug: "may-22-office-acrylic-logo", title: "사무실 로고 사인을 아크릴로 만들 때", category: "제품 선택 가이드", date: "2026-05-22", summary: "벽면 로고 사인의 두께, 간격, 조명 반사를 고려해 아크릴 소재를 고르는 기준입니다.", relatedProduct: "acrylic-sign", focus: "로고 비례와 벽면 고정", material: "아크릴 입체 문자와 부착 부속", setting: "회사 입구와 회의실 벽면", imageTone: "blue" },
  { slug: "may-26-wood-menu-board", title: "나무 메뉴판 제작 전 메뉴 변경 가능성 보기", category: "제품 선택 가이드", date: "2026-05-26", summary: "고정 문구와 교체 문구를 구분해 나무 메뉴판을 오래 쓰는 제작 방식입니다.", relatedProduct: "wood-sign-menu", focus: "교체 가능성과 문구 배열", material: "나무판, 각인, 출력 패널", setting: "카페 카운터와 매장 내부 벽면", imageTone: "wood" },
  { slug: "may-29-storefront-led", title: "매장 외부 LED 전광판 설치 전 확인할 것", category: "간판·사인 정보", date: "2026-05-29", summary: "전원 위치, 시야각, 비바람 노출 여부를 기준으로 전광판 규격을 정리합니다.", relatedProduct: "led-display", focus: "전원과 외부 환경", material: "외부용 LED 전광판", setting: "상가 외벽과 도로변 출입구", imageTone: "led" },
  { slug: "jun-02-uv-metal-panel", title: "금속 패널에 UV 인쇄할 때 주의점", category: "장비와 제작현장", date: "2026-06-02", summary: "금속 표면 위 인쇄에서 접착력, 색상 표현, 보호 마감을 확인하는 방법입니다.", relatedProduct: "uv-flatbed-print", focus: "표면 접착과 보호 마감", material: "금속 패널과 UV 잉크", setting: "공장 안내판과 설비 명판", imageTone: "print" },
  { slug: "jun-05-large-print-color", title: "실사출력 색상이 흐려 보이는 이유", category: "제작 방법", date: "2026-06-05", summary: "화면 색과 출력 색의 차이, 소재 표면, 조명 조건을 기준으로 색상 기대치를 맞춥니다.", relatedProduct: "banner-large-print", focus: "출력 색상과 조명", material: "실사출력 필름과 배너 소재", setting: "전시 부스와 매장 홍보물", imageTone: "print" },
  { slug: "jun-09-braille-sign-height", title: "점자안내판 설치 높이를 정하는 방법", category: "공공시설 안내", date: "2026-06-09", summary: "이용자가 손으로 읽기 쉬운 높이와 접근 동선을 기준으로 설치 위치를 정합니다.", relatedProduct: "braille-tactile-map", focus: "설치 높이와 접근성", material: "점자 표기판과 촉지 부속", setting: "복지시설과 공공기관 복도", imageTone: "map" },
  { slug: "jun-12-acrylic-standoff", title: "아크릴 안내판 스탠드오프 부속 선택", category: "제작 방법", date: "2026-06-12", summary: "벽에서 띄워 설치하는 안내판의 입체감과 타공 조건을 함께 확인합니다.", relatedProduct: "acrylic-sign", focus: "스탠드오프 부속과 타공", material: "아크릴 판재와 금속 부속", setting: "회사 로비와 병원 안내 공간", imageTone: "blue" },
  { slug: "jun-16-wood-finish-care", title: "나무현판 마감과 관리 방법", category: "제품 선택 가이드", date: "2026-06-16", summary: "오일, 바니시, 코팅 방식에 따라 달라지는 질감과 관리 포인트를 정리했습니다.", relatedProduct: "wood-sign-menu", focus: "표면 마감과 관리", material: "원목, 오일, 보호 코팅", setting: "실내 매장과 반외부 출입구", imageTone: "wood" },
  { slug: "jun-19-led-resolution-distance", title: "LED 전광판 해상도와 시청 거리", category: "간판·사인 정보", date: "2026-06-19", summary: "가까이 보는 전광판과 멀리 보는 전광판의 픽셀 기준을 쉽게 설명합니다.", relatedProduct: "led-display", focus: "시청 거리와 해상도", material: "LED 모듈과 프레임", setting: "건물 입구와 옥외 홍보 공간", imageTone: "led" },
  { slug: "jun-23-uv-foam-board", title: "포맥스 안내판에 UV 인쇄하기", category: "장비와 제작현장", date: "2026-06-23", summary: "가볍고 경제적인 포맥스 안내판의 두께와 설치 방식을 정리합니다.", relatedProduct: "uv-flatbed-print", focus: "두께와 가벼운 설치", material: "포맥스 판재와 UV 인쇄", setting: "실내 안내판과 임시 행사 표지", imageTone: "print" },
  { slug: "jun-26-banner-outdoor-use", title: "외부 현수막을 오래 쓰려면", category: "제작 방법", date: "2026-06-26", summary: "바람, 햇빛, 고정 위치에 따라 현수막 소재와 마감 방식을 선택합니다.", relatedProduct: "banner-large-print", focus: "외부 내구성과 고정", material: "현수막 원단, 아일렛, 로프", setting: "건물 외벽과 야외 행사장", imageTone: "print" },
  { slug: "jun-30-public-wayfinding", title: "공공시설 안내판 문구 정리법", category: "공공시설 안내", date: "2026-06-30", summary: "이용자가 빠르게 길을 찾도록 시설명, 방향, 층 정보를 정리하는 기준입니다.", relatedProduct: "braille-tactile-map", focus: "방향 정보와 시설명 정리", material: "아크릴, 금속, 점자 패널", setting: "도서관과 주민센터 안내 공간", imageTone: "map" },
  { slug: "jul-03-acrylic-color-choice", title: "컬러 아크릴 안내판 색상 고르기", category: "제품 선택 가이드", date: "2026-07-03", summary: "브랜드 색상, 배경 벽면, 조명 반사를 고려해 컬러 아크릴을 선택합니다.", relatedProduct: "acrylic-sign", focus: "색상 대비와 브랜드 톤", material: "컬러 아크릴과 출력 필름", setting: "매장 내부와 쇼룸 벽면", imageTone: "blue" },
  { slug: "jul-07-wood-sign-lettering", title: "나무현판 글자 각인과 인쇄 차이", category: "제작 방법", date: "2026-07-07", summary: "각인, 실크 인쇄, UV 인쇄 방식의 느낌과 사용 환경 차이를 설명합니다.", relatedProduct: "wood-sign-menu", focus: "각인 방식과 표현 질감", material: "나무판, 각인, UV 인쇄", setting: "카페 간판과 메뉴 사인", imageTone: "wood" },
  { slug: "jul-10-led-maintenance", title: "LED 전광판 관리에서 자주 놓치는 것", category: "간판·사인 정보", date: "2026-07-10", summary: "문구 업데이트, 밝기 조절, 전원 관리 등 사용 중 확인할 항목입니다.", relatedProduct: "led-display", focus: "사용 중 관리와 문구 운영", material: "LED 전광판과 컨트롤 장치", setting: "상가 외부와 실내 홍보 공간", imageTone: "led" },
  { slug: "jul-14-uv-white-ink", title: "UV 인쇄에서 화이트 잉크가 필요한 이유", category: "장비와 제작현장", date: "2026-07-14", summary: "투명·어두운 소재 위에서 색상이 선명하게 보이도록 화이트 인쇄를 활용합니다.", relatedProduct: "uv-flatbed-print", focus: "화이트 베이스와 색상 표현", material: "투명 아크릴, 금속, UV 잉크", setting: "브랜드 패널과 제품 표시판", imageTone: "print" },
  { slug: "jul-17-print-cutting-line", title: "대형 출력물 재단선과 여백 잡기", category: "제작 방법", date: "2026-07-17", summary: "출력 후 재단 오차를 줄이기 위해 안전 여백과 재단선을 준비하는 방법입니다.", relatedProduct: "banner-large-print", focus: "재단선과 안전 여백", material: "실사출력지와 배너 원단", setting: "전시장 배너와 벽면 그래픽", imageTone: "print" },
  { slug: "jul-21-tactile-map-content", title: "촉지도에 꼭 넣어야 할 정보", category: "공공시설 안내", date: "2026-07-21", summary: "출입구, 계단, 엘리베이터, 화장실 등 촉지도 핵심 정보를 정리합니다.", relatedProduct: "braille-tactile-map", focus: "표기 정보 우선순위", material: "촉지도 판재와 점자 표기", setting: "복합시설 로비와 층별 안내", imageTone: "map" },
  { slug: "jul-24-acrylic-office-sign", title: "회사 사무실 안내판을 통일감 있게 만들기", category: "제품 선택 가이드", date: "2026-07-24", summary: "부서명, 회의실명, 방향 안내를 같은 기준으로 맞추는 제작 방법입니다.", relatedProduct: "acrylic-sign", focus: "규격 통일과 정보 체계", material: "아크릴 판재와 출력 필름", setting: "사무실 복도와 층별 안내", imageTone: "blue" },
  { slug: "jul-28-wood-outdoor-risk", title: "외부 나무현판 제작 전 확인할 위험 요소", category: "제품 선택 가이드", date: "2026-07-28", summary: "비, 햇빛, 습도에 노출되는 위치에서 나무현판을 사용할 때의 주의점입니다.", relatedProduct: "wood-sign-menu", focus: "외부 노출과 변형 방지", material: "방수 마감 목재와 보호 코팅", setting: "외부 출입구와 반외부 테라스", imageTone: "wood" },
  { slug: "jul-31-led-message-plan", title: "LED 전광판 문구 운영 계획 세우기", category: "간판·사인 정보", date: "2026-07-31", summary: "홍보 문구, 공지 문구, 시간대별 메시지를 나눠 운영하는 방법입니다.", relatedProduct: "led-display", focus: "문구 운영과 시간대 구성", material: "LED 전광판과 운영 프로그램", setting: "매장 외부와 안내 데스크", imageTone: "led" },
  { slug: "aug-04-uv-sample-check", title: "UV 인쇄 샘플 확인이 필요한 경우", category: "장비와 제작현장", date: "2026-08-04", summary: "색상 정확도와 소재 표현이 중요한 제품은 샘플 확인으로 오차를 줄입니다.", relatedProduct: "uv-flatbed-print", focus: "샘플 출력과 색상 확인", material: "아크릴, 금속, 목재, UV 잉크", setting: "전시물과 브랜드 패널 제작", imageTone: "print" },
  { slug: "aug-07-banner-wind-install", title: "바람 많은 곳의 현수막 설치 준비", category: "제작 방법", date: "2026-08-07", summary: "타공 위치, 고정 방식, 소재 선택을 통해 외부 현수막 파손을 줄입니다.", relatedProduct: "banner-large-print", focus: "바람 대응과 고정 방식", material: "현수막 원단과 고정 부속", setting: "야외 행사장과 건물 난간", imageTone: "print" },
  { slug: "aug-11-public-sign-readability", title: "공공 안내판은 읽히는 순서가 중요합니다", category: "공공시설 안내", date: "2026-08-11", summary: "방문자가 먼저 봐야 할 정보를 위계화해 안내판 가독성을 높입니다.", relatedProduct: "braille-tactile-map", focus: "정보 위계와 가독성", material: "아크릴, 금속, 점자 안내판", setting: "공공기관 로비와 복도", imageTone: "map" },
  { slug: "aug-14-acrylic-cleaning", title: "아크릴 안내판 관리와 청소 방법", category: "제품 선택 가이드", date: "2026-08-14", summary: "스크래치와 정전기 먼지를 줄이기 위한 아크릴 표면 관리 방법입니다.", relatedProduct: "acrylic-sign", focus: "표면 관리와 스크래치 예방", material: "아크릴 판재와 보호 필름", setting: "실내 안내판과 사무실 표지", imageTone: "blue" },
  { slug: "aug-18-wood-brand-mood", title: "나무현판으로 매장 분위기 잡는 법", category: "제품 선택 가이드", date: "2026-08-18", summary: "목재 색상과 서체 선택으로 매장 첫인상을 자연스럽게 정리합니다.", relatedProduct: "wood-sign-menu", focus: "브랜드 분위기와 서체", material: "원목, 스테인, 각인", setting: "카페와 공방 입구", imageTone: "wood" },
  { slug: "aug-21-led-indoor-vs-outdoor", title: "실내용과 실외용 LED 전광판 차이", category: "간판·사인 정보", date: "2026-08-21", summary: "밝기, 방수, 시청 거리 기준으로 실내용과 실외용 전광판을 구분합니다.", relatedProduct: "led-display", focus: "밝기와 방수 조건", material: "실내용·실외용 LED 모듈", setting: "실내 매장과 외부 간판 자리", imageTone: "led" },
  { slug: "aug-25-uv-wood-print", title: "목재 위에 UV 인쇄할 때의 느낌", category: "장비와 제작현장", date: "2026-08-25", summary: "나무결 위에 직접 인쇄할 때 색상과 질감이 어떻게 달라지는지 설명합니다.", relatedProduct: "uv-flatbed-print", focus: "나무결과 인쇄 표현", material: "목재 판재와 UV 잉크", setting: "메뉴판과 감성 안내판", imageTone: "wood" },
  { slug: "aug-28-print-delivery-packaging", title: "대형 출력물 포장과 납품 시 주의점", category: "제작 방법", date: "2026-08-28", summary: "접힘, 오염, 파손을 줄이기 위해 출력물 특성에 맞게 포장합니다.", relatedProduct: "banner-large-print", focus: "포장과 운반 방식", material: "현수막, 배너, 출력 필름", setting: "전시 납품과 행사장 반입", imageTone: "print" },
  { slug: "sep-01-tactile-sign-proof", title: "점자안내판 시안 확인에서 볼 항목", category: "공공시설 안내", date: "2026-09-01", summary: "점자 표기, 시설명, 방향, 설치 위치를 제작 전 시안에서 확인합니다.", relatedProduct: "braille-tactile-map", focus: "점자 표기와 시안 검수", material: "점자 패널과 촉지 표시", setting: "공공시설 안내 데스크와 복도", imageTone: "map" },
  { slug: "sep-04-acrylic-light-reflection", title: "아크릴 안내판 조명 반사 줄이는 방법", category: "제작 방법", date: "2026-09-04", summary: "조명이 강한 공간에서 아크릴 반사를 줄이고 문구를 잘 보이게 합니다.", relatedProduct: "acrylic-sign", focus: "반사와 조명 조건", material: "무광 아크릴과 출력 필름", setting: "밝은 로비와 병원 안내 공간", imageTone: "blue" },
  { slug: "sep-08-wood-sign-checklist", title: "나무현판 주문 전 확인할 다섯 가지", category: "제품 선택 가이드", date: "2026-09-08", summary: "원목 현판과 메뉴판을 주문하기 전 크기, 마감, 설치 위치, 문구, 관리 방법을 정리했습니다.", relatedProduct: "wood-sign-menu", focus: "크기, 마감, 설치 위치", material: "원목 현판과 메뉴판", setting: "매장 입구와 카운터 주변", imageTone: "wood" },
  { slug: "sep-11-acrylic-thickness-install", title: "아크릴 안내판 두께와 설치 방법 선택하기", category: "제작 방법", date: "2026-09-11", summary: "투명 아크릴, 컬러 아크릴, 벽부착 부속 선택 기준을 안내합니다.", relatedProduct: "acrylic-sign", focus: "두께와 설치 부속 선택", material: "투명 아크릴과 컬러 아크릴", setting: "회의실과 사무실 안내 공간", imageTone: "blue" },
  { slug: "sep-15-led-size-resolution", title: "LED 전광판 크기와 해상도 정하는 방법", category: "간판·사인 정보", date: "2026-09-15", summary: "설치 거리, 문구량, 시야각을 기준으로 LED 전광판 규격을 정하는 방법입니다.", relatedProduct: "led-display", focus: "크기와 해상도", material: "LED 모듈과 전광판 프레임", setting: "도로변과 매장 외부", imageTone: "led" },
  { slug: "sep-18-uv-flatbed-products", title: "UV 평판인쇄로 제작할 수 있는 제품", category: "장비와 제작현장", date: "2026-09-18", summary: "아크릴, 목재, 금속, 포맥스 등 다양한 소재 위 직접 인쇄의 활용처를 소개합니다.", relatedProduct: "uv-flatbed-print", focus: "소재별 직접 인쇄", material: "아크릴, 목재, 금속, 포맥스", setting: "제작실과 제품 샘플 공간", imageTone: "print" },
  { slug: "sep-22-large-print-file-guide", title: "실사출력과 현수막 제작 파일 준비 방법", category: "제작 방법", date: "2026-09-22", summary: "대형 출력물 제작 전 해상도, 여백, 재단선, 문구 검수 기준을 설명합니다.", relatedProduct: "banner-large-print", focus: "파일 준비와 재단 기준", material: "현수막 원단과 대형 출력지", setting: "홍보물 제작과 행사장 배너", imageTone: "print" },
  { slug: "sep-25-tactile-map-before-order", title: "촉지도와 점자안내판 제작 전 확인사항", category: "공공시설 안내", date: "2026-09-25", summary: "도면, 표기 내용, 설치 위치, 이용자 동선을 확인하는 체크리스트입니다.", relatedProduct: "braille-tactile-map", focus: "도면과 설치 위치 확인", material: "촉지도와 점자안내판", setting: "공공시설과 복지시설 안내 공간", imageTone: "map" },
  { slug: "sep-29-sign-order-consulting", title: "사인 제품 견적 상담을 빠르게 받는 방법", category: "자주 묻는 질문", date: "2026-09-29", summary: "제품 종류를 몰라도 용도, 크기, 설치 장소를 알려주면 상담이 쉬워지는 이유를 정리했습니다.", relatedProduct: "acrylic-sign", focus: "상담 정보 정리와 견적 기준", material: "아크릴, 목재, 금속, 출력물", setting: "매장, 사무실, 공공시설 상담 현장", imageTone: "blue" },
];

export const blogPosts = blogTopics.map((topic) => ({
  ...topic,
  body: createBlogBody(topic),
  images: [
    `${topic.title} 제작 소재와 시안 확인 이미지`,
    `${topic.setting} 적용 예시 이미지`,
  ],
}));

export function getProduct(slug: string) {
  return products.find((item) => item.slug === slug);
}

export function getPortfolio(slug: string) {
  return portfolioItems.find((item) => item.slug === slug);
}

export function getPost(slug: string) {
  return blogPosts.find((item) => item.slug === slug);
}
