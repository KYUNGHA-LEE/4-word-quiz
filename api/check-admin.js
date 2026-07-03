const crypto = require("crypto");

function safeEqual(a, b) {
  const left = Buffer.from(String(a || ""));
  const right = Buffer.from(String(b || ""));

  if (left.length !== right.length) {
    return false;
  }

  return crypto.timingSafeEqual(left, right);
}

module.exports = function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    return res.status(405).json({
      ok: false,
      message: "POST 요청만 허용됩니다."
    });
  }

  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return res.status(500).json({
      ok: false,
      message: "Vercel 환경변수 ADMIN_PASSWORD가 설정되어 있지 않습니다."
    });
  }

  let body = req.body || {};

  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch (_) {
      body = {};
    }
  }

  const password = body.password;

  if (typeof password !== "string" || !password.trim()) {
    return res.status(400).json({
      ok: false,
      message: "비밀번호를 입력하세요."
    });
  }

  if (!safeEqual(password.trim(), adminPassword.trim())) {
    return res.status(401).json({
      ok: false,
      message: "비밀번호가 맞지 않습니다."
    });
  }

  return res.status(200).json({ ok: true });
};
