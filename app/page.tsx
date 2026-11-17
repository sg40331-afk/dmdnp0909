import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, CheckCircle2, Eye, Factory, MessageCircle, PenTool, Printer, Settings, ShieldCheck, Truck, Wrench } from "lucide-react";
import { faqs, portfolioItems, products, woodSignImage } from "@/lib/dmdnp-data";
import { SiteFooter, SiteHeader } from "@/components/site-shell";

const productCards = [
  { image: woodSignImage, category: "나무현판", title: "나무현판", benefit: "상호와 로고를 담은 맞춤 제작", description: "설치 공간과 브랜드 분위기에 맞춰 나무현판을 제작합니다.", tags: ["카페", "음식점"], position: "center 45%" },
  { image: "/dmdnp-assets/acrylic-sign.png", category: "아크릴", title: "아크릴 안내판", benefit: "깔끔하고 세련된 공간 안내", description: "회의실, 사무실, 건물 안내에 어울리는 정돈된 사인을 제작합니다.", tags: ["사무실", "병원"], position: "center 48%" },
  { image: "/led-display-assets/flush-v2/S01-cafe.jpg", category: "LED 전광판", title: "SMD LED 전광판", benefit: "매장의 소식을 담는 맞춤 화면", description: "영업·메뉴·행사 안내를 공간에 맞는 전광판 화면으로 전달합니다.", tags: ["매장", "홍보"], position: "center 50%" },
  { image: "/uv-flatbed-print-assets/v1/U01-acrylic-menu.jpg", category: "UV인쇄", title: "UV 평판인쇄", benefit: "소재 위에 담는 맞춤 컬러", description: "아크릴·목재·금속·포맥스 등 소재와 인쇄 조건을 확인해 제작합니다.", tags: ["소재별 인쇄", "맞춤 제작"], position: "center 50%" },
  { image: "/large-format-print-assets/v1/P01-cafe-banner.jpg", category: "실사출력", title: "실사출력·현수막", benefit: "공간과 목적에 맞춘 홍보 출력물", description: "디자인 16종과 원단·파일·후가공·설치 조건을 확인하고 상담하세요.", tags: ["현수막·배너", "맞춤 출력"], position: "center 50%" },
  { image: "/braille-tactile-assets/v1/T01-work.jpg", category: "촉지도", title: "촉지도·점자안내판", benefit: "동선과 공간을 고려한 맞춤 안내", description: "실제 작업사진 30장과 지주형·벽부형·화장실 안내 구성을 확인하고 상담하세요.", tags: ["촉지도", "점자안내"], position: "center 50%" },
  { image: "/letter-cutting-preview.jpg", category: "글자커팅", title: "글자커팅", benefit: "글자크기 · 전체크기 맞춤 레터링", description: "유리창·벽면·매장 문구를 원하는 스타일로 제작합니다. 글자크기과 전체크기 두 종류를 선택해 보세요.", tags: ["1. 글자크기", "2. 전체크기"], position: "center 50%" },
  { image: "/metal-factory-sign-assets/v1/M01-production-building.jpg", category: "금속·안내판", title: "금속·공장 안내판", benefit: "공장과 현장의 정보를 또렷하게", description: "디자인 16종과 소재·문구·부착 방식·사용 환경을 확인하고 상담하세요.", tags: ["구역·설비 안내", "맞춤 제작"], position: "center 50%" },
] as const;

const portfolioImages = [
  "/dmdnp-assets/product-card-wood.jpg",
  "/dmdnp-assets/product-card-acrylic.jpg",
  "/dmdnp-assets/product-card-led.jpg",
  "/dmdnp-assets/product-card-uv.jpg",
  "/dmdnp-assets/product-card-banner.jpg",
  "/dmdnp-assets/product-card-tactile.jpg",
] as const;

const portfolioTitles = [
  "나무현판",
  "사무실 아크릴 안내판",
  "매장용 LED 전광판",
  "UV 출력 안내 패널",
  "행사 안내 현수막",
  "공공시설 촉지도",
] as const;

const reasonItems = [
  [Award, "20년 이상의 제작 경험", "2002년부터 다양한 사인 제품을 제작해온 경험"],
  [Factory, "자체 제작설비 운영", "UV 평판프린터·레이저·CNC 등 직접 운영"],
  [Eye, "맞춤 디자인과 시안 확인", "제작 전에 크기·소재·디자인을 확인"],
  [MessageCircle, "제작부터 설치까지 상담", "제품 제작과 납품, 인천·수도권 설치 상담"],
] as const;

const faqIcons = [CheckCircle2, PenTool, Settings, Factory, Wrench, Truck] as const;

const process = [
  [MessageCircle, "상담·설계", "용도와 설치 공간을 확인합니다."],
  [PenTool, "디자인·시안 확인", "크기와 표기 내용을 점검합니다."],
  [Settings, "직접 제작", "자체 장비로 출력·가공합니다."],
  [ShieldCheck, "검수·후가공", "마감과 수량을 확인합니다."],
  [Truck, "출고·설치", "납품과 설치 상담을 이어갑니다."],
] as const;

const equipmentItems = [
  [Printer, "UV 평판프린터", "아크릴·금속·목재 평판 소재 직접 출력"],
  [Printer, "대형 실사출력기", "현수막·배너·대형 홍보물 출력"],
  [Wrench, "철판 절곡기", "금속 판재 접힘과 형태 가공"],
  [Settings, "3D 프린터", "입체 부품과 샘플 제작"],
  [Factory, "파이버레이저", "금속 절단과 정밀 가공"],
  [Factory, "CO2 레이저", "아크릴·목재 절단과 각인"],
  [Settings, "채널벤딩기", "채널 문자 사인 성형"],
  [Wrench, "글자커팅기", "시트 문자와 그래픽 커팅"],
] as const;

const trustStats = [
  ["2002년", "설립 및 제작 경험"],
  ["5,000건+", "누적 제작 실적"],
  ["자체 제작설비", "UV·레이저·CNC 직접 운영"],
  ["인천·수도권", "제작·납품·설치 상담"],
] as const;

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero">
          <div className="site-container hero-inner">
            <div className="hero-copy">
              <p className="kicker">SIGN PRODUCT MANUFACTURER</p>
              <h1><span>간판부터 UV인쇄까지</span><span>필요한 사인물을 직접 제작합니다</span></h1>
              <p>나무현판·아크릴 안내판·LED 전광판·실사출력·촉지도를<br />상담부터 디자인, 제작, 설치까지 한 번에 진행합니다.</p>
              <div className="hero-actions">
                <Link className="hero-button hero-button-primary" href="/contact">빠른 견적 문의 <ArrowRight size={18} /></Link>
                <Link className="hero-button hero-button-secondary" href="/portfolio">제작사례 보기</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="trust-summary" aria-label="대명DnP 신뢰 정보">
          <div className="site-container trust-summary-grid">
            {trustStats.map(([value, label]) => (
              <article key={value}>
                <strong>{value}</strong>
                <span>{label}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="section product-section">
          <div className="site-container">
            <div className="section-heading">
              <div><p className="kicker">PRODUCT</p><h2>대명DnP 주요 제작 제품</h2></div>
              <p>공간에 필요한 사인 제품을 직접 기획하고 제작합니다.</p>
            </div>
            <div className="product-card-grid">
              {products.slice(0, productCards.length).map((item, i) => (
                <Link className="product-card" key={item.slug} href={`/products/${item.slug}`}>
                  <div className="product-card-image">
                    <Image src={productCards[i].image} alt={item.slug === "braille-tactile-map" ? "출입구 지주형 촉지도 실제 작업사진" : item.slug === "banner-large-print" ? "실사출력·현수막 디자인 구성" : item.slug === "metal-factory-sign" ? "금속·공장 안내판 디자인 구성" : item.slug === "uv-flatbed-print" ? "UV 평판인쇄 아크릴 메뉴 패널" : item.slug === "led-display" ? "카페 SMD LED 전광판" : `${productCards[i].title} 제작 사진`} fill sizes="(max-width: 640px) 100vw, (max-width: 980px) 50vw, 33vw" style={{ objectPosition: productCards[i].position }} />
                    <div className="product-card-overlay">
                      <span>{productCards[i].category}</span>
                      <strong>{productCards[i].title}</strong>
                      <small>{productCards[i].benefit}</small>
                    </div>
                  </div>
                  <div className="product-card-body">
                    <p>{productCards[i].description}</p>
                    <div className="product-tags">{productCards[i].tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                    <span className="text-link">자세히 보기 <ArrowRight size={16} /></span>
                  </div>
                </Link>
              ))}
              <Link className="product-card" href="/acrylic-letters.html">
                <div className="product-card-image">
                  <Image src="/acrylic-letters-card.jpg" alt="아크릴 입체글자 AI 연출 이미지" fill sizes="(max-width: 640px) 100vw, (max-width: 980px) 50vw, 33vw" style={{ objectPosition: "center 48%" }} />
                  <div className="product-card-overlay">
                    <span>아크릴 글자</span>
                    <strong>아크릴 글자</strong>
                    <small>공간에 입체감을 더하는 맞춤 문자</small>
                  </div>
                </div>
                <div className="product-card-body">
                  <p>상호와 로고를 입체감 있게 표현하는 맞춤 아크릴 글자입니다.</p>
                  <div className="product-tags"><span>상호·로고</span><span>입체글자</span><span>AI 연출</span></div>
                  <span className="text-link">자세히 보기 <ArrowRight size={16} /></span>
                </div>
              </Link>
              <Link className="product-card" href="/products/silicone-led-neon">
                <div className="product-card-image">
                  <Image src="/silicone-led-neon-card.jpg" alt="실리콘 LED 네온사인 AI 디자인 시안" fill sizes="(max-width: 640px) 100vw, (max-width: 980px) 50vw, 33vw" style={{ objectPosition: "center 46%" }} />
                  <div className="product-card-overlay">
                    <span>네온사인</span>
                    <strong>실리콘 LED 네온사인</strong>
                    <small>빛으로 완성하는 매장 분위기</small>
                  </div>
                </div>
                <div className="product-card-body">
                  <p>매장 상호와 로고, 포토존을 빛으로 표현하는 맞춤 네온사인입니다.</p>
                  <div className="product-tags"><span>맞춤 문구</span><span>로고·포토존</span><span>AI 시안</span></div>
                  <span className="text-link">자세히 보기 <ArrowRight size={16} /></span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        <section className="section portfolio-section">
          <div className="site-container">
            <div className="section-heading">
              <div>
                <p className="kicker">PORTFOLIO</p>
                <h2>대명DnP 제작·시공사례</h2>
                <p>분야별 원본 제작사진과 공간 디자인을 확인해 보세요.</p>
              </div>
              <Link className="button button-outline" href="/portfolio">전체 제작사례 보기 <ArrowRight size={17} /></Link>
            </div>
            <div className="portfolio-card-grid">{portfolioItems.slice(0, 6).map((item, i) => (
              <Link className="portfolio-card" key={item.slug} href={item.slug === "sample-cafe-wood-sign" ? "/portfolio/catalog/wood-plaque" : `/portfolio/${item.slug}`}>
                <div className="portfolio-card-image"><Image src={item.slug === "sample-cafe-wood-sign" ? "/wood-portfolio-assets/wide-v3/W04-space.jpg" : portfolioImages[i]} alt={item.slug === "sample-cafe-wood-sign" ? "나무현판 공간별 설치 디자인" : `${portfolioTitles[i]} 제작사례 이미지`} fill sizes="(max-width: 640px) 100vw, (max-width: 980px) 50vw, 33vw" /></div>
                <div className="portfolio-card-body">
                  <span>{item.slug === "sample-cafe-wood-sign" ? "나무현판 · 공간 디자인" : item.category}</span>
                  <h3>{portfolioTitles[i]}</h3>
                  <p>{item.slug === "sample-cafe-wood-sign" ? "공간별 설치 디자인 사진 14장" : `${item.material} / ${item.place}`}</p>
                  <small>{item.slug === "sample-cafe-wood-sign" ? "현판과 주변 공간의 분위기를 함께 살펴보세요." : item.method}</small>
                  <strong className="text-link">상세보기 <ArrowRight size={16} /></strong>
                </div>
              </Link>
            ))}</div>
          </div>
        </section>

        <section className="section reason-section">
          <div className="site-container reason-layout">
            <div className="reason-image">
              <Image
                src="/dmdnp-assets/company-why-daemyung-workshop.webp"
                alt="대명DnP 작업자가 UV 출력물의 크기와 품질을 확인하는 모습"
                fill
                sizes="(max-width: 980px) 100vw, 48vw"
                className="reason-image-photo"
              />
            </div>
            <div>
              <p className="kicker">WHY DAEMYUNG DnP</p>
              <h2>대명DnP를 선택하는 이유</h2>
              <p className="section-lead">상담부터 디자인·출력·가공·납품까지 한곳에서 진행합니다.</p>
              <div className="reason-list">
                {reasonItems.map(([Icon, title, text]) => (
                  <article key={title}>
                    <Icon />
                    <div><h3>{title}</h3><p>{text}</p></div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section equipment-section">
          <div className="site-container">
            <div className="section-heading">
              <div>
                <p className="kicker">EQUIPMENT</p>
                <h2>직접 운영하는 제작 장비</h2>
                <p>외주에만 의존하지 않고 주요 공정을 자체 장비로 직접 제작합니다.</p>
              </div>
            </div>
            <div className="equipment-layout">
              <div className="equipment-main">
                <video
                  className="equipment-video"
                  src="/dmdnp-assets/equipment-workshop-0916.mp4"
                  aria-label="대명DnP 제작 장비와 작업 현장을 보여주는 영상"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
              </div>
              <div className="equipment-list">
                {equipmentItems.map(([Icon, name, description]) => (
                  <article key={name}>
                    <Icon />
                    <div><h3>{name}</h3><p>{description}</p></div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section process-showcase">
          <div className="site-container">
            <div className="process-showcase-heading">
              <p className="kicker">PROCESS</p>
              <h2>제작 과정</h2>
              <p>상담부터 출고까지 필요한 확인만 간결하게 진행합니다.</p>
            </div>
            <div className="process-panel">
              <div className="process-list">{process.map(([Icon, title, text], i) => <article key={title}><span className="process-icon"><Icon /></span><strong>{String(i + 1).padStart(2, "0")}</strong><div><h4>{title}</h4><p>{text}</p></div></article>)}</div>
            </div>
          </div>
        </section>

        <section className="section faq-showcase">
          <div className="site-container faq-showcase-grid">
            <aside className="faq-panel">
              <p className="kicker">FAQ</p>
              <h2>자주 묻는 질문</h2>
              <p>사인 제작 전 많이 묻는 질문을 모았습니다.</p>
              <Link className="faq-more" href="/faq">더 많은 질문 보기 <ArrowRight size={22} /></Link>
              <div className="faq-visual" aria-hidden="true"><span>?</span><small>SIGN</small></div>
            </aside>
            <div className="faq-list">{faqs.slice(0, 6).map((item, i) => {
              const Icon = faqIcons[i];
              return <details key={item.question} open={i === 0}><summary><span>{String(i + 1).padStart(2, "0")}</span><Icon />{item.question}</summary><p>{item.answer}</p></details>;
            })}</div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}



