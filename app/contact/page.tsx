import { company, products } from "@/lib/dmdnp-data";
import { PageHero, SiteFooter, SiteHeader } from "@/components/site-shell";

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
              <p>주소: {company.address}</p>
              <p className="notice">연락처와 상세 주소는 실제 운영 정보 확인 후 교체해 주세요.</p>
            </div>
            <form className="form-card">
              <div className="form-row"><label>이름<input name="name" placeholder="성함 또는 업체명" /></label><label>연락처<input name="phone" placeholder="연락 가능한 번호" /></label></div>
              <label>관심 제품<select name="product">{products.map((item) => <option key={item.slug}>{item.name}</option>)}</select></label>
              <label>문의 내용<textarea name="message" placeholder="크기, 수량, 설치 위치, 납기 등을 적어주세요." /></label>
              <button className="button button-blue" type="button">문의 내용 확인</button>
            </form>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
