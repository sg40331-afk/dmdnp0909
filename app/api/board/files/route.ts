import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import {
  adminToken,
  checkOrigin,
  matchesPassword,
  rateLimit,
  sb,
  signedFile,
} from "@/lib/board-server";
import { fail } from "@/lib/board-response";

export const runtime = "nodejs";
const types: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "application/pdf": "pdf",
};
export async function GET(request: Request) {
  try {
    const id = new URL(request.url).searchParams.get("id");
    if (!id || !/^[a-f0-9-]{36}$/.test(id))
      throw new Error("잘못된 파일입니다.");
    const rows = await sb(
      `/rest/v1/board_files?id=eq.${id}&select=id,entry_id`,
      {},
      true,
    );
    const file = rows[0];
    if (!file) throw new Error("파일을 찾을 수 없습니다.");
    const entries = file.entry_id
      ? await sb(
          `/rest/v1/board_entries?id=eq.${file.entry_id}&published=eq.true&published_at=lte.${encodeURIComponent(new Date().toISOString())}&select=id`,
        )
      : [];
    if (!entries.length) await adminToken();
    const response = NextResponse.redirect(await signedFile(id));
    response.headers.set("Cache-Control", "private, no-store");
    response.headers.set("Referrer-Policy", "no-referrer");
    return response;
  } catch (error) {
    return fail(error, 403);
  }
}
export async function POST(request: Request) {
  try {
    checkOrigin(request);
    if (Number(request.headers.get("content-length")) > 4200000)
      throw new Error("파일은 4MB 이하로 첨부해 주세요.");
    const form = await request.formData();
    const file = form.get("file");
    if (
      !(file instanceof File) ||
      !file.size ||
      file.size > 4 * 1024 * 1024 ||
      !types[file.type]
    )
      throw new Error("JPG, PNG, WEBP, PDF 파일을 4MB 이하로 첨부해 주세요.");
    const bytes = new Uint8Array(await file.arrayBuffer());
    const valid =
      file.type === "image/jpeg"
        ? bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255
        : file.type === "image/png"
          ? Buffer.from(bytes.subarray(0, 8)).equals(
              Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
            )
          : file.type === "application/pdf"
            ? Buffer.from(bytes.subarray(0, 5)).toString() === "%PDF-"
            : Buffer.from(bytes.subarray(0, 4)).toString() === "RIFF" &&
              Buffer.from(bytes.subarray(8, 12)).toString() === "WEBP";
    if (!valid) throw new Error("파일 형식과 내용이 일치하지 않습니다.");
    let inquiryId: string | null = null;
    let entryId: string | null = null;
    const receipt = form.get("receipt");
    if (receipt) {
      await rateLimit(request, "upload", 15);
      if (!/^[a-f0-9]{32}$/.test(String(receipt)))
        throw new Error("접수번호를 확인해 주세요.");
      const rows = await sb(
        `/rest/v1/board_inquiries?receipt=eq.${receipt}`,
        {},
        true,
      );
      if (
        !rows.length ||
        !matchesPassword(
          String(form.get("password") || ""),
          rows[0].password_hash,
        )
      )
        throw new Error("접수번호 또는 비밀번호를 확인해 주세요.");
      inquiryId = rows[0].id;
    } else {
      const token = await adminToken();
      entryId = String(form.get("entryId") || "");
      if (!/^[a-f0-9-]{36}$/.test(entryId))
        throw new Error("게시물을 먼저 저장해 주세요.");
      const rows = await sb(
        `/rest/v1/board_entries?id=eq.${entryId}&select=id`,
        {},
        false,
        token,
      );
      if (!rows.length) throw new Error("게시물을 찾을 수 없습니다.");
    }
    const existing = await sb(
      `/rest/v1/board_files?${inquiryId ? "inquiry_id" : "entry_id"}=eq.${inquiryId || entryId}&select=id`,
      {},
      true,
    );
    if (existing.length >= 10) throw new Error("첨부파일은 최대 10개입니다.");
    const id = randomUUID();
    const path = `${inquiryId ? "inquiries" : "entries"}/${inquiryId || entryId}/${id}.${types[file.type]}`;
    await sb(
      `/storage/v1/object/board-assets/${path}`,
      {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: new Blob([bytes], { type: file.type }),
      },
      true,
    );
    try {
      await sb(
        "/rest/v1/board_files",
        {
          method: "POST",
          body: JSON.stringify({
            id,
            entry_id: entryId,
            inquiry_id: inquiryId,
            path,
            name: file.name.slice(0, 200),
            mime: file.type,
            size: file.size,
          }),
        },
        true,
      );
    } catch (error) {
      await sb(
        "/storage/v1/object/board-assets",
        { method: "DELETE", body: JSON.stringify({ prefixes: [path] }) },
        true,
      );
      throw error;
    }
    return NextResponse.json({ id, name: file.name });
  } catch (error) {
    return fail(error);
  }
}
export async function DELETE(request: Request) {
  try {
    checkOrigin(request);
    const token = await adminToken();
    const { id } = await request.json();
    if (!/^[a-f0-9-]{36}$/.test(String(id)))
      throw new Error("잘못된 파일입니다.");
    const files = await sb(
      `/rest/v1/board_files?id=eq.${id}`,
      {},
      false,
      token,
    );
    if (!files.length) throw new Error("파일을 찾을 수 없습니다.");
    await sb(
      "/storage/v1/object/board-assets",
      { method: "DELETE", body: JSON.stringify({ prefixes: [files[0].path] }) },
      true,
    );
    await sb(
      `/rest/v1/board_files?id=eq.${id}`,
      { method: "DELETE" },
      false,
      token,
    );
    return NextResponse.json({ ok: true });
  } catch (error) {
    return fail(error);
  }
}
