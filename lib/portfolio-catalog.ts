export const catalogGroups = [
  { id: "signs", label: "간판·입체 문자" },
  { id: "lighting", label: "LED·조명" },
  { id: "print", label: "인쇄·시트지" },
  { id: "wood", label: "나무·안내판" },
] as const;

type CatalogCase = {
  slug: string;
  title: string;
  group: (typeof catalogGroups)[number]["id"];
  summary: string;
  photos: number;
  photoFolder?: string;
};

export const catalogCases: readonly CatalogCase[] = [
  { slug: "channel", title: "채널간판", group: "signs", summary: "매장 외벽과 건물 상단에 적용한 채널 문자 간판 사례입니다.", photos: 22, photoFolder: "installations" },
  { slug: "frame", title: "프레임 간판", group: "signs", summary: "가로형 전면 간판과 세로형 돌출 간판 사진을 모았습니다.", photos: 2 },
  { slug: "dimensional", title: "고무 스카시", group: "signs", summary: "상호와 로고를 입체 문자로 표현한 외부 간판 사례입니다.", photos: 2 },
  { slug: "air", title: "에어간판", group: "signs", summary: "매장 입구와 보행로에서 사용하는 에어간판 제작 사례입니다.", photos: 2 },
  { slug: "point", title: "포인트 간판·철제 간판·배너", group: "signs", summary: "벽면형 포인트 사인과 매장 앞 배너의 제작 예시를 모았습니다.", photos: 2 },
  { slug: "3d-channel", title: "3D 채널글자", group: "lighting", summary: "매장 외부와 실내 벽면에 적용한 입체 조명 글자 사례입니다.", photos: 2 },
  { slug: "led-display", title: "LED 전광판", group: "lighting", summary: "매장과 거리에서 안내·홍보 문구를 표시하는 전광판 사례입니다.", photos: 2 },
  { slug: "light-panel", title: "라이트 패널", group: "lighting", summary: "포스터와 메뉴를 조명으로 밝혀주는 라이트 패널 사례입니다.", photos: 1 },
  { slug: "silicone-led", title: "실리콘 LED", group: "lighting", summary: "가게 이름, 안내 문구, 상징 도안을 조명으로 표현한 사례입니다.", photos: 2 },
  { slug: "print", title: "실사출력·현수막", group: "print", summary: "행사 현수막과 세로형 배너의 출력 예시를 모았습니다.", photos: 2 },
  { slug: "vinyl", title: "시트지 커팅", group: "print", summary: "유리와 사인 판면에 문구나 그래픽을 적용한 시트지 사례입니다.", photos: 2 },
  { slug: "wood-menu", title: "나무 메뉴판", group: "wood", summary: "벽걸이형 메뉴판부터 개별 메뉴 표기판까지 나무 메뉴판 사례를 모았습니다.", photos: 1 },
  { slug: "tree-sign", title: "수목표찰·나무 입간판", group: "wood", summary: "식물 이름을 표시하는 수목표찰과 야외에 세우는 나무 안내판 사례입니다.", photos: 2 },
  { slug: "wood-plaque", title: "나무현판", group: "wood", summary: "매장 상호와 로고를 담은 다양한 형태와 색상의 나무현판 사례입니다.", photos: 2 },
  { slug: "information", title: "안내판", group: "wood", summary: "시설 안내와 이용 수칙을 표시하는 실내외 안내판 사례입니다.", photos: 3 },
];

export const catalogAssets = "/dmdnp-assets/portfolio-catalog";

export function catalogPath(slug: string) {
  return `/portfolio/catalog/${slug}`;
}
