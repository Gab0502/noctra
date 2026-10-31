"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ModuleRenderer from "./ModuleRenderer";
import Elevation from "@/components/volume/Elevation";
import { CraftRenderer } from "@/components/editor/CraftRenderer";
import { bindingFor, elevationFor, hashSlug } from "@/lib/volumes";
import type { CraftNode, Project, ProjectSummary } from "@/lib/projects";
import styles from "./project.module.css";

type Chapter = { id: string; label: string; icon: string };

// DFS over the saved editor tree so chapters come out in page order
function traverseOrder(content: Record<string, CraftNode>, id = "ROOT", visited = new Set<string>()): string[] {
  if (visited.has(id) || !content[id]) return [];
  visited.add(id);
  const node = content[id];
  const result: string[] = [id];
  for (const childId of node.nodes ?? []) result.push(...traverseOrder(content, childId, visited));
  for (const linkedId of Object.values(node.linkedNodes ?? {})) result.push(...traverseOrder(content, linkedId, visited));
  return result;
}

function chaptersOf(project: Project): Chapter[] {
  if (project.craftContent) {
    const content = project.craftContent;
    return traverseOrder(content)
      .filter((id) => content[id]?.type?.resolvedName === "ChapterMarker")
      .map((id) => ({
        id,
        label: String(content[id].props.label ?? "Chapter"),
        icon: String(content[id].props.icon ?? "◆"),
      }));
  }
  return project.modules
    .filter((m) => m.isChapter)
    .map((m) => ({ id: m.id, label: m.chapterLabel ?? "Chapter", icon: m.chapterIcon ?? "◆" }));
}

const ORDINALS = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];

export default function ProjectPage({
  project,
  next,
  number,
}: {
  project: Project;
  next: ProjectSummary | null;
  number: number | null;
}) {
  const chapters = useMemo(() => chaptersOf(project), [project]);
  const binding = bindingFor(project.slug);
  const spec = elevationFor(project.slug);
  const seed = hashSlug(project.slug);
  const [active, setActive] = useState<string | null>(chapters[0]?.id ?? null);

  // Track the chapter being read: the last chapter anchor above 45% of the screen
  useEffect(() => {
    if (chapters.length === 0) return;
    const els = chapters.map((c) => document.getElementById(c.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      () => {
        const line = window.innerHeight * 0.45;
        let current: string | null = chapters[0].id;
        for (const el of els) if (el.getBoundingClientRect().top <= line) current = el.id;
        setActive(current);
      },
      { rootMargin: "-45% 0px -54% 0px", threshold: [0, 1] }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [chapters]);

  const imprint = [
    number ? `Volume ${ORDINALS[number - 1] ?? number}` : null,
    project.location,
    project.year,
    project.category,
  ].filter(Boolean);

  return (
    <main id="main" className={`binding ${styles.volume}`} style={binding.style}>
      {/* The cover: a bound object on its fabric */}
      <header className={styles.cover}>
        <div className={styles.coverBoard}>
          <h1 className={styles.title}>{project.title}</h1>
          {project.subtitle && <p className={styles.subtitle}>{project.subtitle}</p>}
          <figure className={styles.coverPlate}>
            {project.coverImage ? (
              <div className={styles.coverImage}>
                <Image src={project.coverImage} alt={`${project.title}, ${project.location ?? ""}`} fill priority sizes="(max-width: 900px) 100vw, 900px" style={{ objectFit: "cover" }} />
              </div>
            ) : (
              <Elevation spec={spec} seed={seed} lit={0.72} label={`Drawn elevation of ${project.title}`} className={styles.coverDrawing} />
            )}
          </figure>
          {imprint.length > 0 && <p className={styles.imprint}>{imprint.join(" · ")}</p>}
        </div>
      </header>

      {/* Contents */}
      {chapters.length > 0 && (
        <nav className={styles.contents} aria-labelledby="contents-title">
          <div className={styles.contentsPage}>
            <h2 id="contents-title" className={styles.contentsTitle}>Contents</h2>
            <ol className={styles.contentsList}>
              {chapters.map((c, i) => (
                <li key={c.id}>
                  <a href={`#${c.id}`} className={styles.contentsLink}>
                    <span className={styles.contentsPart}>
                      <span className={styles.contentsIcon} aria-hidden>{c.icon}</span>
                      Part {ORDINALS[i] ?? i + 1}
                    </span>
                    <span className={styles.contentsName}>{c.label}</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>
      )}

      {chapters.length > 0 && (
        <nav className={styles.rail} aria-label="Chapters">
          <ol className={styles.railList}>
            {chapters.map((c) => (
              <li key={c.id}>
                <a
                  href={`#${c.id}`}
                  className={styles.railLink}
                  aria-label={c.label}
                  aria-current={active === c.id ? "true" : undefined}
                >
                  <span aria-hidden>{c.icon}</span>
                  <span className={styles.railTip} aria-hidden>{c.label}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}

      <div className={styles.body}>
        <div className={styles.pages}>
          {project.craftContent ? (
            <div className={styles.page}>
              <CraftRenderer craftContent={project.craftContent} />
            </div>
          ) : (
            project.modules.map((module) => (
              <section key={module.id} id={module.isChapter ? module.id : undefined} className={styles.moduleWrap} data-reveal>
                <ModuleRenderer module={module} />
              </section>
            ))
          )}
        </div>
      </div>

      {chapters.length > 0 && (
        <details className={styles.mobileContents}>
          <summary>Contents</summary>
          <ol>
            {chapters.map((c) => (
              <li key={c.id}>
                <a href={`#${c.id}`} onClick={(e) => (e.currentTarget.closest("details") as HTMLDetailsElement).removeAttribute("open")}>
                  {c.label}
                </a>
              </li>
            ))}
          </ol>
        </details>
      )}

      {next && (
        <nav className={styles.next} aria-label="Next volume">
          <Link href={`/projects/${next.slug}`} className={styles.nextLink}>
            <span className={styles.nextLabel}>Next volume</span>
            <span className={styles.nextTitle}>{next.title} <span aria-hidden>→</span></span>
          </Link>
        </nav>
      )}
    </main>
  );
}
