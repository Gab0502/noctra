import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MonumentHero from "@/components/home/MonumentHero";
import Foreword from "@/components/home/Foreword";
import Volumes from "@/components/home/Volumes";
import Marquee from "@/components/home/Marquee";
import StudioNote from "@/components/home/StudioNote";
import Visit from "@/components/home/Visit";
import { getProjects } from "@/lib/projects";

// VOLUME I — NOCTRA: the library. Every project on the shelf is a volume of its own.
export default async function Home() {
  const { projects } = await getProjects();

  return (
    <>
      <Navbar />
      <main id="main" className="flex flex-col flex-1">
        <MonumentHero />
        <Foreword />
        <Volumes projects={projects.slice(0, 6)} />
        <Marquee />
        <StudioNote />
        <Visit />
      </main>
      <Footer />
    </>
  );
}
