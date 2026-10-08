import type { Metadata } from "next";
import Script from "next/script";
import { company, siteUrl } from "@/lib/dmdnp-data";
import { absoluteUrl, defaultSeoDescription, defaultSeoTitle, localBusinessJsonLd, ogImagePath, websiteJsonLd } from "@/lib/seo";
import "./globals.css";

const ogImageUrl = absoluteUrl(ogImagePath);
const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultSeoTitle,
    template: "%s | 대명DnP",
  },
  description: defaultSeoDescription,
  alternates: { canonical: "/" },
  openGraph: {
    title: defaultSeoTitle,
    description: defaultSeoDescription,
    url: siteUrl,
    siteName: company.name,
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: ogImageUrl,
        type: "image/png",
        width: 1200,
        height: 630,
        alt: "대명DnP 간판 LED전광판 UV인쇄 사인 제품 제작 안내 이미지",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultSeoTitle,
    description: defaultSeoDescription,
    images: [{ url: ogImageUrl, alt: "대명DnP 간판 LED전광판 UV인쇄 사인 제품 제작 안내 이미지" }],
  },
  other: {
    "og:image:secure_url": ogImageUrl,
    "og:image:type": "image/png",
    "og:image:width": "1200",
    "og:image:height": "630",
    "og:image:alt": "대명DnP 간판 LED전광판 UV인쇄 사인 제품 제작 안내 이미지",
    "twitter:image:alt": "대명DnP 간판 LED전광판 UV인쇄 사인 제품 제작 안내 이미지",
  },
  icons: { icon: [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png", sizes: "512x512" }, { url: "/favicon.svg", type: "image/svg+xml" }], shortcut: "/favicon.ico", apple: "/apple-icon.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
        {gaMeasurementId ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaMeasurementId}');`}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
