import Image from "next/image";
import styles from "./home.module.css";

const FACTS = [
  { value: "Berlin", note: "Schlüterstraße 45, the first studio" },
  { value: "Oslo", note: "Aker Brygge 4, on the fjord" },
  { value: "2016", note: "the year the studio opened" },
  { value: "After dark", note: "every building is drawn twice, by day and by night" },
];

export default function Foreword() {
  return (
    <section id="foreword" className={styles.foreword} aria-labelledby="foreword-title">
      <div className={styles.forewordTop}>
        <h2 id="foreword-title" className={styles.forewordTitle} data-reveal>
          Light, then matter
        </h2>
        <p className={styles.forewordNote} data-reveal style={{ ["--i" as string]: 1 }}>
          NOCTRA works where light and mass meet. We design houses, rooms and public buildings that are
          as carefully made for the night as for the day: how they glow from the street, where their
          shadows fall, which window stays lit last.
        </p>
      </div>

      <ul className={styles.facts}>
        {FACTS.map((f, i) => (
          <li key={f.value} className={styles.fact} data-reveal style={{ ["--i" as string]: i }}>
            <span className={styles.factValue}>{f.value}</span>
            <span className={styles.factNote}>{f.note}</span>
          </li>
        ))}
      </ul>

      <div className={styles.forewordBottom}>
      <p className={styles.forewordAside} data-reveal>
        Every drawing set we issue has a night sheet: the building with its lamps on, seen from the street
        at eleven in the evening. If that sheet is not beautiful, the design is not finished.
      </p>
      <figure className={styles.forewordFigure} data-reveal style={{ ["--i" as string]: 1 }}>
        <div className={styles.forewordImage}>
          <Image
            src="/archive/etienne-louis-boullee-cenotaphe-de-newton-02.jpg"
            alt="Boullée's drawing of a colossal stone sphere rising from a ringed, tree-lined base"
            fill
            sizes="(max-width: 900px) 100vw, 42vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <figcaption className="caption">
          Étienne-Louis Boullée, Cenotaph for Newton, 1784. He called it an architecture of shadows.
        </figcaption>
      </figure>
      </div>
    </section>
  );
}
