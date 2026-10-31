"use client";

import { useNode, Element } from "@craftjs/core";
import { FieldRange, FieldSelect, BackgroundFields, FieldSection } from "../PropertiesPanel";
import { BackgroundLayer } from "./BackgroundLayer";
import { Column } from "./Column";
import type { BackgroundProps } from "../types";

type TwoColumnsProps = {
  ratio?: number;
  gap?: number;
  paddingTop?: number;
  paddingBottom?: number;
  paddingX?: number;
  verticalAlign?: "flex-start" | "center" | "flex-end" | "stretch";
} & BackgroundProps;

export function TwoColumns({
  ratio = 50, gap = 32, paddingTop = 60, paddingBottom = 60, paddingX = 48,
  verticalAlign = "stretch",
  bgColor, bgOpacity = 100, bgImage, overlayColor, overlayOpacity = 50,
}: TwoColumnsProps) {
  const {
    connectors: { connect, drag },
    isSelected,
  } = useNode((node) => ({ isSelected: node.events.selected }));

  return (
    <BackgroundLayer
      bgColor={bgColor} bgOpacity={bgOpacity} bgImage={bgImage}
      overlayColor={overlayColor} overlayOpacity={overlayOpacity}
      style={{ paddingTop, paddingBottom, paddingLeft: paddingX, paddingRight: paddingX }}
      className={isSelected ? "ring-2 ring-[#C9A440]/40 ring-inset" : ""}
    >
      <div
        ref={(ref) => { if (ref) connect(drag(ref)); }}
        style={{ display: "flex", flexWrap: "wrap", gap, alignItems: verticalAlign }}
      >
        <Element id="col1" is={Column} canvas colWidth={ratio} />
        <Element id="col2" is={Column} canvas colWidth={100 - ratio} />
      </div>
    </BackgroundLayer>
  );
}

function TwoColumnsSettings({ setProp }: { setProp: (cb: (p: TwoColumnsProps) => void) => void }) {
  const { props } = useNode((node) => ({ props: node.data.props as TwoColumnsProps }));
  return (
    <>
      <FieldSection title="Layout">
        <FieldRange label="Largura col. esquerda" value={props.ratio ?? 50} min={20} max={80} step={5} unit="%" onChange={(v) => setProp((p) => { p.ratio = v; })} />
        <FieldRange label="Gap entre colunas" value={props.gap ?? 32} min={0} max={120} step={4} unit="px" onChange={(v) => setProp((p) => { p.gap = v; })} />
        <FieldSelect label="Alinhamento vertical" value={props.verticalAlign ?? "stretch"} options={[{ label: "Topo", value: "flex-start" }, { label: "Centro", value: "center" }, { label: "Base", value: "flex-end" }, { label: "Esticar", value: "stretch" }]} onChange={(v) => setProp((p) => { p.verticalAlign = v as TwoColumnsProps["verticalAlign"]; })} />
      </FieldSection>
      <FieldSection title="Espaçamento">
        <FieldRange label="Superior" value={props.paddingTop ?? 60} min={0} max={300} step={8} unit="px" onChange={(v) => setProp((p) => { p.paddingTop = v; })} />
        <FieldRange label="Inferior" value={props.paddingBottom ?? 60} min={0} max={300} step={8} unit="px" onChange={(v) => setProp((p) => { p.paddingBottom = v; })} />
        <FieldRange label="Lateral" value={props.paddingX ?? 48} min={0} max={120} step={8} unit="px" onChange={(v) => setProp((p) => { p.paddingX = v; })} />
      </FieldSection>
      <FieldSection title="Fundo" defaultOpen={false}>
        <BackgroundFields props={props} setProp={setProp} />
      </FieldSection>
    </>
  );
}

TwoColumns.craft = {
  displayName: "2 Colunas",
  props: { ratio: 50, gap: 32, paddingTop: 60, paddingBottom: 60, paddingX: 48, verticalAlign: "stretch", bgColor: "", bgOpacity: 100, bgImage: "", overlayColor: "#000000", overlayOpacity: 50 },
  related: { toolbar: TwoColumnsSettings },
};
