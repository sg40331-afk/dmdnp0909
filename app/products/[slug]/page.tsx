import Image from "next/image";
import Link from "next/link";
import { PageHero, SiteFooter, SiteHeader } from "@/components/site-shell";
import { products, woodSignImage, woodSignStoreUrl } from "@/lib/dmdnp-data";
import type { Metadata } from "next";
import { UnderConstructionPage } from "@/components/under-construction-page";
import { BreadcrumbJsonLd } from "@/lib/seo";

const woodSign = products[0];

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (slug === woodSign.slug) {
    return {
      title: "나무현판 맞춤 제작",
      description: woodSign.summary,
      alternates: { canonical: `/products/${slug}` },
      openGraph: { title: "대명DnP 나무현판", description: woodSign.summary, url: `/products/${slug}`, images: [woodSignImage] },
    };
  }
  return {
    title: "제품 상세 준비중",
    description: "대명DnP 제품 상세 페이지를 준비 중입니다.",
    alternates: { canonical: `/products/${slug}` },
    openGraph: { title: "대명DnP 제품 상세 준비중", description: "제품 상세 페이지를 준비 중입니다.", url: `/products/${slug}` },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  if (slug === woodSign.slug) {
    return (
      <>
        <SiteHeader />
        <main>
          <PageHero kicker="PRODUCT" title="나무현판" text={woodSign.summary} />
          <section className="section">
            <div className="site-container detail-layout">
              <Image className="w-full h-auto rounded-lg" src={woodSignImage} alt="Meridian Wine Bar 상호와 와인잔 로고가 들어간 분홍색 원형 나무현판" width={587} height={592} sizes="(max-width: 980px) 100vw, 45vw" />
              <div className="card">
                <div className="card-body">
                  <h2>공간에 맞춰 만드는 나무현판</h2>
                  <p>카페와 음식점 입구, 공방과 숙박업소 안내 등 공간의 첫인상을 만드는 현판입니다. 사진처럼 원형 바탕에 상호와 로고를 배치하거나, 설치할 벽면과 출입구에 맞춰 형태를 정할 수 있습니다.</p>
                  <h3>맞춤 제작 항목</h3>
                  <p>{woodSign.custom.join(" · ")}</p>
                  <h3>주문 전 준비할 내용</h3>
                  <p>희망 크기, 넣을 문구나 로고, 설치 장소 사진을 보내 주세요. 실외에 설치할 경우 비와 직사광선 노출 여부를 함께 알려주시면 소재와 마감을 상담해 드립니다. 제작 기간과 견적은 사양과 수량을 확인한 뒤 안내합니다.</p>
                  <div className="hero-actions">
                    <Link className="button button-orange" href="/support/inquiries">제작 견적 문의</Link>
                    <a className="button button-light" href={woodSignStoreUrl} target="_blank" rel="noopener noreferrer">스마트스토어 상품 보기</a>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <BreadcrumbJsonLd items={[{ name: "홈", href: "/" }, { name: "제품안내", href: "/products" }, { name: woodSign.name, href: `/products/${slug}` }]} />
        </main>
        <SiteFooter />
      </>
    );
  }
  return (
    <>
      <UnderConstructionPage eyebrow="PRODUCT DETAIL" />
      <BreadcrumbJsonLd items={[{ name: "홈", href: "/" }, { name: "제품안내", href: "/products" }, { name: "제품 상세", href: `/products/${slug}` }]} />
    </>
  );
}
