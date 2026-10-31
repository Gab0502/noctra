import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getProjects } from "@/lib/projects";
import { bindingFor } from "@/lib/volumes";
import styles from "./collection.module.css";

export const metadata: Metadata = {
  title: "The collection",
  description: "Every NOCTRA project, shelved as a volume: houses, rooms and public buildings in Europe.",
};

const ORDINALS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

// The library: each project stands on the shelf as a spine in its own binding.
export default async function CollectionPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const { projects } = await getProjects();
  const categories = Array.from(new Set(projects.map((p) => p.category).filter(Boolean))) as string[];
  const shown = category ? projects.filter((p) => p.category === category) : projects;

  return (
    <>
      <Navbar />
      <main id="main" className={styles.collection}>
        <header className={styles.head}>
          <h1 className={styles.title}>The collection</h1>
          <p className={styles.intro}>
            Every project is bound as a volume of its own: its site, its section, its material, and the light it
            keeps after dark. Take one from the shelf.
          </p>
        </header>

        {categories.length > 1 && (
          <nav className={styles.filters} aria-label="Filter by kind of building">
            <Link href="/projects" className={styles.filter} aria-current={!category ? "page" : undefined}>
              All volumes
            </Link>
            {categories.map((c) => (
              <Link
                key={c}
                href={`/projects?category=${encodeURIComponent(c)}`}
                className={styles.filter}
                aria-current={category === c ? "page" : undefined}
              >
                {c}
              </Link>
            ))}
          </nav>
        )}

        <ol className={styles.shelf} aria-label="Volumes on the shelf">
          {shown.map((p) => {
            const binding = bindingFor(p.slug);
            const n = projects.indexOf(p);
            return (
              <li key={p.slug} className={styles.spineItem} data-reveal style={{ ...binding.style, ["--i" as string]: n, ["--w" as string]: `${Math.min(1.6, 0.9 + p.title.length / 26)}` }}>
                <Link href={`/projects/${p.slug}`} className={`binding ${styles.spine}`}>
                  <span className={styles.spineNo}>{ORDINALS[n] ?? n + 1}</span>
                  <span className={styles.spineTitle}>{p.title}</span>
                  <span className={styles.spineMeta}>
                    {[p.location, p.year].filter(Boolean).join(" · ")}
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>

        {shown.length === 0 && (
          <p className={styles.empty}>
            No volumes of this kind yet. <Link href="/projects" className="btn-ghost">See all volumes</Link>
          </p>
        )}
      </main>
      <Footer />
    </>
  );
}
