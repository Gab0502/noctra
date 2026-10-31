"use client";

import { useNode } from "@craftjs/core";
import { FieldRange, FieldColor, FieldToggle, FieldSection } from "../PropertiesPanel";
import { useEditing } from "../useEditing";
import { tone } from "../types";

type ColumnProps = {
  children?: React.ReactNode;
  colWidth?: number;
  paddingX?: number;
  paddingY?: number;
  bgColor?: string;
  borderColor?: string;
  showBorder?: boolean;
  verticalContent?: "flex-start" | "center" | "flex-end";
};

export function Column({
  children, colWidth = 50, paddingX = 0, paddingY = 0,
  bgColor = "", borderColor = "#7A6328", showBorder = false, verticalContent = "flex-start",
}: ColumnProps) {
  const {
    connectors: { connect },
    isSelected,
    isEmpty,
  } = useNode((node) => ({
    isSelected: node.events.selected,
    isEmpty: node.data.nodes.length === 0,
  }));
  const editing = useEditing();

  return (
    <div
      ref={(ref) => { if (ref) connect(ref); }}
      style={{
        flex: `${colWidth} 1 ${Math.max(colWidth * 2.8, 260)}px`,
        paddingLeft: paddingX,
        paddingRight: paddingX,
        paddingTop: paddingY,
        paddingBottom: paddingY,
        backgroundColor: bgColor ? tone(bgColor) : undefined,
        border: showBorder ? `1px solid ${tone(borderColor)}` : undefined,
        display: "flex",
        flexDirection: "column",
        justifyContent: verticalContent,
        minHeight: editing ? 60 : undefined,
        boxSizing: "border-box",
      }}
      className={isSelected ? "ring-1 ring-[#C9A440]/40 ring-inset" : ""}
    >
      {isEmpty && editing && (
        <div className="flex-1 flex items-center justify-center min-h-[60px] border border-dashed border-[#7A6328]/30">
          <span className="font-dm text-[0.55rem] uppercase tracking-[0.2em] text-[#6B6560]">
            Solte um bloco aqui
          </span>
        </div>
      )}
      {children}
    </div>
  );
}

function ColumnSettings({ setProp }: { setProp: (cb: (p: ColumnProps) => void) => void }) {
  const { props } = useNode((node) => ({ props: node.data.props as ColumnProps }));
  return (
    <>
      <FieldSection title="Espaçamento">
        <FieldRange label="Horizontal" value={props.paddingX ?? 0} min={0} max={80} step={4} unit="px" onChange={(v) => setProp((p) => { p.paddingX = v; })} />
        <FieldRange label="Vertical" value={props.paddingY ?? 0} min={0} max={80} step={4} unit="px" onChange={(v) => setProp((p) => { p.paddingY = v; })} />
      </FieldSection>
      <FieldSection title="Visual">
        <FieldColor label="Cor de fundo" value={props.bgColor ?? ""} onChange={(v) => setProp((p) => { p.bgColor = v; })} />
        <FieldToggle label="Mostrar borda" value={props.showBorder ?? false} onChange={(v) => setProp((p) => { p.showBorder = v; })} />
        {props.showBorder && (
          <FieldColor label="Cor da borda" value={props.borderColor ?? "#7A6328"} onChange={(v) => setProp((p) => { p.borderColor = v; })} />
        )}
      </FieldSection>
    </>
  );
}

Column.craft = {
  displayName: "Coluna",
  props: { paddingX: 0, paddingY: 0, bgColor: "", showBorder: false, borderColor: "#7A6328", verticalContent: "flex-start" },
  rules: { canDrop: () => true, canMoveIn: () => true },
  related: { toolbar: ColumnSettings },
};
