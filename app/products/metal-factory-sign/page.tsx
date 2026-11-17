import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { absoluteUrl, BreadcrumbJsonLd } from "@/lib/seo";
import { metalFactoryContent } from "./content";
import { designProposals, faqs } from "./data";
import { MetalFactoryInteractions } from "./interactions";
import "./metal-factory.css";

const pagePath = "/products/metal-factory-sign";
const title = "금속·공장 안내판 맞춤 제작 | 구역·설비·동선 안내";
const description = "공장 구역·설비 식별·방향 안내판 맞춤 제작 상담. 디자인 16종과 금속 소재·표현 방식·문구·도면·부착 및 현장 조건을 확인하세요. 인천 대명DnP 010-5201-7977.";
const heroImage = designProposals[0].image;
const imageAlt = designProposals[0].alt;

export const metadata: Metadata = {
  title, description,
  alternates: { canonical: pagePath },
  robots: { index: true, follow: true },
  keywords: ["금속 안내판", "공장 안내판", "설비 식별판", "공장 구역 안내", "스테인리스 안내판", "알루미늄 안내판", "인천 안내판 제작"],
  openGraph: { title: title + " | 대명DnP", description, url: pagePath, type: "website", images: [{ url: heroImage, width: 1440, height: 960, type: "image/jpeg", alt: imageAlt }] },
  twitter: { card: "summary_large_image", title: title + " | 대명DnP", description, images: [{ url: heroImage, alt: imageAlt }] },
  other: { "og:image:secure_url": absoluteUrl(heroImage), "og:image:type": "image/jpeg", "og:image:width": "1440", "og:image:height": "960", "og:image:alt": imageAlt, "twitter:image:alt": imageAlt },
};

export default function MetalFactorySignPage() {
  const pageUrl = absoluteUrl(pagePath);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", "@id": pageUrl + "#webpage", url: pageUrl, name: "금속·공장 안내판 맞춤 제작", description, inLanguage: "ko-KR", isPartOf: { "@id": absoluteUrl("/#website") }, publisher: { "@id": absoluteUrl("/#localbusiness") }, mainEntity: { "@id": pageUrl + "#service" }, hasPart: [{ "@id": pageUrl + "#mf-faq" }, { "@id": pageUrl + "#mf-designs" }] },
      { "@type": "Service", "@id": pageUrl + "#service", name: "대명DnP 금속·공장 안내판", serviceType: "금속·공장 안내판 맞춤 제작", url: pageUrl, provider: { "@id": absoluteUrl("/#localbusiness") }, description: "공장 구역·설비 식별·방향 안내를 위한 맞춤 안내판 서비스입니다. 재질·두께·표면 마감·문구 표현과 도면·고정 조건·현장 환경을 확인해 제작 범위를 상담합니다. 지원 사양과 설치 범위는 별도 확인하며, 디자인만으로 법정 표지 기준이나 성능을 보장하지 않습니다.", image: designProposals.map((design) => absoluteUrl(design.image)) },
      { "@type": "FAQPage", "@id": pageUrl + "#mf-faq", mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) },
      { "@type": "ItemList", "@id": pageUrl + "#mf-designs", name: "구역·설비·동선별 금속·공장 안내판 디자인 16종", numberOfItems: designProposals.length, itemListElement: designProposals.map((design, index) => ({ "@type": "ListItem", position: index + 1, item: { "@type": "CreativeWork", name: design.id + " " + design.title, description: design.description, image: absoluteUrl(design.image), url: pageUrl + "#mf-design-" + design.id.toLowerCase() } })) },
    ],
  };
  return <>
    <SiteHeader />
    <main id="mf-print-page" className="mf-page" dangerouslySetInnerHTML={{ __html: metalFactoryContent }} />
    <MetalFactoryInteractions />
    <BreadcrumbJsonLd items={[{ name: "홈", href: "/" }, { name: "제품안내", href: "/products" }, { name: "금속·공장 안내판", href: pagePath }]} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    <SiteFooter />
  </>;
}
