import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { company } from "@/lib/dmdnp-data";
import { companyMenuPages, companyPages } from "@/lib/company-data";

export function CompanyHero({ currentPath, title, description }: { currentPath: string; title: string; description: string }) {
  const current = companyPages.find((item) => item.href === currentPath);
  return (
    <>
      <section className="company-hero">
        <Image src="/dmdnp-assets/hero-workshop.png" alt="대명DnP 제작시설과 사인 제품 제작 현장" fill priority sizes="100vw" />
        <div className="site-container">
          <nav className="breadcrumb" aria-label="현재 위치"><Link href="/">홈</Link> &gt; <Link href="/company">회사소개</Link> &gt; {current?.label ?? title}</nav>
          <p className="kicker">COMPANY</p>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </section>
      <nav className="company-tabs" aria-label="회사소개 하위 메뉴">
        <div className="site-container">
          {companyMenuPages.map((item) => <Link key={item.href} href={item.href} className={item.href === currentPath ? "active" : undefined}>{item.label}</Link>)}
        </div>
      </nav>
    </>
  );
}

export function CompanyPageFrame({ currentPath, children }: { currentPath: string; children: React.ReactNode }) {
  const page = companyPages.find((item) => item.href === currentPath) ?? companyPages[0];
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "홈", item: "/" },
      { "@type": "ListItem", position: 2, name: "회사소개", item: "/company" },
      { "@type": "ListItem", position: 3, name: page.label, item: page.href },
    ],
  };
  const companyJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: company.name,
    founder: company.representative,
    foundingDate: "2002",
    address: company.address,
    areaServed: company.serviceArea,
    url: company.domain,
  };
  return (
    <>
      <CompanyHero currentPath={currentPath} title={page.title} description={page.description} />
      {children}
      <CompanyCta />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(companyJsonLd) }} />
    </>
  );
}

export function CompanyCta() {
  return (
    <section className="quote-cta site-container company-cta">
      <div>
        <h2>필요한 사인 제품, 대명DnP에 편하게 문의하세요</h2>
        <p>용도와 설치 장소를 알려주시면 적합한 소재와 제작 방법을 안내해 드립니다.</p>
      </div>
      <div className="cta-actions">
        <Link className="button button-orange" href="/contact">맞춤 견적 받기 <ArrowRight size={18} /></Link>
        <Link className="button button-outline" href="/contact"><Phone size={17} /> 전화 상담</Link>
        <Link className="button button-light" href="/products">제품 둘러보기</Link>
      </div>
    </section>
  );
}
