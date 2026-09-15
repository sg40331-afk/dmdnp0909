import Link from "next/link";
import { ArrowLeft, Clock3 } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site-shell";

type UnderConstructionPageProps = {
  eyebrow: string;
};

export function UnderConstructionPage({ eyebrow }: UnderConstructionPageProps) {
  return (
    <>
      <SiteHeader />
      <main className="under-construction">
        <section className="site-container under-construction-panel">
          <p className="kicker">{eyebrow}</p>
          <div className="under-construction-icon" aria-hidden="true">
            <Clock3 />
          </div>
          <h1>작업중</h1>
          <p>빠른 시일 안에 찾아뵙겠습니다.</p>
          <div className="under-construction-actions">
            <Link className="button button-outline" href="/">
              <ArrowLeft size={18} /> 메인으로 돌아가기
            </Link>
            <Link className="button button-primary" href="/contact">
              빠른 견적 문의
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
