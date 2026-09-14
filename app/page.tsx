import Link from "next/link";
import { AlertCircle, ArrowRight, Box, CalendarDays, Check, CheckCircle2, Clock3, FileText, Image as ImageIcon, Layers3, MapPin, MessageCircle, MonitorCheck, PenTool, Settings, Truck, Wrench } from "lucide-react";
import { faqs, portfolioItems, products } from "@/lib/dmdnp-data";
import { QuoteCta, SiteFooter, SiteHeader, VisualBlock } from "@/components/site-shell";

const audiences = [
  ["카페·음식점", "나무현판, 메뉴판, 실사출력"],
  ["회사·사무실", "아크릴 안내판, 현판, 실내 사인"],
  ["공장·건설현장", "안전표지, 금속·아크릴 안내판"],
  ["관공서·공공시설", "촉지도, 점자안내판, 종합안내판"],
  ["행사·홍보", "현수막, 배너, 출력물"],
  ["매장 외부홍보", "LED 전광판, 외부 사인"],
];

const homeProductImages = [
  "/dmdnp-assets/product-card-wood.jpg",
  "/dmdnp-assets/product-card-acrylic.jpg",
  "/dmdnp-assets/product-card-led.jpg",
  "/dmdnp-assets/product-card-uv.jpg",
  "/dmdnp-assets/product-card-banner.jpg",
  "/dmdnp-assets/product-card-tactile.jpg",
];

const painPoints = [
  [FileText, "제품마다 제작업체를 따로 알아봐야 하는 불편"],
  [Box, "원하는 소재와 크기로 제작 가능한지 알기 어려움"],
  [MonitorCheck, "디자인 시안과 실제 결과물의 차이"],
  [Clock3, "제작 기간과 설치 가능 여부에 대한 불안"],
] as const;

const solutions = [
  [MessageCircle, "한 곳에서 상담"],
  [Layers3, "용도에 맞는 소재 추천"],
  [ImageIcon, "제작 전 시안 확인"],
  [Settings, "자체 장비를 이용한 직접 제작"],
] as const;

const faqIcons = [Box, FileText, CalendarDays, Layers3, Settings, MapPin] as const;

const process = [
  [MessageCircle, "상담·설계", "용도와 공간에 맞는 제작 방향을 제안합니다."],
  [PenTool, "디자인·시안", "전문 디자이너의 맞춤 시안을 확인합니다."],
  [Settings, "직접 제작", "자체 장비로 정확하고 꼼꼼하게 제작합니다."],
  [Wrench, "검수·후가공", "마감 상태와 표기 내용을 확인합니다."],
  [Truck, "출고·설치", "납품과 설치 상담까지 이어갑니다."],
] as const;

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero">
          <div className="site-container hero-inner">
            <div>
              <p className="kicker">SIGN PRODUCT MANUFACTURER</p>
              <h1>다양한 사인 제품, 한곳에서 직접 제작합니다</h1>
              <p>UV인쇄부터 나무현판·아크릴 안내판·LED 전광판까지 상담·디자인·제작을 한 번에 진행합니다.</p>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="site-container">
            <div className="section-heading">
              <div><p className="kicker">PRODUCT</p><h2>대명DnP 주요 제작 제품</h2></div>
              <p>공간에 필요한 사인 제품을 직접 기획하고 제작합니다.</p>
            </div>
            <div className="grid-3">
              {products.slice(0, 6).map((item, i) => (
                <article className="card" key={item.slug}>
                  <VisualBlock label={item.name} source={homeProductImages[i]} tone={i === 0 ? "wood" : i === 2 ? "led" : i === 3 || i === 4 ? "print" : i === 5 ? "map" : "blue"} />
                  <div className="card-body"><h3>{item.name}</h3><p>{item.summary}</p><Link className="text-link" href={`/products/${item.slug}`}>자세히 보기 <ArrowRight size={16} /></Link></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section one-stop-section">
          <div className="site-container">
            <div className="one-stop-heading">
              <p className="kicker">WHY DAEMYUNG DnP</p>
              <h2>복잡한 사인 제작, <span>대명DnP에서 한 번에</span> 해결합니다</h2>
            </div>
            <div className="one-stop-layout">
              <article className="one-stop-card pain-card">
                <div className="one-stop-card-head">
                  <span><AlertCircle /></span>
                  <div><p>PAIN POINT</p><h3>제품마다 다른 업체를 찾는 번거로움</h3></div>
                </div>
                <ul>{painPoints.map(([Icon, text], i) => <li key={text}><span className="item-icon"><Icon /></span><strong>{String(i + 1).padStart(2, "0")}</strong><em />{text}</li>)}</ul>
              </article>
              <div className="one-stop-center" aria-hidden="true">
                <div><ArrowRight /><strong>ONE<br />STOP</strong></div>
              </div>
              <article className="one-stop-card solution-card">
                <div className="one-stop-card-head">
                  <span><CheckCircle2 /></span>
                  <div><p>SOLUTION</p><h3>상담부터 제작까지 한 곳에서</h3></div>
                </div>
                <ul>{solutions.map(([Icon, text]) => <li key={text}><span className="item-icon"><Icon /></span><strong><Check /></strong><em />{text}</li>)}</ul>
              </article>
            </div>
          </div>
        </section>

        <section className="section process-showcase">
          <div className="site-container">
            <div className="process-showcase-heading">
              <p className="kicker">PROCESS</p>
              <h2>기획부터 제작·출력·가공까지 <span>원스톱</span></h2>
              <p>상담부터 납품까지 같은 기준으로 관리합니다.</p>
            </div>
            <div className="process-panel">
              <div className="process-panel-title">
                <span><Settings /></span>
                <div>
                  <p>ONE STOP PROCESS</p>
                  <h3>상담부터 출고까지 한 흐름으로</h3>
                </div>
              </div>
              <div className="process-list">{process.map(([Icon, title, text], i) => <article key={title}><span className="process-icon"><Icon /></span><strong>{String(i + 1).padStart(2, "0")}</strong><div><h4>{title}</h4><p>{text}</p></div></article>)}</div>
            </div>
          </div>
        </section>

        <section className="section ivory"><div className="site-container"><div className="section-heading"><div><p className="kicker">MATCHING</p><h2>제품별 추천 고객</h2></div></div><div className="audience-grid">{audiences.map(([name, text]) => <article key={name}><h3>{name}</h3><p>{text}</p></article>)}</div></div></section>

        <section className="section"><div className="site-container"><div className="section-heading"><div><p className="kicker">PORTFOLIO</p><h2>제작사례</h2></div><Link className="button button-outline" href="/portfolio">전체 사례 보기 <ArrowRight size={17} /></Link></div><div className="portfolio-grid">{portfolioItems.slice(0, 6).map((item) => <Link className="card" key={item.slug} href={`/portfolio/${item.slug}`}><VisualBlock label={item.category} tone={item.category.includes("LED") ? "led" : item.category.includes("나무") ? "wood" : item.category.includes("촉지도") ? "map" : "blue"} /><div className="card-body"><h3>{item.title}</h3><p>{item.place}</p></div></Link>)}</div></div></section>

        <section className="section ivory"><div className="site-container about-band"><div><p className="kicker">ABOUT US</p><h2>20년 이상의 제작 경험과 전문 장비</h2><p>대명DnP는 2002년부터 다양한 사인 제품을 직접 기획하고 제작해온 인천 남동구의 사인 제품 제조업체입니다. 상담부터 제작까지 직접 관리하는 흐름으로 품질과 납기를 안정적으로 맞춥니다.</p><Link className="button button-blue" href="/company">회사소개 보기 <ArrowRight size={17} /></Link></div><div className="stats"><div><strong>2002</strong><span>설립연도</span></div><div><strong>자체 설비</strong><span>UV 평판프린터, 레이저, CNC 등</span></div><div><strong>인천·수도권</strong><span>제작 및 납품 상담 대응</span></div></div></div></section>

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



