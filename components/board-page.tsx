import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageHero, SiteHeader, SiteFooter, VisualBlock } from "./site-shell";
import BoardList from "./board-list";
import {
  boardNames,
  boardPaths,
  entryFiles,
  configured,
  sb,
  type BoardKind,
} from "@/lib/board-server";
import { entries } from "@/lib/board-data";
import { getBlogImageSource, siteUrl } from "@/lib/dmdnp-data";
import { absoluteUrl, ogImagePath, BreadcrumbJsonLd } from "@/lib/seo";
import type { Metadata } from "next";
import "@/app/support/support.css";
export async function boardMetadata(
  kind: BoardKind,
  slug: string,
): Promise<Metadata> {
  const item = (await entries(kind)).find((e) => e.slug === slug);
  if (!item) return {};
  const image = absoluteUrl(
    kind === "blog"
      ? getBlogImageSource(String(item.payload.relatedProduct || ""), item.slug)
      : ogImagePath,
  );
  return {
    title: item.title,
    description: item.summary,
    alternates: { canonical: `${boardPaths[kind]}/${slug}` },
    openGraph: {
      title: item.title,
      description: item.summary,
      url: `${boardPaths[kind]}/${slug}`,
      type: kind === "blog" ? "article" : "website",
      images: [{ url: image, alt: `${item.title} 대표 이미지` }],
    },
    twitter: {
      card: "summary_large_image",
      title: item.title,
      description: item.summary,
      images: [{ url: image, alt: `${item.title} 대표 이미지` }],
    },
  };
}
export async function BoardIndex({ kind }: { kind: BoardKind }) {
  const items = await entries(kind);
  const illustrated = kind === "blog" || kind === "portfolio";
  const ids = items.filter((i) => !i.id.startsWith("legacy-")).map((i) => i.id);
  const covers: { id: string; entry_id: string }[] =
    illustrated && configured() && ids.length
      ? await sb(
          `/rest/v1/board_files?entry_id=in.(${ids.join(",")})&mime=like.image%2F*&select=id,entry_id&order=created_at.asc`,
        )
      : [];
  const listItems = items.map((item) => {
    const file = covers.find((f) => f.entry_id === item.id);
    return {
      id: item.id,
      slug: item.slug,
      title: item.title,
      category: item.category,
      summary: item.summary,
      pinned: item.pinned,
      published_at: item.published_at,
      body: kind === "faq" ? item.body : [],
      cover: illustrated
        ? file
          ? `/api/board/files?id=${file.id}`
          : getBlogImageSource(
              String(
                item.payload.relatedProduct || item.payload.productSlug || "",
              ),
              item.slug,
            )
        : undefined,
    };
  });
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          kicker="SUPPORT"
          title={boardNames[kind]}
          text={
            kind === "portfolio"
              ? "공간과 용도에 맞춘 사인 제작 사례를 확인하세요."
              : kind === "blog"
                ? "제품 선택, 파일 준비, 소재와 설치 정보를 확인하세요."
                : "대명DnP의 소식과 제작 자료를 확인하세요."
          }
        />
        <section className="section">
          <div className="site-container">
            <BoardList
              items={listItems}
              path={boardPaths[kind]}
              faq={kind === "faq"}
            />
          </div>
        </section>
      </main>
      <SiteFooter />
      <BreadcrumbJsonLd
        items={[
          { name: "홈", href: "/" },
          { name: boardNames[kind], href: boardPaths[kind] },
        ]}
      />
      {kind === "faq" && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: items.map((i) => ({
                "@type": "Question",
                name: i.title,
                acceptedAnswer: { "@type": "Answer", text: i.body.join("\n") },
              })),
            }).replace(/</g, "\\u003c"),
          }}
        />
      )}
    </>
  );
}
export async function BoardDetail({
  kind,
  slug,
}: {
  kind: BoardKind;
  slug: string;
}) {
  const item = (await entries(kind)).find((e) => e.slug === slug);
  if (!item) notFound();
  const files = item.id.startsWith("legacy-") ? [] : await entryFiles(item.id);
  const related = String(
    item.payload.relatedProduct || item.payload.productSlug || "",
  );
  const tone = (
    ["wood", "blue", "led", "print", "map"].includes(
      String(item.payload.imageTone),
    )
      ? item.payload.imageTone
      : "blue"
  ) as "wood" | "blue" | "led" | "print" | "map";
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          kicker={item.category}
          title={item.title}
          text={item.summary}
        />
        <section className="section">
          <article className="site-container">
            <p className="board-meta">{item.published_at.slice(0, 10)}</p>
            {(kind === "blog" || kind === "portfolio") &&
              !files.some((f: { mime: string }) =>
                f.mime.startsWith("image/"),
              ) && (
                <VisualBlock
                  label={`${item.title} 대표 이미지`}
                  tone={tone}
                  source={getBlogImageSource(related, item.slug)}
                />
              )}
            <div className="board-body">
              {item.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            {kind === "blog" &&
              Array.isArray(item.payload.images) &&
              item.payload.images.map((label, i) => (
                <VisualBlock
                  key={i}
                  label={String(label)}
                  tone={tone}
                  source={getBlogImageSource(related, item.slug)}
                />
              ))}
            {files.map((f: { id: string; name: string; mime: string }) =>
              f.mime.startsWith("image/") ? (
                <figure key={f.id}>
                  <Image
                    className="board-photo"
                    src={`/api/board/files?id=${f.id}`}
                    alt={f.name}
                    width={1000}
                    height={650}
                    unoptimized
                  />
                </figure>
              ) : (
                <p key={f.id}>
                  <a
                    className="board-button"
                    href={`/api/board/files?id=${f.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {f.name} 다운로드
                  </a>
                </p>
              ),
            )}
            {related && (
              <p>
                <Link href={`/products/${related}`}>관련 제품 보기</Link>
              </p>
            )}
            <p>
              <Link href={boardPaths[kind]}>목록으로</Link>
            </p>
          </article>
        </section>
      </main>
      <SiteFooter />
      <BreadcrumbJsonLd
        items={[
          { name: "홈", href: "/" },
          { name: boardNames[kind], href: boardPaths[kind] },
          { name: item.title, href: `${boardPaths[kind]}/${item.slug}` },
        ]}
      />
      {kind === "blog" && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: item.title,
              datePublished: item.published_at,
              description: item.summary,
              author: { "@type": "Organization", name: "대명DnP" },
              mainEntityOfPage: `${siteUrl}/blog/${item.slug}`,
            }).replace(/</g, "\\u003c"),
          }}
        />
      )}
    </>
  );
}
