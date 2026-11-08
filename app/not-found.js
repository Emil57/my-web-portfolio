import Link from "next/link";

export default function NotFound() {
  return (
    <header className="page-header">
      <h1>Page not found</h1>
      <p>
        That page doesn&apos;t exist. <Link href="/">Go back home</Link>.
      </p>
    </header>
  );
}
