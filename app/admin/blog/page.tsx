import { Metadata } from "next";
import { blogPosts, products } from "@/lib/dmdnp-data";
import { BlogAdminClient } from "./blog-admin-client";

export const metadata: Metadata = {
  title: "블로그 관리자",
  description: "대명DnP 블로그 글 초안 작성과 기존 글 확인을 위한 관리자 화면입니다.",
  robots: { index: false, follow: false },
};

export default function BlogAdminPage() {
  const posts = blogPosts.map((post) => ({
    slug: post.slug,
    title: post.title,
    category: post.category,
    date: post.date,
    summary: post.summary,
    relatedProduct: post.relatedProduct,
    imageTone: post.imageTone,
    body: post.body,
  }));

  const productOptions = products.map((product) => ({ slug: product.slug, name: product.name }));

  return <BlogAdminClient posts={posts} productOptions={productOptions} />;
}
