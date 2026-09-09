import { blogPosts } from "@/lib/dmdnp-data";
import { PageHero, QuoteCta, SiteFooter, SiteHeader } from "@/components/site-shell";

export default function BlogPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero kicker="BLOG" title="사인 제작 가이드" text="소재 선택, 제작 방식, 설치 전 확인 사항을 쉽게 정리한 안내 글입니다." />
        <section className="section">
          <div className="site-container grid-3">
            {blogPosts.map((post) => <article className="card" key={post.slug}><div className="card-body"><p className="kicker">{post.date}</p><h3>{post.title}</h3><p>{post.summary}</p></div></article>)}
          </div>
        </section>
        <QuoteCta />
      </main>
      <SiteFooter />
    </>
  );
}
