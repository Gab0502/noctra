"use client";

import { useNode } from "@craftjs/core";
import { FieldRange, FieldSelect, BackgroundFields, FieldSection } from "../PropertiesPanel";
import { BackgroundLayer } from "./BackgroundLayer";
import type { BackgroundProps } from "../types";

type ContainerProps = {
  children?: React.ReactNode;
  paddingTop?: number;
  paddingBottom?: number;
  paddingX?: number;
  layout?: "flex-col" | "flex-row" | "grid-2" | "grid-3";
  gap?: number;
  maxWidth?: "full" | "container" | "narrow";
} & BackgroundProps;

export function Container({
  children,
  paddingTop = 80,
  paddingBottom = 80,
  paddingX = 0,
  layout = "flex-col",
  gap = 32,
  maxWidth = "container",
  bgColor,
  bgOpacity = 100,
  bgImage,
  overlayColor,
  overlayOpacity = 50,
}: ContainerProps) {
  const {
    connectors: { connect, drag },
  } = useNode();

  const maxWClass =
    maxWidth === "container"
      ? "max-w-7xl mx-auto px-6 md:px-12"
      : maxWidth === "narrow"
      ? "max-w-3xl mx-auto px-6"
      : "w-full";

  const layoutClass =
    layout === "flex-row"
      ? "flex flex-row flex-wrap"
      : layout === "grid-2"
      ? "grid grid-cols-1 md:grid-cols-2"
      : layout === "grid-3"
      ? "grid grid-cols-1 md:grid-cols-3"
      : "flex flex-col";

  return (
    <BackgroundLayer
      bgColor={bgColor}
      bgOpacity={bgOpacity}
      bgImage={bgImage}
      overlayColor={overlayColor}
      overlayOpacity={overlayOpacity}
      style={{ paddingTop, paddingBottom, paddingLeft: paddingX, paddingRight: paddingX }}
    >
      <div
        ref={(ref) => { if (ref) connect(drag(ref)); }}
        className={`${maxWClass} ${layoutClass}`}
        style={{ gap }}
      >
        {children}
      </div>
    </BackgroundLayer>
  );
}

function ContainerSettings({ setProp }: { setProp: (cb: (p: ContainerProps) => void) => void }) {
  const { props } = useNode((node) => ({ props: node.data.props as ContainerProps }));

  return (
    <>
      <FieldSection title="Layout">
        <FieldSelect
          label="Direção"
          value={props.layout ?? "flex-col"}
          options={[
            { label: "Coluna", value: "flex-col" },
            { label: "Linha", value: "flex-row" },
            { label: "2 Colunas", value: "grid-2" },
            { label: "3 Colunas", value: "grid-3" },
          ]}
          onChange={(v) => setProp((p) => { p.layout = v as ContainerProps["layout"]; })}
        />
        <FieldSelect
          label="Largura máxima"
          value={props.maxWidth ?? "container"}
          options={[
            { label: "Container (1280px)", value: "container" },
            { label: "Estreito (768px)", value: "narrow" },
            { label: "Tela cheia", value: "full" },
          ]}
          onChange={(v) => setProp((p) => { p.maxWidth = v as ContainerProps["maxWidth"]; })}
        />
        <FieldRange label="Gap entre filhos" value={props.gap ?? 32} min={0} max={120} step={8} unit="px" onChange={(v) => setProp((p) => { p.gap = v; })} />
      </FieldSection>
      <FieldSection title="Espaçamento">
        <FieldRange label="Superior" value={props.paddingTop ?? 80} min={0} max={300} step={8} unit="px" onChange={(v) => setProp((p) => { p.paddingTop = v; })} />
        <FieldRange label="Inferior" value={props.paddingBottom ?? 80} min={0} max={300} step={8} unit="px" onChange={(v) => setProp((p) => { p.paddingBottom = v; })} />
        <FieldRange label="Lateral" value={props.paddingX ?? 0} min={0} max={120} step={8} unit="px" onChange={(v) => setProp((p) => { p.paddingX = v; })} />
      </FieldSection>
      <FieldSection title="Fundo" defaultOpen={false}>
        <BackgroundFields props={props} setProp={setProp} />
      </FieldSection>
    </>
  );
}

Container.craft = {
  displayName: "Container",
  props: { paddingTop: 80, paddingBottom: 80, paddingX: 0, layout: "flex-col", gap: 32, maxWidth: "container", bgColor: "", bgOpacity: 100, bgImage: "", overlayColor: "#000000", overlayOpacity: 50 },
  rules: { canDrop: () => true },
  related: { toolbar: ContainerSettings },
};
