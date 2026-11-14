const TOKEN_URL = "https://kauth.kakao.com/oauth/token";
const ADMIN_URL = "https://dmdnp.com/admin";
const PRODUCTS = ["간판", "LED전광판", "UV인쇄", "현수막", "시트지", "기타"];

function json_(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function same_(a, b) {
  if (typeof b !== "string" || a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return mismatch === 0;
}

// Run only from the private Apps Script editor, as the owner.
function createKakaoConsentLink() {
  const config = PropertiesService.getScriptProperties();
  const redirect = config.getProperty("KAKAO_REDIRECT_URI");
  const client = config.getProperty("KAKAO_REST_API_KEY");
  if (!client || !/^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(redirect || ""))
    throw new Error("Set the Kakao REST API key and deployed redirect URI first.");
  const state = Utilities.getUuid() + Utilities.getUuid();
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    config.setProperty("KAKAO_PENDING_STATE", JSON.stringify({ state, expires: Date.now() + 600000 }));
  } finally {
    lock.releaseLock();
  }
  console.log("Open privately within 10 minutes: https://kauth.kakao.com/oauth/authorize?" +
    "response_type=code&scope=talk_message&prompt=login&client_id=" + encodeURIComponent(client) +
    "&redirect_uri=" + encodeURIComponent(redirect) + "&state=" + encodeURIComponent(state));
}

function exchange_(config, payload) {
  const client = config.getProperty("KAKAO_REST_API_KEY");
  if (!client) throw new Error("Kakao app not configured");
  payload.client_id = client;
  const secret = config.getProperty("KAKAO_CLIENT_SECRET");
  if (secret) payload.client_secret = secret;
  const response = UrlFetchApp.fetch(TOKEN_URL, {
    method: "post", payload, muteHttpExceptions: true, followRedirects: false,
  });
  if (response.getResponseCode() !== 200) throw new Error("Kakao authorization failed");
  const result = JSON.parse(response.getContentText());
  if (!result.access_token || !Number.isFinite(result.expires_in)) throw new Error("Invalid Kakao token response");
  config.setProperty("KAKAO_TOKENS", JSON.stringify({
    access: result.access_token,
    expires: Date.now() + result.expires_in * 1000,
    refresh: result.refresh_token || payload.refresh_token,
  }));
  return result.access_token;
}

function doGet(e) {
  const config = PropertiesService.getScriptProperties();
  const lock = LockService.getScriptLock();
  try {
    const code = e.parameter.code;
    if (typeof code !== "string" || !code || code.length > 2048) return json_({ ok: false });
    lock.waitLock(10000);
    const pending = JSON.parse(config.getProperty("KAKAO_PENDING_STATE") || "null");
    if (!pending || pending.expires < Date.now() || !same_(pending.state, e.parameter.state))
      return json_({ ok: false });
    config.deleteProperty("KAKAO_PENDING_STATE");
    exchange_(config, {
      grant_type: "authorization_code",
      code,
      redirect_uri: config.getProperty("KAKAO_REDIRECT_URI"),
    });
    return json_({ ok: true, message: "카카오 계정 연결 완료. 이 창을 닫아도 됩니다." });
  } catch {
    return json_({ ok: false, message: "카카오 계정 연결 실패. 설정을 확인하고 연결 링크를 다시 생성하세요." });
  } finally {
    if (lock.hasLock()) lock.releaseLock();
  }
}

function accessToken_(config) {
  const tokens = JSON.parse(config.getProperty("KAKAO_TOKENS") || "null");
  if (!tokens || !tokens.refresh) throw new Error("Kakao account not connected");
  if (tokens.access && tokens.expires > Date.now() + 60000) return tokens.access;
  return exchange_(config, { grant_type: "refresh_token", refresh_token: tokens.refresh });
}

// Set a weekly time-driven trigger so quiet periods do not stop token renewal.
function maintainKakaoConnection() {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    accessToken_(PropertiesService.getScriptProperties());
  } finally {
    lock.releaseLock();
  }
}

function sendMemo_(product) {
  const config = PropertiesService.getScriptProperties();
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  let token;
  try {
    token = accessToken_(config);
  } finally {
    lock.releaseLock();
  }
  const template = {
    object_type: "text",
    text: product ? "[대명DnP] 새 제작 문의가 접수되었습니다.\n제품: " + product : "[대명DnP] 카카오 연결 테스트입니다.",
    link: { web_url: ADMIN_URL, mobile_web_url: ADMIN_URL },
    button_title: "관리자에서 확인",
  };
  const response = UrlFetchApp.fetch("https://kapi.kakao.com/v2/api/talk/memo/default/send", {
    method: "post",
    headers: { Authorization: "Bearer " + token },
    payload: { template_object: JSON.stringify(template) },
    muteHttpExceptions: true,
    followRedirects: false,
  });
  if (response.getResponseCode() !== 200 || JSON.parse(response.getContentText()).result_code !== 0)
    throw new Error("Kakao message failed");
}

function sendKakaoTestMemo() {
  sendMemo_(null);
}

function doPost(e) {
  try {
    const secret = PropertiesService.getScriptProperties().getProperty("KAKAO_MEMO_WEBHOOK_SECRET");
    if (!secret || e.postData.contents.length > 2048) return json_({ ok: false });
    const { payload, timestamp, signature } = JSON.parse(e.postData.contents);
    if (typeof payload !== "string" || !/^\d{13}$/.test(String(timestamp)) ||
      Math.abs(Date.now() - Number(timestamp)) > 300000) return json_({ ok: false });
    const expected = Utilities.computeHmacSha256Signature(timestamp + "\n" + payload, secret, Utilities.Charset.UTF_8)
      .map((byte) => ("0" + ((byte + 256) % 256).toString(16)).slice(-2)).join("");
    if (!same_(expected, signature)) return json_({ ok: false });
    const { product } = JSON.parse(payload);
    if (!PRODUCTS.includes(product)) return json_({ ok: false });
    sendMemo_(product);
    return json_({ ok: true });
  } catch {
    return json_({ ok: false });
  }
}
