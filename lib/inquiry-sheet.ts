import "server-only";
import { createHmac } from "node:crypto";
import { sb } from "./board-server";

export function sheetConfigured() {
  const url = process.env.SHEETS_WEBHOOK_URL;
  const secret = process.env.SHEETS_WEBHOOK_SECRET;
  return Boolean(
    url &&
      secret &&
      /^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(
        url,
      ),
  );
}

export async function syncInquirySheet() {
  if (!sheetConfigured()) return { configured: false, sent: 0, failed: 0 };
  const rows = await sb(
    "/rest/v1/board_inquiries?sheet_synced_at=is.null&order=created_at.asc&limit=3&select=id,created_at,name,contact,product,title,message,size,quantity,location,desired_date,consent_at",
    {},
    true,
  );
  let sent = 0;
  let failed = 0;
  for (const row of rows) {
    try {
      const payload = JSON.stringify(row);
      const timestamp = String(Date.now());
      const signature = createHmac("sha256", process.env.SHEETS_WEBHOOK_SECRET!)
        .update(timestamp + "\n" + payload)
        .digest("hex");
      const response = await fetch(process.env.SHEETS_WEBHOOK_URL!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ timestamp, signature, payload }),
        signal: AbortSignal.timeout(12000),
        cache: "no-store",
      });
      if (!response.ok) throw new Error("시트 웹앱 응답 오류");
      const result = await response.json();
      if (result.ok !== true || result.id !== row.id)
        throw new Error("시트 인증·설정 또는 기록 응답을 확인해 주세요.");
      await sb(
        "/rest/v1/board_inquiries?id=eq." + row.id,
        {
          method: "PATCH",
          body: JSON.stringify({
            sheet_synced_at: new Date().toISOString(),
            sheet_sync_error: null,
          }),
        },
        true,
      );
      sent++;
    } catch {
      await sb(
        "/rest/v1/board_inquiries?id=eq." + row.id + "&sheet_synced_at=is.null",
        {
          method: "PATCH",
          body: JSON.stringify({
            sheet_sync_error:
              "전송 실패: 웹앱 주소·배포 권한·서명 보안값을 확인한 뒤 재전송해 주세요.",
          }),
        },
        true,
      );
      failed++;
    }
  }
  return { configured: true, sent, failed };
}
