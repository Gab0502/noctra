// Each project is a volume in the collection. A volume's binding (the ground its plates sit on)
// and its drawn elevation are derived from the slug, so every project gets its own, consistently.
import type { CSSProperties } from "react";

export type BindingName = "chevron" | "lattice" | "scallop" | "stripe";

export type Binding = {
  name: BindingName;
  accent: string;
  style: CSSProperties;
};

const PATTERNS: Record<BindingName, (ink: string) => { svg: string; size: string }> = {
  // the upholstery that frames the Zweig excerpts
  chevron: (ink) => ({
    size: "56px 28px",
    svg: `<svg xmlns='http://www.w3.org/2000/svg' width='56' height='28'><path d='M0 22 L14 8 L28 22 L42 8 L56 22' fill='none' stroke='${ink}' stroke-width='6'/></svg>`,
  }),
  // a diamond trellis, like the hotel's wallpaper
  lattice: (ink) => ({
    size: "40px 40px",
    svg: `<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'><path d='M20 2 L38 20 L20 38 L2 20 Z' fill='none' stroke='${ink}' stroke-width='3'/></svg>`,
  }),
  // the scalloped border around the critical essay
  scallop: (ink) => ({
    size: "32px 20px",
    svg: `<svg xmlns='http://www.w3.org/2000/svg' width='32' height='20'><path d='M0 20 A16 16 0 0 1 32 20' fill='none' stroke='${ink}' stroke-width='3'/></svg>`,
  }),
  // ticking stripe, the linen of the costume book
  stripe: (ink) => ({
    size: "18px 18px",
    svg: `<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18'><rect x='0' y='0' width='6' height='18' fill='${ink}'/></svg>`,
  }),
};

const ACCENTS = ["#e9c349", "#d9b9ff", "#d0c6af"];

export function hashSlug(slug: string): number {
  let h = 2166136261;
  for (let i = 0; i < slug.length; i++) {
    h ^= slug.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function bindingFor(slug: string, override?: { name?: BindingName; accent?: string }): Binding {
  const h = hashSlug(slug);
  const names = Object.keys(PATTERNS) as BindingName[];
  const name = override?.name ?? names[h % names.length];
  const accent = override?.accent ?? ACCENTS[(h >>> 3) % ACCENTS.length];
  const { svg, size } = PATTERNS[name]("#1b1b1b");
  return {
    name,
    accent,
    style: {
      ["--binding-ground" as string]: "#0e0e0e",
      ["--binding-pattern" as string]: `url("data:image/svg+xml,${encodeURIComponent(svg)}")`,
      ["--binding-size" as string]: size,
      ["--accent" as string]: accent,
    },
  };
}

// Deterministic 0..1 sequence so lit windows are the same on server and client
export function seeded(seed: number) {
  let s = seed || 1;
  return () => {
    s = (Math.imul(s ^ (s >>> 15), 2246822507) + 0x9e3779b9) >>> 0;
    s = Math.imul(s ^ (s >>> 13), 3266489909) >>> 0;
    return ((s ^ (s >>> 16)) >>> 0) / 4294967296;
  };
}

export type ElevationSpec = {
  floors: number;
  bays: number;
  roof: "flat" | "mansard" | "gable" | "dome";
  arch: boolean;
};

export function elevationFor(slug: string, override?: Partial<ElevationSpec>): ElevationSpec {
  const h = hashSlug(slug);
  const roofs: ElevationSpec["roof"][] = ["flat", "mansard", "gable", "dome"];
  return {
    floors: 3 + (h % 4),
    bays: [5, 7, 9][(h >>> 4) % 3],
    roof: roofs[(h >>> 7) % roofs.length],
    arch: ((h >>> 9) & 1) === 1,
    ...override,
  };
}
