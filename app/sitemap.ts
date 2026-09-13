import { MetadataRoute } from "next";
import { companyPages } from "@/lib/company-data";
import { blogPosts, portfolioItems, products, siteUrl } from "@/lib/dmdnp-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/products", "/portfolio", "/process", "/blog", "/faq", "/contact"];
  return [
    ...routes.map((route) => ({ url: `${siteUrl}${route}`, lastModified: new Date() })),
    ...companyPages.map((item) => ({ url: `${siteUrl}${item.href}`, lastModified: new Date() })),
    ...products.map((item) => ({ url: `${siteUrl}/products/${item.slug}`, lastModified: new Date() })),
    ...portfolioItems.map((item) => ({ url: `${siteUrl}/portfolio/${item.slug}`, lastModified: new Date() })),
    ...blogPosts.map((item) => ({ url: `${siteUrl}/blog/${item.slug}`, lastModified: new Date() })),
  ];
}
