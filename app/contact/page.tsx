import { Metadata } from "next";
import { company, products } from "@/lib/dmdnp-data";
import { PageHero, SiteFooter, SiteHeader } from "@/components/site-shell";
import { BreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "문의하기",
  description: "대명DnP 사인 제품 제작 견적 문의, 전화 상담, 카카오톡 상담, 이메일과 방문 주소를 확인하세요.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "대명DnP 문의하기", description: "필요한 사인 제품 제작 상담을 문의하세요.", url: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero kicker="CONTACT" title="빠른 견적문의" text="필요한 제품, 크기, 설치 장소, 희망 일정을 알려주시면 제작 방향을 안내해 드립니다." />
        <section className="section">
          <div className="site-container contact-grid">
            <div className="detail-panel">
              <h2>상담 정보</h2>
              <p>전화: {company.phone}</p>
              <p>이메일: {company.email}</p>
              <p>카카오톡: <a className="text-link" href={company.kakao} target="_blank" rel="noopener noreferrer">상담 바로가기</a></p>
              <p>주소: {company.address}</p>
              <p className="notice">전화, 카카오톡 또는 이메일로 제품 종류, 크기, 설치 위치를 알려주시면 제작 방향을 안내해 드립니다.</p>
            </div>
            <form className="form-card">
              <div className="form-row"><label>이름<input name="name" placeholder="성함 또는 업체명" /></label><label>연락처<input name="phone" placeholder="연락 가능한 번호" /></label></div>
              <label>관심 제품<select name="product">{products.map((item) => <option key={item.slug}>{item.name}</option>)}</select></label>
              <label>문의 내용<textarea name="message" placeholder="크기, 수량, 설치 위치, 납기 등을 적어주세요." /></label>
              <a className="button button-blue" href={company.kakao} target="_blank" rel="noopener noreferrer">카카오톡으로 문의하기</a>
            </form>
          </div>
        </section>
        <BreadcrumbJsonLd items={[{ name: "홈", href: "/" }, { name: "문의하기", href: "/contact" }]} />
      </main>
      <SiteFooter />
    </>
  );
}
