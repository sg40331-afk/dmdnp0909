"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Copy, Download, Eye, FilePlus2, Save, Search, Trash2 } from "lucide-react";

type ImageTone = "wood" | "blue" | "led" | "print" | "map";

type AdminPost = {
  slug: string;
  title: string;
  category: string;
  date: string;
  summary: string;
  relatedProduct: string;
  imageTone: ImageTone;
  body: string[];
};

type ProductOption = { slug: string; name: string };

type DraftPost = AdminPost & { savedAt: string };

type Props = {
  posts: AdminPost[];
  productOptions: ProductOption[];
};

const storageKey = "dmdnp-blog-admin-drafts";
const toneOptions: ImageTone[] = ["wood", "blue", "led", "print", "map"];
const categoryOptions = ["제품 선택 가이드", "제작 방법", "간판·사인 정보", "장비와 제작현장", "공공시설 안내", "자주 묻는 질문"];

function today() {
  return new Date().toISOString().slice(0, 10);
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9가-힣\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function emptyDraft(): DraftPost {
  return {
    slug: "",
    title: "",
    category: categoryOptions[0],
    date: today(),
    summary: "",
    relatedProduct: "wood-sign-menu",
    imageTone: "blue",
    body: [""],
    savedAt: new Date().toISOString(),
  };
}

function toExportText(post: DraftPost) {
  const escapedBody = post.body.filter(Boolean).map((paragraph) => `    ${JSON.stringify(paragraph)},`).join("\n");
  return `{
  slug: ${JSON.stringify(post.slug)},
  title: ${JSON.stringify(post.title)},
  category: ${JSON.stringify(post.category)},
  date: ${JSON.stringify(post.date)},
  summary: ${JSON.stringify(post.summary)},
  relatedProduct: ${JSON.stringify(post.relatedProduct)},
  imageTone: ${JSON.stringify(post.imageTone)},
  body: [
${escapedBody}
  ],
}`;
}

function downloadText(filename: string, text: string) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function BlogAdminClient({ posts, productOptions }: Props) {
  const [unlocked, setUnlocked] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [query, setQuery] = useState("");
  const [drafts, setDrafts] = useState<DraftPost[]>([]);
  const [draft, setDraft] = useState<DraftPost>(() => emptyDraft());
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as DraftPost[];
      if (Array.isArray(parsed)) setDrafts(parsed);
    } catch {
      window.localStorage.removeItem(storageKey);
    }
  }, []);

  useEffect(() => {
    if (!unlocked) return;
    window.localStorage.setItem(storageKey, JSON.stringify(drafts));
  }, [drafts, unlocked]);

  const filteredPosts = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return posts;
    return posts.filter((post) => `${post.title} ${post.category} ${post.summary} ${post.slug}`.toLowerCase().includes(term));
  }, [posts, query]);

  const exportText = useMemo(() => toExportText(draft), [draft]);

  function updateDraft<K extends keyof DraftPost>(key: K, value: DraftPost[K]) {
    setDraft((current) => ({ ...current, [key]: value, savedAt: new Date().toISOString() }));
  }

  function saveDraft() {
    const slug = draft.slug || slugify(draft.title);
    const next = { ...draft, slug, savedAt: new Date().toISOString(), body: draft.body.filter((paragraph) => paragraph.trim()) };
    setDraft(next);
    setDrafts((current) => [next, ...current.filter((item) => item.slug !== slug)]);
  }

  async function copyExport() {
    await navigator.clipboard.writeText(exportText);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  if (!unlocked) {
    return (
      <main className="admin-page admin-login">
        <section className="admin-login-panel">
          <p className="kicker">ADMIN</p>
          <h1>대명DnP 블로그 관리자</h1>
          <p>블로그 글 초안 작성과 기존 글 확인을 위한 작업 화면입니다.</p>
          <label>
            관리자 확인 코드
            <input type="password" value={passcode} onChange={(event) => setPasscode(event.target.value)} placeholder="관리 코드 입력" />
          </label>
          <button className="button button-blue" type="button" onClick={() => setUnlocked(passcode === "4033" || passcode === "0324284033")}>관리자 열기</button>
          <Link className="text-link" href="/"><ArrowLeft size={16} /> 홈페이지로 돌아가기</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="admin-page">
      <header className="admin-topbar">
        <div>
          <p className="kicker">BLOG ADMIN</p>
          <h1>대명DnP 블로그 관리자</h1>
          <p>기존 글 {posts.length}개를 확인하고 새 글 초안을 작성합니다.</p>
        </div>
        <div className="admin-actions">
          <Link className="button button-outline" href="/blog"><Eye size={17} /> 블로그 보기</Link>
          <Link className="button button-orange" href="/"><ArrowLeft size={17} /> 홈페이지</Link>
        </div>
      </header>

      <section className="admin-stats">
        <article><strong>{posts.length}</strong><span>게시된 글</span></article>
        <article><strong>{drafts.length}</strong><span>저장된 초안</span></article>
        <article><strong>{categoryOptions.length}</strong><span>카테고리</span></article>
      </section>

      <section className="admin-layout">
        <div className="admin-panel">
          <div className="admin-panel-head">
            <h2>새 글 작성</h2>
            <button className="button button-outline" type="button" onClick={() => setDraft(emptyDraft())}><FilePlus2 size={17} /> 새로쓰기</button>
          </div>

          <div className="admin-form-grid">
            <label>제목<input value={draft.title} onChange={(event) => { updateDraft("title", event.target.value); if (!draft.slug) updateDraft("slug", slugify(event.target.value)); }} placeholder="예: 인천 간판 제작 전 확인할 사항" /></label>
            <label>URL 슬러그<input value={draft.slug} onChange={(event) => updateDraft("slug", slugify(event.target.value))} placeholder="incheon-sign-checklist" /></label>
            <label>날짜<input type="date" value={draft.date} onChange={(event) => updateDraft("date", event.target.value)} /></label>
            <label>카테고리<select value={draft.category} onChange={(event) => updateDraft("category", event.target.value)}>{categoryOptions.map((category) => <option key={category}>{category}</option>)}</select></label>
            <label>관련 제품<select value={draft.relatedProduct} onChange={(event) => updateDraft("relatedProduct", event.target.value)}>{productOptions.map((product) => <option key={product.slug} value={product.slug}>{product.name}</option>)}</select></label>
            <label>이미지 톤<select value={draft.imageTone} onChange={(event) => updateDraft("imageTone", event.target.value as ImageTone)}>{toneOptions.map((tone) => <option key={tone}>{tone}</option>)}</select></label>
          </div>

          <label>요약<textarea value={draft.summary} onChange={(event) => updateDraft("summary", event.target.value)} placeholder="검색 결과와 목록에 표시될 짧은 설명" /></label>
          <label>본문<textarea className="admin-body-input" value={draft.body.join("\n\n")} onChange={(event) => updateDraft("body", event.target.value.split(/\n\s*\n/))} placeholder="문단 사이를 한 줄 비워 입력하세요." /></label>

          <div className="admin-actions">
            <button className="button button-blue" type="button" onClick={saveDraft}><Save size={17} /> 초안 저장</button>
            <button className="button button-outline" type="button" onClick={copyExport}><Copy size={17} /> {copied ? "복사됨" : "코드 복사"}</button>
            <button className="button button-light" type="button" onClick={() => downloadText(`${draft.slug || "dmdnp-blog-draft"}.txt`, exportText)}><Download size={17} /> 다운로드</button>
          </div>
        </div>

        <aside className="admin-panel admin-preview">
          <h2>미리보기</h2>
          <span className="chip">{draft.category}</span>
          <h3>{draft.title || "새 블로그 글 제목"}</h3>
          <p>{draft.summary || "요약을 입력하면 여기에 표시됩니다."}</p>
          <small>{draft.date}</small>
          <div className="admin-export-box"><pre>{exportText}</pre></div>
        </aside>
      </section>

      <section className="admin-layout admin-lists">
        <div className="admin-panel">
          <div className="admin-panel-head">
            <h2>게시된 블로그 글</h2>
            <label className="admin-search"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="제목, 카테고리 검색" /></label>
          </div>
          <div className="admin-post-list">
            {filteredPosts.map((post) => (
              <article key={post.slug}>
                <div><span>{post.category}</span><h3>{post.title}</h3><p>{post.summary}</p><small>{post.date} · /blog/{post.slug}</small></div>
                <Link className="text-link" href={`/blog/${post.slug}`}>보기</Link>
              </article>
            ))}
          </div>
        </div>

        <aside className="admin-panel">
          <h2>저장된 초안</h2>
          <div className="admin-draft-list">
            {drafts.length === 0 ? <p className="notice">아직 저장된 초안이 없습니다.</p> : drafts.map((item) => (
              <article key={item.slug}>
                <button type="button" onClick={() => setDraft(item)}><strong>{item.title || "제목 없음"}</strong><span>{item.date} · {item.category}</span></button>
                <button aria-label="초안 삭제" type="button" onClick={() => setDrafts((current) => current.filter((draftItem) => draftItem.slug !== item.slug))}><Trash2 size={16} /></button>
              </article>
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
}
