import { Metadata } from "next";
import { faqs } from "@/lib/dmdnp-data";
import { PageHero, QuoteCta, SiteFooter, SiteHeader } from "@/components/site-shell";
import { BreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "FAQ",
  description: "대명DnP 사인 제품 제작 기간, 설치, 디자인, 견적 기준에 대한 자주 묻는 질문입니다.",
  alternates: { canonical: "/faq" },
  openGraph: { title: "대명DnP FAQ", description: "사인 제품 제작 전 자주 묻는 질문을 확인하세요.", url: "/faq" },
};

export default function FaqPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <SiteHeader />
      <main>
        <PageHero kicker="FAQ" title="자주 묻는 질문" text="사인 제작 전 궁금한 제작 기간, 설치, 디자인, 견적 기준을 정리했습니다." />
        <section className="section"><div className="site-container faq-list">{faqs.map((item) => <details key={item.question} open><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div></section>
        <QuoteCta />
        <BreadcrumbJsonLd items={[{ name: "홈", href: "/" }, { name: "FAQ", href: "/faq" }]} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      </main>
      <SiteFooter />
    </>
  );
}
