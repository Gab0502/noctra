import type { Metadata, Viewport } from "next";
import { Noto_Serif, Noto_Serif_Display } from "next/font/google";
import Reveal from "@/components/layout/Reveal";
import "./globals.css";

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  display: "swap",
});

const notoDisplay = Noto_Serif_Display({
  variable: "--font-noto-display",
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "NOCTRA — Architecture studio in Berlin and Oslo",
    template: "%s — NOCTRA",
  },
  description:
    "NOCTRA is an architecture studio in Berlin and Oslo. Each project is told as a volume: its site, its material, its light after dark.",
  openGraph: {
    title: "NOCTRA — Architecture studio in Berlin and Oslo",
    description: "Buildings designed for the hours after dark.",
    siteName: "NOCTRA",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${notoSerif.variable} ${notoDisplay.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          // Marks the page as scripted before paint, so entrances never hide content when JS is off
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
      </head>
      <body className="min-h-svh flex flex-col">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
        <Reveal />
      </body>
    </html>
  );
}
