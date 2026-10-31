import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { bindingFor } from "@/lib/volumes";
import styles from "./studio.module.css";

export const metadata: Metadata = {
  title: "The studio",
  description: "NOCTRA is a small architecture studio in Berlin and Oslo. Meet the people and the way a volume is made.",
};

// Sample people — replace with the real team before launch
const CAST = [
  { name: "Julian Noctra", role: "Founding principal", city: "Berlin" },
  { name: "Elena Vane", role: "Lead designer", city: "Oslo" },
  { name: "Marcus Thorne", role: "Technical director", city: "Berlin" },
  { name: "Ingrid Sæther", role: "Interiors", city: "Oslo" },
];

const STEPS = [
  {
    icon: "▲",
    title: "We visit the site twice",
    body: "Once at noon and once after dark. The second visit decides more: where the street light falls, what the neighbours keep lit, how far the building will be seen.",
  },
  {
    icon: "◐",
    title: "We draw the night sheet",
    body: "Before any plan is final there is one drawing of the building at eleven in the evening, lamps on. If it is not beautiful, the plan changes.",
  },
  {
    icon: "■",
    title: "We build it in plaster",
    body: "A white model, lit with a single bulb in a dark room, so the client sees the shadows before the walls.",
  },
  {
    icon: "◇",
    title: "We stay until the lights go on",
    body: "One of us is on site for every week of the build, and on the first night the building is lit.",
  },
];

// The studio is told as a volume of its own: a cover, a printed programme, a spread.
export default function StudioPage() {
  const binding = bindingFor("the-studio", { name: "lattice", accent: "#e9c349" });
  return (
    <>
      <Navbar />
      <main id="main" className={`binding ${styles.studio}`} style={binding.style}>
        <header className={styles.board}>
          <h1 className={styles.title}>The studio</h1>
          <p className={styles.lead}>
            A small architecture studio in Berlin and Oslo, founded in 2016. Two teams, one drawing table, and a
            habit of designing every building for the hours after dark.
          </p>
          <figure className={styles.coverPlate}>
            <div className={styles.coverImage}>
              <Image
                src="/archive/schinkel-detail-bauakademie-berlin-2-um-1835.jpg"
                alt="Terracotta relief of two builders setting a stone, from Schinkel's Bauakademie in Berlin"
                fill
                priority
                sizes="(max-width: 900px) 100vw, 900px"
                style={{ objectFit: "cover", objectPosition: "50% 45%" }}
              />
            </div>
            <figcaption className="caption">
              Two builders setting a stone: a terracotta panel from Schinkel’s Bauakademie, Berlin, about 1835.
              Photograph by Manfred Brückels, CC BY-SA 3.0.
            </figcaption>
          </figure>
          <p className={styles.imprint}>Berlin · Oslo · since 2016</p>
        </header>

        <section className={styles.part} aria-labelledby="cast-title">
          <div className={styles.partOpen} data-reveal>
            <p className={styles.partLabel}>Part one</p>
            <h2 id="cast-title" className={styles.partTitle}>The cast</h2>
          </div>

          {/* A printed programme, like the playbills tucked into the book */}
          <div className={styles.programme} data-reveal>
            <p className={styles.programmeHead}>Dramatis personae</p>
            <p className={styles.programmeSub}>in order of appearance on site</p>
            <ul className={styles.castList}>
              {CAST.map((p) => (
                <li key={p.name} className={styles.castRow}>
                  <span className={styles.castName}>{p.name}</span>
                  <span className={styles.castRole}>{p.role}</span>
                  <span className={styles.castCity}>{p.city}</span>
                </li>
              ))}
            </ul>
            <p className={styles.programmeFoot}>With the carpenters, masons and electricians of every site.</p>
          </div>
        </section>

        <section className={styles.part} aria-labelledby="process-title">
          <div className={styles.partOpen} data-reveal>
            <p className={styles.partLabel}>Part two</p>
            <h2 id="process-title" className={styles.partTitle}>How a volume is made</h2>
          </div>

          <div className={styles.spread}>
            <ol className={styles.steps}>
              {STEPS.map((s, i) => (
                <li key={s.title} className={styles.step} data-reveal style={{ ["--i" as string]: i }}>
                  <span className={styles.stepIcon} aria-hidden>{s.icon}</span>
                  <div>
                    <h3 className={styles.stepTitle}>{s.title}</h3>
                    <p className={styles.stepBody}>{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <figure className={styles.spreadPlate} data-reveal>
              <div className={styles.spreadImage}>
                <Image
                  src="/archive/piranesi-carceri-07zugbrucke.jpg"
                  alt="Piranesi's etching of a vaulted prison, its stairs and drawbridge vanishing into the dark"
                  fill
                  sizes="(max-width: 900px) 100vw, 480px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <figcaption className="caption">Giovanni Battista Piranesi, Carceri, plate VII, 1761.</figcaption>
            </figure>
          </div>
        </section>

        <section className={styles.close} aria-labelledby="close-title" data-reveal>
          <h2 id="close-title" className={styles.closeTitle}>Have a site in mind?</h2>
          <p className={styles.closeBody}>Tell us where it is. One of the studios answers within a week.</p>
          <Link href="/contact" className="btn-brass">
            Commission a project <span aria-hidden>→</span>
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
