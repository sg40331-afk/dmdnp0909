import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { absoluteUrl, BreadcrumbJsonLd } from "@/lib/seo";
import { acrylicSignContent } from "./content";
import { designProposals, faqs } from "./data";
import { AcrylicSignInteractions } from "./interactions";
import "./acrylic-sign.css";

const pagePath = "/products/acrylic-sign";
const title = "아크릴 안내판 맞춤 제작 | 회의실·화장실 표지판";
const description = "흰색·컬러 배경과 투명 앞면의 아크릴 안내판 맞춤 제작. 회의실·화장실·층별 안내 등 시안 12종과 크기·인쇄·설치 조건을 확인하고 상담합니다. 인천 대명DnP.";
const heroImage = "/acrylic-sign-assets/hero-acrylic-office.jpg";
const imageAlt = "흰색 배경 디자인과 투명 앞면의 아크릴 회의실 안내판 AI 공간 연출 이미지";

export const metadata: Metadata = {
  title, description,
  alternates: { canonical: pagePath },
  robots: { index: true, follow: true },
  keywords: ["아크릴 안내판 제작", "회의실 안내판", "사무실 명패", "화장실 표지판", "층별 안내판", "인천 아크릴 안내판"],
  openGraph: { title: title + " | 대명DnP", description, url: pagePath, type: "website", images: [{ url: heroImage, width: 1440, height: 960, type: "image/jpeg", alt: imageAlt }] },
  twitter: { card: "summary_large_image", title: title + " | 대명DnP", description, images: [{ url: heroImage, alt: imageAlt }] },
  other: { "og:image:secure_url": absoluteUrl(heroImage), "og:image:type": "image/jpeg", "og:image:width": "1440", "og:image:height": "960", "og:image:alt": imageAlt, "twitter:image:alt": imageAlt },
};

export default function AcrylicSignPage() {
  const pageUrl = absoluteUrl(pagePath);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", "@id": pageUrl + "#webpage", url: pageUrl, name: "아크릴 안내판 맞춤 제작", description, inLanguage: "ko-KR", isPartOf: { "@id": absoluteUrl("/#website") }, publisher: { "@id": absoluteUrl("/#localbusiness") }, mainEntity: { "@id": pageUrl + "#product" } },
      { "@type": "Product", "@id": pageUrl + "#product", name: "대명DnP 아크릴 안내판 맞춤 제작", url: pageUrl, description: "흰색·컬러 배경에 문구·로고·픽토그램을 표현하고 투명 앞면을 더한 맞춤 판형 안내 사인입니다. 실제 판 구성·인쇄·크기·부속·설치 조건을 확인한 뒤 견적과 일정을 안내합니다. 이미지는 AI 제작 제안 시안이며 실제 납품 사례가 아닙니다.", category: "아크릴 안내판", material: "아크릴", brand: { "@type": "Brand", name: "대명DnP" }, manufacturer: { "@id": absoluteUrl("/#localbusiness") }, image: [absoluteUrl(heroImage), ...designProposals.map((design) => absoluteUrl(design.image))] },
      { "@type": "FAQPage", "@id": pageUrl + "#faq", mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) },
      { "@type": "ItemList", "@id": pageUrl + "#design-proposals", name: "아크릴 안내판 AI 제작 제안 시안 12종", numberOfItems: designProposals.length, itemListElement: designProposals.map((design, index) => ({ "@type": "ListItem", position: index + 1, item: { "@type": "CreativeWork", name: design.id + " " + design.title, description: design.description + " AI 제작 제안 시안이며 확정 판매 사양이 아닙니다.", image: absoluteUrl(design.image), url: pageUrl + "#as-design-" + design.id.toLowerCase() } })) },
    ],
  };
  return <>
    <SiteHeader />
    <main id="acrylic-sign-page" className="as-page" dangerouslySetInnerHTML={{ __html: acrylicSignContent }} />
    <AcrylicSignInteractions />
    <BreadcrumbJsonLd items={[{ name: "홈", href: "/" }, { name: "제품안내", href: "/products" }, { name: "아크릴 안내판", href: pagePath }]} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    <SiteFooter />
  </>;
}
