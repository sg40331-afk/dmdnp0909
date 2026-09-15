import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ClipboardCheck, FileSearch, MessageCircle, PackageCheck, Palette, Ruler, ScanLine, Settings, ShieldCheck, Truck } from "lucide-react";
import { VisualBlock } from "@/components/site-shell";
import { CompanyCta, CompanyPageFrame, CompanyTabs } from "@/components/company-shell";
import { CompanyIntroVideo } from "@/components/company-intro-video";
import { businessAreas, companyHistory, companyIntro, companyStats, facilities, qualityNotes, qualitySteps } from "@/lib/company-data";
import { company } from "@/lib/dmdnp-data";

const qualityIcons = [ClipboardCheck, FileSearch, Palette, ScanLine, Settings, ShieldCheck, PackageCheck, Truck] as const;

export function CompanyOverview() {
  return (
    <CompanyPageFrame currentPath="/company">
      <section className="section">
        <div className="site-container company-intro-video-section">
          <div className="company-intro-copy">
            <h2>대명DnP 회사 소개</h2>
            <p>대명DnP는 2002년 설립 이후 인천 남동공단 제작시설을 기반으로 다양한 사인 제품을 직접 제작해 온 사인 제품 제조업체입니다.</p>
          </div>
          <CompanyIntroVideo />
        </div>
      </section>
      <section className="section ivory"><div className="site-container"><div className="company-stat-grid">{companyStats.map((item) => <article key={item.title}><strong>{item.title}</strong><p>{item.text}</p></article>)}</div></div></section>
      <section className="section"><div className="site-container"><div className="section-heading"><div><p className="kicker">PRODUCT</p><h2>주요 제작 제품</h2></div></div><div className="grid-3">{businessAreas.slice(0, 6).map((item) => <article className="card" key={item.slug}><VisualBlock label={item.name} source={item.image} tone={item.category.includes("LED") ? "led" : item.category.includes("나무") ? "wood" : item.category.includes("실사") || item.category.includes("UV") ? "print" : item.category.includes("촉지도") ? "map" : "blue"} /><div className="card-body"><h3>{item.name}</h3><p>{item.summary}</p></div></article>)}</div></div></section>
      <section className="section ivory"><div className="site-container"><div className="section-heading"><div><p className="kicker">CUSTOMER</p><h2>주요 고객과 사용처</h2></div></div><div className="audience-grid">{companyIntro.audiences.map((item) => <article key={item}><h3>{item}</h3><p>공간과 용도에 맞는 사인 제품을 상담합니다.</p></article>)}</div></div></section>
      <section className="section"><div className="site-container"><h2>회사소개 상세 바로가기</h2><div className="company-link-grid">{["대표 인사말", "주요 연혁", "제작 분야", "장비·시설", "품질관리", "오시는 길"].map((label) => {
        const href = label === "대표 인사말" ? "/company/greeting" : label === "주요 연혁" ? "/company/history" : label === "제작 분야" ? "/company/business" : label === "장비·시설" ? "/company/facilities" : label === "품질관리" ? "/company/quality" : "/company/location";
        return <Link className="card company-link-card" href={href} key={label}><div className="card-body"><h3>{label}</h3><span className="text-link">바로가기 <ArrowRight size={16} /></span></div></Link>;
      })}</div></div></section>
    </CompanyPageFrame>
  );
}

export function CompanyGreeting() {
  return (
    <>
      <CompanyTabs currentPath="/company/greeting" />
      <section className="ceo-stage">
        <div className="site-container">
          <div className="ceo-message">
            <div className="ceo-photo">
              <Image src="/dmdnp-assets/ceo-message.jpg" alt="대명DnP 대표가 제작 현장에서 UV 출력 장비를 확인하는 모습" fill priority sizes="(max-width: 980px) 100vw, 560px" />
              <div className="ceo-photo-copy"><span>SINCE 2002 · DAEMYUNG DnP</span></div>
            </div>
            <article className="ceo-copy">
              <p className="kicker">CEO MESSAGE</p>
              <h1>좋은 사인은<br />더 좋은 공간을 만듭니다</h1>
              <div className="ceo-rule" />
              <p>안녕하세요. 대명DnP 대표 {company.representative}입니다. 대명DnP는 {company.since}부터 한결같이 사인 제작을 생각해 온 제조 전문 기업입니다. 다양한 공간에 필요한 사인을 가장 실용적이고 아름답게 구현하여 고객의 공간에 새로운 가치를 더하고자 합니다.</p>
              <p>제작 전 충분한 상담을 통해 용도와 설치 환경에 맞는 최적의 소재와 방법을 제안하고, 작은 부분까지 세심하게 제작합니다. 완성 후에도 책임 있는 자세로 지속적인 관리와 신뢰를 이어가겠습니다.</p>
              <blockquote>고객의 용도에 맞는 제품을 정직하게 제안하고,<br />끝까지 책임 있게 제작하겠습니다.</blockquote>
              <div className="ceo-signature"><span>대명DnP 대표</span><strong>{company.representative}</strong><em aria-hidden="true">signature</em></div>
            </article>
          </div>
        </div>
      </section>
      <section className="ceo-values">
        <div className="site-container">
          <article><MessageCircle /><div><h2>정직한 상담</h2><p>고객의 목적과 환경에 맞는 최적의 제품을 성실하게 제안합니다.</p></div></article>
          <article><Settings /><div><h2>직접 제작</h2><p>다양한 사인 제품을 자체 제작하여 안정적인 품질로 제공합니다.</p></div></article>
          <article><ShieldCheck /><div><h2>책임 있는 품질</h2><p>제작부터 납품까지 끝까지 책임지는 품질 관리를 약속드립니다.</p></div></article>
        </div>
      </section>
      <CompanyCta />
    </>
  );
}

export function CompanyHistory() {
  return (
    <CompanyPageFrame currentPath="/company/history">
      <section className="section">
        <div className="site-container history-board">
          {companyHistory.map((group) => (
            <section className="history-group" key={group.period} aria-labelledby={`history-${group.period}`}>
              <h2 id={`history-${group.period}`}>{group.period}</h2>
              <div className="history-items">
                {group.items.map((item) => (
                  <article key={`${group.period}-${item.date}-${item.title}`}>
                    <time>{item.date}</time>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </CompanyPageFrame>
  );
}

export function CompanyBusiness() {
  return (
    <CompanyPageFrame currentPath="/company/business">
      <section className="section"><div className="site-container business-grid">{businessAreas.map((item) => <article className="card business-card" key={item.slug}><VisualBlock label={item.name} source={item.image} tone={item.category.includes("LED") ? "led" : item.category.includes("나무") ? "wood" : item.category.includes("실사") || item.category.includes("UV") ? "print" : item.category.includes("촉지도") ? "map" : "blue"} /><div className="card-body"><h2>{item.name}</h2><p>{item.summary}</p><strong>주요 사용처</strong><p>{item.uses.join(", ")}</p><div className="card-actions"><Link className="text-link" href={`/products/${item.slug}`}>제품 상세 <ArrowRight size={16} /></Link><Link className="text-link" href="/portfolio">관련 제작사례 <ArrowRight size={16} /></Link></div></div></article>)}</div></section>
    </CompanyPageFrame>
  );
}

export function CompanyFacilities() {
  return (
    <CompanyPageFrame currentPath="/company/facilities">
      <section className="section"><div className="site-container facility-grid">{facilities.map((item) => <article className="card facility-card" key={item.name}><div className="facility-image"><Image src={item.image} alt={`${item.name} 장비 이미지`} fill sizes="(max-width: 980px) 100vw, 50vw" /></div><div className="card-body"><h2>{item.name}</h2><dl><dt>주요 기능</dt><dd>{item.function}</dd><dt>가공 소재</dt><dd>{item.materials}</dd><dt>주요 제작 제품</dt><dd>{item.products}</dd><dt>작업 가능 규격</dt><dd>{item.size}</dd><dt>실제 작업 모습</dt><dd>{item.work}</dd><dt>제작 결과물</dt><dd>{item.result}</dd></dl></div></article>)}</div></section>
    </CompanyPageFrame>
  );
}

export function CompanyQuality() {
  return (
    <CompanyPageFrame currentPath="/company/quality">
      <section className="section quality-flow-section">
        <div className="site-container">
          <div className="quality-flow-heading">
            <p className="kicker">QUALITY PROCESS</p>
            <h2>제작 전후 8단계 품질관리</h2>
            <p>상담 내용 확인부터 포장과 출고까지 단계별로 꼼꼼하게 점검합니다.</p>
          </div>
          <div className="quality-grid">
            {qualitySteps.map((item, index) => {
              const Icon = qualityIcons[index] ?? CheckCircle2;
              return (
                <article key={item.title}>
                  <span className="quality-number">{String(index + 1).padStart(2, "0")}</span>
                  <div className="quality-icon"><Icon /></div>
                  <div>
                    <h2>{item.title}</h2>
                    <p>{item.text}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <section className="section ivory"><div className="site-container"><h2>제작 전후 확인 기준</h2><div className="grid-2">{qualityNotes.map((item) => <article className="notice" key={item}>{item}</article>)}</div></div></section>
    </CompanyPageFrame>
  );
}

export function CompanyLocation() {
  return (
    <CompanyPageFrame currentPath="/company/location">
      <section className="section">
        <div className="site-container company-location-page">
          <div className="google-map-frame">
            <iframe
              title="대명DnP 구글 지도"
              src="https://www.google.com/maps?q=%EC%9D%B8%EC%B2%9C%EA%B4%91%EC%97%AD%EC%8B%9C%20%EB%82%A8%EB%8F%99%EA%B5%AC%20%ED%98%B8%EA%B5%AC%ED%8F%AC%EB%A1%9C%2050%20%EC%97%98%EC%95%84%EC%9D%B4%EC%A7%80%EC%8B%9D%EC%82%B0%EC%97%85%EC%84%BC%ED%84%B0&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          <div className="location-info-panel">
            <div className="location-address-card">
              <p className="kicker">LOCATION</p>
              <h2>대명DnP 오시는 길</h2>
              <dl>
                <dt>주소</dt>
                <dd>인천광역시 남동구 호구포로 50<br />엘아이지식산업센터 5층 514호 대명DnP</dd>
              </dl>
            </div>

            <div className="route-guide-list">
              <article>
                <h3>전철 이용 시</h3>
                <p>수인분당선 호구포역 2번 출구로 나오신 후, 택시 또는 버스를 이용하시면 편리합니다.</p>
                <p>호구포역에서 택시로 약 5분 거리이며, 도보로 이동할 경우 약 15~20분 정도 소요됩니다. 엘아이지식산업센터에 도착하신 후 엘리베이터를 이용해 5층 514호로 오시면 됩니다.</p>
              </article>
              <article>
                <h3>버스 이용 시</h3>
                <p>인천 시내버스 16-1번을 이용해 ‘엘아이지식산업센터’ 정류장에서 하차해 주세요.</p>
                <p>정류장에서 엘아이지식산업센터까지 가까우며, 건물 안으로 들어오신 후 엘리베이터를 이용해 5층 514호 대명DnP로 오시면 됩니다.</p>
              </article>
              <article>
                <h3>승용차 이용 시</h3>
                <p>내비게이션에 ‘엘아이지식산업센터’ 또는 ‘인천광역시 남동구 호구포로 50’을 검색해 주세요.</p>
                <p>건물 내 주차장을 이용할 수 있습니다. 주차 후 엘리베이터를 타고 5층 514호로 오시면 됩니다.</p>
              </article>
              <p className="route-guide-note">※ 버스 노선과 운행 시간은 변경될 수 있으므로 방문 전에 지도 또는 인천버스정보시스템에서 확인해 주세요.</p>
            </div>
          </div>
        </div>
      </section>
    </CompanyPageFrame>
  );
}
