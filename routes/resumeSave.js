import express from "express";
import Resume from "../models/Resume.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// SAVE resume
router.post("/", auth, async (req, res) => {
  try {
    const resume = await Resume.create({
      userId: req.user.id,
      ...req.body,
    });

    res.json({
      success: true,
      resume,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Failed to save resume",
    });
  }
});

// GET all resumes for user
router.get("/", auth, async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      resumes,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch resumes",
    });
  }
});

export default router;
