import { NextResponse } from "next/server";
import { adminToken, checkOrigin, sb } from "@/lib/board-server";
import { legacyEntries } from "@/lib/board-data";
import { fail } from "@/lib/board-response";
export async function POST(request: Request) {
  try {
    checkOrigin(request);
    const token = await adminToken();
    await sb(
      "/rest/v1/board_entries?on_conflict=kind,slug",
      {
        method: "POST",
        headers: { Prefer: "resolution=ignore-duplicates" },
        body: JSON.stringify(legacyEntries()),
      },
      false,
      token,
    );
    return NextResponse.json({ ok: true });
  } catch (error) {
    return fail(error);
  }
}
