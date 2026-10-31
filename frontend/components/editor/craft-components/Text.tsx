"use client";

import { useNode } from "@craftjs/core";
import { fontClass, FONT_OPTIONS, ALIGN_OPTIONS, tone } from "../types";
import { FieldText, FieldColor, FieldRange, FieldSelect, FieldSection } from "../PropertiesPanel";

type TextProps = {
  text?: string;
  font?: "cinzel" | "cormorant" | "dm";
  size?: number;
  color?: string;
  align?: "left" | "center" | "right";
  weight?: "light" | "normal" | "semibold";
  tracking?: number;
  lineHeight?: number;
  italic?: boolean;
  uppercase?: boolean;
  paddingTop?: number;
  paddingBottom?: number;
};

export function Text({
  text = "Escreva aqui...",
  font = "cormorant",
  size = 18,
  color = "#E0D8CC",
  align = "left",
  weight = "normal",
  tracking = 0,
  lineHeight = 180,
  italic = false,
  uppercase = false,
  paddingTop = 0,
  paddingBottom = 0,
}: TextProps) {
  const {
    connectors: { connect, drag },
    isSelected,
    actions: { setProp },
  } = useNode((node) => ({ isSelected: node.events.selected }));

  const weightClass =
    weight === "light" ? "font-light" : weight === "semibold" ? "font-semibold" : "font-normal";

  return (
    <p
      ref={(ref) => { if (ref) connect(drag(ref)); }}
      contentEditable={isSelected}
      suppressContentEditableWarning
      onBlur={(e) => setProp((props: TextProps) => { props.text = e.target.innerText; })}
      className={`${fontClass(font)} ${weightClass} outline-none cursor-text ${isSelected ? "ring-1 ring-[#C9A440]/40" : ""}`}
      style={{
        fontSize: `max(${size}px, 13px)`,
        color: tone(color),
        textAlign: align,
        letterSpacing: tracking / 100,
        lineHeight: `${lineHeight}%`,
        fontStyle: italic ? "italic" : "normal",
        textTransform: uppercase ? "uppercase" : "none",
        paddingTop,
        paddingBottom,
      }}
    >
      {text}
    </p>
  );
}

function TextSettings({ setProp }: { setProp: (cb: (p: TextProps) => void) => void }) {
  const { props } = useNode((node) => ({ props: node.data.props as TextProps }));

  return (
    <>
      <FieldSection title="Conteúdo">
        <FieldText label="Texto" value={props.text ?? ""} onChange={(v) => setProp((p) => { p.text = v; })} />
      </FieldSection>
      <FieldSection title="Tipografia">
        <FieldSelect label="Fonte" value={props.font ?? "cormorant"} options={FONT_OPTIONS} onChange={(v) => setProp((p) => { p.font = v as TextProps["font"]; })} />
        <FieldRange label="Tamanho" value={props.size ?? 18} min={8} max={120} step={1} unit="px" onChange={(v) => setProp((p) => { p.size = v; })} />
        <FieldSelect label="Peso" value={props.weight ?? "normal"} options={[{ label: "Light", value: "light" }, { label: "Normal", value: "normal" }, { label: "Semibold", value: "semibold" }]} onChange={(v) => setProp((p) => { p.weight = v as TextProps["weight"]; })} />
        <FieldRange label="Espaço entre letras" value={props.tracking ?? 0} min={-5} max={50} step={1} unit="" onChange={(v) => setProp((p) => { p.tracking = v; })} />
        <FieldRange label="Altura de linha" value={props.lineHeight ?? 180} min={80} max={300} step={5} unit="%" onChange={(v) => setProp((p) => { p.lineHeight = v; })} />
      </FieldSection>
      <FieldSection title="Visual">
        <FieldColor label="Cor" value={props.color ?? "#E0D8CC"} onChange={(v) => setProp((p) => { p.color = v; })} />
        <FieldSelect label="Alinhamento" value={props.align ?? "left"} options={ALIGN_OPTIONS} onChange={(v) => setProp((p) => { p.align = v as TextProps["align"]; })} />
      </FieldSection>
      <FieldSection title="Espaçamento">
        <FieldRange label="Superior" value={props.paddingTop ?? 0} min={0} max={120} step={4} unit="px" onChange={(v) => setProp((p) => { p.paddingTop = v; })} />
        <FieldRange label="Inferior" value={props.paddingBottom ?? 0} min={0} max={120} step={4} unit="px" onChange={(v) => setProp((p) => { p.paddingBottom = v; })} />
      </FieldSection>
    </>
  );
}

Text.craft = {
  displayName: "Texto",
  props: { text: "Escreva aqui...", font: "cormorant", size: 18, color: "#E0D8CC", align: "left", weight: "normal", tracking: 0, lineHeight: 180, paddingTop: 0, paddingBottom: 0 },
  related: { toolbar: TextSettings },
};
