import express from "express";
import { generateJobMatch } from "../ai/jobMatchAI.js";
import { success, error } from "../utils/apiResponse.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { resume, jobDescription } = req.body;

    if (!resume || !jobDescription) {
      return error(res, "Missing fields", 400);
    }

    const result = await generateJobMatch(resume, jobDescription);

    return success(res, result);
  } catch (err) {
    return error(res, "Job match failed");
  }
});

export default router;
