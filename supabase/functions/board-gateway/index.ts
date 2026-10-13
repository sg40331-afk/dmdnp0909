import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const encoder = new TextEncoder();
let cached: { key: CryptoKey; until: number } | undefined;
const url = Deno.env.get("SUPABASE_URL")!;
const service = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const serviceHeaders = { apikey: service, Authorization: `Bearer ${service}` };
const fail = (status: number) =>
  new Response(JSON.stringify({ error: "Request denied" }), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
async function signingKey() {
  if (cached && cached.until > Date.now()) return cached.key;
  const response = await fetch(
    `${url}/rest/v1/board_gateway_secrets?name=eq.gateway&select=value`,
    { headers: serviceHeaders },
  );
  if (!response.ok) throw new Error("Configuration unavailable");
  const rows = await response.json();
  if (!rows[0]?.value) throw new Error("Configuration unavailable");
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(rows[0].value),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"],
  );
  cached = { key, until: Date.now() + 60000 };
  return key;
}
Deno.serve(async (request: Request) => {
  try {
    if (request.method !== "POST") return fail(405);
    const timestamp = request.headers.get("x-board-timestamp") || "";
    const signature = request.headers.get("x-board-signature") || "";
    if (
      !/^\d{13}$/.test(timestamp) ||
      Math.abs(Date.now() - Number(timestamp)) > 60000 ||
      !/^[a-f0-9]{64}$/.test(signature)
    )
      return fail(401);
    const raw = await request.text();
    if (encoder.encode(raw).length > 6500000) return fail(413);
    const bytes = Uint8Array.from(signature.match(/../g)!, (byte) =>
      parseInt(byte, 16),
    );
    if (
      !(await crypto.subtle.verify(
        "HMAC",
        await signingKey(),
        bytes,
        encoder.encode(timestamp + "\n" + raw),
      ))
    )
      return fail(401);
    const data = JSON.parse(raw);
    if (
      typeof data.path !== "string" ||
      !data.path.startsWith("/") ||
      data.path.includes("..")
    )
      return fail(400);
    const destination = new URL(data.path, url);
    if (destination.origin !== new URL(url).origin) return fail(400);
    const allowed =
      /^\/rest\/v1\/(board_inquiries|board_files)$/.test(
        destination.pathname,
      ) ||
      destination.pathname === "/rest/v1/rpc/board_rate_limit" ||
      /^\/storage\/v1\/object\/(sign\/)?board-assets(\/|$)/.test(
        destination.pathname,
      );
    // BOOTSTRAP_ALLOWLIST
    if (!allowed || !["GET", "POST", "PATCH", "DELETE"].includes(data.method))
      return fail(403);
    const headers = new Headers(serviceHeaders);
    headers.set("Content-Type", data.contentType || "application/json");
    if (data.prefer) headers.set("Prefer", data.prefer);
    let body = data.body;
    if (data.binary)
      body = Uint8Array.from(atob(data.body), (char) => char.charCodeAt(0));
    const response = await fetch(destination, {
      method: data.method,
      headers,
      body: ["GET", "HEAD"].includes(data.method) ? undefined : body,
      redirect: "error",
    });
    return new Response(
      [204, 205, 304].includes(response.status)
        ? null
        : await response.arrayBuffer(),
      {
        status: response.status,
        headers: {
          "Content-Type":
            response.headers.get("Content-Type") || "application/json",
          "Cache-Control": "no-store",
        },
      },
    );
  } catch {
    return fail(500);
  }
});
