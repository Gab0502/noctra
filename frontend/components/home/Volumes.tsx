"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import Elevation from "@/components/volume/Elevation";
import { bindingFor, elevationFor, hashSlug } from "@/lib/volumes";
import type { ProjectSummary } from "@/lib/projects";
import styles from "./home.module.css";

// Each project opens like a spread: two pages, its title across the gutter.
// As a volume crosses the screen its two halves drift apart and meet when it is centred.
export default function Volumes({ projects }: { projects: ProjectSummary[] }) {
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      for (const el of refs.current) {
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.bottom < -vh || r.top > vh * 2) continue;
        const raw = Math.max(-1, Math.min(1, (r.top + r.height / 2 - vh / 2) / (r.height / 2 + vh / 2)));
        // Lock zone: through the middle of the scroll the halves stay aligned so the title reads whole
        const LOCK = 0.1;
        const p = Math.sign(raw) * Math.max(0, Math.abs(raw) - LOCK) / (1 - LOCK);
        el.style.setProperty("--pane", `${(p * 12).toFixed(2)}svh`);
        el.style.setProperty("--tear", `${(p * 16).toFixed(2)}svh`);
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section id="volumes" className={styles.volumes} aria-labelledby="volumes-title">
      <h2 id="volumes-title" className={styles.volumesHeading}>
        <span>The collection</span>
      </h2>
      {projects.map((p, i) => {
        const binding = bindingFor(p.slug);
        const spec = elevationFor(p.slug);
        const seed = hashSlug(p.slug);
        const label = `Drawn elevation of ${p.title}`;
        return (
          <article
            key={p.slug}
            ref={(el) => { refs.current[i] = el; }}
            className={styles.volume}
            style={binding.style}
            aria-labelledby={`vol-${p.slug}`}
          >
            <div className={styles.stage}>
              <div className={`${styles.pane} ${styles.paneLeft}`}>
                <div className={styles.paneInner} style={{ transform: "translateY(calc(var(--pane, 0svh) * -1))" }}>
                  <Elevation spec={spec} seed={seed} lit={0.7} label={label} className={styles.elevation} />
                </div>
              </div>
              <div className={`${styles.pane} binding`}>
                <div className={styles.paneInner} style={{ transform: "translateY(var(--pane, 0svh))" }}>
                  {p.coverImage ? (
                    <Image src={p.coverImage} alt={`${p.title}, ${p.location ?? ""}`} fill sizes="50vw" style={{ objectFit: "cover" }} />
                  ) : (
                    <Elevation spec={spec} seed={seed} lit={0.7} label={`Detail of ${label.toLowerCase()}`} className={styles.detail} />
                  )}
                </div>
              </div>

              <div className={styles.seam}>
                <h3 id={`vol-${p.slug}`} className={styles.title}>
                  <span className={`${styles.half} ${styles.halfLeft}`} style={{ transform: "translateY(calc(var(--tear, 0svh) * -1))" }}>
                    {p.title}
                  </span>
                  <span className={`${styles.half} ${styles.halfRight}`} style={{ transform: "translateY(var(--tear, 0svh))" }} aria-hidden>
                    {p.title}
                  </span>
                </h3>
                <div className={styles.meta}>
                  <p className={styles.metaLine}>
                    {[p.category, p.location, p.year].filter(Boolean).join(" · ")}
                  </p>
                  <Link href={`/projects/${p.slug}`} className={styles.open}>
                    Open the volume <span aria-hidden>&nbsp;→</span>
                  </Link>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
