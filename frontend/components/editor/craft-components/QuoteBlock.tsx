"use client";

import { useNode } from "@craftjs/core";
import { FieldTextarea, FieldText, FieldColor, FieldRange, BackgroundFields, FieldSection } from "../PropertiesPanel";
import { BackgroundLayer } from "./BackgroundLayer";
import { tone, type BackgroundProps } from "../types";

type QuoteProps = {
  quote?: string;
  author?: string;
  paddingTop?: number;
  paddingBottom?: number;
  quoteColor?: string;
  authorColor?: string;
} & BackgroundProps;

export function QuoteBlock({
  quote = "A arquitetura é o jogo magistral, correto e magnificente de volumes reunidos sob a luz.",
  author = "Le Corbusier",
  paddingTop = 100,
  paddingBottom = 100,
  quoteColor = "#F2EDE4",
  authorColor = "#C9A440",
  bgColor, bgOpacity = 100, bgImage, overlayColor, overlayOpacity = 50,
}: QuoteProps) {
  const {
    connectors: { connect, drag },
    isSelected,
  } = useNode((node) => ({ isSelected: node.events.selected }));

  return (
    <BackgroundLayer
      bgColor={bgColor} bgOpacity={bgOpacity} bgImage={bgImage}
      overlayColor={overlayColor} overlayOpacity={overlayOpacity}
      style={{ paddingTop, paddingBottom }}
      className={isSelected ? "ring-1 ring-[#C9A440]/40" : ""}
    >
      <div
        ref={(ref) => { if (ref) connect(drag(ref)); }}
        className="max-w-7xl mx-auto px-6 md:px-12 text-center"
      >
        <blockquote className="font-cinzel italic text-[clamp(1.6rem,3vw,2.5rem)] leading-[1.2] max-w-[28ch] mx-auto" style={{ color: tone(quoteColor) }}>
          &ldquo;{quote}&rdquo;
        </blockquote>
        {author && (
          <p className="caption mt-6" style={{ color: tone(authorColor, "var(--color-ink-soft)") }}>
            {author}
          </p>
        )}
      </div>
    </BackgroundLayer>
  );
}

function QuoteSettings({ setProp }: { setProp: (cb: (p: QuoteProps) => void) => void }) {
  const { props } = useNode((node) => ({ props: node.data.props as QuoteProps }));
  return (
    <>
      <FieldSection title="Conteúdo">
        <FieldTextarea label="Citação" value={props.quote ?? ""} onChange={(v) => setProp((p) => { p.quote = v; })} />
        <FieldText label="Autor" value={props.author ?? ""} onChange={(v) => setProp((p) => { p.author = v; })} />
      </FieldSection>
      <FieldSection title="Cores">
        <FieldColor label="Cor da citação" value={props.quoteColor ?? "#F2EDE4"} onChange={(v) => setProp((p) => { p.quoteColor = v; })} />
        <FieldColor label="Cor do autor" value={props.authorColor ?? "#C9A440"} onChange={(v) => setProp((p) => { p.authorColor = v; })} />
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

QuoteBlock.craft = {
  displayName: "Citação",
  props: { quote: "A arquitetura é o jogo magistral...", author: "", paddingTop: 100, paddingBottom: 100, quoteColor: "#F2EDE4", authorColor: "#C9A440", bgColor: "", bgOpacity: 100, bgImage: "", overlayColor: "#000000", overlayOpacity: 50 },
  related: { toolbar: QuoteSettings },
};
