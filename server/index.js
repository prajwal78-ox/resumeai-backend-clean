import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Routes
import jobMatchRoute from "./routes/jobMatch.js";
import paymentRoute from "./routes/payment.js";
import resumeRoute from "./routes/resume.js";
import atsRoute from "./routes/ats.js";
import upiPaymentRoute from "./routes/upiPayment.js";

dotenv.config();

const app = express();

// ----------------------
// Middlewares
// ----------------------
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: false,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ----------------------
// Health Check Route
// ----------------------
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 ResumeAI Backend is Live",
    status: "running",
    timestamp: new Date().toISOString(),
  });
});

// ----------------------
// API Routes
// ----------------------
app.use("/api/job-match", jobMatchRoute);
app.use("/api/payment", paymentRoute);
app.use("/api/resume", resumeRoute);
app.use("/api/ats", atsRoute);
app.use("/api/upi", upiPaymentRoute);

// ----------------------
// 404 Handler
// ----------------------
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ----------------------
// Global Error Handler
// ----------------------
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: err.message,
  });
});

// ----------------------
// Start Server
// ----------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("==================================");
  console.log("🚀 ResumeAI Backend Started");
  console.log(`🌐 Port: ${PORT}`);
  console.log("==================================");
});
