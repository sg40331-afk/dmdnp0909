import Link from "next/link";
import { Metadata } from "next";
import { FileText, MessageSquare, CircleHelp, Megaphone } from "lucide-react";
import { PageHero, SiteHeader, SiteFooter } from "@/components/site-shell";
import "./support.css";
export const metadata: Metadata = {
  title: "고객지원",
  description: "대명DnP 견적·제작 문의, 자료실, 자주 묻는 질문, 공지사항",
  alternates: { canonical: "/support" },
};
const links = [
  { href: "/support/inquiries", label: "견적·제작 문의", Icon: MessageSquare },
  { href: "/support/resources", label: "자료실", Icon: FileText },
  { href: "/faq", label: "자주 묻는 질문", Icon: CircleHelp },
  { href: "/support/notices", label: "공지사항", Icon: Megaphone },
];
export default function Support() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          kicker="SUPPORT"
          title="고객지원"
          text="제품 제작 상담과 필요한 자료를 확인하세요."
        />
        <section className="section">
          <div className="site-container support-links">
            {links.map(({ href, label, Icon }) => (
              <Link href={href} key={href}>
                <Icon size={24} />
                <strong>{label}</strong>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
