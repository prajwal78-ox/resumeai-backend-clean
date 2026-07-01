import express from "express";
import { generateATSScore } from "../ai/atsEngine.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { resume, jobDescription } = req.body;

    if (!resume || !jobDescription) {
      return res.status(400).json({
        error: "Resume and Job Description required",
      });
    }

    const result = await generateATSScore(resume, jobDescription);

    res.json(result);
  } catch (err) {
    console.error("ATS Error:", err);
    res.status(500).json({ error: "ATS analysis failed" });
  }
});

export default router;
