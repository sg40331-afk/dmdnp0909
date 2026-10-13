import { NextResponse } from "next/server";
import { adminToken, sb } from "@/lib/board-server";
import { fail } from "@/lib/board-response";
export async function GET(request: Request) {
  try {
    const token = await adminToken();
    const params = new URL(request.url).searchParams;
    const id = params.get("entryId") || params.get("inquiryId");
    if (!id || !/^[a-f0-9-]{36}$/.test(id))
      throw new Error("잘못된 요청입니다.");
    return NextResponse.json(
      await sb(
        `/rest/v1/board_files?${params.has("entryId") ? "entry_id" : "inquiry_id"}=eq.${id}&select=id,name,mime,size`,
        {},
        false,
        token,
      ),
    );
  } catch (e) {
    return fail(e, 401);
  }
}
