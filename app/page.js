import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import { profile, experience, projects } from "@/data/profile";

export default function HomePage() {
  const current = experience[0];

  return (
    <>
      <section style={{ padding: "72px 0 40px" }}>
        <p className="muted" style={{ margin: 0 }}>
          Hi, I&apos;m
        </p>
        <h1 style={{ fontSize: "clamp(2.5rem, 8vw, 4rem)", margin: "4px 0 8px" }}>
          {profile.name}
        </h1>
        <p style={{ fontSize: "1.25rem", margin: "0 0 16px", fontWeight: 600 }}>
          {profile.title}
          {profile.location && <span className="muted"> · {profile.location}</span>}
        </p>
        <p style={{ maxWidth: "60ch", fontSize: "1.1rem" }}>{profile.pitch}</p>
        <p style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
          <Link className="button" href="/contact">
            Get in touch
          </Link>
          <Link className="button secondary" href="/projects">
            See my work
          </Link>
        </p>
      </section>

      {current && (
        <section className="section">
          <h2>Currently</h2>
          <p>
            {current.role} at <strong>{current.company}</strong>.{" "}
            <Link href="/experience">Full experience →</Link>
          </p>
        </section>
      )}

      <section className="section">
        <h2>Featured projects</h2>
        <div className="grid">
          {projects.slice(0, 3).map((p) => (
            <ProjectCard key={p.name} project={p} />
          ))}
        </div>
      </section>
    </>
  );
}
