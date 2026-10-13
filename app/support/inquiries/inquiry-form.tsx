"use client";
import { useState, useRef } from "react";
import { Send, Search, Paperclip } from "lucide-react";
import { boardPost, boardRequest } from "@/lib/board-client";
import { company } from "@/lib/dmdnp-data";
type Inquiry = {
  title: string;
  message: string;
  status: string;
  answer: string;
  created_at: string;
  files: { id: string; name: string; url: string }[];
};
export default function InquiryForm() {
  const [mode, setMode] = useState("create");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [receipt, setReceipt] = useState("");
  const [result, setResult] = useState<Inquiry | null>(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const uploadedFiles = useRef(new Set<string>());
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    setResult(null);
    setUploadMessage("");
    const form = new FormData(event.currentTarget);
    const fields = Object.fromEntries(form.entries());
    let acceptedReceipt = receipt;
    try {
      if (mode === "lookup") {
        setResult(
          await boardPost("lookup", {
            receipt: String(fields.receipt).trim(),
            password: fields.password,
          }),
        );
        return;
      }
      const accepted =
        receipt ||
        (
          await boardPost("inquiry", {
            ...fields,
            consent: form.get("consent") === "on",
          })
        ).receipt;
      setReceipt(accepted);
      acceptedReceipt = accepted;
      const files = form
        .getAll("files")
        .filter((f): f is File => f instanceof File && f.size > 0);
      for (const file of files) {
        const fingerprint = `${file.name}:${file.size}:${file.lastModified}`;
        if (uploadedFiles.current.has(fingerprint)) continue;
        const upload = new FormData();
        upload.set("file", file);
        upload.set("receipt", accepted);
        upload.set("password", String(fields.password));
        await boardRequest("/api/board/files", {
          method: "POST",
          body: upload,
        });
        uploadedFiles.current.add(fingerprint);
      }
      setUploadMessage(
        "문의가 접수되었습니다. 접수번호와 비밀번호를 보관해 주세요.",
      );
    } catch (e) {
      setError(
        (acceptedReceipt
          ? "문의는 접수되었습니다. 첨부 업로드를 확인해 주세요. "
          : "") + (e instanceof Error ? e.message : "실패했습니다."),
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <div>
      <div className="board-actions">
        <button
          type="button"
          disabled={busy}
          aria-pressed={mode === "create"}
          onClick={() => {
            setMode("create");
            if (uploadMessage) {
              setReceipt("");
              uploadedFiles.current.clear();
              setUploadMessage("");
              formRef.current?.reset();
            }
            setError("");
            setResult(null);
          }}
        >
          문의 작성
        </button>
        <button
          type="button"
          disabled={busy}
          aria-pressed={mode === "lookup"}
          onClick={() => {
            setMode("lookup");
            setError("");
          }}
        >
          내 문의 확인
        </button>
        <a className="board-button" href="tel:01052017977">
          전화 상담
        </a>
        <a
          className="board-button"
          href={company.kakao}
          target="_blank"
          rel="noopener noreferrer"
        >
          카카오톡 상담
        </a>
      </div>
      <br />
      <form className="board-form" onSubmit={submit} ref={formRef} key={mode}>
        {mode === "lookup" ? (
          <label>
            접수번호
            <input
              name="receipt"
              defaultValue={receipt}
              required
              maxLength={32}
            />
          </label>
        ) : (
          <>
            <div className="board-grid">
              <label>
                이름
                <input
                  name="name"
                  required
                  maxLength={80}
                  disabled={!!receipt}
                />
              </label>
              <label>
                연락처
                <input
                  name="contact"
                  required
                  minLength={7}
                  maxLength={80}
                  disabled={!!receipt}
                />
              </label>
            </div>
            <label>
              제품 종류
              <select name="product" disabled={!!receipt}>
                {[
                  "간판",
                  "LED전광판",
                  "UV인쇄",
                  "현수막",
                  "시트지",
                  "기타",
                ].map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </label>
            <label>
              제목
              <input
                name="title"
                required
                maxLength={200}
                disabled={!!receipt}
              />
            </label>
            <label>
              문의 내용
              <textarea
                name="message"
                required
                minLength={10}
                maxLength={10000}
                disabled={!!receipt}
              />
            </label>
            <div className="board-grid">
              {[
                ["size", "크기"],
                ["quantity", "수량"],
                ["location", "설치 장소"],
                ["desired_date", "희망 일정"],
              ].map(([name, label]) => (
                <label key={name}>
                  {label}
                  <input
                    name={name}
                    type={name === "desired_date" ? "date" : "text"}
                    maxLength={100}
                    disabled={!!receipt}
                  />
                </label>
              ))}
            </div>
            <label>
              <span>
                <Paperclip size={16} /> 사진·도면 첨부
              </span>
              <input
                name="files"
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp,application/pdf"
              />
            </label>
            <p className="board-meta">
              파일별 최대 4MB, 최대 10개 · JPG, PNG, WEBP, PDF
            </p>
            <div className="board-honeypot" aria-hidden="true">
              <input name="website" tabIndex={-1} autoComplete="off" />
            </div>
            <p className="board-meta">
              수집 항목: 이름·연락처·문의 내용·첨부파일. 목적: 견적 상담과 답변.
              보관 기간: 상담 종료 후 1년. 동의를 거부할 수 있으며, 거부 시
              온라인 문의 접수가 제한됩니다.
            </p>
            <label className="check-label">
              <input
                name="consent"
                type="checkbox"
                required
                disabled={!!receipt}
                defaultChecked={!!receipt}
              />
              개인정보 수집 및 이용에 동의합니다.
            </label>
          </>
        )}
        <label>
          문의 비밀번호
          <input
            name="password"
            type="password"
            required
            minLength={mode === "create" ? 10 : 1}
            maxLength={128}
            autoComplete={
              mode === "create" ? "new-password" : "current-password"
            }
          />
        </label>
        {receipt && mode === "create" && (
          <p className="board-message">
            접수번호: <strong>{receipt}</strong>
          </p>
        )}
        {uploadMessage && (
          <p className="board-message" role="status">
            {uploadMessage}
          </p>
        )}
        {error && (
          <p className="board-message board-error" role="alert">
            {error}
          </p>
        )}
        <div className="board-actions">
          <button className="primary" disabled={busy}>
            {mode === "lookup" ? <Search size={18} /> : <Send size={18} />}{" "}
            {busy
              ? "처리 중"
              : mode === "lookup"
                ? "조회"
                : receipt
                  ? "첨부 업로드 재시도"
                  : "문의 접수"}
          </button>
        </div>
      </form>
      {result && (
        <article className="board-row">
          <p className="board-meta">
            {{ received: "접수", reviewing: "검토 중", answered: "답변 완료" }[
              result.status
            ] || result.status}
          </p>
          <h2>{result.title}</h2>
          <p>{result.message}</p>
          {result.files.map((f) => (
            <p key={f.id}>
              <a href={f.url} target="_blank" rel="noopener noreferrer">
                {f.name}
              </a>
            </p>
          ))}
          <h3>관리자 답변</h3>
          <p>{result.answer || "답변을 준비하고 있습니다."}</p>
        </article>
      )}
    </div>
  );
}
