const INQUIRY_HEADERS = ["문의ID", "접수일시", "이름", "연락처", "제품 종류", "제목", "문의 내용", "크기", "수량", "설치 장소", "희망 일정", "개인정보 동의일시"];

function doPost(e) {
  const json = (value) => ContentService.createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
  let lock;
  try {
    const config = PropertiesService.getScriptProperties();
    const secret = config.getProperty("SHEETS_WEBHOOK_SECRET");
    const spreadsheetId = config.getProperty("SPREADSHEET_ID") || "1CIFb2Voz9fcgndS3kjO-bq9P-XuZYkzWnoxMnL5iQsQ";
    if (!secret || !spreadsheetId) return json({ ok: false, error: "Configuration missing" });
    const request = JSON.parse(e.postData.contents);
    if (typeof request.payload !== "string" || request.payload.length > 30000 ||
      !/^\d{13}$/.test(String(request.timestamp)) ||
      Math.abs(Date.now() - Number(request.timestamp)) > 300000 ||
      !/^[a-f0-9]{64}$/.test(request.signature || ""))
      return json({ ok: false, error: "Invalid request" });
    const expected = Utilities.computeHmacSha256Signature(
      request.timestamp + "\n" + request.payload, secret, Utilities.Charset.UTF_8)
      .map((byte) => ("0" + ((byte + 256) % 256).toString(16)).slice(-2)).join("");
    let difference = 0;
    for (let i = 0; i < expected.length; i++)
      difference |= expected.charCodeAt(i) ^ request.signature.charCodeAt(i);
    if (difference) return json({ ok: false, error: "Unauthorized" });
    const inquiry = JSON.parse(request.payload);
    if (!/^[a-f0-9-]{36}$/.test(inquiry.id || "") ||
      !inquiry.name || !inquiry.contact || !inquiry.message ||
      !Number.isFinite(Date.parse(inquiry.created_at)) ||
      !Number.isFinite(Date.parse(inquiry.consent_at)))
      return json({ ok: false, error: "Invalid inquiry" });
    lock = LockService.getScriptLock();
    lock.waitLock(10000);
    const sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName("문의접수");
    if (!sheet) return json({ ok: false, error: "Inquiry sheet missing" });
    const headers = sheet.getRange(1, 1, 1, INQUIRY_HEADERS.length).getValues()[0];
    if (headers.some((value, index) => value !== INQUIRY_HEADERS[index]))
      return json({ ok: false, error: "Header mismatch" });
    const lastRow = sheet.getLastRow();
    // Stable IDs make network retries and concurrent deliveries idempotent.
    if (lastRow > 1 && sheet.getRange(2, 1, lastRow - 1, 1)
      .getValues().some((row) => row[0] === inquiry.id))
      return json({ ok: true, id: inquiry.id });
    const text = (value) => {
      const raw = String(value || "");
      return /^[\s\u0000-\u001f]*[=+\-@]/.test(raw) ? "'" + raw : raw;
    };
    const values = [inquiry.id, new Date(inquiry.created_at), text(inquiry.name),
      text(inquiry.contact), text(inquiry.product), text(inquiry.title),
      text(inquiry.message), text(inquiry.size), text(inquiry.quantity),
      text(inquiry.location), text(inquiry.desired_date), new Date(inquiry.consent_at)];
    sheet.getRange(lastRow + 1, 1, 1, values.length).setNumberFormat("@").setValues([values]);
    sheet.getRange(lastRow + 1, 2).setNumberFormat("yyyy-mm-dd hh:mm:ss");
    sheet.getRange(lastRow + 1, 12).setNumberFormat("yyyy-mm-dd hh:mm:ss");
    SpreadsheetApp.flush();
    return json({ ok: true, id: inquiry.id });
  } catch {
    return json({ ok: false, error: "Sheet write failed" });
  } finally {
    if (lock && lock.hasLock()) lock.releaseLock();
  }
}
