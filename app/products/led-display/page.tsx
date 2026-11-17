import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { absoluteUrl, BreadcrumbJsonLd } from "@/lib/seo";
import { ledDisplayContent } from "./content";
import { designProposals, faqs } from "./data";
import { LedDisplayInteractions } from "./interactions";
import "./led-display.css";

const pagePath = "/products/led-display";
const title = "SMD LED 전광판 맞춤 제작 | 풀컬러 매장·시설 안내";
const description = "SMD 풀컬러 LED 전광판 맞춤 제작. 매장·학원·시설 안내용 AI 시안 16종과 피치·크기·운영 방식·설치 조건을 확인하고 상담하세요. 인천 대명DnP 010-5201-7977.";
const heroImage = "/led-display-assets/S01-cafe.jpg";
const imageAlt = "카페 공간의 SMD LED 전광판 AI 제작 제안 이미지";

export const metadata: Metadata = {
  title, description,
  alternates: { canonical: pagePath },
  robots: { index: true, follow: true },
  keywords: ["SMD 전광판", "풀컬러 전광판", "LED 전광판 제작", "매장 전광판", "전광판 맞춤 제작", "인천 전광판"],
  openGraph: { title: title + " | 대명DnP", description, url: pagePath, type: "website", images: [{ url: heroImage, width: 1440, height: 960, type: "image/jpeg", alt: imageAlt }] },
  twitter: { card: "summary_large_image", title: title + " | 대명DnP", description, images: [{ url: heroImage, alt: imageAlt }] },
  other: { "og:image:secure_url": absoluteUrl(heroImage), "og:image:type": "image/jpeg", "og:image:width": "1440", "og:image:height": "960", "og:image:alt": imageAlt, "twitter:image:alt": imageAlt },
};

export default function LedDisplayPage() {
  const pageUrl = absoluteUrl(pagePath);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", "@id": pageUrl + "#webpage", url: pageUrl, name: "SMD LED 전광판 맞춤 제작", description, inLanguage: "ko-KR", isPartOf: { "@id": absoluteUrl("/#website") }, publisher: { "@id": absoluteUrl("/#localbusiness") }, mainEntity: { "@id": pageUrl + "#product" }, hasPart: [{ "@id": pageUrl + "#sp-faq" }, { "@id": pageUrl + "#sp-designs" }] },
      { "@type": "Product", "@id": pageUrl + "#product", name: "대명DnP SMD LED 전광판 맞춤 제작", url: pageUrl, description: "설치 환경과 표시 콘텐츠에 맞춰 화면 크기·피치·모듈·컨트롤러·설치 조건을 상담하는 맞춤 전광판입니다. 이미지·영상과 연결 방식은 선택 제품의 지원 범위를 확인합니다. 이미지는 AI 제작 제안이며 실제 납품·시공 사례가 아닙니다.", category: "SMD LED 전광판", brand: { "@type": "Brand", name: "대명DnP" }, image: designProposals.map((design) => absoluteUrl(design.image)) },
      { "@type": "FAQPage", "@id": pageUrl + "#sp-faq", mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) },
      { "@type": "ItemList", "@id": pageUrl + "#sp-designs", name: "SMD 전광판 AI 제작 제안 시안 16종", numberOfItems: designProposals.length, itemListElement: designProposals.map((design, index) => ({ "@type": "ListItem", position: index + 1, item: { "@type": "CreativeWork", name: design.id + " " + design.title, description: design.description + " AI 제작 제안이며 실제 납품·시공 사례나 확정 사양이 아닙니다.", image: absoluteUrl(design.image), url: pageUrl + "#sp-design-" + design.id.toLowerCase() } })) },
    ],
  };
  return <>
    <SiteHeader />
    <main id="led-display-page" className="sp-page" dangerouslySetInnerHTML={{ __html: ledDisplayContent }} />
    <LedDisplayInteractions />
    <BreadcrumbJsonLd items={[{ name: "홈", href: "/" }, { name: "제품안내", href: "/products" }, { name: "LED 전광판", href: pagePath }]} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    <SiteFooter />
  </>;
}
