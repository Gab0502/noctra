"use client";

import { useNode, useEditor } from "@craftjs/core";
import { FieldText, FieldColor, FieldIconPicker, FieldSection } from "../PropertiesPanel";

type ChapterMarkerProps = {
  label?: string;
  icon?: string;
  iconColor?: string;
  labelColor?: string;
};

export function ChapterMarker({
  label = "Capítulo",
  icon = "◆",
  iconColor = "#C9A440",
  labelColor = "#C9A440",
}: ChapterMarkerProps) {
  const {
    id,
    connectors: { connect, drag },
    isSelected,
  } = useNode((node) => ({ isSelected: node.events.selected }));

  const { enabled } = useEditor((state) => ({ enabled: state.options.enabled }));

  if (!enabled) {
    return (
      <div
        id={id}
        style={{ height: "1px", overflow: "hidden", visibility: "hidden", pointerEvents: "none" }}
        aria-hidden
      />
    );
  }

  return (
    <div
      ref={(ref) => { if (ref) connect(drag(ref)); }}
      id={id}
      className={`relative flex items-center gap-3 px-6 py-3 cursor-grab active:cursor-grabbing select-none transition-colors ${
        isSelected ? "bg-[#C9A440]/10" : "hover:bg-[#C9A440]/5"
      }`}
    >
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#C9A440]/50" />
      <span style={{ color: iconColor }} className="text-base leading-none flex-shrink-0">{icon}</span>
      <span style={{ color: labelColor }} className="font-dm text-[0.65rem] tracking-[0.3em] uppercase flex-1">{label}</span>
      <span className="font-dm text-[0.48rem] tracking-[0.15em] uppercase text-[#6B6560]/60">marcador de capítulo</span>
    </div>
  );
}

function ChapterMarkerSettings({ setProp }: { setProp: (cb: (p: ChapterMarkerProps) => void) => void }) {
  const { props } = useNode((node) => ({ props: node.data.props as ChapterMarkerProps }));
  return (
    <>
      <FieldSection title="Capítulo">
        <FieldText label="Nome" value={props.label ?? ""} onChange={(v) => setProp((p) => { p.label = v; })} />
      </FieldSection>
      <FieldSection title="Ícone">
        <FieldIconPicker label="Ícone" value={props.icon ?? "◆"} onChange={(v) => setProp((p) => { p.icon = v; })} />
        <FieldColor label="Cor do ícone" value={props.iconColor ?? "#C9A440"} onChange={(v) => setProp((p) => { p.iconColor = v; })} />
        <FieldColor label="Cor do label" value={props.labelColor ?? "#C9A440"} onChange={(v) => setProp((p) => { p.labelColor = v; })} />
      </FieldSection>
    </>
  );
}

ChapterMarker.craft = {
  displayName: "Capítulo",
  props: { label: "Capítulo", icon: "◆", iconColor: "#C9A440", labelColor: "#C9A440" },
  related: { toolbar: ChapterMarkerSettings },
};
