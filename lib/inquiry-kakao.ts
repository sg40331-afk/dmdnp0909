import "server-only";
import { createHmac } from "node:crypto";

export async function sendInquiryKakao(product: string) {
  const url = process.env.KAKAO_MEMO_WEBHOOK_URL;
  const secret = process.env.KAKAO_MEMO_WEBHOOK_SECRET;
  if (!url || !secret) return;
  if (!/^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(url))
    throw new Error("Invalid Kakao memo configuration");

  const payload = JSON.stringify({ product });
  const timestamp = String(Date.now());
  const signature = createHmac("sha256", secret)
    .update(timestamp + "\n" + payload)
    .digest("hex");
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ payload, timestamp, signature }),
    signal: AbortSignal.timeout(15000),
    cache: "no-store",
  });
  if (!response.ok || (await response.json()).ok !== true)
    throw new Error("Kakao memo delivery failed");
}
