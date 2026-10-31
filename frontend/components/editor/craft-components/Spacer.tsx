"use client";

import { useNode } from "@craftjs/core";
import { FieldRange, FieldSection } from "../PropertiesPanel";

type SpacerProps = { height?: number };

export function Spacer({ height = 64 }: SpacerProps) {
  const {
    connectors: { connect, drag },
    isSelected,
  } = useNode((node) => ({ isSelected: node.events.selected }));

  return (
    <div
      ref={(ref) => { if (ref) connect(drag(ref)); }}
      style={{ height }}
      className={`w-full ${isSelected ? "bg-[#C9A440]/10 ring-1 ring-[#C9A440]/40" : ""}`}
    />
  );
}

function SpacerSettings({ setProp }: { setProp: (cb: (p: SpacerProps) => void) => void }) {
  const { props: { height } } = useNode((node) => ({ props: node.data.props as SpacerProps }));
  return (
    <FieldSection title="Altura">
      <FieldRange label="Altura" value={height ?? 64} min={8} max={400} step={8} unit="px" onChange={(v) => setProp((p) => { p.height = v; })} />
    </FieldSection>
  );
}

Spacer.craft = {
  displayName: "Espaçamento",
  props: { height: 64 },
  related: { toolbar: SpacerSettings },
};
