import { faqs } from "@/lib/dmdnp-data";
import { PageHero, QuoteCta, SiteFooter, SiteHeader } from "@/components/site-shell";

export default function FaqPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero kicker="FAQ" title="자주 묻는 질문" text="사인 제작 전 궁금한 제작 기간, 설치, 디자인, 견적 기준을 정리했습니다." />
        <section className="section"><div className="site-container faq-list">{faqs.map((item) => <details key={item.question} open><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div></section>
        <QuoteCta />
      </main>
      <SiteFooter />
    </>
  );
}
