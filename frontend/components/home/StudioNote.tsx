import Image from "next/image";
import Link from "next/link";
import styles from "./home.module.css";

export default function StudioNote() {
  return (
    <section id="studio" className={styles.studio} aria-labelledby="studio-title">
      <div className={styles.studioAside}>
        <h2 id="studio-title" className={styles.studioHeading}>
          The studio
        </h2>
        <ul className={styles.studioFacts}>
          <li>Berlin and Oslo</li>
          <li>Since 2016</li>
          <li>
            <a href="mailto:contact@noctra.arch" className="link-quiet">
              contact@noctra.arch
            </a>
          </li>
        </ul>
      </div>

      <div className={styles.studioBody} data-reveal>
        <p>
          <span className={styles.dropPortrait}>
            <Image
              src="/archive/schinkel-detail-bauakademie-berlin-2-um-1835.jpg"
              alt="Terracotta relief of two builders setting a stone, from Schinkel's Bauakademie"
              fill
              sizes="160px"
              style={{ objectFit: "cover", objectPosition: "50% 40%" }}
            />
          </span>
          <span className={styles.studioName}>NOCTRA began in a Berlin courtyard in 2016</span>
          <span className={styles.studioRest}>
            , a few streets from where Schinkel’s school of building once stood. Today two small teams, one on
            Schlüterstraße and one on the Oslo fjord, draw every project by hand first and build it as a
            volume: its site, its section, its material, and the light it keeps after dark.
          </span>
        </p>
        <p>We take on a handful of commissions a year, so each one gets the whole studio.</p>
        <p className={styles.studioMore}>
          <Link href="/about" className="btn-ghost">
            Meet the studio <span aria-hidden>→</span>
          </Link>
        </p>
      </div>
    </section>
  );
}
