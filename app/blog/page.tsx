import { BoardIndex } from "@/components/board-page";
export const metadata = {
  title: "블로그",
  description:
    "사인 제품 선택, 제작 방법, 설치 사례, 제작현장 정보를 정리한 대명DnP 블로그입니다.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "대명DnP 블로그",
    description: "사인 제품 제작 정보를 정리한 블로그입니다.",
    url: "/blog",
  },
};
export const dynamic = "force-dynamic";
export default function Page() {
  return <BoardIndex kind="blog" />;
}
