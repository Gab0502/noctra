"use client";

import { useEditor, Element } from "@craftjs/core";
import { Container } from "./craft-components/Container";
import { Text } from "./craft-components/Text";
import { ImageBlock } from "./craft-components/ImageBlock";
import { Spacer } from "./craft-components/Spacer";
import { Divider } from "./craft-components/Divider";
import { HeroSection } from "./craft-components/HeroSection";
import { SplitSection } from "./craft-components/SplitSection";
import { FullBleedImage } from "./craft-components/FullBleedImage";
import { QuoteBlock } from "./craft-components/QuoteBlock";
import { MaterialGrid } from "./craft-components/MaterialGrid";
import { TwoColumns } from "./craft-components/TwoColumns";
import { ThreeColumns } from "./craft-components/ThreeColumns";
import { ChapterMarker } from "./craft-components/ChapterMarker";

type ToolItem = {
  label: string;
  icon: string;
  create: () => React.ReactElement;
  group: string;
};

export default function Toolbox() {
  const { connectors } = useEditor();

  const sections: ToolItem[] = [
    {
      label: "Capítulo (sidebar)",
      icon: "◆",
      group: "Seções",
      create: () => <ChapterMarker />,
    },
    {
      label: "Hero",
      icon: "◈",
      group: "Seções",
      create: () => <HeroSection />,
    },
    {
      label: "Texto + Imagem",
      icon: "◫",
      group: "Seções",
      create: () => <SplitSection />,
    },
    {
      label: "Imagem Full",
      icon: "▣",
      group: "Seções",
      create: () => <FullBleedImage />,
    },
    {
      label: "Grid Materiais",
      icon: "⊞",
      group: "Seções",
      create: () => <MaterialGrid />,
    },
    {
      label: "Citação",
      icon: "❝",
      group: "Seções",
      create: () => <QuoteBlock />,
    },
  ];

  const primitives: ToolItem[] = [
    {
      label: "2 Colunas",
      icon: "⬓",
      group: "Layout",
      create: () => <TwoColumns />,
    },
    {
      label: "3 Colunas",
      icon: "⊞",
      group: "Layout",
      create: () => <ThreeColumns />,
    },
    {
      label: "Container",
      icon: "⬡",
      group: "Layout",
      create: () => (
        <Element is={Container} canvas>
          <Text text="Conteúdo" />
        </Element>
      ),
    },
    {
      label: "Texto",
      icon: "T",
      group: "Blocos",
      create: () => <Text />,
    },
    {
      label: "Imagem",
      icon: "⬜",
      group: "Blocos",
      create: () => <ImageBlock />,
    },
    {
      label: "Espaçamento",
      icon: "↕",
      group: "Blocos",
      create: () => <Spacer />,
    },
    {
      label: "Divisor",
      icon: "—",
      group: "Blocos",
      create: () => <Divider />,
    },
  ];

  return (
    <aside className="w-52 flex-shrink-0 border-r border-[#7A6328]/20 bg-[#0D0B10] overflow-y-auto">
      <div className="px-4 py-4 border-b border-[#7A6328]/20">
        <p className="font-cinzel text-[0.75rem] tracking-[0.2em] text-[#C9A440]">NOCTRA</p>
        <p className="font-dm text-[0.5rem] tracking-[0.2em] uppercase text-[#6B6560] mt-0.5">
          Page Builder
        </p>
      </div>

      <div className="px-3 py-3">
        <p className="font-dm text-[0.55rem] tracking-[0.25em] uppercase text-[#6B6560] mb-2 px-1">
          Seções prontas
        </p>
        {sections.map((item) => (
          <ToolCard key={item.label} item={item} connectors={connectors} />
        ))}
      </div>

      <div className="px-3 py-3 border-t border-[#7A6328]/20">
        <p className="font-dm text-[0.55rem] tracking-[0.25em] uppercase text-[#6B6560] mb-2 px-1">
          Layout &amp; Blocos
        </p>
        {primitives.map((item) => (
          <ToolCard key={item.label} item={item} connectors={connectors} />
        ))}
      </div>
    </aside>
  );
}

function ToolCard({
  item,
  connectors,
}: {
  item: ToolItem;
  connectors: ReturnType<typeof useEditor>["connectors"];
}) {
  return (
    <div
      ref={(ref) => { if (ref) connectors.create(ref, item.create()); }}
      className="flex items-center gap-2.5 px-2 py-2.5 mb-0.5 cursor-grab active:cursor-grabbing hover:bg-[#1E1A26] transition-colors rounded group"
    >
      <span className="text-[0.9rem] text-[#6B6560] group-hover:text-[#C9A440] transition-colors w-5 text-center flex-shrink-0">
        {item.icon}
      </span>
      <span className="font-dm text-[0.65rem] text-[#6B6560] group-hover:text-[#E0D8CC] transition-colors">
        {item.label}
      </span>
    </div>
  );
}
