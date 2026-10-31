"use client";

import { Editor, Frame } from "@craftjs/core";
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
import { Column } from "./craft-components/Column";
import { TwoColumns } from "./craft-components/TwoColumns";
import { ThreeColumns } from "./craft-components/ThreeColumns";
import { ChapterMarker } from "./craft-components/ChapterMarker";

const RESOLVER = {
  Container,
  Text,
  ImageBlock,
  Spacer,
  Divider,
  HeroSection,
  SplitSection,
  FullBleedImage,
  QuoteBlock,
  MaterialGrid,
  Column,
  TwoColumns,
  ThreeColumns,
  ChapterMarker,
};

export function CraftRenderer({ craftContent }: { craftContent: unknown }) {
  if (!craftContent) return null;
  return (
    <Editor resolver={RESOLVER} enabled={false}>
      <Frame data={JSON.stringify(craftContent)} />
    </Editor>
  );
}
