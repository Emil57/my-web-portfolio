import { createApp } from "./app.js";

const port = Number(process.env.PORT) || 4000;

const app = createApp({
  // Comma-separated list of sites allowed to call the API.
  allowedOrigins: (process.env.ALLOWED_ORIGINS || "http://localhost:3000")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),
  dataDir: process.env.DATA_DIR || "./data",
  // Optional Slack or Discord webhook to get pinged for each new message.
  webhookUrl: process.env.NOTIFY_WEBHOOK_URL || "",
  // Set to "true" when running behind a host's proxy (Render, Railway, Fly...).
  trustProxy: process.env.TRUST_PROXY === "true",
});

app.listen(port, () => {
  console.log(`Portfolio API listening on http://localhost:${port}`);
});
