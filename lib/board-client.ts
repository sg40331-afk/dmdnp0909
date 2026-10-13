export async function boardRequest(path: string, init: RequestInit = {}) {
  let response = await fetch(path, init);
  if (response.status === 401 && !path.includes("/auth")) {
    const refreshed = await fetch("/api/board/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "refresh" }),
    });
    if (refreshed.ok) response = await fetch(path, init);
  }
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || "요청에 실패했습니다.");
  return result;
}
export function boardPost(action: string, data: unknown) {
  return boardRequest("/api/board", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action, data }),
  });
}
