const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LIMITS = {
  name: { min: 1, max: 100 },
  email: { min: 3, max: 200 },
  message: { min: 10, max: 5000 },
};

// Returns { ok: true, value } with trimmed fields, or { ok: false, error }.
export function validateContact(body) {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request body." };
  }

  const value = {};
  for (const [field, { min, max }] of Object.entries(LIMITS)) {
    const raw = body[field];
    if (typeof raw !== "string") {
      return { ok: false, error: `Please fill in your ${field}.` };
    }
    const v = raw.trim();
    if (v.length < min) {
      return {
        ok: false,
        error:
          field === "message"
            ? `Message must be at least ${min} characters.`
            : `Please fill in your ${field}.`,
      };
    }
    if (v.length > max) {
      return { ok: false, error: `Your ${field} is too long (max ${max} characters).` };
    }
    value[field] = v;
  }

  if (!EMAIL_RE.test(value.email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  return { ok: true, value };
}

// The form has a hidden "website" field. People never fill it in; bots often do.
export function isLikelySpam(body) {
  return typeof body?.website === "string" && body.website.trim() !== "";
}
