import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { absoluteUrl, BreadcrumbJsonLd } from "@/lib/seo";
import { uvPrintContent } from "./content";
import { designProposals, faqs } from "./data";
import { UvPrintInteractions } from "./interactions";
import "./uv-print.css";

const pagePath = "/products/uv-flatbed-print";
const title = "UV 평판인쇄 맞춤 제작 | 아크릴·목재·금속·포맥스";
const description = "아크릴·목재·금속·포맥스 등 평판 소재의 UV 인쇄 상담. 디자인 16종과 소재·화이트 인쇄·파일·후가공 조건을 확인하세요. 인천 대명DnP 010-5201-7977.";
const heroImage = "/uv-flatbed-print-assets/v1/U01-acrylic-menu.jpg";
const imageAlt = "UV 평판인쇄 아크릴 메뉴 패널";

export const metadata: Metadata = {
  title, description,
  alternates: { canonical: pagePath },
  robots: { index: true, follow: true },
  keywords: ["UV 평판인쇄", "UV 인쇄", "아크릴 인쇄", "목재 인쇄", "금속 인쇄", "포맥스 인쇄", "인천 UV 인쇄"],
  openGraph: { title: title + " | 대명DnP", description, url: pagePath, type: "website", images: [{ url: heroImage, width: 1440, height: 960, type: "image/jpeg", alt: imageAlt }] },
  twitter: { card: "summary_large_image", title: title + " | 대명DnP", description, images: [{ url: heroImage, alt: imageAlt }] },
  other: { "og:image:secure_url": absoluteUrl(heroImage), "og:image:type": "image/jpeg", "og:image:width": "1440", "og:image:height": "960", "og:image:alt": imageAlt, "twitter:image:alt": imageAlt },
};

export default function UvFlatbedPrintPage() {
  const pageUrl = absoluteUrl(pagePath);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", "@id": pageUrl + "#webpage", url: pageUrl, name: "UV 평판인쇄 맞춤 제작", description, inLanguage: "ko-KR", isPartOf: { "@id": absoluteUrl("/#website") }, publisher: { "@id": absoluteUrl("/#localbusiness") }, mainEntity: { "@id": pageUrl + "#service" }, hasPart: [{ "@id": pageUrl + "#uv-faq" }, { "@id": pageUrl + "#uv-designs" }] },
      { "@type": "Service", "@id": pageUrl + "#service", name: "대명DnP UV 평판인쇄", serviceType: "UV 평판인쇄 맞춤 제작", url: pageUrl, provider: { "@id": absoluteUrl("/#localbusiness") }, description: "평판 소재와 표면 상태, 인쇄 영역·파일·화이트 인쇄·후가공 조건을 확인해 제작 범위를 상담하는 UV 인쇄 서비스입니다. 실제 취급 소재와 최대 규격, 작업 가능 여부는 상담 후 확정합니다.", image: designProposals.map((design) => absoluteUrl(design.image)) },
      { "@type": "FAQPage", "@id": pageUrl + "#uv-faq", mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) },
      { "@type": "ItemList", "@id": pageUrl + "#uv-designs", name: "소재와 용도별 UV 평판인쇄 디자인 16종", numberOfItems: designProposals.length, itemListElement: designProposals.map((design, index) => ({ "@type": "ListItem", position: index + 1, item: { "@type": "CreativeWork", name: design.id + " " + design.title, description: design.description, image: absoluteUrl(design.image), url: pageUrl + "#uv-design-" + design.id.toLowerCase() } })) },
    ],
  };
  return <>
    <SiteHeader />
    <main id="uv-print-page" className="uv-page" dangerouslySetInnerHTML={{ __html: uvPrintContent }} />
    <UvPrintInteractions />
    <BreadcrumbJsonLd items={[{ name: "홈", href: "/" }, { name: "제품안내", href: "/products" }, { name: "UV 평판인쇄", href: pagePath }]} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    <SiteFooter />
  </>;
}
