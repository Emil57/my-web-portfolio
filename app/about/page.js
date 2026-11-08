import { about } from "@/data/profile";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <header className="page-header">
        <h1>About me</h1>
      </header>

      <section className="section" style={{ maxWidth: "65ch" }}>
        {about.intro.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </section>

      <section className="section">
        <h2>Outside of work</h2>
        <div className="grid">
          {about.interests.map((i) => (
            <div key={i.title} className="card">
              <h3 style={{ marginTop: 0 }}>{i.title}</h3>
              <p style={{ marginBottom: 0 }}>{i.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>What I value</h2>
        <ul>
          {about.values.map((v) => (
            <li key={v}>{v}</li>
          ))}
        </ul>
      </section>
    </>
  );
}
