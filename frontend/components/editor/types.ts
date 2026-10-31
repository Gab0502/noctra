export type FontFamily = "cinzel" | "cormorant" | "dm";

export type BackgroundProps = {
  bgColor?: string;
  bgOpacity?: number;
  bgImage?: string;
  overlayColor?: string;
  overlayOpacity?: number;
};

export type TextAlign = "left" | "center" | "right";

export type PropControl =
  | { type: "text"; label: string; prop: string }
  | { type: "textarea"; label: string; prop: string }
  | { type: "image"; label: string; prop: string }
  | { type: "color"; label: string; prop: string }
  | { type: "select"; label: string; prop: string; options: { label: string; value: string }[] }
  | { type: "range"; label: string; prop: string; min: number; max: number; step?: number; unit?: string }
  | { type: "toggle"; label: string; prop: string };

// The stored names are kept so saved projects still resolve; they now point at the Noto faces.
export const FONT_OPTIONS = [
  { label: "Noto Serif Display (títulos)", value: "cinzel" },
  { label: "Noto Serif (corpo)", value: "cormorant" },
  { label: "Noto Serif (etiquetas)", value: "dm" },
];

export const ALIGN_OPTIONS = [
  { label: "Esquerda", value: "left" },
  { label: "Centro", value: "center" },
  { label: "Direita", value: "right" },
];

export const COLOR_PRESETS = [
  { label: "Tinta", value: "#e5e2e1" },
  { label: "Pergaminho", value: "#d0c6af" },
  { label: "Latão", value: "#e9c349" },
  { label: "Violeta", value: "#d9b9ff" },
  { label: "Suave", value: "#99907c" },
  { label: "Preto", value: "#000000" },
];

export function fontClass(font: FontFamily) {
  return font === "cinzel" ? "font-cinzel" : font === "cormorant" ? "font-cormorant" : "font-dm";
}

// Colours saved with the old palette follow the new tokens; colours an editor chose on purpose are kept.
const LEGACY: Record<string, string> = {
  "#f2ede4": "var(--color-ink)",
  "#e0d8cc": "var(--color-parchment)",
  "#c9a440": "var(--accent, var(--color-brass))",
  "#d4b455": "var(--color-brass-light)",
  "#7a6328": "var(--color-outline-variant)",
  "#6b6560": "var(--color-outline)",
  "#0d0b10": "var(--color-ground)",
  "#07060a": "var(--color-surface-lowest)",
  "#1e1a26": "var(--color-surface-container)",
};

export function tone(color: string | undefined, fallback = "var(--color-ink)") {
  if (!color) return fallback;
  return LEGACY[color.toLowerCase()] ?? color;
}
