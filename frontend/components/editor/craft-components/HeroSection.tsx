"use client";

import { useNode } from "@craftjs/core";
import { FieldImage, FieldText, FieldColor, FieldRange, FieldToggle, FieldSelect, FieldSection } from "../PropertiesPanel";
import { ALIGN_OPTIONS, tone } from "../types";

type HeroSectionProps = {
  image?: string;
  title?: string;
  subtitle?: string;
  label?: string;
  height?: number;
  overlayOpacity?: number;
  titleColor?: string;
  subtitleColor?: string;
  align?: "left" | "center" | "right";
  isChapter?: boolean;
  chapterLabel?: string;
  chapterIcon?: string;
};

export function HeroSection({
  image = "",
  title = "Título da Secção",
  subtitle = "",
  label = "",
  height = 700,
  overlayOpacity = 50,
  titleColor = "#F2EDE4",
  subtitleColor = "#E0D8CC",
  align = "left",
  isChapter = false,
  chapterLabel = "",
  chapterIcon = "◆",
}: HeroSectionProps) {
  const {
    id,
    connectors: { connect, drag },
    isSelected,
  } = useNode((node) => ({ isSelected: node.events.selected }));

  const alignClass =
    align === "center" ? "items-center text-center" : align === "right" ? "items-end text-right" : "items-start text-left";

  return (
    <div
      ref={(ref) => { if (ref) connect(drag(ref)); }}
      id={isChapter ? id : undefined}
      className={`relative w-full overflow-hidden flex items-end ${isSelected ? "ring-2 ring-[#C9A440]/60" : ""}`}
      style={{ height: `min(${height}px, 92svh)` }}
    >
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover grayscale" />
      ) : (
        <div className="absolute inset-0 bg-[var(--color-surface-lowest)]" />
      )}
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#07060A] via-transparent to-transparent"
        style={{ opacity: overlayOpacity / 100 }}
      />
      <div className={`relative z-10 w-full px-6 md:px-12 pb-12 md:pb-16 flex flex-col gap-3 ${alignClass}`}>
        <h2 className="font-cinzel text-[clamp(2.4rem,5.4vw,5.5rem)] leading-[0.95] tracking-[-0.03em]" style={{ color: tone(titleColor) }}>
          {title}
        </h2>
        {subtitle && (
          <p className="font-cormorant text-[length:var(--step-lead)] leading-[1.3]" style={{ color: tone(subtitleColor, "var(--color-parchment)") }}>
            {subtitle}
          </p>
        )}
        {label && <p className="caption" style={{ color: "var(--accent, var(--color-brass))" }}>{label}</p>}
      </div>
      {isChapter && (
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <span className="text-[var(--color-brass)] text-sm" aria-hidden>{chapterIcon}</span>
          <span className="caption bg-black/70 px-2 py-1">{chapterLabel}</span>
        </div>
      )}
    </div>
  );
}

function HeroSettings({ setProp }: { setProp: (cb: (p: HeroSectionProps) => void) => void }) {
  const { props } = useNode((node) => ({ props: node.data.props as HeroSectionProps }));
  return (
    <>
      <FieldSection title="Conteúdo">
        <FieldImage label="Imagem de fundo" value={props.image ?? ""} onChange={(v) => setProp((p) => { p.image = v; })} />
        <FieldText label="Título" value={props.title ?? ""} onChange={(v) => setProp((p) => { p.title = v; })} />
        <FieldText label="Subtítulo" value={props.subtitle ?? ""} onChange={(v) => setProp((p) => { p.subtitle = v; })} />
        <FieldText label="Label / Etiqueta" value={props.label ?? ""} onChange={(v) => setProp((p) => { p.label = v; })} />
      </FieldSection>
      <FieldSection title="Visual">
        <FieldRange label="Altura" value={props.height ?? 700} min={300} max={1200} step={50} unit="px" onChange={(v) => setProp((p) => { p.height = v; })} />
        <FieldRange label="Opacidade do overlay" value={props.overlayOpacity ?? 50} min={0} max={100} step={5} unit="%" onChange={(v) => setProp((p) => { p.overlayOpacity = v; })} />
        <FieldSelect label="Alinhamento" value={props.align ?? "left"} options={ALIGN_OPTIONS} onChange={(v) => setProp((p) => { p.align = v as HeroSectionProps["align"]; })} />
      </FieldSection>
      <FieldSection title="Cores">
        <FieldColor label="Cor do título" value={props.titleColor ?? "#F2EDE4"} onChange={(v) => setProp((p) => { p.titleColor = v; })} />
        <FieldColor label="Cor do subtítulo" value={props.subtitleColor ?? "#E0D8CC"} onChange={(v) => setProp((p) => { p.subtitleColor = v; })} />
      </FieldSection>
      <FieldSection title="Badge de capítulo" defaultOpen={false}>
        <FieldToggle label="Mostrar badge" value={props.isChapter ?? false} onChange={(v) => setProp((p) => { p.isChapter = v; })} />
        {props.isChapter && (
          <>
            <FieldText label="Nome" value={props.chapterLabel ?? ""} onChange={(v) => setProp((p) => { p.chapterLabel = v; })} />
            <FieldSelect label="Ícone" value={props.chapterIcon ?? "◆"} options={["◆","●","○","▲","■","★","❝","→","⊞"].map((i) => ({ label: i, value: i }))} onChange={(v) => setProp((p) => { p.chapterIcon = v; })} />
          </>
        )}
      </FieldSection>
    </>
  );
}

HeroSection.craft = {
  displayName: "Hero",
  props: { image: "", title: "Título", subtitle: "", label: "", height: 700, overlayOpacity: 50, titleColor: "#F2EDE4", subtitleColor: "#E0D8CC", align: "left", isChapter: false, chapterLabel: "", chapterIcon: "◆" },
  related: { toolbar: HeroSettings },
};
