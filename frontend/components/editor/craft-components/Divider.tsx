"use client";

import { useNode } from "@craftjs/core";
import { FieldColor, FieldRange, FieldSection } from "../PropertiesPanel";
import { tone } from "../types";

type DividerProps = { color?: string; marginTop?: number; marginBottom?: number };

export function Divider({ color = "#7A6328", marginTop = 32, marginBottom = 32 }: DividerProps) {
  const {
    connectors: { connect, drag },
    isSelected,
  } = useNode((node) => ({ isSelected: node.events.selected }));

  return (
    <div
      ref={(ref) => { if (ref) connect(drag(ref)); }}
      style={{ marginTop, marginBottom }}
      className={isSelected ? "ring-1 ring-[#C9A440]/40" : ""}
    >
      <hr style={{ borderColor: tone(color, "var(--color-outline-variant)"), borderTopWidth: 1, borderStyle: "solid" }} />
    </div>
  );
}

function DividerSettings({ setProp }: { setProp: (cb: (p: DividerProps) => void) => void }) {
  const { props } = useNode((node) => ({ props: node.data.props as DividerProps }));
  return (
    <>
      <FieldSection title="Visual">
        <FieldColor label="Cor" value={props.color ?? "#7A6328"} onChange={(v) => setProp((p) => { p.color = v; })} />
      </FieldSection>
      <FieldSection title="Espaçamento">
        <FieldRange label="Margem superior" value={props.marginTop ?? 32} min={0} max={120} step={8} unit="px" onChange={(v) => setProp((p) => { p.marginTop = v; })} />
        <FieldRange label="Margem inferior" value={props.marginBottom ?? 32} min={0} max={120} step={8} unit="px" onChange={(v) => setProp((p) => { p.marginBottom = v; })} />
      </FieldSection>
    </>
  );
}

Divider.craft = {
  displayName: "Divisor",
  props: { color: "#7A6328", marginTop: 32, marginBottom: 32 },
  related: { toolbar: DividerSettings },
};
