"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PageBuilder from "@/components/editor/PageBuilder";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export default function EditProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<null | Record<string, unknown>>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`${API}/api/admin/projects/${slug}`, { credentials: "include" })
      .then(async (r) => {
        if (r.status === 404) { setNotFound(true); return; }
        setProject(await r.json());
      })
      .catch(() => setNotFound(true));
  }, [slug]);

  if (notFound) return <div className="min-h-screen flex items-center justify-center"><p className="font-dm text-sm text-[#6B6560]">Projeto não encontrado.</p></div>;
  if (!project) return <div className="min-h-screen flex items-center justify-center"><p className="font-dm text-sm text-[#6B6560]">Carregando...</p></div>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <PageBuilder mode="edit" project={project as any} />;
}
