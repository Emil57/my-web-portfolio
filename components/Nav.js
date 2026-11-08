"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import styles from "./Nav.module.css";

const links = [
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default function Nav({ name }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Main">
        <Link href="/" className={styles.brand} onClick={() => setOpen(false)}>
          {name}
        </Link>
        <button
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="nav-links"
          onClick={() => setOpen((o) => !o)}
        >
          <span className={styles.srOnly}>Menu</span>
          <span aria-hidden="true">{open ? "✕" : "☰"}</span>
        </button>
        <ul id="nav-links" className={`${styles.links} ${open ? styles.open : ""}`}>
          {links.map(({ href, label }) => {
            const active = pathname === href || pathname?.startsWith(`${href}/`);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={active ? styles.active : undefined}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
