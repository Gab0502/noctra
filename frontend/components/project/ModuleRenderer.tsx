import Image from "next/image";
import type { Module } from "@/lib/projects";
import styles from "./modules.module.css";

type C = Record<string, string | undefined>;

export default function ModuleRenderer({ module }: { module: Module }) {
  const c = module.content as C;

  switch (module.type) {
    case "chapter-hero":
      return <ChapterTitle c={c} fallback={module.chapterLabel} />;
    case "split-text-image":
      return <Spread c={c} />;
    case "full-bleed-image":
      return <Plate c={c} />;
    case "material-grid":
      return <Plates c={c} count={6} columns={3} />;
    case "gallery":
      return <Plates c={c} count={8} columns={4} />;
    case "text-block":
      return <TextPage c={c} />;
    case "quote":
      return <Quote c={c} />;
    case "cta":
      return <Cta c={c} />;
    default:
      return null;
  }
}

// A chapter opens on its own title page, like each part of the book
function ChapterTitle({ c, fallback }: { c: C; fallback: string | null }) {
  return (
    <div className={styles.chapter}>
      {c.number && <p className={styles.chapterPart}>{c.number}</p>}
      <h2 className={styles.chapterTitle}>{c.title ?? fallback}</h2>
      {c.image && (
        <figure className={styles.chapterPlate}>
          <div className={styles.frame} style={{ aspectRatio: "16 / 9" }}>
            <Image src={c.image} alt={c.alt ?? c.title ?? ""} fill sizes="(max-width: 1024px) 100vw, 1000px" style={{ objectFit: "cover" }} />
          </div>
        </figure>
      )}
    </div>
  );
}

function TextPage({ c }: { c: C }) {
  const paragraphs = (c.body ?? "").split(/\n\s*\n/).filter(Boolean);
  return (
    <div className={`${styles.textPage} ${c.align === "center" ? styles.center : ""}`}>
      {c.title && <h3 className={styles.heading}>{c.title}</h3>}
      {paragraphs.map((p, i) => (
        <p key={i} className={i === 0 ? `${styles.body} drop-cap` : styles.body}>
          {p}
        </p>
      ))}
    </div>
  );
}

// Two facing pages: the text page and the plate
function Spread({ c }: { c: C }) {
  const imageLeft = c.imagePosition === "left";
  return (
    <div className={`${styles.spread} ${imageLeft ? styles.spreadFlip : ""}`}>
      <div className={styles.spreadText}>
        {c.title && <h3 className={styles.heading}>{c.title}</h3>}
        {c.body && <p className={styles.body}>{c.body}</p>}
      </div>
      {c.image && (
        <figure className={styles.spreadPlate}>
          <div className={styles.frame} style={{ aspectRatio: "4 / 5" }}>
            <Image src={c.image} alt={c.alt ?? c.caption ?? c.title ?? ""} fill sizes="(max-width: 1024px) 100vw, 520px" style={{ objectFit: "cover" }} />
          </div>
          {(c.caption || c.label) && <figcaption className="caption">{c.caption ?? c.label}</figcaption>}
        </figure>
      )}
    </div>
  );
}

function Plate({ c }: { c: C }) {
  if (!c.image) return null;
  const ratio = c.height === "medium" ? "21 / 9" : c.height === "large" ? "16 / 9" : "3 / 2";
  return (
    <figure className={styles.plate}>
      <div className={styles.frame} style={{ aspectRatio: ratio }}>
        <Image src={c.image} alt={c.alt ?? c.caption ?? ""} fill sizes="(max-width: 1024px) 100vw, 1100px" style={{ objectFit: "cover" }} />
      </div>
      {c.caption && <figcaption className="caption">{c.caption}</figcaption>}
    </figure>
  );
}

function Plates({ c, count, columns }: { c: C; count: number; columns: number }) {
  const images = Array.from({ length: count }, (_, i) => c[`image${i}`]).filter(Boolean) as string[];
  if (images.length === 0) return null;
  return (
    <div className={styles.plates}>
      {c.title && <h3 className={styles.heading}>{c.title}</h3>}
      <div className={styles.platesGrid} style={{ ["--cols" as string]: columns }}>
        {images.map((src, i) => (
          <div key={i} className={styles.frame} style={{ aspectRatio: columns === 4 ? "3 / 4" : "1 / 1" }}>
            <Image src={src} alt={c[`alt${i}`] ?? `${c.title ?? "Plate"} ${i + 1}`} fill sizes={`(max-width: 1024px) 50vw, ${Math.round(100 / columns)}vw`} style={{ objectFit: "cover" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Quote({ c }: { c: C }) {
  if (!c.quote) return null;
  return (
    <figure className={styles.quote}>
      <blockquote className={styles.quoteText}>“{c.quote}”</blockquote>
      {c.author && <figcaption className={styles.quoteBy}>{c.author}</figcaption>}
    </figure>
  );
}

function Cta({ c }: { c: C }) {
  return (
    <div className={styles.cta}>
      {c.title && <h3 className={styles.heading}>{c.title}</h3>}
      {c.subtitle && <p className={styles.body}>{c.subtitle}</p>}
      {c.buttonText && c.buttonHref && (
        <a href={c.buttonHref} className="btn-brass">
          {c.buttonText}
        </a>
      )}
    </div>
  );
}
