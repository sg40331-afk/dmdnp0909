import { BoardIndex } from "@/components/board-page";
export const metadata = {
  title: "공지사항",
  description: "대명DnP 운영 일정과 제품 소식",
  alternates: { canonical: "/support/notices" },
};
export const dynamic = "force-dynamic";
export default function Page() {
  return <BoardIndex kind="notices" />;
}
