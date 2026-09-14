import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPost, getProduct, getBlogImageSource, blogPosts, siteUrl } from "@/lib/dmdnp-data";
import { QuoteCta, SiteFooter, SiteHeader, VisualBlock } from "@/components/site-shell";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return blogPosts.map((post) => ({ slug: post.slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.summary, alternates: { canonical: `/blog/${post.slug}` }, openGraph: { title: post.title, description: post.summary, url: `${siteUrl}/blog/${post.slug}`, type: "article" } };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const product = getProduct(post.relatedProduct);
  const articleJsonLd = { "@context": "https://schema.org", "@type": "Article", headline: post.title, datePublished: post.date, author: { "@type": "Organization", name: "대명DnP" }, description: post.summary, mainEntityOfPage: `${siteUrl}/blog/${post.slug}` };
  return <><SiteHeader /><main><article><section className="page-hero"><div className="site-container"><div className="breadcrumb"><Link href="/blog">블로그</Link> / {post.category}</div><p className="kicker">{post.category}</p><h1>{post.title}</h1><p>{post.summary}</p></div></section><section className="section"><div className="site-container detail-layout"><VisualBlock label={`${post.title} 대표 이미지 영역`} tone={post.imageTone} source={getBlogImageSource(post.relatedProduct, post.slug)} /><div className="detail-panel"><p>{post.date}</p>{post.body.slice(0, 3).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<div className="blog-inline-images">{post.images.map((image) => <VisualBlock key={image} label={image} tone={post.imageTone} source={getBlogImageSource(post.relatedProduct, post.slug)} />)}</div>{post.body.slice(3).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{product ? <p className="notice">관련 제품: <Link className="text-link" href={`/products/${product.slug}`}>{product.name}</Link></p> : null}</div></div></section></article><QuoteCta title="글에서 본 제품을 견적 문의하세요" /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} /></main><SiteFooter /></>;
}
