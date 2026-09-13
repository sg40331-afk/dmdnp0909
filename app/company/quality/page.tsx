import { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { CompanyQuality } from "../company-content";

export const metadata: Metadata = {
  title: "품질관리",
  description: "상담 내용 확인부터 최종 검수와 포장, 출고까지 대명DnP 품질관리 과정을 소개합니다.",
  alternates: { canonical: "/company/quality" },
  openGraph: { title: "대명DnP 품질관리", description: "처음부터 끝까지 꼼꼼하게 확인하는 제작 과정을 확인하세요.", url: "/company/quality" },
};

export default function QualityPage() {
  return <><SiteHeader /><main><CompanyQuality /></main><SiteFooter /></>;
}
