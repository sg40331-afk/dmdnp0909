import { portfolioItems } from "@/lib/dmdnp-data";
import { PageHero, QuoteCta, SiteFooter, SiteHeader, VisualBlock } from "@/components/site-shell";

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
      </main>
      <SiteFooter />
    </>
  );
}
