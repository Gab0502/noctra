"use client";

import { useNode } from "@craftjs/core";
import { FieldImage, FieldRange, FieldSelect, FieldToggle, FieldSection } from "../PropertiesPanel";
import { useEditing } from "../useEditing";

type ImageBlockProps = {
  src?: string;
  alt?: string;
  height?: number;
  fit?: "cover" | "contain";
  grayscale?: boolean;
  paddingTop?: number;
  paddingBottom?: number;
  radius?: number;
};

export function ImageBlock({
  src = "", alt = "", height = 400, fit = "cover",
  grayscale = false, paddingTop = 0, paddingBottom = 0, radius = 0,
}: ImageBlockProps) {
  const {
    connectors: { connect, drag },
    isSelected,
  } = useNode((node) => ({ isSelected: node.events.selected }));
  const editing = useEditing();
  if (!src && !editing) return null;

  return (
    <div
      ref={(ref) => { if (ref) connect(drag(ref)); }}
      style={{ paddingTop, paddingBottom }}
      className={isSelected ? "ring-1 ring-[#C9A440]/40" : ""}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src} alt={alt} loading="lazy" decoding="async"
          style={{ width: "100%", height: `min(${height}px, 75svh)`, objectFit: fit, filter: grayscale ? "grayscale(100%)" : "none", borderRadius: radius }}
        />
      ) : (
        <div style={{ height }} className="w-full bg-[#1E1A26] border border-[#7A6328]/30 flex items-center justify-center">
          <span className="font-dm text-[0.65rem] uppercase tracking-[0.2em] text-[#6B6560]">Adicionar imagem</span>
        </div>
      )}
    </div>
  );
}

function ImageSettings({ setProp }: { setProp: (cb: (p: ImageBlockProps) => void) => void }) {
  const { props } = useNode((node) => ({ props: node.data.props as ImageBlockProps }));
  return (
    <>
      <FieldSection title="Imagem">
        <FieldImage label="Imagem" value={props.src ?? ""} onChange={(v) => setProp((p) => { p.src = v; })} />
        <FieldRange label="Altura" value={props.height ?? 400} min={100} max={1000} step={20} unit="px" onChange={(v) => setProp((p) => { p.height = v; })} />
        <FieldSelect label="Preenchimento" value={props.fit ?? "cover"} options={[{ label: "Cobrir (cover)", value: "cover" }, { label: "Conter (contain)", value: "contain" }]} onChange={(v) => setProp((p) => { p.fit = v as ImageBlockProps["fit"]; })} />
        <FieldToggle label="Preto e branco" value={props.grayscale ?? false} onChange={(v) => setProp((p) => { p.grayscale = v; })} />
        <FieldRange label="Borda arredondada" value={props.radius ?? 0} min={0} max={32} step={2} unit="px" onChange={(v) => setProp((p) => { p.radius = v; })} />
      </FieldSection>
      <FieldSection title="Espaçamento">
        <FieldRange label="Superior" value={props.paddingTop ?? 0} min={0} max={120} step={8} unit="px" onChange={(v) => setProp((p) => { p.paddingTop = v; })} />
        <FieldRange label="Inferior" value={props.paddingBottom ?? 0} min={0} max={120} step={8} unit="px" onChange={(v) => setProp((p) => { p.paddingBottom = v; })} />
      </FieldSection>
    </>
  );
}

ImageBlock.craft = {
  displayName: "Imagem",
  props: { src: "", alt: "", height: 400, fit: "cover", grayscale: false, paddingTop: 0, paddingBottom: 0, radius: 0 },
  related: { toolbar: ImageSettings },
};
