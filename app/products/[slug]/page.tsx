import Image from "next/image";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { products, woodSignImage, woodSignStoreUrl } from "@/lib/dmdnp-data";
import type { Metadata } from "next";
import { UnderConstructionPage } from "@/components/under-construction-page";
import { BreadcrumbJsonLd } from "@/lib/seo";

import styles from "./wood-sign.module.css";

const woodSign = products[0];

const woodSignDetails = [
  { src: "/wood-sign-detail-01.jpg", height: 6411, alt: "나무현판 문패 팻말 제작 예시와 나뭇결, UV 컬러 인쇄 안내" },
  { src: "/wood-sign-detail-02.jpg", height: 4540, alt: "나무현판 주문 방법, 모양 12종과 맞춤 크기, 나무 색상 안내" },
  { src: "/wood-sign-detail-03.jpg", height: 4078, alt: "나무현판 바탕 색상과 한글 영문 서체 36종 견본" },
  { src: "/wood-sign-detail-04.jpg", height: 3800, alt: "양면테이프와 액자고리 부착 방법, 매장과 공간 안내판 제작 사례" },
  { src: "/wood-sign-detail-05.jpg", height: 4104, alt: "대명DnP 브랜드 소개, 시안 수정과 배송, 색상 차이, 교환 반품 및 제작 상담 안내" },
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
                <p>소중한 공간에 따뜻한 감성 한 스푼. 나무결을 살린 바탕에 상호·로고·문구를 UV 인쇄로 선명하게 담는 맞춤 나무현판입니다. 카페·음식점·학원·공방의 간판부터 문패, 객실명·공간 안내판과 팻말까지 원하는 모양·크기·색상·서체로 제작합니다.</p>
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
          <section className="section" aria-labelledby="wood-sign-options">
            <div className="site-container">
              <h2 id="wood-sign-options" className={styles.heading}>공간에 맞춰 고르는 맞춤 제작</h2>
              <div className={styles.options}>
                <article className={styles.panel}>
                  <h3>모양 · 크기 · 색상 · 서체</h3>
                  <p>원형·정사각형·육각형 등 기본 모양 12종과 다양한 자유형으로 제작할 수 있습니다. 원하는 가로·세로 크기를 알려 주세요.</p>
                  <p>나무 색상 10종과 한글·영문 서체 36종 견본을 참고해 바탕색, 큰 문구와 작은 문구, 글자색을 선택해 주세요.</p>
                  <p>부착 방법은 양면테이프와 액자고리 중 설치 환경에 맞춰 선택할 수 있습니다. 양면 제작·로고 작업·방수 마감·픽토그램 등 추가 옵션은 상담해 주세요.</p>
                </article>
                <article className={styles.panel}>
                  <h3>주문 방법</h3>
                  <p>모양·크기·색상·서체 등 옵션을 선택한 뒤, 들어갈 문구와 주문자 성함을 함께 문자나 카카오톡으로 보내 주세요.</p>
                  <p>로고는 AI 또는 EPS 원본 파일로 보내 주시면 확인 후 안내합니다. 디자인 시안을 확인하고 교정을 마친 뒤 제작을 진행합니다.</p>
                  <p><a href="tel:01052017977">010-5201-7977</a> / <a href="mailto:sg4033@hanmail.net">sg4033@hanmail.net</a></p>
                  <p>홈페이지 제작 문의 또는 스마트스토어에서도 상담과 주문을 진행할 수 있습니다.</p>
                </article>
              </div>
            </div>
          </section>
          <section className="section" aria-labelledby="wood-sign-details" style={{ paddingTop: 0 }}>
            <div className="site-container">
              <h2 id="wood-sign-details" className={styles.heading}>나무현판 · 문패 · 팻말 상세 안내</h2>
              <p style={{ textAlign: "center", marginBottom: "2rem", color: "#5d625e" }}>제작 예시부터 모양·색상·서체, 부착 방법과 주문 전 확인사항까지 자세히 살펴보세요. 이미지를 누르면 원본 크기로 볼 수 있습니다.</p>
              <div style={{ maxWidth: 848, marginInline: "auto" }}>
                {woodSignDetails.map((image) => (
                  <figure key={image.src} style={{ margin: 0 }}>
                    <a href={image.src} target="_blank" rel="noopener noreferrer" aria-label={image.alt + " 원본 크기로 보기"}>
                      <Image src={image.src} alt={image.alt} width={848} height={image.height} sizes="(max-width: 848px) 100vw, 848px" loading="lazy" unoptimized style={{ display: "block", width: "100%", height: "auto" }} />
                    </a>
                  </figure>
                ))}
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
