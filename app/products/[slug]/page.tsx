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

const letterCuttingKinds = [
  {
    slug: "letter-cutting-character",
    label: "1. 자당",
    title: "글자커팅 · 자당",
    summary: "원하는 글자 크기를 선택하고, 글자 수만큼 수량을 정하는 맞춤 레터링 스티커입니다.",
    guide: "글자별 높이를 기준으로 크기를 정합니다. 3cm 글자 10개라면 3cm 옵션에서 수량 10개를 선택합니다. 크기가 섞여 있다면 5cm 글자 4개, 3cm 글자 6개처럼 크기별로 나누어 알려 주세요.",
    image: "/letter-cutting-character.jpg",
    height: 11198,
  },
  {
    slug: "letter-cutting-size",
    label: "2. 사이즈당",
    title: "글자커팅 · 사이즈당",
    summary: "문구와 디자인이 들어갈 전체 가로·세로 크기를 기준으로 제작하는 맞춤 레터링 스티커입니다.",
    guide: "전체 디자인의 가로·세로 규격을 선택합니다. 상세 이미지의 규격 예시는 A4 29×21cm, A3 42×29cm, A2 59×42cm입니다. 그 외 크기는 희망 규격을 보내 주시면 확인 후 안내합니다.",
    image: "/letter-cutting-size.jpg",
    height: 10376,
  },
] as const;

function LetterCuttingDetail({ slug }: { slug: string }) {
  const selected = letterCuttingKinds.find((item) => item.slug === slug);
  const title = selected?.title ?? "글자커팅";
  return (
    <>
      <SiteHeader />
      <main>
        <section className="section" style={{ paddingBottom: "2rem" }}>
          <div className="site-container">
            <nav aria-label="현재 위치"><Link href="/products">제품안내</Link> / {selected ? <><Link href="/products/letter-cutting">글자커팅</Link> / {selected.label}</> : "글자커팅"}</nav>
            <h1 style={{ marginTop: "1rem", marginBottom: "1rem", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 600 }}>{title}</h1>
            <p style={{ maxWidth: 760, lineHeight: 1.8 }}>{selected?.summary ?? "빈 공간에 디자인을 더하는 레터링 스티커·시트지 커팅입니다. 매장 영업시간, 유리창 문구, 벽면 레터링과 안내 문구를 원하는 스타일로 제작합니다. 주문 기준에 따라 자당과 사이즈당 두 종류 중 선택해 주세요."}</p>
            <div className="hero-actions">
              {letterCuttingKinds.map((item) => <Link key={item.slug} href={`/products/${item.slug}`} className={selected?.slug === item.slug ? "button button-orange" : "button button-light"} aria-current={selected?.slug === item.slug ? "page" : undefined}>{item.label} 상세 보기</Link>)}
              <Link className="button button-orange" href="/support/inquiries">제작 견적 문의</Link>
            </div>
          </div>
        </section>
        {!selected ? (
          <section className="section" style={{ paddingTop: 0 }}>
            <div className="site-container" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "1.5rem" }}>
              {letterCuttingKinds.map((item) => (
                <article className="card" key={item.slug}>
                  <Link href={`/products/${item.slug}`} aria-label={item.label + " 글자커팅 상세 보기"}>
                    <Image src="/letter-cutting-preview.jpg" alt={item.title + " 레터링 스티커"} width={874} height={653} sizes="(max-width: 760px) 100vw, 50vw" style={{ display: "block", width: "100%", height: "auto" }} />
                  </Link>
                  <div className="card-body">
                    <h2>{item.label}</h2>
                    <p>{item.summary}</p>
                    <p>{item.guide}</p>
                    <Link className="text-link" href={`/products/${item.slug}`}>{item.label} 상세 보기 →</Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : (
          <>
            <section className="section" style={{ paddingTop: 0, paddingBottom: "2rem" }}>
              <div className="site-container">
                <div className="card"><div className="card-body"><h2>주문 기준</h2><p>{selected.guide}</p><p>기본커팅과 반전커팅, 색상·서체를 선택한 뒤 들어갈 문구를 보내 주세요. 반전커팅은 실내 유리에 부착하고 실외에서 바르게 보이도록 제작하는 방식입니다.</p></div></div>
              </div>
            </section>
            <section className="section" aria-label={selected.title + " 원본 상세 안내"} style={{ paddingTop: 0 }}>
              <div className="site-container">
                <p style={{ textAlign: "center", marginBottom: "1.5rem" }}>제품 구성, 주문 방법, 색상·서체 견본과 제작 예시는 아래 상세 이미지를 확인해 주세요. 이미지를 누르면 원본 크기로 볼 수 있습니다.</p>
                <figure style={{ maxWidth: 874, margin: "0 auto" }}>
                  <a href={selected.image} target="_blank" rel="noopener noreferrer" aria-label={selected.title + " 원본 상세 이미지 보기"}>
                    <Image src={selected.image} alt={selected.title + " 제품 구성, 주문 기준, 기본·반전커팅, 주문 방법, 색상·서체 견본, 제작 예시와 주의사항"} width={874} height={selected.height} sizes="(max-width: 874px) 100vw, 874px" unoptimized style={{ display: "block", width: "100%", height: "auto" }} />
                  </a>
                </figure>
              </div>
            </section>
          </>
        )}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="site-container">
            <h2>제작 전 확인해 주세요</h2>
            <p>문구·크기·글자 수 또는 전체 규격, 색상·서체, 기본커팅·반전커팅 여부를 알려 주세요. 주문 내용 확인과 시안 교정을 마친 뒤 제작합니다.</p>
            <p>제품 구성은 커팅 시트지, 투명 보조 시트지와 밀대입니다. 보조 시트지는 접착력이 강하므로 벽지 등 손상되기 쉬운 표면에 부착할 때 주의해 주세요. 제작 금액과 일정은 선택한 사양과 수량을 확인한 뒤 안내합니다.</p>
            <div className="hero-actions"><Link href="/support/inquiries" className="button button-orange">글자커팅 제작 문의</Link><Link href="/products" className="button button-light">전체 제품 보기</Link></div>
          </div>
        </section>
        <BreadcrumbJsonLd items={[{ name: "홈", href: "/" }, { name: "제품안내", href: "/products" }, ...(selected ? [{ name: "글자커팅", href: "/products/letter-cutting" }] : []), { name: title, href: `/products/${slug}` }]} />
      </main>
      <SiteFooter />
    </>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cuttingKind = letterCuttingKinds.find((item) => item.slug === slug);
  if (slug === "letter-cutting" || cuttingKind) {
    const title = cuttingKind?.title ?? "글자커팅 · 자당·사이즈당 맞춤 제작";
    const description = cuttingKind?.summary ?? "맞춤 레터링 스티커와 시트지 커팅을 자당과 사이즈당 두 종류로 안내합니다.";
    return { title, description, alternates: { canonical: `/products/${slug}` }, openGraph: { title: `대명DnP ${title}`, description, url: `/products/${slug}`, images: ["/letter-cutting-preview.jpg"] } };
  }
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
  if (slug === "letter-cutting" || letterCuttingKinds.some((item) => item.slug === slug)) return <LetterCuttingDetail slug={slug} />;
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
