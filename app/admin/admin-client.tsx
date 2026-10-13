"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Save,
  Send,
  Trash2,
  Plus,
  LogOut,
  Upload,
  Download,
  Search,
} from "lucide-react";
import { boardPost, boardRequest } from "@/lib/board-client";
import type { BoardEntry, BoardKind } from "@/lib/board-server";
type Attachment = { id: string; name: string; mime: string; size: number };
type Inquiry = {
  id: string;
  receipt: string;
  name: string;
  contact: string;
  product: string;
  title: string;
  message: string;
  size: string;
  quantity: string;
  location: string;
  desired_date: string;
  status: string;
  answer: string;
  created_at: string;
};
const labels: Record<BoardKind, string> = {
  blog: "블로그",
  portfolio: "시공사례",
  resources: "자료실",
  faq: "자주 묻는 질문",
  notices: "공지사항",
};
const categories: Record<BoardKind, string[]> = {
  blog: ["제작 정보", "제품 안내", "제작현장"],
  portfolio: ["간판", "LED전광판", "UV인쇄", "현수막", "시트지", "기타"],
  resources: ["주문서", "디자인 양식", "파일 제작 안내", "제품 안내서"],
  faq: ["제작 기간", "디자인·파일", "설치·시공", "배송", "결제·견적"],
  notices: ["운영 안내", "제품 소식"],
};
function blank(kind: BoardKind): Partial<BoardEntry> {
  return {
    kind,
    slug: "",
    title: "",
    category: categories[kind][0],
    summary: "",
    body: [],
    published: false,
    pinned: false,
    sort_order: 0,
    published_at: new Date().toISOString(),
    payload: {},
  };
}
export default function AdminClient() {
  const [localDrafts, setLocalDrafts] = useState<Record<string, unknown>[]>([]);
  const [logged, setLogged] = useState(false),
    [busy, setBusy] = useState(false),
    [message, setMessage] = useState(""),
    [error, setError] = useState("");
  const [mode, setMode] = useState<BoardKind | "inquiries">("inquiries"),
    [rows, setRows] = useState<BoardEntry[]>([]),
    [inquiries, setInquiries] = useState<Inquiry[]>([]),
    [draft, setDraft] = useState<Partial<BoardEntry>>(blank("blog")),
    [body, setBody] = useState(""),
    [query, setQuery] = useState(""),
    [selected, setSelected] = useState<Inquiry | null>(null),
    [attachments, setAttachments] = useState<Attachment[]>([]);
  async function refresh() {
    const [content, questions] = await Promise.all([
      boardRequest("/api/board"),
      boardRequest("/api/board?mode=inquiries"),
    ]);
    setRows(content);
    setInquiries(questions);
    setLogged(true);
  }
  useEffect(() => {
    let active = true;
    Promise.all([
      boardRequest("/api/board"),
      boardRequest("/api/board?mode=inquiries"),
    ])
      .then(([content, questions]) => {
        if (active) {
          setRows(content);
          setInquiries(questions);
          setLogged(true);
        }
      })
      .catch(() => {
        if (active) setLogged(false);
      });
    return () => {
      active = false;
    };
  }, []);
  async function run(action: () => Promise<void>) {
    setBusy(true);
    setError("");
    setMessage("");
    try {
      await action();
    } catch (e) {
      setError(e instanceof Error ? e.message : "실패했습니다.");
    } finally {
      setBusy(false);
    }
  }
  function open(entry: Partial<BoardEntry>) {
    setDraft(entry);
    setBody((entry.body || []).join("\n\n"));
    setAttachments([]);
  }
  async function save(published: boolean) {
    const entry = await boardPost("save", {
      ...draft,
      body: body.split(/\n\s*\n/).filter(Boolean),
      published,
    });
    open(entry);
    await refresh();
    setMessage(published ? "게시되었습니다." : "초안이 저장되었습니다.");
  }
  async function importDrafts() {
    const raw = localStorage.getItem("dmdnp-blog-admin-drafts");
    if (!raw) throw new Error("이 브라우저에 기존 초안이 없습니다.");
    const parsed = JSON.parse(raw);
    const list = Array.isArray(parsed) ? parsed : Object.values(parsed);
    if (!list.length) throw new Error("가져올 초안이 없습니다.");
    setLocalDrafts(list as Record<string, unknown>[]);
    loadLocalDraft(list[0] as Record<string, unknown>);
  }
  function loadLocalDraft(value: Record<string, unknown>) {
    setMode("blog");
    open({
      ...blank("blog"),
      slug: String(value.slug || ""),
      title: String(value.title || ""),
      category: String(value.category || "제작 정보"),
      summary: String(value.summary || ""),
      body: Array.isArray(value.body)
        ? value.body.map(String)
        : String(value.body || "").split(/\n\s*\n/),
      payload: {
        relatedProduct: value.relatedProduct || "",
        imageTone: value.imageTone || "blue",
      },
    });
    setMessage("기존 초안을 불러왔습니다. 내용을 검토한 뒤 저장하세요.");
  }
  if (!logged)
    return (
      <main className="board-shell">
        <h1>대명DnP 관리자</h1>
        <form
          className="board-form"
          onSubmit={(e) => {
            e.preventDefault();
            const form = new FormData(e.currentTarget);
            run(async () => {
              await boardRequest("/api/board/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  email: form.get("email"),
                  password: form.get("password"),
                }),
              });
              await refresh();
            });
          }}
        >
          <label>
            이메일
            <input
              name="email"
              type="email"
              defaultValue="sg40331@gmail.com"
              required
              autoComplete="username"
            />
          </label>
          <label>
            비밀번호
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
            />
          </label>
          {error && (
            <p role="alert" className="board-message board-error">
              {error}
            </p>
          )}
          <div className="board-actions">
            <button className="primary" disabled={busy}>
              로그인
            </button>
            <Link href="/">홈페이지</Link>
          </div>
        </form>
      </main>
    );
  return (
    <main className="board-shell">
      <div className="board-summary">
        <h1>대명DnP 관리자</h1>
        <div className="board-actions">
          <Link href="/">홈페이지</Link>
          <button
            onClick={() =>
              run(async () => {
                await boardRequest("/api/board/auth", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ action: "logout" }),
                });
                setLogged(false);
              })
            }
          >
            <LogOut size={16} />
            로그아웃
          </button>
        </div>
      </div>
      <div className="board-actions board-tabs">
        {(
          ["inquiries", ...Object.keys(labels)] as (BoardKind | "inquiries")[]
        ).map((key) => (
          <button
            key={key}
            disabled={busy}
            aria-pressed={mode === key}
            onClick={() => {
              setMode(key);
              setQuery("");
              setSelected(null);
              setAttachments([]);
              if (key !== "inquiries") open(blank(key));
            }}
          >
            {key === "inquiries" ? "문의 답변" : labels[key]}
          </button>
        ))}
      </div>
      {message && (
        <p role="status" className="board-message">
          {message}
        </p>
      )}
      {error && (
        <p role="alert" className="board-message board-error">
          {error}
        </p>
      )}
      <div className="board-search-row">
        <Search size={20} />
        <input
          className="board-search"
          placeholder="제목 검색"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="admin-layout">
        <aside className="admin-list">
          {mode !== "inquiries" && (
            <div className="board-actions">
              <button onClick={() => open(blank(mode))}>
                <Plus size={16} />새 글
              </button>
            </div>
          )}
          {mode === "inquiries"
            ? inquiries
                .filter(
                  (i) => i.title.includes(query) || i.name.includes(query),
                )
                .map((i) => (
                  <button
                    key={i.id}
                    aria-pressed={selected?.id === i.id}
                    onClick={() => {
                      setSelected(i);
                      setAttachments([]);
                    }}
                  >
                    {i.title}
                    <br />
                    <small>
                      {i.name} ·{" "}
                      {
                        {
                          received: "접수",
                          reviewing: "검토 중",
                          answered: "답변 완료",
                        }[i.status]
                      }
                    </small>
                  </button>
                ))
            : rows
                .filter((r) => r.kind === mode && r.title.includes(query))
                .map((r) => (
                  <button
                    key={r.id}
                    aria-pressed={draft.id === r.id}
                    onClick={() => open(r)}
                  >
                    {r.title}
                    <br />
                    <small>
                      {r.published ? "공개" : "초안"} · {r.category}
                    </small>
                  </button>
                ))}
        </aside>
        <section>
          {mode === "inquiries" ? (
            selected ? (
              <form
                className="board-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  run(async () => {
                    await boardPost("answer", {
                      id: selected.id,
                      answer: selected.answer,
                      status: selected.status,
                    });
                    await refresh();
                    setMessage("답변이 저장되었습니다.");
                  });
                }}
              >
                <h2>{selected.title}</h2>
                <p>
                  {selected.name} · {selected.contact} · {selected.product}
                </p>
                <p className="board-body">{selected.message}</p>
                <p>
                  {selected.size} / {selected.quantity} / {selected.location} /{" "}
                  {selected.desired_date}
                </p>
                <button
                  type="button"
                  className="board-button"
                  onClick={() =>
                    run(async () => {
                      setAttachments(
                        await boardRequest(
                          `/api/board/admin-files?inquiryId=${selected.id}`,
                        ),
                      );
                    })
                  }
                >
                  <Download size={16} />
                  첨부파일 확인
                </button>
                {attachments.map((f) => (
                  <a
                    key={f.id}
                    href={`/api/board/files?id=${f.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {f.name}
                  </a>
                ))}
                <label>
                  처리 상태
                  <select
                    value={selected.status}
                    onChange={(e) =>
                      setSelected({ ...selected, status: e.target.value })
                    }
                  >
                    <option value="received">접수</option>
                    <option value="reviewing">검토 중</option>
                    <option value="answered">답변 완료</option>
                  </select>
                </label>
                <label>
                  답변
                  <textarea
                    value={selected.answer}
                    onChange={(e) =>
                      setSelected({ ...selected, answer: e.target.value })
                    }
                  />
                </label>
                <div className="board-actions">
                  <button disabled={busy} className="primary">
                    <Save size={16} />
                    답변 저장
                  </button>
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => {
                      if (confirm("문의와 첨부파일을 삭제할까요?"))
                        run(async () => {
                          await boardPost("delete_inquiry", {
                            id: selected.id,
                          });
                          setSelected(null);
                          setAttachments([]);
                          await refresh();
                          setMessage("문의가 삭제되었습니다.");
                        });
                    }}
                  >
                    <Trash2 size={16} />
                    문의 삭제
                  </button>
                </div>
              </form>
            ) : (
              <p>문의가 없거나 선택되지 않았습니다.</p>
            )
          ) : (
            <>
              <form
                className="board-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  run(() => save(false));
                }}
              >
                <h2>{draft.id ? "게시물 수정" : "새 게시물"}</h2>
                <label>
                  제목
                  <input
                    required
                    maxLength={200}
                    value={draft.title || ""}
                    onChange={(e) =>
                      setDraft({ ...draft, title: e.target.value })
                    }
                  />
                </label>
                <label>
                  주소 ID
                  <input
                    required
                    pattern="[a-z0-9][a-z0-9-]{1,119}"
                    readOnly={!!draft.id}
                    value={draft.slug || ""}
                    onChange={(e) =>
                      setDraft({ ...draft, slug: e.target.value })
                    }
                  />
                </label>
                <div className="board-grid">
                  <label>
                    분류
                    <input
                      list="board-categories"
                      value={draft.category || ""}
                      onChange={(e) =>
                        setDraft({ ...draft, category: e.target.value })
                      }
                    />
                    <datalist id="board-categories">
                      {categories[mode].map((c) => (
                        <option key={c} value={c} />
                      ))}
                    </datalist>
                  </label>
                  <label>
                    게시일
                    <input
                      type="datetime-local"
                      required
                      value={
                        draft.published_at
                          ? new Date(
                              new Date(draft.published_at).getTime() -
                                new Date(
                                  draft.published_at,
                                ).getTimezoneOffset() *
                                  60000,
                            )
                              .toISOString()
                              .slice(0, 16)
                          : ""
                      }
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          published_at: e.target.value
                            ? new Date(e.target.value).toISOString()
                            : "",
                        })
                      }
                    />
                  </label>
                </div>
                <label>
                  요약
                  <textarea
                    maxLength={1000}
                    value={draft.summary || ""}
                    onChange={(e) =>
                      setDraft({ ...draft, summary: e.target.value })
                    }
                  />
                </label>
                <label>
                  {mode === "faq" ? "답변" : "본문"}
                  <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    style={{ minHeight: 260 }}
                  />
                </label>
                <div className="board-grid">
                  <label>
                    정렬 순서
                    <input
                      type="number"
                      min={0}
                      max={9999}
                      value={draft.sort_order || 0}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          sort_order: Number(e.target.value),
                        })
                      }
                    />
                  </label>
                  <label className="check-label">
                    <input
                      type="checkbox"
                      checked={!!draft.pinned}
                      onChange={(e) =>
                        setDraft({ ...draft, pinned: e.target.checked })
                      }
                    />
                    상단 고정
                  </label>
                </div>
                <div className="board-actions">
                  <button disabled={busy}>
                    <Save size={16} />
                    초안 저장
                  </button>
                  <button
                    type="button"
                    className="primary"
                    disabled={busy}
                    onClick={() => run(() => save(true))}
                  >
                    <Send size={16} />
                    게시
                  </button>
                  {draft.id && (
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => {
                        if (confirm("이 게시물과 첨부파일을 삭제할까요?"))
                          run(async () => {
                            await boardPost("delete", { id: draft.id });
                            open(blank(mode));
                            await refresh();
                            setMessage("삭제되었습니다.");
                          });
                      }}
                    >
                      <Trash2 size={16} />
                      삭제
                    </button>
                  )}
                </div>
              </form>
              {draft.id && (
                <div className="board-form">
                  <br />
                  <label>
                    사진·자료 파일
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,application/pdf"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file)
                          run(async () => {
                            const form = new FormData();
                            form.set("file", file);
                            form.set("entryId", draft.id!);
                            await boardRequest("/api/board/files", {
                              method: "POST",
                              body: form,
                            });
                            setAttachments(
                              await boardRequest(
                                `/api/board/admin-files?entryId=${draft.id}`,
                              ),
                            );
                            setMessage("첨부파일이 등록되었습니다.");
                          });
                      }}
                    />
                  </label>
                  <button
                    className="board-button"
                    onClick={() =>
                      run(async () =>
                        setAttachments(
                          await boardRequest(
                            `/api/board/admin-files?entryId=${draft.id}`,
                          ),
                        ),
                      )
                    }
                  >
                    <Download size={16} />
                    첨부파일 확인
                  </button>
                  {attachments.map((f) => (
                    <div className="board-file" key={f.id}>
                      <a
                        href={`/api/board/files?id=${f.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {f.name}
                      </a>
                      <button
                        className="board-button"
                        title="파일 삭제"
                        onClick={() => {
                          if (confirm("파일을 삭제할까요?"))
                            run(async () => {
                              await boardRequest("/api/board/files", {
                                method: "DELETE",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ id: f.id }),
                              });
                              setAttachments(
                                attachments.filter((a) => a.id !== f.id),
                              );
                            });
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </section>
      </div>
      <hr />
      <div className="board-actions">
        <button
          disabled={busy}
          onClick={() =>
            run(async () => {
              await boardRequest("/api/board/import", { method: "POST" });
              await refresh();
              setMessage(
                "기존 게시물을 가져왔습니다. 이미 저장된 글은 유지됩니다.",
              );
            })
          }
        >
          <Upload size={16} />
          기존 게시물 가져오기
        </button>
        <button disabled={busy} onClick={() => run(importDrafts)}>
          <Upload size={16} />
          브라우저 초안 가져오기
        </button>
        {localDrafts.length > 0 && (
          <select
            aria-label="가져올 기존 초안"
            onChange={(e) =>
              loadLocalDraft(localDrafts[Number(e.target.value)])
            }
          >
            {localDrafts.map((item, index) => (
              <option key={index} value={index}>
                {String(item.title || `초안 ${index + 1}`)}
              </option>
            ))}
          </select>
        )}
      </div>
    </main>
  );
}
