import { MetadataRoute } from "next";
import { companyPages } from "@/lib/company-data";
import { products, siteUrl } from "@/lib/dmdnp-data";
import { entries } from "@/lib/board-data";
import { boardPaths, type BoardKind } from "@/lib/board-server";
export const dynamic = "force-dynamic";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    "",
    "/products",
    "/portfolio",
    "/process",
    "/blog",
    "/faq",
    "/contact",
    "/support",
    "/support/resources",
    "/support/notices",
  ];
  const groups = await Promise.all(
    (["blog", "portfolio", "resources", "notices"] as BoardKind[]).map(
      async (kind) =>
        (await entries(kind)).map((item) => ({
          url: `${siteUrl}${boardPaths[kind]}/${item.slug}`,
          lastModified: new Date(item.updated_at),
        })),
    ),
  );
  return [
    ...routes.map((route) => ({ url: `${siteUrl}${route}` })),
    ...companyPages.map((item) => ({ url: `${siteUrl}${item.href}` })),
    ...products.map((item) => ({ url: `${siteUrl}/products/${item.slug}` })),
    ...groups.flat(),
  ];
}
