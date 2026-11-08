import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { createApp } from "../src/app.js";

let server, base, dataDir, webhookCalls;

const valid = { name: "Ada", email: "ada@example.com", message: "Hello, I'd like to chat about a role." };

before(async () => {
  dataDir = await mkdtemp(path.join(os.tmpdir(), "portfolio-api-"));
  webhookCalls = [];
  server = createApp({
    allowedOrigins: ["https://site.example"],
    dataDir,
    webhookUrl: "https://hooks.example/abc",
    rateLimit: { max: 2, windowMs: 60_000 },
    fetchImpl: async (url, opts) => {
      webhookCalls.push({ url, body: JSON.parse(opts.body) });
      return { ok: true, status: 200 };
    },
    log: { error() {} },
  });
  await new Promise((r) => server.listen(0, r));
  base = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((r) => server.close(r));
  await rm(dataDir, { recursive: true, force: true });
});

const post = (body, headers = {}) =>
  fetch(`${base}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });

test("health check", async () => {
  const res = await fetch(`${base}/api/health`);
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { ok: true });
});

test("CORS preflight allows the configured origin only", async () => {
  const ok = await fetch(`${base}/api/contact`, {
    method: "OPTIONS",
    headers: { Origin: "https://site.example" },
  });
  assert.equal(ok.status, 204);
  assert.equal(ok.headers.get("access-control-allow-origin"), "https://site.example");

  const other = await fetch(`${base}/api/contact`, {
    method: "OPTIONS",
    headers: { Origin: "https://evil.example" },
  });
  assert.equal(other.headers.get("access-control-allow-origin"), null);
});

test("rejects invalid input", async () => {
  assert.equal((await post("not json")).status, 400);
  const res = await post({ ...valid, email: "nope" });
  assert.equal(res.status, 400);
  assert.match((await res.json()).error, /valid email/);
  assert.equal((await post({ ...valid, message: "short" })).status, 400);
});

test("rejects oversized bodies", async () => {
  const res = await post({ ...valid, message: "x".repeat(20_000) });
  assert.equal(res.status, 413);
});

test("quietly drops honeypot submissions", async () => {
  const res = await post({ ...valid, website: "spam.example" });
  assert.equal(res.status, 200);
  await assert.rejects(readFile(path.join(dataDir, "messages.jsonl"), "utf8"));
});

test("saves a valid message, notifies, then rate limits", async () => {
  const res = await post(valid, { Origin: "https://site.example" });
  assert.equal(res.status, 201);
  assert.equal(res.headers.get("access-control-allow-origin"), "https://site.example");

  const saved = (await readFile(path.join(dataDir, "messages.jsonl"), "utf8")).trim().split("\n");
  assert.equal(saved.length, 1);
  assert.equal(JSON.parse(saved[0]).email, "ada@example.com");

  await new Promise((r) => setImmediate(r));
  assert.equal(webhookCalls.length, 1);
  assert.match(webhookCalls[0].body.text, /Ada/);

  assert.equal((await post(valid)).status, 201);
  assert.equal((await post(valid)).status, 429);
});

test("unknown routes and wrong methods", async () => {
  assert.equal((await fetch(`${base}/nope`)).status, 404);
  assert.equal((await fetch(`${base}/api/contact`)).status, 405);
});
