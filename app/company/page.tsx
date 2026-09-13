import { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { CompanyOverview } from "./company-content";

export const metadata: Metadata = {
  title: "회사 개요",
  description: "대명DnP의 설립, 제작시설, 주요 제작 제품과 자체 제작 장점을 소개합니다.",
  alternates: { canonical: "/company" },
  openGraph: { title: "대명DnP 회사 개요", description: "다양한 사인 제품을 직접 만드는 대명DnP를 소개합니다.", url: "/company" },
};

export default function CompanyPage() {
  return <><SiteHeader /><main><CompanyOverview /></main><SiteFooter /></>;
}
