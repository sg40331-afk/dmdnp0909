import Link from "next/link";
import { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { blogPosts, getBlogImageSource } from "@/lib/dmdnp-data";
import { PageHero, QuoteCta, SiteFooter, SiteHeader, VisualBlock } from "@/components/site-shell";

export const metadata: Metadata = { title: "블로그", description: "사인 제품 선택, 제작 방법, 설치 사례, 제작현장 정보를 정리한 대명DnP 블로그입니다.", alternates: { canonical: "/blog" } };

export default function BlogPage() {
  const categories = Array.from(new Set(blogPosts.map((post) => post.category)));
  return <><SiteHeader /><main><PageHero kicker="BLOG" title="사인 제품 제작 정보" text="제품 선택부터 파일 준비, 소재와 설치 방법까지 고객이 실제로 궁금해하는 내용을 정리했습니다." /><section className="section"><div className="site-container"><div className="filter-row">{categories.map((category) => <span className="chip" key={category}>{category}</span>)}</div><div className="grid-3">{blogPosts.map((post) => <Link className="card" key={post.slug} href={`/blog/${post.slug}`}><VisualBlock label={`${post.title} 이미지`} tone={post.imageTone} source={getBlogImageSource(post.relatedProduct, post.slug)} /><div className="card-body"><span className="chip">{post.category}</span><h3>{post.title}</h3><p>{post.summary}</p><small>{post.date}</small><span className="text-link">글 읽기 <ArrowRight size={16} /></span></div></Link>)}</div></div></section><QuoteCta /></main><SiteFooter /></>;
}
