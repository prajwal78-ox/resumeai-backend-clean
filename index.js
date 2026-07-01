// FILE: server/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Routes
import jobMatchRoute from "./routes/jobMatch.js";
import paymentRoute from "./routes/payment.js";
import resumeRoute from "./routes/resume.js";
import adminRoute from "./routes/admin.js"; // 👈 ADMIN PANEL

dotenv.config();

const app = express();

// ----------------------
// MIDDLEWARE
// ----------------------
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ----------------------
// HEALTH CHECK
// ----------------------
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 ResumeAI Server Running",
    version: "2.0.0",
  });
});

// ----------------------
// API ROUTES
// ----------------------
app.use("/api/job-match", jobMatchRoute);
app.use("/api/payment", paymentRoute);
app.use("/api/resume", resumeRoute);
app.use("/api/admin", adminRoute);

// ----------------------
// 404 HANDLER
// ----------------------
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ----------------------
// ERROR HANDLER
// ----------------------
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err);

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ----------------------
// START SERVER
// ----------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("==================================");
  console.log("🚀 ResumeAI Backend Started");
  console.log(`🌐 http://localhost:${PORT}`);
  console.log("==================================");
});
