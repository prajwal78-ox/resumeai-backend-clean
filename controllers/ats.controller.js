import { askAI } from "../services/openrouter.service.js";

export const analyzeATS = async (req, res) => {
  try {
    const { resume } = req.body;

    if (!resume) {
      return res.status(400).json({
        success: false,
        message: "Resume data is required",
      });
    }

    const prompt = `
You are an ATS (Applicant Tracking System) expert.

Analyze this resume and return ONLY valid JSON.

Rules:
- Output must be valid JSON (no markdown, no text)
- Score must be 0-100
- Include: summary, strengths, weaknesses, improvements

Resume:
${JSON.stringify(resume)}
`;

    let result = await askAI(prompt);

    // -----------------------------
    // SAFE PARSING (IMPORTANT FIX)
    // -----------------------------
    if (typeof result === "string") {
      try {
        result = JSON.parse(result);
      } catch (e) {
        // fallback extraction
        const match = result.match(/\{[\s\S]*\}/);
        if (match) {
          result = JSON.parse(match[0]);
        } else {
          throw new Error("Invalid AI response format");
        }
      }
    }

    return res.json({
      success: true,
      analysis: result,
    });

  } catch (error) {
    console.error("ATS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "ATS analysis failed",
      error: error.message,
    });
  }
};
