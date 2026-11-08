"use client";

import { useState } from "react";
import styles from "./ContactForm.module.css";

// Set at build time, e.g. NEXT_PUBLIC_CONTACT_API_URL=https://my-api.example.com
const API_URL = process.env.NEXT_PUBLIC_CONTACT_API_URL;

export default function ContactForm({ email }) {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [error, setError] = useState("");

  if (!API_URL) {
    // No backend configured yet: fall back to a plain email link.
    return (
      <p>
        <a className="button" href={`mailto:${email}`}>
          Email me
        </a>
      </p>
    );
  }

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("sending");
    setError("");
    try {
      const res = await fetch(`${API_URL.replace(/\/$/, "")}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || "Something went wrong.");
      form.reset();
      setStatus("sent");
    } catch (err) {
      setError(err.message || "Couldn't send your message.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="card" role="status">
        <h3 style={{ marginTop: 0 }}>Thanks — message sent!</h3>
        <p className="muted" style={{ marginBottom: 0 }}>
          I&apos;ll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form className={`card ${styles.form}`} onSubmit={onSubmit}>
      <label>
        Name
        <input name="name" required maxLength={100} autoComplete="name" />
      </label>
      <label>
        Email
        <input name="email" type="email" required maxLength={200} autoComplete="email" />
      </label>
      <label>
        Message
        <textarea name="message" required minLength={10} maxLength={5000} rows={6} />
      </label>
      {/* Hidden from people; bots tend to fill it in. */}
      <input
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className={styles.honeypot}
        aria-hidden="true"
      />
      {status === "error" && (
        <p className={styles.error} role="alert">
          {error} You can also email me at <a href={`mailto:${email}`}>{email}</a>.
        </p>
      )}
      <button className="button" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
