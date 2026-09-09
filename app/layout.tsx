import type { Metadata } from "next";
import { company, siteUrl } from "@/lib/dmdnp-data";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "대명DnP | 사인 제품 직접 제작 전문업체",
    template: "%s | 대명DnP",
  },
  description: "인천 남동구의 대명DnP는 나무현판, 아크릴 안내판, LED 전광판, UV 평판인쇄, 실사출력, 촉지도와 점자안내판을 상담부터 제작까지 진행합니다.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "대명DnP 공식 홈페이지",
    description: "다양한 사인 제품을 한곳에서 직접 제작합니다.",
    url: siteUrl,
    siteName: company.name,
    locale: "ko_KR",
    type: "website",
  },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: company.name,
    url: siteUrl,
    founder: company.representative,
    foundingDate: "2002",
    areaServed: company.serviceArea,
    address: company.address,
  };

  return (
    <html lang="ko">
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      </body>
    </html>
  );
}
