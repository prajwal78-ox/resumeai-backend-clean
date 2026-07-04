import { callOpenRouter } from "../services/openrouter.service.js";

export const analyzeATS = async (req, res) => {
  try {
    const { resume } = req.body;

    const prompt = `
You are an ATS resume analyzer.

Analyze this resume:
${JSON.stringify(resume)}

Return JSON with:
- score (0-100)
- summary
- strengths (array)
- improvements (array)
`;

    const aiResponse = await callOpenRouter(prompt);

    const parsed = JSON.parse(aiResponse);

    return res.json({
      success: true,
      analysis: parsed
    });

  } catch (err) {
    console.log("ATS ERROR:", err.message);

    return res.status(500).json({
      success: false,
      message: "ATS analysis failed",
      error: err.message
    });
  }
};
