import Image from "next/image";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { products, woodSignImage, woodSignStoreUrl } from "@/lib/dmdnp-data";
import type { Metadata } from "next";
import { UnderConstructionPage } from "@/components/under-construction-page";
import { BreadcrumbJsonLd } from "@/lib/seo";

import styles from "./wood-sign.module.css";

const woodSign = products[0];

const shapes = [
  { id: "circle", label: "원형" },
  { id: "square", label: "정사각형" },
  { id: "hexagon", label: "육각형" },
  { id: "octagon", label: "팔각형" },
  { id: "triangle", label: "삼각형" },
  { id: "oval", label: "타원형" },
  { id: "rectangle", label: "직사각형" },
  { id: "rounded", label: "모서리가 둥근 형태" },
];

const colors = [
  { label: "나무색", value: "#bc8952" },
  { label: "주황", value: "#eb8a20" },
  { label: "노랑", value: "#eac511" },
  { label: "초록", value: "#649a32" },
  { label: "하늘색", value: "#168eb8" },
  { label: "청록", value: "#138988" },
  { label: "분홍", value: "#df1762" },
  { label: "짙은 회색", value: "#454a47" },
];

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
          <section className={styles.hero}>
            <div className={`site-container ${styles.heroGrid}`}>
              <div className={styles.intro}>
                <nav aria-label="현재 위치"><Link href="/products">제품안내</Link> / 나무현판</nav>
                <h1>맞춤 나무현판</h1>
                <p>가게 이름과 로고를 담아, 입구에서부터 매장 분위기가 전해지는 나무현판을 제작합니다. 카페·음식점·공방의 입구 간판이나 숙박업소의 객실명·공간 안내용으로 활용할 수 있습니다.</p>
                <div className="hero-actions">
                  <Link className="button button-orange" href="/support/inquiries">제작 견적 문의</Link>
                  <a className="button button-light" href={woodSignStoreUrl} target="_blank" rel="noopener noreferrer">스마트스토어 상품 보기</a>
                </div>
              </div>
              <figure className={styles.photo}>
                <Image src={woodSignImage} alt="Meridian Wine Bar 상호와 와인잔 로고를 넣은 분홍색 원형 나무현판" width={587} height={592} sizes="(max-width: 760px) 100vw, 48vw" preload />
                <figcaption>원형 현판에 상호와 와인잔 로고를 넣은 제작 예시</figcaption>
              </figure>
            </div>
          </section>
          <section className="section">
            <div className="site-container">
              <h2 className={styles.heading}>제작 옵션</h2>
              <div className={styles.options}>
                <article className={styles.panel}>
                  <h3>모양</h3>
                  <p>설치할 공간과 넣을 문구의 길이에 맞춰 형태를 고르세요.</p>
                  <ul className={styles.shapes}>
                    {shapes.map(({ id, label }) => (
                      <li key={id}><span className={styles.shape} data-shape={id} aria-hidden="true" />{label}</li>
                    ))}
                  </ul>
                </article>
                <article className={styles.panel}>
                  <h3>색상과 서체</h3>
                  <p>나무색을 살리거나 매장 색상에 맞춘 컬러 현판으로 제작할 수 있습니다. 아래 색상은 제작 예시입니다.</p>
                  <ul className={styles.colors}>
                    {colors.map(({ label, value }) => (
                      <li key={label}><span aria-hidden="true" style={{ backgroundColor: value }} />{label}</li>
                    ))}
                  </ul>
                  <p>원하는 서체나 참고 이미지가 있다면 상호·로고와 함께 보내 주세요.</p>
                </article>
              </div>
            </div>
          </section>
          <section className={`section ${styles.order}`}>
            <div className="site-container">
              <h2 className={styles.heading}>견적 문의 전 준비할 내용</h2>
              <ul className={styles.checklist}>
                <li><strong>크기와 수량</strong><span>희망 가로·세로 크기와 필요한 수량을 알려 주세요.</span></li>
                <li><strong>문구와 디자인</strong><span>상호, 로고 파일, 원하는 모양·색상·서체를 보내 주세요.</span></li>
                <li><strong>설치 환경</strong><span>설치 위치 사진과 벽면 상태를 알려 주세요. 실외라면 비와 직사광선에 노출되는지도 함께 적어 주세요.</span></li>
              </ul>
              <p>제작 가능 규격, 마감, 설치 방법과 제작 기간은 요청하신 사양을 확인한 뒤 안내합니다.</p>
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
