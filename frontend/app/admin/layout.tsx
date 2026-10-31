import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NOCTRA Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="bg-[#0D0B10] text-[#E0D8CC] min-h-screen">{children}</div>;
}
