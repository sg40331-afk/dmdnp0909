import { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { CompanyFacilities } from "../company-content";

export const metadata: Metadata = {
  title: "장비·시설",
  description: "UV 평판프린터, 파이버레이저, CNC, 실사출력 장비 등 대명DnP 제작 설비를 소개합니다.",
  alternates: { canonical: "/company/facilities" },
  openGraph: { title: "대명DnP 장비·시설", description: "직접 제작을 위한 전문 설비를 확인하세요.", url: "/company/facilities" },
};

export default function FacilitiesPage() {
  return <><SiteHeader /><main><CompanyFacilities /></main><SiteFooter /></>;
}
