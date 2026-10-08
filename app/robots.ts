import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/dmdnp-data";

const allowedAgents = [
  "*",
  "Googlebot",
  "Bingbot",
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "Google-Extended",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Applebot",
  "Applebot-Extended",
  "CCBot",
  "Bytespider",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: allowedAgents.map((userAgent) => ({
      userAgent,
      allow: "/",
      disallow: ["/api/", "/admin/", "/login/"],
    })),
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
