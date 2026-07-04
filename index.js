import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { apiLimiter } from "./middleware/rateLimit.js";

// Routes
import authRoutes from "./routes/auth.routes.js";
import aiRoutes from "./routes/ai.routes.js";
import atsRoutes from "./routes/ats.routes.js";
import experienceRoutes from "./routes/experience.routes.js";
import resumeRoutes from "./routes/resume.js";
import billingRoutes from "./routes/billing.routes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Global API rate limiter
app.use("/api", apiLimiter);

// Health check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 ResumeAI SaaS Backend Running",
    version: "1.0.0"
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/ats", atsRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/billing", billingRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found"
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    success: false,
    message: "Internal Server Error"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 ResumeAI SaaS Backend running on port ${PORT}`);
});
