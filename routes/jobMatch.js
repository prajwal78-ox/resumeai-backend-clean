import express from "express";
import { analyzeJobMatchAI } from "../ai/jobMatchAI.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { resume, jobDescription } = req.body;

    const result = await analyzeJobMatchAI(resume, jobDescription);

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

export default router;
