import express from "express";
import { generateExperienceBullets } from "../ai/resumeAI.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { experience } = req.body;

    if (!experience) {
      return res.status(400).json({
        error: "Experience is required",
      });
    }

    const result = await generateExperienceBullets(experience);

    res.json(result);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: err.message,
    });
  }
});

export default router;
