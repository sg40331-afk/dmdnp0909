import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { QuoteCta, SiteFooter, SiteHeader } from "@/components/site-shell";
import { catalogAssets, catalogCases, catalogGroups, catalogPath } from "@/lib/portfolio-catalog";
import { BreadcrumbJsonLd } from "@/lib/seo";
import "../../portfolio.css";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return catalogCases.filter(({ slug }) => slug !== "wood-plaque" && slug !== "braille-tactile-map").map(({ slug }) => ({ slug }));
}

async function getCase(params: Props["params"]) {
  const { slug } = await params;
  const item = catalogCases.find((entry) => entry.slug === slug);
  if (!item) notFound();
  return item;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = await getCase(params);
  const title = `${item.title} 제작·시공 사례`;
  const url = catalogPath(item.slug);
  const image = `${catalogAssets}/${item.slug}/cover.jpg`;
  return {
    title,
    description: item.summary,
    alternates: { canonical: url },
    openGraph: { title, description: item.summary, url, images: [{ url: image, alt: item.title }] },
    twitter: { card: "summary_large_image", title, description: item.summary, images: [{ url: image, alt: item.title }] },
  };
}

export default async function Page({ params }: Props) {
  const item = await getCase(params);
  const group = catalogGroups.find((entry) => entry.id === item.group);
  const related = catalogCases.filter((entry) => entry.group === item.group && entry.slug !== item.slug);

  return (
    <>
      <SiteHeader />
      <main className="portfolio-main">
        <div className="site-container portfolio-detail">
          <Link className="portfolio-back" href={`/portfolio#portfolio-${item.group}`}><ArrowLeft size={17} aria-hidden="true" /> 시공사례 목록</Link>
          <header className="portfolio-detail-heading">
            <p className="portfolio-kicker">{group?.label}</p>
            <h1>{item.title}</h1>
            <p>{item.summary}</p>
          </header>
          {item.photoLabel && <h2 className="portfolio-gallery-label">{item.photoLabel}</h2>}
          <ul className={`portfolio-photos${item.photoFolder ? " portfolio-installations" : ""}`} aria-label={`${item.title} ${item.photoLabel ?? "카탈로그 사진"}`}>
            {Array.from({ length: item.photos }, (_, index) => {
              const directory = item.photoFolder ? `${item.slug}/${item.photoFolder}` : item.slug;
              const src = `${catalogAssets}/${directory}/photo-${index + 1}.jpg`;
              return (
                <li key={src}>
                  <a href={src} target="_blank" rel="noopener noreferrer" aria-label={`${item.title} ${item.photoLabel ?? "사진"} ${index + 1} 크게 보기 (새 탭)`}>
                    <Image src={src} alt={`${item.title} ${item.photoLabel ?? "카탈로그 사례 사진"} ${index + 1}`} {...(item.photoFolder ? { fill: true } : { width: 1160, height: 1600 })} sizes="(max-width: 560px) 94vw, (max-width: 1200px) 47vw, 580px" />
                  </a>
                </li>
              );
            })}
          </ul>
          {related.length > 0 && (
            <nav className="portfolio-related" aria-label="같은 분야 사례">
              <h2>같은 분야 사례</h2>
              <ul>
                {related.map((entry) => <li key={entry.slug}><Link href={catalogPath(entry.slug)}>{entry.title} <ArrowUpRight size={16} aria-hidden="true" /></Link></li>)}
              </ul>
            </nav>
          )}
        </div>
        <QuoteCta />
      </main>
      <SiteFooter />
      <BreadcrumbJsonLd items={[{ name: "홈", href: "/" }, { name: "시공사례", href: "/portfolio" }, { name: item.title, href: catalogPath(item.slug) }]} />
    </>
  );
}
