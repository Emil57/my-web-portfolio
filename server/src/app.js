import http from "node:http";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { validateContact, isLikelySpam } from "./validate.js";

const MAX_BODY_BYTES = 16 * 1024;

// Builds the HTTP server. Options come from environment variables in index.js,
// and can be passed directly in tests.
export function createApp({
  allowedOrigins = [],
  dataDir = "./data",
  webhookUrl = "",
  trustProxy = false,
  rateLimit = { max: 5, windowMs: 15 * 60 * 1000 },
  now = () => Date.now(),
  fetchImpl = globalThis.fetch,
  log = console,
} = {}) {
  const hits = new Map(); // ip -> timestamps of recent submissions

  function isRateLimited(ip) {
    const cutoff = now() - rateLimit.windowMs;
    const recent = (hits.get(ip) || []).filter((t) => t > cutoff);
    if (recent.length >= rateLimit.max) {
      hits.set(ip, recent);
      return true;
    }
    recent.push(now());
    hits.set(ip, recent);
    return false;
  }

  function corsHeaders(req) {
    const origin = req.headers.origin;
    if (!origin) return {};
    if (allowedOrigins.includes("*") || allowedOrigins.includes(origin)) {
      return {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Max-Age": "86400",
        Vary: "Origin",
      };
    }
    return {};
  }

  function send(res, status, body, extraHeaders = {}) {
    res.writeHead(status, { "Content-Type": "application/json", ...extraHeaders });
    res.end(JSON.stringify(body));
  }

  async function readJson(req) {
    let size = 0;
    const chunks = [];
    for await (const chunk of req) {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) throw Object.assign(new Error("too large"), { status: 413 });
      chunks.push(chunk);
    }
    try {
      return JSON.parse(Buffer.concat(chunks).toString("utf8"));
    } catch {
      throw Object.assign(new Error("bad json"), { status: 400 });
    }
  }

  async function saveMessage(msg) {
    await mkdir(dataDir, { recursive: true });
    await appendFile(path.join(dataDir, "messages.jsonl"), JSON.stringify(msg) + "\n");
  }

  async function notify(msg) {
    if (!webhookUrl) return;
    // Works with Slack and Discord incoming webhooks (they read "text" / "content").
    const text = `New portfolio message from ${msg.name} <${msg.email}>:\n\n${msg.message}`;
    const res = await fetchImpl(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, content: text.slice(0, 2000) }),
    });
    if (!res.ok) throw new Error(`webhook responded ${res.status}`);
  }

  async function handleContact(req, res, cors) {
    // Only trust X-Forwarded-For behind a hosting proxy; otherwise anyone could fake it.
    const forwarded = trustProxy ? req.headers["x-forwarded-for"]?.split(",")[0].trim() : "";
    const ip = forwarded || req.socket.remoteAddress || "unknown";

    let body;
    try {
      body = await readJson(req);
    } catch (err) {
      const msg = err.status === 413 ? "Message is too large." : "Invalid request body.";
      return send(res, err.status || 400, { error: msg }, cors);
    }

    // Pretend success so bots don't learn they were caught.
    if (isLikelySpam(body)) return send(res, 200, { ok: true }, cors);

    const result = validateContact(body);
    if (!result.ok) return send(res, 400, { error: result.error }, cors);

    if (isRateLimited(ip)) {
      return send(res, 429, { error: "Too many messages. Please try again later." }, cors);
    }

    const msg = { ...result.value, receivedAt: new Date(now()).toISOString() };
    try {
      await saveMessage(msg);
    } catch (err) {
      log.error("Failed to save message:", err);
      return send(res, 500, { error: "Couldn't save your message. Please email me instead." }, cors);
    }

    // The message is already saved, so a failed notification isn't the sender's problem.
    notify(msg).catch((err) => log.error("Failed to send notification:", err.message));

    return send(res, 201, { ok: true }, cors);
  }

  return http.createServer(async (req, res) => {
    const cors = corsHeaders(req);
    const { pathname } = new URL(req.url, "http://localhost");

    try {
      if (req.method === "OPTIONS") {
        res.writeHead(204, cors);
        return res.end();
      }
      if (pathname === "/api/health" && req.method === "GET") {
        return send(res, 200, { ok: true }, cors);
      }
      if (pathname === "/api/contact") {
        if (req.method !== "POST") {
          return send(res, 405, { error: "Method not allowed." }, { ...cors, Allow: "POST" });
        }
        return await handleContact(req, res, cors);
      }
      return send(res, 404, { error: "Not found." }, cors);
    } catch (err) {
      log.error(err);
      if (!res.headersSent) send(res, 500, { error: "Server error." }, cors);
    }
  });
}
