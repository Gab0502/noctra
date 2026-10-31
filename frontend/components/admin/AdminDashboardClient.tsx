"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

type ProjectSummary = {
  slug: string;
  title: string;
  category: string | null;
  year: string | null;
  published: boolean;
  moduleCount: number;
};

export default function AdminDashboardClient() {
  const [projects, setProjects] = useState<ProjectSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/admin/projects`, { credentials: "include" })
      .then((r) => r.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div>
      <header className="border-b border-[#7A6328]/20 px-8 py-5 flex items-center justify-between">
        <div>
          <span className="font-cinzel text-[1.1rem] tracking-[0.2em] text-[#C9A440]">NOCTRA</span>
          <span className="font-dm text-[0.6rem] tracking-[0.25em] uppercase text-[#6B6560] ml-4">
            Admin
          </span>
        </div>
        <LogoutButton />
      </header>

      <main className="max-w-5xl mx-auto px-8 py-12">
        <div className="flex items-center justify-between mb-10">
          <h1 className="font-cormorant text-[2rem] font-light text-[#F2EDE4]">Projetos</h1>
          <Link href="/admin/projects/new" className="btn-gold text-sm">
            + Novo Projeto
          </Link>
        </div>

        <div className="flex flex-col gap-px border border-[#7A6328]/20">
          {loading && (
            <div className="px-6 py-10 text-center font-dm text-sm text-[#6B6560]">
              Carregando...
            </div>
          )}
          {!loading && projects.length === 0 && (
            <div className="px-6 py-10 text-center font-dm text-sm text-[#6B6560]">
              Nenhum projeto criado ainda.
            </div>
          )}
          {projects.map((p) => (
            <Link
              key={p.slug}
              href={`/admin/projects/${p.slug}`}
              className="flex items-center justify-between px-6 py-4 bg-[#1E1A26]/40 hover:bg-[#1E1A26] transition-colors"
            >
              <div>
                <p className="font-cormorant text-[1.1rem] text-[#F2EDE4]">{p.title}</p>
                <p className="font-dm text-[0.65rem] tracking-[0.2em] uppercase text-[#6B6560] mt-1">
                  {p.category} · {p.year} · {p.moduleCount} módulos
                </p>
              </div>
              <span
                className={`font-dm text-[0.6rem] tracking-[0.2em] uppercase px-3 py-1 border ${
                  p.published
                    ? "border-[#C9A440]/40 text-[#C9A440]"
                    : "border-[#6B6560]/40 text-[#6B6560]"
                }`}
              >
                {p.published ? "Publicado" : "Rascunho"}
              </span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
