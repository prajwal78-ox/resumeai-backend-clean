import express from "express";
import { improveSummary } from "../controllers/ai.controller.js";

const router = express.Router();

// Test route
router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "AI routes are working",
  });
});

// Summary route
router.post("/summary", improveSummary);

export default router;
