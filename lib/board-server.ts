import "server-only";
import { cookies } from "next/headers";
import {
  createHmac,
  randomBytes,
  scryptSync,
  timingSafeEqual,
} from "node:crypto";

export type BoardKind = "blog" | "portfolio" | "resources" | "faq" | "notices";
export type BoardEntry = {
  id: string;
  kind: BoardKind;
  slug: string;
  title: string;
  category: string;
  summary: string;
  body: string[];
  published: boolean;
  pinned: boolean;
  sort_order: number;
  published_at: string;
  payload: Record<string, unknown>;
  updated_at: string;
};
export const boardNames: Record<BoardKind, string> = {
  blog: "블로그",
  portfolio: "시공사례",
  resources: "자료실",
  faq: "자주 묻는 질문",
  notices: "공지사항",
};
export const boardPaths: Record<BoardKind, string> = {
  blog: "/blog",
  portfolio: "/portfolio",
  resources: "/support/resources",
  faq: "/faq",
  notices: "/support/notices",
};
export function configured() {
  return Boolean(
    process.env.SUPABASE_URL && process.env.SUPABASE_PUBLISHABLE_KEY,
  );
}
export async function sb(
  path: string,
  init: RequestInit = {},
  privileged = false,
  token?: string,
) {
  if (privileged && !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const secret = process.env.INQUIRY_RATE_SECRET;
    if (!secret || !process.env.SUPABASE_URL)
      throw new Error("게시판 보안 연결 설정이 완료되지 않았습니다.");
    const headers = new Headers(init.headers);
    const binary = init.body instanceof Blob;
    const payload = JSON.stringify({
      path,
      method: init.method || "GET",
      contentType: headers.get("Content-Type") || "application/json",
      prefer: headers.get("Prefer") || "",
      binary,
      body: binary
        ? Buffer.from(await (init.body as Blob).arrayBuffer()).toString(
            "base64",
          )
        : init.body || null,
    });
    const timestamp = String(Date.now());
    const signature = createHmac("sha256", secret)
      .update(timestamp + "\n" + payload)
      .digest("hex");
    const response = await fetch(
      process.env.SUPABASE_URL + "/functions/v1/board-gateway",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-board-timestamp": timestamp,
          "x-board-signature": signature,
        },
        body: payload,
        cache: "no-store",
      },
    );
    if (!response.ok)
      throw new Error(`게시판 요청에 실패했습니다 (${response.status}).`);
    const value = await response.text();
    return value ? JSON.parse(value) : null;
  }
  const key = privileged
    ? process.env.SUPABASE_SERVICE_ROLE_KEY
    : process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!process.env.SUPABASE_URL || !key)
    throw new Error("게시판 연결 설정이 완료되지 않았습니다.");
  const headers = new Headers(init.headers);
  headers.set("apikey", key);
  if (token || key.startsWith("eyJ"))
    headers.set("Authorization", `Bearer ${token || key}`);
  if (init.body && !(init.body instanceof Blob))
    headers.set("Content-Type", "application/json");
  const res = await fetch(`${process.env.SUPABASE_URL}${path}`, {
    ...init,
    headers,
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`게시판 요청에 실패했습니다 (${res.status}).`);
  const value = await res.text();
  return value ? JSON.parse(value) : null;
}
export async function publicEntries(
  kind: BoardKind,
): Promise<BoardEntry[] | null> {
  if (!configured()) return null;
  return sb(
    `/rest/v1/board_entries?kind=eq.${kind}&published=eq.true&published_at=lte.${encodeURIComponent(new Date().toISOString())}&order=pinned.desc,sort_order.asc,published_at.desc`,
  );
}
export async function publicEntry(
  kind: BoardKind,
  slug: string,
): Promise<BoardEntry | null> {
  const entries = await publicEntries(kind);
  return entries?.find((item) => item.slug === slug) || null;
}
export class AdminAccessError extends Error {}
export async function adminToken() {
  const jar = await cookies();
  const token = jar.get("dnp_access")?.value;
  if (!token) throw new AdminAccessError("관리자 로그인이 필요합니다.");
  const user = await sb("/auth/v1/user", {}, false, token).catch(() => {
    throw new AdminAccessError("관리자 세션이 만료되었습니다.");
  });
  const members = await sb(
    `/rest/v1/board_admins?user_id=eq.${user.id}&select=user_id`,
    {},
    false,
    token,
  );
  if (!members?.length)
    throw new AdminAccessError("승인된 관리자만 사용할 수 있습니다.");
  return token;
}
export function checkOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin)
    throw new Error("잘못된 요청입니다.");
}
export function hashPassword(value: string) {
  const salt = randomBytes(16).toString("hex");
  return `${salt}:${scryptSync(value, salt, 64).toString("hex")}`;
}
export function matchesPassword(value: string, stored: string) {
  const [salt, hash] = stored.split(":");
  const expected = Buffer.from(hash, "hex");
  const actual = scryptSync(value, salt, 64);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}
export async function rateLimit(
  request: Request,
  action: string,
  maximum: number,
) {
  if (!process.env.INQUIRY_RATE_SECRET)
    throw new Error("문의 보안 설정이 완료되지 않았습니다.");
  const ip =
    request.headers.get("x-vercel-forwarded-for")?.split(",")[0] ||
    request.headers.get("x-forwarded-for")?.split(",")[0] ||
    "local";
  const key = createHmac("sha256", process.env.INQUIRY_RATE_SECRET)
    .update(`${action}:${ip}`)
    .digest("hex");
  const allowed = await sb(
    "/rest/v1/rpc/board_rate_limit",
    { method: "POST", body: JSON.stringify({ bucket_key: key, maximum }) },
    true,
  );
  if (!allowed) throw new Error("요청이 많습니다. 잠시 후 다시 시도해 주세요.");
}
export async function entryFiles(
  entryId: string,
  privileged = false,
  token?: string,
) {
  return sb(
    `/rest/v1/board_files?entry_id=eq.${entryId}&select=id,name,mime,size`,
    {},
    privileged,
    token,
  );
}
export async function signedFile(id: string) {
  const rows = await sb(`/rest/v1/board_files?id=eq.${id}`, {}, true);
  if (!rows.length) throw new Error("파일을 찾을 수 없습니다.");
  const result = await sb(
    `/storage/v1/object/sign/board-assets/${rows[0].path}`,
    { method: "POST", body: JSON.stringify({ expiresIn: 300 }) },
    true,
  );
  return `${process.env.SUPABASE_URL}/storage/v1${result.signedURL}`;
}
