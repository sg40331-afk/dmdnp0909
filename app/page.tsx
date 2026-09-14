import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, CheckCircle2, Eye, Factory, MessageCircle, PenTool, Printer, Settings, ShieldCheck, Truck, Wrench } from "lucide-react";
import { faqs, portfolioItems, products } from "@/lib/dmdnp-data";
import { facilities } from "@/lib/company-data";
import { QuoteCta, SiteFooter, SiteHeader } from "@/components/site-shell";

const productCards = [
  { image: "/dmdnp-assets/wood-sign.png", category: "나무현판", title: "나무현판·메뉴판", benefit: "원목의 질감과 맞춤 디자인", description: "매장 분위기와 브랜드 톤에 맞춰 현판과 메뉴판을 제작합니다.", tags: ["카페", "음식점"], position: "center 45%" },
  { image: "/dmdnp-assets/acrylic-sign.png", category: "아크릴", title: "아크릴 안내판", benefit: "깔끔하고 세련된 공간 안내", description: "회의실, 사무실, 건물 안내에 어울리는 정돈된 사인을 제작합니다.", tags: ["사무실", "병원"], position: "center 48%" },
  { image: "/dmdnp-assets/led-sign.png", category: "LED 전광판", title: "LED 전광판", benefit: "주야간 선명한 홍보 효과", description: "매장 홍보와 공지 문구를 멀리서도 잘 보이게 표현합니다.", tags: ["매장", "홍보"], position: "center 50%" },
  { image: "/dmdnp-assets/uv-print.png", category: "UV인쇄", title: "UV 평판인쇄", benefit: "다양한 소재에 직접 고해상도 출력", description: "아크릴, 목재, 금속, 포맥스 등 평판 소재에 직접 출력합니다.", tags: ["패널", "전시"], position: "center 56%" },
  { image: "/dmdnp-assets/banner-print.png", category: "실사출력", title: "실사출력·현수막", benefit: "대형 출력부터 후가공까지", description: "현수막, 배너, 홍보 출력물을 용도와 설치 환경에 맞게 제작합니다.", tags: ["행사", "배너"], position: "center 62%" },
  { image: "/dmdnp-assets/tactile-map.png", category: "촉지도", title: "촉지도·점자안내판", benefit: "공공시설 맞춤형 안내 제작", description: "도면과 이용 동선을 확인해 촉지도와 점자 안내판을 제작합니다.", tags: ["공공시설", "안내"], position: "center 58%" },
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
  "카페용 원목 현판",
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
              {products.slice(0, 6).map((item, i) => (
                <Link className="product-card" key={item.slug} href={`/products/${item.slug}`}>
                  <div className="product-card-image">
                    <Image src={productCards[i].image} alt={`${productCards[i].title} 제작 사진`} fill sizes="(max-width: 640px) 100vw, (max-width: 980px) 50vw, 33vw" style={{ objectPosition: productCards[i].position }} />
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
            </div>
          </div>
        </section>

        <section className="section portfolio-section">
          <div className="site-container">
            <div className="section-heading">
              <div>
                <p className="kicker">PORTFOLIO</p>
                <h2>대명DnP 실제 제작사례</h2>
                <p>직접 제작하고 납품한 다양한 사인 제품을 확인해 보세요.</p>
              </div>
              <Link className="button button-outline" href="/portfolio">전체 제작사례 보기 <ArrowRight size={17} /></Link>
            </div>
            <div className="portfolio-card-grid">{portfolioItems.slice(0, 6).map((item, i) => (
              <Link className="portfolio-card" key={item.slug} href={`/portfolio/${item.slug}`}>
                <div className="portfolio-card-image"><Image src={portfolioImages[i]} alt={`${portfolioTitles[i]} 제작사례 이미지`} fill sizes="(max-width: 640px) 100vw, (max-width: 980px) 50vw, 33vw" /></div>
                <div className="portfolio-card-body">
                  <span>{item.category}</span>
                  <h3>{portfolioTitles[i]}</h3>
                  <p>{item.material} / {item.place}</p>
                  <small>{item.method}</small>
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
                <Image src="/dmdnp-assets/uv-print.png" alt="UV 평판프린터 작업 장면" fill sizes="(max-width: 980px) 100vw, 42vw" />
              </div>
              <div className="equipment-list">
                {facilities.slice(0, 6).map((item, i) => (
                  <article key={item.name}>
                    {i === 0 ? <Printer /> : i === 1 ? <Factory /> : i === 2 ? <Settings /> : i === 3 ? <Printer /> : i === 4 ? <Wrench /> : <Factory />}
                    <div><h3>{item.name}</h3><p>{item.function}</p></div>
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
        <QuoteCta />
      </main>
      <SiteFooter />
    </>
  );
}



