import { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { CompanyLocation } from "../company-content";

export const metadata: Metadata = {
  title: "오시는 길",
  description: "대명DnP 주소, 방문 안내, 대중교통과 차량 방문 안내를 확인하세요.",
  alternates: { canonical: "/company/location" },
  openGraph: { title: "대명DnP 오시는 길", description: "방문 전 연락 후 제작 상담 자료를 준비해 주세요.", url: "/company/location" },
};

export default function LocationPage() {
  return <><SiteHeader /><main><CompanyLocation /></main><SiteFooter /></>;
}
