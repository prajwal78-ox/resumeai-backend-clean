import { callOpenRouter } from "../services/openrouter.service.js";

/* ✅ SUMMARY AI */
export const improveSummary = async (req, res) => {
  try {
    const { summary } = req.body;

    const prompt = `
Improve this resume summary:
${summary}

Return only improved text.
`;

    const result = await callOpenRouter(prompt);

    return res.json({
      success: true,
      summary: result
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Summary AI failed",
      error: err.message
    });
  }
};

/* ✅ ATS ANALYZER */
export const analyzeATS = async (req, res) => {
  try {
    const { resume } = req.body;

    const prompt = `
You are an ATS expert.

Analyze this resume:
${JSON.stringify(resume)}

Return JSON:
{
  "score": number,
  "summary": string,
  "strengths": [],
  "improvements": []
}
`;

    const result = await callOpenRouter(prompt);

    return res.json({
      success: true,
      analysis: JSON.parse(result)
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "ATS analysis failed",
      error: err.message
    });
  }
};
