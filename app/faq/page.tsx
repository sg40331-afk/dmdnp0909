import { BoardIndex } from "@/components/board-page";
export const metadata = {
  title: "자주 묻는 질문",
  description:
    "대명DnP 사인 제품 제작 기간, 설치, 디자인, 견적 기준에 대한 자주 묻는 질문입니다.",
  alternates: { canonical: "/faq" },
};
export const dynamic = "force-dynamic";
export default function Page() {
  return <BoardIndex kind="faq" />;
}
