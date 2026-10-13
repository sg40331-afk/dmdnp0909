import { BoardDetail, boardMetadata } from "@/components/board-page";
type Props = { params: Promise<{ slug: string }> };
export const dynamic = "force-dynamic";
export async function generateMetadata({ params }: Props) {
  return boardMetadata("blog", (await params).slug);
}
export default async function Page({ params }: Props) {
  return <BoardDetail kind="blog" slug={(await params).slug} />;
}
