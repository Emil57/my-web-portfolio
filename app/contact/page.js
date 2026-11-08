import ContactForm from "@/components/ContactForm";
import { profile } from "@/data/profile";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <header className="page-header">
        <h1>Contact</h1>
        <p>
          Have a role, project or question in mind? Send me a message or reach me at{" "}
          <a href={`mailto:${profile.email}`}>{profile.email}</a>.
        </p>
      </header>
      <section className="section">
        <ContactForm email={profile.email} />
      </section>
    </>
  );
}
