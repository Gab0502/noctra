"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import styles from "./MonumentHero.module.css";

const HOURS = [
  { label: "18:00", note: "Dusk", lit: 0.12, letters: 1 },
  { label: "20:00", note: "First lamps", lit: 0.36, letters: 3 },
  { label: "22:00", note: "The city at work", lit: 0.62, letters: 5 },
  { label: "00:00", note: "Night", lit: 0.9, letters: 6 },
];

// Opens on the visitor's own hour; daytime visitors arrive at dusk.
function hourIndex(h: number) {
  if (h >= 6 && h < 19) return 0;
  if (h >= 19 && h < 21) return 1;
  if (h >= 21 && h < 23) return 2;
  return 3;
}

const noSubscribe = () => () => {};

// The cover of the collection: one picture, the name across it, one line, one action.
export default function MonumentHero() {
  const [chosen, setActive] = useState<number | null>(null);
  // Server renders 22:00; the browser switches to the visitor's own hour after hydration
  const visitorHour = useSyncExternalStore(noSubscribe, () => hourIndex(new Date().getHours()), () => 2);
  const active = chosen ?? visitorHour;
  const lit = HOURS[active].lit;

  return (
    <section className={styles.hero} aria-labelledby="noctra-title">
      <div className={styles.picture} aria-hidden>
        <Image
          src="/archive/stage-set-for-the-queen-of-the.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.cover}
        />
        <div className={styles.dusk} style={{ opacity: 0.55 * (1 - lit) }} />
        <div className={styles.scrim} />
      </div>

      <div className={styles.content}>
        <h1 id="noctra-title" className={styles.band}>
          <NameStreet count={HOURS[active].letters} />
          <span className="sr-only">, architecture studio in Berlin and Oslo</span>
        </h1>

        <div className={styles.foot}>
          <p className={styles.statement}>
            An architecture studio in Berlin and Oslo, designing buildings for the hours after dark.
          </p>

          <div className={styles.hours} role="group" aria-label="Light the building: choose an hour">
            {HOURS.map((h, i) => (
              <button
                key={h.label}
                type="button"
                className={styles.hour}
                aria-pressed={active === i}
                aria-label={`${h.label}, ${h.note}`}
                onClick={() => setActive(i)}
              >
                <span className="tabular">{h.label}</span>
              </button>
            ))}
            <span className={styles.hourNote} aria-live="polite">{HOURS[active].note}</span>
          </div>

          <Link href="/contact" className={`btn-brass ${styles.action}`}>
            Commission a project <span aria-hidden>→</span>
          </Link>
        </div>

        <p className={`caption ${styles.credit}`}>
          Behind the name: Karl Friedrich Schinkel, the Queen of the Night’s hall of stars, 1815
        </p>
      </div>
    </section>
  );
}

// The name as a street: six letters, six buildings. As the hour gets later, whole letters light up, one after another.
const LETTERS = ["N", "O", "C", "T", "R", "A"];
const ORDER = [3, 1, 5, 0, 4, 2]; // which building switches on first: T, O, A, N, R, C

function NameStreet({ count }: { count: number }) {
  const lit = new Set(ORDER.slice(0, count));
  return (
    <span className={styles.name}>
      {LETTERS.map((l, i) => (
        <span
          key={i}
          className={styles.letter}
          data-lit={lit.has(i)}
          style={{ transitionDelay: `${ORDER.indexOf(i) * 140}ms` }}
        >
          {l}
        </span>
      ))}
    </span>
  );
}