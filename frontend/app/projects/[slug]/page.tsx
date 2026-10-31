import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProjectPage from "@/components/project/ProjectPage";
import { getProject, getProjects } from "@/lib/projects";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Volume not found" };
  return {
    title: project.title,
    description: project.subtitle ?? `${project.title}, a NOCTRA project in ${project.location ?? "Europe"}.`,
  };
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [project, { projects }] = await Promise.all([getProject(slug), getProjects()]);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects.length > 1 ? projects[(index + 1) % projects.length] : null;
  const number = index >= 0 ? index + 1 : null;

  return (
    <>
      <Navbar />
      <ProjectPage project={project} next={next && next.slug !== project.slug ? next : null} number={number} />
      <Footer />
    </>
  );
}
