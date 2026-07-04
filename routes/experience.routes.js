import express from "express";
import { rewriteExperience } from "../controllers/experience.controller.js";

const router = express.Router();

// AI Experience Rewrite
router.post("/rewrite", rewriteExperience);

// Health check
router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Experience AI route is working",
  });
});

export default router;
