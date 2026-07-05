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

/* MIDDLEWARE */
import { apiLimiter } from "./middleware/rateLimit.js";

/* =========================
   ENV CONFIG
========================= */
dotenv.config();

/* =========================
   INIT APP
========================= */
const app = express();

/* =========================
   SECURITY / MIDDLEWARE
========================= */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://resumeai-5678.web.app",
      "https://resumeai-backend-clean.onrender.com",
    ],
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(apiLimiter);

/* =========================
   HEALTH CHECK
========================= */
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 ResumeAI Backend Running",
    status: "OK",
  });
});

/* =========================
   DATABASE CONNECTION
========================= */
connectDB();

/* =========================
   API ROUTES
========================= */
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/ats", atsRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/resume", resumeRoutes);

/* payments */
app.use("/api/payments", paymentRoutes);
app.use("/api/billing", billingRoutes);
app.use("/api/upi", upiRoutes);

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
   GLOBAL ERROR HANDLER
========================= */
app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

/* =========================
   START SERVER
========================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 ResumeAI SaaS running on port ${PORT}`);
});
