"use client";

import { useState } from "react";
import { useEditor } from "@craftjs/core";
import { COLOR_PRESETS, type BackgroundProps } from "./types";

export function FieldSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-[#7A6328]/20 last:border-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-3 px-4 text-left group"
      >
        <span className="font-dm text-[0.7rem] tracking-[0.2em] uppercase text-[#E0D8CC] group-hover:text-[#F2EDE4] transition-colors">
          {title}
        </span>
        <span
          className={`text-[#6B6560] text-[0.55rem] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          ▼
        </span>
      </button>
      {open && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
}

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export default function PropertiesPanel() {
  const { selected, actions } = useEditor((state) => {
    const [id] = state.events.selected;
    if (!id) return { selected: null };
    const node = state.nodes[id];
    return {
      selected: {
        id,
        name: node.data.displayName ?? node.data.name,
        props: node.data.props,
        related: node.related,
      },
    };
  });

  if (!selected) {
    return (
      <aside className="w-64 flex-shrink-0 border-l border-[#7A6328]/20 bg-[#0D0B10] flex flex-col items-center justify-center">
        <p className="font-dm text-[0.65rem] tracking-[0.2em] uppercase text-[#6B6560] text-center px-6">
          Selecione um elemento para editar
        </p>
      </aside>
    );
  }

  const { id, name, related } = selected;
  const SettingsPanel = related?.toolbar;

  return (
    <aside className="w-64 flex-shrink-0 border-l border-[#7A6328]/20 bg-[#0D0B10] overflow-y-auto">
      <div className="px-4 py-4 border-b border-[#7A6328]/20">
        <p className="font-dm text-[0.55rem] tracking-[0.25em] uppercase text-[#C9A440]">
          Propriedades
        </p>
        <p className="font-cormorant text-[0.95rem] text-[#F2EDE4] mt-1">{name}</p>
      </div>

      <div className="py-1">
        {SettingsPanel ? (
          <SettingsPanel
            setProp={(cb: (props: Record<string, unknown>) => void) =>
              actions.setProp(id, cb)
            }
          />
        ) : (
          <p className="font-dm text-xs text-[#6B6560] px-4 py-4">Sem propriedades configuráveis.</p>
        )}
      </div>

      <div className="px-4 py-4 border-t border-[#7A6328]/20">
        <button
          onClick={() => actions.delete(id)}
          className="w-full font-dm text-[0.6rem] tracking-[0.2em] uppercase text-red-400/60 hover:text-red-400 transition-colors py-2 border border-red-400/20 hover:border-red-400/40"
        >
          Remover elemento
        </button>
      </div>
    </aside>
  );
}

// ── Shared field components used inside SettingsPanel ──

export function FieldText({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="mb-4">
      <label className="admin-label block mb-1">{label}</label>
      <input
        type="text"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className="admin-input w-full"
      />
    </div>
  );
}

export function FieldTextarea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="mb-4">
      <label className="admin-label block mb-1">{label}</label>
      <textarea
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="admin-input w-full resize-y"
      />
    </div>
  );
}

export function FieldSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="mb-4">
      <label className="admin-label block mb-1">{label}</label>
      <select value={value ?? ""} onChange={(e) => onChange(e.target.value)} className="admin-input w-full">
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function FieldRange({
  label,
  value,
  min,
  max,
  step = 1,
  unit = "",
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (v: number) => void;
}) {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1">
        <label className="admin-label">{label}</label>
        <span className="font-dm text-[0.65rem] text-[#C9A440]">
          {value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value ?? min}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[#C9A440]"
      />
    </div>
  );
}

export function FieldColor({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="mb-4">
      <label className="admin-label block mb-2">{label}</label>
      <div className="flex flex-wrap gap-1.5 mb-2">
        {COLOR_PRESETS.map((c) => (
          <button
            key={c.value}
            title={c.label}
            onClick={() => onChange(c.value)}
            style={{ backgroundColor: c.value }}
            className={`w-5 h-5 rounded-full border-2 transition-all ${
              value === c.value ? "border-[#C9A440] scale-125" : "border-transparent"
            }`}
          />
        ))}
      </div>
      <input
        type="color"
        value={value ?? "#F2EDE4"}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-7 cursor-pointer bg-transparent border border-[#7A6328]/30"
      />
    </div>
  );
}

export function FieldImage({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  async function handleUpload(file: File) {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch(`${API}/api/admin/upload`, {
      method: "POST",
      credentials: "include",
      body: fd,
    });
    const data = await res.json();
    if (data.url) onChange(data.url);
  }

  return (
    <div className="mb-4">
      <label className="admin-label block mb-1">{label}</label>
      <div className="flex gap-1 mb-1">
        <input
          type="text"
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="URL ou upload"
          className="admin-input flex-1 text-xs"
        />
        <label className="btn-ghost text-[0.6rem] cursor-pointer px-2 flex items-center flex-shrink-0">
          ↑
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleUpload(f);
            }}
          />
        </label>
      </div>
      {value && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="" className="w-full h-20 object-cover opacity-60 mt-1" />
      )}
    </div>
  );
}

const CHAPTER_ICONS = [
  "◆", "●", "○", "▲", "■", "★", "→", "◈", "◉", "△",
  "▷", "❝", "⊞", "◐", "◑", "◇",
  "I", "II", "III", "IV", "V", "VI",
];

export function FieldIconPicker({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="mb-4">
      <label className="admin-label block mb-2">{label}</label>
      <div className="flex flex-wrap gap-1">
        {CHAPTER_ICONS.map((icon) => (
          <button
            key={icon}
            onClick={() => onChange(icon)}
            className={`w-8 h-8 flex items-center justify-center border text-sm transition-all ${
              value === icon
                ? "border-[#C9A440] text-[#C9A440] bg-[#C9A440]/10"
                : "border-[#7A6328]/30 text-[#6B6560] hover:border-[#7A6328] hover:text-[#E0D8CC]"
            }`}
          >
            {icon}
          </button>
        ))}
      </div>
    </div>
  );
}

export function BackgroundFields({
  props,
  setProp,
}: {
  props: BackgroundProps;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setProp: (cb: (p: any) => void) => void;
}) {
  return (
    <>
      <FieldColor
        label="Cor de fundo"
        value={props.bgColor ?? ""}
        onChange={(v) => setProp((p) => { p.bgColor = v; })}
      />
      <FieldRange
        label="Opacidade da cor"
        value={props.bgOpacity ?? 100}
        min={0}
        max={100}
        step={5}
        unit="%"
        onChange={(v) => setProp((p) => { p.bgOpacity = v; })}
      />
      <FieldImage
        label="Imagem de fundo"
        value={props.bgImage ?? ""}
        onChange={(v) => setProp((p) => { p.bgImage = v; })}
      />
      {props.bgImage && (
        <>
          <FieldColor
            label="Cor de sobreposição"
            value={props.overlayColor ?? "#000000"}
            onChange={(v) => setProp((p) => { p.overlayColor = v; })}
          />
          <FieldRange
            label="Opacidade da sobreposição"
            value={props.overlayOpacity ?? 50}
            min={0}
            max={100}
            step={5}
            unit="%"
            onChange={(v) => setProp((p) => { p.overlayOpacity = v; })}
          />
        </>
      )}
    </>
  );
}

export function FieldToggle({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <label className="admin-label">{label}</label>
      <button
        onClick={() => onChange(!value)}
        className={`w-9 h-5 rounded-full transition-colors relative ${value ? "bg-[#C9A440]" : "bg-[#1E1A26]"}`}
      >
        <div
          className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
            value ? "translate-x-4" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}
