import { company, siteUrl } from "@/lib/dmdnp-data";

export const defaultSeoTitle = "대명DnP | 간판·LED전광판·UV인쇄 전문 제작";

export const defaultSeoDescription =
  "인천·수도권 간판, LED전광판, 나무현판, 아크릴 안내판, 실사출력, UV인쇄, 촉지도 안내판을 직접 제작·시공하는 대명DnP입니다.";

export const ogImagePath = "/dmdnp-assets/og-image.png";

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//.test(path)) return path;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function breadcrumbJsonLd(items: Array<{ name: string; href: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}

export function BreadcrumbJsonLd({ items }: { items: Array<{ name: string; href: string }> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(items)) }} />;
}

export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteUrl}/#localbusiness`,
  name: company.name,
  url: siteUrl,
  image: absoluteUrl(ogImagePath),
  founder: company.representative,
  foundingDate: "2002",
  areaServed: company.serviceArea,
  telephone: company.phone,
  email: company.email,
  address: {
    "@type": "PostalAddress",
    addressCountry: "KR",
    addressRegion: "인천광역시",
    addressLocality: "남동구",
    streetAddress: "호구포로 50 엘아이지식산업센터 514호",
  },
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: company.name,
  url: siteUrl,
  inLanguage: "ko-KR",
  publisher: { "@id": `${siteUrl}/#localbusiness` },
};
