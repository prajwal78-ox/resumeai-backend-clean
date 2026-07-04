import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import aiRoutes from "./routes/ai.routes.js";
import experienceRoutes from "./routes/experience.routes.js";
import atsRoutes from "./routes/ats.routes.js";

dotenv.config();

const app = express();

/* -----------------------------
   Middleware
------------------------------ */
app.use(cors());
app.use(express.json());

/* -----------------------------
   Health Check Routes
------------------------------ */
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 ResumeAI Backend is Live",
    status: "running",
    timestamp: new Date().toISOString(),
  });
});

app.get("/debug", (req, res) => {
  res.json({
    success: true,
    message: "Backend working correctly",
  });
});

/* -----------------------------
   API Routes
------------------------------ */

// AI Routes (Summary, etc.)
app.use("/api/ai", aiRoutes);

// Experience AI
app.use("/api/experience", experienceRoutes);

// ATS Analyzer
app.use("/api/ats", atsRoutes);

/* -----------------------------
   404 Handler
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
   Start Server
------------------------------ */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 ResumeAI Server running on port ${PORT}`);
});
