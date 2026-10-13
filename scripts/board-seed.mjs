import { blogPosts, portfolioItems, faqs } from "../lib/dmdnp-data.ts";
const base = { published: true, pinned: false, sort_order: 0 };
const rows = [
  ...blogPosts.map((p) => ({
    ...base,
    kind: "blog",
    slug: p.slug,
    title: p.title,
    category: p.category,
    summary: p.summary,
    body: p.body,
    published_at: new Date(p.date).toISOString(),
    payload: p,
  })),
  ...portfolioItems.map((p) => ({
    ...base,
    kind: "portfolio",
    slug: p.slug,
    title: p.title,
    category: p.category,
    summary: p.place,
    body: [p.request, p.material, p.method],
    published_at: "2026-01-01T00:00:00.000Z",
    payload: p,
  })),
  ...faqs.map((p, i) => ({
    ...base,
    kind: "faq",
    slug: `faq-${i + 1}`,
    title: p.question,
    category: "제작 상담",
    summary: p.answer,
    body: [p.answer],
    sort_order: i,
    published_at: "2026-01-01T00:00:00.000Z",
    payload: {},
  })),
];
process.stdout.write(
  JSON.stringify(
    rows.slice(
      Number(process.argv[2] || 0),
      Number(process.argv[2] || 0) + Number(process.argv[3] || rows.length),
    ),
  ),
);
