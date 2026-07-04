import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import aiRoutes from "./routes/ai.routes.js";
import experienceRoutes from "./routes/experience.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

/* -----------------------------
   Health Routes
------------------------------ */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 ResumeAI Backend is Live",
    status: "running",
    version: "2.0.0",
    timestamp: new Date().toISOString(),
  });
});

app.get("/debug", (req, res) => {
  res.json({
    success: true,
    message: "Latest backend is running successfully",
  });
});

/* -----------------------------
   API Routes
------------------------------ */

app.use("/api/ai", aiRoutes);
app.use("/api/experience", experienceRoutes);

/* -----------------------------
   404 Route
------------------------------ */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl,
    method: req.method,
  });
});

/* -----------------------------
   Server
------------------------------ */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 ResumeAI Server running on port ${PORT}`);
});
