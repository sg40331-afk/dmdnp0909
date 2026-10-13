import { BoardIndex } from "@/components/board-page";
export const metadata = {
  title: "시공사례",
  description:
    "대명DnP 나무현판, 아크릴 안내판, LED 전광판, UV 출력, 현수막, 촉지도 제작 사례",
  alternates: { canonical: "/portfolio" },
};
export const dynamic = "force-dynamic";
export default function Page() {
  return <BoardIndex kind="portfolio" />;
}
