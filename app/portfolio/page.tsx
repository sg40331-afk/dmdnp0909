import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { QuoteCta, SiteFooter, SiteHeader } from "@/components/site-shell";
import { entries } from "@/lib/board-data";
import { configured, sb } from "@/lib/board-server";
import { getBlogImageSource } from "@/lib/dmdnp-data";
import { catalogAssets, catalogCases, catalogGroups, catalogPath } from "@/lib/portfolio-catalog";
import { BreadcrumbJsonLd } from "@/lib/seo";
import "./portfolio.css";

export const metadata = {
  title: "시공사례",
  description: "대명DnP의 간판, LED 전광판, 시트지, 나무현판 등 카탈로그 사진과 제작·시공 사례를 분야별로 확인하세요.",
  alternates: { canonical: "/portfolio" },
};

export const dynamic = "force-dynamic";

function CaseCard({ href, title, summary, image }: { href: string; title: string; summary: string; image: string }) {
  return (
    <li>
      <Link className="portfolio-case" href={href}>
        <div className="portfolio-case-image">
          <Image src={image} alt="" fill sizes="(max-width: 560px) 94vw, (max-width: 860px) 46vw, 370px" unoptimized={image.startsWith("/api/")} />
        </div>
        <div className="portfolio-case-info">
          <h3>{title}</h3>
          <ArrowUpRight size={20} aria-hidden="true" />
          <p>{summary}</p>
        </div>
      </Link>
    </li>
  );
}

export default async function Page() {
  const existing = await entries("portfolio");
  const ids = existing.filter((item) => !item.id.startsWith("legacy-")).map((item) => item.id);
  const covers: { id: string; entry_id: string }[] = configured() && ids.length
    ? await sb(`/rest/v1/board_files?entry_id=in.(${ids.join(",")})&mime=like.image%2F*&select=id,entry_id&order=created_at.asc`)
    : [];
  const coverByEntry = new Map(covers.slice().reverse().map((file) => [file.entry_id, file.id]));

  return (
    <>
      <SiteHeader />
      <main className="portfolio-main">
        <section className="portfolio-hero">
          <Image src={`${catalogAssets}/showcase.jpg`} alt="" fill sizes="100vw" preload />
          <div className="site-container portfolio-hero-content">
            <p className="portfolio-kicker">DAEMYUNG DnP / PORTFOLIO</p>
            <h1>시공사례</h1>
            <p>매장 간판부터 나무현판까지,<br />공간에 설치된 사인과 제작 사례를 만나보세요.</p>
            <a href="#catalog-cases">사례 둘러보기 <ArrowDown size={17} aria-hidden="true" /></a>
          </div>
        </section>
        <div className="site-container" id="catalog-cases">
          <nav className="portfolio-jump" aria-label="시공사례 분야">
            {catalogGroups.map((group) => <a key={group.id} href={`#portfolio-${group.id}`}>{group.label}</a>)}
            {existing.length > 0 && <a href="#portfolio-archive">기존 제작사례</a>}
          </nav>
          {catalogGroups.map((group, index) => {
            const cases = catalogCases.filter((item) => item.group === group.id);
            return (
              <section className="portfolio-group" id={`portfolio-${group.id}`} key={group.id}>
                <div className="portfolio-group-heading">
                  <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <h2>{group.label}</h2>
                  <p>{cases.length}개 분야</p>
                </div>
                <ul className="portfolio-grid-new">
                  {cases.map((item) => (
                    <CaseCard key={item.slug} href={catalogPath(item.slug)} title={item.title} summary={item.summary} image={`${catalogAssets}/${item.slug}/cover.jpg`} />
                  ))}
                </ul>
              </section>
            );
          })}
          {existing.length > 0 && (
            <section className="portfolio-group" id="portfolio-archive">
              <div className="portfolio-group-heading"><h2>기존 제작사례</h2></div>
              <ul className="portfolio-grid-new">
                {existing.map((item) => {
                  const cover = coverByEntry.get(item.id);
                  return <CaseCard key={item.id} href={`/portfolio/${item.slug}`} title={item.title} summary={item.summary} image={cover
                    ? `/api/board/files?id=${cover}`
                    : getBlogImageSource(String(item.payload.relatedProduct || item.payload.productSlug || ""), item.slug)} />;
                })}
              </ul>
            </section>
          )}
        </div>
        <QuoteCta />
      </main>
      <SiteFooter />
      <BreadcrumbJsonLd items={[{ name: "홈", href: "/" }, { name: "시공사례", href: "/portfolio" }]} />
    </>
  );
}
