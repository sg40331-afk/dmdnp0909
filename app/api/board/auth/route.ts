import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { checkOrigin, sb } from "@/lib/board-server";
import { fail } from "@/lib/board-response";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/",
};
export async function POST(request: Request) {
  try {
    checkOrigin(request);
    const input = await request.json();
    const jar = await cookies();
    if (input.action === "logout") {
      const token = jar.get("dnp_access")?.value;
      if (token)
        await sb("/auth/v1/logout", { method: "POST" }, false, token).catch(
          () => null,
        );
      jar.delete("dnp_access");
      jar.delete("dnp_refresh");
      return NextResponse.json({ ok: true });
    }
    const credentials =
      input.action === "refresh"
        ? { refresh_token: jar.get("dnp_refresh")?.value }
        : z
            .object({
              email: z.string().email(),
              password: z.string().min(1).max(128),
            })
            .parse(input);
    const session = await sb(
      `/auth/v1/token?grant_type=${input.action === "refresh" ? "refresh_token" : "password"}`,
      { method: "POST", body: JSON.stringify(credentials) },
    );
    const admins = await sb(
      `/rest/v1/board_admins?user_id=eq.${session.user.id}&select=user_id`,
      {},
      false,
      session.access_token,
    );
    if (!admins?.length) {
      await sb(
        "/auth/v1/logout",
        { method: "POST" },
        false,
        session.access_token,
      ).catch(() => null);
      throw new Error("승인된 관리자 계정이 아닙니다.");
    }
    jar.set("dnp_access", session.access_token, {
      ...cookieOptions,
      maxAge: session.expires_in,
    });
    jar.set("dnp_refresh", session.refresh_token, {
      ...cookieOptions,
      maxAge: 60 * 60 * 24 * 7,
    });
    return NextResponse.json({ ok: true, email: session.user.email });
  } catch (error) {
    return fail(error, 401);
  }
}
