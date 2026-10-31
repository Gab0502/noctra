import { Router, Request, Response } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  const projects = await prisma.project.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    select: {
      slug: true,
      title: true,
      subtitle: true,
      category: true,
      location: true,
      year: true,
      coverImage: true,
    },
  });
  res.json(projects);
});

router.get("/:slug", async (req: Request, res: Response) => {
  const project = await prisma.project.findUnique({
    where: { slug: req.params.slug, published: true },
    include: { modules: { orderBy: { order: "asc" } } },
  });
  if (!project) {
    res.status(404).json({ error: "Não encontrado" });
    return;
  }
  res.json(project);
});

export default router;
