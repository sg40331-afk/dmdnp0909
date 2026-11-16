import type { Metadata } from "next";
import { AcrylicDetailFrame } from "@/components/acrylic-detail-frame";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { BreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "실리콘 LED 네온사인 맞춤 제작",
  description: "카페·매장 상호, 로고, 포토존에 어울리는 실리콘 LED 네온사인 맞춤 제작 안내와 제품 디자인 12종입니다. 크기·색상·전원·설치 환경을 확인하고 상담합니다.",
  alternates: { canonical: "/products/silicone-led-neon" },
  openGraph: { title: "대명DnP 실리콘 LED 네온사인", description: "빛으로 완성하는 매장 분위기. 맞춤 네온사인 디자인 12종과 제작 안내.", url: "/products/silicone-led-neon", images: ["/silicone-led-neon-card.jpg"] },
};

export default function SiliconeLedNeonPage() {
  return <>
    <SiteHeader />
    <main style={{ padding: 0 }}><AcrylicDetailFrame src="/silicone-led-neon-content.html" title="실리콘 LED 네온사인 상세 안내" background="#e5e7e4" /><BreadcrumbJsonLd items={[{ name: "홈", href: "/" }, { name: "제품안내", href: "/products" }, { name: "실리콘 LED 네온사인", href: "/products/silicone-led-neon" }]} /></main>
    <SiteFooter />
  </>;
}
