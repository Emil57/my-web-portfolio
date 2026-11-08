// All the site's content lives here. Edit this file to update the portfolio;
// you shouldn't need to touch the page code.

export const profile = {
  name: "Your Name",
  title: "Software Engineer",
  location: "City, Country",
  pitch:
    "I build reliable, user-friendly web applications and enjoy turning messy problems into simple products.",
  email: "you@example.com",
  // Put your résumé PDF in /public and set its file name here, e.g. "resume.pdf".
  resume: null,
  socials: [
    { label: "GitHub", url: "https://github.com/emil57" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/your-handle" },
  ],
};

export const about = {
  intro: [
    "Write two or three sentences about who you are, what drives you and the kind of work you love.",
    "Add a second paragraph about your path: how you got into this field and what you're looking for next.",
  ],
  interests: [
    { title: "Hobby one", text: "A sentence about something you enjoy outside work." },
    { title: "Hobby two", text: "Sports, music, travel, volunteering, side projects..." },
    { title: "Learning", text: "What you're currently learning or curious about." },
  ],
  values: ["Clear communication", "Ownership", "Continuous learning"],
};

export const experience = [
  {
    company: "Company A",
    role: "Senior Software Engineer",
    start: "2023",
    end: "Present",
    location: "Remote",
    highlights: [
      "Led the redesign of X, cutting page load time by 40%.",
      "Mentored 3 junior engineers and introduced code review guidelines.",
      "Shipped Y feature used by 10k+ customers.",
    ],
    tech: ["React", "Next.js", "Node.js"],
  },
  {
    company: "Company B",
    role: "Software Engineer",
    start: "2020",
    end: "2023",
    location: "City, Country",
    highlights: [
      "Built internal tools that saved the team ~5 hours per week.",
      "Set up CI/CD pipelines with GitHub Actions.",
    ],
    tech: ["JavaScript", "PostgreSQL", "AWS"],
  },
];

export const education = [
  { school: "University Name", degree: "B.Sc. Computer Science", year: "2020" },
];

export const skills = {
  Languages: ["JavaScript", "TypeScript", "Python", "SQL"],
  Frontend: ["React", "Next.js", "HTML", "CSS"],
  Backend: ["Node.js", "REST APIs", "PostgreSQL"],
  Tools: ["Git", "GitHub Actions", "Docker"],
};

export const projects = [
  {
    name: "Project One",
    description: "What it does and the problem it solves, in one or two sentences.",
    role: "Solo project — design, frontend and backend.",
    tech: ["Next.js", "Node.js"],
    links: [
      { label: "Code", url: "https://github.com/emil57" },
      { label: "Live", url: "https://example.com" },
    ],
  },
  {
    name: "Project Two",
    description: "Another project you're proud of. Mention a result if you have one.",
    role: "Team of 4 — I owned the API.",
    tech: ["Python", "PostgreSQL"],
    links: [{ label: "Code", url: "https://github.com/emil57" }],
  },
  {
    name: "This Portfolio",
    description: "A static Next.js site deployed to GitHub Pages, with a small Node backend for the contact form.",
    role: "Design and build.",
    tech: ["Next.js", "Node.js", "GitHub Actions"],
    links: [{ label: "Code", url: "https://github.com/emil57/my-web-portfolio" }],
  },
];
