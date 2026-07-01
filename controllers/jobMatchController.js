import { analyzeJobMatchAI } from "../ai/jobMatchAI.js";

export const analyzeJobMatch = async (req, res) => {
  try {
    const { resume, jobDescription } = req.body;

    const result = await analyzeJobMatchAI(resume, jobDescription);

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      score: 0,
      matchingSkills: [],
      missingSkills: [],
      suggestions: ["Server error"],
    });
  }
};
