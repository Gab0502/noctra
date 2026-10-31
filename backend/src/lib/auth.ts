import { SignJWT, jwtVerify } from "jose";
import { Request, Response, NextFunction } from "express";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "noctra-cms-secret-change-in-production"
);

export async function signToken(userId: string): Promise<string> {
  return new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifyToken(token: string): Promise<{ userId: string } | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return { userId: payload.userId as string };
  } catch {
    return null;
  }
}

export function setSessionCookie(res: Response, token: string) {
  res.cookie("noctra_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7 * 1000,
    path: "/",
  });
}

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.noctra_session;
  if (!token) {
    res.status(401).json({ error: "Não autorizado" });
    return;
  }
  const payload = await verifyToken(token);
  if (!payload) {
    res.status(401).json({ error: "Sessão inválida" });
    return;
  }
  (req as Request & { userId: string }).userId = payload.userId;
  next();
}
