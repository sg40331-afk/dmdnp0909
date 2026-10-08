import Link from "next/link";
import { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { products } from "@/lib/dmdnp-data";
import { PageHero, QuoteCta, SiteFooter, SiteHeader, VisualBlock } from "@/components/site-shell";
import { BreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "제품안내",
  description: "대명DnP의 나무현판, 아크릴 안내판, LED 전광판, UV 인쇄, 실사출력, 촉지도 안내판 제작 제품을 확인하세요.",
  alternates: { canonical: "/products" },
  openGraph: { title: "대명DnP 제품안내", description: "공간에 맞는 주요 사인 제품을 확인하세요.", url: "/products" },
};

export default function ProductsPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero kicker="PRODUCT" title="대명DnP 주요 제작 제품" text="나무현판, 아크릴 안내판, LED 전광판, UV 인쇄, 현수막, 촉지도까지 공간에 맞춰 제작합니다." />
        <section className="section">
          <div className="site-container grid-3">
            {products.map((item) => (
              <article className="card" key={item.slug}>
                <VisualBlock label={item.name} />
                <div className="card-body"><h3>{item.name}</h3><p>{item.summary}</p><Link className="text-link" href="/contact">견적 문의 <ArrowRight size={16} /></Link></div>
              </article>
            ))}
          </div>
        </section>
        <QuoteCta />
        <BreadcrumbJsonLd items={[{ name: "홈", href: "/" }, { name: "제품안내", href: "/products" }]} />
      </main>
      <SiteFooter />
    </>
  );
}
