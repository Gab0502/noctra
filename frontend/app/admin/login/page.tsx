"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
    const res = await fetch(`${API}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      const data = await res.json();
      setError(data.error ?? "Erro ao fazer login");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#0D0B10] flex items-center justify-center">
      <div className="w-full max-w-sm px-8">
        <div className="mb-10 text-center">
          <p className="font-cinzel text-[1.6rem] tracking-[0.2em] text-[#C9A440]">NOCTRA</p>
          <p className="font-dm text-[0.6rem] tracking-[0.3em] uppercase text-[#6B6560] mt-2">
            Admin CMS
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-[#1E1A26] border border-[#7A6328]/30 text-[#E0D8CC] font-dm text-sm px-4 py-3 focus:outline-none focus:border-[#C9A440]/60 placeholder-[#6B6560]"
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-[#1E1A26] border border-[#7A6328]/30 text-[#E0D8CC] font-dm text-sm px-4 py-3 focus:outline-none focus:border-[#C9A440]/60 placeholder-[#6B6560]"
          />
          {error && (
            <p className="font-dm text-xs text-red-400">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="btn-gold mt-2 disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
