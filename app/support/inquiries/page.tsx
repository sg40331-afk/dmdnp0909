import type { Metadata } from "next";
import { SiteHeader, SiteFooter, PageHero } from "@/components/site-shell";
import InquiryForm from "./inquiry-form";
import "../support.css";
export const metadata: Metadata = {
  title: "견적·제작 문의",
  robots: { index: false, follow: true },
};
export default function Inquiries() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          kicker="CONTACT"
          title="견적·제작 문의"
          text="문의 내용과 첨부파일은 문의자 본인과 관리자만 확인할 수 있습니다."
        />
        <section className="section">
          <div className="site-container">
            <InquiryForm />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
