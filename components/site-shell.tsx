"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Menu, Phone, X } from "lucide-react";
import { company, navItems, products } from "@/lib/dmdnp-data";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-container header-inner">
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-name">대명DnP</span>
          <span className="brand-caption">사람을 닮은 더 나은 공간</span>
        </Link>
        <nav className="desktop-nav" aria-label="주요 메뉴">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={isActive(pathname, item.href) ? "active" : undefined}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/contact" className="header-quote">
          빠른 견적문의 <ArrowRight size={17} />
        </Link>
        <button className="mobile-menu" aria-label={open ? "메뉴 닫기" : "메뉴 열기"} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open ? (
        <div className="mobile-panel">
          <div className="site-container mobile-panel-inner">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={isActive(pathname, item.href) ? "active" : undefined} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
            <Link href="/contact" className="button button-orange" onClick={() => setOpen(false)}>
              맞춤 견적 받기 <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container footer-grid">
        <div>
          <Link href="/" className="footer-brand">대명DnP</Link>
          <p>사람을 닮은 더 나은 공간, 대명DnP</p>
          <small>확인되지 않은 연락처와 상세 주소는 공통 데이터 파일에서 교체하도록 표시했습니다.</small>
        </div>
        <div>
          <strong>제품안내</strong>
          {products.slice(0, 6).map((item) => (
            <Link key={item.slug} href={`/products/${item.slug}`}>{item.name}</Link>
          ))}
        </div>
        <div>
          <strong>바로가기</strong>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>{item.label}</Link>
          ))}
        </div>
        <div>
          <strong>회사 정보</strong>
          <p>대표자: {company.representative}</p>
          <p>지역: {company.region}</p>
          <p>주소: {company.address}</p>
          <p>전화: {company.phone}</p>
          <p>이메일: {company.email}</p>
        </div>
      </div>
      <div className="site-container copyright">
        <span>© 2026 대명DnP. All rights reserved.</span>
        <span>{company.domain}</span>
      </div>
    </footer>
  );
}

export function PageHero({ kicker, title, text }: { kicker: string; title: string; text: string }) {
  return (
    <section className="page-hero">
      <div className="site-container">
        <p className="kicker">{kicker}</p>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
    </section>
  );
}

export function VisualBlock({ label, tone = "blue" }: { label: string; tone?: "blue" | "wood" | "led" | "print" | "map" }) {
  const source = label.includes("나무") ? "/dmdnp-assets/wood-sign.png" : label.includes("아크릴") ? "/dmdnp-assets/acrylic-sign.png" : label.includes("LED") ? "/dmdnp-assets/led-sign.png" : label.includes("실사") || label.includes("현수막") ? "/dmdnp-assets/banner-print.png" : label.includes("촉지도") || label.includes("점자") ? "/dmdnp-assets/tactile-map.png" : label.includes("UV") || label.includes("제작시설") ? "/dmdnp-assets/uv-print.png" : "/dmdnp-assets/hero-workshop.png";
  return <div className={`visual-block visual-${tone}`}><Image src={source} alt={label} fill sizes="(max-width: 980px) 50vw, 33vw" /><span>{label}</span></div>;
}

export function QuoteCta({ title = "필요한 사인 제품, 대명DnP에 편하게 문의하세요" }: { title?: string }) {
  return (
    <section className="quote-cta site-container">
      <div>
        <h2>{title}</h2>
        <p>제품 종류와 크기를 잘 모르셔도 용도와 설치 장소를 알려주시면 적합한 제작 방법을 안내해 드립니다.</p>
      </div>
      <div className="cta-actions">
        <Link className="button button-orange" href="/contact">맞춤 견적 받기 <ArrowRight size={18} /></Link>
        <Link className="button button-outline" href="/contact"><Phone size={17} /> 전화 상담</Link>
      </div>
    </section>
  );
}



