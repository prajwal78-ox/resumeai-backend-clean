import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";

/* ROUTES */
import authRoutes from "./routes/auth.routes.js";
import aiRoutes from "./routes/ai.routes.js";
import atsRoutes from "./routes/ats.routes.js";
import experienceRoutes from "./routes/experience.routes.js";
import resumeRoutes from "./routes/resume.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import billingRoutes from "./routes/billing.routes.js";

import { apiLimiter } from "./middleware/rateLimit.js";

/* ENV */
dotenv.config();

/* INIT APP */
const app = express();

/* =========================
   MIDDLEWARE (ORDER MATTERS)
========================= */
app.use(cors());
app.use(express.json());
app.use(apiLimiter);

/* =========================
   HEALTH CHECK
========================= */
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 ResumeAI SaaS Backend Running",
    status: "OK",
  });
});

/* =========================
   DATABASE CONNECTION
========================= */
connectDB();

/* =========================
   ROUTES
========================= */
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/ats", atsRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/billing", billingRoutes);

/* =========================
   404 HANDLER
========================= */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/* =========================
   START SERVER
========================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 ResumeAI SaaS Backend running on port ${PORT}`);
});
