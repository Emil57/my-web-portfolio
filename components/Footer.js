import { profile } from "@/data/profile";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: "24px 16px",
        textAlign: "center",
        fontSize: "0.9rem",
      }}
      className="muted"
    >
      <p style={{ margin: "0 0 8px" }}>
        {profile.socials.map((s, i) => (
          <span key={s.url}>
            {i > 0 && " · "}
            <a href={s.url} target="_blank" rel="noreferrer">
              {s.label}
            </a>
          </span>
        ))}
      </p>
      <p style={{ margin: 0 }}>
        © {new Date().getFullYear()} {profile.name}
      </p>
    </footer>
  );
}
