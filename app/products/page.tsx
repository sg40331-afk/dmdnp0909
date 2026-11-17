import Link from "next/link";
import { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { products, woodSignImage } from "@/lib/dmdnp-data";
import { PageHero, QuoteCta, SiteFooter, SiteHeader, VisualBlock } from "@/components/site-shell";
import { BreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "제품안내",
  description: "대명DnP의 나무현판, 아크릴 안내판, LED 전광판, UV 인쇄, 실사출력, 촉지도, 글자커팅, 아크릴 글자, 실리콘 LED 네온사인 제작 제품을 확인하세요.",
  alternates: { canonical: "/products" },
  openGraph: { title: "대명DnP 제품안내", description: "공간에 맞는 주요 사인 제품을 확인하세요.", url: "/products" },
};

export default function ProductsPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero kicker="PRODUCT" title="대명DnP 주요 제작 제품" text="나무현판, 아크릴 안내판, LED 전광판, UV 인쇄, 현수막, 촉지도, 글자커팅, 아크릴 글자, 실리콘 LED 네온사인까지 공간에 맞춰 제작합니다." />
        <section className="section">
          <div className="site-container grid-3">
            {products.map((item) => (
              <article className="card" key={item.slug}>
                {item.slug === "braille-tactile-map" ? <Link href="/products/braille-tactile-map" aria-label="촉지도·점자안내판 상세 보기"><VisualBlock label="출입구 지주형 촉지도 실제 작업사진" source="/braille-tactile-assets/v1/T01-work.jpg" /></Link> : item.slug === "banner-large-print" ? <Link href="/products/banner-large-print" aria-label="실사출력·현수막 상세 보기"><VisualBlock label="실사출력·현수막 디자인 구성" source="/large-format-print-assets/v1/P01-cafe-banner.jpg" /></Link> : item.slug === "metal-factory-sign" ? <Link href="/products/metal-factory-sign" aria-label="금속·공장 안내판 상세 보기"><VisualBlock label="금속·공장 안내판 디자인 구성" source="/metal-factory-sign-assets/v1/M01-production-building.jpg" /></Link> : item.slug === "uv-flatbed-print" ? <Link href="/products/uv-flatbed-print" aria-label="UV 평판인쇄 상세 보기"><VisualBlock label="UV 평판인쇄 아크릴 메뉴 패널" source="/uv-flatbed-print-assets/v1/U01-acrylic-menu.jpg" /></Link> : item.slug === "led-display" ? <Link href="/products/led-display" aria-label="LED 전광판 상세 보기"><VisualBlock label="SMD LED 전광판" source="/led-display-assets/flush-v2/S01-cafe.jpg" /></Link> : item.slug === "silicone-led-neon" ? <Link href="/products/silicone-led-neon" aria-label="실리콘 LED 네온사인 상세 보기"><VisualBlock label="실리콘 LED 네온사인 AI 디자인 시안" source="/silicone-led-neon-card.jpg" /></Link> : item.slug === "acrylic-letters" ? <Link href="/products/acrylic-letters" aria-label="아크릴 글자 상세 보기"><VisualBlock label="아크릴 글자 AI 연출 이미지" source="/acrylic-letters-card.jpg" /></Link> : item.slug === "letter-cutting" ? <Link href="/products/letter-cutting" aria-label="글자커팅 두 종류 보기"><VisualBlock label={item.name} source="/letter-cutting-preview.jpg" /></Link> : item.slug === "acrylic-sign" ? <Link href="/products/acrylic-sign" aria-label="아크릴 안내판 상세 보기"><VisualBlock label="아크릴 안내판 AI 연출 이미지" source="/acrylic-sign-assets/hero-acrylic-office.jpg" /></Link> : <VisualBlock label={item.name} source={item.slug === "wood-sign-menu" ? woodSignImage : undefined} />}
                <div className="card-body"><h3>{item.name}</h3><p>{item.slug === "braille-tactile-map" ? "실제 작업사진 30장과 도면·점자·양각 정보·부착 및 현장 조건을 확인하세요." : item.slug === "banner-large-print" ? "현수막·배너·대형 출력 디자인 16종과 파일·후가공·설치 조건을 확인하세요." : item.slug === "metal-factory-sign" ? "금속 안내판 디자인 16종과 소재·문구·부착 방식·현장 조건을 확인하세요." : item.slug === "uv-flatbed-print" ? "소재와 용도별 디자인 16종, 화이트 인쇄·파일·후가공 조건을 확인하고 상담하세요." : item.slug === "led-display" ? "SMD 전광판 디자인 16종과 피치·크기·운영·설치 조건을 확인하세요. 실제 사양과 제작 범위는 상담 후 정합니다." : item.summary}</p>{item.slug === "acrylic-letters" || item.slug === "silicone-led-neon" || item.slug === "acrylic-sign" ? <div className="product-tags"><span>AI 연출 이미지</span></div> : null}
                  {item.slug === "letter-cutting" ? <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}><Link className="text-link" href="/products/letter-cutting-character">1. 글자크기 <ArrowRight size={16} /></Link><Link className="text-link" href="/products/letter-cutting-size">2. 전체크기 <ArrowRight size={16} /></Link></div> : <Link className="text-link" href={item.slug === "braille-tactile-map" || item.slug === "banner-large-print" || item.slug === "metal-factory-sign" || item.slug === "uv-flatbed-print" || item.slug === "led-display" || item.slug === "wood-sign-menu" || item.slug === "acrylic-letters" || item.slug === "silicone-led-neon" || item.slug === "acrylic-sign" ? `/products/${item.slug}` : "/contact"}>{item.slug === "braille-tactile-map" || item.slug === "banner-large-print" || item.slug === "metal-factory-sign" || item.slug === "uv-flatbed-print" || item.slug === "led-display" || item.slug === "wood-sign-menu" || item.slug === "acrylic-letters" || item.slug === "silicone-led-neon" || item.slug === "acrylic-sign" ? "자세히 보기" : "견적 문의"} <ArrowRight size={16} /></Link>}
                </div>
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
