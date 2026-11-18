import type { Metadata } from "next";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { absoluteUrl, BreadcrumbJsonLd } from "@/lib/seo";
import { workPhotos, presentationPhoto } from "./data";
import { brailleCaseContent } from "./content";
import { BrailleCaseInteractions } from "./interactions";
import "./braille-case.css";

const pagePath = "/portfolio/catalog/braille-tactile-map";
const title = "점자안내판 사진 모음 | 촉지도 사진 50장";
const description = "촉지도·점자안내판 사진 50장을 넓은 구도로 살펴보세요.";
const hero = presentationPhoto;
export const metadata: Metadata = {
  title, description,
  alternates: { canonical: pagePath },
  robots: { index: true, follow: true },
  keywords: ["점자안내판 사진", "촉지도 사진 모음", "점자안내판 디자인", "지주형 촉지도", "벽부형 촉지도"],
  openGraph: { title: title + " | 대명DnP", description, url: pagePath, type: "website", images: [{ url: hero.image, width: hero.width, height: hero.height, type: "image/jpeg", alt: hero.alt }] },
  twitter: { card: "summary_large_image", title: title + " | 대명DnP", description, images: [{ url: hero.image, alt: hero.alt }] },
  other: { "og:image:secure_url": absoluteUrl(hero.image), "og:image:type": "image/jpeg", "og:image:width": String(hero.width), "og:image:height": String(hero.height), "og:image:alt": hero.alt, "twitter:image:alt": hero.alt },
};
export default function BrailleTactilePortfolioPage() {
  const pageUrl = absoluteUrl(pagePath);
  const photos = workPhotos.map(photo=>({ "@type": "ImageObject", "@id": pageUrl + "#image-" + photo.id.toLowerCase(), name: photo.title, description: photo.description, contentUrl: absoluteUrl(photo.image), thumbnailUrl: absoluteUrl(photo.card), width: photo.width, height: photo.height, url: pageUrl + "#btp-photo-" + photo.id.toLowerCase() }));
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "CollectionPage", "@id": pageUrl + "#webpage", url: pageUrl, name: "점자안내판", description, inLanguage: "ko-KR", isPartOf: { "@id": absoluteUrl("/#website") }, publisher: { "@id": absoluteUrl("/#localbusiness") }, mainEntity: { "@id": pageUrl + "#gallery" }, hasPart: [{ "@id": pageUrl + "#items" }] },
      { "@type": "ImageGallery", "@id": pageUrl + "#gallery", name: "점자안내판·촉지도 사진 50장", description, url: pageUrl, associatedMedia: photos },
      { "@type": "ItemList", "@id": pageUrl + "#items", name: "점자안내판·촉지도 사진 50장", numberOfItems: workPhotos.length, itemListElement: photos.map((photo,index)=>({ "@type": "ListItem", position: index+1, item: photo })) },
    ],
  };
  return <>
    <SiteHeader />
    <main id="btp-case-page" className="btp-page" dangerouslySetInnerHTML={{ __html: brailleCaseContent }} />
    <BrailleCaseInteractions />
    <BreadcrumbJsonLd items={[{ name: "홈", href: "/" }, { name: "시공사례", href: "/portfolio" }, { name: "점자안내판", href: pagePath }]} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g,"\\u003c") }} />
    <SiteFooter />
  </>;
}
