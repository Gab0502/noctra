"use client";

import { useState, useCallback } from "react";
import { Editor, Frame, Element } from "@craftjs/core";
import { useRouter } from "next/navigation";
import Toolbox from "./Toolbox";
import PropertiesPanel from "./PropertiesPanel";
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

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

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

type Project = {
  slug: string;
  title: string;
  subtitle?: string | null;
  category?: string | null;
  location?: string | null;
  year?: string | null;
  coverImage?: string | null;
  published: boolean;
  craftContent?: unknown;
};

export default function PageBuilder({
  mode,
  project,
}: {
  mode: "new" | "edit";
  project?: Project;
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [published, setPublished] = useState(project?.published ?? false);
  const [meta, setMeta] = useState({
    slug: project?.slug ?? "",
    title: project?.title ?? "",
    subtitle: project?.subtitle ?? "",
    category: project?.category ?? "",
    location: project?.location ?? "",
    year: project?.year ?? "",
    coverImage: project?.coverImage ?? "",
  });
  const [showMeta, setShowMeta] = useState(mode === "new");

  const [editorQuery, setEditorQuery] = useState<unknown>(null);

  const handleSave = useCallback(async () => {
    setSaving(true);
    setError("");

    try {
      // Create project first if new
      if (mode === "new") {
        if (!meta.slug || !meta.title) {
          setError("Slug e título são obrigatórios");
          setSaving(false);
          return;
        }
        const res = await fetch(`${API}/api/admin/projects`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(meta),
        });
        if (!res.ok) {
          const d = await res.json();
          setError(d.error ?? "Erro ao criar");
          setSaving(false);
          return;
        }
      }

      // Save content
      const res = await fetch(`${API}/api/admin/projects/${meta.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          ...meta,
          published,
          craftContent: editorQuery,
        }),
      });

      if (!res.ok) {
        const d = await res.json();
        setError(d.error ?? "Erro ao salvar");
        setSaving(false);
        return;
      }

      router.push("/admin");
    } catch {
      setError("Erro de conexão");
    }
    setSaving(false);
  }, [meta, published, editorQuery, mode, router]);

  return (
    <Editor
      resolver={RESOLVER}
      onRender={({ render }) => render}
      onNodesChange={(query) => {
        setEditorQuery(JSON.parse(query.serialize()));
      }}
    >
      <div className="flex h-screen overflow-hidden bg-[#0D0B10]">
        {/* Left: Toolbox */}
        <Toolbox />

        {/* Center: Canvas + Header */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top bar */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-[#7A6328]/20 flex-shrink-0">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push("/admin")}
                className="font-dm text-[0.6rem] tracking-[0.2em] uppercase text-[#6B6560] hover:text-[#C9A440] transition-colors"
              >
                ← Voltar
              </button>
              <button
                onClick={() => setShowMeta((v) => !v)}
                className={`font-dm text-[0.6rem] tracking-[0.2em] uppercase transition-colors ${showMeta ? "text-[#C9A440]" : "text-[#6B6560] hover:text-[#E0D8CC]"}`}
              >
                {meta.title || "Novo Projeto"} ↓
              </button>
            </div>
            <div className="flex items-center gap-4">
              {error && <p className="font-dm text-[0.65rem] text-red-400">{error}</p>}
              <label className="flex items-center gap-2 cursor-pointer">
                <div
                  onClick={() => setPublished((p) => !p)}
                  className={`w-8 h-4 rounded-full relative transition-colors ${published ? "bg-[#C9A440]" : "bg-[#1E1A26]"}`}
                >
                  <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform ${published ? "translate-x-4" : "translate-x-0.5"}`} />
                </div>
                <span className="font-dm text-[0.6rem] uppercase tracking-[0.15em] text-[#6B6560]">
                  {published ? "Publicado" : "Rascunho"}
                </span>
              </label>
              <button
                onClick={handleSave}
                disabled={saving}
                className="btn-gold text-xs disabled:opacity-50"
              >
                {saving ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </div>

          {/* Meta panel (collapsible) */}
          {showMeta && (
            <div className="border-b border-[#7A6328]/20 px-5 py-4 bg-[#0D0B10] grid grid-cols-3 gap-3">
              {(["title", "slug", "subtitle", "category", "location", "year"] as const).map((field) => (
                <div key={field}>
                  <label className="admin-label block mb-1 capitalize">{field === "slug" ? "Slug (URL)" : field}</label>
                  <input
                    value={meta[field]}
                    onChange={(e) => setMeta((m) => ({ ...m, [field]: field === "slug" ? e.target.value.toLowerCase().replace(/\s+/g, "-") : e.target.value }))}
                    disabled={field === "slug" && mode === "edit"}
                    className="admin-input w-full disabled:opacity-40"
                    placeholder={field}
                  />
                </div>
              ))}
              <div className="col-span-3">
                <label className="admin-label block mb-1">Imagem de capa (URL)</label>
                <input
                  value={meta.coverImage}
                  onChange={(e) => setMeta((m) => ({ ...m, coverImage: e.target.value }))}
                  className="admin-input w-full"
                  placeholder="https://... ou /uploads/..."
                />
              </div>
            </div>
          )}

          {/* Canvas */}
          <div className="flex-1 overflow-y-auto bg-[#111]">
            <div className="min-h-full bg-[#0D0B10]">
              <Frame data={project?.craftContent ? JSON.stringify(project.craftContent) : undefined}>
                <Element is={Container} canvas paddingTop={0} paddingBottom={0} maxWidth="full">
                  <HeroSection
                    title="Título do Projeto"
                    subtitle="Uma história contada em espaço e luz"
                    height={600}
                  />
                  <Text
                    text="Clique em qualquer elemento para editar. Arraste blocos da sidebar esquerda para adicionar conteúdo."
                    font="cormorant"
                    size={18}
                    align="center"
                    paddingTop={60}
                    paddingBottom={60}
                    color="#6B6560"
                  />
                </Element>
              </Frame>
            </div>
          </div>
        </div>

        {/* Right: Properties */}
        <PropertiesPanel />
      </div>
    </Editor>
  );
}
