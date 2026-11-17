import type { Metadata } from "next";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { absoluteUrl, BreadcrumbJsonLd } from "@/lib/seo";
import { designProposals, faqs, renderProposals, presentationPhoto } from "./data";
import { woodCaseContent } from "./content";
import { WoodCaseInteractions } from "./interactions";
import "./wood-case.css";

const pagePath = "/portfolio/catalog/wood-plaque";
const title = "나무현판 | 원본 제작사진 13장·설치연출 14장";
const description = "나무현판의 형태·색상·상호 표현을 원본 제작사진 13장과 별도 설치연출 이미지로 살펴보세요. 실제 소재·규격·마감·설치 조건은 상담합니다. 대명DnP 010-5201-7977.";
const heroImage = presentationPhoto?.image || "/wood-portfolio-assets/v1/W04-original.jpg";
const heroAlt = "나무현판 설치연출 · 실제 시공현장 사진이 아닌 별도 배경 구성";
export const metadata: Metadata = {
  title, description,
  alternates: { canonical: pagePath },
  robots: { index: true, follow: true },
  keywords: ["나무현판", "목재 현판", "나무현판 제작사진", "현판 설치연출", "매장 상호 현판", "인천 나무현판"],
  openGraph: { title: title + " | 대명DnP", description, url: pagePath, type: "website", images: [{ url: heroImage, ...(presentationPhoto?.width && presentationPhoto?.height ? { width:presentationPhoto.width, height:presentationPhoto.height } : {}), type: "image/jpeg", alt: heroAlt }] },
  twitter: { card: "summary_large_image", title: title + " | 대명DnP", description, images: [{ url: heroImage, alt: heroAlt }] },
  other: { "og:image:secure_url": absoluteUrl(heroImage), "og:image:type": "image/jpeg", "og:image:alt": heroAlt, ...(presentationPhoto?.width && presentationPhoto?.height ? { "og:image:width":String(presentationPhoto.width), "og:image:height":String(presentationPhoto.height) } : {}), "twitter:image:alt": heroAlt },
};
export default function WoodPlaquePortfolioPage() {
  const pageUrl = absoluteUrl(pagePath);
  const photos = designProposals.map(photo=>({ "@type": "ImageObject", "@id": pageUrl + "#photo-" + photo.id.toLowerCase(), name: photo.id + " " + photo.title, description: photo.description, contentUrl: absoluteUrl(photo.image), thumbnailUrl: absoluteUrl(photo.card), width: photo.width, height: photo.height, url: pageUrl + "#wp-photo-" + photo.id.toLowerCase() }));
  const renders=renderProposals.map(photo=>({ "@type":"ImageObject", name:"설치연출 "+photo.id+" "+photo.title, description:"별도 배경과 배치로 구성한 설치연출이며 실제 시공사진이 아닙니다. "+photo.description, contentUrl:absoluteUrl(photo.image), thumbnailUrl:absoluteUrl(photo.card), url:pageUrl+"#wp-render-"+photo.id.toLowerCase() }));
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "CollectionPage", "@id": pageUrl + "#webpage", url: pageUrl, name: "나무현판", description, inLanguage: "ko-KR", isPartOf: { "@id": absoluteUrl("/#website") }, publisher: { "@id": absoluteUrl("/#localbusiness") }, mainEntity: { "@id": pageUrl + "#gallery" }, hasPart: [{ "@id": pageUrl + "#items" }, { "@id": pageUrl + "#renders" }, { "@id": pageUrl + "#faq" }] },
      { "@type": "ImageGallery", "@id": pageUrl + "#gallery", name: "나무현판 원본 제작사진 13장", description: "기존 나무현판 카탈로그의 원본 사진 모음입니다. 사진 수는 현장이나 프로젝트 건수가 아니며, 별도 배경 연출 콜라주는 이 원본 갤러리에 포함하지 않습니다.", url: pageUrl + "#wp-photos", mainEntityOfPage: { "@id": pageUrl + "#webpage" }, associatedMedia: photos },
      { "@type": "ItemList", "@id": pageUrl + "#items", name: "나무현판 원본 제작사진 13장", numberOfItems: designProposals.length, itemListElement: photos.map((photo,index)=>({ "@type": "ListItem", position: index+1, item: photo })) },
      { "@type":"ImageGallery", "@id":pageUrl+"#renders", name:"나무현판 설치연출 이미지", description:"원본 현판을 참고해 구성한 설치연출로 실제 고객의 설치현장이나 시공실적을 의미하지 않습니다.", url:pageUrl+"#wp-staged", associatedMedia:renders },
      { "@type": "FAQPage", "@id": pageUrl + "#faq", mainEntity: faqs.map(faq=>({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) },
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
