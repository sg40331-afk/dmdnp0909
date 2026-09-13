import { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { CompanyBusiness } from "../company-content";

export const metadata: Metadata = {
  title: "제작 분야",
  description: "나무현판, 아크릴 안내판, LED 전광판, UV 인쇄, 실사출력, 촉지도 등 대명DnP 제작 분야를 소개합니다.",
  alternates: { canonical: "/company/business" },
  openGraph: { title: "대명DnP 제작 분야", description: "공간에 맞는 사인 제품 제작 분야를 확인하세요.", url: "/company/business" },
};

export default function BusinessPage() {
  return <><SiteHeader /><main><CompanyBusiness /></main><SiteFooter /></>;
}
