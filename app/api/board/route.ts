import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import {
  adminToken,
  boardNames,
  checkOrigin,
  hashPassword,
  matchesPassword,
  rateLimit,
  sb,
  signedFile,
} from "@/lib/board-server";
import { fail } from "@/lib/board-response";

export const runtime = "nodejs";
const kinds = ["blog", "portfolio", "resources", "faq", "notices"] as const;
const entrySchema = z.object({
  id: z.string().uuid().optional(),
  kind: z.enum(kinds),
  slug: z.string().regex(/^[a-z0-9][a-z0-9-]{1,119}$/),
  title: z.string().trim().min(1).max(200),
  category: z.string().max(100),
  summary: z.string().max(1000),
  body: z.array(z.string().max(20000)).max(100),
  published: z.boolean(),
  pinned: z.boolean(),
  sort_order: z.number().int().min(0).max(9999),
  published_at: z.string().datetime({ offset: true }),
  payload: z.record(z.unknown()).default({}),
});
const inquirySchema = z.object({
  name: z.string().trim().min(1).max(80),
  contact: z.string().trim().min(7).max(80),
  product: z.enum(["간판", "LED전광판", "UV인쇄", "현수막", "시트지", "기타"]),
  title: z.string().trim().min(1).max(200),
  message: z.string().trim().min(10).max(10000),
  password: z.string().min(10).max(128),
  consent: z.literal(true),
  size: z.string().max(100).default(""),
  quantity: z.string().max(100).default(""),
  location: z.string().max(300).default(""),
  desired_date: z.string().max(30).default(""),
  website: z.string().max(0).default(""),
});
export async function GET(request: Request) {
  try {
    const token = await adminToken();
    const mode = new URL(request.url).searchParams.get("mode");
    if (mode === "inquiries")
      return NextResponse.json(
        await sb(
          "/rest/v1/board_inquiries?select=id,receipt,name,contact,product,title,message,size,quantity,location,desired_date,status,answer,created_at&order=created_at.desc&limit=500",
          {},
          false,
          token,
        ),
      );
    return NextResponse.json(
      await sb(
        "/rest/v1/board_entries?order=updated_at.desc",
        {},
        false,
        token,
      ),
    );
  } catch (error) {
    return fail(error, 401);
  }
}
export async function POST(request: Request) {
  try {
    checkOrigin(request);
    if (Number(request.headers.get("content-length")) > 250000)
      throw new Error("입력 내용이 너무 큽니다.");
    const input = await request.json();
    if (input.action === "inquiry") {
      await rateLimit(request, "create", 5);
      const data = inquirySchema.parse(input.data);
      const { password, consent, website, ...fields } = data;
      void consent;
      void website;
      const id = randomUUID();
      const receipt = randomUUID().replaceAll("-", "");
      await sb(
        "/rest/v1/board_inquiries",
        {
          method: "POST",
          body: JSON.stringify({
            ...fields,
            id,
            receipt,
            password_hash: hashPassword(password),
          }),
        },
        true,
      );
      return NextResponse.json({ receipt });
    }
    if (input.action === "lookup") {
      await rateLimit(request, "lookup", 15);
      const data = z
        .object({
          receipt: z.string().regex(/^[a-f0-9]{32}$/),
          password: z.string().min(1).max(128),
        })
        .parse(input.data);
      const rows = await sb(
        `/rest/v1/board_inquiries?receipt=eq.${data.receipt}`,
        {},
        true,
      );
      const row = rows?.[0];
      if (!row || !matchesPassword(data.password, row.password_hash))
        throw new Error("접수번호 또는 비밀번호를 확인해 주세요.");
      const files = await sb(
        `/rest/v1/board_files?inquiry_id=eq.${row.id}&select=id,name,size`,
        {},
        true,
      );
      const links = await Promise.all(
        files.map(async (f: { id: string; name: string; size: number }) => ({
          ...f,
          url: await signedFile(f.id),
        })),
      );
      const { password_hash, ...safe } = row;
      void password_hash;
      return NextResponse.json({ ...safe, files: links });
    }
    const token = await adminToken();
    if (input.action === "save") {
      const entry = entrySchema.parse(input.data);
      if (entry.id) {
        const current = await sb(
          `/rest/v1/board_entries?id=eq.${entry.id}&select=kind,slug`,
          {},
          false,
          token,
        );
        if (
          !current.length ||
          current[0].kind !== entry.kind ||
          current[0].slug !== entry.slug
        )
          throw new Error("기존 게시물의 주소와 종류는 변경할 수 없습니다.");
      }
      const id = entry.id || randomUUID();
      const rows = await sb(
        "/rest/v1/board_entries?on_conflict=id",
        {
          method: "POST",
          headers: {
            Prefer: "resolution=merge-duplicates,return=representation",
          },
          body: JSON.stringify({
            ...entry,
            id,
            updated_at: new Date().toISOString(),
          }),
        },
        false,
        token,
      );
      return NextResponse.json(rows[0]);
    }
    if (input.action === "answer") {
      const data = z
        .object({
          id: z.string().uuid(),
          answer: z.string().max(20000),
          status: z.enum(["received", "reviewing", "answered"]),
        })
        .parse(input.data);
      if (data.status === "answered" && !data.answer.trim())
        throw new Error("답변 내용을 입력해 주세요.");
      await sb(
        `/rest/v1/board_inquiries?id=eq.${data.id}`,
        {
          method: "PATCH",
          body: JSON.stringify({ answer: data.answer, status: data.status }),
        },
        false,
        token,
      );
      return NextResponse.json({ ok: true });
    }
    if (input.action === "delete" || input.action === "delete_inquiry") {
      const id = z.string().uuid().parse(input.data.id);
      const inquiry = input.action === "delete_inquiry";
      const files = await sb(
        `/rest/v1/board_files?${inquiry ? "inquiry_id" : "entry_id"}=eq.${id}`,
        {},
        false,
        token,
      );
      if (files.length)
        await sb(
          "/storage/v1/object/board-assets",
          {
            method: "DELETE",
            body: JSON.stringify({
              prefixes: files.map((f: { path: string }) => f.path),
            }),
          },
          true,
        );
      await sb(
        `/rest/v1/${inquiry ? "board_inquiries" : "board_entries"}?id=eq.${id}`,
        { method: "DELETE" },
        false,
        token,
      );
      return NextResponse.json({ ok: true });
    }
    throw new Error(
      `지원하지 않는 요청입니다. ${Object.values(boardNames).join(", ")}`,
    );
  } catch (error) {
    return fail(error);
  }
}
