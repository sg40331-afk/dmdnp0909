import assert from "node:assert/strict";
import fs from "node:fs";
const base = process.env.TEST_BASE || "http://localhost:3107";
const credentials = Object.fromEntries(
  fs
    .readFileSync(
      process.env.ADMIN_CREDENTIALS || ".env.admin-login.local",
      "utf8",
    )
    .trim()
    .split(/\r?\n/)
    .map((line) => [
      line.slice(0, line.indexOf("=")),
      line.slice(line.indexOf("=") + 1),
    ]),
);
let cookie = "";
const entries = [],
  inquiries = [];
async function req(path, options = {}, admin = false) {
  const response = await fetch(base + path, {
    ...options,
    redirect: "manual",
    headers: {
      Origin: base,
      ...options.headers,
      ...(admin ? { Cookie: cookie } : {}),
    },
  });
  const raw = await response.text();
  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    data = raw;
  }
  return { response, data, raw };
}
const post = (action, data, admin = false) =>
  req(
    "/api/board",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, data }),
    },
    admin,
  );
const ok = ({ response, data }) => {
  assert.equal(response.status, 200, JSON.stringify(data));
  return data;
};
async function upload(fields, invalid = false, admin = false) {
  const form = new FormData();
  for (const [k, v] of Object.entries(fields)) form.set(k, v);
  form.set(
    "file",
    new Blob(
      [invalid ? "invalid" : "%PDF-1.4\n1 0 obj<</Type/Catalog>>endobj\n%%EOF"],
      { type: "application/pdf" },
    ),
    "test-verification.pdf",
  );
  return req("/api/board/files", { method: "POST", body: form }, admin);
}
try {
  assert.equal((await req("/api/board")).response.status, 401);
  const login = await req("/api/board/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: credentials.ADMIN_EMAIL,
      password: credentials.ADMIN_PASSWORD,
    }),
  });
  ok(login);
  cookie = login.response.headers
    .getSetCookie()
    .map((value) => value.split(";")[0])
    .join("; ");
  assert.ok(cookie.includes("dnp_access="));
  assert.ok(
    login.response.headers
      .getSetCookie()
      .every((value) => /HttpOnly/i.test(value)),
  );
  console.log("PASS approved administrator login");
  const pass = "Dnp-test-pass-2026!";
  const receipt = ok(
    await post("inquiry", {
      name: "검증용 삭제 예정",
      contact: "010-0000-0000",
      product: "간판",
      title: "[검증] 운영 테스트",
      message: "운영 검증 후 바로 삭제하는 테스트 문의입니다.",
      password: pass,
      consent: true,
    }),
  ).receipt;
  const inquiry = ok(await post("lookup", { receipt, password: pass }));
  inquiries.push(inquiry.id);
  assert.equal(inquiry.status, "received");
  assert.equal(inquiry.password_hash, undefined);
  assert.notEqual(
    (await post("lookup", { receipt, password: "wrong-password" })).response
      .status,
    200,
  );
  assert.notEqual(
    (await post("lookup", { receipt: "a".repeat(32), password: pass })).response
      .status,
    200,
  );
  assert.notEqual(
    (await upload({ receipt, password: pass }, true)).response.status,
    200,
  );
  assert.notEqual(
    (await upload({ receipt, password: "wrong-password" })).response.status,
    200,
  );
  const attachment = ok(await upload({ receipt, password: pass }));
  assert.ok(
    [401, 403].includes(
      (await req("/api/board/files?id=" + attachment.id)).response.status,
    ),
  );
  const withFile = ok(await post("lookup", { receipt, password: pass }));
  assert.equal(withFile.files.length, 1);
  assert.equal((await fetch(withFile.files[0].url)).status, 200);
  ok(
    await post(
      "answer",
      {
        id: inquiry.id,
        status: "answered",
        answer: "검증용 관리자 답변입니다.",
      },
      true,
    ),
  );
  const answered = ok(await post("lookup", { receipt, password: pass }));
  assert.equal(answered.status, "answered");
  assert.equal(answered.answer, "검증용 관리자 답변입니다.");
  console.log(
    "PASS inquiry create, private attachment, owner lookup, admin reply and unauthorized denial",
  );
  for (const kind of ["blog", "portfolio", "resources", "faq", "notices"]) {
    const slug = "test-verification-" + kind + "-" + Date.now();
    let entry = ok(
      await post(
        "save",
        {
          kind,
          slug,
          title: "[검증] 삭제 예정 " + kind,
          category: kind === "resources" ? "주문서" : "검증",
          summary: "검증 후 삭제됩니다.",
          body: ["운영 통합 검증 자료입니다."],
          published: false,
          pinned: false,
          sort_order: 0,
          published_at: new Date().toISOString(),
          payload: {},
        },
        true,
      ),
    );
    entries.push(entry.id);
    const path =
      kind === "blog"
        ? "/blog"
        : kind === "portfolio"
          ? "/portfolio"
          : kind === "faq"
            ? "/faq"
            : "/support/" + kind;
    if (kind !== "faq")
      assert.equal((await req(path + "/" + slug)).response.status, 404);
    else assert.ok(!(await req(path)).raw.includes(slug));
    const file = ok(await upload({ entryId: entry.id }, false, true));
    assert.ok(
      [401, 403].includes(
        (await req("/api/board/files?id=" + file.id)).response.status,
      ),
    );
    entry = ok(await post("save", { ...entry, published: true }, true));
    const page = await req(kind === "faq" ? path : path + "/" + slug);
    assert.equal(page.response.status, 200);
    assert.ok(page.raw.includes(entry.title));
    assert.equal(
      (await req("/api/board/files?id=" + file.id)).response.status,
      307,
    );
    entry = ok(
      await post("save", { ...entry, title: "[검증] 수정 완료 " + kind }, true),
    );
    assert.ok(
      (await req(kind === "faq" ? path : path + "/" + slug)).raw.includes(
        entry.title,
      ),
    );
    ok(
      await req(
        "/api/board/files",
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: file.id }),
        },
        true,
      ),
    );
    ok(await post("delete", { id: entry.id }, true));
    entries.splice(entries.indexOf(entry.id), 1);
    console.log(
      "PASS " +
        kind +
        " draft, upload, publish, edit, file delete and post delete",
    );
  }
  const gateway = await fetch(
    "https://flxbijcrzhwpxihnuwfb.supabase.co/functions/v1/board-gateway",
    { method: "POST", body: "{}" },
  );
  assert.equal(gateway.status, 401);
  console.log("PASS unsigned gateway denied");
} finally {
  for (const id of entries) ok(await post("delete", { id }, true));
  for (const id of inquiries) ok(await post("delete_inquiry", { id }, true));
  if (cookie)
    ok(
      await req(
        "/api/board/auth",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "logout" }),
        },
        true,
      ),
    );
  console.log("Test records and attachments cleaned");
}
