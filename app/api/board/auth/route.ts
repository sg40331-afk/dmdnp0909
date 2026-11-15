import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { adminToken, checkOrigin, sb } from "@/lib/board-server";
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
    if (input.action === "change-password") {
      const passwords = z.object({
        currentPassword: z.string().min(1).max(128),
        newPassword: z.string().min(12).refine(
          (value) => Buffer.byteLength(value, "utf8") <= 72,
        ),
      }).safeParse(input);
      if (!passwords.success)
        return NextResponse.json({ error: "새 비밀번호는 12자 이상, 72바이트 이하여야 합니다." }, { status: 400 });
      const { currentPassword, newPassword } = passwords.data;
      if (currentPassword === newPassword)
        return NextResponse.json({ error: "새 비밀번호를 현재 비밀번호와 다르게 입력해 주세요." }, { status: 400 });

      const token = await adminToken();
      try {
        await sb("/auth/v1/user", {
          method: "PUT",
          body: JSON.stringify({ password: newPassword, current_password: currentPassword }),
        }, false, token);
      } catch {
        return NextResponse.json({ error: "비밀번호를 변경하지 못했습니다. 현재 비밀번호와 새 비밀번호를 확인해 주세요." }, { status: 400 });
      }
      await sb("/auth/v1/logout", { method: "POST" }, false, token).catch(() => null);
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
