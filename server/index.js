import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Routes
import jobMatchRoute from "./routes/jobMatch.js";
import paymentRoute from "./routes/payment.js";
import atsRoute from "./routes/ats.js";
import resumeRoute from "./routes/resume.js";

dotenv.config();

const app = express();

/* ---------------- MIDDLEWARE ---------------- */

app.use(
  cors({
    origin: "*", // IMPORTANT for mobile/termux testing
    methods: ["GET", "POST"],
  })
);

app.use(express.json({ limit: "10mb" }));

/* ---------------- ROUTES ---------------- */

app.use("/api/job-match", jobMatchRoute);
app.use("/api/payment", paymentRoute);
app.use("/api/ats", atsRoute);
app.use("/api/resume", resumeRoute);

/* ---------------- HEALTH CHECK ---------------- */

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "🚀 ResumeAI Server Running",
    routes: ["/api/job-match", "/api/ats", "/api/resume", "/api/payment"],
  });
});

/* ---------------- ERROR HANDLER ---------------- */

app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.message);

  res.status(500).json({
    error: "Internal Server Error",
    message: err.message,
  });
});

/* ---------------- START SERVER ---------------- */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
