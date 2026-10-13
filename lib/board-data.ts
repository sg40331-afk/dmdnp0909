import { blogPosts, portfolioItems, faqs } from "@/lib/dmdnp-data";
import { publicEntries, type BoardEntry, type BoardKind } from "./board-server";
export function legacyEntries(): Omit<BoardEntry, "id" | "updated_at">[] {
  const common = { published: true, pinned: false, sort_order: 0 };
  return [
    ...blogPosts.map((post) => ({
      ...common,
      kind: "blog" as const,
      slug: post.slug,
      title: post.title,
      category: post.category,
      summary: post.summary,
      body: post.body,
      published_at: new Date(post.date).toISOString(),
      payload: { ...post },
    })),
    ...portfolioItems.map((item) => ({
      ...common,
      kind: "portfolio" as const,
      slug: item.slug,
      title: item.title,
      category: item.category,
      summary: item.place,
      body: [item.request, item.material, item.method],
      published_at: "2026-01-01T00:00:00.000Z",
      payload: { ...item },
    })),
    ...faqs.map((item, i) => ({
      ...common,
      sort_order: i,
      kind: "faq" as const,
      slug: `faq-${i + 1}`,
      title: item.question,
      category: "제작 상담",
      summary: item.answer,
      body: [item.answer],
      published_at: "2026-01-01T00:00:00.000Z",
      payload: {},
    })),
  ];
}
export async function entries(kind: BoardKind): Promise<BoardEntry[]> {
  const data = await publicEntries(kind);
  return (
    data ??
    legacyEntries()
      .filter((e) => e.kind === kind)
      .map((e, i) => ({ ...e, id: `legacy-${i}`, updated_at: e.published_at }))
  );
}
