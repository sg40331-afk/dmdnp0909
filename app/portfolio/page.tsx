import { Metadata } from "next";
import { portfolioItems } from "@/lib/dmdnp-data";
import { PageHero, QuoteCta, SiteFooter, SiteHeader, VisualBlock } from "@/components/site-shell";
import { BreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "제작사례",
  description: "대명DnP가 제작하는 나무현판, 아크릴 안내판, LED 전광판, UV 출력, 현수막, 촉지도 사례를 확인하세요.",
  alternates: { canonical: "/portfolio" },
  openGraph: { title: "대명DnP 제작사례", description: "다양한 사인 제품 제작사례를 확인하세요.", url: "/portfolio" },
};

export default function PortfolioPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero kicker="PORTFOLIO" title="제작사례" text="카페, 사무실, 공장, 공공시설까지 다양한 공간의 사인 제작 사례를 확인하세요." />
        <section className="section">
          <div className="site-container portfolio-grid">
            {portfolioItems.map((item) => (
              <article className="card" key={item.slug}>
                <VisualBlock label={item.category} />
                <div className="card-body"><h3>{item.title}</h3><p>{item.place}</p></div>
              </article>
            ))}
          </div>
        </section>
        <QuoteCta />
        <BreadcrumbJsonLd items={[{ name: "홈", href: "/" }, { name: "제작사례", href: "/portfolio" }]} />
      </main>
      <SiteFooter />
    </>
  );
}
