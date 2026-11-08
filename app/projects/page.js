import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/profile";

export const metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <>
      <header className="page-header">
        <h1>Projects</h1>
        <p>Things I&apos;ve built, at work and on my own.</p>
      </header>
      <section className="section">
        <div className="grid">
          {projects.map((p) => (
            <ProjectCard key={p.name} project={p} />
          ))}
        </div>
      </section>
    </>
  );
}
