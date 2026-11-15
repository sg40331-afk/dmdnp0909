import Image from "next/image";
import Link from "next/link";
import { companyMenuPages, companyPages } from "@/lib/company-data";
import { BreadcrumbJsonLd } from "@/lib/seo";

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
      <CompanyTabs currentPath={currentPath} />
    </>
  );
}

export function CompanyTabs({ currentPath }: { currentPath: string }) {
  return (
    <nav className="company-tabs" aria-label="회사소개 하위 메뉴">
      <div className="site-container">
        {companyMenuPages.map((item) => <Link key={item.href} href={item.href} className={item.href === currentPath ? "active" : undefined}>{item.label}</Link>)}
      </div>
    </nav>
  );
}

export function CompanyPageFrame({ currentPath, children }: { currentPath: string; children: React.ReactNode }) {
  const page = companyPages.find((item) => item.href === currentPath) ?? companyPages[0];
  const breadcrumbItems =
    currentPath === "/company"
      ? [
          { name: "홈", href: "/" },
          { name: "회사소개", href: "/company" },
        ]
      : [
          { name: "홈", href: "/" },
          { name: "회사소개", href: "/company" },
          { name: page.label, href: page.href },
        ];
  return (
    <>
      <CompanyHero currentPath={currentPath} title={page.title} description={page.description} />
      {children}
      <BreadcrumbJsonLd items={breadcrumbItems} />
    </>
  );
}
