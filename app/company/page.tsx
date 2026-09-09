import { Award, Factory, MapPin } from "lucide-react";
import { PageHero, QuoteCta, SiteFooter, SiteHeader, VisualBlock } from "@/components/site-shell";

export default function CompanyPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero kicker="ABOUT US" title="20년 이상의 제작 경험과 전문 장비" text="대명DnP는 상담, 디자인, 출력, 가공, 납품까지 한 흐름으로 관리하는 인천·수도권 사인 제품 제작사입니다." />
        <section className="section">
          <div className="site-container detail-layout">
            <VisualBlock label="제작시설" tone="print" />
            <div className="detail-panel">
              <h2>좋은 사인을 만들어 더 좋은 내일을 만듭니다</h2>
              <p>UV 평판인쇄, 나무·아크릴 가공, 안내판, 현수막, LED 전광판까지 공간에 맞는 제품을 직접 제작합니다.</p>
              <ul className="plain-list">
                <li><Factory size={18} /> 자체 설비 기반 직접 제작</li>
                <li><Award size={18} /> 2002년부터 이어온 제작 경험</li>
                <li><MapPin size={18} /> 인천·수도권 납품 및 설치 상담</li>
              </ul>
            </div>
          </div>
        </section>
        <QuoteCta />
      </main>
      <SiteFooter />
    </>
  );
}
