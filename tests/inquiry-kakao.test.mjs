import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import vm from "node:vm";
import ts from "typescript";

const secret = "test-only-memo-secret";
const url = "https://script.google.com/macros/s/TestKakaoMemo/exec";
const app = readFileSync("integrations/kakao-memo/Code.gs", "utf8");
const source = ts.transpileModule(readFileSync("lib/inquiry-kakao.ts", "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;

function server(env, fetch) {
  const exports = {};
  vm.runInNewContext(source, { exports, process: { env }, fetch, AbortSignal, require: () => ({ createHmac }) });
  return exports;
}

function mockScript() {
  const values = new Map([
    ["KAKAO_MEMO_WEBHOOK_SECRET", secret],
    ["KAKAO_REST_API_KEY", "test-client"],
    ["KAKAO_REDIRECT_URI", url],
  ]);
  const calls = [];
  const props = {
    getProperty: (key) => values.get(key),
    setProperty: (key, value) => values.set(key, value),
    deleteProperty: (key) => values.delete(key),
  };
  let held = false;
  const logs = [];
  const context = vm.createContext({
    console: { log: (value) => logs.push(value) },
    ContentService: { MimeType: {}, createTextOutput: (body) => ({ body, setMimeType() { return this; } }) },
    PropertiesService: { getScriptProperties: () => props },
    Utilities: {
      Charset: {},
      getUuid: () => "test-uuid",
      computeHmacSha256Signature: (value, key) => [...createHmac("sha256", key).update(value).digest()],
    },
    LockService: { getScriptLock: () => ({
      waitLock() { assert.equal(held, false); held = true; },
      hasLock: () => held,
      releaseLock() { held = false; },
    }) },
    UrlFetchApp: { fetch: (url, options) => {
      calls.push({ url, options });
      const body = url.includes("/oauth/token")
        ? { access_token: "test-access", refresh_token: "test-refresh", expires_in: 21600 }
        : { result_code: 0 };
      return { getResponseCode: () => 200, getContentText: () => JSON.stringify(body) };
    } },
  });
  vm.runInContext(app, context);
  return { values, calls, context, logs };
}

test("unconfigured delivery skips the network and HTTP errors are generic", async () => {
  await server({}, () => assert.fail("must not call fetch")).sendInquiryKakao("간판");
  await assert.rejects(
    server({ KAKAO_MEMO_WEBHOOK_URL: url, KAKAO_MEMO_WEBHOOK_SECRET: secret }, async () => ({ ok: false }))
      .sendInquiryKakao("간판"),
    /Kakao memo delivery failed/,
  );
});

test("signed delivery sends only the selected product and a fixed admin link", async () => {
  const { values, calls, context } = mockScript();
  values.set("KAKAO_TOKENS", JSON.stringify({ access: "test-access", refresh: "test-refresh", expires: Date.now() + 120000 }));
  const send = server({ KAKAO_MEMO_WEBHOOK_URL: url, KAKAO_MEMO_WEBHOOK_SECRET: secret }, async (dest, options) => {
    assert.equal(dest, url);
    assert.deepEqual(JSON.parse(JSON.parse(options.body).payload), { product: "간판" });
    assert.equal(JSON.parse(context.doPost({ postData: { contents: options.body.replace("간판", "기타") } }).body).ok, false);
    assert.equal(calls.length, 0);
    const result = JSON.parse(context.doPost({ postData: { contents: options.body } }).body);
    return { ok: true, json: async () => result };
  });
  await send.sendInquiryKakao("간판");
  assert.equal(calls.length, 1);
  const template = JSON.parse(calls[0].options.payload.template_object);
  assert.match(template.text, /제품: 간판/);
  assert.equal(template.link.web_url, "https://dmdnp.com/admin");
});

test("owner consent rejects a wrong state and cannot be replayed", () => {
  const { context, values, calls, logs } = mockScript();
  context.createKakaoConsentLink();
  const state = new URL(logs[0].split("minutes: ")[1]).searchParams.get("state");
  const result = (state) => JSON.parse(context.doGet({ parameter: { code: "test-code", state } }).body);
  assert.equal(result("wrong").ok, false);
  assert.equal(result(state).ok, true);
  assert.equal(result(state).ok, false);
  assert.equal(calls.length, 1);
  assert.equal(JSON.parse(values.get("KAKAO_TOKENS")).refresh, "test-refresh");
  values.set("KAKAO_TOKENS", JSON.stringify({ access: "expired", refresh: "previous", expires: Date.now() - 1 }));
  context.maintainKakaoConnection();
  assert.equal(calls[1].options.payload.grant_type, "refresh_token");
  assert.equal(JSON.parse(values.get("KAKAO_TOKENS")).refresh, "test-refresh");
});
