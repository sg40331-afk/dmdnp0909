import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";
import { createHmac } from "node:crypto";
import vm from "node:vm";
import ts from "typescript";

const row = {
  id: "11111111-1111-4111-8111-111111111111",
  created_at: new Date().toISOString(),
  consent_at: new Date().toISOString(),
  name: "=IMPORTXML(test)",
  contact: "01052017977",
  product: "간판",
  title: "문의",
  message: "테스트용 문의입니다.",
  size: "",
  quantity: "",
  location: "",
  desired_date: "",
};
const secret = "test-only-signing-value";
const envelope = (data, timestamp = String(Date.now())) => {
  const payload = JSON.stringify(data);
  return {
    timestamp,
    payload,
    signature: createHmac("sha256", secret)
      .update(timestamp + "\n" + payload)
      .digest("hex"),
  };
};
test("Apps Script authentication, deduplication, formula safety and data preservation", () => {
  const rows = [
    [
      "문의ID",
      "접수일시",
      "이름",
      "연락처",
      "제품 종류",
      "제목",
      "문의 내용",
      "크기",
      "수량",
      "설치 장소",
      "희망 일정",
      "개인정보 동의일시",
    ],
  ];
  let locked = false;
  const sheet = {
    getLastRow: () => rows.length,
    getRange: (r, c, n = 1, m = 1) => ({
      getValues: () =>
        rows
          .slice(r - 1, r - 1 + n)
          .map((value) => value.slice(c - 1, c - 1 + m)),
      setNumberFormat() {
        return this;
      },
      setValues(values) {
        for (let i = 0; i < values.length; i++) rows[r - 1 + i] = values[i];
        return this;
      },
    }),
  };
  const context = vm.createContext({
    PropertiesService: {
      getScriptProperties: () => ({
        getProperty: (key) =>
          key === "SHEETS_WEBHOOK_SECRET" ? secret : "sheet-id",
      }),
    },
    ContentService: {
      MimeType: { JSON: "json" },
      createTextOutput: (text) => ({
        text,
        setMimeType() {
          return this;
        },
      }),
    },
    Utilities: {
      Charset: { UTF_8: "utf8" },
      computeHmacSha256Signature: (value, key) => [
        ...createHmac("sha256", key).update(value).digest(),
      ],
    },
    LockService: {
      getScriptLock: () => ({
        waitLock() {
          assert.ok(!locked);
          locked = true;
        },
        hasLock: () => locked,
        releaseLock() {
          locked = false;
        },
      }),
    },
    SpreadsheetApp: {
      openById: () => ({ getSheetByName: () => sheet }),
      flush() {},
    },
  });
  vm.runInContext(
    readFileSync("integrations/google-sheets/Code.gs", "utf8"),
    context,
  );
  const post = (data) =>
    JSON.parse(
      context.doPost({ postData: { contents: JSON.stringify(data) } }).text,
    );
  assert.equal(post({ ...envelope(row), signature: "0".repeat(64) }).ok, false);
  assert.equal(post(envelope(row, String(Date.now() - 360000))).ok, false);
  assert.equal(rows.length, 1);
  assert.equal(post(envelope(row)).ok, true);
  assert.equal(rows.length, 2);
  assert.equal(rows[1][2], "'" + row.name);
  assert.equal(rows[1][3], "01052017977");
  assert.equal(post(envelope(row)).ok, true);
  assert.equal(rows.length, 2);
  assert.equal(locked, false);
});
function helper(fetcher, sb) {
  const exports = {};
  const context = vm.createContext({
    exports,
    process: {
      env: {
        SHEETS_WEBHOOK_URL:
          "https://script.google.com/macros/s/TestEndpoint/exec",
        SHEETS_WEBHOOK_SECRET: secret,
      },
    },
    fetch: fetcher,
    AbortSignal,
    require: (name) =>
      name === "node:crypto"
        ? { createHmac }
        : name === "./board-server"
          ? { sb }
          : {},
  });
  vm.runInContext(
    ts.transpileModule(readFileSync("lib/inquiry-sheet.ts", "utf8"), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
      },
    }).outputText,
    context,
  );
  return { exports, context };
}
test("Server sends approved fields and records successful synchronization", async () => {
  const patches = [];
  const instance = helper(
    async (url, options) => {
      const input = JSON.parse(options.body);
      assert.equal(input.signature, envelope(row, input.timestamp).signature);
      assert.deepEqual(JSON.parse(input.payload), row);
      assert.ok(!input.payload.includes("password"));
      return { ok: true, json: async () => ({ ok: true, id: row.id }) };
    },
    async (path, options = {}) => {
      if (options.method === "PATCH") {
        patches.push(JSON.parse(options.body));
        return null;
      }
      assert.ok(path.includes("sheet_synced_at=is.null"));
      assert.ok(!path.includes("password") && !path.includes("receipt"));
      return [row];
    },
  );
  const result = await instance.exports.syncInquirySheet();
  assert.equal(result.sent, 1);
  assert.equal(result.failed, 0);
  assert.ok(patches[0].sheet_synced_at);
  assert.equal(patches[0].sheet_sync_error, null);
});
test("Failures keep inquiries pending and missing configuration does not send data", async () => {
  const patches = [];
  const instance = helper(
    async () => {
      throw Error("network failure");
    },
    async (path, options = {}) => {
      if (options.method === "PATCH") {
        assert.ok(path.includes("sheet_synced_at=is.null"));
        patches.push(JSON.parse(options.body));
        return null;
      }
      return [row];
    },
  );
  const result = await instance.exports.syncInquirySheet();
  assert.equal(result.failed, 1);
  assert.equal(result.sent, 0);
  assert.equal(patches[0].sheet_synced_at, undefined);
  delete instance.context.process.env.SHEETS_WEBHOOK_URL;
  assert.equal((await instance.exports.syncInquirySheet()).configured, false);
  instance.context.process.env.SHEETS_WEBHOOK_URL =
    "https://untrusted.example/exec";
  assert.equal(instance.exports.sheetConfigured(), false);
});
