"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./layout.module.css";

const links = [
  { href: "/projects", label: "The collection" },
  { href: "/about", label: "The studio" },
  { href: "/contact", label: "Contact" },
];

// On the home page the monument carries the navigation, so the bar waits until it has scrolled away.
export default function Navbar({ revealAfterHero = false }: { revealAfterHero?: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(!revealAfterHero);

  useEffect(() => {
    if (!revealAfterHero) return;
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [revealAfterHero]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className={styles.bar} data-shown={shown || open}>
      <nav className={styles.inner} aria-label="Main">
        <Link href="/" className={styles.wordmark} translate="no">
          NOCTRA
        </Link>

        <div className={styles.links}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="nav-link" aria-current={isCurrent(l.href) ? "page" : undefined}>
              {l.label}
            </Link>
          ))}
          <Link href="/contact" className={`btn-brass ${styles.cta}`}>
            Commission a project
          </Link>
        </div>

        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      <div id="mobile-menu" className={styles.mobile} hidden={!open}>
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            className={styles.mobileLink}
            aria-current={isCurrent(l.href) ? "page" : undefined}
          >
            {l.label}
          </Link>
        ))}
        <Link href="/contact" onClick={() => setOpen(false)} className="btn-brass">
          Commission a project
        </Link>
      </div>
    </header>
  );
}
