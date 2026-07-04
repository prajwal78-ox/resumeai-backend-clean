import { askAI } from "../services/openrouter.service.js";

export const analyzeATS = async (req, res) => {
  try {
    const { resume } = req.body;

    const prompt = `
Analyze this resume for ATS scoring:

${JSON.stringify(resume)}

Return:
- score out of 100
- strengths
- weaknesses
- improvements
`;

    const result = await askAI(prompt);

    res.json({
      success: true,
      analysis: result,
    });

  } catch (err) {
    res.json({
      success: false,
      analysis: {
        score: 0,
        message: "ATS analysis failed safely",
      },
    });
  }
};
