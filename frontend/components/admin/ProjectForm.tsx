"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import ModuleEditor from "./ModuleEditor";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export type ModuleType =
  | "chapter-hero"
  | "split-text-image"
  | "full-bleed-image"
  | "material-grid"
  | "text-block"
  | "quote"
  | "gallery"
  | "cta";

export type ModuleData = {
  id?: string;
  type: ModuleType;
  order: number;
  isChapter: boolean;
  chapterLabel: string;
  chapterIcon: string;
  content: Record<string, unknown>;
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
  modules: ModuleData[];
};

const MODULE_LABELS: Record<ModuleType, string> = {
  "chapter-hero": "Capa de Capítulo",
  "split-text-image": "Texto + Imagem",
  "full-bleed-image": "Imagem Full Width",
  "material-grid": "Grid de Materiais",
  "text-block": "Bloco de Texto",
  quote: "Citação",
  gallery: "Galeria",
  cta: "Call to Action",
};

const MODULE_ICONS: Record<ModuleType, string> = {
  "chapter-hero": "◆",
  "split-text-image": "◫",
  "full-bleed-image": "▣",
  "material-grid": "⊞",
  "text-block": "≡",
  quote: "❝",
  gallery: "⊟",
  cta: "→",
};

export default function ProjectForm({
  mode,
  project,
}: {
  mode: "new" | "edit";
  project?: Project;
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [slug, setSlug] = useState(project?.slug ?? "");
  const [title, setTitle] = useState(project?.title ?? "");
  const [subtitle, setSubtitle] = useState(project?.subtitle ?? "");
  const [category, setCategory] = useState(project?.category ?? "");
  const [location, setLocation] = useState(project?.location ?? "");
  const [year, setYear] = useState(project?.year ?? "");
  const [coverImage, setCoverImage] = useState(project?.coverImage ?? "");
  const [published, setPublished] = useState(project?.published ?? false);
  const [modules, setModules] = useState<ModuleData[]>(
    project?.modules?.map((m, i) => ({ ...m, order: i })) ?? []
  );
  const [activeModule, setActiveModule] = useState<number | null>(null);

  const addModule = useCallback((type: ModuleType) => {
    setModules((prev) => [
      ...prev,
      {
        type,
        order: prev.length,
        isChapter: type === "chapter-hero",
        chapterLabel: "",
        chapterIcon: "◆",
        content: {},
      },
    ]);
    setActiveModule(modules.length);
  }, [modules.length]);

  const removeModule = useCallback((index: number) => {
    setModules((prev) => prev.filter((_, i) => i !== index).map((m, i) => ({ ...m, order: i })));
    setActiveModule(null);
  }, []);

  const moveModule = useCallback((index: number, dir: -1 | 1) => {
    setModules((prev) => {
      const next = [...prev];
      const target = index + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next.map((m, i) => ({ ...m, order: i }));
    });
  }, []);

  const updateModule = useCallback((index: number, data: Partial<ModuleData>) => {
    setModules((prev) =>
      prev.map((m, i) => (i === index ? { ...m, ...data } : m))
    );
  }, []);

  async function uploadImage(file: File): Promise<string> {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch(`${API}/api/admin/upload`, { method: "POST", body: fd, credentials: "include" });
    const data = await res.json();
    return data.url;
  }

  async function handleSave() {
    setSaving(true);
    setError("");

    try {
      if (mode === "new") {
        const res = await fetch(`${API}/api/admin/projects`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ slug, title, subtitle, category, location, year, coverImage }),
        });
        if (!res.ok) {
          const d = await res.json();
          setError(d.error ?? "Erro ao criar projeto");
          setSaving(false);
          return;
        }
      }

      const res = await fetch(`${API}/api/admin/projects/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          title,
          subtitle,
          category,
          location,
          year,
          coverImage,
          published,
          modules,
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
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar: module list */}
      <aside className="w-64 flex-shrink-0 border-r border-[#7A6328]/20 flex flex-col overflow-y-auto bg-[#0D0B10]">
        <div className="px-5 py-5 border-b border-[#7A6328]/20">
          <a
            href="/admin"
            className="font-dm text-[0.6rem] tracking-[0.25em] uppercase text-[#6B6560] hover:text-[#C9A440] transition-colors"
          >
            ← Voltar
          </a>
          <p className="font-cinzel text-[0.9rem] tracking-[0.2em] text-[#C9A440] mt-3">
            NOCTRA
          </p>
        </div>

        <div className="px-5 py-4 border-b border-[#7A6328]/20">
          <p className="font-dm text-[0.6rem] tracking-[0.25em] uppercase text-[#6B6560] mb-3">
            Capítulos
          </p>
          {modules.length === 0 && (
            <p className="font-dm text-[0.65rem] text-[#6B6560]/60 italic">
              Nenhum módulo ainda
            </p>
          )}
          {modules.map((m, i) => (
            <button
              key={i}
              onClick={() => setActiveModule(i)}
              className={`w-full text-left flex items-center gap-3 py-2 px-2 mb-1 transition-colors ${
                activeModule === i
                  ? "bg-[#1E1A26] text-[#C9A440]"
                  : "text-[#6B6560] hover:text-[#E0D8CC]"
              }`}
            >
              <span className="text-[0.9rem] w-5 text-center flex-shrink-0">
                {m.isChapter ? m.chapterIcon || "◆" : MODULE_ICONS[m.type]}
              </span>
              <span className="font-dm text-[0.65rem] truncate">
                {m.isChapter && m.chapterLabel ? m.chapterLabel : MODULE_LABELS[m.type]}
              </span>
            </button>
          ))}
        </div>

        <div className="px-5 py-4 flex-1">
          <p className="font-dm text-[0.6rem] tracking-[0.25em] uppercase text-[#6B6560] mb-3">
            Adicionar Módulo
          </p>
          <div className="flex flex-col gap-1">
            {(Object.keys(MODULE_LABELS) as ModuleType[]).map((type) => (
              <button
                key={type}
                onClick={() => addModule(type)}
                className="flex items-center gap-2 py-2 px-2 text-[#6B6560] hover:text-[#C9A440] hover:bg-[#1E1A26]/60 transition-colors text-left"
              >
                <span className="w-5 text-center text-[0.9rem]">{MODULE_ICONS[type]}</span>
                <span className="font-dm text-[0.65rem]">{MODULE_LABELS[type]}</span>
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Main: project meta + active module editor */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-8 py-10">
          {/* Project meta */}
          <div className="mb-10">
            <p className="font-dm text-[0.6rem] tracking-[0.25em] uppercase text-[#C9A440] mb-6">
              Informações do Projeto
            </p>
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Título *">
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: The Cliff House"
                  className="admin-input"
                />
              </FormField>
              <FormField label="Slug *">
                <input
                  value={slug}
                  onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"))}
                  placeholder="ex: the-cliff-house"
                  disabled={mode === "edit"}
                  className="admin-input disabled:opacity-50"
                />
              </FormField>
              <FormField label="Subtítulo">
                <input
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="Ex: Uma residência entre pedras"
                  className="admin-input"
                />
              </FormField>
              <FormField label="Categoria">
                <input
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Ex: Residencial"
                  className="admin-input"
                />
              </FormField>
              <FormField label="Localização">
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Ex: Sintra, Portugal"
                  className="admin-input"
                />
              </FormField>
              <FormField label="Ano">
                <input
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="Ex: 2024"
                  className="admin-input"
                />
              </FormField>
            </div>
            <FormField label="Imagem de Capa (URL ou upload)">
              <div className="flex gap-2">
                <input
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  placeholder="https://... ou /uploads/..."
                  className="admin-input flex-1"
                />
                <label className="btn-ghost text-xs cursor-pointer flex-shrink-0 flex items-center px-3">
                  Upload
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const url = await uploadImage(file);
                      setCoverImage(url);
                    }}
                  />
                </label>
              </div>
            </FormField>
          </div>

          <hr className="border-[#7A6328]/20 mb-10" />

          {/* Active module editor */}
          {activeModule !== null && modules[activeModule] ? (
            <div>
              <div className="flex items-center justify-between mb-6">
                <p className="font-dm text-[0.6rem] tracking-[0.25em] uppercase text-[#C9A440]">
                  Módulo {activeModule + 1} — {MODULE_LABELS[modules[activeModule].type]}
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => moveModule(activeModule, -1)}
                    disabled={activeModule === 0}
                    className="font-dm text-[0.65rem] text-[#6B6560] hover:text-[#C9A440] disabled:opacity-30 transition-colors"
                  >
                    ↑ Mover
                  </button>
                  <button
                    onClick={() => moveModule(activeModule, 1)}
                    disabled={activeModule === modules.length - 1}
                    className="font-dm text-[0.65rem] text-[#6B6560] hover:text-[#C9A440] disabled:opacity-30 transition-colors"
                  >
                    ↓ Mover
                  </button>
                  <button
                    onClick={() => removeModule(activeModule)}
                    className="font-dm text-[0.65rem] text-red-400/70 hover:text-red-400 transition-colors"
                  >
                    Remover
                  </button>
                </div>
              </div>

              {/* Chapter settings */}
              <div className="mb-6 flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={modules[activeModule].isChapter}
                    onChange={(e) =>
                      updateModule(activeModule, { isChapter: e.target.checked })
                    }
                    className="accent-[#C9A440]"
                  />
                  <span className="font-dm text-[0.7rem] text-[#E0D8CC]">
                    É um capítulo (aparece na sidebar)
                  </span>
                </label>
              </div>

              {modules[activeModule].isChapter && (
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <FormField label="Label do Capítulo">
                    <input
                      value={modules[activeModule].chapterLabel}
                      onChange={(e) =>
                        updateModule(activeModule, { chapterLabel: e.target.value })
                      }
                      placeholder="Ex: I. As Pedras"
                      className="admin-input"
                    />
                  </FormField>
                  <FormField label="Ícone">
                    <select
                      value={modules[activeModule].chapterIcon}
                      onChange={(e) =>
                        updateModule(activeModule, { chapterIcon: e.target.value })
                      }
                      className="admin-input"
                    >
                      {["◆", "●", "○", "▲", "△", "■", "□", "★", "☆", "❝", "→", "⊞", "◫"].map((icon) => (
                        <option key={icon} value={icon}>
                          {icon}
                        </option>
                      ))}
                    </select>
                  </FormField>
                </div>
              )}

              <ModuleEditor
                module={modules[activeModule]}
                onChange={(data) => updateModule(activeModule, { content: data })}
                onUpload={uploadImage}
              />
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="font-dm text-sm text-[#6B6560]">
                Selecione ou adicione um módulo na sidebar
              </p>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="sticky bottom-0 border-t border-[#7A6328]/20 bg-[#0D0B10] px-8 py-4 flex items-center justify-between">
          <label className="flex items-center gap-3 cursor-pointer">
            <div
              onClick={() => setPublished((p) => !p)}
              className={`w-10 h-5 rounded-full transition-colors ${
                published ? "bg-[#C9A440]" : "bg-[#1E1A26]"
              } relative`}
            >
              <div
                className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                  published ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </div>
            <span className="font-dm text-[0.7rem] text-[#E0D8CC]">
              {published ? "Publicado" : "Rascunho"}
            </span>
          </label>
          <div className="flex items-center gap-4">
            {error && <p className="font-dm text-xs text-red-400">{error}</p>}
            <button
              onClick={handleSave}
              disabled={saving || !title || !slug}
              className="btn-gold disabled:opacity-50"
            >
              {saving ? "Salvando..." : mode === "new" ? "Criar Projeto" : "Salvar Alterações"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-dm text-[0.6rem] tracking-[0.2em] uppercase text-[#6B6560]">
        {label}
      </label>
      {children}
    </div>
  );
}
