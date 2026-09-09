import { MessageCircle, PenTool, Settings, Truck, Wrench } from "lucide-react";
import { PageHero, QuoteCta, SiteFooter, SiteHeader } from "@/components/site-shell";

const steps = [
  [MessageCircle, "상담·설계", "용도와 설치 공간을 확인합니다."],
  [PenTool, "디자인·시안", "소재와 규격에 맞춘 시안을 준비합니다."],
  [Settings, "직접 제작", "자체 장비로 출력과 가공을 진행합니다."],
  [Wrench, "검수·후가공", "표기와 마감 상태를 확인합니다."],
  [Truck, "출고·설치", "납품과 설치 상담까지 이어갑니다."],
] as const;

export default function ProcessPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero kicker="PROCESS" title="기획부터 제작·출력·가공까지 원스톱" text="상담부터 납품까지 같은 기준으로 관리해 결과물의 완성도를 높입니다." />
        <section className="section"><div className="site-container process-row">{steps.map(([Icon, title, text]) => <article className="process-step" key={title}><Icon /><strong>{title}</strong><small>{text}</small></article>)}</div></section>
        <QuoteCta />
      </main>
      <SiteFooter />
    </>
  );
}
