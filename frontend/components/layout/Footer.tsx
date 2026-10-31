import Link from "next/link";
import credits from "@/public/archive/credits.json";
import styles from "./layout.module.css";

type Credit = { title: string; creator: string; license: string; page: string; via: string };

// The endpaper: ground and ink inverted, the name returning at full width.
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.footerCols}>
        <div>
          <p className={styles.footerFirst}>Berlin</p>
          <address className={styles.footerSoft}>
            Schlüterstraße 45
            <br />
            10629 Berlin, Germany
          </address>
        </div>
        <div>
          <p className={styles.footerFirst}>Oslo</p>
          <address className={styles.footerSoft}>
            Aker Brygge 4, B125
            <br />
            0150 Oslo, Norway
          </address>
        </div>
        <nav aria-label="Footer">
          <p className={styles.footerFirst}>Index</p>
          <ul className={styles.footerList}>
            <li><Link href="/projects">The collection</Link></li>
            <li><Link href="/about">The studio</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><a href="mailto:contact@noctra.arch">contact@noctra.arch</a></li>
          </ul>
        </nav>
        <div>
          <p className={styles.footerFirst}>Pictures</p>
          <ul className={styles.footerCredits}>
            {(credits as Credit[]).map((c) => (
              <li key={c.page}>
                <a href={c.page}>{shorten(c.title)}</a>, {c.creator.replace(/\s*\(.*\)$/, "")}, {c.license}, via {c.via}
              </li>
            ))}
            <li>Building elevations drawn by NOCTRA for this site.</li>
          </ul>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <svg viewBox="0 0 1000 150" className={styles.footerWord} role="img" aria-label="NOCTRA">
          <text x="500" y="140" textAnchor="middle">
            NOCTRA
          </text>
        </svg>
        <p className={styles.legal}>© {year} NOCTRA Architects. Berlin and Oslo.</p>
      </div>
    </footer>
  );
}

function shorten(title: string) {
  const t = title.replace(/\s*\(\d+\)$/, "");
  return t.length > 64 ? `${t.slice(0, 61)}…` : t;
}
