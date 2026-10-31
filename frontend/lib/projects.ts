import { SAMPLE_VOLUMES } from "./sample-volumes";

export type Module = {
  id: string;
  type: string;
  order: number;
  isChapter: boolean;
  chapterLabel: string | null;
  chapterIcon: string | null;
  content: Record<string, unknown>;
};

export type CraftNode = {
  type: { resolvedName: string };
  props: Record<string, unknown>;
  nodes: string[];
  linkedNodes?: Record<string, string>;
};

export type ProjectSummary = {
  slug: string;
  title: string;
  subtitle: string | null;
  category: string | null;
  location: string | null;
  year: string | null;
  coverImage: string | null;
};

export type Project = ProjectSummary & {
  craftContent?: Record<string, CraftNode> | null;
  modules: Module[];
};

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

// The public site keeps working when the API or its database is unreachable:
// it falls back to the sample volumes, which must be replaced before launch.
export async function getProjects(): Promise<{ projects: ProjectSummary[]; sample: boolean }> {
  try {
    const res = await fetch(`${API}/api/projects`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) throw new Error(String(res.status));
    const projects = (await res.json()) as ProjectSummary[];
    if (projects.length > 0) return { projects, sample: false };
  } catch {
    // fall through to the sample collection
  }
  return { projects: SAMPLE_VOLUMES.map(toSummary), sample: true };
}

export async function getProject(slug: string): Promise<Project | null> {
  try {
    const res = await fetch(`${API}/api/projects/${encodeURIComponent(slug)}`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(4000),
    });
    if (res.ok) return (await res.json()) as Project;
    if (res.status !== 404) throw new Error(String(res.status));
  } catch {
    // API unreachable: try the sample collection
  }
  return SAMPLE_VOLUMES.find((v) => v.slug === slug) ?? null;
}

function toSummary(p: Project): ProjectSummary {
  const { slug, title, subtitle, category, location, year, coverImage } = p;
  return { slug, title, subtitle, category, location, year, coverImage };
}
