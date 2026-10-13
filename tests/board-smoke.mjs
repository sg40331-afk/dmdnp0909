import assert from "node:assert/strict";
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
const base = process.env.BOARD_TEST_URL || "http://localhost:3107";
const out = process.env.BOARD_SCREENSHOT_DIR || "test-results/boards";
await mkdir(out, { recursive: true });
const browser = await chromium.launch({ channel: "msedge", headless: true });
try {
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const size of [
    { width: 1440, height: 1000 },
    { width: 390, height: 844 },
  ]) {
    await page.setViewportSize(size);
    for (const path of [
      "/support",
      "/support/inquiries",
      "/support/resources",
      "/support/notices",
      "/admin",
      "/blog",
      "/blog/sep-29-sign-order-consulting",
      "/portfolio",
      "/faq",
    ]) {
      const response = await page.goto(`${base}${path}`, {
        waitUntil: "networkidle",
      });
      assert.equal(response.status(), 200, path);
      assert.ok(await page.locator("h1").count(), `Heading: ${path}`);
      assert.ok(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 2,
        ),
        `Overflow: ${path}`,
      );
      if (["/support", "/support/inquiries", "/admin"].includes(path))
        await page.screenshot({
          path: `${out}/${size.width}-${path.replaceAll("/", "-")}.png`,
          fullPage: true,
        });
    }
  }
  await page.goto(`${base}/support/inquiries`);
  assert.equal(
    await page
      .getByRole("link", { name: "전화 상담", exact: true })
      .getAttribute("href"),
    "tel:01052017977",
  );
  await page.getByRole("button", { name: "내 문의 확인" }).click();
  assert.ok(await page.getByLabel("접수번호").isVisible());
  const forbidden = await page.request.get(`${base}/api/board`);
  assert.equal(forbidden.status(), 401);
  const originRejected = await page.request.post(`${base}/api/board`, {
    headers: { Origin: "https://example.invalid" },
    data: { action: "save", data: {} },
  });
  assert.equal(originRejected.status(), 400);
  const oldAdmin = await page.request.get(`${base}/admin/blog`);
  assert.ok(oldAdmin.url().endsWith("/admin"));
  assert.deepEqual(errors, []);
  console.log(
    "Desktop/mobile routes, inquiry lookup mode, unauthorized API and CSRF checks passed.",
  );
} finally {
  await browser.close();
}
