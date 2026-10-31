"use client";

import { useNode } from "@craftjs/core";
import { FieldImage, FieldText, FieldRange, FieldToggle, FieldSelect, FieldSection } from "../PropertiesPanel";
import { useEditing } from "../useEditing";

type FullBleedProps = {
  image?: string;
  caption?: string;
  height?: number;
  grayscale?: boolean;
  isChapter?: boolean;
  chapterLabel?: string;
  chapterIcon?: string;
};

export function FullBleedImage({
  image = "", caption = "", height = 600, grayscale = false,
  isChapter = false, chapterLabel = "", chapterIcon = "◆",
}: FullBleedProps) {
  const {
    id,
    connectors: { connect, drag },
    isSelected,
  } = useNode((node) => ({ isSelected: node.events.selected }));
  const editing = useEditing();
  if (!image && !editing) return null;

  return (
    <div
      ref={(ref) => { if (ref) connect(drag(ref)); }}
      id={isChapter ? id : undefined}
      className={`relative w-full overflow-hidden ${isSelected ? "ring-2 ring-[#C9A440]/60" : ""}`}
      style={{ height: `min(${height}px, 90svh)` }}
    >
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt={caption} loading="lazy" decoding="async" className="w-full h-full object-cover" style={{ filter: grayscale ? "grayscale(100%)" : "none" }} />
      ) : (
        <div className="w-full h-full bg-[#1E1A26] border border-[#7A6328]/30 flex items-center justify-center">
          <span className="font-dm text-[0.65rem] uppercase tracking-[0.2em] text-[#6B6560]">Imagem full width</span>
        </div>
      )}
      {caption && (
        <div className="absolute bottom-4 right-6 z-10">
          <p className="caption bg-black/70 px-3 py-1.5">{caption}</p>
        </div>
      )}
      {isChapter && (
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <span className="text-[#C9A440] text-sm">{chapterIcon}</span>
          <span className="font-dm text-[0.55rem] tracking-[0.25em] uppercase text-[#C9A440]">{chapterLabel}</span>
        </div>
      )}
    </div>
  );
}

function FullBleedSettings({ setProp }: { setProp: (cb: (p: FullBleedProps) => void) => void }) {
  const { props } = useNode((node) => ({ props: node.data.props as FullBleedProps }));
  return (
    <>
      <FieldSection title="Imagem">
        <FieldImage label="Imagem" value={props.image ?? ""} onChange={(v) => setProp((p) => { p.image = v; })} />
        <FieldRange label="Altura" value={props.height ?? 600} min={200} max={1200} step={50} unit="px" onChange={(v) => setProp((p) => { p.height = v; })} />
        <FieldToggle label="Preto e branco" value={props.grayscale ?? false} onChange={(v) => setProp((p) => { p.grayscale = v; })} />
        <FieldText label="Legenda" value={props.caption ?? ""} onChange={(v) => setProp((p) => { p.caption = v; })} />
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

FullBleedImage.craft = {
  displayName: "Imagem Full Width",
  props: { image: "", caption: "", height: 600, grayscale: false, isChapter: false, chapterLabel: "", chapterIcon: "◆" },
  related: { toolbar: FullBleedSettings },
};
