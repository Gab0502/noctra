import { Router, Request, Response } from "express";
import multer from "multer";
import path from "path";
import { requireAuth } from "../../lib/auth";

const router = Router();

const storage = multer.diskStorage({
  destination: path.join(process.cwd(), "public", "uploads"),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Apenas imagens são aceitas"));
  },
});

router.post(
  "/",
  requireAuth,
  upload.single("file"),
  (req: Request, res: Response) => {
    if (!req.file) {
      res.status(400).json({ error: "Nenhum arquivo enviado" });
      return;
    }
    const url = `${process.env.BACKEND_URL ?? `http://localhost:${process.env.PORT ?? 4000}`}/uploads/${req.file.filename}`;
    res.json({ url });
  }
);

export default router;
