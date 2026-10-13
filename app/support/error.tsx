"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="board-shell">
      <h1>고객지원 연결을 확인하고 있습니다.</h1>
      <p>잠시 후 다시 시도해 주세요. 전화 상담: 032-428-4033</p>
      <button className="board-button" onClick={reset}>
        다시 시도
      </button>
    </main>
  );
}
