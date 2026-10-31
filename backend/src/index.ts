import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import authRoutes from "./routes/auth";
import projectsRoutes from "./routes/projects";
import adminProjectsRoutes from "./routes/admin/projects";
import adminUploadRoutes from "./routes/admin/upload";

const app = express();
const PORT = Number(process.env.PORT ?? 4000);
const FRONTEND_URL = process.env.FRONTEND_URL ?? "http://localhost:3000";

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static(path.join(process.cwd(), "public", "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/admin/projects", adminProjectsRoutes);
app.use("/api/admin/upload", adminUploadRoutes);

app.listen(PORT, () => {
  console.log(`NOCTRA backend running on http://localhost:${PORT}`);
});
