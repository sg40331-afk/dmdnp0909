import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { absoluteUrl, BreadcrumbJsonLd } from "@/lib/seo";
import { bannerPrintContent } from "./content";
import { designProposals, faqs } from "./data";
import { BannerPrintInteractions } from "./interactions";
import "./banner-print.css";

const pagePath = "/products/banner-large-print";
const title = "실사출력·현수막 맞춤 제작 | 배너·대형 출력";
const description = "현수막·배너·대형 출력 디자인 16종과 소재·파일·아일렛·봉미싱·거치대·설치 조건을 확인하세요. 규격과 수량에 맞춘 인천 대명DnP 제작 상담 010-5201-7977.";
const heroImage = designProposals[0]?.image || "";
const imageAlt = designProposals[0]?.alt || "실사출력·현수막 디자인";

export const metadata: Metadata = {
  title, description,
  alternates: { canonical: pagePath },
  robots: { index: true, follow: true },
  keywords: ["실사출력", "현수막 제작", "배너 제작", "대형 출력", "아일렛", "봉미싱", "인천 현수막"],
  openGraph: { title: title + " | 대명DnP", description, url: pagePath, type: "website", images: [{ url: heroImage, width: 1440, height: 960, type: "image/jpeg", alt: imageAlt }] },
  twitter: { card: "summary_large_image", title: title + " | 대명DnP", description, images: [{ url: heroImage, alt: imageAlt }] },
  other: { "og:image:secure_url": absoluteUrl(heroImage), "og:image:type": "image/jpeg", "og:image:width": "1440", "og:image:height": "960", "og:image:alt": imageAlt, "twitter:image:alt": imageAlt },
};

export default function BannerLargePrintPage() {
  const pageUrl = absoluteUrl(pagePath);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", "@id": pageUrl + "#webpage", url: pageUrl, name: "실사출력·현수막 맞춤 제작", description, inLanguage: "ko-KR", isPartOf: { "@id": absoluteUrl("/#website") }, publisher: { "@id": absoluteUrl("/#localbusiness") }, mainEntity: { "@id": pageUrl + "#service" }, hasPart: [{ "@id": pageUrl + "#bp-faq" }, { "@id": pageUrl + "#bp-designs" }] },
      { "@type": "Service", "@id": pageUrl + "#service", name: "대명DnP 실사출력·현수막", serviceType: "실사출력·현수막 맞춤 제작", url: pageUrl, provider: { "@id": absoluteUrl("/#localbusiness") }, description: "현수막·배너·대형 출력물의 용도와 크기, 소재·파일·후가공·거치대 및 납품·설치 범위를 확인하는 맞춤 제작 상담 서비스입니다. 실제 취급 소재와 최대 규격, 작업 가능 여부 및 비용·일정은 상담 후 확정합니다.", image: designProposals.map((design) => absoluteUrl(design.image)) },
      { "@type": "FAQPage", "@id": pageUrl + "#bp-faq", mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) },
      { "@type": "ItemList", "@id": pageUrl + "#bp-designs", name: "형태와 용도별 실사출력·현수막 디자인 16종", numberOfItems: designProposals.length, itemListElement: designProposals.map((design, index) => ({ "@type": "ListItem", position: index + 1, item: { "@type": "CreativeWork", name: design.id + " " + design.title, description: design.description, image: absoluteUrl(design.image), url: pageUrl + "#bp-design-" + design.id.toLowerCase() } })) },
    ],
  };
  return <>
    <SiteHeader />
    <main id="bp-print-page" className="bp-page" dangerouslySetInnerHTML={{ __html: bannerPrintContent }} />
    <BannerPrintInteractions />
    <BreadcrumbJsonLd items={[{ name: "홈", href: "/" }, { name: "제품안내", href: "/products" }, { name: "실사출력·현수막", href: pagePath }]} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    <SiteFooter />
  </>;
}
