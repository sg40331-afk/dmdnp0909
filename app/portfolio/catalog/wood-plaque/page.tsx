import type { Metadata } from "next";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { absoluteUrl, BreadcrumbJsonLd } from "@/lib/seo";
import { renderProposals, presentationPhoto } from "./data";
import { woodCaseContent } from "./content";
import { WoodCaseInteractions } from "./interactions";
import "./wood-case.css";

const pagePath = "/portfolio/catalog/wood-plaque";
const title = "나무현판 | 공간별 설치 디자인 14종";
const description = "현판과 주변 공간의 조화를 넓은 구도로 살펴보는 나무현판 공간별 설치 디자인 14종을 만나보세요.";
const hero = presentationPhoto;
export const metadata: Metadata = {
  title, description,
  alternates: { canonical: pagePath },
  robots: { index: true, follow: true },
  keywords: ["나무현판", "목재 현판", "나무현판 공간 디자인", "매장 현판", "공간별 설치 디자인"],
  openGraph: { title: title + " | 대명DnP", description, url: pagePath, type: "website", images: [{ url: hero.image, width: hero.width, height: hero.height, type: "image/jpeg", alt: hero.alt }] },
  twitter: { card: "summary_large_image", title: title + " | 대명DnP", description, images: [{ url: hero.image, alt: hero.alt }] },
  other: { "og:image:secure_url": absoluteUrl(hero.image), "og:image:type": "image/jpeg", "og:image:width": String(hero.width), "og:image:height": String(hero.height), "og:image:alt": hero.alt, "twitter:image:alt": hero.alt },
};
export default function WoodPlaquePortfolioPage() {
  const pageUrl = absoluteUrl(pagePath);
  const photos = renderProposals.map(photo=>({ "@type": "ImageObject", "@id": pageUrl + "#image-" + photo.id.toLowerCase(), name: photo.title, description: photo.description, contentUrl: absoluteUrl(photo.image), thumbnailUrl: absoluteUrl(photo.card), width: photo.width, height: photo.height, url: pageUrl + "#wp-photo-" + photo.id.toLowerCase() }));
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "CollectionPage", "@id": pageUrl + "#webpage", url: pageUrl, name: "나무현판", description, inLanguage: "ko-KR", isPartOf: { "@id": absoluteUrl("/#website") }, publisher: { "@id": absoluteUrl("/#localbusiness") }, mainEntity: { "@id": pageUrl + "#gallery" }, hasPart: [{ "@id": pageUrl + "#items" }] },
      { "@type": "ImageGallery", "@id": pageUrl + "#gallery", name: "공간별 설치 디자인 14종", description, url: pageUrl, associatedMedia: photos },
      { "@type": "ItemList", "@id": pageUrl + "#items", name: "나무현판 공간별 설치 디자인 14종", numberOfItems: renderProposals.length, itemListElement: photos.map((photo,index)=>({ "@type": "ListItem", position: index+1, item: photo })) },
    ],
  };
  return <>
    <SiteHeader />
    <main id="wp-case-page" className="wp-page" dangerouslySetInnerHTML={{ __html: woodCaseContent }} />
    <WoodCaseInteractions />
    <BreadcrumbJsonLd items={[{ name: "홈", href: "/" }, { name: "시공사례", href: "/portfolio" }, { name: "나무현판", href: pagePath }]} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g,"\\u003c") }} />
    <SiteFooter />
  </>;
}
