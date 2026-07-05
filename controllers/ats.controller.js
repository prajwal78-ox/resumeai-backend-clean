import { askAI } from "../services/openrouter.service.js";

export const analyzeATS = async (req, res) => {
  try {
    const { resume } = req.body;

    const prompt = `
You are an ATS system.

Analyze this resume and give:
1. ATS Score (0-100)
2. Missing skills
3. Improvements

Resume:
${resume}
`;

    const result = await askAI(prompt);

    res.json({
      success: true,
      result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "ATS failed",
    });
  }
};
