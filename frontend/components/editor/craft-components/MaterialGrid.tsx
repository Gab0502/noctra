"use client";

import { useNode } from "@craftjs/core";
import { FieldText, FieldImage, FieldRange, FieldSelect, BackgroundFields, FieldSection } from "../PropertiesPanel";
import { BackgroundLayer } from "./BackgroundLayer";
import type { BackgroundProps } from "../types";
import { useEditing } from "../useEditing";

type MaterialGridProps = {
  label?: string;
  columns?: number;
  images?: string[];
  paddingTop?: number;
  paddingBottom?: number;
} & BackgroundProps;

const MAX = 6;

export function MaterialGrid({
  label = "", columns = 3, images = [], paddingTop = 100, paddingBottom = 100,
  bgColor, bgOpacity = 100, bgImage, overlayColor, overlayOpacity = 50,
}: MaterialGridProps) {
  const {
    connectors: { connect, drag },
    isSelected,
  } = useNode((node) => ({ isSelected: node.events.selected }));
  const editing = useEditing();
  const filled = images.filter(Boolean);
  if (filled.length === 0 && !editing) return null;
  const slots = editing ? MAX : filled.length;

  const colClass = columns === 2 ? "grid-cols-2" : columns === 4 ? "grid-cols-2 md:grid-cols-4" : "grid-cols-2 md:grid-cols-3";

  return (
    <BackgroundLayer
      bgColor={bgColor} bgOpacity={bgOpacity} bgImage={bgImage}
      overlayColor={overlayColor} overlayOpacity={overlayOpacity}
      style={{ paddingTop, paddingBottom }}
      className={isSelected ? "ring-1 ring-[#C9A440]/40" : ""}
    >
      <div ref={(ref) => { if (ref) connect(drag(ref)); }} className="max-w-7xl mx-auto px-6 md:px-12">
        {label && <h3 className="text-[length:var(--step-heading)] text-[var(--color-parchment)] mb-8">{label}</h3>}
        <div className={`grid ${colClass} gap-2`}>
          {Array.from({ length: slots }).map((_, i) => {
            const src = editing ? images[i] : filled[i];
            return src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={i} src={src} alt={label ? `${label}, ${i + 1}` : `Material ${i + 1}`} loading="lazy" decoding="async" className="aspect-square w-full object-cover grayscale hover:grayscale-0 transition-[filter] duration-700" />
            ) : (
              <div key={i} className="aspect-square w-full bg-[#1E1A26] border border-[#7A6328]/20 flex items-center justify-center">
                <span className="font-dm text-[0.55rem] uppercase tracking-[0.15em] text-[#6B6560]">{i + 1}</span>
              </div>
            );
          })}
        </div>
      </div>
    </BackgroundLayer>
  );
}

function MaterialGridSettings({ setProp }: { setProp: (cb: (p: MaterialGridProps) => void) => void }) {
  const { props } = useNode((node) => ({ props: node.data.props as MaterialGridProps }));
  const images = props.images ?? [];

  return (
    <>
      <FieldSection title="Configuração">
        <FieldText label="Label" value={props.label ?? ""} onChange={(v) => setProp((p) => { p.label = v; })} />
        <FieldSelect label="Colunas" value={String(props.columns ?? 3)} options={[{ label: "2", value: "2" }, { label: "3", value: "3" }, { label: "4", value: "4" }]} onChange={(v) => setProp((p) => { p.columns = Number(v); })} />
      </FieldSection>
      <FieldSection title="Imagens">
        {Array.from({ length: MAX }).map((_, i) => (
          <FieldImage
            key={i}
            label={`Imagem ${i + 1}`}
            value={images[i] ?? ""}
            onChange={(v) => setProp((p) => {
              const next = [...(p.images ?? [])];
              next[i] = v;
              p.images = next;
            })}
          />
        ))}
      </FieldSection>
      <FieldSection title="Espaçamento">
        <FieldRange label="Superior" value={props.paddingTop ?? 100} min={0} max={300} step={8} unit="px" onChange={(v) => setProp((p) => { p.paddingTop = v; })} />
        <FieldRange label="Inferior" value={props.paddingBottom ?? 100} min={0} max={300} step={8} unit="px" onChange={(v) => setProp((p) => { p.paddingBottom = v; })} />
      </FieldSection>
      <FieldSection title="Fundo" defaultOpen={false}>
        <BackgroundFields props={props} setProp={setProp} />
      </FieldSection>
    </>
  );
}

MaterialGrid.craft = {
  displayName: "Grid de Materiais",
  props: { label: "", columns: 3, images: [], paddingTop: 100, paddingBottom: 100, bgColor: "", bgOpacity: 100, bgImage: "", overlayColor: "#000000", overlayOpacity: 50 },
  related: { toolbar: MaterialGridSettings },
};
