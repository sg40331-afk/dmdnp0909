import { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { CompanyHistory } from "../company-content";

export const metadata: Metadata = {
  title: "주요 연혁",
  description: "대명DnP가 걸어온 길과 확인이 필요한 연혁 정보를 타임라인으로 정리했습니다.",
  alternates: { canonical: "/company/history" },
  openGraph: { title: "대명DnP 주요 연혁", description: "회사 설립과 제작 설비 확대 흐름을 확인하세요.", url: "/company/history" },
};

export default function HistoryPage() {
  return <><SiteHeader /><main><CompanyHistory /></main><SiteFooter /></>;
}
