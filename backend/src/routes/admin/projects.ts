import { Router, Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import { requireAuth } from "../../lib/auth";

const router = Router();

router.use(requireAuth);

router.get("/", async (_req: Request, res: Response) => {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { modules: true } } },
  });
  type Row = { slug: string; title: string; category: string | null; year: string | null; published: boolean; _count: { modules: number } };
  const result = (projects as Row[]).map((p) => ({
    slug: p.slug,
    title: p.title,
    category: p.category,
    year: p.year,
    published: p.published,
    moduleCount: p._count.modules,
  }));
  res.json(result);
});

router.post("/", async (req: Request, res: Response) => {
  const { slug, title, subtitle, category, location, year, coverImage } = req.body;

  if (!slug || !title) {
    res.status(400).json({ error: "Slug e título obrigatórios" });
    return;
  }

  const existing = await prisma.project.findUnique({ where: { slug } });
  if (existing) {
    res.status(409).json({ error: "Slug já existe" });
    return;
  }

  const project = await prisma.project.create({
    data: { slug, title, subtitle, category, location, year, coverImage },
  });
  res.status(201).json(project);
});

router.get("/:slug", async (req: Request, res: Response) => {
  const project = await prisma.project.findUnique({
    where: { slug: req.params.slug },
    include: { modules: { orderBy: { order: "asc" } } },
  });
  if (!project) {
    res.status(404).json({ error: "Não encontrado" });
    return;
  }
  res.json(project);
});

router.put("/:slug", async (req: Request, res: Response) => {
  const { title, subtitle, category, location, year, coverImage, published, craftContent, modules } = req.body;

  const project = await prisma.project.findUnique({ where: { slug: req.params.slug } });
  if (!project) {
    res.status(404).json({ error: "Não encontrado" });
    return;
  }

  await prisma.project.update({
    where: { slug: req.params.slug },
    data: { title, subtitle, category, location, year, coverImage, published, craftContent },
  });

  if (Array.isArray(modules)) {
    await prisma.module.deleteMany({ where: { projectId: project.id } });
    if (modules.length > 0) {
      await prisma.module.createMany({
        data: modules.map(
          (m: {
            type: string;
            order: number;
            isChapter?: boolean;
            chapterLabel?: string;
            chapterIcon?: string;
            content?: object;
          }) => ({
            projectId: project.id,
            type: m.type,
            order: m.order,
            isChapter: m.isChapter ?? false,
            chapterLabel: m.chapterLabel ?? null,
            chapterIcon: m.chapterIcon ?? null,
            content: m.content ?? {},
          })
        ),
      });
    }
  }

  const updated = await prisma.project.findUnique({
    where: { slug: req.params.slug },
    include: { modules: { orderBy: { order: "asc" } } },
  });
  res.json(updated);
});

router.delete("/:slug", async (req: Request, res: Response) => {
  const project = await prisma.project.findUnique({ where: { slug: req.params.slug } });
  if (!project) {
    res.status(404).json({ error: "Não encontrado" });
    return;
  }
  await prisma.project.delete({ where: { slug: req.params.slug } });
  res.json({ ok: true });
});

export default router;
