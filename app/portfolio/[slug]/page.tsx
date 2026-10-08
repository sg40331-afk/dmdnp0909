import type { Metadata } from "next";
import { UnderConstructionPage } from "@/components/under-construction-page";
import { BreadcrumbJsonLd } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: "제작사례 상세 준비중",
    description: "대명DnP 제작사례 상세 페이지를 준비 중입니다.",
    alternates: { canonical: `/portfolio/${slug}` },
    openGraph: { title: "대명DnP 제작사례 상세 준비중", description: "제작사례 상세 페이지를 준비 중입니다.", url: `/portfolio/${slug}` },
  };
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params;
  return (
    <>
      <UnderConstructionPage eyebrow="PORTFOLIO DETAIL" />
      <BreadcrumbJsonLd items={[{ name: "홈", href: "/" }, { name: "제작사례", href: "/portfolio" }, { name: "제작사례 상세", href: `/portfolio/${slug}` }]} />
    </>
  );
}
