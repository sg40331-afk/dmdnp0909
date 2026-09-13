import { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { CompanyGreeting } from "../company-content";

export const metadata: Metadata = {
  title: "대표 인사말",
  description: "대명DnP 대표 이태윤의 제작 경험과 상담부터 제작까지 책임 있게 관리한다는 약속을 소개합니다.",
  alternates: { canonical: "/company/greeting" },
  openGraph: { title: "대명DnP 대표 인사말", description: "2002년부터 이어온 사인 제품 제작 경험을 소개합니다.", url: "/company/greeting" },
};

export default function GreetingPage() {
  return <><SiteHeader /><main><CompanyGreeting /></main><SiteFooter /></>;
}
