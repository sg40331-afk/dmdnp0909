import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { absoluteUrl, BreadcrumbJsonLd } from "@/lib/seo";
import { brailleTactileContent } from "./content";
import { designProposals, faqs } from "./data";
import { BrailleTactileInteractions } from "./interactions";
import "./braille-tactile.css";

const pagePath = "/products/braille-tactile-map";
const title = "촉지도·점자안내판 맞춤 제작 | 실제 작업사진 30장";
const description = "실제 촉지도·점자안내판 작업사진 30장으로 지주형·벽부형·화장실 안내 구성을 확인하세요. 도면·점역·양각·설치 조건을 함께 검토하는 인천 대명DnP 제작 상담 010-5201-7977.";
const hero = designProposals[0];
const heroDimensions = hero.width && hero.height ? { width: hero.width, height: hero.height } : {};
const other: Record<string,string> = { "og:image:secure_url": absoluteUrl(hero.image), "og:image:type": "image/jpeg", "og:image:alt": hero.alt, "twitter:image:alt": hero.alt };
if (hero.width && hero.height) { other["og:image:width"] = String(hero.width); other["og:image:height"] = String(hero.height); }

export const metadata: Metadata = {
  title, description,
  alternates: { canonical: pagePath },
  robots: { index: true, follow: true },
  keywords: ["촉지도", "점자안내판", "촉지안내도", "점자안내도", "지주형 촉지도", "벽부형 촉지도", "화장실 촉지도", "인천 점자안내판 제작"],
  openGraph: { title: title + " | 대명DnP", description, url: pagePath, type: "website", images: [{ url: hero.image, ...heroDimensions, type: "image/jpeg", alt: hero.alt }] },
  twitter: { card: "summary_large_image", title: title + " | 대명DnP", description, images: [{ url: hero.image, alt: hero.alt }] },
  other,
};

export default function BrailleTactileMapPage() {
  const pageUrl = absoluteUrl(pagePath);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", "@id": pageUrl + "#webpage", url: pageUrl, name: "촉지도·점자안내판 맞춤 제작", description, inLanguage: "ko-KR", isPartOf: { "@id": absoluteUrl("/#website") }, publisher: { "@id": absoluteUrl("/#localbusiness") }, mainEntity: { "@id": pageUrl + "#service" }, hasPart: [{ "@id": pageUrl + "#bt-faq" }, { "@id": pageUrl + "#bt-designs" }] },
      { "@type": "Service", "@id": pageUrl + "#service", name: "대명DnP 촉지도·점자안내판", serviceType: "촉지도·점자안내판 맞춤 제작", url: pageUrl, provider: { "@id": absoluteUrl("/#localbusiness") }, description: "도면·공간명·현재 위치와 진입 방향, 점자·양각 정보 구성 및 설치 조건을 확인하는 맞춤 제작 상담 서비스입니다. 점역·교정과 부속·추가 기능, 납품·시공 범위 및 시설별 적용 기준을 별도로 확인합니다.", image: designProposals.map(photo=>absoluteUrl(photo.image)) },
      { "@type": "FAQPage", "@id": pageUrl + "#bt-faq", mainEntity: faqs.map(faq=>({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) },
      { "@type": "ItemList", "@id": pageUrl + "#bt-designs", name: "촉지도·점자안내판 실제 작업사진 30장", numberOfItems: designProposals.length, itemListElement: designProposals.map((photo,index)=>({ "@type": "ListItem", position: index+1, item: { "@type": "ImageObject", name: photo.id + " " + photo.title, description: photo.description, contentUrl: absoluteUrl(photo.image), image: absoluteUrl(photo.image), url: pageUrl + "#bt-design-" + photo.id.toLowerCase() } })) },
    ],
  };
  return <>
    <SiteHeader />
    <main id="bt-print-page" className="bt-page" dangerouslySetInnerHTML={{ __html: brailleTactileContent }} />
    <BrailleTactileInteractions />
    <BreadcrumbJsonLd items={[{ name: "홈", href: "/" }, { name: "제품안내", href: "/products" }, { name: "촉지도·점자안내판", href: pagePath }]} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    <SiteFooter />
  </>;
}
