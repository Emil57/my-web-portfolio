import Tags from "./Tags";

export default function ProjectCard({ project }) {
  return (
    <article className="card" style={{ display: "flex", flexDirection: "column" }}>
      <h3 style={{ margin: "0 0 8px" }}>{project.name}</h3>
      <p style={{ margin: "0 0 8px" }}>{project.description}</p>
      {project.role && (
        <p className="muted" style={{ margin: 0, fontSize: "0.9rem" }}>
          {project.role}
        </p>
      )}
      <Tags items={project.tech} />
      {project.links?.length > 0 && (
        <p style={{ margin: "auto 0 0", paddingTop: 16, display: "flex", gap: 12 }}>
          {project.links.map((l) => (
            <a key={l.url + l.label} href={l.url} target="_blank" rel="noreferrer">
              {l.label} ↗
            </a>
          ))}
        </p>
      )}
    </article>
  );
}
