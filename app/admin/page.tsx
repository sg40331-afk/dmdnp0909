import type { Metadata } from "next";
import AdminClient from "./admin-client";
import "../support/support.css";
export const metadata: Metadata = { title: "관리자", robots: { index: false, follow: false } };

export default function AdminPage() {
  return <AdminClient/>;
}
