import type { Metadata } from "next";
import { UnderConstructionPage } from "@/components/under-construction-page";
import { BreadcrumbJsonLd } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: "제품 상세 준비중",
    description: "대명DnP 제품 상세 페이지를 준비 중입니다.",
    alternates: { canonical: `/products/${slug}` },
    openGraph: { title: "대명DnP 제품 상세 준비중", description: "제품 상세 페이지를 준비 중입니다.", url: `/products/${slug}` },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  return (
    <>
      <UnderConstructionPage eyebrow="PRODUCT DETAIL" />
      <BreadcrumbJsonLd items={[{ name: "홈", href: "/" }, { name: "제품안내", href: "/products" }, { name: "제품 상세", href: `/products/${slug}` }]} />
    </>
  );
}
