"use client";

import type { ModuleData } from "./ProjectForm";

type Props = {
  module: ModuleData;
  onChange: (content: Record<string, unknown>) => void;
  onUpload: (file: File) => Promise<string>;
};

export default function ModuleEditor({ module, onChange, onUpload }: Props) {
  const c = module.content as Record<string, string>;

  function set(key: string, value: string) {
    onChange({ ...module.content, [key]: value });
  }

  async function handleUpload(key: string, file: File) {
    const url = await onUpload(file);
    set(key, url);
  }

  switch (module.type) {
    case "chapter-hero":
      return (
        <div className="flex flex-col gap-4">
          <ImageField
            label="Imagem de Fundo"
            value={c.image ?? ""}
            onChange={(v) => set("image", v)}
            onUpload={(f) => handleUpload("image", f)}
          />
          <TextField label="Título do Capítulo" value={c.title ?? ""} onChange={(v) => set("title", v)} />
          <TextField label="Subtítulo / Número" value={c.number ?? ""} onChange={(v) => set("number", v)} />
        </div>
      );

    case "split-text-image":
      return (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="admin-label mb-3">Lado da Imagem</p>
              <select
                value={c.imagePosition ?? "right"}
                onChange={(e) => set("imagePosition", e.target.value)}
                className="admin-input"
              >
                <option value="right">Imagem à direita</option>
                <option value="left">Imagem à esquerda</option>
              </select>
            </div>
          </div>
          <ImageField
            label="Imagem"
            value={c.image ?? ""}
            onChange={(v) => set("image", v)}
            onUpload={(f) => handleUpload("image", f)}
          />
          <TextField label="Label / Etiqueta" value={c.label ?? ""} onChange={(v) => set("label", v)} />
          <TextField label="Título" value={c.title ?? ""} onChange={(v) => set("title", v)} />
          <TextareaField label="Texto" value={c.body ?? ""} onChange={(v) => set("body", v)} />
        </div>
      );

    case "full-bleed-image":
      return (
        <div className="flex flex-col gap-4">
          <ImageField
            label="Imagem"
            value={c.image ?? ""}
            onChange={(v) => set("image", v)}
            onUpload={(f) => handleUpload("image", f)}
          />
          <TextField label="Legenda (opcional)" value={c.caption ?? ""} onChange={(v) => set("caption", v)} />
          <div>
            <p className="admin-label mb-2">Altura</p>
            <select
              value={c.height ?? "screen"}
              onChange={(e) => set("height", e.target.value)}
              className="admin-input"
            >
              <option value="screen">Tela cheia (100vh)</option>
              <option value="large">Grande (75vh)</option>
              <option value="medium">Médio (50vh)</option>
            </select>
          </div>
        </div>
      );

    case "material-grid":
      return (
        <div className="flex flex-col gap-4">
          <TextField label="Título da Seção" value={c.title ?? ""} onChange={(v) => set("title", v)} />
          <p className="admin-label">Imagens (até 6)</p>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <ImageField
              key={i}
              label={`Material ${i + 1}`}
              value={(c[`image${i}`] as string) ?? ""}
              onChange={(v) => set(`image${i}`, v)}
              onUpload={(f) => handleUpload(`image${i}`, f)}
            />
          ))}
        </div>
      );

    case "text-block":
      return (
        <div className="flex flex-col gap-4">
          <TextField label="Label (opcional)" value={c.label ?? ""} onChange={(v) => set("label", v)} />
          <TextField label="Título (opcional)" value={c.title ?? ""} onChange={(v) => set("title", v)} />
          <TextareaField label="Texto" value={c.body ?? ""} onChange={(v) => set("body", v)} rows={8} />
          <div>
            <p className="admin-label mb-2">Alinhamento</p>
            <select
              value={c.align ?? "left"}
              onChange={(e) => set("align", e.target.value)}
              className="admin-input"
            >
              <option value="left">Esquerda</option>
              <option value="center">Centro</option>
            </select>
          </div>
        </div>
      );

    case "quote":
      return (
        <div className="flex flex-col gap-4">
          <TextareaField label="Citação" value={c.quote ?? ""} onChange={(v) => set("quote", v)} />
          <TextField label="Autor / Fonte (opcional)" value={c.author ?? ""} onChange={(v) => set("author", v)} />
        </div>
      );

    case "gallery":
      return (
        <div className="flex flex-col gap-4">
          <TextField label="Título (opcional)" value={c.title ?? ""} onChange={(v) => set("title", v)} />
          <p className="admin-label">Imagens (até 8)</p>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <ImageField
              key={i}
              label={`Imagem ${i + 1}`}
              value={(c[`image${i}`] as string) ?? ""}
              onChange={(v) => set(`image${i}`, v)}
              onUpload={(f) => handleUpload(`image${i}`, f)}
            />
          ))}
        </div>
      );

    case "cta":
      return (
        <div className="flex flex-col gap-4">
          <TextField label="Título" value={c.title ?? ""} onChange={(v) => set("title", v)} />
          <TextField label="Subtítulo" value={c.subtitle ?? ""} onChange={(v) => set("subtitle", v)} />
          <TextField label="Texto do Botão" value={c.buttonText ?? ""} onChange={(v) => set("buttonText", v)} />
          <TextField label="Link do Botão" value={c.buttonHref ?? ""} onChange={(v) => set("buttonHref", v)} />
        </div>
      );
  }
}

function TextField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="admin-label">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="admin-input"
      />
    </div>
  );
}

function TextareaField({
  label,
  value,
  onChange,
  rows = 5,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="admin-label">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="admin-input resize-y"
      />
    </div>
  );
}

function ImageField({
  label,
  value,
  onChange,
  onUpload,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onUpload: (f: File) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="admin-label">{label}</label>
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="URL ou /uploads/..."
          className="admin-input flex-1"
        />
        <label className="btn-ghost text-xs cursor-pointer flex-shrink-0 flex items-center px-3">
          Upload
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) onUpload(f);
            }}
          />
        </label>
      </div>
      {value && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="" className="mt-1 h-24 object-cover opacity-70" />
      )}
    </div>
  );
}
