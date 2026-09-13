import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin } from "lucide-react";
import { VisualBlock } from "@/components/site-shell";
import { CompanyPageFrame } from "@/components/company-shell";
import { businessAreas, companyHistory, companyIntro, companyStats, facilities, locationInfo, qualityNotes, qualitySteps } from "@/lib/company-data";
import { company } from "@/lib/dmdnp-data";

export function CompanyOverview() {
  return (
    <CompanyPageFrame currentPath="/company">
      <section className="section"><div className="site-container company-intro-grid"><VisualBlock label="대명DnP 제작시설" tone="print" source="/dmdnp-assets/hero-workshop.png" /><div><h2>대명DnP 회사 소개</h2><p>{companyIntro.summary}</p><p>{companyIntro.workflow}</p><ul className="plain-list">{companyIntro.strengths.map((item) => <li key={item}>{item}</li>)}</ul></div></div></section>
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
    <CompanyPageFrame currentPath="/company/greeting">
      <section className="section"><div className="site-container greeting-grid"><VisualBlock label="대표 인사말 교체용 제작 현장 이미지" tone="print" source="/dmdnp-assets/hero-workshop.png" /><article className="detail-panel greeting-message"><p className="kicker">GREETING</p><h2>대표 인사말</h2><p>안녕하세요. 대명DnP 대표 {company.representative}입니다.</p><p>대명DnP는 {company.since}부터 현장에서 다양한 사인 제품을 제작하며 고객의 공간에 필요한 안내와 홍보물을 만들어 왔습니다. 작은 현판 하나라도 설치되는 장소와 보는 사람, 사용되는 기간에 따라 적합한 소재와 제작 방식이 달라진다는 마음으로 상담하고 있습니다.</p><p>사인 제작은 단순히 예쁜 결과물을 만드는 일만은 아니라고 생각합니다. 고객이 원하는 문구가 잘 보이는지, 설치 환경에 맞는 소재인지, 납기 안에 안정적으로 제작할 수 있는지, 완성 후 사용하기에 불편함은 없는지까지 함께 살펴야 합니다. 그래서 대명DnP는 상담, 시안 확인, 출력, 가공, 조립, 검수와 출고 과정을 한 흐름으로 관리하려고 노력합니다.</p><p>제품을 처음 의뢰하시는 분들은 어떤 소재를 선택해야 하는지, 크기는 어느 정도가 적당한지, 파일은 어떻게 준비해야 하는지 막막하실 수 있습니다. 그런 경우에도 용도와 설치 장소만 알려주시면 가능한 제작 방향을 차근차근 안내해 드리겠습니다. 확인되지 않은 부분은 임의로 판단하지 않고, 필요한 내용을 다시 확인하며 제작 품질과 납기를 지키겠습니다.</p><p>앞으로도 대명DnP는 오래 쌓아온 현장 경험을 바탕으로 믿고 맡길 수 있는 사인 제작 파트너가 되겠습니다. 문의해 주시는 모든 제품을 책임감 있게 살피고, 공간에 어울리는 결과물로 보답하겠습니다.</p><div className="signature"><span>대표</span><strong>{company.representative}</strong></div></article></div></section>
    </CompanyPageFrame>
  );
}

export function CompanyHistory() {
  return (
    <CompanyPageFrame currentPath="/company/history">
      <section className="section"><div className="site-container timeline">{companyHistory.map((item) => <article key={item.title}><time>{item.year}</time><div><h2>{item.title}</h2><p>{item.text}</p></div></article>)}</div></section>
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
      <section className="section"><div className="site-container quality-grid">{qualitySteps.map((item, index) => <article key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><CheckCircle2 /><h2>{item.title}</h2><p>{item.text}</p></article>)}</div></section>
      <section className="section ivory"><div className="site-container"><h2>제작 전후 확인 기준</h2><div className="grid-2">{qualityNotes.map((item) => <article className="notice" key={item}>{item}</article>)}</div></div></section>
    </CompanyPageFrame>
  );
}

export function CompanyLocation() {
  return (
    <CompanyPageFrame currentPath="/company/location">
      <section className="section"><div className="site-container location-grid"><div className="map-placeholder"><MapPin /><strong>지도 연결 준비 중</strong><p>네이버지도, 카카오맵 또는 구글지도 링크 등록 후 새 창 연결이 필요합니다.</p></div><div className="detail-panel"><h2>방문 안내</h2><ul className="plain-list">{locationInfo.map(([label, value]) => <li key={label}><strong>{label}: </strong>{value}</li>)}</ul><h3>대중교통 이용 안내</h3><p>정확한 노선 정보는 주소 확인 후 입력합니다.</p><h3>차량 방문·주차 안내</h3><p>방문 전 연락 후 주차 가능 여부와 출입 동선을 확인해 주세요.</p><div className="hero-actions"><Link className="button button-blue" href="/contact">맞춤 견적문의</Link><Link className="button button-outline" href="/contact">전화 상담</Link><Link className="button button-outline" href="/contact" target="_blank">길찾기</Link></div></div></div></section>
    </CompanyPageFrame>
  );
}
