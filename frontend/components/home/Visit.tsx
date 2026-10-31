import Image from "next/image";
import styles from "./home.module.css";

const MAIL =
  "mailto:contact@noctra.arch?subject=" +
  encodeURIComponent("A new commission") +
  "&body=" +
  encodeURIComponent("Hello NOCTRA,\n\nWhere is the site?\nWhat would you like to build?\nWhen would you like to start?\n");

export default function Visit() {
  return (
    <section id="visit" className={styles.visit} aria-labelledby="visit-title">
      <h2 id="visit-title" className={styles.visitHeading}>
        Visit the studios
      </h2>
      <ul className={styles.rows}>
        <li className={styles.row}>
          <a href="https://www.openstreetmap.org/search?query=Schl%C3%BCterstra%C3%9Fe%2045%2C%2010629%20Berlin">
            Schlüterstraße 45, Berlin
          </a>
          <span className={styles.rowPhoto}>
            <Image
              src="/archive/oslo-opera-house-2025.jpg"
              alt="The Oslo Opera House lit at blue hour on the fjord"
              fill
              sizes="120px"
              style={{ objectFit: "cover" }}
            />
          </span>
        </li>
        <li className={styles.row}>
          <a href="https://www.openstreetmap.org/search?query=Aker%20Brygge%204%2C%200150%20Oslo">Aker Brygge 4, Oslo</a>
        </li>
        <li className={styles.row}>
          <span>Monday to Friday, 9 to 18</span>
        </li>
        <li className={styles.row}>
          <a href="mailto:contact@noctra.arch">contact@noctra.arch</a>
        </li>
        <li className={`${styles.row} ${styles.greetRow}`}>
          <span className={styles.greet}>
            Write to us
            <a href={MAIL} className={styles.greetButton} aria-label="Write to NOCTRA about a commission">
              <span aria-hidden>→</span>
            </a>
          </span>
        </li>
      </ul>
    </section>
  );
}
