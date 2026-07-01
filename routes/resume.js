import express from "express";
import { generateResume } from "../ai/resumeAI.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        error: "Prompt is required",
      });
    }

    const result = await generateResume(prompt);

    res.json(result);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: err.message || "Resume generation failed",
    });
  }
});

export default router;
