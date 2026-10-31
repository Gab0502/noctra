"use client";

import { useNode, Element } from "@craftjs/core";
import { FieldRange, FieldSelect, BackgroundFields, FieldSection } from "../PropertiesPanel";
import { BackgroundLayer } from "./BackgroundLayer";
import { Column } from "./Column";
import type { BackgroundProps } from "../types";

type ThreeColumnsProps = {
  col1?: number;
  col2?: number;
  gap?: number;
  paddingTop?: number;
  paddingBottom?: number;
  paddingX?: number;
  verticalAlign?: "flex-start" | "center" | "flex-end" | "stretch";
} & BackgroundProps;

export function ThreeColumns({
  col1 = 33, col2 = 34, gap = 32, paddingTop = 60, paddingBottom = 60, paddingX = 48,
  verticalAlign = "stretch",
  bgColor, bgOpacity = 100, bgImage, overlayColor, overlayOpacity = 50,
}: ThreeColumnsProps) {
  const {
    connectors: { connect, drag },
    isSelected,
  } = useNode((node) => ({ isSelected: node.events.selected }));

  const col3 = Math.max(100 - col1 - col2, 10);

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
        <Element id="col1" is={Column} canvas colWidth={col1} />
        <Element id="col2" is={Column} canvas colWidth={col2} />
        <Element id="col3" is={Column} canvas colWidth={col3} />
      </div>
    </BackgroundLayer>
  );
}

function ThreeColumnsSettings({ setProp }: { setProp: (cb: (p: ThreeColumnsProps) => void) => void }) {
  const { props } = useNode((node) => ({ props: node.data.props as ThreeColumnsProps }));
  const col3 = Math.max(100 - (props.col1 ?? 33) - (props.col2 ?? 34), 10);
  return (
    <>
      <FieldSection title="Layout">
        <FieldRange label="Largura col. 1" value={props.col1 ?? 33} min={10} max={80} step={5} unit="%" onChange={(v) => setProp((p) => { p.col1 = v; })} />
        <FieldRange label="Largura col. 2" value={props.col2 ?? 34} min={10} max={80} step={5} unit="%" onChange={(v) => setProp((p) => { p.col2 = v; })} />
        <div className="mb-4 flex items-center justify-between">
          <span className="admin-label">Largura col. 3</span>
          <span className="font-dm text-[0.65rem] text-[#C9A440]">{col3}%</span>
        </div>
        <FieldRange label="Gap entre colunas" value={props.gap ?? 32} min={0} max={120} step={4} unit="px" onChange={(v) => setProp((p) => { p.gap = v; })} />
        <FieldSelect label="Alinhamento vertical" value={props.verticalAlign ?? "stretch"} options={[{ label: "Topo", value: "flex-start" }, { label: "Centro", value: "center" }, { label: "Base", value: "flex-end" }, { label: "Esticar", value: "stretch" }]} onChange={(v) => setProp((p) => { p.verticalAlign = v as ThreeColumnsProps["verticalAlign"]; })} />
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

ThreeColumns.craft = {
  displayName: "3 Colunas",
  props: { col1: 33, col2: 34, gap: 32, paddingTop: 60, paddingBottom: 60, paddingX: 48, verticalAlign: "stretch", bgColor: "", bgOpacity: 100, bgImage: "", overlayColor: "#000000", overlayOpacity: 50 },
  related: { toolbar: ThreeColumnsSettings },
};
