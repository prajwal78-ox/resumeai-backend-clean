import express from "express";
import { generateResume } from "../ai/resumeAI.js";
import { success, error } from "../utils/apiResponse.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return error(res, "Prompt required", 400);
    }

    const result = await generateResume(prompt);

    return success(res, result);
  } catch (err) {
    return error(res, "Resume generation failed");
  }
});

export default router;
