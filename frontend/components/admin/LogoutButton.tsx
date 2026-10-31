"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
    await fetch(`${API}/api/auth/logout`, { method: "POST", credentials: "include" });
    router.push("/admin/login");
  }

  return (
    <button
      onClick={handleLogout}
      className="font-dm text-[0.65rem] tracking-[0.2em] uppercase text-[#6B6560] hover:text-[#C9A440] transition-colors"
    >
      Sair
    </button>
  );
}
