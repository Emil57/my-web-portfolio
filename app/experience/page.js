import Timeline from "@/components/Timeline";
import Tags from "@/components/Tags";
import { experience, education, skills, profile } from "@/data/profile";

export const metadata = { title: "Experience" };

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function ExperiencePage() {
  return (
    <>
      <header className="page-header">
        <h1>Experience</h1>
        <p>Where I&apos;ve worked and what I&apos;ve done there.</p>
        {profile.resume && (
          <p style={{ marginTop: 16 }}>
            <a className="button secondary" href={`${basePath}/${profile.resume}`} download>
              Download résumé (PDF)
            </a>
          </p>
        )}
      </header>

      <section className="section">
        <h2>Work</h2>
        <Timeline items={experience} />
      </section>

      <section className="section">
        <h2>Skills</h2>
        <div className="grid">
          {Object.entries(skills).map(([group, items]) => (
            <div key={group} className="card">
              <h3 style={{ margin: 0 }}>{group}</h3>
              <Tags items={items} />
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Education</h2>
        {education.map((e) => (
          <p key={e.school + e.degree}>
            <strong>{e.degree}</strong> — {e.school}{" "}
            <span className="muted">({e.year})</span>
          </p>
        ))}
      </section>
    </>
  );
}
