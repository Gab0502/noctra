import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";
import { signToken, setSessionCookie } from "../lib/auth";

const router = Router();

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Email e senha obrigatórios" });
    return;
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    res.status(401).json({ error: "Credenciais inválidas" });
    return;
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    res.status(401).json({ error: "Credenciais inválidas" });
    return;
  }

  const token = await signToken(user.id);
  setSessionCookie(res, token);
  res.json({ ok: true });
});

router.post("/logout", (_req: Request, res: Response) => {
  res.clearCookie("noctra_session", { path: "/" });
  res.json({ ok: true });
});

export default router;
