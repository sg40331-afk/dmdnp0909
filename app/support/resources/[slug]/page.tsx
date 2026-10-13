import { BoardDetail, boardMetadata } from "@/components/board-page";
type Props = { params: Promise<{ slug: string }> };
export const dynamic = "force-dynamic";
export async function generateMetadata({ params }: Props) {
  return boardMetadata("resources", (await params).slug);
}
export default async function Page({ params }: Props) {
  return <BoardDetail kind="resources" slug={(await params).slug} />;
}
