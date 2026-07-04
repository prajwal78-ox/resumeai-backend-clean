import { callOpenRouter } from "../services/openrouter.service.js";

/* =========================
   SUMMARY AI
========================= */
export const improveSummary = async (req, res) => {
  try {
    const { summary } = req.body;

    if (!summary) {
      return res.status(400).json({
        success: false,
        message: "Summary is required",
      });
    }

    const prompt = `
Improve this resume summary in a professional way:

"${summary}"

Return only the improved summary text. No explanations.
`;

    const result = await callOpenRouter(prompt);

    if (!result) {
      throw new Error("Empty AI response");
    }

    return res.json({
      success: true,
      summary: result,
    });
  } catch (err) {
    console.error("🔥 SUMMARY AI ERROR:", err);

    return res.status(500).json({
      success: false,
      message: "AI failed to generate summary",
      error: err.message,
    });
  }
};

/* =========================
   ATS ANALYZER
========================= */
export const analyzeATS = async (req, res) => {
  try {
    const { resume } = req.body;

    if (!resume) {
      return res.status(400).json({
        success: false,
        message: "Resume is required",
      });
    }

    const prompt = `
You are an ATS resume expert.

Analyze this resume and return ONLY valid JSON (no text before or after).

Resume:
${JSON.stringify(resume)}

Return format:
{
  "score": 0-100,
  "summary": "short analysis",
  "strengths": ["skill1", "skill2"],
  "improvements": ["improvement1", "improvement2"]
}
`;

    const result = await callOpenRouter(prompt);

    if (!result) {
      throw new Error("Empty AI response");
    }

    let parsed;

    try {
      parsed = JSON.parse(result);
    } catch (e) {
      console.error("🔥 JSON PARSE ERROR:", result);

      return res.status(500).json({
        success: false,
        message: "AI returned invalid JSON",
        raw: result,
      });
    }

    return res.json({
      success: true,
      analysis: parsed,
    });
  } catch (err) {
    console.error("🔥 ATS AI ERROR:", err);

    return res.status(500).json({
      success: false,
      message: "AI failed to analyze ATS",
      error: err.message,
    });
  }
};
