import { callOpenRouter } from "../services/openrouter.service.js";

/* =========================
   IMPROVE SUMMARY
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
You are a professional resume writer.

Rewrite this summary in a strong, ATS-friendly way:

${summary}

Return ONLY the improved summary text.
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
    console.log("🔥 SUMMARY ERROR:", err?.response?.data || err);

    return res.status(500).json({
      success: false,
      message: "AI failed",
      error: err.message,
      raw: err?.response?.data || null,
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
You are an ATS (Applicant Tracking System) expert.

Analyze this resume and return ONLY valid JSON.

Resume:
${JSON.stringify(resume)}

Return format (STRICT JSON ONLY):
{
  "score": 0,
  "summary": "",
  "strengths": [],
  "improvements": []
}
`;

    const result = await callOpenRouter(prompt);

    if (!result) {
      throw new Error("Empty AI response");
    }

    let parsed;

    try {
      parsed = JSON.parse(result);
    } catch (err) {
      console.log("🔥 JSON PARSE FAILED:", result);

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
    console.log("🔥 ATS ERROR:", err?.response?.data || err);

    return res.status(500).json({
      success: false,
      message: "AI failed",
      error: err.message,
      raw: err?.response?.data || null,
    });
  }
};
