"use client";

import { useNode } from "@craftjs/core";
import { FieldImage, FieldText, FieldTextarea, FieldColor, FieldRange, FieldSelect, FieldToggle, BackgroundFields, FieldSection } from "../PropertiesPanel";
import { BackgroundLayer } from "./BackgroundLayer";
import { tone, type BackgroundProps } from "../types";
import { useEditing } from "../useEditing";

type SplitSectionProps = {
  image?: string;
  label?: string;
  title?: string;
  body?: string;
  imagePosition?: "left" | "right";
  imageRatio?: number;
  paddingTop?: number;
  paddingBottom?: number;
  titleColor?: string;
  bodyColor?: string;
  labelColor?: string;
  grayscale?: boolean;
} & BackgroundProps;

export function SplitSection({
  image = "",
  label = "",
  title = "Título da Seção",
  body = "Descrição do projeto, materiais, conceito e processo.",
  imagePosition = "right",
  imageRatio = 50,
  paddingTop = 120,
  paddingBottom = 120,
  titleColor = "#F2EDE4",
  bodyColor = "#E0D8CC",
  labelColor = "#C9A440",
  grayscale = true,
  bgColor, bgOpacity = 100, bgImage, overlayColor, overlayOpacity = 50,
}: SplitSectionProps) {
  const {
    connectors: { connect, drag },
    isSelected,
  } = useNode((node) => ({ isSelected: node.events.selected }));
  const editing = useEditing();

  const imgFirst = imagePosition === "left";
  // Widths apply from md up; on a phone text and picture each take the full width
  const widths = { ["--img-w" as string]: `${imageRatio}%`, ["--txt-w" as string]: `${100 - imageRatio}%` };
  const picture = image ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={image}
      alt={title}
      loading="lazy"
      decoding="async"
      style={{ filter: grayscale ? "grayscale(100%)" : "none" }}
      className="object-cover aspect-[4/5] w-full md:w-[var(--img-w)] flex-shrink-0"
    />
  ) : editing ? (
    <div className="aspect-[4/5] w-full md:w-[var(--img-w)] bg-[#1E1A26] border border-[#7A6328]/30 flex items-center justify-center flex-shrink-0">
      <span className="font-dm text-[0.6rem] uppercase tracking-[0.2em] text-[#6B6560]">Imagem</span>
    </div>
  ) : null;

  return (
    <BackgroundLayer
      bgColor={bgColor} bgOpacity={bgOpacity} bgImage={bgImage}
      overlayColor={overlayColor} overlayOpacity={overlayOpacity}
      style={{ paddingTop: `min(${paddingTop}px, 14vw)`, paddingBottom: `min(${paddingBottom}px, 14vw)` }}
      className={`w-full ${isSelected ? "ring-2 ring-[#C9A440]/40 ring-inset" : ""}`}
    >
      <div
        ref={(ref) => { if (ref) connect(drag(ref)); }}
        style={widths}
        className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-10 md:gap-20 items-center"
      >
        {imgFirst && picture}
        <div className="flex flex-col gap-5 w-full md:w-[var(--txt-w)]">
          {label && <p className="caption" style={{ color: tone(labelColor, "var(--color-ink-soft)") }}>{label}</p>}
          {title && <h2 className="font-cormorant text-[length:var(--step-heading)] leading-[1.15]" style={{ color: tone(titleColor, "var(--color-parchment)") }}>{title}</h2>}
          {body && <p className="font-cormorant text-[length:var(--step-body)] leading-[1.65]" style={{ color: tone(bodyColor) }}>{body}</p>}
        </div>
        {!imgFirst && picture}
      </div>
    </BackgroundLayer>
  );
}

function SplitSettings({ setProp }: { setProp: (cb: (p: SplitSectionProps) => void) => void }) {
  const { props } = useNode((node) => ({ props: node.data.props as SplitSectionProps }));
  return (
    <>
      <FieldSection title="Imagem">
        <FieldImage label="Imagem" value={props.image ?? ""} onChange={(v) => setProp((p) => { p.image = v; })} />
        <FieldSelect label="Posição" value={props.imagePosition ?? "right"} options={[{ label: "Direita", value: "right" }, { label: "Esquerda", value: "left" }]} onChange={(v) => setProp((p) => { p.imagePosition = v as "left" | "right"; })} />
        <FieldRange label="Largura" value={props.imageRatio ?? 50} min={20} max={70} step={5} unit="%" onChange={(v) => setProp((p) => { p.imageRatio = v; })} />
        <FieldToggle label="Preto e branco" value={props.grayscale ?? true} onChange={(v) => setProp((p) => { p.grayscale = v; })} />
      </FieldSection>
      <FieldSection title="Conteúdo">
        <FieldText label="Label" value={props.label ?? ""} onChange={(v) => setProp((p) => { p.label = v; })} />
        <FieldText label="Título" value={props.title ?? ""} onChange={(v) => setProp((p) => { p.title = v; })} />
        <FieldTextarea label="Texto" value={props.body ?? ""} onChange={(v) => setProp((p) => { p.body = v; })} />
      </FieldSection>
      <FieldSection title="Cores">
        <FieldColor label="Label" value={props.labelColor ?? "#C9A440"} onChange={(v) => setProp((p) => { p.labelColor = v; })} />
        <FieldColor label="Título" value={props.titleColor ?? "#F2EDE4"} onChange={(v) => setProp((p) => { p.titleColor = v; })} />
        <FieldColor label="Texto" value={props.bodyColor ?? "#E0D8CC"} onChange={(v) => setProp((p) => { p.bodyColor = v; })} />
      </FieldSection>
      <FieldSection title="Espaçamento">
        <FieldRange label="Superior" value={props.paddingTop ?? 120} min={0} max={300} step={8} unit="px" onChange={(v) => setProp((p) => { p.paddingTop = v; })} />
        <FieldRange label="Inferior" value={props.paddingBottom ?? 120} min={0} max={300} step={8} unit="px" onChange={(v) => setProp((p) => { p.paddingBottom = v; })} />
      </FieldSection>
      <FieldSection title="Fundo" defaultOpen={false}>
        <BackgroundFields props={props} setProp={setProp} />
      </FieldSection>
    </>
  );
}

SplitSection.craft = {
  displayName: "Texto + Imagem",
  props: { image: "", label: "", title: "Título da Seção", body: "Descrição.", imagePosition: "right", imageRatio: 50, paddingTop: 120, paddingBottom: 120, titleColor: "#F2EDE4", bodyColor: "#E0D8CC", labelColor: "#C9A440", grayscale: true, bgColor: "", bgOpacity: 100, bgImage: "", overlayColor: "#000000", overlayOpacity: 50 },
  related: { toolbar: SplitSettings },
};
