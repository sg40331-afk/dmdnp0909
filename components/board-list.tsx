"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
type Item = {
  cover?: string;
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  body: string[];
  pinned: boolean;
  published_at: string;
};
export default function BoardList({
  items,
  path,
  faq = false,
}: {
  items: Item[];
  path: string;
  faq?: boolean;
}) {
  const [query, setQuery] = useState(""),
    [category, setCategory] = useState(""),
    [page, setPage] = useState(1);
  const filtered = items.filter(
    (i) =>
      (!category || i.category === category) &&
      `${i.title} ${i.summary}`.toLowerCase().includes(query.toLowerCase()),
  );
  const pages = Math.max(1, Math.ceil(filtered.length / 12));
  return (
    <>
      <div className="board-search-row">
        <Search size={20} />
        <input
          aria-label="게시물 검색"
          className="board-search"
          placeholder="검색"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
        />
        <select
          aria-label="분류"
          className="board-search"
          style={{ width: "auto" }}
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
        >
          <option value="">전체 분류</option>
          {Array.from(new Set(items.map((i) => i.category))).map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>
      <div className="board-list">
        {filtered.slice((page - 1) * 12, page * 12).map((i) =>
          faq ? (
            <details className="board-row" key={i.id}>
              <summary>{i.title}</summary>
              {i.body.map((p, n) => (
                <p key={n}>{p}</p>
              ))}
            </details>
          ) : (
            <Link
              className={i.cover ? "board-row board-illustrated" : "board-row"}
              key={i.id}
              href={`${path}/${i.slug}`}
            >
              {i.cover && (
                <Image
                  className="board-thumbnail"
                  src={i.cover}
                  alt={i.title}
                  width={300}
                  height={180}
                  unoptimized
                />
              )}
              <div>
                <span className="board-meta">
                  {i.pinned ? "공지 · " : ""}
                  {i.category} · {i.published_at.slice(0, 10)}
                </span>
                <h3>{i.title}</h3>
                <p>{i.summary}</p>
              </div>
            </Link>
          ),
        )}
      </div>
      {!filtered.length && <p>등록된 게시물이 없습니다.</p>}
      <div className="board-actions board-pager">
        <button
          title="이전 페이지"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          <ChevronLeft size={18} />
        </button>
        <span>
          {page} / {pages}
        </span>
        <button
          title="다음 페이지"
          disabled={page === pages}
          onClick={() => setPage(page + 1)}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </>
  );
}
