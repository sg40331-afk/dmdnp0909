import { BoardIndex } from "@/components/board-page";
export const metadata = {
  title: "자료실",
  description: "대명DnP 주문서, 디자인 양식과 제작 안내",
  alternates: { canonical: "/support/resources" },
};
export const dynamic = "force-dynamic";
export default function Page() {
  return <BoardIndex kind="resources" />;
}
